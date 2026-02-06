# 🎬 Video Spec: BR-16 Three-Way Comparison Grid

## Overview
| Property | Value |
|----------|-------|
| **Type** | B-Roll |
| **Duration** | 10 seconds (300 frames @ 30fps) |
| **Resolution** | 1920x1080 |
| **FPS** | 30 |
| **Composition ID** | `ThreeWayComparisonGrid` |
| **Script Section** | POINT 5 - The 3-Way Comparison (12:00-14:00) |

## Creative Direction
The ultimate proof. Three columns showing Vanilla AI, Workflow Only, and Full Stack (Workflow + Skill) side by side. Sequential reveal that builds to the obvious winner. "Same prompt, three setups" visual proof.

### Color Palette
| Color | Hex | Usage |
|-------|-----|-------|
| Background | #0a0a0f | Dark canvas |
| Column 1 (Bad) | #ef4444 | Red border |
| Column 2 (Meh) | #f59e0b | Orange/yellow border |
| Column 3 (Good) | #22c55e | Green border |
| Dividers | #1e293b | Column separators |
| Winner Glow | #22c55e | Highlight on winner |

---

## Scene Breakdown

### Scene 1: Prompt Display (0s - 2s)
**Duration**: 2 seconds (60 frames)

#### Visual Elements
- [ ] Prompt appearing at top:
  "Build a landing page for VaultX - a premium crypto wallet app. Dark mode, modern aesthetic."
- [ ] Three empty columns below
- [ ] Labels: "Test 1", "Test 2", "Test 3"

#### Animations
| Element | Animation Type | Start Frame | End Frame | Method |
|---------|----------------|-------------|-----------|--------|
| Prompt Card | Pop In | 0 | 15 | `spring({ damping: 15 })` |
| Prompt Text | Typewriter | 10 | 45 | Full prompt |
| Column 1 | Fade In | 35 | 45 | Empty placeholder |
| Column 2 | Fade In | 40 | 50 | Empty placeholder |
| Column 3 | Fade In | 45 | 55 | Empty placeholder |
| Labels | Pop | 50 | 60 | "Test 1/2/3" |

---

### Scene 2: Test 1 - Vanilla AI (2s - 4s)
**Duration**: 2 seconds (60 frames)

#### Visual Elements
- [ ] Column 1 label: "Vanilla AI"
- [ ] Ugly output loads in
- [ ] X stamp
- [ ] Label: "Generic. Wrong fonts. No cohesion."
- [ ] Red vignette

#### Animations
| Element | Animation Type | Start Frame | End Frame | Method |
|---------|----------------|-------------|-----------|--------|
| Label Change | Pop | 60 | 70 | "Vanilla AI" |
| Loading | Simulate | 65 | 90 | Fake loading bar |
| Ugly Output | Reveal | 85 | 100 | Image fades in |
| X Stamp | Slam | 100 | 108 | Red X |
| Critique | Typewriter | 105 | 118 | Below output |
| Red Border | Glow | 100 | 120 | Pulsing red |

---

### Scene 3: Test 2 - Workflow Only (4s - 6s)
**Duration**: 2 seconds (60 frames)

#### Visual Elements
- [ ] Column 2 label: "Workflow Only"
- [ ] Medium output loads
- [ ] Tilde (~) stamp (meh)
- [ ] Label: "Better process. Colors still off."
- [ ] Orange/yellow border

#### Animations
| Element | Animation Type | Start Frame | End Frame | Method |
|---------|----------------|-------------|-----------|--------|
| Label Change | Pop | 120 | 130 | "Workflow Only" |
| Loading | Simulate | 125 | 150 | Fake loading |
| Medium Output | Reveal | 145 | 160 | Image fades in |
| ~ Stamp | Pop | 160 | 168 | Orange tilde |
| Critique | Typewriter | 165 | 178 | Below output |
| Orange Border | Glow | 160 | 180 | Pulsing orange |

---

### Scene 4: Test 3 - Full Stack (6s - 8s)
**Duration**: 2 seconds (60 frames)

#### Visual Elements
- [ ] Column 3 label: "Workflow + Skill"
- [ ] Beautiful output loads
- [ ] Check stamp ✓
- [ ] Label: "Professional. Proper everything."
- [ ] Green border, spotlight effect

#### Animations
| Element | Animation Type | Start Frame | End Frame | Method |
|---------|----------------|-------------|-----------|--------|
| Label Change | Pop | 180 | 190 | "Workflow + Skill" |
| Loading | Simulate | 185 | 210 | Fake loading (slightly longer for anticipation) |
| Beautiful Output | Reveal | 205 | 225 | Image with extra polish |
| ✓ Stamp | Spring | 225 | 235 | Green checkmark |
| Critique | Typewriter | 230 | 240 | Below output |
| Green Border | Glow | 225 | 250 | Strong green glow |
| Spotlight | Focus | 225 | 250 | Other columns dim |

---

### Scene 5: Winner Declaration (8s - 10s)
**Duration**: 2 seconds (60 frames)

#### Visual Elements
- [ ] Column 3 enlarges, others shrink
- [ ] Crown or trophy above winner
- [ ] Text: "The skill doesn't just make it prettier - it makes it CORRECT."
- [ ] Confetti

#### Animations
| Element | Animation Type | Start Frame | End Frame | Method |
|---------|----------------|-------------|-----------|--------|
| Column 1&2 | Shrink | 250 | 270 | Scale 1 → 0.6, opacity 1 → 0.4 |
| Column 3 | Grow | 250 | 270 | Scale 1 → 1.2, move to center |
| Crown | Drop | 265 | 280 | Spring from above |
| Text | Pop In | 275 | 290 | Below comparison |
| Confetti | Burst | 280 | 300 | Celebration |

---

## Technical Requirements

### Dependencies
```bash
pnpm install @remotion/google-fonts
```

### Props Schema (Zod)
```ts
import { z } from "zod";

const TestResultSchema = z.object({
  label: z.string(),
  imageSrc: z.string(),
  verdict: z.enum(['bad', 'meh', 'good']),
  critique: z.string(),
});

export const ThreeWayComparisonGridSchema = z.object({
  prompt: z.string().default("Build a landing page for VaultX..."),
  tests: z.array(TestResultSchema).default([
    { label: 'Vanilla AI', imageSrc: '', verdict: 'bad', critique: 'Generic. Wrong fonts. No cohesion.' },
    { label: 'Workflow Only', imageSrc: '', verdict: 'meh', critique: 'Better process. Colors still off.' },
    { label: 'Workflow + Skill', imageSrc: '', verdict: 'good', critique: 'Professional. Proper everything.' },
  ]),
});
```

### Verdict Visual Map
```tsx
const verdictStyles = {
  bad: {
    borderColor: '#ef4444',
    stamp: '✗',
    stampColor: '#ef4444',
  },
  meh: {
    borderColor: '#f59e0b',
    stamp: '~',
    stampColor: '#f59e0b',
  },
  good: {
    borderColor: '#22c55e',
    stamp: '✓',
    stampColor: '#22c55e',
  },
};
```

---

## Asset Requirements
| Asset | Type | Source | Path |
|-------|------|--------|------|
| Vanilla AI Output | Image | Screenshot | `public/test1-vanilla.png` |
| Workflow Only Output | Image | Screenshot | `public/test2-workflow.png` |
| Full Stack Output | Image | Screenshot | `public/test3-full.png` |

---

## Verification Plan
1. Verify timing between tests builds anticipation
2. Test column layout is balanced on all displays
3. Check stamp animations have impact
4. Ensure winner spotlight is clear but not obnoxious
