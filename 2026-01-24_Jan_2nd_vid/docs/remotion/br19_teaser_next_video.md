# 🎬 Video Spec: BR-19 Teaser to Next Video

## Overview
| Property | Value |
|----------|-------|
| **Type** | B-Roll |
| **Duration** | 8 seconds (240 frames @ 30fps) |
| **Resolution** | 1920x1080 |
| **FPS** | 30 |
| **Composition ID** | `TeaserNextVideo` |
| **Script Section** | OUTRO - CTA (16:00-17:00) |

## Rules I Read Before Writing This Spec
- [x] animations.md
- [x] timing.md
- [x] sequencing.md
- [x] text-animations.md
- [x] images.md
- [x] ui-ux-pro-max (Skill)

## Creative Direction
Teaser for the next video in the series. Shows the design mockups transforming into actual working code/app. "From mockup to deployment" visual. Creates curiosity and drives watch-through to end screen.

### Color Palette [UI/UX Pro Max]
| Color | Hex | Usage |
|-------|-----|-------|
| Primary | #3b82f6 | Action/App (Blue) |
| Success | #22c55e | Code/Success (Green) |
| Warning | #fbbf24 | Transitions/Arrows (Amber) |
| Accent | #a855f7 | Magic/Glow (Purple) |
| Background | #0a0a0f | Deep Dark Void |
| Surface | #1e293b | Card/Frame Backgrounds |

---

## Scene Breakdown & Component Structure

We will split the composition into modular components for easier management and animation logic.

### 1. `MockupScene` (0s - 1.5s)
**Duration**: 45 frames
**Props**: `mockupSrc`

#### Visual Elements
- Beautiful mockup image (familiar to viewer)
- Text: "You have the design skill."
- Pulse/Glow effect on the mockup

#### Animations
- `useCurrentFrame` + `spring` for entrance.
- `interpolate` for opacity fade in of text.
- Continuous subtle breath/pulse using `Math.sin(frame)`.

### 2. `QuestionScene` (1.5s - 2.5s)
**Duration**: 30 frames

#### Visual Elements
- Text: "But what about the code?"
- Large animated Question Mark.
- Mockup shrinks/retreats to make space.

#### Animations
- Typewriter effect for text (slicing string).
- Bouncy `spring` for Question Mark pop.
- `interpolate` scale for mockup shrinking.

### 3. `TransformationScene` (2.5s - 4.5s)
**Duration**: 60 frames
**Props**: `mockupSrc`, `appPreviewSrc` (optional)

#### Visual Elements
- Animated Arrow pointing Mockup -> App.
- "Code Particles" flowing along the arrow.
- Actual App appearing in a `DeviceFrame`.

#### Animations
- Arrow path drawing using `strokeDashoffset`.
- Particle flow using loop + offset.
- App frame finding its place with a `spring` settle.

### 4. `CtaScene` (4.5s - 5s)
**Duration**: 15 frames
**Props**: `ctaText`

#### Visual Elements
- Final "Watch next →" CTA.
- subtle attention-grabbing pulse.

#### Animations
- Simple efficient `spring` pop for the text.

---

## Technical Requirements

### Dependencies
```bash
pnpm install @remotion/google-fonts @remotion/shapes
```

### Props Schema (Zod)
```ts
import { z } from "zod";

export const TeaserNextVideoSchema = z.object({
  mockupSrc: z.string(),
  appPreviewSrc: z.string().optional(),
  ctaText: z.string().default("Watch next →"),
  nextVideoTitle: z.string().default("From Mockup to Deployed App"),
});
```

### Reusable Components Needed

1. **`DeviceFrame.tsx`**
   - Wraps content in a styled window/phone frame.
   - Props: `type: 'desktop' | 'mobile'`

2. **`AnimatedArrow.tsx`**
   - SVG-based arrow with `strokeDashoffset` animation capability.
   - Gradient fill support.

3. **`CodeParticles.tsx`**
   - Small glowing syntax symbols (`{ }`, `</>`, `;`) floating across screen.

---

## Verification Plan
1. **Manual Visual Check**:
   - Scrub through 0-150 frames.
   - Verify smooth transitions between scenes (no hard cuts where not intended).
2. **Animation Feel**:
   - Verify `spring` damping is not too bouncy (aim for premium feel).
   - Check text readability during typewriter effect.
3. **Asset Loading**:
   - Ensure `staticFile()` maps correctly to public folder.
