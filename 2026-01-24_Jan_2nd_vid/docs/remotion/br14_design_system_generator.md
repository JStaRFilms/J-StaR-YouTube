# 🎬 Video Spec: BR-14 Design System Generator

## Overview
| Property | Value |
|----------|-------|
| **Type** | B-Roll |
| **Duration** | 10 seconds (300 frames @ 30fps) |
| **Resolution** | 1920x1080 |
| **FPS** | 30 |
| **Composition ID** | `DesignSystemGenerator` |
| **Script Section** | POINT 4 - Content (9:00-11:00) |

## Creative Direction
The centerpiece B-Roll. A terminal-style interface generating a complete design system in real-time. Matrix-style data rain transforms into organized color palettes, typography scales, and component previews. "Holy shit" moment.

### Color Palette
| Color | Hex | Usage |
|-------|-----|-------|
| Background | #0a0a0f | Matrix void |
| Terminal Glow | #22c55e | Classic green terminal |
| Data Rain | #06b6d4 | Cyan falling code |
| Generated Colors | Dynamic | From generated palette |
| Card BG | #141420 | Component preview cards |
| Success | #22c55e | Generation complete |

---

## Scene Breakdown

### Scene 1: Terminal Boot (0s - 2s)
**Duration**: 2 seconds (60 frames)

#### Visual Elements
- [ ] Retro terminal window appearing
- [ ] Boot text:
  ```
  > DESIGN_SYSTEM_ENGINE v2.0
  > Loading skill: ui-ux-pro-max...
  > Analyzing project requirements...
  > Initializing generators...
  ```
- [ ] Blinking cursor
- [ ] Green phosphor glow

#### Animations
| Element | Animation Type | Start Frame | End Frame | Method |
|---------|----------------|-------------|-----------|--------|
| Terminal | Pop + Glow | 0 | 15 | `spring` + box-shadow |
| Boot Line 1 | Typewriter | 10 | 22 | `text.slice()` |
| Boot Line 2 | Typewriter | 22 | 34 | `text.slice()` |
| Boot Line 3 | Typewriter | 34 | 46 | `text.slice()` |
| Boot Line 4 | Typewriter | 46 | 58 | `text.slice()` |
| Cursor | Blink | 0 | 60 | `frame % 15 < 8` |

---

### Scene 2: Data Processing (2s - 4s)
**Duration**: 2 seconds (60 frames)

#### Visual Elements
- [ ] Hex codes raining down (Matrix style)
- [ ] Color swatches forming from the rain
- [ ] Progress indicator: "Generating palette..."
- [ ] Numbers/values scrolling

#### Animations
| Element | Animation Type | Start Frame | End Frame | Method |
|---------|----------------|-------------|-----------|--------|
| Code Rain | Fall | 60 | 120 | Multiple columns of hex codes |
| Rain Speed | Accelerate | 60 | 100 | Speed increases |
| Swatch 1 | Materialize | 80 | 95 | From dissolving hex codes |
| Swatch 2 | Materialize | 88 | 103 | Staggered |
| Swatch 3 | Materialize | 96 | 111 | Staggered |
| Swatch 4 | Materialize | 104 | 119 | Staggered |
| Progress Bar | Fill | 60 | 120 | Under terminal |

#### Code Rain Implementation
```tsx
const CodeRain = ({ columns = 20 }) => {
  return (
    <AbsoluteFill>
      {Array.from({ length: columns }).map((_, i) => (
        <RainColumn
          key={i}
          x={i * (1920 / columns)}
          characters={generateHexCodes()}
          speed={0.5 + Math.random() * 0.5}
          delay={Math.random() * 30}
        />
      ))}
    </AbsoluteFill>
  );
};

const generateHexCodes = () => [
  '#3b82f6', '#22c55e', '#f59e0b', '#ef4444',
  '#8b5cf6', '#06b6d4', '#ec4899', '#14b8a6',
  // More...
];
```

---

### Scene 3: Typography Generation (4s - 6s)
**Duration**: 2 seconds (60 frames)

#### Visual Elements
- [ ] Font names appearing
- [ ] Typography scale forming:
  - H1: 48px Inter Bold
  - H2: 36px Inter Semibold
  - Body: 16px Inter Regular
- [ ] Font previews rendering
- [ ] Text: "97 researched palettes..."

#### Animations
| Element | Animation Type | Start Frame | End Frame | Method |
|---------|----------------|-------------|-----------|--------|
| Terminal Clear | Wipe | 120 | 125 | Quick clear |
| Font Search | Typewriter | 125 | 140 | "> Matching typography..." |
| H1 Preview | Slide In | 145 | 160 | From left, with spec |
| H2 Preview | Slide In | 155 | 170 | Staggered |
| Body Preview | Slide In | 165 | 180 | Staggered |
| Scale Lines | Draw | 160 | 180 | Connecting size hierarchy |

---

### Scene 4: Component Preview (6s - 8s)
**Duration**: 2 seconds (60 frames)

#### Visual Elements
- [ ] Split screen: code on left, preview on right
- [ ] Components generating:
  - Button (primary, secondary)
  - Card
  - Input field
- [ ] Live preview updating as code appears

#### Animations
| Element | Animation Type | Start Frame | End Frame | Method |
|---------|----------------|-------------|-----------|--------|
| Split | Divide | 180 | 195 | Screen splits |
| Code | Typewriter | 190 | 230 | Code appearing |
| Button Preview | Spring | 200 | 210 | Preview renders |
| Card Preview | Spring | 215 | 225 | Preview renders |
| Input Preview | Spring | 225 | 235 | Preview renders |
| Connection Lines | Draw | 205 | 235 | Code → Preview links |

---

### Scene 5: Completion (8s - 10s)
**Duration**: 2 seconds (60 frames)

#### Visual Elements
- [ ] Full design system dashboard view
- [ ] All components visible
- [ ] Terminal: "✓ Design system complete. 847 tokens generated."
- [ ] Sparkle/success animation

#### Animations
| Element | Animation Type | Start Frame | End Frame | Method |
|---------|----------------|-------------|-----------|--------|
| Dashboard | Zoom Out | 240 | 260 | Reveal full system |
| Success Message | Typewriter | 250 | 275 | With checkmark |
| Counter | Count Up | 260 | 280 | "847 tokens" |
| Sparkles | Celebration | 275 | 300 | Particle burst |
| Glow | Intensify | 280 | 300 | Golden success glow |

---

## Technical Requirements

### Dependencies
```bash
pnpm install @remotion/google-fonts @remotion/shapes
```

### Props Schema (Zod)
```ts
import { z } from "zod";

export const DesignSystemGeneratorSchema = z.object({
  palette: z.array(z.string()).default([
    '#3b82f6', '#22c55e', '#f59e0b', '#ef4444', '#8b5cf6'
  ]),
  fonts: z.object({
    heading: z.string().default('Inter'),
    body: z.string().default('Inter'),
  }),
  tokenCount: z.number().default(847),
});
```

### Performance Optimization
```tsx
// Pre-render code rain with useMemo
const rainColumns = useMemo(() => 
  generateRainColumns(20, fps * 4), // 4 seconds of rain
  [fps]
);

// Use CSS containment for independent animations
const columnStyle = {
  contain: 'layout style paint',
};
```

---

## Verification Plan
1. Verify code rain doesn't tank performance
2. Test typography preview is readable
3. Check component previews match the generated palette
4. Ensure "847 tokens" counter builds excitement
