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
| Element | Animation Type | Start Frame | End Frame | Method |
|---------|----------------|-------------|-----------|--------|
| Garbage Can | Bounce In | 0 | 20 | `spring({ damping: 10 })` |
| Overflow Items | Scatter | 10 | 25 | Random positions around can |
| Text | Fade In | 15 | 30 | Simple opacity |

---

### Scene 2: Magic Circle Appears (1s - 2.5s)
**Duration**: 1.5 seconds (45 frames)

#### Visual Elements
- [ ] Glowing transmutation circle (rotating)
- [ ] Outer ring with design principle "runes":
  - `{ color: harmony }`
  - `font: paired }`
  - `spacing: 8pt grid }`
- [ ] Inner geometric patterns
- [ ] Energy gathering toward center

#### Animations
| Element | Animation Type | Start Frame | End Frame | Method |
|---------|----------------|-------------|-----------|--------|
| Outer Circle | Draw + Rotate | 30 | 55 | SVG stroke + continuous rotation |
| Inner Patterns | Fade In | 40 | 60 | Staggered opacity |
| Runes | Typewriter | 45 | 70 | `text.slice()` appearing around circle |
| Energy | Converge | 50 | 75 | Particles moving to center |
| Glow | Intensify | 30 | 75 | `interpolate` shadow spread |

#### Transmutation Circle Design
```tsx
// Nested circles with code-themed runes
const circles = [
  { radius: 300, stroke: 3, rotation: 0 },      // Outer
  { radius: 250, stroke: 2, rotation: 'reverse' },
  { radius: 200, stroke: 1, rotation: 0 },
];

const runes = [
  '{ color: harmony }',
  '{ font: paired }',
  '{ spacing: 8pt }',
  '{ contrast: WCAG }',
  '{ hierarchy: clear }',
  '{ whitespace: breathe }',
];
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
| Element | Animation Type | Start Frame | End Frame | Method |
|---------|----------------|-------------|-----------|--------|
| Garbage | Dissolve | 75 | 95 | Particle break-up, fade |
| Flash | Burst | 90 | 100 | White overlay, quick fade |
| Gold Particles | Gather | 95 | 115 | Converge to center |
| Gold Bar | Materialize | 105 | 120 | Opacity + `spring` scale |
| Circle | Pulse + Fade | 90 | 120 | Final pulse, then fade out |

---

### Scene 4: Golden Victory (4s - 5s)
**Duration**: 1 second (30 frames)

#### Visual Elements
- [ ] Gleaming gold bar/ingot
- [ ] Sparkle effects
- [ ] Text: "Now let's turn it into gold."
- [ ] Warm golden ambient glow

#### Animations
| Element | Animation Type | Start Frame | End Frame | Method |
|---------|----------------|-------------|-----------|--------|
| Gold Bar | Shine | 120 | 135 | Moving gradient highlight |
| Sparkles | Float | 120 | 150 | Random position twinkles |
| Text | Spring In | 125 | 140 | `spring({ damping: 12 })` |
| Background | Warm Shift | 120 | 150 | Subtle golden tint |

---

## Technical Requirements

### Dependencies
```bash
pnpm install @remotion/google-fonts @remotion/shapes @remotion/paths
```

### Props Schema (Zod)
```ts
import { z } from "zod";

export const GarbageToGoldAlchemySchema = z.object({
  runes: z.array(z.string()).default([
    '{ color: harmony }',
    '{ font: paired }',
    '{ spacing: 8pt }',
  ]),
  goldText: z.string().default("Now let's turn it into gold."),
});
```

### SVG Circle Implementation
```tsx
// Rotating transmutation circle
const TransmutationCircle = ({ progress }: { progress: number }) => (
  <svg viewBox="0 0 600 600">
    <circle
      cx={300}
      cy={300}
      r={280}
      fill="none"
      stroke="#a855f7"
      strokeWidth={3}
      strokeDasharray={1760}
      strokeDashoffset={1760 * (1 - progress)}
      style={{
        transform: `rotate(${progress * 360}deg)`,
        transformOrigin: 'center',
      }}
    />
    {/* Inner circles and runes... */}
  </svg>
);
```

---

## Verification Plan
1. Verify alchemy circle feels "magical" not "cheesy"
2. Test flash timing (shouldn't be too bright/long)
3. Check gold bar has satisfying weight/presence
4. Ensure rune text is readable but not too prominent
