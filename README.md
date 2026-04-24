# jacobebrown.dev

Personal portfolio site for **Jacob Brown** — DevOps Engineer & Full-Stack Developer based in Boise, Idaho.

**[Live Site](https://jacobebrown.dev)** | **[LinkedIn](https://www.linkedin.com/in/jacobbrowndev/)** | **[Substack](https://substack.com/@jacobbrowndev)**

---

## About

Designed end-to-end in Figma and built from scratch. The site showcases professional experience, technical skills, projects, education, and certifications. The centerpiece is an interactive hex grid that maps 22 technologies using axial coordinate math with GSAP-powered starburst hover animations.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| **Framework** | React 19, TypeScript |
| **Build** | Vite 7 |
| **Styling** | Tailwind CSS v4 (token-driven via `@theme`) |
| **Animation** | GSAP 3 (ScrollTrigger, starburst hover) |
| **Design** | Figma |
| **Hosting** | AWS Amplify |
| **Domain/Email** | Route 53, SES |

## Features

- **Hex grid skills section** — 22 technology tiles laid out using pointy-top hexagonal axial coordinates (Red Blob Games formulas). Tiles are filterable by category and animate on hover with a starburst push effect on adjacent hexes.
- **Responsive design** — Full breakpoint coverage from mobile portrait through ultrawide. The hex grid remaps to a compact layout on small screens and a landscape-optimized layout on rotated devices.
- **Sticky navbar** — Snaps to the bottom of the hero viewport, then sticks to the top for the rest of the page using a sentinel-based `IntersectionObserver` pattern.
- **Scroll-triggered animations** — Section content fades and slides in via GSAP `ScrollTrigger`.
- **Design token system** — All colors, fonts, and custom utilities defined in `src/tokens.css` using Tailwind v4's `@theme` block.
- **Project showcase** — Alternating left/right project cards with hex-framed image galleries.

## Getting Started

```bash
npm install
npm run dev       # Dev server with HMR
npm run build     # Type-check + production build
npm run lint      # ESLint
npm run preview   # Preview production build
```

## Project Structure

```
src/
├── components/
│   ├── HeroSection.tsx      # Full-screen hero with hex-framed profile photo
│   ├── NavBar.tsx           # Sticky nav with scroll-aware styling
│   ├── AboutMe.tsx          # Introduction section
│   ├── WhatIDo.tsx          # Capability overview with animated hex badges
│   ├── Technologies.tsx     # Skills section: filters + hex grid + detail panel
│   ├── HexGrid.tsx          # Axial coordinate layout engine + GSAP animations
│   ├── HexTile.tsx          # Positioned wrapper per hex tile
│   ├── TechBadge.tsx        # Visual hex tile: icon + label
│   ├── HexBase.tsx          # SVG hex background shell
│   ├── ProjectCard.tsx      # Project showcase cards
│   ├── ContactMe.tsx        # Contact section + footer
│   └── tech/
│       ├── data.tsx         # Technology definitions, coordinates, categories
│       ├── types.ts         # TypeScript interfaces
│       ├── DetailPanel.tsx  # Desktop skill detail sidebar
│       └── MobileModal.tsx  # Mobile skill detail overlay
├── assets/images/           # Tech logos, profile photo, project screenshots
├── tokens.css               # Design tokens, @theme, custom utilities
├── index.css                # Tailwind imports + base styles
└── App.tsx                  # Root component, project data, section composition
```

## Architecture Highlights

**Hex grid math** — Each tile has an `(q, r)` axial coordinate. The layout engine converts these to pixel positions using pointy-top hex formulas, computes the bounding box, and absolutely positions tiles within a dynamically-sized container. A `responsiveSize` multiplier scales everything at breakpoints.

**Navbar persistence** — The nav lives between `HeroSection` and `<main>` in the DOM (not inside either). This lets `position: sticky` work across the entire page instead of releasing when a wrapper scrolls out. A `ResizeObserver` publishes `--nav-h` so other elements can account for nav height.

**Category filtering** — The "What I Do" section dispatches custom events that the Skills section listens for, activating filters and scrolling to the hex grid. Multiple filters can be combined.

## License

All rights reserved.
