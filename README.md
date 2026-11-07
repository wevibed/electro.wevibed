# Electro House — React + Vite storefront

Independent React/Vite storefront with its own configuration, catalogue, cart, checkout UI and Cloudflare Worker/D1 backend scaffold.

## Run locally
```bash
npm install
npm run dev
```

## Build
```bash
npm run build
```
Upload the `dist/` directory to its own Cloudflare Pages project.

## Cloudflare backend scaffold
1. Create a separate D1 database for this store.
2. Replace `REPLACE_WITH_D1_DATABASE_ID` in `wrangler.toml`.
3. Run `npx wrangler d1 execute electro-house-orders --remote --file=worker/schema.sql`.
4. Deploy the API with `npx wrangler deploy`.
5. Configure the frontend to POST orders to this Worker endpoint. The current checkout remains in local demo mode until API URL and payment/order handling are connected.

## Important
- Product prices, stock, business address, phone and WhatsApp number are demo/configuration values. Verify before accepting real orders.
- Product/hero images currently reference external image hosts. For production, download licensed/approved images and store them in R2 or the project assets.
- This scaffold does not process payments. Do not represent an order as paid based on checkout submission alone.
- Add server-side product/price validation and rate limiting before public production use.
