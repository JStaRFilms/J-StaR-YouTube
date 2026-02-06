# 🎬 Video Spec: BR-10 Folder Structure 3D

## Overview
| Property | Value |
|----------|-------|
| **Type** | B-Roll |
| **Duration** | 6 seconds (180 frames @ 30fps) |
| **Resolution** | 1920x1080 |
| **FPS** | 30 |
| **Composition ID** | `FolderStructure3D` |
| **Script Section** | POINT 2 - Content (4:30-5:30) |

## Creative Direction
Premium 3D-style folder tree visualization. Files and folders floating in space, connected by glowing lines. VS Code sidebar meets holographic display. Emphasizes simplicity: "Skills are just markdown files."

### Color Palette
| Color | Hex | Usage |
|-------|-----|-------|
| Background | #0a0a0f | Dark void |
| Folder | #fbbf24 | Gold folder icons |
| MD File | #22c55e | Green markdown files |
| Script File | #3b82f6 | Blue script files |
| Connection | #4b5563 | Gray tree lines |
| Highlight | #a855f7 | Selected item glow |
| Text | #f8fafc | File names |

---

## Scene Breakdown

### Scene 1: Root Folder (0s - 1.5s)
**Duration**: 1.5 seconds (45 frames)

#### Visual Elements
- [ ] Central folder icon: `~/.gemini/antigravity/skills/`
- [ ] Folder has golden glow
- [ ] Floating in 3D space with subtle rotation
- [ ] Path displayed above

#### Animations
| Element | Animation Type | Start Frame | End Frame | Method |
|---------|----------------|-------------|-----------|--------|
| Folder | Spring In | 0 | 20 | Scale 0 → 1, rotation settle |
| Path Text | Typewriter | 15 | 35 | `text.slice()` |
| Glow | Pulse | 20 | 45 | Ambient light pulse |

---

### Scene 2: Tree Expansion (1.5s - 4s)
**Duration**: 2.5 seconds (75 frames)

#### Visual Elements
- [ ] Folder "opens" and branches expand
- [ ] Tree structure appearing:
  ```
  skills/
  ├── ui-ux-pro-max/
  │   ├── SKILL.md ← Highlighted
  │   └── scripts/
  │       └── generate-palette.ts
  └── workflows/
      └── init_vibecode_design.md
  ```
- [ ] Each file type has different icon/color
- [ ] Connection lines draw between parent-child

#### Animations
| Element | Animation Type | Start Frame | End Frame | Method |
|---------|----------------|-------------|-----------|--------|
| Folder Open | Lid Flip | 45 | 55 | Rotation on X-axis |
| ui-ux-pro-max/ | Branch Out | 55 | 70 | `spring` from folder |
| Line 1 | Draw | 58 | 68 | SVG stroke |
| SKILL.md | Pop + Glow | 70 | 85 | Special highlight |
| scripts/ | Branch Out | 75 | 90 | `spring` from parent |
| Line 2 | Draw | 78 | 88 | SVG stroke |
| generate-palette.ts | Pop | 90 | 100 | Scale in |
| workflows/ | Branch Out | 85 | 100 | Parallel branch |
| init_vibecode.md | Pop | 100 | 110 | Scale in |

#### Visual Depth
```tsx
// Simulate 3D with scale and blur
const getDepth = (level: number) => ({
  scale: 1 - level * 0.05,
  blur: level * 0.5,
  zIndex: 10 - level,
});
```

---

### Scene 3: SKILL.md Focus (4s - 5.5s)
**Duration**: 1.5 seconds (45 frames)

#### Visual Elements
- [ ] Camera zooms to SKILL.md
- [ ] File opens, showing markdown content preview
- [ ] Syntax highlighting visible
- [ ] Text: "Just markdown files + scripts"

#### Animations
| Element | Animation Type | Start Frame | End Frame | Method |
|---------|----------------|-------------|-----------|--------|
| Camera | Zoom | 120 | 140 | `interpolate` scale 1 → 1.5, translate |
| Other Items | Blur + Fade | 120 | 135 | Depth of field effect |
| File | Open | 135 | 150 | Height expand, content reveal |
| Content | Fade In | 140 | 155 | Markdown preview |
| Text | Pop | 150 | 165 | Description text |

---

### Scene 4: Simplicity Reveal (5.5s - 6s)
**Duration**: 0.5 seconds (15 frames)

#### Visual Elements
- [ ] Text overlay: "No complex setup."
- [ ] Checkmark
- [ ] Warm, confident glow

#### Animations
| Element | Animation Type | Start Frame | End Frame | Method |
|---------|----------------|-------------|-----------|--------|
| Text | Spring | 165 | 175 | `spring({ damping: 12 })` |
| Checkmark | Draw | 170 | 180 | SVG stroke animation |

---

## Technical Requirements

### Dependencies
```bash
pnpm install @remotion/google-fonts @remotion/shapes
```

### Props Schema (Zod)
```ts
import { z } from "zod";

const FileNodeSchema = z.object({
  name: z.string(),
  type: z.enum(['folder', 'markdown', 'script']),
  children: z.array(z.lazy(() => FileNodeSchema)).optional(),
  highlighted: z.boolean().optional(),
});

export const FolderStructure3DSchema = z.object({
  rootPath: z.string().default('~/.gemini/antigravity/skills/'),
  tree: FileNodeSchema,
});
```

### Default Tree Structure
```tsx
const defaultTree = {
  name: 'skills',
  type: 'folder',
  children: [
    {
      name: 'ui-ux-pro-max',
      type: 'folder',
      children: [
        { name: 'SKILL.md', type: 'markdown', highlighted: true },
        {
          name: 'scripts',
          type: 'folder',
          children: [
            { name: 'generate-palette.ts', type: 'script' },
          ],
        },
      ],
    },
    {
      name: 'workflows',
      type: 'folder',
      children: [
        { name: 'init_vibecode_design.md', type: 'markdown' },
      ],
    },
  ],
};
```

---

## Verification Plan
1. Verify 3D depth effect is convincing but not distracting
2. Test tree expansion timing feels satisfying
3. Check SKILL.md highlight draws attention
4. Ensure text is readable at all zoom levels
