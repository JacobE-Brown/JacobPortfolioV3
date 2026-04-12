# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start dev server (Vite HMR)
npm run build     # Type-check + production build (tsc -b && vite build)
npm run lint      # ESLint
npm run preview   # Preview production build
```

No test suite is configured.

## Stack

- **React 19** + **TypeScript** + **Vite 7**
- **Tailwind CSS v4** (configured via `@tailwindcss/vite` plugin — no `tailwind.config.js`, config lives in `src/tokens.css` using `@theme {}`)
- **GSAP 3** for hover animations

## Architecture

This is an early-stage portfolio site. Currently only one section exists: a `Technologies` section displaying a hexagonal grid of tech skills.

### Component hierarchy

```
App
└── Technologies        # Section: tech skills with category filters
    └── HexGrid         # Manages hex layout, GSAP animations, and interaction state
        └── HexTile     # Absolutely-positioned wrapper per hex; drives GSAP targets via id="hex-{id}"
            └── TechBadge   # Visual hex tile: icon + label badge
                └── HexBase # SVG hex background shell (hex-base.svg) with proportional sizing
```

### Hex grid coordinate system

`HexGrid` uses **axial (q, r) coordinates** following the Red Blob Games formulas for pointy-top hexagons. Each technology in `Technologies.tsx` is assigned a `{ q, r }` coordinate. `HexGrid` converts these to pixel positions and absolutely positions each `HexTile`.

The container size is computed dynamically from the bounding box of all hex positions plus padding. A `responsiveSize` multiplier scales tile size at breakpoints (480px → 60%, 768px → 80%, 1200px → 100%).

### GSAP starburst hover effect

On `HexTile` hover, `HexGrid.handleStarburstHover` uses GSAP to:
1. Scale up the hovered tile (`scale: 1.05`)
2. Push the 6 adjacent hexes outward 10px along their hexagonal axis (`x`/`y` translate)

Adjacency is calculated by checking all 6 axial directions against the `hexes` array.

GSAP targets tiles via DOM id `hex-{id}` — set on the root element of each `HexTile`.

### Design tokens

All color tokens and the Tailwind `@theme` block live in `src/tokens.css`, imported by `src/index.css`. Custom colors: `blue-medium-1`, `blue-medium-2`, `blue-neutral`, `cream-neutral`, `tan-neutral`, `text-1`, `text-2`.

Custom CSS classes for the grid and animations are also defined in `src/tokens.css` under `@layer components`.

### Path alias

`@/` resolves to `src/` (Vite alias). Tech logo SVGs live at `src/assets/images/TechLogos/`.
