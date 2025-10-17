# Hexagonal Grid Implementation

## Overview

This portfolio uses a custom hexagonal grid system to display technology skills in an organic, honeycomb-like layout. The implementation is built from scratch using React, TypeScript, and GSAP animations, providing complete control over layout, responsiveness, and interactions.

## Why Hexagons?

Hexagons are the most efficient way to pack circles in 2D space (like a honeycomb). In a portfolio context, they create an organic, visually appealing way to display skills that feels more natural than a rigid rectangular grid.

## Architecture

### Core Components

#### `HexGrid.tsx` - The Container
- Calculates positions for all hexagons using hexagonal coordinate math
- Centers the entire grid in the viewport
- Handles responsive filtering (fewer items on mobile)
- Manages selection state and animations
- Implements keyboard navigation (Escape key)

#### `HexTile.tsx` - Individual Hexagons
- Renders the TechBadge component inside each hexagon
- Handles hover/click interactions
- Applies GSAP animations for smooth transitions
- Positions itself based on calculated coordinates

#### `Technologies.tsx` - Data & Layout
- Contains the technology data with hexagonal coordinates
- Defines the honeycomb pattern layout
- Integrates the HexGrid component

## Coordinate System: QRS (Axial Coordinates)

Instead of using regular X,Y coordinates, we use a **hexagonal coordinate system**:

```javascript
// Each hexagon has three coordinates: q, r, s
// But we only store q and r because: q + r + s = 0
// So s = -q - r (we calculate it when needed)
```

**Why this system?**
- Makes hexagonal math much simpler
- Easy to calculate distances, neighbors, and positions
- Based on the [Red Blob Games guide](https://www.redblobgames.com/grids/hexagons/) - the gold standard for hex grids

## Positioning Math: Pointy-Top Formulas

```javascript
// Convert hexagonal coordinates to pixel positions
const x = size * (Math.sqrt(3) * q + Math.sqrt(3) / 2 * r);
const y = size * (3 / 2 * r);
```

**Breaking this down:**
- `size` = the radius of each hexagon
- `Math.sqrt(3)` ≈ 1.732 (the magic number for hexagons)
- The `x` formula handles horizontal spacing and row offsets
- The `y` formula handles vertical spacing between rows

## Layout Pattern: Honeycomb Structure

Our grid follows this pattern:
```
Row 1: 3 items  (top point)     - Figma, Education, AWS
Row 2: 4 items  (offset left)   - Vue, React, Vite, Tailwind
Row 3: 5 items  (widest)        - C#, .NET, Bootstrap, CSS, HTML
Row 4: 4 items  (offset left)   - JS, TS, Kotlin, Jetpack
Row 5: 5 items  (wide)          - Python, Android, Linux, Arch, SQL
Row 6: 2 items  (bottom point)  - Django, GitHub
```

**Why this pattern?**
- Creates a diamond/hexagonal shape
- Each row alternates between "aligned" and "offset" positions
- Mimics natural honeycomb structure

## Data Structure

```javascript
const technologies = [
  { 
    id: 'react',           // Unique identifier
    label: 'React',        // Display name
    icon: <ReactIcon />,   // React component
    q: 0, r: 0            // Hexagonal coordinates
  },
  // ... more technologies
]
```

## Responsive System

```javascript
// Scale hexagons down on smaller screens with proper spacing
const getResponsiveSize = useCallback(() => {
  switch (screenSize) {
    case 'mobile': return size * 0.5;      // 50% of original size (more spacing)
    case 'tablet-small': return size * 0.6; // 60% of original size
    case 'tablet': return size * 0.7;       // 70% of original size
    default: return size;                   // Full size on desktop
  }
}, [size, screenSize]);

// Always show all hexagons
const getFilteredHexes = useCallback(() => {
  return hexes; // Show all hexes on all screen sizes
}, [hexes]);
```

**Why this approach?**
- **No Content Loss**: All technologies remain visible on all screen sizes
- **Proportional Scaling**: Hexagons scale down proportionally to fit smaller screens
- **Prevents Overlapping**: Smaller scaling factors with proper padding prevent hexagons from overlapping
- **Maintains Aspect Ratio**: Container uses CSS aspect-ratio to prevent "scrunching"
- **Maintains Layout**: The honeycomb pattern is preserved across all devices
- **Better UX**: Users can see all skills regardless of device

**Aspect Ratio Solution:**
```jsx
// Container with stable aspect ratio
<div className="relative w-full aspect-[16/9] sm:aspect-[21/9] md:aspect-[16/9] lg:aspect-[21/9]">
  <HexGrid />
</div>
```

**Proper Scaling Implementation (Based on Red Blob Games):**
```javascript
// 1. Always use base size for positioning calculations
const getHexPosition = useCallback((q: number, r: number) => {
  const x = size * (Math.sqrt(3) * q + Math.sqrt(3) / 2 * r);
  const y = size * (3 / 2 * r);
  return { x, y };
}, [size]);

// 2. Calculate scale factor based on container dimensions
const getResponsiveScale = useCallback(() => {
  const maxWidth = containerSize.width * 0.8;
  const maxHeight = containerSize.height * 0.8;
  
  const bounds = getGridBounds();
  const gridWidth = Math.abs(bounds.maxX - bounds.minX);
  const gridHeight = Math.abs(bounds.maxY - bounds.minY);
  
  const widthScale = maxWidth / (gridWidth + size * 2);
  const heightScale = maxHeight / (gridHeight + size * 2);
  
  const scale = Math.min(widthScale, heightScale, 1);
  return Math.max(scale * screenScale, 0.3);
}, [size, screenSize, containerSize, getGridBounds]);

// 3. Apply scaling at container level, not individual hexagons
<div style={{ transform: `scale(${getResponsiveScale()})` }}>
  {/* All hexagons positioned with base size */}
</div>
```

**Tailwind Integration:**
```jsx
// Responsive container with proper padding
<div className="hex-grid-container relative w-full h-full overflow-hidden 
                transition-all duration-300 p-2 sm:p-4 md:p-6 lg:p-8">

// Responsive height classes
<div className="w-full h-[70vh] sm:h-[75vh] md:h-[80vh] lg:h-[85vh] xl:h-[90vh]">
```

**CSS Media Queries:**
```css
@media (max-width: 480px) {
  .hex-grid-container { padding: 0.5rem; }
  .hex-tile { min-width: 60px; min-height: 60px; }
}

@media (max-width: 768px) {
  .hex-grid-container { padding: 1rem; }
  .hex-tile { min-width: 70px; min-height: 70px; }
}
```

## Animation System (GSAP)

```javascript
// When a hex is selected:
// 1. Selected hex scales up and moves to center
// 2. Adjacent hexes stay visible (highlighted)
// 3. Non-adjacent hexes fade out
// 4. Smooth transitions between states
```

**Animation States:**
- **Normal**: All hexes visible, normal size
- **Selected**: One hex highlighted, others fade or stay
- **Hover**: Subtle scale effects

## Key Technical Decisions

### Why Custom Implementation vs Library?
- **Full Control**: Custom animations, responsive behavior
- **Performance**: No external dependencies
- **Flexibility**: Easy to modify and extend
- **Learning**: Understanding the math behind hex grids

### Why Pointy-Top vs Flat-Top?
- **Visual Appeal**: More dynamic, less rigid
- **Space Efficiency**: Better use of vertical space
- **Modern Look**: Feels more contemporary

### Why Axial Coordinates vs Others?
- **Simplicity**: Easier math than cube coordinates
- **Storage**: Only need to store 2 values (q, r)
- **Algorithms**: Standard operations work well

## The Math Behind the Magic

The key insight is that hexagons have **three axes** (like a cube), but we only use two for storage. The third axis is always calculated as `s = -q - r`.

**Distance between hexes:**
```javascript
// Two hexes are adjacent if exactly one coordinate differs by 1
const dx = Math.abs(hex1.q - hex2.q);
const dy = Math.abs(hex1.r - hex2.r);
const dz = Math.abs((hex1.q + hex1.r) - (hex2.q + hex2.r));
return (dx === 1 && dy === 1 && dz === 0) || 
       (dx === 1 && dy === 0 && dz === 1) || 
       (dx === 0 && dy === 1 && dz === 1);
```

## Usage

```tsx
<HexGrid 
  hexes={technologies} 
  size={45}
  onSelect={(id) => console.log('Selected:', id)}
  onReturn={() => console.log('Returned to grid')}
/>
```

## Dependencies

- **React**: Component framework
- **TypeScript**: Type safety
- **GSAP**: Smooth animations
- **Tailwind CSS**: Styling

## File Structure

```
src/components/
├── HexGrid.tsx          # Main grid container
├── HexTile.tsx          # Individual hexagon component
├── Technologies.tsx     # Data and layout
├── TechBadge.tsx        # Technology display component
└── HexBase.tsx          # Hexagonal background shape
```

## Common Questions

**Q: "Why not just use CSS Grid?"**
A: CSS Grid is rectangular - it can't create true hexagonal layouts. Hexagons need custom positioning math.

**Q: "Why not use a library like react-hexgrid?"**
A: We started with that, but needed more control over animations, responsive behavior, and styling.

**Q: "How do you calculate the positions?"**
A: We use the standard pointy-top hexagon formulas from Red Blob Games, which convert hexagonal coordinates to pixel positions.

**Q: "Why this specific coordinate system?"**
A: Axial coordinates (q, r) are the sweet spot - simpler than cube coordinates but more powerful than offset coordinates.

## References

- [Red Blob Games - Hexagonal Grids](https://www.redblobgames.com/grids/hexagons/) - The definitive guide to hexagonal grid mathematics
- [GSAP Documentation](https://greensock.com/docs/) - Animation library
- [React Documentation](https://react.dev/) - Component framework

## Why This Approach Works

1. **Mathematically Sound**: Based on proven hexagonal grid theory
2. **Visually Appealing**: Creates organic, natural-looking layouts
3. **Responsive**: Adapts to different screen sizes gracefully
4. **Interactive**: Smooth animations and hover effects
5. **Maintainable**: Clean, well-documented code structure

The implementation is essentially a **custom hexagonal grid engine** built specifically for this portfolio, giving complete control over the layout, animations, and responsive behavior while maintaining the mathematical correctness of a proper hexagonal grid system.
