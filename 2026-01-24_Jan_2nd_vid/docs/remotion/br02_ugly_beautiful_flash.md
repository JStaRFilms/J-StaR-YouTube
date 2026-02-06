# 🎬 Video Spec: BR-02 Ugly vs Beautiful Flash

## Overview
| Property | Value |
|----------|-------|
| **Type** | B-Roll |
| **Duration** | 3 seconds (90 frames @ 30fps) |
| **Resolution** | 1920x1080 |
| **FPS** | 30 |
| **Composition ID** | `UglyBeautifulFlash` |
| **Script Section** | HOOK - Context & Stakes (0:05-0:15) |

## Creative Direction
Rapid-fire toggling between ugly and beautiful outputs. Like a glitchy comparison that emphasizes the dramatic difference. Each flash gets faster, building tension. Think "flash photography" meets "found footage corruption."

### Color Palette
| Color | Hex | Usage |
|-------|-----|-------|
| Background | #0a0a0f | Base |
| Ugly Flash | #ff4444 | Red flash overlay on ugly |
| Beautiful Flash | #22c55e | Green flash overlay on beautiful |
| Glitch Color | #06b6d4 | RGB shift/chromatic aberration |

---

## Scene Breakdown

### Scene 1: Slow Flash Intro (0s - 1s)
**Duration**: 1 second (30 frames)

#### Visual Elements
- [ ] Ugly mockup (full screen)
- [ ] Screen shake on transition
- [ ] Red "X" stamps appearing

#### Animations
| Element | Animation Type | Start Frame | End Frame | Method |
|---------|----------------|-------------|-----------|--------|
| Ugly Screen | Flash In | 0 | 15 | `interpolate` opacity 0 → 1 |
| X Stamp 1 | Stamp | 10 | 15 | `spring({ damping: 8 })` scale 0 → 1 |
| Screen | Shake | 0 | 30 | `Math.sin(frame * 2) * 5` translateX |

---

### Scene 2: Rapid Toggle (1s - 2.5s)
**Duration**: 1.5 seconds (45 frames)

#### Visual Elements
- [ ] Alternating between ugly and beautiful
- [ ] Chromatic aberration on transitions
- [ ] Speed lines / motion blur

#### Animations
| Element | Animation Type | Start Frame | End Frame | Method |
|---------|----------------|-------------|-----------|--------|
| Toggle | Binary Flip | 30 | 75 | `frame % (decreasing interval)` |
| RGB Split | Glitch | At transitions | - | offset red/blue channels ±10px |
| Flash | White Burst | Each transition | - | 2-frame white overlay |

#### Toggle Timing
```tsx
// Toggle speeds up over time
const intervals = [15, 12, 9, 6, 4, 3, 2, 2, 2]; // frames per toggle
```

---

### Scene 3: Beautiful Victory (2.5s - 3s)
**Duration**: 0.5 seconds (15 frames)

#### Visual Elements
- [ ] Beautiful mockup (held)
- [ ] Green checkmark stamp
- [ ] Confetti particles
- [ ] Text: "First Try."

#### Animations
| Element | Animation Type | Start Frame | End Frame | Method |
|---------|----------------|-------------|-----------|--------|
| Beautiful | Slam In | 75 | 78 | `spring({ stiffness: 400 })` scale 1.1 → 1 |
| Checkmark | Bounce | 78 | 85 | `spring({ damping: 8 })` |
| Confetti | Explosion | 78 | 90 | Particle system |
| Text | Typewriter | 80 | 90 | `text.slice(0, chars)` |

---

## Technical Requirements

### Dependencies
```bash
pnpm install @remotion/google-fonts
```

### Props Schema (Zod)
```ts
import { z } from "zod";

export const UglyBeautifulFlashSchema = z.object({
  uglyImageSrc: z.string().optional(),
  beautifulImageSrc: z.string().optional(),
  victoryText: z.string().default("First Try."),
});
```

### Effects Implementation

#### Chromatic Aberration
```tsx
// Apply to container on transition frames
const rgbOffset = isTransitioning ? 10 : 0;
<div style={{
  filter: `
    drop-shadow(${rgbOffset}px 0 0 rgba(255,0,0,0.5))
    drop-shadow(${-rgbOffset}px 0 0 rgba(0,0,255,0.5))
  `
}}>
```

---

## Verification Plan
1. Ensure toggle doesn't cause seizure-inducing flashing (minimum 3 frames per state)
2. Test chromatic aberration visibility
3. Verify final hold feels like "victory"
