# Design System & Token Specification

## Tokens (`src/styles/tokens.css`)

All colors, typography, spacing, radii, elevations, and animation timings derive from CSS variables:

- `--qc-color-primary`: HSL Cyan accent for primary CTAs and interactive highlights.
- `--qc-color-secondary`: HSL Purple accent for biocomputing highlights.
- `--qc-bg-dark`: Base canvas background (`hsl(224 25% 4%)`).
- `--qc-glass-bg`: Glassmorphic card surfaces (`hsla(224, 22%, 8%, 0.7)`).
- `--qc-space-1` to `--qc-space-32`: Consistent spacing scale.

Never use hardcoded pixel values; always utilize design tokens or Tailwind utility classes mapped to tokens.
