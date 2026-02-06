# 🎬 Video Spec: BR-15 Before/After Reveal

## Overview
| Property | Value |
|----------|-------|
| **Type** | B-Roll |
| **Duration** | 5 seconds (150 frames @ 30fps) |
| **Resolution** | 1920x1080 |
| **FPS** | 30 |
| **Composition ID** | `BeforeAfterReveal` |
| **Script Section** | POINT 4 - Payoff (11:00-12:00) |

## Creative Direction
The ultimate comparison. Side-by-side before/after with a draggable slider feel (implied). The "same AI that made garbage before" moment. Maximum impact reveal. Think Photoshop retouching reveal videos.

### Color Palette
| Color | Hex | Usage |
|-------|-----|-------|
| Background | #0a0a0f | Dark frame |
| Before Border | #ef4444 | Red for ugly |
| After Border | #22c55e | Green for beautiful |
| Slider | #f8fafc | White divider |
| Text | #f8fafc | Labels |
| Glow | #3b82f6 | Transition effect |

---

## Scene Breakdown

### Scene 1: Before State (0s - 1.5s)
**Duration**: 1.5 seconds (45 frames)

#### Visual Elements
- [ ] Ugly output fills screen
- [ ] Red border frame
- [ ] Label: "BEFORE" with same ugly AI text
- [ ] Subtle glitch/distortion effect

#### Animations
| Element | Animation Type | Start Frame | End Frame | Method |
|---------|----------------|-------------|-----------|--------|
| Before Image | Scale In | 0 | 20 | `spring({ damping: 15 })` |
| Red Border | Pulse | 0 | 45 | Gentle red glow pulse |
| Label | Pop | 10 | 25 | Top-left badge |
| Distortion | Subtle | 0 | 45 | Slight CRT/noise effect |

---

### Scene 2: Slider Reveal (1.5s - 4s)
**Duration**: 2.5 seconds (75 frames)

#### Visual Elements
- [ ] White vertical slider appears from left
- [ ] As slider moves right, beautiful design revealed
- [ ] "After" side has green border
- [ ] Viewer sees the transformation happen live

#### Animations
| Element | Animation Type | Start Frame | End Frame | Method |
|---------|----------------|-------------|-----------|--------|
| Slider | Appear | 45 | 55 | Spring from left edge |
| Slider | Move Right | 55 | 105 | `interpolate` 0% → 100% with Easing.inOut |
| After Reveal | Clip | 55 | 105 | clipPath following slider |
| Green Border | Reveal | 55 | 105 | Following slider |
| Sparkle Trail | Follow | 55 | 105 | Particles at slider edge |

#### Slider/Reveal Implementation
```tsx
const sliderProgress = interpolate(
  frame,
  [55, 105],
  [0, 100],
  { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.inOut(Easing.quad) }
);

// Before/After masking
<div style={{ clipPath: `inset(0 ${100 - sliderProgress}% 0 0)` }}>
  <BeforeImage />
</div>
<div style={{ clipPath: `inset(0 0 0 ${sliderProgress}%)` }}>
  <AfterImage />
</div>
```

---

### Scene 3: Full After (4s - 5s)
**Duration**: 1 second (30 frames)

#### Visual Elements
- [ ] Beautiful design fills screen
- [ ] Green success border
- [ ] Text: "Same AI. Different Result."
- [ ] Subtle shine sweep
- [ ] Victory feeling

#### Animations
| Element | Animation Type | Start Frame | End Frame | Method |
|---------|----------------|-------------|-----------|--------|
| Slider | Exit | 120 | 130 | Fade out right |
| Full Border | Solidify | 120 | 130 | Green border complete |
| Text | Spring Pop | 120 | 135 | Center bottom |
| Shine | Sweep | 125 | 145 | Diagonal light sweep |
| Checkmark | Draw | 135 | 145 | Next to text |

---

## Technical Requirements

### Dependencies
```bash
pnpm install @remotion/google-fonts
```

### Props Schema (Zod)
```ts
import { z } from "zod";

export const BeforeAfterRevealSchema = z.object({
  beforeImageSrc: z.string(),
  afterImageSrc: z.string(),
  revealText: z.string().default("Same AI. Different Result."),
  sliderDuration: z.number().default(2.5), // seconds
});
```

### Slider Component
```tsx
const RevealSlider = ({ progress }: { progress: number }) => (
  <div
    style={{
      position: 'absolute',
      left: `${progress}%`,
      top: 0,
      bottom: 0,
      width: 4,
      backgroundColor: '#f8fafc',
      boxShadow: '0 0 20px rgba(255,255,255,0.8)',
      zIndex: 10,
    }}
  >
    {/* Slider handle */}
    <div style={{
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: 48,
      height: 48,
      borderRadius: '50%',
      backgroundColor: '#f8fafc',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      ◀▶
    </div>
  </div>
);
```

---

## Asset Requirements
| Asset | Type | Source | Path |
|-------|------|--------|------|
| Before Screenshot | Image | Screen capture | `public/before.png` |
| After Screenshot | Image | Screen capture | `public/after.png` |

---

## Verification Plan
1. Verify slider movement is smooth and satisfying
2. Test reveal timing creates suspense
3. Check both images are high quality and aligned
4. Ensure text is readable over both states
