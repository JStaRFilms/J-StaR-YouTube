# 🎬 Video Spec: Short 3 - Demo vs Real App (Light Mode V3)

## Overview
| Property | Value |
|----------|-------|
| **Type** | Short (9:16) |
| **Duration** | 45 seconds (1350 frames @ 30fps) |
| **Resolution** | 1080x1920 |
| **FPS** | 30 |
| **Composition ID** | `Short3DemoVsReal` |

## Rules I Read Before Writing This Spec
- [x] animations.md
- [x] timing.md
- [x] sequencing.md
- [x] text-animations.md
- [x] assets.md

## Creative Direction
A highly kinetic, **pure light-mode** visual experience. Since there is no on-camera video, the typography and UI metaphors must carry 100% of the visual interest. The theme shifts from "smooth, flawless AI generation" (soft drop shadows, glassmorphism, bright white/cyan/mint) to "chaotic reality of production" (red warning cards snapping, frantic lines, shattered layout grids).

### Color Palette (Strictly Light Mode)
| Color | Hex | Usage |
|-------|-----|-------|
| Background | `#FAFAFA` | Base off-white canvas |
| Surface | `#FFFFFF` | UI elements, cards |
| Accent (Good) | `#0EA5E9` | Light cyan for the "perfect AI" parts |
| Accent (Bad) | `#EF4444` | Piercing red for the "reality/broken" parts |
| Text Primary | `#0F172A` | Deep slate for maximal contrast |
| Text Secondary| `#64748B` | Subtle text for UI mockups |

### Typography
| Font | Weight | Size | Usage |
|------|--------|------|-------|
| Inter | 800 (ExtraBold) | 120px | Big punchy hook words, aggressive tracking |
| JetBrains Mono | 600 | 60px | Code snippets, technical terms |
| Inter | 500 (Medium) | 40px | Mock UI text |

---

## Scene Breakdown

### Scene 1: The 5-Minute Illusion (0s - 8s)
**Duration**: 8 seconds (240 frames)
**VO:** "Your 5-minute AI app is a ticking time bomb. Sure, it looks amazing at first. Clean layout. Smooth animations. Flawless UI."

#### Visual Elements
- Background: Very subtle animated mesh gradient (`#ffffff`, `#f0f9ff`).
- Text: "TICKING TIME BOMB" hits the screen aggressively. Word-by-word scale pop.
- A beautiful, perfectly structured abstract UI card slides in smoothly from the bottom, looking pristine with soft drop shadows.

#### Animations
| Element | Type | Easing |
|---------|------|--------|
| Target Text | `spring` | `damping: 20, stiffness: 200` (Snappy) |
| UI Card Entry | `spring` | `damping: 200` (Smooth, no bounce) |

#### Code Approach
```tsx
const frame = useCurrentFrame();
const scale = spring({ frame, fps, config: { damping: 20, stiffness: 200 } });
```

---

### Scene 2: Production Reality (8s - 26s)
**Duration**: 18 seconds (540 frames)
**VO:** "But here is what happens when you actually put it into production. Security gaps you never saw coming. Broken logic that corrupts your data. And missing checks that crash everything when real users touch it."

#### Visual Elements
- The pristine UI card starts glitching (rapid position X offsets).
- **Security gaps:** Neon red slash marks slice through the UI card. 
- **Broken logic:** Code blocks (`JetBrains Mono`) appear and turn red instantly. A smooth flowchart quickly devolves into overlapping red lines.
- **Missing checks:** `[!] Error` modals cascade rapidly towards the camera, filling the screen.

#### Animations
| Element | Type | Easing |
|---------|------|--------|
| Modal Cascade | `spring` with stagger | `damping: 15, stiffness: 120` (Slight heavy bounce) |
| Glitch Effect | `interpolate` | Step interpolation over 3-frame intervals |

---

### Scene 3: The 90/10 Rule (26s - 36s)
**Duration**: 10 seconds (300 frames)
**VO:** "AI is incredible at the first 90%. But the last 10% is where projects go to die. That's why I stopped judging AI tools by their first result..."

#### Visual Elements
- A massive progress bar fills the center of the screen.
- It races smoothly from 0% to 90% (Cyan), then SLAMS to a halt.
- The bar turns Red and violently shakes at 90%. The text "10%" pulses aggressively.

#### Animations
| Element | Type | Easing |
|---------|------|--------|
| Progress 0-90 | `interpolate` | `Easing.out(Easing.exp)` |
| Shake | Math.sin(frame) | Quick high-frequency offsets |

---

### Scene 4: The Pivot & CTA (36s - 45s)
**Duration**: 9 seconds (270 frames)
**VO:** "...and started judging them by how hard it is to actually finish the job. I break down exactly how to survive this in the full video."

#### Visual Elements
- Everything clears out to pure white. 
- Massive typography: "FINISH THE JOB" with an animated highlighter sweep underneath.
- A glowing cyan arrow points to the bottom UI of YouTube Shorts (directing them to the related video link).

#### Animations
| Element | Type | Easing |
|---------|------|--------|
| Highlighter | `interpolate` mask width | `Easing.inOut(Easing.quad)` |

---

## Technical Requirements

### Required Tools
- Everything MUST use `useCurrentFrame()` and `interpolate()`/`spring()`.
- No CSS animations, no Tailwind `animate-` utilities.
- Absolute positioning across the board.
- Strict use of `<Sequence>` with `premountFor={1 * fps}`.
