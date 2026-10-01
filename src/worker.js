const JSON_HEADERS = {
  'content-type': 'application/json; charset=utf-8',
  'cache-control': 'no-store'
};

function applySecurityHeaders(headers) {
  headers.set('x-content-type-options', 'nosniff');
  headers.set('referrer-policy', 'strict-origin-when-cross-origin');
  headers.set('permissions-policy', 'camera=(), microphone=(), geolocation=()');
  headers.set('content-security-policy', "default-src 'self'; base-uri 'self'; object-src 'none'; frame-ancestors 'none'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https://images.unsplash.com https://images.pexels.com; connect-src 'self' https://api.paystack.co; form-action 'self' https://checkout.paystack.com https://*.paystack.com");
  headers.set('cross-origin-opener-policy', 'same-origin');
  return headers;
}

function json(data, status = 200, request, env) {
  const headers = applySecurityHeaders(new Headers(JSON_HEADERS));
  const origin = request?.headers.get('Origin');
  const configuredOrigins = String(env?.APP_ORIGINS || '').split(',').map(value => value.trim()).filter(Boolean);
  if (origin && configuredOrigins.includes(origin)) {
    headers.set('access-control-allow-origin', origin);
    headers.set('access-control-allow-headers', 'authorization, content-type');
    headers.set('access-control-allow-methods', 'GET,POST,DELETE,OPTIONS');
    headers.set('vary', 'Origin');
  }
  return new Response(JSON.stringify(data), { status, headers });
}

function error(message, status = 400, request, env) {
  return json({ error: message }, status, request, env);
}

function isAdmin(request, env) {
  const expected = env.ADMIN_API_TOKEN;
  const supplied = request.headers.get('Authorization')?.replace(/^Bearer\s+/i, '');
  if (!expected || !supplied) return false;
  const left = new TextEncoder().encode(supplied);
  const right = new TextEncoder().encode(expected);
  let difference = left.length ^ right.length;
  const size = Math.max(left.length, right.length);
  for (let index = 0; index < size; index += 1) difference |= (left[index] || 0) ^ (right[index] || 0);
  return difference === 0;
}

function requireAdmin(request, env) {
  if (!env.ADMIN_API_TOKEN) return error('ADMIN_API_TOKEN is not configured.', 503, request, env);
  if (!isAdmin(request, env)) return error('Admin authorization is required.', 401, request, env);
  return null;
}

async function bodyJson(request) {
  try {
    const contentLength = Number(request.headers.get('content-length') || 0);
    if (contentLength > 262144) return null;
    const text = await request.text();
    if (text.length > 262144) return null;
    return JSON.parse(text);
  } catch {
    return null;
  }
}

function safeText(value, maxLength = 500) {
  return String(value ?? '').trim().slice(0, maxLength);
}

function safeInteger(value, minimum = 0, maximum = 2147483647) {
  const number = Number(value);
  return Number.isSafeInteger(number) ? Math.max(minimum, Math.min(maximum, number)) : minimum;
}

function safeImageUrl(value) {
  const image = safeText(value, 2000);
  if (!image) return '';
  if (/^\/api\/uploads\/[a-zA-Z0-9%._~\/-]+$/.test(image)) return image;
  try {
    const url = new URL(image);
    return ['https:', 'http:'].includes(url.protocol) && ['images.unsplash.com', 'images.pexels.com'].includes(url.hostname) ? url.toString() : '';
  } catch {
    return '';
  }
}

function allowedOrigins(request, env) {
  const origin = request.headers.get('Origin');
  const configured = String(env.APP_ORIGINS || '').split(',').map(value => value.trim()).filter(Boolean);
  return origin && configured.includes(origin) ? origin : null;
}

function productRow(row) {
  return {
    id: row.id,
    name: row.name,
    store: row.store_username,
    storeName: row.store_name,
    cat: row.category,
    price: row.price,
    old: row.old_price,
    badge: row.badge,
    rating: row.rating,
    reviews: row.reviews,
    stock: row.stock,
    img: row.image_url || ''
  };
}

function storeRow(row) {
  return {
    id: row.id,
    username: row.username,
    name: row.name,
    desc: row.description,
    followers: row.followers,
    rating: row.rating,
    logo: row.logo_url || '',
    cover: row.cover_url || ''
  };
}

async function catalog(env, request) {
  const [stores, products, categories] = await Promise.all([
    env.DB.prepare('SELECT * FROM stores ORDER BY name').all(),
    env.DB.prepare('SELECT * FROM products ORDER BY created_at DESC, id DESC').all(),
    env.DB.prepare('SELECT name FROM categories ORDER BY name').all()
  ]);
  return json({
    stores: (stores.results || []).map(storeRow),
    products: (products.results || []).map(productRow),
    categories: (categories.results || []).map(row => row.name)
  }, 200, request, env);
}

async function paystackRequest(path, env, init = {}) {
  if (!env.PAYSTACK_SECRET_KEY) throw new Error('PAYSTACK_SECRET_KEY is not configured.');
  const response = await fetch(`https://api.paystack.co${path}`, {
    ...init,
    headers: {
      authorization: `Bearer ${env.PAYSTACK_SECRET_KEY}`,
      'content-type': 'application/json',
      ...(init.headers || {})
    }
  });
  const payload = await response.json();
  if (!response.ok || !payload.status) throw new Error(payload.message || 'Paystack request failed.');
  return payload;
}

async function calculateCheckout(env, items) {
  if (!Array.isArray(items) || !items.length || items.length > 50) throw new Error('Your cart is empty or too large.');
  const merged = new Map();
  for (const item of items) {
    const productId = Number(item?.product_id);
    if (!Number.isSafeInteger(productId) || productId <= 0) throw new Error('A product in your cart is invalid.');
    const quantity = Math.max(1, Math.min(20, Number(item.quantity) || 1));
    merged.set(productId, Math.min(20, (merged.get(productId) || 0) + quantity));
  }
  const normalized = [];
  for (const [productId, quantity] of merged) {
    const row = await env.DB.prepare('SELECT id, name, price, stock, store_username FROM products WHERE id = ?')
      .bind(productId).first();
    if (!row) throw new Error('A product in your cart is no longer available.');
    if (Number(row.stock) <= 0 || Number(row.stock) < quantity) {
      throw new Error(`${row.name} is out of stock or has insufficient stock.`);
    }
    normalized.push({ product_id: row.id, name: safeText(row.name, 200), price: safeInteger(row.price), quantity, store: safeText(row.store_username, 120) });
  }
  const subtotal = normalized.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const delivery = subtotal >= 10000 ? 0 : 350;
  return { items: normalized, subtotal, delivery, total: subtotal + delivery };
}

async function finalizePaystackPayment(env, reference, transaction) {
  const payment = await env.DB.prepare('SELECT * FROM payments WHERE reference = ?').bind(reference).first();
  if (!payment) throw new Error('Payment reference was not found.');
  const metadata = JSON.parse(payment.metadata_json || '{}');
  if (payment.status === 'success') {
    const existing = await env.DB.prepare('SELECT * FROM orders WHERE payment_reference = ?').bind(reference).first();
    return { ok: true, order: existing, transaction };
  }
  if (transaction.status !== 'success') {
    await env.DB.prepare('UPDATE payments SET status = ? WHERE reference = ?').bind(transaction.status || 'failed', reference).run();
    return { ok: false, status: transaction.status || 'failed', transaction };
  }
  if (Number(transaction.amount) !== Number(payment.amount_subunit)) {
    await env.DB.prepare('UPDATE payments SET status = ? WHERE reference = ?').bind('amount_mismatch', reference).run();
    throw new Error('Paystack amount did not match the order total.');
  }

  for (const item of metadata.items || []) {
    const row = await env.DB.prepare('SELECT stock FROM products WHERE id = ?').bind(Number(item.product_id)).first();
    if (!row || Number(row.stock) < Number(item.quantity)) {
      throw new Error('A product sold out while payment was being completed.');
    }
  }

  const orderNumber = payment.order_number;
  await env.DB.prepare(
    'INSERT INTO orders (order_number, customer_name, customer_phone, delivery_address, city, payment_method, customer_email, payment_reference, payment_status, total, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)'
  ).bind(
    orderNumber,
    metadata.customer_name || '',
    metadata.customer_phone || '',
    metadata.delivery_address || '',
    metadata.city || '',
    'Paystack',
    payment.customer_email,
    reference,
    'paid',
    payment.total_kes,
    'Confirmed'
  ).run();
  const order = await env.DB.prepare('SELECT * FROM orders WHERE payment_reference = ?').bind(reference).first();
  const statements = [];
  for (const item of metadata.items || []) {
    statements.push(env.DB.prepare(
      'INSERT INTO order_items (order_id, product_id, quantity, price) VALUES (?, ?, ?, ?)'
    ).bind(order.id, Number(item.product_id), Number(item.quantity), Number(item.price)));
    statements.push(env.DB.prepare(
      'UPDATE products SET stock = stock - ? WHERE id = ? AND stock >= ?'
    ).bind(Number(item.quantity), Number(item.product_id), Number(item.quantity)));
  }
  if (statements.length) await env.DB.batch(statements);
  await env.DB.prepare('UPDATE payments SET status = ? WHERE reference = ?').bind('success', reference).run();
  return { ok: true, order, transaction };
}

async function initializePaystack(request, env) {
  const data = await bodyJson(request);
  const email = safeText(data?.email, 254).toLowerCase();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) throw new Error('A valid email address is required.');
  const checkout = await calculateCheckout(env, data.items);
  const reference = `ES-${Date.now()}-${crypto.randomUUID().slice(0, 8)}`;
  const randomBytes = new Uint32Array(1);
  crypto.getRandomValues(randomBytes);
  const orderNumber = `ES-${String(100000 + (randomBytes[0] % 900000))}`;
  const metadata = {
    customer_name: safeText(data.customer_name, 120),
    customer_phone: safeText(data.customer_phone, 40),
    delivery_address: safeText(data.delivery_address, 300),
    city: safeText(data.city || 'Nairobi', 80),
    items: checkout.items
  };
  await env.DB.prepare(
    'INSERT INTO payments (reference, order_number, customer_email, amount_subunit, total_kes, status, metadata_json) VALUES (?, ?, ?, ?, ?, ?, ?)'
  ).bind(reference, orderNumber, email, checkout.total * 100, checkout.total, 'pending', JSON.stringify(metadata)).run();

  const callbackUrl = new URL('/api/paystack/callback', request.url).toString();
  const payload = await paystackRequest('/transaction/initialize', env, {
    method: 'POST',
    body: JSON.stringify({
      email,
      amount: String(checkout.total * 100),
      currency: env.PAYSTACK_CURRENCY || 'KES',
      reference,
      callback_url: callbackUrl,
      metadata: { order_number: orderNumber, reference }
    })
  });
  return json({
    ok: true,
    authorization_url: payload.data.authorization_url,
    reference,
    order_number: orderNumber,
    total: checkout.total
  }, 200, request, env);
}

async function verifyPaystack(request, env, reference) {
  if (!reference) return error('Payment reference is required.', 400, request, env);
  const payload = await paystackRequest(`/transaction/verify/${encodeURIComponent(reference)}`, env, { method: 'GET' });
  const result = await finalizePaystackPayment(env, reference, payload.data);
  return json({
    ok: result.ok,
    status: result.status || payload.data.status,
    reference,
    order: result.order || null
  }, 200, request, env);
}

async function handleApi(request, env) {
  const url = new URL(request.url);
  const path = url.pathname.replace(/\/+$/, '') || '/api';

  if (request.method === 'OPTIONS') {
    const origin = request.headers.get('Origin');
    const allowed = allowedOrigins(request, env);
    if (!origin || !allowed) return new Response(null, { status: 403 });
    return new Response(null, {
      headers: {
        'access-control-allow-origin': origin,
        'access-control-allow-headers': 'authorization, content-type',
        'access-control-allow-methods': 'GET,POST,DELETE,OPTIONS',
        vary: 'Origin'
      }
    });
  }

  if (path === '/api/health' && request.method === 'GET') {
    return json({ ok: true }, 200, request, env);
  }

  if (path === '/api/catalog' && request.method === 'GET') {
    return catalog(env, request);
  }

  if (path === '/api/products' && request.method === 'POST') {
    const denied = requireAdmin(request, env);
    if (denied) return denied;
    const data = await bodyJson(request);
    if (!data?.name || !data?.category) return error('Product name and category are required.', 400, request, env);
    const name = safeText(data.name, 160);
    const category = safeText(data.category, 80);
    if (!name || !category) return error('Product name and category are required.', 400, request, env);
    const result = await env.DB.prepare(
      'INSERT INTO products (name, store_username, store_name, category, price, old_price, badge, rating, reviews, stock, image_url) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)'
    ).bind(
      name,
      safeText(data.store_username || '@urbanwear', 120),
      safeText(data.store_name || 'Urban Wear', 160),
      category,
      safeInteger(data.price),
      safeInteger(data.old_price),
      safeText(data.badge || 'New', 40),
      safeText(data.rating || 'New', 20),
      safeInteger(data.reviews),
      safeInteger(data.stock),
      safeImageUrl(data.image_url)
    ).run();
    return json({ ok: true, id: result.meta?.last_row_id }, 200, request, env);
  }

  const productMatch = path.match(/^\/api\/products\/(\d+)$/);
  if (productMatch && request.method === 'DELETE') {
    const denied = requireAdmin(request, env);
    if (denied) return denied;
    await env.DB.prepare('DELETE FROM products WHERE id = ?').bind(Number(productMatch[1])).run();
    return json({ ok: true }, 200, request, env);
  }

  if (path === '/api/categories' && request.method === 'POST') {
    const denied = requireAdmin(request, env);
    if (denied) return denied;
    const data = await bodyJson(request);
    const name = String(data?.name || '').trim();
    if (!name) return error('Category name is required.', 400, request, env);
    await env.DB.prepare('INSERT OR IGNORE INTO categories (name) VALUES (?)').bind(name).run();
    return json({ ok: true, name }, 200, request, env);
  }

  const categoryMatch = path.match(/^\/api\/categories\/(.+)$/);
  if (categoryMatch && request.method === 'DELETE') {
    const denied = requireAdmin(request, env);
    if (denied) return denied;
    const name = decodeURIComponent(categoryMatch[1]);
    await env.DB.prepare('DELETE FROM categories WHERE name = ?').bind(name).run();
    return json({ ok: true }, 200, request, env);
  }

  if (path === '/api/bookings' && request.method === 'GET') {
    const denied = requireAdmin(request, env);
    if (denied) return denied;
    const result = await env.DB.prepare('SELECT * FROM bookings ORDER BY booking_date, booking_time').all();
    return json({ bookings: result.results || [] }, 200, request, env);
  }

  if (path === '/api/bookings' && request.method === 'POST') {
    const denied = requireAdmin(request, env);
    if (denied) return denied;
    const data = await bodyJson(request);
    if (!data?.customer_name || !data?.service_name || !data?.booking_date || !data?.booking_time) {
      return error('Customer, service, date, and time are required.', 400, request, env);
    }
    const result = await env.DB.prepare(
      'INSERT INTO bookings (customer_name, service_name, booking_date, booking_time, status, notes) VALUES (?, ?, ?, ?, ?, ?)'
    ).bind(
      safeText(data.customer_name, 120),
      safeText(data.service_name, 160),
      safeText(data.booking_date, 20),
      safeText(data.booking_time, 20),
      ['Pending', 'Confirmed', 'Completed', 'Cancelled'].includes(data.status) ? data.status : 'Pending',
      safeText(data.notes, 500)
    ).run();
    return json({ ok: true, id: result.meta?.last_row_id }, 200, request, env);
  }

  const bookingMatch = path.match(/^\/api\/bookings\/(\d+)$/);
  if (bookingMatch && request.method === 'PATCH') {
    const denied = requireAdmin(request, env);
    if (denied) return denied;
    const data = await bodyJson(request);
    await env.DB.prepare('UPDATE bookings SET status = ? WHERE id = ?')
      .bind(data?.status || 'Pending', Number(bookingMatch[1])).run();
    return json({ ok: true }, 200, request, env);
  }

  if (path === '/api/paystack/initialize' && request.method === 'POST') {
    return initializePaystack(request, env);
  }

  const paystackVerifyMatch = path.match(/^\/api\/paystack\/verify\/(.+)$/);
  if (paystackVerifyMatch && request.method === 'GET') {
    return verifyPaystack(request, env, decodeURIComponent(paystackVerifyMatch[1]));
  }

  if (path === '/api/paystack/callback' && request.method === 'GET') {
    const reference = url.searchParams.get('reference');
    try {
      const payload = await paystackRequest(`/transaction/verify/${encodeURIComponent(reference || '')}`, env, { method: 'GET' });
      const result = await finalizePaystackPayment(env, reference, payload.data);
      const destination = new URL(request.url);
      destination.pathname = '/';
      destination.search = `?paystack=${result.ok ? 'success' : 'failed'}&reference=${encodeURIComponent(reference || '')}`;
      return Response.redirect(destination.toString(), 302);
    } catch (err) {
      const destination = new URL(request.url);
      destination.pathname = '/';
      destination.search = `?paystack=failed&message=${encodeURIComponent(err.message || 'Payment could not be verified.')}`;
      return Response.redirect(destination.toString(), 302);
    }
  }

  if (path === '/api/orders' && request.method === 'POST') {
    const denied = requireAdmin(request, env);
    if (denied) return denied;
    const data = await bodyJson(request);
    if (!data?.order_number) return error('Order number is required.', 400, request, env);
    const order = await env.DB.prepare(
      'INSERT INTO orders (order_number, customer_name, customer_phone, delivery_address, city, payment_method, total, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?)'
    ).bind(
      data.order_number,
      data.customer_name || '',
      data.customer_phone || '',
      data.delivery_address || '',
      data.city || '',
      data.payment_method || '',
      Number(data.total) || 0,
      'Confirmed'
    ).run();
    const items = Array.isArray(data.items) ? data.items : [];
    if (items.length) {
      await env.DB.batch(items.map(item => env.DB.prepare(
        'INSERT INTO order_items (order_id, product_id, quantity, price) VALUES (?, ?, ?, ?)'
      ).bind(order.meta?.last_row_id, Number(item.product_id), Number(item.quantity) || 1, Number(item.price) || 0)));
    }
    return json({ ok: true, order_id: order.meta?.last_row_id }, 200, request, env);
  }

  if (path === '/api/uploads' && request.method === 'POST') {
    const denied = requireAdmin(request, env);
    if (denied) return denied;
    if (!env.IMAGES) return error('R2 image storage is not configured.', 503, request, env);
    const contentLength = Number(request.headers.get('content-length') || 0);
    if (!contentLength || contentLength > 12582912) return error('Image upload is too large.', 413, request, env);
    const form = await request.formData();
    const file = form.get('file');
    if (!file || typeof file.stream !== 'function') return error('An image file is required.', 400, request, env);
    const allowedTypes = new Set(['image/jpeg', 'image/png', 'image/webp', 'image/avif', 'image/gif']);
    if (!allowedTypes.has(file.type) || Number(file.size) > 10485760) return error('Only image files up to 10 MB are allowed.', 415, request, env);
    const original = String(file.name || 'image').replace(/[^a-zA-Z0-9._-]/g, '-');
    const key = `products/${crypto.randomUUID()}-${original}`;
    await env.IMAGES.put(key, file.stream(), {
      httpMetadata: { contentType: file.type || 'application/octet-stream' }
    });
    return json({ ok: true, key, url: `/api/uploads/${encodeURIComponent(key)}` }, 200, request, env);
  }

  const uploadMatch = path.match(/^\/api\/uploads\/(.+)$/);
  if (uploadMatch && request.method === 'GET') {
    if (!env.IMAGES) return error('R2 image storage is not configured.', 503, request, env);
    const object = await env.IMAGES.get(decodeURIComponent(uploadMatch[1]));
    if (!object) return new Response('Not found', { status: 404 });
    const headers = new Headers();
    object.writeHttpMetadata(headers);
    headers.set('etag', object.httpEtag);
    headers.set('x-content-type-options', 'nosniff');
    return new Response(object.body, { headers });
  }

  return error('API route not found.', 404, request, env);
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const seoPaths = ['/', '/products.html', '/stores.html', '/services.html', '/about.html'];
    if (url.pathname === '/robots.txt' && request.method === 'GET') {
      return new Response([
        'User-agent: *',
        'Allow: /',
        'Disallow: /api/',
        'Disallow: /checkout',
        'Disallow: /account',
        'Disallow: /studio',
        'Sitemap: ' + new URL('/sitemap.xml', url.origin).toString()
      ].join('\n') + '\n', { headers: applySecurityHeaders(new Headers({ 'content-type': 'text/plain; charset=utf-8', 'cache-control': 'public, max-age=3600' })) });
    }
    if (url.pathname === '/sitemap.xml' && request.method === 'GET') {
      const lastmod = new Date().toISOString().slice(0, 10);
      const entries = seoPaths.map(path => `<url><loc>${new URL(path, url.origin).toString()}</loc><lastmod>${lastmod}</lastmod><changefreq>${path === '/' ? 'daily' : 'weekly'}</changefreq><priority>${path === '/' ? '1.0' : '0.7'}</priority></url>`).join('');
      return new Response(`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${entries}</urlset>`, { headers: applySecurityHeaders(new Headers({ 'content-type': 'application/xml; charset=utf-8', 'cache-control': 'public, max-age=3600' })) });
    }
    if (url.pathname.startsWith('/api/')) {
      try {
        return await handleApi(request, env);
      } catch (err) {
        console.error(err);
        return error('Unexpected server error.', 500, request, env);
      }
    }
    const response = await env.ASSETS.fetch(request);
    const headers = applySecurityHeaders(new Headers(response.headers));
    return new Response(response.body, { status: response.status, statusText: response.statusText, headers });
  }
};





