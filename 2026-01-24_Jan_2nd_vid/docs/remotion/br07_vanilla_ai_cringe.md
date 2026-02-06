# 🎬 Video Spec: BR-07 Vanilla AI Cringe Output

## Overview
| Property | Value |
|----------|-------|
| **Type** | B-Roll |
| **Duration** | 6 seconds (180 frames @ 30fps) |
| **Resolution** | 1920x1080 |
| **FPS** | 30 |
| **Composition ID** | `VanillaAICringe` |
| **Script Section** | POINT 1 - The Problem (1:30-2:30) |

## Creative Direction
Show the horror of vanilla AI output. A deliberately ugly landing page being generated in real-time. Wrong colors, bad fonts, amateur layout. Viewer should physically cringe. Think "design crimes" compilation.

### Color Palette (Intentionally BAD)
| Color | Hex | Usage | Why It's Wrong |
|-------|-----|-------|----------------|
| Background | #e5e5e5 | Generic gray | Lifeless, default |
| Primary | #007bff | Bootstrap blue | Overused, generic |
| Text | #333333 | Default dark gray | Boring, no personality |
| Accent | #ff0000 | Pure red | Jarring, amateur |
| Button | #28a745 | Bootstrap green | Clashing, generic |

---

## Scene Breakdown

### Scene 1: AI Thinking (0s - 1s)
**Duration**: 1 second (30 frames)

#### Visual Elements
- [ ] AI chat interface
- [ ] User prompt: "Build me a landing page"
- [ ] AI "thinking" indicator (dots animating)
- [ ] Clean, neutral appearance (before the horror)

#### Animations
| Element | Animation Type | Start Frame | End Frame | Method |
|---------|----------------|-------------|-----------|--------|
| Prompt | Fade In | 0 | 15 | Already visible |
| Thinking Dots | Loop | 0 | 30 | `frame % 30` based dot scaling |
| Progress Bar | Fill | 10 | 30 | `interpolate` width 0 → 100% |

---

### Scene 2: Horror Reveal (1s - 4s)
**Duration**: 3 seconds (90 frames)

#### Visual Elements
- [ ] Browser window appearing
- [ ] Ugly landing page loading section by section:
  - Generic gray background
  - "WELCOME TO OUR WEBSITE" in bad font
  - Stretched logo placeholder
  - Misaligned buttons
  - Lorem ipsum text
  - Clashing colors everywhere
- [ ] Each element highlighted with red circles
- [ ] "❌" stamps appearing

#### Animations
| Element | Animation Type | Start Frame | End Frame | Method |
|---------|----------------|-------------|-----------|--------|
| Browser Window | Pop In | 30 | 45 | `spring({ damping: 15 })` |
| Header Section | Slide In | 45 | 55 | Top to position |
| Hero Section | Slide In | 55 | 70 | Fade in, "Comic Sans" text |
| Buttons | Pop | 70 | 80 | Misaligned, bad hover |
| Content | Fade | 80 | 95 | Lorem ipsum blocks |
| Red Circle 1 | Draw | 60 | 70 | Circle around bad font |
| Red Circle 2 | Draw | 75 | 85 | Circle around color clash |
| Red Circle 3 | Draw | 90 | 100 | Circle around alignment |
| X Stamps | Slam | staggered | - | Each following its circle |

#### The Ugly Page Content
```tsx
const uglyPage = {
  header: {
    font: 'Comic Sans MS', // or similar bad font
    text: 'WELCOME TO OUR WEBSITE!!',
    backgroundColor: '#e5e5e5',
  },
  hero: {
    text: 'We are the #1 solution for your needs',
    buttonText: 'CLICK HERE NOW',
    buttonColors: ['#ff0000', '#28a745'], // Clashing buttons side by side
  },
  content: {
    text: 'Lorem ipsum dolor sit amet...',
    images: 'placeholder-image.jpg', // Generic gray placeholders
  },
};
```

---

### Scene 3: Cringe Reaction (4s - 5s)
**Duration**: 1 second (30 frames)

#### Visual Elements
- [ ] Screen shake effect
- [ ] Overlaying cringe emojis: 😬 🤮 💀
- [ ] Text: "Generic. Boring. Unusable."
- [ ] Red vignette around the horror

#### Animations
| Element | Animation Type | Start Frame | End Frame | Method |
|---------|----------------|-------------|-----------|--------|
| Screen | Shake | 120 | 135 | `Math.sin(frame * 5) * 8` translate |
| Emoji 1 (😬) | Pop | 125 | 135 | Spring in from side |
| Emoji 2 (🤮) | Pop | 130 | 140 | Spring in |
| Emoji 3 (💀) | Pop | 135 | 145 | Spring in |
| Vignette | Fade In | 120 | 140 | Red edges |
| Text | Slam | 140 | 150 | Scale 1.5 → 1 with `spring` |

---

### Scene 4: Verdict (5s - 6s)
**Duration**: 1 second (30 frames)

#### Visual Elements
- [ ] Large stamp: "GARBAGE" (red, grunge style)
- [ ] Page fades to grayscale
- [ ] Trash can icon appears

#### Animations
| Element | Animation Type | Start Frame | End Frame | Method |
|---------|----------------|-------------|-----------|--------|
| Page | Desaturate | 150 | 165 | `filter: grayscale(1)` transition |
| GARBAGE Stamp | Slam | 155 | 165 | Rotation -15° to 0°, scale 2 → 1 |
| Trash Icon | Rise | 165 | 180 | `spring` from bottom |

---

## Technical Requirements

### Dependencies
```bash
pnpm install @remotion/google-fonts
```

### Props Schema (Zod)
```ts
import { z } from "zod";

export const VanillaAICringeSchema = z.object({
  pageElements: z.array(z.object({
    type: z.enum(['header', 'hero', 'button', 'content']),
    content: z.string(),
    style: z.record(z.string()),
  })),
  verdictText: z.string().default("GARBAGE"),
});
```

### Cringe Amplification Techniques
```tsx
// Bad design choices to include:
const cringeElements = [
  'Comic Sans or Papyrus font',
  'Pure #FF0000 red with #00FF00 green',
  'Different font sizes with no hierarchy',
  'Misaligned buttons',
  'Stretched placeholder images',
  'Drop shadows on everything',
  'Three exclamation marks!!!',
  'Marquee-style scrolling text (fake it with animation)',
];
```

---

## Verification Plan
1. Verify the page is actually ugly (show to others, confirm cringe)
2. Test red circle animations don't overlap poorly
3. Ensure GARBAGE stamp timing feels satisfying
4. Check that the design is clearly bad, not "so bad it's good"
