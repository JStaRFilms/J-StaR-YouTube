# 🎬 Video Spec: BR-05 Prompt Typing Madness

## Overview
| Property | Value |
|----------|-------|
| **Type** | B-Roll |
| **Duration** | 5 seconds (150 frames @ 30fps) |
| **Resolution** | 1920x1080 |
| **FPS** | 30 |
| **Composition ID** | `PromptTypingMadness` |
| **Script Section** | BREAKING BELIEFS - The Old Way (0:45-1:00) |

## Creative Direction
Overwhelmingly long prompt being typed in real-time. The prompt keeps growing and growing, scrolling endlessly. User frustration visualized. Think "developer burnout" meets "scroll of death."

### Color Palette
| Color | Hex | Usage |
|-------|-----|-------|
| Background | #1e1e2e | VS Code-like dark |
| Editor BG | #11111b | Input area |
| Text | #cdd6f4 | Prompt text |
| Highlight | #f9e2af | CSS values being typed |
| Frustration Red | #f38ba8 | Error highlights, stress indicators |
| Cursor | #89b4fa | Blinking cursor |

---

## Scene Breakdown

### Scene 1: Clean Start (0s - 0.5s)
**Duration**: 0.5 seconds (15 frames)

#### Visual Elements
- [ ] Empty AI prompt input box (modern chat UI style)
- [ ] Blinking cursor ready to type
- [ ] Placeholder: "Describe your design..."

#### Animations
| Element | Animation Type | Start Frame | End Frame | Method |
|---------|----------------|-------------|-----------|--------|
| Input Box | Fade In | 0 | 10 | `interpolate` opacity |
| Cursor | Blink | 0 | 15 | `frame % 20 < 10` visibility |

---

### Scene 2: Typing Begins (0.5s - 3s)
**Duration**: 2.5 seconds (75 frames)

#### Visual Elements
- [ ] Text rapidly typing (faster than human speed)
- [ ] Long detailed prompt appearing:
  ```
  "Build me a dashboard with Inter font at 14px,
  use hex #3b82f6 for primary buttons,
  padding should be 16px on cards,
  border-radius 8px, use flexbox with gap 24px,
  background gradient from #0f172a to #1e293b,
  make the sidebar 256px wide with..."
  ```
- [ ] Scroll bar appearing as content grows
- [ ] Character count increasing rapidly

#### Animations
| Element | Animation Type | Start Frame | End Frame | Method |
|---------|----------------|-------------|-----------|--------|
| Text | Fast Typewriter | 15 | 90 | `text.slice(0, frame * 4)` (4 chars/frame) |
| Scroll | Auto-scroll | 30 | 90 | `interpolate` scrollTop |
| Counter | Count Up | 15 | 90 | Display character count |
| Box | Height Grow | 30 | 90 | `interpolate` maxHeight |

#### Prompt Content
```tsx
const longPrompt = `Build me a dashboard with Inter font at 14px semibold for headings and 13px regular for body text, use exact hex color #3b82f6 for primary action buttons with white text #ffffff, all cards should have 16px padding on all sides with 8px border-radius and subtle shadow rgba(0,0,0,0.1) 0 4px 6px, use CSS flexbox with 24px gap between elements, main background should be a gradient from #0f172a at top to #1e293b at bottom, sidebar should be exactly 256px wide with a slightly lighter background #1e293b, navigation items should have 12px padding and hover state with #334155 background, charts should use these exact colors in order: #3b82f6, #22c55e, #f59e0b, #ef4444, #8b5cf6...`;
```

---

### Scene 3: Overwhelm (3s - 4.5s)
**Duration**: 1.5 seconds (45 frames)

#### Visual Elements
- [ ] Text becomes a blur of characters
- [ ] Red stress indicators appear
- [ ] "..." continuing forever visual
- [ ] User avatar showing frustration (emoji: 😩)

#### Animations
| Element | Animation Type | Start Frame | End Frame | Method |
|---------|----------------|-------------|-----------|--------|
| Text | Blur | 90 | 110 | `interpolate` blur 0 → 4px |
| Speed Lines | Appear | 90 | 100 | Vertical motion lines |
| Red Glow | Pulse | 95 | 135 | Border glow red |
| Frustration Emoji | Pop In | 100 | 110 | `spring({ damping: 8 })` |

---

### Scene 4: Breaking Point (4.5s - 5s)
**Duration**: 0.5 seconds (15 frames)

#### Visual Elements
- [ ] Text: "EXHAUSTING." stamps over everything
- [ ] Red X overlay
- [ ] Screen crack effect (optional)

#### Animations
| Element | Animation Type | Start Frame | End Frame | Method |
|---------|----------------|-------------|-----------|--------|
| Stamp | Slam | 135 | 140 | `spring({ stiffness: 500 })` scale 2 → 1 |
| Red X | Draw | 140 | 150 | SVG stroke animation |
| Background | Flash Red | 135 | 140 | Quick red overlay flash |

---

## Technical Requirements

### Dependencies
```bash
pnpm install @remotion/google-fonts
```

### Props Schema (Zod)
```ts
import { z } from "zod";

export const PromptTypingMadnessSchema = z.object({
  prompt: z.string().default("..."), // Long prompt content
  typingSpeed: z.number().default(4), // characters per frame
});
```

### Font Loading
```tsx
import { loadFont } from "@remotion/google-fonts/JetBrainsMono";
const { fontFamily } = loadFont();
```

---

## Verification Plan
1. Verify typing speed feels frantic but readable
2. Test scroll animation smoothness
3. Check red glow doesn't obscure text
4. Ensure "EXHAUSTING" stamp lands with impact
