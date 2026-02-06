# 🎬 Video Spec: BR-11 Installation Copy-Paste

## Overview
| Property | Value |
|----------|-------|
| **Type** | B-Roll |
| **Duration** | 6 seconds (180 frames @ 30fps) |
| **Resolution** | 1920x1080 |
| **FPS** | 30 |
| **Composition ID** | `InstallationCopyPaste` |
| **Script Section** | POINT 3 - Installation & Setup (5:30-6:30) |

## Creative Direction
Ultra-simple installation visualization. Three steps, each with a satisfying checkmark. Counter any "this looks complicated" objection. Think Apple-style simplicity with developer aesthetics.

### Color Palette
| Color | Hex | Usage |
|-------|-----|-------|
| Background | #0f172a | Dark blue |
| Terminal BG | #0a0a0f | Deep black terminal |
| Step Accent | #22c55e | Green for success |
| Cursor | #f8fafc | White cursor |
| Command Text | #a5b4fc | Light purple |
| Path Text | #94a3b8 | Gray for paths |

---

## Scene Breakdown

### Scene 1: Step 1 - Navigate (0s - 2s)
**Duration**: 2 seconds (60 frames)

#### Visual Elements
- [ ] Step indicator: "1"
- [ ] Terminal window with typed command:
  ```bash
  cd ~/.gemini/antigravity/skills/
  ```
- [ ] Path visualization (breadcrumb style)
- [ ] Green checkmark on completion

#### Animations
| Element | Animation Type | Start Frame | End Frame | Method |
|---------|----------------|-------------|-----------|--------|
| Step "1" | Pop | 0 | 15 | `spring({ damping: 15 })` |
| Terminal | Fade In | 5 | 20 | Opacity |
| Command | Typewriter | 15 | 45 | `text.slice()` |
| Enter Key | Flash | 45 | 50 | Keypress indicator |
| Output | Fade In | 48 | 55 | Path confirmation |
| Checkmark | Draw | 52 | 60 | SVG stroke + `spring` |

---

### Scene 2: Step 2 - Copy Skill (2s - 4s)
**Duration**: 2 seconds (60 frames)

#### Visual Elements
- [ ] Step indicator: "2"
- [ ] Terminal with git clone or cp command:
  ```bash
  git clone [repo] ui-ux-pro-max/
  ```
- [ ] Progress bar animation
- [ ] Files appearing in the folder

#### Animations
| Element | Animation Type | Start Frame | End Frame | Method |
|---------|----------------|-------------|-----------|--------|
| Step "2" | Slide In | 60 | 75 | From right |
| Command | Typewriter | 70 | 95 | `text.slice()` |
| Progress | Fill | 95 | 110 | `interpolate` width |
| File Icons | Stagger Pop | 105 | 120 | Files appearing |
| Checkmark | Draw | 115 | 120 | Success |

---

### Scene 3: Step 3 - Copy Workflow (4s - 5.5s)
**Duration**: 1.5 seconds (45 frames)

#### Visual Elements
- [ ] Step indicator: "3"  
- [ ] Terminal showing:
  ```bash
  cp workflow.md workflows/init_vibecode_design.md
  ```
- [ ] Instant completion

#### Animations
| Element | Animation Type | Start Frame | End Frame | Method |
|---------|----------------|-------------|-----------|--------|
| Step "3" | Slide In | 120 | 135 | From right |
| Command | Typewriter | 130 | 150 | `text.slice()` |
| Instant Copy | Flash | 150 | 155 | Quick highlight |
| Checkmark | Draw | 155 | 165 | Success |

---

### Scene 4: Done! (5.5s - 6s)
**Duration**: 0.5 seconds (15 frames)

#### Visual Elements
- [ ] All three checkmarks visible
- [ ] Big text: "DONE."
- [ ] Time indicator: "< 60 seconds"
- [ ] Confetti burst

#### Animations
| Element | Animation Type | Start Frame | End Frame | Method |
|---------|----------------|-------------|-----------|--------|
| All Steps | Shift Left | 165 | 170 | Make room for DONE |
| DONE Text | Slam | 168 | 175 | `spring({ stiffness: 400 })` |
| Time Text | Fade In | 172 | 180 | Below DONE |
| Confetti | Burst | 170 | 180 | Particle explosion |

---

## Technical Requirements

### Dependencies
```bash
pnpm install @remotion/google-fonts
```

### Props Schema (Zod)
```ts
import { z } from "zod";

const StepSchema = z.object({
  number: z.number(),
  command: z.string(),
  description: z.string(),
});

export const InstallationCopyPasteSchema = z.object({
  steps: z.array(StepSchema).default([
    { number: 1, command: 'cd ~/.gemini/antigravity/skills/', description: 'Navigate' },
    { number: 2, command: 'git clone [repo] ui-ux-pro-max/', description: 'Copy Skill' },
    { number: 3, command: 'cp workflow.md workflows/', description: 'Copy Workflow' },
  ]),
  completionText: z.string().default("DONE."),
  timeText: z.string().default("< 60 seconds"),
});
```

### Terminal Styling
```tsx
const terminalStyle = {
  backgroundColor: '#0a0a0f',
  borderRadius: 12,
  padding: 20,
  fontFamily: 'JetBrains Mono',
  fontSize: 18,
  border: '1px solid #1e293b',
  boxShadow: '0 20px 40px rgba(0,0,0,0.5)',
};
```

---

## Verification Plan
1. Verify each step feels quick but readable
2. Test checkmark timing is satisfying
3. Check "DONE" has impact
4. Ensure commands look authentic
