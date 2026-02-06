# 🎬 Video Spec: BR-17 Design Principles Overlay

## Overview
| Property | Value |
|----------|-------|
| **Type** | B-Roll |
| **Duration** | 5 seconds (150 frames @ 30fps) |
| **Resolution** | 1920x1080 |
| **FPS** | 30 |
| **Composition ID** | `DesignPrinciplesOverlay` |
| **Script Section** | POINT 5 - Payoff (14:00-15:00) |

## Creative Direction
X-ray/analysis vision overlaid on the beautiful design. Highlighting actual design principles being applied: contrast ratios, typography hierarchy, color harmony indicators. Think "figma inspection" meets "technical analysis HUD."

### Color Palette
| Color | Hex | Usage |
|-------|-----|-------|
| Background | Beautiful Design | The mockup itself |
| Overlay | rgba(10,10,15,0.85) | Dark analysis overlay |
| Contrast Lines | #22c55e | Green for passing |
| Typography | #3b82f6 | Blue for type hierarchy |
| Color Harmony | #a855f7 | Purple for palette |
| Measurements | #06b6d4 | Cyan for spacing |

---

## Scene Breakdown

### Scene 1: Design Display (0s - 1s)
**Duration**: 1 second (30 frames)

#### Visual Elements
- [ ] Beautiful mockup from previous B-Roll
- [ ] Clean, no overlays
- [ ] Text: "Actual design principles applied..."

#### Animations
| Element | Animation Type | Start Frame | End Frame | Method |
|---------|----------------|-------------|-----------|--------|
| Mockup | Hold | 0 | 30 | Static display |
| Text | Fade In | 10 | 25 | Caption |

---

### Scene 2: Contrast Analysis (1s - 2s)
**Duration**: 1 second (30 frames)

#### Visual Elements
- [ ] Contrast ratio indicators appearing
- [ ] Lines connecting text to background
- [ ] Ratio badges: "4.5:1 ✓", "7.2:1 ✓"
- [ ] WCAG compliance checkmarks

#### Animations
| Element | Animation Type | Start Frame | End Frame | Method |
|---------|----------------|-------------|-----------|--------|
| Scan Line | Sweep | 30 | 40 | Horizontal sweep |
| Contrast Line 1 | Draw | 40 | 50 | Connect elements |
| Ratio Badge 1 | Pop | 48 | 55 | "4.5:1 ✓" |
| Contrast Line 2 | Draw | 50 | 58 | Second measurement |
| Ratio Badge 2 | Pop | 56 | 60 | "7.2:1 ✓" |

---

### Scene 3: Typography Analysis (2s - 3s)
**Duration**: 1 second (30 frames)

#### Visual Elements
- [ ] Typography hierarchy visualization
- [ ] Lines showing size ratios (1.25x, 1.5x, etc.)
- [ ] Font pairing indicator
- [ ] Labels: "H1: 48px", "Body: 16px", etc.

#### Animations
| Element | Animation Type | Start Frame | End Frame | Method |
|---------|----------------|-------------|-----------|--------|
| Type Boxes | Highlight | 60 | 70 | Blue outlines around text |
| Size Labels | Pop | 68 | 78 | Size indicators |
| Ratio Lines | Draw | 72 | 85 | Connecting lines showing ratio |
| Font Pair | Badge | 80 | 90 | "Inter + JetBrains Mono" |

---

### Scene 4: Color Harmony (3s - 4s)
**Duration**: 1 second (30 frames)

#### Visual Elements
- [ ] Color wheel overlay
- [ ] Connections showing complementary/analogous
- [ ] Extracted palette with hex codes
- [ ] Harmony type label

#### Animations
| Element | Animation Type | Start Frame | End Frame | Method |
|---------|----------------|-------------|-----------|--------|
| Color Wheel | Fade In | 90 | 100 | Centered overlay |
| Color Dots | Pop | 98 | 108 | On wheel positions |
| Harmony Lines | Draw | 105 | 115 | Connecting dots |
| Palette Strip | Slide | 108 | 118 | Extracted colors |
| Label | Pop | 115 | 120 | "Split-Complementary" |

---

### Scene 5: Full Overlay (4s - 5s)
**Duration**: 1 second (30 frames)

#### Visual Elements
- [ ] All analysis visible simultaneously
- [ ] Design "passes" all checks
- [ ] Text: "Actual design principles applied automatically."
- [ ] Success indicators everywhere

#### Animations
| Element | Animation Type | Start Frame | End Frame | Method |
|---------|----------------|-------------|-----------|--------|
| All Elements | Hold | 120 | 140 | Keep visible |
| Success Pulse | Glow | 125 | 145 | Green pulse across all |
| Text | Pop | 130 | 145 | Final verdict |
| Overlay | Fade Out | 140 | 150 | Reveal clean design |

---

## Technical Requirements

### Dependencies
```bash
pnpm install @remotion/google-fonts @remotion/shapes
```

### Props Schema (Zod)
```ts
import { z } from "zod";

const ContrastCheckSchema = z.object({
  element1: z.object({ x: z.number(), y: z.number() }),
  element2: z.object({ x: z.number(), y: z.number() }),
  ratio: z.number(),
  passes: z.boolean(),
});

export const DesignPrinciplesOverlaySchema = z.object({
  mockupSrc: z.string(),
  contrastChecks: z.array(ContrastCheckSchema),
  typography: z.object({
    h1: z.number().default(48),
    h2: z.number().default(36),
    body: z.number().default(16),
  }),
  palette: z.array(z.string()),
});
```

### Technical Analysis Visuals
```tsx
// Scan line effect
const ScanLine = ({ progress }: { progress: number }) => (
  <div
    style={{
      position: 'absolute',
      left: 0,
      right: 0,
      top: `${progress * 100}%`,
      height: 2,
      background: 'linear-gradient(90deg, transparent, #22c55e, transparent)',
      boxShadow: '0 0 10px #22c55e',
    }}
  />
);

// Contrast line connector
const ContrastLine = ({ start, end, ratio }: Props) => (
  <svg>
    <line x1={start.x} y1={start.y} x2={end.x} y2={end.y} stroke="#22c55e" strokeDasharray="5,5" />
    <text x={(start.x + end.x) / 2} y={(start.y + end.y) / 2}>{ratio}:1</text>
  </svg>
);
```

---

## Verification Plan
1. Verify analysis overlays don't obscure the design too much
2. Test animations feel like "analysis in progress"
3. Check all ratios/values are realistic
4. Ensure final reveal is clean
