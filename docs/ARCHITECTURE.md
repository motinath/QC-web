# Architecture & Code Organization Guide

## Core Principles

1. **Single Responsibility Principle**: Every module and file performs exactly one duty.
2. **Configuration Driven**: Brand name, domain, social profiles, SEO parameters, and nav items are configured centrally in `src/config/`.
3. **No Technical Debt**: Zero TypeScript errors, zero ESLint warnings, strict typing for all props.
4. **File Line Cap**: Component files must not exceed ~300-400 lines. Complex components must be decomposed into sub-components.
5. **Decoupled 3D & Heavy Graphics**: Dynamic imports and lazy loading for 3D canvasses to maintain high performance.
