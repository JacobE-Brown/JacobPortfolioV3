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

Portfolio site with multiple sections, driven by a Figma design file.

### Component hierarchy

```
App
├── HeroSection         # Full-screen hero: name, subtitle, "About Me" button, hex-framed profile pic
├── main (wrapper)      # Rounded top corners + shadow, contains all body sections
│   ├── AboutMe         # Intro text paragraph
│   ├── Technologies    # Two-column: hex grid (left) + education details (right)
│   │   └── HexGrid     # Manages hex layout, GSAP animations, and interaction state
│   │       └── HexTile # Absolutely-positioned wrapper per hex; drives GSAP targets via id="hex-{id}"
│   │           └── TechBadge   # Visual hex tile: icon + label badge
│   │               └── HexBase # SVG hex background shell (hex-base.svg) with proportional sizing
│   ├── ProjectCard ×3  # Alternating left/right project cards with hex image galleries
│   └── ContactMe       # Contact heading, email link, dark footer bar
```

### Hex grid coordinate system

`HexGrid` uses **axial (q, r) coordinates** following the Red Blob Games formulas for pointy-top hexagons. Each technology in `Technologies.tsx` is assigned a `{ q, r }` coordinate. `HexGrid` converts these to pixel positions and absolutely positions each `HexTile`.

The grid is arranged in a **centered diamond shape** (4-5-6-5-4 rows). The container size is computed dynamically from the bounding box of all hex positions plus padding. A `responsiveSize` multiplier scales tile size at breakpoints (480px → 60%, 768px → 80%, 1200px → 100%).

### GSAP starburst hover effect

On `HexTile` hover, `HexGrid.handleStarburstHover` uses GSAP to:
1. Scale up the hovered tile (`scale: 1.05`)
2. Push the 6 adjacent hexes outward 10px along their hexagonal axis (`x`/`y` translate)

Adjacency is calculated by checking all 6 axial directions against the `hexes` array. The push direction converts axial `(dq, dr)` to screen coordinates (`screenDx = √3·dq + √3/2·dr`, `screenDy = 3/2·dr`) before normalizing, so tiles push along the correct visual axis.

GSAP targets tiles via DOM id `hex-{id}` — set on the root element of each `HexTile`.

### Fonts

Google Fonts loaded in `index.html`: **Playfair Display** (serif headings), **Roboto** (body/UI), **Inter** (links), **Lora** (accent text). Mapped in `src/tokens.css` `@theme` as `--font-serif` and `--font-sans`.

### Design tokens

All color tokens and the Tailwind `@theme` block live in `src/tokens.css`, imported by `src/index.css`. Custom colors: `blue-medium-1`, `blue-medium-2`, `blue-neutral`, `cream-neutral`, `tan-neutral`, `text-1`, `text-2`.

Custom CSS classes for the grid and animations are also defined in `src/tokens.css` under `@layer components`.

### Path alias

`@/` resolves to `src/` (Vite alias). Tech logo SVGs live at `src/assets/images/TechLogos/`.
