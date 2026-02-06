# 🎬 Video Spec: Topic Short 1 (Hot Take)

## Overview
| Property | Value |
|----------|-------|
| **Type** | Short |
| **Duration** | 20 seconds (600 frames @ 30fps) |
| **Resolution** | 1080x1920 (9:16) |
| **FPS** | 30 |
| **Composition ID** | `TopicShort1` |

## Rules I Read Before Writing This Spec
- [x] animations.md
- [x] timing.md
- [x] sequencing.md
- [x] transitions.md
- [x] text-animations.md

## Creative Direction
**Clean, High-Fidelity Light Mode.**  
Think Linear Light Mode, Vercel Light Mode.  
Everything is crisp white backgrounds, subtle gray borders (`#E5E7EB`), and stark black text (`#111827`).  
Accents are professional blue (`#2563EB`) or red (`#EF4444`) for alerts.  
Shadows are soft and diffused.

### Color Palette (Light Mode)
| Color | Hex | Usage |
|-------|-----|-------|
| Background | #FFFFFF | Main background, Cards |
| Text Primary | #111827 | Headings, Main text |
| Text Secondary | #6B7280 | Subtitles, labels |
| Border | #E5E7EB | Dividers, Borders |
| Primary | #2563EB | Action buttons, Highlights |
| Danger | #EF4444 | "STOP" text, Delete actions |
| Success | #10B981 | "Success", "Approved" |

### Typography
| Font | Weight | Size | Usage |
|------|--------|------|-------|
| Inter | 900 | 120px | Impact Text ("STOP") |
| Inter | 600 | 48px | UI Headers |
| Inter | 400 | 32px | UI Body |
| JetBrains Mono | 500 | 28px | Code snippets |

---

## Scene Breakdown

### Scene 1: The Hook (0s - 3s)
**Duration**: 3 seconds (90 frames)
**Concept**: Aggressive wake-up call. Stark white background.

#### Visual Elements
- [ ] Large Text: "STOP" (Red #EF4444, Heavy Font)
- [ ] Subtext: "TELLING AI WHAT COLORS TO USE" (Black)

#### Animations
- `STOP` text slams in (Spring damping: 12, stiff).
- Background flashes subtle gray (#F3F4F6) on beat.

### Scene 2: The Problem - Color Picker (3s - 8s)
**Duration**: 5 seconds (150 frames)
**Concept**: A UI mockup of a color picker. Cursor tries to pick a color, then gets frustrated.

#### Visual Elements
- [ ] Mockup Window (Light mode, window controls)
- [ ] Color Picker UI (Spectrum gradient)
- [ ] Cursor (SVG)
- [ ] "X" Button (Close)

#### Animations
- Cursor moves to picking a color (interpolate).
- Cursor shakes ("No") -> moves to "X" button.
- UI "Closes" (Scale down to 0).

### Scene 3: The Fix - Trash Can & Skill (8s - 15s)
**Duration**: 7 seconds (210 frames)
**Concept**: Throwing away manual design, injecting "System Instruction".

#### Visual Elements
- [ ] Trash Can Icon (Outline style, black)
- [ ] "Gray Slop" Card (Represents bad AI design - wireframey)
- [ ] `SKILL.md` File Icon (Markdown logo, "System Instruction" label)
- [ ] "Robot Head" (AI Agent)

#### Animations
- "Gray Slop" card drops into Trash Can (Spring gravity).
- `SKILL.md` file flies *into* Robot Head (Masked entry or scale down into center).

### Scene 4: The Result - Fintech Dashboard (15s - 20s)
**Duration**: 5 seconds (150 frames)
**Concept**: The payoff. Beautiful Light Mode UI.

#### Visual Elements
- [ ] Dashboard Container (Rounded corners, shadow-lg)
- [ ] Charts (Line chart, Green positive trend)
- [ ] Data Cards ("Revenue", "Users")
- [ ] Floating "Sparkles" (Vector icons)

#### Animations
- Dashboard scales up (Spring smooth).
- Charts "grow" (Line path animation).
- Numbers count up (0 -> $1,240).

---

## Technical Requirements

### Props Schema (Zod)
```ts
import { z } from "zod";
export const TopicShort1Schema = z.object({
  theme: z.enum(['light']).default('light'),
});
```

### Component Architecture
- `src/components/ui/Window.tsx` (Light mode window frame)
- `src/components/ui/Cursor.tsx` (Mouse cursor)
- `src/scenes/HookScene.tsx`
- `src/scenes/ProblemScene.tsx`
- `src/scenes/FixScene.tsx`
- `src/scenes/ResultScene.tsx`

### Critical Rules
> ⛔ FORBIDDEN: Dark Mode colors (#000000 backgrounds).
> ✅ REQUIRED: All animations via useCurrentFrame()
> ✅ REQUIRED: premountFor={30} on all Sequences
