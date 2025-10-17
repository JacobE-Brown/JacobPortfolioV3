# AI Notes: Hexagonal Grid Implementation

## Problem Context
User had overlapping hexagons on smaller screens and "scrunching down" issues when viewport shrinks. Initial implementation was using react-hexgrid library which was removed in favor of custom implementation.

## Key Issues Solved

### 1. Overlapping Hexagons
**Problem**: Hexagons overlapped on smaller screens due to insufficient scaling
**Solution**: 
- Reduced scaling factors: mobile 50%, tablet-small 60%, tablet 70%
- Added responsive padding: `p-2 sm:p-4 md:p-6 lg:p-8`
- Added minimum size constraints in CSS

### 2. Scrunching Down Issue
**Problem**: Hexagons compressed vertically when viewport shrinks
**Root Cause**: Incorrect scaling approach - was scaling individual hexagons instead of entire grid
**Solution**: Container-level scaling using CSS transform

## Technical Implementation

### Core Architecture
```javascript
// 1. Base positioning (always use consistent size)
const getHexPosition = useCallback((q: number, r: number) => {
  const x = size * (Math.sqrt(3) * q + Math.sqrt(3) / 2 * r);
  const y = size * (3 / 2 * r);
  return { x, y };
}, [size]);

// 2. Scale factor calculation
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

// 3. Container-level scaling
<div style={{ 
  transform: `scale(${getResponsiveScale()})`,
  transformOrigin: 'center'
}}>
  {/* All hexagons with base size */}
</div>
```

### Coordinate System
- Uses axial coordinates (q, r) from Red Blob Games
- Pointy-top hexagon orientation
- Formulas: `x = size * (√3 * q + √3/2 * r)`, `y = size * (3/2 * r)`
- Always use base size for positioning, scale at container level

### Responsive Strategy
- **Mobile**: 50% scale, 4:3 aspect ratio
- **Tablet-small**: 60% scale, 4:3 aspect ratio  
- **Tablet**: 70% scale, 16:9 aspect ratio
- **Desktop**: 80% scale, 21:9 aspect ratio
- **Large**: 100% scale, 21:9 aspect ratio

### CSS Classes Used
```css
.hex-grid-container {
  aspect-ratio: 16/9;
  min-height: 300px;
}

@media (max-width: 480px) {
  .hex-grid-container { aspect-ratio: 4/3; }
}

@media (min-width: 1200px) {
  .hex-grid-container { aspect-ratio: 21/9; }
}
```

### Tailwind Classes
```jsx
// Container
<div className="w-full max-w-6xl mx-auto">
  <div className="relative w-full aspect-[16/9] sm:aspect-[21/9] md:aspect-[16/9] lg:aspect-[21/9]">
    <HexGrid />
  </div>
</div>

// Grid container
<div className="hex-grid-container relative w-full h-full overflow-hidden transition-all duration-300 p-2 sm:p-4 md:p-6 lg:p-8">
```

## Key Files Modified
- `src/components/HexGrid.tsx` - Main grid logic
- `src/components/HexTile.tsx` - Individual hexagon component
- `src/components/Technologies.tsx` - Data and container
- `src/tokens.css` - Responsive styles
- `README/hexagonal-grid-implementation.md` - Documentation

## Critical Success Factors
1. **Consistent Base Sizing**: Never change individual hexagon sizes
2. **Container-Level Scaling**: Use CSS transform on entire grid
3. **Aspect Ratio Control**: CSS aspect-ratio prevents scrunching
4. **Mathematical Consistency**: Follow Red Blob Games formulas exactly
5. **Responsive Padding**: Different padding for different screen sizes

## Common Pitfalls to Avoid
- Don't use responsive size in positioning calculations
- Don't scale individual hexagons
- Don't use viewport height units without aspect ratio control
- Don't mix different scaling approaches
- Always maintain mathematical relationships from Red Blob Games
- **CRITICAL**: Don't use the same size value for both positioning and hexagon dimensions

## Label Overlap Fix (CRITICAL)

### Problem
Hexagon labels were overlapping because:
- **Positioning calculations** used `size` for center-to-center distance
- **Hexagon containers** used `size * 2` width and `size * Math.sqrt(3)` height
- This created overlap because hexagons were larger than the spacing between their centers

### Solution
Add a **spacing multiplier** to positioning calculations:

```javascript
// WRONG - causes label overlap
const x = responsiveSize * (Math.sqrt(3) * q + Math.sqrt(3) / 2 * r);
const y = responsiveSize * (3 / 2 * r);

// CORRECT - proper spacing
const spacingMultiplier = 1.2; // 20% more spacing
const x = responsiveSize * spacingMultiplier * (Math.sqrt(3) * q + Math.sqrt(3) / 2 * r);
const y = responsiveSize * spacingMultiplier * (3 / 2 * r);
```

### Why This Works
- **Maintains Red Blob Games formulas**: Still uses correct mathematical relationships
- **Increases center-to-center distance**: Hexagons positioned further apart
- **Preserves hexagon size**: Containers remain the same size
- **Eliminates overlap**: Labels have proper breathing room

### Key Insight
The **positioning size** and **hexagon container size** are different concepts:
- **Positioning**: Controls center-to-center distance between hexagons
- **Container size**: Controls actual hexagon dimensions (`size * 2` wide, `size * Math.sqrt(3)` tall)

Always use a spacing multiplier when hexagons appear too close together!

## Testing Scenarios
- Resize browser window horizontally and vertically
- Test on mobile devices (320px+ width)
- Test on tablet devices (768px+ width)
- Test on desktop (1200px+ width)
- Verify no overlapping at any size
- Verify no scrunching/compression
- Verify smooth transitions between sizes

## How to Properly Change Hex Grid Element Sizes

### ⚠️ CRITICAL: Never Change Individual Hexagon Sizes
**WRONG APPROACH:**
```javascript
// DON'T DO THIS - breaks the grid math
<HexTile size={size * 0.8} /> // Scaling individual hexes
```

**CORRECT APPROACH:**
```javascript
// DO THIS - change the base size prop
<HexGrid size={80} /> // Change the base size for entire grid
```

### Step-by-Step Guide to Resize Hexagons

#### 1. Change Base Size (Technologies.tsx)
```javascript
// In src/components/Technologies.tsx
<HexGrid 
  hexes={technologies} 
  size={60}  // ← Change this number (was 45, now 60, etc.)
  onSelect={...}
  onReturn={...}
/>
```

#### 2. Update HexBase Scaling (if needed)
The HexBase component automatically scales with the size prop, but if you need custom scaling:

```javascript
// In src/components/HexBase.tsx
const width = hexSize.x * 1.72; // Adjust multiplier if needed
const height = hexSize.y * 1.74; // Adjust multiplier if needed
```

#### 3. Update Responsive Scaling (if needed)
```javascript
// In src/components/HexGrid.tsx - getResponsiveScale()
const screenScale = screenSize === 'mobile' ? 0.5 :    // Adjust these
                   screenSize === 'tablet-small' ? 0.7 : // percentages
                   screenSize === 'tablet' ? 0.85 : 1;   // as needed
```

### Responsive Sizing Implementation

#### Option 1: Tailwind Classes (Simple)
```javascript
// In Technologies.tsx - change size based on screen size
const getResponsiveSize = () => {
  if (window.innerWidth < 480) return 40;      // Mobile
  if (window.innerWidth < 768) return 50;      // Small tablet  
  if (window.innerWidth < 1200) return 60;     // Tablet
  return 80;                                   // Desktop
};

<HexGrid size={getResponsiveSize()} />
```

#### Option 2: CSS Custom Properties (Advanced)
```css
/* In tokens.css */
:root {
  --hex-size-mobile: 40px;
  --hex-size-tablet: 60px;
  --hex-size-desktop: 80px;
}

@media (max-width: 480px) {
  .hex-grid-container { --hex-size: var(--hex-size-mobile); }
}
@media (min-width: 1200px) {
  .hex-grid-container { --hex-size: var(--hex-size-desktop); }
}
```

#### Option 3: React State with Resize Listener (Recommended)
```javascript
// In HexGrid.tsx
const [responsiveSize, setResponsiveSize] = useState(size);

useEffect(() => {
  const updateSize = () => {
    const width = window.innerWidth;
    if (width < 480) setResponsiveSize(size * 0.5);
    else if (width < 768) setResponsiveSize(size * 0.7);
    else if (width < 1200) setResponsiveSize(size * 0.85);
    else setResponsiveSize(size);
  };
  
  updateSize();
  window.addEventListener('resize', updateSize);
  return () => window.removeEventListener('resize', updateSize);
}, [size]);
```

### Why Tailwind `sm:` Classes Won't Work Directly
Tailwind's responsive classes like `sm:size-20` won't work for the hex grid because:
1. The `size` prop is a JavaScript value, not a CSS class
2. The grid uses mathematical positioning that needs consistent base values
3. Responsive changes need to recalculate the entire grid layout

### Best Practice: Use React State + useEffect
```javascript
const [hexSize, setHexSize] = useState(60);

useEffect(() => {
  const updateHexSize = () => {
    const width = window.innerWidth;
    if (width < 480) setHexSize(40);
    else if (width < 768) setHexSize(50);
    else if (width < 1200) setHexSize(60);
    else setHexSize(80);
  };
  
  updateHexSize();
  window.addEventListener('resize', updateHexSize);
  return () => window.removeEventListener('resize', updateHexSize);
}, []);

<HexGrid size={hexSize} />
```

## Future Improvements
- Add animation when scaling changes
- Consider adding more breakpoints
- Optimize for very small screens (< 320px)
- Add keyboard navigation
- Consider adding hexagon selection animations
