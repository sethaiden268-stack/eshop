-- Run this once only if the existing D1 database was created from the earlier schema.sql.
ALTER TABLE orders ADD COLUMN customer_email TEXT NOT NULL DEFAULT '';
ALTER TABLE orders ADD COLUMN payment_reference TEXT;
ALTER TABLE orders ADD COLUMN payment_status TEXT NOT NULL DEFAULT 'unpaid';

CREATE UNIQUE INDEX IF NOT EXISTS idx_orders_payment_reference ON orders(payment_reference);

CREATE TABLE IF NOT EXISTS payments (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  reference TEXT NOT NULL UNIQUE,
  order_number TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  amount_subunit INTEGER NOT NULL,
  total_kes INTEGER NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  metadata_json TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_payments_reference ON payments(reference);

