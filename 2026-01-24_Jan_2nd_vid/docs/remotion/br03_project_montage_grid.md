# 🎬 Video Spec: BR-03 Project Montage Grid

## Overview
| Property | Value |
|----------|-------|
| **Type** | B-Roll |
| **Duration** | 5 seconds (150 frames @ 30fps) |
| **Resolution** | 1920x1080 |
| **FPS** | 30 |
| **Composition ID** | `ProjectMontageGrid` |
| **Script Section** | HOOK - Input Bias Flex (0:15-0:30) |

## Creative Direction
A dynamic grid showcasing 20+ real project screenshots. Cards fly in from all directions, stack, and reorganize. "Credibility wall" effect - overwhelming evidence of expertise. Think Pinterest board meets Apple Keynote.

### Color Palette
| Color | Hex | Usage |
|-------|-----|-------|
| Background | #0a0a0f | Dark canvas |
| Card Border | #1e293b | Subtle card edges |
| Glow | #3b82f6 | Hover/focus glow |
| Overlay Gradient | #000000 → transparent | Edge fade |

---

## Scene Breakdown

### Scene 1: Card Explosion (0s - 2s)
**Duration**: 2 seconds (60 frames)

#### Visual Elements
- [ ] 20+ project screenshot cards
- [ ] Cards arranged in 5x4 grid (with some overlap)
- [ ] Slight rotation on each card (±5°)
- [ ] Drop shadows for depth

#### Animations
| Element | Animation Type | Start Frame | End Frame | Method |
|---------|----------------|-------------|-----------|--------|
| Card 1-5 | Fly from Top | 0 | 30 | `spring` y: -200 → final, staggered delay |
| Card 6-10 | Fly from Left | 5 | 35 | `spring` x: -300 → final |
| Card 11-15 | Fly from Right | 10 | 40 | `spring` x: 2200 → final |
| Card 16-20 | Fly from Bottom | 15 | 45 | `spring` y: 1280 → final |
| All Cards | Scale Pop | staggered | - | `spring({ damping: 15 })` 0.5 → 1 |

#### Stagger Pattern
```tsx
const getDelay = (index: number) => index * 3; // 3 frames between each card
```

---

### Scene 2: Grid Pulse (2s - 3.5s)
**Duration**: 1.5 seconds (45 frames)

#### Visual Elements
- [ ] All cards in place
- [ ] Sequential glow highlight (wave effect)
- [ ] Text overlay: "20+ Real Projects"

#### Animations
| Element | Animation Type | Start Frame | End Frame | Method |
|---------|----------------|-------------|-----------|--------|
| Glow Wave | Diagonal Sweep | 60 | 90 | Cards glow based on distance from corner |
| Number Counter | Count Up | 60 | 80 | `Math.floor(interpolate(frame, [60,80], [0, 20]))` |
| Text | Spring In | 70 | 85 | `spring({ damping: 12 })` |

---

### Scene 3: Showcase Zoom (3.5s - 5s)
**Duration**: 1.5 seconds (45 frames)

#### Visual Elements
- [ ] Camera zooms into center
- [ ] Outer cards blur/fade
- [ ] Spotlight on 3-4 hero projects

#### Animations
| Element | Animation Type | Start Frame | End Frame | Method |
|---------|----------------|-------------|-----------|--------|
| Container | Zoom | 105 | 135 | `interpolate` scale 1 → 1.3 |
| Edge Cards | Blur + Fade | 105 | 130 | `interpolate` blur 0 → 8, opacity 1 → 0.3 |
| Center Cards | Glow | 110 | 140 | `interpolate` boxShadow spread |

---

## Technical Requirements

### Dependencies
```bash
pnpm install @remotion/google-fonts
```

### Props Schema (Zod)
```ts
import { z } from "zod";

export const ProjectMontageGridSchema = z.object({
  projects: z.array(z.object({
    src: z.string(),
    name: z.string(),
  })).default([]),
  counterText: z.string().default("20+ Real Projects"),
});
```

### Grid Layout
```tsx
// 5 columns, 4 rows, with random slight offsets
const gridPositions = Array.from({ length: 20 }, (_, i) => ({
  x: (i % 5) * (1920 / 5) + 50 + Math.random() * 20,
  y: Math.floor(i / 5) * (1080 / 4) + 50 + Math.random() * 20,
  rotation: (Math.random() - 0.5) * 10, // ±5 degrees
}));
```

---

## Asset Requirements
| Asset | Type | Source | Path |
|-------|------|--------|------|
| Project Screenshots (20+) | Images | Screenshots | `public/projects/*.png` |

---

## Verification Plan
1. Verify all 20 cards animate in without visual clutter
2. Test performance with 20+ image elements
3. Check glow wave timing feels natural
4. Ensure zoom doesn't crop important elements
