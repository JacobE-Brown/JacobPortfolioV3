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
│   ├── NavBar          # Sticky dark nav, rounded corners when not stuck, right-aligned links
│   ├── AboutMe         # Intro text paragraph
│   ├── WhatIDo         # "What I do" section: heading + 5 hex badge work items with descriptions
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

The grid is arranged in a **centered diamond shape** (4-5-6-5-4 rows). The container size is computed dynamically from the bounding box of all hex positions plus padding. A `responsiveSize` multiplier scales tile size at Tailwind breakpoints (sm/640px → 60%, md/768px → 80%, xl/1280px → 90%).

### Responsive breakpoint convention

**Always use Tailwind's default breakpoints** for JS media checks (`window.innerWidth`) and CSS classes — no custom pixel values. The standard breakpoints are: `sm` 640px, `md` 768px, `lg` 1024px, `xl` 1280px, `2xl` 1536px.

Current responsive layout for the Skills section:
- **< sm (640)**: compact 3-4 grid, 60% hex size, modal detail
- **sm–md (640–768)**: compact 3-4 grid, 80% hex size, modal detail
- **md–xl (768–1280)**: diamond 4-5-6-5-4, 80% hex size, modal detail
- **xl+ (1280+)**: diamond 4-5-6-5-4, 90% hex size, side detail panel

The **axial origin** `(q=0, r=0)` is the ASP.NET Core hex, sitting at the center of the 6-hex middle row.

### Mobile compact hex layout

Below 768px, `Technologies` remaps all hexes onto a **3-4-3-4-3-4-3 column** via `mobileGridPositions`. Because pointy-top axial→pixel conversion adds `√3/2 · r` to x, **q ranges must shift left by 1 for each +1 in r** to keep all rows visually centered. The centering invariant is: `q_left + q_right + r = constant` across every row. Failing to compensate causes lower rows to drift right.

### GSAP starburst hover effect

On `HexTile` hover, `HexGrid.handleStarburstHover` uses GSAP to:
1. Scale up the hovered tile (`scale: 1.05`)
2. Push the 6 adjacent hexes outward 10px along their hexagonal axis (`x`/`y` translate)

Adjacency is calculated by checking all 6 axial directions against the `hexes` array. The push direction converts axial `(dq, dr)` to screen coordinates (`screenDx = √3·dq + √3/2·dr`, `screenDy = 3/2·dr`) before normalizing, so tiles push along the correct visual axis.

GSAP targets tiles via DOM id `hex-{id}` — set on the root element of each `HexTile`.

### Layout design principles

Apply these when building or modifying sections:

- **Typographic scale proportion** — Maintain a consistent ~1.5:1 ratio between heading and subtitle at each breakpoint. Hero/display text should clearly dominate over body text scale.
- **Proximity (Gestalt)** — Elements that belong together should be visually grouped with tighter gaps. Don't let large gaps suggest unrelatedness between paired content (e.g., name + profile image).
- **Visual hierarchy** — CTAs (buttons) should be visually subordinate to headlines. Use smaller font size on buttons but larger padding for comfortable touch targets (minimum 44px tap target).
- **Symmetry & alignment** — Hero sections use center-aligned text since there's no adjacent content competing for scan direction. Body sections may use left-alignment.
- **Consistent section padding** — Sections should share the same horizontal padding (`px-8 md:px-16`) and use the same column system (`max-w-screen-2xl mx-auto` for full-width sections).
- **Composition over separation** — Prefer `justify-center` with moderate gaps over `justify-between`, which pushes content to edges and creates dead space.

### Tailwind sizing & typography conventions

**Always use Tailwind's standard scale** for spacing, sizing, and font sizes. Avoid arbitrary values (`text-[4rem]`, `px-[72px]`, `min-h-[28rem]`) when a Tailwind class exists.

**Font size scale** (use these, not arbitrary rem/px values):
- `text-xs` (0.75rem) — fine print, badge descriptions
- `text-sm` (0.875rem) — secondary body text
- `text-base` (1rem) — default body
- `text-lg` (1.125rem) — emphasized body
- `text-xl` / `text-2xl` — subheadings, small breakpoints
- `text-3xl` / `text-4xl` — section headings at small breakpoints
- `text-5xl` / `text-6xl` — section headings at medium breakpoints
- `text-7xl` / `text-8xl` — large display headings
- `text-9xl` (8rem) — hero title at large breakpoints

**Spacing scale** — Tailwind v4 supports the full 4px grid (`w-76` = 19rem, `min-h-112` = 28rem, `px-18` = 4.5rem, etc.). Use these instead of arbitrary bracket values.

**Exceptions** (arbitrary values OK when no standard class exists):
- Percentage values over 100% (e.g., `w-[110%]`)
- Complex composite shadows
- CSS `clip-path` values

### Fonts

Google Fonts loaded in `index.html`: **Playfair Display** (serif nav/decorative), **Roboto** (body/UI), **Inter** (links), **Lora** (section headings). Mapped in `src/tokens.css` `@theme` as `--font-serif`, `--font-sans`, and `--font-heading`.

### Design tokens

All color tokens and the Tailwind `@theme` block live in `src/tokens.css`, imported by `src/index.css`. Colors use direct hex values in `@theme` (Tailwind v4 style — no RGB tuple workaround needed).

Custom colors: `blue-medium-1` (#70CFFB), `blue-medium-2` (#54BAB9), `blue-neutral` (#F7FBFC), `cream-neutral` (#FBF8F1), `tan-neutral` (#FFF0DD), `text-1` (#002A58), `text-2` (#7D6E4F).

`bg-parchment` is a utility class (not a `@theme` color) providing a radial gradient: `radial-gradient(50% 50% at 50% 50%, #F7FBFC 0%, #FBF8F1 100%)`.

Custom CSS classes for the grid and animations are also defined in `src/tokens.css` under `@layer components`.

### Path alias

`@/` resolves to `src/` (Vite alias). Tech logo SVGs live at `src/assets/images/TechLogos/`.
