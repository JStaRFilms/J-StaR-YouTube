# 🎬 Video Spec: Extract_Short_1_Result

## Overview
| Property | Value |
|----------|-------|
| **Type** | Short (9:16) |
| **Duration** | ~60 seconds (1800 frames @ 30fps) |
| **Resolution** | 1080x1920 |
| **FPS** | 30 |
| **Composition ID** | `ExtractShort1Result` |
| **Style** | Cyberpunk |

## Rules I Read Before Writing This Spec
- [x] animations.md
- [x] timing.md
- [x] sequencing.md
- [x] text-animations.md
- [x] fonts.md
- [x] assets.md
- [x] images.md
- [x] transitions.md

## Creative Direction
**Theme:** Cyberpunk Aesthetic. High contrast, neon accents, dark backgrounds with glowing elements.
**Vibe:** Tech-focused, "hacker" energy, transformation reveal.

### Color Palette (Cyberpunk)
| Color | Hex | Usage |
|-------|-----|-------|
| Background | #111827 | Main bg - dark gray |
| Primary Neon | #3B82F6 | Neon blue accents, highlights |
| Secondary Neon | #8B5CF6 | Neon purple accents, glows |
| Text Primary | #FFFFFF | Main headings, white |
| Text Secondary | #94A3B8 | Body text, muted |
| Success Green | #22C55E | After/success states |
| Error Red | #EF4444 | Before/glitch states |
| Grid Lines | #1F2937 | UI guides, borders |

### Typography
| Font | Family | Usage |
|------|--------|-------|
| Primary | 'Inter', sans-serif | UI Elements, Labels, Body |
| Display | 'Inter', sans-serif (900 weight) | "SAME AI???", Big headlines |
| Mono | 'Roboto Mono', monospace | Code elements, technical labels |

---

## Scene Breakdown

### Scene 1: HOOK - Split Screen Before/After (0:00-0:05)
**Duration:** 150 frames (0:00-0:05)
**Audio:** "Same AI, same model. Before skills vs after skills."

#### Visual Elements
- [ ] **Split Screen Container**: Vertical split, 50/50
  - **Top Half (BEFORE)**: 
    - Grayscale/B&W filter
    - Glitch effect overlay (random displacement)
    - Wireframe placeholder elements
    - Label: "BEFORE" in red, glitchy text
    - Background: Dark static noise
  - **Bottom Half (AFTER)**:
    - Full color, vibrant 4K quality
    - Smooth gradients, polished UI
    - Label: "AFTER" in green, clean text
    - Background: Smooth dark gradient
- [ ] **Divider Line**: Bright cyan line separating halves with glow
- [ ] **Central Text**: "SAME AI???" pulsing in center
  - Large, bold, neon blue
  - Subtle scale pulse animation

#### Animations Table
| Element | Animation | Frames | Easing |
|---------|-----------|--------|--------|
| Split Container | Fade in | 0-15 | easeOut |
| Top Half (Before) | Glitch offset (random) | 0-150 | loop |
| Top Half Opacity | Grayscale to BW | 0-30 | easeInOut |
| Bottom Half (After) | Slide up + Fade | 0-30 | spring |
| Divider Line | Width 0 → 100% | 15-45 | easeInOut |
| "BEFORE" Label | Glitch + Typewriter | 30-60 | easeOut |
| "AFTER" Label | Slide from bottom + Fade | 45-75 | spring |
| "SAME AI???" | Scale pulse 1.0 → 1.1 → 1.0 | 0-150 | loop |
| "SAME AI???" | Glow pulse | 0-150 | loop |

#### Code Approach
```tsx
// Glitch effect using random offset
const glitchOffset = useMemo(() => {
  return Array.from({ length: 150 }).map(() => 
    Math.random() > 0.9 ? (Math.random() - 0.5) * 10 : 0
  );
}, []);

// Split screen with clip-path
const clipPath = `inset(0 0 50% 0)`; // Top half
const clipPath2 = `inset(50% 0 0 0)`; // Bottom half

// Pulsing text effect
const pulseScale = interpolate(frame, [0, 75, 150], [1, 1.1, 1], {
  easing: Easing.inOut(Easing.quad),
});
```

---

### Scene 2: MEAT - Project Montage Scroll (0:05-0:50)
**Duration:** 1350 frames (0:05-0:50)
**Audio:** (Clip from Main Video: Design System Output)

#### Visual Elements
- [ ] **Scroll Container**: Vertical scrolling viewport
- [ ] **Design System Properties Cards**: Series of cards showing generated output
  - Color palette swatches with hex codes
  - Typography pairings (Inter/Roboto)
  - Spacing scale (8px, 16px, 24px, 32px, 48px)
  - Border radius examples
  - Shadow definitions
  - Component examples (Button, Card, Input)
- [ ] **Scroll Indicator**: Animated arrow showing scroll direction
- [ ] **Quality Indicators**: "4K Ready", "Production Ready" badges

#### Animations Table
| Element | Animation | Frames | Easing |
|---------|-----------|--------|--------|
| Scroll Container | Fade in | 0-30 | easeOut |
| Card 1 (Colors) | Slide up from bottom | 30-60 | spring |
| Card 2 (Typography) | Slide up from bottom | 120-150 | spring |
| Card 3 (Spacing) | Slide up from bottom | 210-240 | spring |
| Card 4 (Shadows) | Slide up from bottom | 300-330 | spring |
| Card 5 (Components) | Slide up from bottom | 390-420 | spring |
| Card 6 (Buttons) | Slide up from bottom | 480-510 | spring |
| Scroll Arrow | Rotate + Bounce | 0-1350 | loop |
| Quality Badge | Scale 0 → 1 + Glow | 60-90 | spring |
| Swatches | Stagger pop-in (5 frame delay) | 60-150 | spring |
| Typography Preview | Typewriter effect | 120-180 | linear |

#### Code Approach
```tsx
// Vertical scroll effect using translateY
const scrollY = interpolate(frame, [0, 1350], [0, -800], {
  extrapolateLeft: 'clamp',
  extrapolateRight: 'clamp',
});

// Staggered card entrance
const cardDelay = index * 90; // 3 seconds between cards
const cardProgress = spring({
  frame: frame - cardDelay,
  fps,
  config: { damping: 15, stiffness: 100 }
});

// Typewriter for text content
const textLength = Math.floor(interpolate(frame, [start, end], [0, text.length]));
const displayText = text.slice(0, textLength);
```

---

### Scene 3: CTA - Workflow Diagram + Link in Bio (0:50-End)
**Duration:** 300 frames (0:50-0:60)
**Audio:** "Want the full breakdown? I recorded the entire workflow. Link in bio 👇"

#### Visual Elements
- [ ] **Workflow Diagram**: Horizontal flow chart
  - Step 1: Input (Prompt) → Icon: Terminal
  - Step 2: Processing (AI) → Icon: Brain/Chip
  - Step 3: Output (Design System) → Icon: Palette/Grid
  - Arrows connecting steps with animation
- [ ] **"Link in Bio" Text**: Large, animated, slides up at end
  - Background: Gradient button
  - Icon: Instagram/YouTube finger point
- [ ] **Blur Overlay**: Full-screen blur that fades in
- [ ] **Sparkle Effects**: Celebration particles around CTA

#### Animations Table
| Element | Animation | Frames | Easing |
|---------|-----------|--------|--------|
| Workflow Diagram | Fade in | 0-30 | easeOut |
| Step 1 (Input) | Scale 0 → 1 | 30-60 | spring |
| Arrow 1 | Draw left → right | 60-90 | easeInOut |
| Step 2 (Process) | Scale 0 → 1 | 90-120 | spring |
| Arrow 2 | Draw left → right | 120-150 | easeInOut |
| Step 3 (Output) | Scale 0 → 1 | 150-180 | spring |
| Blur Overlay | Opacity 0 → 0.8 | 180-240 | easeInOut |
| "Link in Bio" | Slide up from bottom + Scale | 220-260 | spring |
| "Link in Bio" | Glow pulse | 240-300 | loop |
| Sparkles | Pop around CTA | 240-300 | spring |

#### Code Approach
```tsx
// Arrow path drawing using stroke-dashoffset
const arrowPathLength = arrowRef.current?.getTotalLength() || 100;
const arrowDraw = interpolate(frame, [start, end], [arrowPathLength, 0], {
  extrapolateLeft: 'clamp',
  extrapolateRight: 'clamp',
});

// Blur effect using backdrop-filter
const blurAmount = interpolate(frame, [180, 240], [0, 20], {
  extrapolateLeft: 'clamp',
  extrapolateRight: 'clamp',
});

// Button slide up
const buttonY = interpolate(frame, [220, 260], [200, 0], {
  extrapolateLeft: 'clamp',
  extrapolateRight: 'clamp',
  easing: Easing.out(Easing.back),
});
```

---

## Technical Requirements

### Schema
```ts
import { z } from "zod";

export const ExtractShort1ResultSchema = z.object({
  // Optional: Custom before/after images
  beforeImage: z.string().optional(),
  afterImage: z.string().optional(),
  
  // Optional: Custom workflow steps
  workflowSteps: z.array(z.object({
    label: z.string(),
    icon: z.string(),
  })).optional(),
  
  // Optional: CTA link URL
  ctaUrl: z.string().url().optional(),
});
```

### Components to Build
1. `SplitScreenBeforeAfter.tsx` - Vertical split with glitch/color effects
2. `GlitchText.tsx` - Animated glitch text effect
3. `ScrollMontage.tsx` - Vertical scrolling design system cards
4. `DesignSystemCard.tsx` - Individual card with colors, typography, spacing
5. `WorkflowDiagram.tsx` - Horizontal flow chart with animated arrows
6. `LinkInBioCTA.tsx` - Animated CTA button with blur overlay
7. `SparkleEffects.tsx` - Particle effects for celebration

### Critical Rules
> ⛔ FORBIDDEN: CSS transitions, CSS animations, Tailwind animation classes
> ✅ REQUIRED: All animations via `useCurrentFrame()` + `interpolate`/`spring`
> ✅ REQUIRED: `premountFor={30}` on all `<Sequence>` components
> ✅ REQUIRED: `staticFile()` for any images (if any)
> ✅ REQUIRED: Clamp extrapolation to prevent values going beyond range
> ✅ REQUIRED: Safe zone - keep critical content above bottom 20% (384px from bottom)
> ✅ REQUIRED: Use `<Series>` for sequential scene transitions

### Special Notes
- **Glitch Effect**: The BEFORE side should feel unstable and low-quality. Use random frame offsets for the glitch.
- **Color vs BW**: The AFTER side should be vibrant with the full cyberpunk palette (#3B82F6, #8B5CF6).
- **Scroll Pacing**: Keep cards appearing every ~3 seconds (90 frames) to maintain energy.
- **CTA Focus**: The "Link in Bio" should be the visual climax - use spring with overshoot for impact.
- **Frame-Accurate Timing**: All animations must be tied to `useCurrentFrame()` for smooth 30fps rendering.
