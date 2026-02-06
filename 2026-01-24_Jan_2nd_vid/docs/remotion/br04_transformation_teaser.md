# 🎬 Video Spec: BR-04 Transformation Teaser

## Overview
| Property | Value |
|----------|-------|
| **Type** | B-Roll |
| **Duration** | 5 seconds (150 frames @ 30fps) |
| **Resolution** | 1920x1080 |
| **FPS** | 30 |
| **Composition ID** | `TransformationTeaser` |
| **Script Section** | HOOK - Payoff Promise (0:30-0:45) |

## Creative Direction
A "magic wand" transformation effect. The ugly design is literally being rewritten/reconstructed into the beautiful one. Code/particles flow from the ugly side and reassemble into beauty. Think "Iron Man suit assembly" meets "Thanos snap reconstruction."

### Color Palette
| Color | Hex | Usage |
|-------|-----|-------|
| Background | #0a0a0f | Canvas |
| Particle Start | #ff6b6b | Ugly decomposition |
| Particle Mid | #fbbf24 | Transition state |
| Particle End | #22c55e | Beautiful assembly |
| Magic Trail | #a855f7 | Wand/cursor trail |

---

## Scene Breakdown

### Scene 1: Ugly Display (0s - 1s)
**Duration**: 1 second (30 frames)

#### Visual Elements
- [ ] Ugly mockup on left side (65% of screen)
- [ ] Glitchy, unstable appearance
- [ ] Text: "The Problem"
- [ ] Subtle red aura

#### Animations
| Element | Animation Type | Start Frame | End Frame | Method |
|---------|----------------|-------------|-----------|--------|
| Mockup | Glitch Shake | 0 | 30 | `random(frame) * 3` translate jitter |
| Red Aura | Pulse | 0 | 30 | `Math.sin(frame * 0.5) * 0.2 + 0.8` opacity |
| Label | Fade In | 0 | 15 | `interpolate` opacity |

---

### Scene 2: Decomposition (1s - 2.5s)
**Duration**: 1.5 seconds (45 frames)

#### Visual Elements
- [ ] Ugly mockup breaking into particles
- [ ] Each pixel/section becomes a floating dot
- [ ] Particle trail as they move
- [ ] "Magic cursor" leading the transformation

#### Animations
| Element | Animation Type | Start Frame | End Frame | Method |
|---------|----------------|-------------|-----------|--------|
| Mockup | Dissolve | 30 | 60 | Particle system: split into grid, float away |
| Particles | Flow | 30 | 75 | Bezier curve paths toward right side |
| Magic Cursor | Guide Path | 30 | 75 | Leads particle movement |
| Particle Color | Gradient | 30 | 75 | `interpolate` red → yellow → green |

#### Particle System
```tsx
// Each particle follows a curved path
const particles = generateGridParticles(mockupBounds, 50); // 50x50 grid

particles.map((p, i) => ({
  startX: p.x,
  startY: p.y,
  endX: calculateNewPosition(i).x, // Maps to beautiful mockup position
  endY: calculateNewPosition(i).y,
  progress: spring({
    frame: frame - 30 - i * 0.1, // Staggered start
    fps,
    config: { damping: 200 },
  }),
}));
```

---

### Scene 3: Reconstruction (2.5s - 4s)
**Duration**: 1.5 seconds (45 frames)

#### Visual Elements
- [ ] Particles converging on right side
- [ ] Beautiful mockup assembling from particles
- [ ] Green glow on completion
- [ ] Text: "The Solution"

#### Animations
| Element | Animation Type | Start Frame | End Frame | Method |
|---------|----------------|-------------|-----------|--------|
| Particles | Converge | 75 | 105 | Continue bezier to final positions |
| Mockup | Materialize | 90 | 120 | Opacity fade in as particles land |
| Green Glow | Pulse | 100 | 130 | `spring` box-shadow spread |
| Label | Pop In | 105 | 120 | `spring({ damping: 15 })` |

---

### Scene 4: Reveal Hold (4s - 5s)
**Duration**: 1 second (30 frames)

#### Visual Elements
- [ ] Beautiful mockup prominent
- [ ] Lingering particles as "sparkles"
- [ ] Text: "Same AI. Free Skill."

#### Animations
| Element | Animation Type | Start Frame | End Frame | Method |
|---------|----------------|-------------|-----------|--------|
| Sparkles | Float + Fade | 120 | 150 | Random drift, opacity decay |
| Text | Typewriter | 125 | 145 | `text.slice()` |
| Mockup | Subtle Shine | 120 | 150 | Gradient sweep across surface |

---

## Technical Requirements

### Dependencies
```bash
pnpm install @remotion/google-fonts @remotion/shapes @remotion/paths
```

### Props Schema (Zod)
```ts
import { z } from "zod";

export const TransformationTeaserSchema = z.object({
  particleCount: z.number().default(2500), // 50x50 grid
  transitionDuration: z.number().default(1.5), // seconds
});
```

### Performance Considerations
```tsx
// Use useMemo to pre-calculate particle paths
const particlePaths = useMemo(() => {
  return Array.from({ length: particleCount }, (_, i) => 
    generateBezierPath(startPos(i), endPos(i))
  );
}, [particleCount]);
```

---

## Verification Plan
1. Test particle performance (aim for 60fps with 2500 particles)
2. Verify color transition is smooth (no jarring jumps)
3. Check that reconstruction looks "magical" not "glitchy"
4. Ensure final reveal feels satisfying
