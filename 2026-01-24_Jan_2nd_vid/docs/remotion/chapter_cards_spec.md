# 🎬 Video Spec: Chapter Card Transitions

## Overview
| Property | Value |
|----------|-------|
| **Type** | B-Roll (Chapter Separators) |
| **Duration** | 3 seconds each × 3 cards = 9 seconds total (270 frames @ 30fps) |
| **Resolution** | 1920×1080 |
| **FPS** | 30 |
| **Composition ID** | `ChapterCards` |

## Rules I Read Before Writing This Spec
- [x] animations.md - All animations via `useCurrentFrame()`
- [x] timing.md - Spring/interpolate patterns, clamping
- [x] sequencing.md - `premountFor` on all Sequences
- [x] text-animations.md - Typewriter via string slicing
- [x] fonts.md - Google Fonts with `@remotion/google-fonts`

## Creative Direction
**Concept**: Colorful, playful chapter separators with floating geometric shapes and vibrant gradients. Each card has its own unique color palette that pops. The vibe is "premium motion graphics meets Gen Z energy."

### Color Palette

**Card 1: "THE MYTH"** - Warm sunset vibes
| Color | Hex | Usage |
|-------|-----|-------|
| BG Gradient Start | `#ff6b6b` | Coral red |
| BG Gradient End | `#feca57` | Golden yellow |
| Float Shapes | `#fff`, `#ffe66d`, `#ff9f43` | Mixed warm |
| Text | `#ffffff` | White with subtle shadow |

**Card 2: "THE FIX"** - Cool ocean vibes
| Color | Hex | Usage |
|-------|-----|-------|
| BG Gradient Start | `#48dbfb` | Sky blue |
| BG Gradient End | `#0abde3` | Ocean teal |
| Float Shapes | `#fff`, `#c8d6e5`, `#00d2d3` | Mixed cool |
| Text | `#ffffff` | White with subtle shadow |

**Card 3: "THE PROOF"** - Fresh mint vibes
| Color | Hex | Usage |
|-------|-----|-------|
| BG Gradient Start | `#1dd1a1` | Mint green |
| BG Gradient End | `#10ac84` | Forest green |
| Float Shapes | `#fff`, `#badc58`, `#26de81` | Mixed greens |
| Text | `#ffffff` | White with subtle shadow |

### Typography
| Font | Weight | Size | Usage |
|------|--------|------|-------|
| Outfit | 800 | 140px | Chapter title (bold, modern) |
| Outfit | 400 | 32px | Optional subtitle |

---

## Scene Breakdown

### Card 1: "THE MYTH" (0s - 3s)
**Duration**: 3 seconds (90 frames)
**Placement in main video**: Between Hook → Breaking Beliefs
**Palette**: Coral red → Golden yellow gradient

#### Visual Elements
- [ ] Vibrant gradient background (coral → yellow)
- [ ] 8-12 floating geometric shapes (circles, squares, triangles, blobs)
- [ ] Bold "THE MYTH" text - scale-in entrance
- [ ] Subtle drop shadow on text

#### Floating Shapes Specs
| Shape | Size Range | Color | Behavior |
|-------|------------|-------|----------|
| Circles | 30-80px | White, #ffe66d | Float up, rotate slowly |
| Squares | 20-50px | White, #ff9f43 | Float diagonally, rotate |
| Triangles | 25-60px | #ffe66d | Drift left/right |
| Blobs | 40-100px | White @ 0.3 opacity | Slow float |

#### Animations
| Element | Type | Start Frame | End Frame | Config |
|---------|------|-------------|-----------|--------|
| Background | Instant | 0 | 0 | Gradient already visible |
| Shapes | Float in | 0 | 90 | Continuous, staggered starts |
| Text | Scale in | 15 | 45 | `spring({ damping: 12 })` bouncy |
| Text Shadow | Fade in | 30 | 50 | Subtle depth |

---

### Card 2: "THE FIX" (3s - 6s)
**Duration**: 3 seconds (90 frames)
**Placement in main video**: Between Point 1 → Point 2
**Palette**: Sky blue → Ocean teal gradient

#### Visual Elements
- [ ] Vibrant gradient background (sky → teal)
- [ ] 8-12 floating geometric shapes (cool colors)
- [ ] Bold "THE FIX" text - scale-in entrance

#### Floating Shapes Specs
| Shape | Size Range | Color | Behavior |
|-------|------------|-------|----------|
| Circles | 30-80px | White, #c8d6e5 | Float up |
| Hexagons | 25-55px | White, #00d2d3 | Rotate, drift |
| Diamonds | 20-45px | #c8d6e5 | Float diagonally |

#### Animations
| Element | Type | Start Frame | End Frame | Config |
|---------|------|-------------|-----------|--------|
| Background | Instant | 0 | 0 | - |
| Shapes | Float in | 0 | 90 | Continuous movement |
| Text | Scale in | 15 | 45 | `spring({ damping: 12 })` |

---

### Card 3: "THE PROOF" (6s - 9s)
**Duration**: 3 seconds (90 frames)
**Placement in main video**: Between Point 4 → Point 5
**Palette**: Mint green → Forest green gradient

#### Visual Elements
- [ ] Vibrant gradient background (mint → forest)
- [ ] 8-12 floating geometric shapes (green tones)
- [ ] Bold "THE PROOF" text - scale-in entrance

#### Floating Shapes Specs
| Shape | Size Range | Color | Behavior |
|-------|------------|-------|----------|
| Circles | 30-80px | White, #badc58 | Float up |
| Stars | 25-50px | White, #26de81 | Rotate, sparkle |
| Triangles | 20-45px | #badc58 | Drift |

#### Animations
| Element | Type | Start Frame | End Frame | Config |
|---------|------|-------------|-----------|--------|
| Background | Instant | 0 | 0 | - |
| Shapes | Float in | 0 | 90 | Continuous movement |
| Text | Scale in | 15 | 45 | `spring({ damping: 12 })` |

---

## Technical Requirements

### File Structure
```
src/compositions/ChapterCards/
├── index.tsx              # Main composition (Series of 3 cards)
├── ChapterCard.tsx        # Reusable card component
├── GradientBackground.tsx # Vibrant gradient background
├── FloatingShapes.tsx     # Floating geometric shapes generator
└── shapes/
    ├── Circle.tsx
    ├── Square.tsx
    ├── Triangle.tsx
    ├── Hexagon.tsx
    ├── Star.tsx
    └── Blob.tsx
```

### Props Schema (Zod)
```ts
import { z } from "zod";

export const ChapterCardSchema = z.object({
  title: z.string(),           // "THE MYTH", "THE FIX", "THE PROOF"
  gradientStart: z.string(),   // Hex color for gradient start
  gradientEnd: z.string(),     // Hex color for gradient end
  shapeColors: z.array(z.string()), // Array of hex colors for shapes
});

export const ChapterCardsSchema = z.object({
  cards: z.array(ChapterCardSchema).default([
    { title: "THE MYTH", gradientStart: "#ff6b6b", gradientEnd: "#feca57", shapeColors: ["#fff", "#ffe66d", "#ff9f43"] },
    { title: "THE FIX", gradientStart: "#48dbfb", gradientEnd: "#0abde3", shapeColors: ["#fff", "#c8d6e5", "#00d2d3"] },
    { title: "THE PROOF", gradientStart: "#1dd1a1", gradientEnd: "#10ac84", shapeColors: ["#fff", "#badc58", "#26de81"] },
  ]),
});
```

### Critical Rules (MEMORIZED)
> ⛔ FORBIDDEN: CSS transitions, CSS animations, Tailwind animation classes
> ✅ REQUIRED: All animations via `useCurrentFrame()` + `interpolate()`/`spring()`
> ✅ REQUIRED: `premountFor={1 * fps}` on all `<Sequence>` components
> ✅ REQUIRED: `staticFile()` for public folder assets
> ✅ REQUIRED: Clamp extrapolation to prevent values going beyond range

---

## Code Approach

### Floating Shape Movement (Continuous)
```tsx
const frame = useCurrentFrame();

// Each shape has unique offset for staggered movement
const floatY = interpolate(
  (frame + offsetFrames) % 180,  // Loop every 6 seconds
  [0, 90, 180],
  [startY, startY - 100, startY],  // Float up then back
  { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' }
);

const rotate = interpolate(
  frame,
  [0, 180],
  [0, 360 * rotationDirection],  // Full rotation over 6 sec
);
```

### Text Scale-In (Bouncy Spring)
```tsx
const frame = useCurrentFrame();
const { fps } = useVideoConfig();

const scale = spring({
  frame: frame - 15,  // Start at frame 15 (0.5s delay)
  fps,
  config: { damping: 12 },  // Bouncy entrance!
});

// Clamp to prevent scale going below 0
const clampedScale = Math.max(0, scale);

<div style={{ transform: `scale(${clampedScale})` }}>
  {title}
</div>
```

### Gradient Background
```tsx
<AbsoluteFill
  style={{
    background: `linear-gradient(135deg, ${gradientStart} 0%, ${gradientEnd} 100%)`,
  }}
/>
```

### Shape Generator (Random but Deterministic)
```tsx
// Use seeded random for deterministic positions
const shapes = useMemo(() => {
  const seed = title.charCodeAt(0);
  return Array.from({ length: 10 }, (_, i) => ({
    id: i,
    x: seededRandom(seed + i * 7) * 1920,
    y: seededRandom(seed + i * 13) * 1080,
    size: 30 + seededRandom(seed + i * 17) * 50,
    color: shapeColors[i % shapeColors.length],
    type: ['circle', 'square', 'triangle'][i % 3],
    delay: i * 5,  // Staggered start
  }));
}, [title, shapeColors]);
```

---

## Render Options

### Option A: Single Composition (Recommended)
Render all 3 cards in one 9-second composition with `<Series>`. Export, then slice in editor.

### Option B: Individual Compositions
Create 3 separate 3-second compositions:
- `ChapterCard_Myth`
- `ChapterCard_Fix`
- `ChapterCard_Proof`

**Recommendation**: Option A is simpler to manage.

---

## Verification Plan

### Start Studio
```bash
pnpm start
```

### Manual Verification
1. Open `ChapterCards` composition in browser
2. Scrub through timeline - verify:
   - [ ] Card 1: Warm coral→yellow gradient, shapes floating, "THE MYTH" scales in with bounce
   - [ ] Card 2: Cool blue→teal gradient, "THE FIX" scales in
   - [ ] Card 3: Green gradient, "THE PROOF" scales in
   - [ ] Shapes move continuously throughout each 3-second card
   - [ ] Text has subtle drop shadow for depth
   - [ ] No console errors
3. Render test frame at each card's peak visibility (frame 60 of each)

