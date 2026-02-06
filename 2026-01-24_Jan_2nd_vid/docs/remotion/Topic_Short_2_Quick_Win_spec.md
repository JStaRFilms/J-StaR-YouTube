# 🎬 Video Spec: Topic_Short_2_Quick_Win

## Overview
| Property | Value |
|----------|-------|
| **Type** | Short (9:16) |
| **Duration** | 17 seconds (510 frames @ 30fps) |
| **Resolution** | 1080x1920 |
| **FPS** | 30 |
| **Composition ID** | `TopicShort2QuickWin` |

## Rules I Read Before Writing This Spec
- [x] animations.md
- [x] timing.md
- [x] sequencing.md
- [x] text-animations.md
- [x] transitions.md
- [x] assets.md

## Creative Direction
**Theme:** Light Mode "Pro" Aesthetic. Clean, high-contrast, professional but energetic.
**Vibe:** Tech tutorial, fast-paced, "Hacker" speed but with a polished UI design.

### Color Palette (Light Mode Adaptation)
| Color | Hex | Usage |
|-------|-----|-------|
| Background | #FFFFFF | Main bg |
| Surface | #F3F4F6 | Card backgrounds, panels |
| Text Primary | #111827 | Main headings |
| Text Secondary| #4B5563 | Body text |
| Accent Blue | #3B82F6 | Primary buttons, highlights |
| Accent Purple | #8B5CF6 | Secondary accents |
| Success Green | #10B981 | Checkmarks, "Correct" state |
| Error Red | #EF4444 | "Ugly" state, warnings |

### Typography
| Font | Family | Usage |
|------|--------|-------|
| Primary | 'Inter', sans-serif | UI Elements, Labels |
| Code | 'JetBrains Mono', monospace | Code blocks, Terminal |

---

## Scene Breakdown

### Scene 1: The Problem (0s - 4s)
**Duration:** 120 frames
**Audio:** "Your AI designs are ugly because you're missing this one thing: a design system reference."

#### Visual Elements
- [ ] **Split Screen Container**: 50/50 split horizontal (Top/Bottom).
- [ ] **Top Side ("UGLY")**: White bg, Times New Roman font, unstyled blue links, raw HTML buttons. Label "UGLY" in Red.
- [ ] **Bottom Side ("PRO")**: Modern card, Inter font, dropshadow, rounded corners. Label "PRO" in Blue.
- [ ] **Missing Piece Icon**: Large Puzzle Piece icon flashing/pulsing over the Top side.

#### Animations
- **Entrance:** Both sides slide in from opposite edges (Spring).
- **Icon:** Flashes/Pulse animation (Looping spring).
- **Labels:** Stamped on pulse.

---

### Scene 2: The Quick Fix (4s - 6s)
**Duration:** 60 frames
**Audio:** "Here's the quick fix: Before you prompt, add this line:"

#### Visual Elements
- [ ] **Code Editor**: Light theme VS Code window. Line numbers.
- [ ] **Stamp**: "QUICK FIX" stamp graphic (Red or Accent Color) rotating and slamming down.

#### Animations
- **Camera Zoom**: Scale up the editor to focus on the input area.
- **Stamp:** `spring` animation with overshoot for 'slam' effect.

---

### Scene 3: The Secret Sauce (6s - 11s)
**Duration:** 150 frames
**Audio:** "'Reference the Tailwind UI design patterns. Use their spacing, their typography scale, their color conventions.'"

#### Visual Elements
- [ ] **Typing Text**: The prompt being typed out character-by-character.
- [ ] **Highlights**: Words "Tailwind UI", "Spacing", "Typography" glow/highlight in Neon Green/Yellow as spoken.

#### Animations
- **Typing:** `useCurrentFrame` slicing text string. Speed: Very fast.
- **Highlights:** `interpolate` opacity of highlight background behind specific words.

---

### Scene 4: The Transformation (11s - 14s)
**Duration:** 90 frames
**Audio:** "Boom. Your AI now has a professional baseline to work from instead of guessing."

#### Visual Elements
- [ ] **Morph Effect**: The "Ugly" HTML from Scene 1 transforms into the "Pro" card.
- [ ] **Explosion/Shake**: Screen shake effect on "Boom".
- [ ] **Checkmarks**: Animated green checkmarks popping up on UI elements.

#### Animations
- **Shake:** Random noise applied to X/Y translation for a few frames.
- **Morph:** Crossfade or Slide transition between "Ugly" and "Pro" components.
- **Checkmarks:** `spring` scale from 0 to 1.

---

### Scene 5: The Call to Action (14s - End)
**Duration:** 90 frames (Total 17s)
**Audio:** "But that's the manual way. I automated this with a skill file. Full breakdown in my latest video 👇"

#### Visual Elements
- [ ] **File Directory**: Scrolling list of folders/files.
- [ ] **Selection**: Highlighting `skills/ui-pro-max/`.
- [ ] **CTA Text**: "AUTOMATE IT" big bold text.
- [ ] **Arrow**: Animated arrow pointing down.

#### Animations
- **Scroll:** Vertical translation of list.
- **Highlight:** Background color change on the specific file.

---

## Technical Requirements

### Schema
```ts
import { z } from "zod";

export const TopicShort2QuickWinSchema = z.object({
  logoTitle: z.string(),
});
```

### Components to Build
1. `UglyWebsite.tsx` (Raw HTML look)
2. `ProCard.tsx` (Tailwind styled)
3. `CodeEditor.tsx` (With typing prop)
4. `QuickFixStamp.tsx` (SVG/CSS stamp)
5. `FileDirectory.tsx` (Scrolling list)

### Critical Rules
> ⛔ FORBIDDEN: CSS transitions, CSS animations
> ✅ REQUIRED: All animations via `useCurrentFrame()` + `interpolate`/`spring`
> ✅ REQUIRED: `premountFor={30}` on sequences
> ✅ REQUIRED: `staticFile()` for any images (if any)
