# 🎬 Video Spec: BR-08 Garbage to Gold Alchemy

## Overview
| Property | Value |
|----------|-------|
| **Type** | B-Roll |
| **Duration** | 5 seconds (150 frames @ 30fps) |
| **Resolution** | 1920x1080 |
| **FPS** | 30 |
| **Composition ID** | `GarbageToGoldAlchemy` |
| **Script Section** | POINT 1 - Bridge (2:30-3:30) |

## Rules I Read Before Writing This Spec
- [x] animations.md
- [x] timing.md
- [x] sequencing.md
- [x] transitions.md
- [x] text-animations.md
- [x] fonts.md
- [x] assets.md
- [x] images.md

## Creative Direction
Medieval alchemy meets modern code. A literal garbage can transforms into a golden bar. Magical transmutation circle, arcane symbols that are actually code snippets. "The fix isn't more detailed prompts... it's giving AI a design brain."

### Color Palette
| Color | Hex | Usage |
|-------|-----|-------|
| Background | #0a0a0f | Dark void |
| Garbage | #6b7280 | Trash can gray |
| Magic Circle | #a855f7 | Purple arcane glow |
| Gold | #fbbf24 | Final golden state |
| Spark | #f8fafc | Magical particles |
| Rune Text | #06b6d4 | Code snippets as runes |

### Typography
| Font | Weight | Size | Usage |
|------|--------|------|-------|
| JetBrains Mono | Regular | 16-24px | Code runes |
| Inter | Bold | 64px | Main text |

---

## Scene Breakdown

### Scene 1: The Garbage (0s - 1s)
**Duration**: 1 second (30 frames)

#### Visual Elements
- [ ] 3D-style garbage can (or flat illustration)
- [ ] Trash overflowing (code snippets, bad designs)
- [ ] Dim, sad lighting
- [ ] Text: "This is the garbage."

#### Animations
| Element | Type | Start | End | Method |
|---------|------|-------|-----|--------|
| Garbage Can | Bounce In | 0 | 20 | `spring({ damping: 10 })` |
| Overflow Items | Scatter | 10 | 25 | `spring` with random delays |
| Text | Fade In | 15 | 30 | `interpolate(frame, [15, 30], [0, 1])` |

#### Code Approach
```tsx
// Frame-by-frame animation using useCurrentFrame()
const frame = useCurrentFrame();
const opacity = interpolate(frame, [15, 30], [0, 1], { extrapolateRight: 'clamp' });
const scale = spring({ frame, fps, config: { damping: 10 } });
```

---

### Scene 2: Magic Circle Appears (1s - 2.5s)
**Duration**: 1.5 seconds (45 frames)

#### Visual Elements
- [ ] Glowing transmutation circle (rotating)
- [ ] Outer ring with design principle "runes"
- [ ] Inner geometric patterns
- [ ] Energy gathering toward center

#### Animations
| Element | Type | Start | End | Method |
|---------|------|-------|-----|--------|
| Outer Circle | Draw + Rotate | 30 | 55 | `interpolate` strokeDashoffset |
| Inner Patterns | Fade In | 40 | 60 | `interpolate` opacity (staggered) |
| Runes | Typewriter | 45 | 70 | `text.slice()` appearing around circle |
| Glow | Intensify | 30 | 75 | `interpolate` shadow spread |

#### Code Approach
```tsx
// SVG Circle Draw
const pathLength = 1760;
const drawing = interpolate(frame, [30, 55], [pathLength, 0], { extrapolateRight: 'clamp' });
// Rotation
const rotation = interpolate(frame, [30, 150], [0, 360]); // Continuous rotation
```

---

### Scene 3: Transmutation (2.5s - 4s)
**Duration**: 1.5 seconds (45 frames)

#### Visual Elements
- [ ] Garbage can dissolves in light
- [ ] Intense flash at peak
- [ ] Golden particles reforming
- [ ] Gold bar materializing

#### Animations
| Element | Type | Start | End | Method |
|---------|------|-------|-----|--------|
| Garbage | Dissolve | 75 | 95 | `interpolate` opacity + scale up |
| Flash | Burst | 90 | 100 | White overlay opacity 0->1->0 |
| Gold Bar | Materialize | 105 | 120 | `spring` scale from 0 + opacity |

---

### Scene 4: Golden Victory (4s - 5s)
**Duration**: 1 second (30 frames)

#### Visual Elements
- [ ] Gleaming gold bar/ingot
- [ ] Sparkle effects
- [ ] Text: "Now let's turn it into gold."

#### Animations
| Element | Type | Start | End | Method |
|---------|------|-------|-----|--------|
| Gold Bar | Shine | 120 | 135 | Moving gradient highlight using `interpolate` |
| Text | Spring In | 125 | 140 | `spring({ damping: 12 })` |

---

## Technical Requirements

### Props Schema (Zod)
```ts
import { z } from "zod";

export const GarbageToGoldAlchemySchema = z.object({
  runes: z.array(z.string()).default([
    '{ color: harmony }',
    '{ font: paired }',
    '{ spacing: 8pt }',
    '{ contrast: WCAG }',
    '{ hierarchy: clear }',
    '{ whitespace: breathe }',
  ]),
  goldText: z.string().default("Now let's turn it into gold."),
});
```

### Critical Rules (MEMORIZE THESE)
> ⛔ FORBIDDEN: CSS transitions, CSS animations, Tailwind animation classes
> ✅ REQUIRED: All animations via useCurrentFrame() + interpolate()/spring()
> ✅ REQUIRED: premountFor={1 * fps} on all <Sequence> components
> ✅ REQUIRED: staticFile() for public folder assets
> ✅ REQUIRED: Clamp extrapolation to prevent values going beyond range
