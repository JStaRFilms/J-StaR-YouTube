# 🎬 Video Spec: Hacker Terminal

## Overview
| Property | Value |
|----------|-------|
| **Type** | B-Roll |
| **Duration** | 15 seconds (450 frames @ 30fps) |
| **Resolution** | 1920x1080 |
| **FPS** | 30 |
| **Composition ID** | `HackerTerminal` |

## Creative Direction
A "Cyberpunk meets VS Code" aesthetic. Dark environment, neon accents (Cyan/Magenta/Green), data visualization focus. High-tech, glitchy, premium feel.

### Color Palette
| Color | Hex | Usage |
|-------|-----|-------|
| Background | #0a0a0f | Main background |
| Primary (Cyan) | #06b6d4 | UI interaction points, pulsing nodes |
| Accent (Magenta) | #ec4899 | Highlighted data, errors, alerts, intense activity |
| Text (Green) | #22c55e | Terminal text, success states |
| Dimmed Text | #4b5563 | Inactive code, background elements |

### Typography
| Font | Weight | Size | Usage |
|------|--------|------|-------|
| JetBrains Mono | 400 | 16px - 24px | Standard terminal text |
| JetBrains Mono | 700 | 32px - 48px | Headings, "Neural Coder" text |

---

## Scene Breakdown

### Scene 1: Boot Sequence (0s - 3s)
**Duration**: 3 seconds (90 frames)

#### Visual elements
- [ ] Black screen background
- [ ] Blinking Cursor (Block char `█`)
- [ ] Text: "INITIALIZING NEURAL CODER v2.4..."
- [ ] Glitchy Progress Bar

#### Animations
| Element | Animation Type | Start Frame | End Frame | Method |
|---------|----------------|-------------|-----------|--------|
| Cursor | Blink | 0 | 90 | `frame % 30 < 15 ? 1 : 0` opacity |
| Text | Typewriter | 10 | 60 | `text.slice(0, frame)` |
| Progress Bar | Linear Fill | 30 | 80 | `interpolate` 0% -> 100% |
| Text Glow | CRT Flicker | 0 | 90 | `random(frame)` jitter on opacity/shadow |

---

### Scene 2: Code Rain (3s - 7s)
**Duration**: 4 seconds (120 frames)

#### Visual Elements
- [ ] Columns of falling characters (`{ } [ ] ( ) => const async await function`)
- [ ] Depth of field effect (Blurry back layer, sharp front layer)

#### Animations
| Element | Animation Type | Start (Scene Frame) | End (Scene Frame) | Method |
|---------|----------------|---------------------|-------------------|--------|
| Columns | Drop | 0 | 120 | `interpolate(frame, [0, 120], [-100, 1200])` |
| Characters | Opacity Pulse | Random | Random | `Math.sin(frame * speed)` |
| Camera | Slow Zoom | 0 | 120 | `interpolate` scale 1 -> 1.1 |

#### Code Approach
```tsx
// Generate deterministic random columns
// Use <AbsoluteFill> layers with different Z-indexes and Blur filters
```

---

### Scene 3: AI Processing Visualization (7s - 12s)
**Duration**: 5 seconds (150 frames)

#### Visual Elements
- [ ] Neural Grid (dots connected by lines)
- [ ] Data Particles (glowing dots moving along lines)
- [ ] Central Node (Larger, pulsing)

#### Animations
| Element | Animation Type | Start (Scene Frame) | End (Scene Frame) | Method |
|---------|----------------|---------------------|-------------------|--------|
| Grid | Staggered Fade InFrom Center | 0 | 30 | `spring` per node based on distance from center |
| Connections | Draw Line | 10 | 40 | `interpolate` stroke-dashoffset |
| Center Node | Pulse | 0 | 150 | `interpolate` scale (sine wave) |
| Particles | Flow | Loops | Loops | `frame % duration` path offset |

---

### Scene 4: Output (12s - 15s)
**Duration**: 3 seconds (90 frames)

#### Visual Elements
- [ ] Terminal Window (Glassmorphism card)
- [ ] Text: "> Task completed. 847 lines generated."
- [ ] Success Checkmark
- [ ] Confetti/Particle explosion

#### Animations
| Element | Animation Type | Start (Scene Frame) | End (Scene Frame) | Method |
|---------|----------------|---------------------|-------------------|--------|
| Window | Spring Pop-up | 0 | 20 | `spring({damping: 15})` scale 0->1 |
| Text | Typewriter | 20 | 50 | `text.slice` |
| Checkmark | Scale + Rotate | 50 | 70 | `spring` + `interpolate` rotation |
| Particles | Explosion | 50 | 80 | Physics simulation (velocity/gravity) |

---

## Technical Requirements

### Dependencies
```bash
# Required packages
pnpm install @remotion/google-fonts @remotion/shapes @remotion/paths
```

### Component Structure
`src/remotion/Start.tsx` (Boot)
`src/remotion/CodeRain.tsx` (Rain)
`src/remotion/NeuralGrid.tsx` (AI)
`src/remotion/OutputTerminal.tsx` (Output)
`src/remotion/HackerTerminal.tsx` (Main Composition)

### Props Schema (Zod)
```ts
import { z } from "zod";

export const HackerTerminalSchema = z.object({
  primaryColor: z.string().default('#06b6d4'),
  accentColor: z.string().default('#ec4899'),
  textColor: z.string().default('#22c55e'),
});
```

## Verification Plan
1. **Boot**: Verify timing of text vs progress bar. Ensure CRT glow isn't seizure-inducing.
2. **Rain**: Check performance of multiple text elements. Ensure "depth" looks real (blur).
3. **AI**: Verify line connections line up with dots perfectly. Check particle flow smoothness.
4. **Output**: Tune spring damping for the window pop-up to feel "snappy" (damping ~15-20).
