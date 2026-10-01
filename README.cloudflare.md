# E SHOP Cloudflare wiring

This project is configured as a Cloudflare Worker that serves the single-file storefront and exposes protected D1/R2 API routes.

## One-time setup

From this folder:

```powershell
npm install -D wrangler@latest
npx wrangler login
npx wrangler d1 create eshop-db
npx wrangler r2 bucket create eshop-product-images
```

Copy the D1 database ID returned by Wrangler into `wrangler.jsonc` as `database_id`.

Apply the schema:

```powershell
npx wrangler d1 execute eshop-db --remote --file ./schema.sql
```

If the database was already created from the earlier schema, run the one-time Paystack upgrade instead:

```powershell
npx wrangler d1 execute eshop-db --remote --file ./schema-paystack-upgrade.sql
```

Set the admin token used by protected Studio writes and R2 uploads:

```powershell
npx wrangler secret put ADMIN_API_TOKEN
```

Set the Paystack secret key as a Worker secret:

```powershell
npx wrangler secret put PAYSTACK_SECRET_KEY
```

For Capacitor API calls, set `APP_ORIGINS` in `wrangler.jsonc` to a comma-separated allowlist containing only your real web origin and native origins you use, for example `https://shop.example.com,https://localhost,capacitor://localhost`. Do not use `*`.

Run locally or deploy:

```powershell
npm run dev
npm run deploy
```

## API

- `GET /api/health` — verifies D1 and R2 bindings.
- `GET /api/catalog` — reads stores, products, and categories from D1.
- `POST /api/products` and `DELETE /api/products/:id` — protected by `ADMIN_API_TOKEN`.
- `POST /api/categories` and `DELETE /api/categories/:name` — protected.
- `POST /api/orders` — protected.
- `GET /api/bookings`, `POST /api/bookings`, and `PATCH /api/bookings/:id` — service booking records; writes are protected.
- `POST /api/uploads` — protected R2 upload; returns an image URL.
- `POST /api/paystack/initialize` — creates a server-side Paystack checkout from D1 prices.
- `GET /api/paystack/callback` — verifies the returned Paystack reference and redirects to the app.
- `GET /api/paystack/verify/:reference` — verifies a transaction and creates the paid order after matching the amount.
- `GET /api/uploads/:key` — streams an image from R2.

Write routes intentionally require `Authorization: Bearer <ADMIN_API_TOKEN>`. Do not put this token in public client code; put Cloudflare Access or a server-side admin session in front of Creator Studio before exposing production write controls.

The Worker serves only the generated `www/` web bundle as public assets. Source code, schemas, native projects, package files, and deployment configuration are kept outside the public asset directory.

