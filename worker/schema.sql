CREATE TABLE IF NOT EXISTS orders (
 id TEXT PRIMARY KEY, customer_name TEXT NOT NULL, customer_phone TEXT NOT NULL,
 fulfilment TEXT NOT NULL, address TEXT, payment_method TEXT, subtotal REAL NOT NULL,
 delivery_fee REAL NOT NULL, total REAL NOT NULL, status TEXT NOT NULL DEFAULT 'pending',
 created_at TEXT NOT NULL
);
CREATE TABLE IF NOT EXISTS order_items (
 id TEXT PRIMARY KEY, order_id TEXT NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
 product_name TEXT NOT NULL, unit_price REAL NOT NULL, quantity INTEGER NOT NULL, variant TEXT
);
CREATE INDEX IF NOT EXISTS idx_orders_created_at ON orders(created_at);
