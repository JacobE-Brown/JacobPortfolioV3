# Portfolio V3 - README Index

This folder contains comprehensive documentation for the Portfolio V3 project.

## Documentation Files

- **[component-architecture.md](./component-architecture.md)** - Detailed explanation of how all components work together, focusing on GSAP and react-hexgrid interaction

## Project Overview

Portfolio V3 is a React-based portfolio website featuring an interactive honeycomb grid of technologies. The project showcases various web development technologies with smooth animations and responsive design.

## Key Features

- Interactive honeycomb grid layout
- Smooth GSAP animations with starburst effects
- Responsive design for all screen sizes
- Technology categorization system
- Modern React architecture with TypeScript

## Quick Start

1. Install dependencies: `npm install`
2. Start development server: `npm run dev`
3. Build for production: `npm run build`

## Technology Stack

- **React 18** with TypeScript
- **Vite** for build tooling
- **Tailwind CSS** for styling
- **GSAP** for animations
- **react-hexgrid** for hexagonal layout mathematics

## Project Structure

```
src/
├── components/
│   ├── ReactHexGrid.tsx    # Main animation engine
│   ├── TechBadge.tsx       # Individual tech display
│   ├── HexBase.tsx         # Hexagonal background
│   └── Technologies.tsx    # Data layer
├── assets/
│   └── images/TechLogos/   # Technology icons
├── tokens.css              # Design system
└── App.tsx                 # Root component
```

For detailed component explanations, see [component-architecture.md](./component-architecture.md).
