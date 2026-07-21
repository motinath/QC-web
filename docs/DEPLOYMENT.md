# Universal Deployment Manual — QCodon Platform

This single codebase is designed for **Zero-Configuration Deployment** across all major hosting platforms. You can deploy this exact repository to any hosting provider without modifying any code.

---

## 🚀 1. Vercel Deployment

1. Go to **[vercel.com](https://vercel.com)** and click **Add New Project**.
2. Import your GitHub repository: `motinath/QC-web`.
3. Vercel automatically detects [`vercel.json`](../vercel.json) and configures:
   - **Framework Preset**: Vite / React
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist/client`
4. Click **Deploy**.

---

## ⚡ 2. Netlify Deployment

1. Go to **[netlify.com](https://netlify.com)** and click **Add new site** -> **Import an existing project**.
2. Select GitHub and choose `motinath/QC-web`.
3. Netlify automatically reads [`netlify.toml`](../netlify.toml) and configures:
   - **Build Command**: `npm run build`
   - **Publish Directory**: `dist/client`
   - **SPA Redirect**: `/*` -> `/index.html` (Status 200)
4. Click **Deploy Site**.

---

## 🌐 3. Render Deployment

1. Go to **[dashboard.render.com](https://dashboard.render.com)**.
2. Click **New +** -> **Blueprint**.
3. Connect `motinath/QC-web`. Render reads [`render.yaml`](../render.yaml) automatically:
   - **Build Command**: `npm run build`
   - **Static Publish Path**: `./dist/client`
4. Click **Apply**.

---

## ☁️ 4. Cloudflare Pages Deployment

1. Log in to **[dash.cloudflare.com](https://dash.cloudflare.com)** -> Navigate to **Workers & Pages**.
2. Click **Create Application** -> **Pages** -> **Connect to Git**.
3. Select `motinath/QC-web`.
4. Configure Build Settings:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Build Output Directory**: `dist/client`
5. Cloudflare automatically uses [`public/_redirects`](../public/_redirects) and [`public/_headers`](../public/_headers).
6. Click **Save and Deploy**.

---

## 🐳 5. Docker Container Deployment (AWS, GCP, DigitalOcean, VPS)

To build and run locally or on any server with Docker:

```bash
# 1. Build Docker container image
docker build -t qcodon-web:latest .

# 2. Run container on port 80
docker run -d -p 80:80 --name qcodon-app qcodon-web:latest
```

The container runs lightweight Nginx configured with SPA fallback routing, Gzip compression, and security headers.
