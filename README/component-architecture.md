# Component Architecture Documentation

## Overview

This document explains how all components work together in the Portfolio V3 honeycomb technology grid, with special focus on the GSAP and react-hexgrid interaction.

## Component Hierarchy

```
App.tsx
└── Technologies.tsx
    └── ReactHexGrid.tsx
        └── CustomHexagon (internal component)
            └── TechBadge.tsx
                └── HexBase.tsx
```

## Component Breakdown

### 1. App.tsx (Root Level)
**Purpose**: Application entry point and global styling
**Key Responsibilities**:
- Sets up the overall page layout with `bg-tan-neutral`
- Renders the main `Technologies` component
- Provides global CSS imports

```tsx
function App() {
  return (
    <div className='min-h-screen bg-tan-neutral text-text-1'>
      <Technologies />
    </div>
  )
}
```

### 2. Technologies.tsx (Data Layer)
**Purpose**: Data provider and layout coordinator
**Key Responsibilities**:
- Defines the technology array with hexagonal coordinates
- Renders category filter buttons
- Passes data to ReactHexGrid component

**Data Structure**:
```tsx
interface Technology {
  name: string;
  icon: React.ReactNode;
  q: number;  // Hexagonal coordinate
  r: number;  // Hexagonal coordinate  
  s: number;  // Hexagonal coordinate
}
```

**Example Technology Object**:
```tsx
{ 
  name: 'React', 
  icon: <img className="relative w-[33.65px] h-[33.65px]" alt="React" src={reactIcon} />, 
  q: -2, r: 1, s: 1  // Hexagonal coordinates for positioning
}
```

### 3. ReactHexGrid.tsx (Animation Engine)
**Purpose**: Core animation and layout engine
**Key Responsibilities**:
- Integrates react-hexgrid for mathematical positioning
- Manages GSAP animations for hover effects
- Handles responsive behavior and screen size detection
- Implements starburst animation logic

#### react-hexgrid Integration:
```tsx
<HexGrid> 
  <Layout size={getDynamicHexSize()} spacing={getDynamicSpacing()}>
    <Hexagon q={tech.q} r={tech.r} s={tech.s}>
      <foreignObject>
        <div ref={hexRef}>
          <TechBadge />
        </div>
      </foreignObject>
    </Hexagon>
  </Layout>
</HexGrid>
```

#### GSAP Animation System:
The animation system uses React refs to directly manipulate DOM elements:

```tsx
const hexRef = useRef<HTMLDivElement>(null);
const badgeRef = useRef<HTMLDivElement>(null);

// GSAP animates the refs directly, bypassing React's virtual DOM
gsap.timeline()
  .to(hexElement, {
    scale: 0.99,
    x: moveX,  // Calculated starburst direction
    y: moveY,
    duration: 0.15,
    ease: "back.out(1.7)"
  });
```

#### Starburst Animation Logic:
```tsx
// Calculate direction from hovered hex to adjacent hex
const dx = tech.q - hoveredTech.q;  // Hex coordinate difference
const dy = tech.r - hoveredTech.r;

// Convert hexagonal coordinates to screen direction
const angle = Math.atan2(dy, dx) * (180 / Math.PI);
const distance = 2; // Movement distance in pixels

const moveX = Math.cos(angle * Math.PI / 180) * distance;
const moveY = Math.sin(angle * Math.PI / 180) * distance;
```

#### Adjacency Detection:
```tsx
const areAdjacent = (tech1: Technology, tech2: Technology): boolean => {
  const dx = Math.abs(tech1.q - tech2.q);
  const dy = Math.abs(tech1.r - tech2.r);
  const dz = Math.abs(tech1.s - tech2.s);
  
  // In hexagonal grid, adjacent hexagons have exactly one coordinate 
  // difference of 1 and sum of all differences should be 2
  return (dx === 1 && dy === 1 && dz === 0) || 
         (dx === 1 && dy === 0 && dz === 1) || 
         (dx === 0 && dy === 1 && dz === 1);
};
```

### 4. TechBadge.tsx (Visual Component)
**Purpose**: Renders the actual visual content
**Key Responsibilities**:
- Displays technology icon and name
- Uses HexBase for hexagonal background
- Handles responsive scaling based on zoom level

**Structure**:
```tsx
<HexBase>
  <div className="tech-icon">
    {icon}  // Technology icon
  </div>
  <div className="tech-label">
    {name}  // Technology name
  </div>
</HexBase>
```

### 5. HexBase.tsx (Background Layer)
**Purpose**: Provides hexagonal background shape
**Key Responsibilities**:
- Renders the hexagonal background image
- Provides consistent sizing and positioning
- Acts as container for tech badge content

## How GSAP and react-hexgrid Work Together

### The Key Insight:
- **react-hexgrid** = Mathematical positioning system using hexagonal coordinates
- **GSAP** = Animation system that works on top of the positioned elements

### The Interaction Pattern:

1. **react-hexgrid** positions elements using hexagonal math:
   ```tsx
   // react-hexgrid calculates screen position from:
   q: -2, r: 1, s: 1 → screen coordinates (x, y)
   ```

2. **GSAP** then animates those positioned elements:
   ```tsx
   // GSAP takes the positioned element and animates it:
   gsap.to(hexElement, { x: moveX, y: moveY }) // Relative to current position
   ```

3. **The Starburst Effect**:
   ```tsx
   // Calculate direction from hovered hex to adjacent hex
   const dx = tech.q - hoveredTech.q;  // Hex coordinate difference
   const dy = tech.r - hoveredTech.r;
   
   // Convert to screen direction
   const angle = Math.atan2(dy, dx) * (180 / Math.PI);
   const moveX = Math.cos(angle * Math.PI / 180) * distance;
   const moveY = Math.sin(angle * Math.PI / 180) * distance;
   ```

### Why This Architecture Works So Well:

1. **Separation of Concerns**: 
   - react-hexgrid handles positioning math
   - GSAP handles animation timing/easing
   - React handles state management

2. **Direct DOM Control**: 
   - GSAP bypasses React's virtual DOM for performance
   - Uses refs to animate actual DOM elements
   - Provides smooth 60fps animations

3. **Mathematical Precision**:
   - Hexagonal coordinates provide exact positioning
   - GSAP can calculate precise animation directions
   - Perfect starburst effects based on geometric relationships

4. **Performance**:
   - GSAP's animation engine is highly optimized
   - Works directly with browser's animation APIs
   - No React re-renders during animations

## Animation States

### Hovered Hexagon:
- **Scale**: 1.04 (slight growth)
- **Duration**: 0.25s
- **Easing**: power2.out

### Adjacent Hexagons (Starburst):
- **Scale**: 0.99 (subtle shrink)
- **Movement**: 2px in calculated direction
- **Duration**: 0.15s
- **Easing**: back.out(1.7) - snappy with slight overshoot

### Reset State:
- **Scale**: 1.0 (normal size)
- **Position**: (0, 0) (original position)
- **Duration**: 0.25s
- **Easing**: power2.out

## Responsive Behavior

The system adapts to different screen sizes:

- **Mobile** (< 480px): Shows 12 technologies, smaller hex size (35px)
- **Tablet Small** (480-768px): Shows 16 technologies, medium hex size (40px)
- **Tablet** (768-1200px): Shows 20 technologies, larger hex size (45px)
- **Desktop** (> 1200px): Shows all technologies, full hex size (50px)

## Key Dependencies

- **react-hexgrid**: Handles hexagonal grid mathematics and positioning
- **gsap**: Provides high-performance animations
- **React**: State management and component lifecycle
- **Tailwind CSS**: Styling and responsive utilities

## Future Considerations

- Animation performance could be further optimized with GSAP's `will-change` property
- Consider adding more complex animations (rotation, color changes)
- Potential for adding sound effects synchronized with animations
- Could implement gesture-based interactions for mobile devices
