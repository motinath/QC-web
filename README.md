# Quantum Codon (QCodon) — Enterprise Production Platform

[![CI Gate](https://github.com/motinath/QC-web/actions/workflows/ci.yml/badge.svg)](https://github.com/motinath/QC-web/actions/workflows/ci.yml)
[![Vercel Ready](https://img.shields.io/badge/Vercel-Deploy%20Ready-black)](https://vercel.com)
[![Netlify Ready](https://img.shields.io/badge/Netlify-Deploy%20Ready-00C7B7)](https://netlify.com)
[![Render Ready](https://img.shields.io/badge/Render-Deploy%20Ready-emerald)](https://render.com)
[![Cloudflare Ready](https://img.shields.io/badge/Cloudflare%20Pages-Deploy%20Ready-f38020)](https://pages.cloudflare.com)
[![Docker Ready](https://img.shields.io/badge/Docker-Deploy%20Ready-2496ED)](https://docker.com)

Production-grade frontend platform for **Quantum Codon**, unlocking untranslated regions, dark genome targets, and precision therapeutics with AI and biocomputing.

---

## Technical Stack

- **Framework**: [React 19](https://react.dev/), [Vite](https://vitejs.dev/)
- **Routing**: [TanStack Router](https://tanstack.com/router)
- **Styling & Tokens**: [Tailwind CSS v4](https://tailwindcss.com/), HSL Design System Tokens (`src/styles/tokens.css`)
- **Graphics & 3D**: Three.js, `@react-three/fiber`, `@react-three/drei`
- **Form System**: React Hook Form, Zod Schema Validation
- **Universal Deployment**: Zero-Config multi-platform support for **Vercel**, **Netlify**, **Render**, **Cloudflare Pages**, and **Docker**
- **Quality Gates**: ESLint, TypeScript Strict Mode, Prettier

---

## Directory Architecture

```
src/
├── app/          # Core app entry points & query client setup
├── assets/       # Media assets (fonts, icons, illustrations, images, logos, videos)
├── components/   # Modular domain components
│   ├── animations/  # Centralized motion wrappers & reduced-motion helpers
│   ├── common/      # ErrorBoundary, Preloader, ImageWithFallback, StructuredData
│   ├── forms/       # ContactForm, form inputs, honeypot handlers
│   ├── layout/      # Navbar, Footer, PageShell, SectionContainer
│   └── ui/          # Primitive design tokens and base UI elements
├── config/       # Single source of truth (site, seo, navigation, social, theme)
├── constants/    # Fixed platform constants
├── contexts/     # React Contexts
├── hooks/        # Reusable custom React hooks
├── layouts/      # Base route layouts
├── lib/          # Helper utilities & client instances
├── pages/        # Route page views
├── providers/    # App global providers wrapper
├── services/     # External integrations (Analytics, Contact service)
├── styles/       # Tokens, CSS variables, global styles
├── types/        # TypeScript interfaces & types
└── utils/        # Animation, formatters, helper functions
```

---

## Quickstart Guide

### Prerequisites

- Node.js >= 20.x
- npm >= 10.x

### Installation

```bash
npm install
```

### Development Server

```bash
npm run dev
```

### Quality Assurance Checks

```bash
# Run ESLint rules
npm run lint

# Run TypeScript strict type-checker
npm run type-check

# Run full quality audit (lint + type-check + build)
npm run quality
```

---

## Deployment Configuration (Render)

This repository is configured for automated deployment on **Render** via [`render.yaml`](render.yaml).

1. Connect your GitHub repository to **Render**.
2. Select **Static Site** (or import `render.yaml` Blueprint).
3. **Build Command**: `npm run build`
4. **Publish Directory**: `./dist`
5. **SPA Rewrite**: Source `/*` -> Destination `/index.html`
6. Custom Domain: `qcodon.com` (HTTPS auto-enabled with SSL).

Security headers (CSP, HSTS, X-Frame-Options, Cache-Control) are managed inside `render.yaml`.

---

## Documentation Links

- [Architecture Guide](docs/ARCHITECTURE.md)
- [Design Tokens & Usage Guide](docs/DESIGN_SYSTEM.md)
- [Deployment & Security Manual](docs/DEPLOYMENT.md)

---

## License

Copyright © 2026 Quantum Codon Technologies Inc. All rights reserved.
