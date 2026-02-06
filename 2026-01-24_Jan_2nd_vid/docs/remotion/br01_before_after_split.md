# 🎬 Video Spec: BR-01 Before/After Split Screen

## Overview
| Property | Value |
|----------|-------|
| **Type** | B-Roll |
| **Duration** | 5 seconds (150 frames @ 30fps) |
| **Resolution** | 1920x1080 |
| **FPS** | 30 |
| **Composition ID** | `BeforeAfterSplit` |
| **Script Section** | HOOK - First Frame (0:00-0:05) |

## Creative Direction
Dramatic thumbnail recreation with a sharp vertical divide. Left side shows ugly, generic AI output with desaturated/red tint. Right side shows beautiful, professional design with vibrant colors. The split animates in with a glowing divider line.

### Color Palette
| Color | Hex | Usage |
|-------|-----|-------|
| Background | #0a0a0f | Canvas |
| Bad Tint | #ff6b6b | Left side overlay (20% opacity) |
| Good Glow | #22c55e | Right side glow |
| Divider | #ffffff | Center split line |
| Divider Glow | #06b6d4 | Glowing edge effect |

---

## Scene Breakdown

### Scene 1: Left Side Reveal (0s - 1.5s)
**Duration**: 1.5 seconds (45 frames)

#### Visual Elements
- [ ] "BEFORE" label (top left, red accent)
- [ ] Ugly UI mockup (desaturated, gray boxes, Comic Sans vibes)
- [ ] Red error indicators scattered
- [ ] Subtle static/noise overlay

#### Animations
| Element | Animation Type | Start Frame | End Frame | Method |
|---------|----------------|-------------|-----------|--------|
| Left Panel | Slide In | 0 | 30 | `interpolate` x: -960 → 0 with `Easing.out(Easing.exp)` |
| BEFORE Label | Fade + Scale | 20 | 40 | `spring({ damping: 20 })` scale 0.8 → 1 |
| Red Tint | Fade In | 30 | 45 | `interpolate` opacity 0 → 0.2 |
| Noise | Constant | 0 | 45 | `random(frame)` based noise |

---

### Scene 2: Glowing Divider (1.5s - 2.5s)
**Duration**: 1 second (30 frames)

#### Visual Elements
- [ ] Vertical glowing line (center of screen)
- [ ] Particle sparks emanating from line
- [ ] Electric pulse effect

#### Animations
| Element | Animation Type | Start Frame | End Frame | Method |
|---------|----------------|-------------|-----------|--------|
| Divider Line | Scale Height | 45 | 60 | `spring({ damping: 15 })` 0 → 1080 |
| Glow | Pulse | 45 | 75 | `Math.sin(frame * 0.2) * 20 + 30` blur |
| Sparks | Explosion | 50 | 75 | Random velocity particles |

---

### Scene 3: Right Side Reveal (2.5s - 4s)
**Duration**: 1.5 seconds (45 frames)

#### Visual Elements
- [ ] "AFTER" label (top right, green accent)
- [ ] Beautiful UI mockup (proper colors, typography, spacing)
- [ ] Success indicators, checkmarks
- [ ] Subtle shine/gradient sweep

#### Animations
| Element | Animation Type | Start Frame | End Frame | Method |
|---------|----------------|-------------|-----------|--------|
| Right Panel | Slide In | 75 | 105 | `interpolate` x: 1920 → 960 with `Easing.out(Easing.exp)` |
| AFTER Label | Fade + Scale | 85 | 105 | `spring({ damping: 20 })` |
| Shine Sweep | Move | 90 | 120 | `interpolate` x: 960 → 1920 (diagonal shine) |

---

### Scene 4: Impact Hold (4s - 5s)
**Duration**: 1 second (30 frames)

#### Visual Elements
- [ ] Both sides visible
- [ ] Divider pulsing subtly
- [ ] Text overlay: "Same AI. Different Result."

#### Animations
| Element | Animation Type | Start Frame | End Frame | Method |
|---------|----------------|-------------|-----------|--------|
| Text | Spring Pop | 120 | 140 | `spring({ damping: 12 })` scale 0 → 1 |
| Divider | Continuous Pulse | 105 | 150 | `1 + Math.sin(frame * 0.3) * 0.05` scale |

---

## Technical Requirements

### Dependencies
```bash
pnpm install @remotion/google-fonts @remotion/shapes
```

### Props Schema (Zod)
```ts
import { z } from "zod";

export const BeforeAfterSplitSchema = z.object({
  beforeLabel: z.string().default("BEFORE"),
  afterLabel: z.string().default("AFTER"),
  impactText: z.string().default("Same AI. Different Result."),
});
```

### Component Structure
```
src/remotion/broll/
├── BeforeAfterSplit.tsx (Main Composition)
├── components/
│   ├── UglyMockup.tsx
│   ├── BeautifulMockup.tsx
│   └── GlowingDivider.tsx
```

---

## Verification Plan
1. Verify slide timing feels snappy but not jarring
2. Check glow effect doesn't bleed too much
3. Ensure text is readable against both backgrounds
4. Test with actual mockup screenshots if available
