# Deployment & Security Manual — Render Platform

## Render Production Deployment

1. **GitHub Connection**: Push code to `main` branch on GitHub.
2. **Automated CI/CD**: Every push executes `.github/workflows/ci.yml` (ESLint, Type Check, Build).
3. **Render Static Site Setup**:
   - Create a new **Static Site** on [Render](https://dashboard.render.com).
   - Alternatively, apply the [`render.yaml`](../render.yaml) Blueprint.
   - **Build Command**: `npm run build`
   - **Publish Directory**: `./dist`
4. **SPA Rewrite Rule**:
   - Source: `/*`
   - Destination: `/index.html`
5. **Security Headers**: Managed in `render.yaml`:
   - `Content-Security-Policy`
   - `Strict-Transport-Security`
   - `X-Frame-Options: DENY`
   - `X-Content-Type-Options: nosniff`
   - `Referrer-Policy: strict-origin-when-cross-origin`
6. **Custom Domain**: Connect `qcodon.com` with automatic TLS/SSL certificate issuance.
