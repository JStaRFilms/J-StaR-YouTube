# 🎬 Video Spec: Topic_Short_3_Story_Hook_500_Designer_Vs_Ai

## Overview
| Property | Value |
|----------|-------|
| **Type** | Short (9:16) |
| **Duration** | ~20 seconds (600 frames @ 30fps) |
| **Resolution** | 1080x1920 |
| **FPS** | 30 |
| **Composition ID** | `TopicShort3StoryHook` |

## Rules I Read Before Writing This Spec
- [x] animations.md
- [x] timing.md
- [x] sequencing.md
- [x] text-animations.md
- [x] transitions.md
- [x] assets.md

## Creative Direction
**Theme:** Light Mode "Premium" Aesthetic. Clean, high-contrast, professional with Nigerian market emphasis.
**Vibe:** Story-driven transformation, "I saved money and so can you" energy.
**Special Focus:** The $500/N750,000 animation must feel GRAND - this is the hook moment for the Nigerian audience.

### Color Palette (Light Mode with Dark Accents)
| Color | Hex | Usage |
|-------|-----|-------|
| Background | #F8FAFC | Main bg - very light gray/white |
| Surface | #FFFFFF | Cards, panels, invoice |
| Text Primary | #1E293B | Main headings - dark slate |
| Text Secondary | #64748B | Body text, labels |
| Accent Blue | #3B82F6 | Primary buttons, highlights |
| Accent Purple | #8B5CF6 | Secondary accents, brain icon |
| Success Green | #22C55E | Progress bars, checkmarks, "ONLINE" |
| Warning Amber | #F59E0B | Coins, savings indicators |
| Error Red | #EF4444 | The X mark, warnings |
| Border | #E2E8F0 | Subtle borders, dividers |
| Shadow | rgba(0,0,0,0.1) | Card shadows for depth |

### Typography
| Font | Family | Usage |
|------|--------|-------|
| Primary | 'Inter', sans-serif | UI Elements, Labels, Body |
| Display | 'Inter', sans-serif (ExtraBold) | "$500", "N750,000", Big numbers |
| Mono | 'JetBrains Mono', monospace | Code elements, "SYSTEM ONLINE" |

---

## Scene Breakdown

### Scene 1: The Invoice Hook (0s - 5s)
**Duration:** 150 frames (0:00-0:05)
**Audio:** "Last month I was about to pay $500 for a designer. Then I thought... what if I teach my AI to design instead?"

#### Visual Elements
- [ ] **Invoice Card**: White card with subtle shadow, professional invoice layout
  - Header: "INVOICE #001"
  - Line items: "UI/UX Design Services"
  - **GRAND MOMENT**: "$500.00" in massive ExtraBold text (72px+)
  - **Nigerian Emphasis**: "≈ N750,000" below in slightly smaller but still prominent text
  - "DUE" stamp area in top right
- [ ] **Red X Animation**: SVG path that draws itself over the invoice
- [ ] **Brain Icon**: Purple/violet gradient brain with Pen Tool icon inside
- [ ] **Background**: Soft radial gradient from center (lighter) to edges

#### Animations Table
| Element | Animation | Frames | Easing |
|---------|-----------|--------|--------|
| Invoice Card | Scale from 0.8 → 1.0 + Fade in | 0-30 | spring |
| "$500.00" | Scale pulse 1.0 → 1.2 → 1.0 + Glow | 15-45 | spring |
| "N750,000" | Slide up from below + Fade in | 30-50 | easeOut |
| Red X | SVG stroke-dashoffset draw | 60-90 | easeInOut |
| Invoice | Shake + Fade out | 90-120 | easeIn |
| Brain Icon | Scale from 0 → 1 + Rotate slightly | 100-150 | spring |
| Pen Tool | Draw inside brain | 120-150 | easeOut |

#### Code Approach
```tsx
// Special $500/N750,000 Animation Component
// Use spring with high mass for "grand" feel
const priceScale = spring({
  frame,
  fps,
  config: { mass: 1.5, damping: 10, stiffness: 100 }
});

// Glow effect using box-shadow interpolation
const glowIntensity = interpolate(frame, [15, 30, 45], [0, 20, 0], {
  extrapolateLeft: 'clamp',
  extrapolateRight: 'clamp'
});
```

---

### Scene 2: Time Passage + System Build (5s - 9s)
**Duration:** 120 frames (0:05-0:09)
**Audio:** "6 months later, I have a system that generates design systems automatically."

#### Visual Elements
- [ ] **Time-Lapse Clock**: Circular clock with hands spinning rapidly
  - Clock face: White with subtle border
  - Hands: Dark slate color
  - Motion blur effect on hands
- [ ] **Progress Container**: Below clock, rounded rectangle
- [ ] **Progress Bar**: Filling from 0% to 100% with gradient (Blue → Purple)
- [ ] **"Generating..." Text**: Above progress bar, blinking dots
- [ ] **"SYSTEM ONLINE" Text**: Green monospace text, appears at 100%
- [ ] **Checkmark**: Green checkmark that draws itself when complete

#### Animations Table
| Element | Animation | Frames | Easing |
|---------|-----------|--------|--------|
| Clock | Rotate hands 360° × 6 (6 months) | 0-90 | linear |
| Clock | Fade out | 90-120 | easeIn |
| Progress BG | Scale X from 0 → 1 | 0-15 | spring |
| Progress Fill | Width 0% → 100% | 15-105 | easeInOut |
| "Generating..." | Opacity pulse + dots cycle | 0-105 | loop |
| "SYSTEM ONLINE" | Typewriter effect + Glow | 105-120 | linear |
| Checkmark | SVG path draw | 110-120 | easeOut |

#### Code Approach
```tsx
// Clock hands rotation - 6 full rotations over 90 frames
const rotation = (frame / 90) * 360 * 6;

// Progress bar with gradient
// Use interpolate for width percentage
const progressWidth = interpolate(frame, [15, 105], [0, 100], {
  extrapolateLeft: 'clamp',
  extrapolateRight: 'clamp'
});

// Blinking dots for "Generating..."
const dotCount = Math.floor((frame % 30) / 10) + 1; // Cycles 1-3 dots
```

---

### Scene 3: The Montage (9s - 14s)
**Duration:** 150 frames (0:09-0:14)
**Audio:** "Color palettes matched to industry. Typography pairs that actually work together. Spacing that follows real principles."

#### Visual Elements

**Clip 1: Color Swatches (0:09-0:10, 30 frames)**
- [ ] **Grid Layout**: 3x3 grid of color swatches
- [ ] **Swatches**: Rounded squares with hex codes below
- [ ] **Colors**: Tech industry palette (Blues, Purples, Neutrals)
- [ ] **Animation**: Swatches pop in one by one with stagger

**Clip 2: Font Pairing (0:10-0:12, 60 frames)**
- [ ] **Demo Card**: White card showing typography pairing
- [ ] **Heading**: "Inter + Playfair Display" in Inter Bold
- [ ] **Sample Text**: "The quick brown fox..." in Playfair Display
- [ ] **Labels**: "HEADING" and "BODY" tags
- [ ] **Animation**: Fonts slide in from sides

**Clip 3: Spacing Guide (0:12-0:14, 60 frames)**
- [ ] **UI Card**: Sample card component
- [ ] **Spacing Guides**: Red lines showing 8px, 16px, 32px spacing
- [ ] **Labels**: "8px", "16px", "32px" in red monospace
- [ ] **Animation**: Guides draw on from left to right

#### Animations Table
| Element | Animation | Frames | Easing |
|---------|-----------|--------|--------|
| **CLIP 1: Colors** |
| Grid Container | Fade in | 0-10 | easeOut |
| Swatch 1-9 | Scale 0→1 staggered (5 frame delay each) | 10-40 | spring |
| **CLIP 2: Fonts** |
| Card | Slide up + Fade | 0-15 | spring |
| "Inter" | Slide from left | 15-30 | easeOut |
| "Playfair" | Slide from right | 20-35 | easeOut |
| Sample Text | Fade in | 30-45 | easeOut |
| **CLIP 3: Spacing** |
| UI Card | Fade in | 0-10 | easeOut |
| 8px Guide | Draw line left→right | 10-25 | easeInOut |
| 16px Guide | Draw line left→right | 20-35 | easeInOut |
| 32px Guide | Draw line left→right | 30-45 | easeInOut |
| Labels | Pop in | 35-50 | spring |

#### Code Approach
```tsx
// Staggered swatch animation
const swatchDelay = index * 5;
const swatchScale = spring({
  frame: frame - swatchDelay,
  fps,
  config: { damping: 15 }
});

// Spacing guide line draw
const lineWidth = interpolate(frame, [startFrame, endFrame], [0, 100], {
  extrapolateLeft: 'clamp',
  extrapolateRight: 'clamp'
});
```

---

### Scene 4: The Transformation (14s - 17s)
**Duration:** 90 frames (0:14-0:17)
**Audio:** "My AI went from making garbage to making production-ready mockups."

#### Visual Elements
- [ ] **Slider Container**: Full width container with two halves
- [ ] **Left Side (Garbage)**: 
  - Wireframe-style UI
  - Gray boxes, misaligned elements
  - "Lorem ipsum" placeholder text
  - Label: "BEFORE" in red
- [ ] **Right Side (Gold)**:
  - High-fidelity mockup
  - Polished crypto wallet UI (reuse from existing)
  - Beautiful gradients, proper spacing
  - Label: "AFTER" in green
- [ ] **Slider Handle**: Circular handle with arrows, positioned at center initially
- [ ] **Divider Line**: Vertical line that moves with slider

#### Animations Table
| Element | Animation | Frames | Easing |
|---------|-----------|--------|--------|
| Container | Fade in | 0-15 | easeOut |
| Left Side | Slide from left | 0-20 | spring |
| Right Side | Slide from right | 0-20 | spring |
| Slider Handle | Move left→right | 20-80 | easeInOut |
| Divider | Follows handle | 20-80 | easeInOut |
| "BEFORE" Label | Fade in | 20-30 | easeOut |
| "AFTER" Label | Fade in | 60-70 | easeOut |
| Sparkles | Pop on right side at end | 70-90 | spring |

#### Code Approach
```tsx
// Slider wipe effect
const sliderPosition = interpolate(frame, [20, 80], [0, 100], {
  extrapolateLeft: 'clamp',
  extrapolateRight: 'clamp'
});

// Clip path for left/right reveal
// Left side: clip-path: inset(0 ${100 - sliderPosition}% 0 0)
// Right side: clip-path: inset(0 0 0 ${sliderPosition}%)
```

---

### Scene 5: Savings + CTA (17s - End)
**Duration:** 90 frames (0:17-0:20)
**Audio:** "Full breakdown dropping this week. This might save you thousands in design costs."

#### Visual Elements
- [ ] **Falling Coins**: Gold/amber coins falling from top (emoji or SVG)
- [ ] **Savings Graph**: Upward trending line graph
  - Line: Green gradient
  - Fill: Light green area below line
  - "Savings" label
- [ ] **"SAVE $$$" Text**: Large bold text, amber/gold color
- [ ] **CTA Card**: Video thumbnail placeholder with "WATCH NOW" button
- [ ] **Arrow**: Animated arrow pointing to CTA

#### Animations Table
| Element | Animation | Frames | Easing |
|---------|-----------|--------|--------|
| Coins | Fall from top with rotation (loop 3-4 coins) | 0-90 | easeIn |
| Graph Line | Draw from left to right | 10-50 | easeInOut |
| Graph Fill | Fade in after line | 40-60 | easeOut |
| "SAVE $$$" | Scale from 0.5 → 1.0 + Bounce | 30-50 | spring |
| "SAVE $$$" | Pulse glow | 50-90 | loop |
| CTA Card | Slide up from bottom | 50-70 | spring |
| "WATCH NOW" | Button pulse | 70-90 | loop |
| Arrow | Bounce pointing down | 60-90 | loop |

#### Code Approach
```tsx
// Falling coins with rotation
const coinY = interpolate(frame, [0, 90], [-100, 1200], {
  extrapolateLeft: 'clamp',
  extrapolateRight: 'clamp'
});
const coinRotation = frame * 3; // Continuous rotation

// Graph line draw using SVG path
const pathLength = pathRef.getTotalLength();
const drawProgress = interpolate(frame, [10, 50], [0, pathLength], {
  extrapolateLeft: 'clamp',
  extrapolateRight: 'clamp'
});
// stroke-dasharray: pathLength
// stroke-dashoffset: pathLength - drawProgress
```

---

## Technical Requirements

### Schema
```ts
import { z } from "zod";

export const TopicShort3StoryHookSchema = z.object({
  // No dynamic props needed - all content is fixed
  // Future: Could accept custom price amounts, currency, etc.
});
```

### Components to Build
1. `InvoiceCard.tsx` - The $500/N750,000 invoice with grand animation
2. `BrainWithPen.tsx` - Brain icon with pen tool inside
3. `AnimatedClock.tsx` - Spinning clock hands
4. `ProgressBar.tsx` - Filling progress with "Generating..." text
5. `ColorSwatches.tsx` - 3x3 grid with staggered animation
6. `FontPairing.tsx` - Typography demo card
7. `SpacingGuide.tsx` - UI card with red spacing indicators
8. `SliderWipe.tsx` - Before/after comparison slider
9. `GarbageWireframe.tsx` - Ugly wireframe mockup
10. `ProMockup.tsx` - High-fidelity UI mockup
11. `FallingCoins.tsx` - Animated coin particles
12. `SavingsGraph.tsx` - Upward trending area chart
13. `CTACard.tsx` - Watch now call-to-action

### Critical Rules
> ⛔ FORBIDDEN: CSS transitions, CSS animations, Tailwind animation classes
> ✅ REQUIRED: All animations via `useCurrentFrame()` + `interpolate`/`spring`
> ✅ REQUIRED: `premountFor={30}` on all `<Sequence>` components
> ✅ REQUIRED: `staticFile()` for any images (if any)
> ✅ REQUIRED: Clamp extrapolation to prevent values going beyond range
> ✅ REQUIRED: Safe zone - keep critical content above bottom 20% (384px from bottom)

### Special Notes
- **$500/N750,000 Animation**: This is the HOOK. Spend extra time making this feel impactful.
  - Use spring with higher mass for weight
  - Add glow/shadow effects
  - Consider a subtle "shake" or "pulse" to draw attention
  - The Nigerian Naira amount should be equally prominent
- **Light Mode**: All backgrounds should be light (#F8FAFC or #FFFFFF)
  - Use shadows for depth instead of glows
  - Text should be dark (#1E293B) for readability
  - Accents can still be vibrant (Blue #3B82F6, Purple #8B5CF6)
- **Pacing**: Keep cuts snappy - no scene should feel static
- **Transitions**: Use quick fades or slides between scenes (5-10 frames max)
