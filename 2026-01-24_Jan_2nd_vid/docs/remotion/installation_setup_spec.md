# 🎬 Video Spec: CLI Installation Animation

## Overview
| Property | Value |
|----------|-------|
| **Type** | B-Roll |
| **Duration** | 10 seconds (300 frames @ 30fps) |
| **Resolution** | 1920x1080 |
| **FPS** | 30 |
| **Composition ID** | `InstallationSetup` |
| **Script Section** | POINT 3 - Installation & Setup (5:30-7:30) |

## Rules I Read Before Writing This Spec
- [x] animations.md
- [x] timing.md
- [x] sequencing.md
- [x] text-animations.md (typewriter example)

## Creative Direction
Modern CLI installation showcase. Premium dark terminal aesthetic with glowing accents. Show the simplicity of `uipro init` with popular AI assistants highlighted (Claude Code, Cursor, Antigravity). Matrix-inspired glow effects with VS Code/Warp terminal vibes.

### Color Palette
| Color | Hex | Usage |
|-------|-----|-------|
| Background | #0a0a0f | Deep black |
| Terminal BG | #0d1117 | Slightly lighter terminal |
| Neon Cyan | #22d3ee | Primary accent / highlights |
| Neon Purple | #a855f7 | Secondary accent |
| Green Success | #22c55e | Checkmarks / Success states |
| Cursor Glow | #f8fafc | Blinking cursor |
| Comment Gray | #6b7280 | Comments / secondary text |
| Command Text | #e5e7eb | Primary command text |

### Typography
| Font | Weight | Size | Usage |
|------|--------|------|-------|
| JetBrains Mono | 400 | 24px | Terminal commands |
| JetBrains Mono | 600 | 28px | Highlighted commands |
| Inter | 700 | 40px | Section headers |

---

## Scene Breakdown

### Scene 1: Global Install (0s - 3s)
**Duration**: 3 seconds (90 frames)

#### Visual Elements
- [ ] Terminal window with glow effect
- [ ] Comment: `# Install CLI globally`
- [ ] Command: `npm install -g uipro-cli`
- [ ] Progress bar animation
- [ ] Green checkmark on completion

#### Animations
| Element | Type | Start | End | Method |
|---------|------|-------|-----|--------|
| Terminal | Fade In | 0 | 15 | `interpolate` opacity 0→1, `extrapolateRight: 'clamp'` |
| Comment | Typewriter | 15 | 35 | `text.slice(0, charsTyped)` |
| Command | Typewriter | 40 | 70 | Faster typing (2 frames/char) |
| Progress Bar | Fill | 72 | 85 | `interpolate` width 0%→100% |
| Checkmark | Spring | 85 | 90 | `spring({ damping: 15 })` |

#### Code Approach
```tsx
const frame = useCurrentFrame();
const { fps } = useVideoConfig();

// Typewriter effect
const command = "npm install -g uipro-cli";
const charsTyped = Math.floor(interpolate(frame, [40, 70], [0, command.length], {
  extrapolateLeft: 'clamp',
  extrapolateRight: 'clamp',
}));
const typedText = command.slice(0, charsTyped);
```

---

### Scene 2: Project Navigation (3s - 4.5s)
**Duration**: 1.5 seconds (45 frames)

#### Visual Elements
- [ ] Comment: `# Go to your project`
- [ ] Command: `cd /path/to/your/project`
- [ ] Path transforms to highlighted folder icon

#### Animations
| Element | Type | Start | End | Method |
|---------|------|-------|-----|--------|
| Comment | Typewriter | 90 | 105 | 2 frames/char |
| Command | Typewriter | 108 | 125 | Fade + type |
| Folder Icon | Spring pop | 125 | 135 | `spring({ damping: 200 })` |

---

### Scene 3: AI Assistant Grid (4.5s - 9s)
**Duration**: 4.5 seconds (135 frames)

This is the **hero scene**. Display the `uipro init` commands for various AI assistants with 4 of them highlighted (popular ones).

#### Visual Elements
- [ ] Title: "Install for your AI assistant"
- [ ] Command grid showing all assistants:
  - **Highlighted (glow/pop):**
    - `uipro init --ai claude` → Claude Code
    - `uipro init --ai cursor` → Cursor
    - `uipro init --ai antigravity` → Antigravity
    - `uipro init --ai opencode` → OpenCode
  - **Secondary (dimmed but visible):**
    - windsurf, copilot, kiro, codex, qoder, roocode, gemini, trae, continue, codebuddy

#### Animations
| Element | Type | Start | End | Method |
|---------|------|-------|-----|--------|
| Title | Fade In | 135 | 150 | Opacity |
| Claude Row | Slide + Glow | 150 | 165 | From left, neon cyan glow |
| Cursor Row | Slide + Glow | 165 | 180 | Staggered 15 frames |
| Antigravity Row | Slide + Glow | 180 | 195 | Purple accent glow |
| OpenCode Row | Slide + Glow | 195 | 210 | Cyan glow |
| Other Rows | Fade In | 210 | 240 | Dimmed, staggered 3-frame delay |
| All Option | Pop | 245 | 260 | `uipro init --ai all` |

#### Layout
```
┌──────────────────────────────────────────────────────────────┐
│  Install for your AI assistant                              │
├──────────────────────────────────────────────────────────────┤
│  ✨ uipro init --ai claude      # Claude Code               │
│  ✨ uipro init --ai cursor      # Cursor                    │
│  ✨ uipro init --ai antigravity # Antigravity               │
│  ✨ uipro init --ai opencode    # OpenCode                  │
│     uipro init --ai windsurf    # Windsurf                  │
│     uipro init --ai copilot     # GitHub Copilot            │
│     uipro init --ai kiro        # Kiro                      │
│     uipro init --ai codex       # Codex CLI                 │
│     uipro init --ai qoder       # Qoder                     │
│     uipro init --ai roocode     # Roo Code                  │
│     uipro init --ai gemini      # Gemini CLI                │
│     uipro init --ai trae        # Trae                      │
│     uipro init --ai continue    # Continue                  │
│     uipro init --ai codebuddy   # CodeBuddy                 │
│  ⚡ uipro init --ai all         # All assistants            │
└──────────────────────────────────────────────────────────────┘
```

---

### Scene 4: Success Burst (9s - 10s)
**Duration**: 1 second (30 frames)

#### Visual Elements
- [ ] "Design Brain Installed ✓" text
- [ ] Glowing checkmark
- [ ] Subtle particle/glow burst

#### Animations
| Element | Type | Start | End | Method |
|---------|------|-------|-----|--------|
| Grid | Scale Down | 270 | 280 | `spring` scale 1→0.9 |
| Success Text | Slam In | 275 | 290 | `spring({ stiffness: 300 })` |
| Checkmark | Draw | 285 | 295 | SVG stroke-dashoffset |
| Glow Burst | Fade | 290 | 300 | Radial gradient pulse |

---

## Technical Requirements

### Props Schema (Zod)
```ts
import { z } from "zod";

const AIAssistantSchema = z.object({
  flag: z.string(),
  name: z.string(),
  highlighted: z.boolean().default(false),
});

export const InstallationSetupSchema = z.object({
  assistants: z.array(AIAssistantSchema).default([
    { flag: 'claude', name: 'Claude Code', highlighted: true },
    { flag: 'cursor', name: 'Cursor', highlighted: true },
    { flag: 'antigravity', name: 'Antigravity', highlighted: true },
    { flag: 'opencode', name: 'OpenCode', highlighted: true },
    { flag: 'windsurf', name: 'Windsurf', highlighted: false },
    { flag: 'copilot', name: 'GitHub Copilot', highlighted: false },
    { flag: 'kiro', name: 'Kiro', highlighted: false },
    { flag: 'codex', name: 'Codex CLI', highlighted: false },
    { flag: 'qoder', name: 'Qoder', highlighted: false },
    { flag: 'roocode', name: 'Roo Code', highlighted: false },
    { flag: 'gemini', name: 'Gemini CLI', highlighted: false },
    { flag: 'trae', name: 'Trae', highlighted: false },
    { flag: 'continue', name: 'Continue', highlighted: false },
    { flag: 'codebuddy', name: 'CodeBuddy', highlighted: false },
  ]),
  showAllOption: z.boolean().default(true),
  successText: z.string().default("Design Brain Installed"),
});
```

### Critical Rules (MEMORIZE THESE)
> ⛔ FORBIDDEN: CSS transitions, CSS animations, Tailwind animation classes
> ✅ REQUIRED: All animations via `useCurrentFrame()` + `interpolate()`/`spring()`
> ✅ REQUIRED: `premountFor={1 * fps}` on all `<Sequence>` components
> ✅ REQUIRED: Clamp extrapolation to prevent values going beyond range
> ✅ REQUIRED: JetBrains Mono font for terminal text

### Component Structure
```
src/InstallationSetup/
├── index.tsx              # Main composition
├── components/
│   ├── Terminal.tsx       # Reusable terminal window
│   ├── TypewriterText.tsx # Typewriter effect component
│   ├── CommandRow.tsx     # Single command row with glow
│   ├── ProgressBar.tsx    # Animated progress bar
│   ├── Checkmark.tsx      # SVG checkmark with draw animation
│   └── GlowBurst.tsx      # Success particle effect
└── schema.ts              # Zod schema
```

---

## Verification Plan

### Visual Test in Remotion Studio
1. Run `pnpm start` to open Remotion Studio
2. Navigate to `InstallationSetup` composition
3. Scrub timeline to verify:
   - Scene 1 (0-90 frames): Terminal appears, npm command types, progress completes
   - Scene 2 (90-135 frames): cd command types
   - Scene 3 (135-270 frames): AI assistant grid animates with highlights
   - Scene 4 (270-300 frames): Success burst
4. Check console for errors
5. Verify highlighted assistants (Claude, Cursor, Antigravity, OpenCode) have glow effect

### Manual Verification
- [ ] Typewriter speed is readable but snappy
- [ ] Highlighted assistants stand out clearly
- [ ] Terminal aesthetic feels premium
- [ ] Success burst has impact

---

## Design Decisions

| Decision | Reasoning |
|----------|-----------|
| 10 seconds duration | Long enough to show all assistants, short enough to stay engaging |
| 4 highlighted assistants | Claude, Cursor, Antigravity, OpenCode are most popular based on user input |
| Grid layout in Scene 3 | Shows breadth of support while highlighting key tools |
| `--ai all` as finale | Creates a "power user" moment |
