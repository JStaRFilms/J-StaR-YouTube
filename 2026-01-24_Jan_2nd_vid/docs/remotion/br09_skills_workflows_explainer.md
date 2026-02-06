# 🎬 Video Spec: BR-09 Skills & Workflows Explainer

## Overview
| Property | Value |
|----------|-------|
| **Type** | B-Roll |
| **Duration** | 8 seconds (240 frames @ 30fps) |
| **Resolution** | 1920x1080 |
| **FPS** | 30 |
| **Composition ID** | `SkillsWorkflowsExplainer` |
| **Script Section** | POINT 2 - The Solution Overview (3:30-4:30) |

## Creative Direction
Visual explanation of the Skills + Workflows concept. Two interconnected systems: Skills as "knowledge libraries" and Workflows as "execution scripts." Show how they work together like a brain's knowledge (skills) activated by triggers (workflows).

### Color Palette
| Color | Hex | Usage |
|-------|-----|-------|
| Background | #0f172a | Dark blue |
| Skills (Left) | #8b5cf6 | Purple - knowledge |
| Workflows (Right) | #06b6d4 | Cyan - process |
| Connection | #fbbf24 | Gold - data flow |
| Card BG | #1e293b | Panel backgrounds |
| Text | #f8fafc | White text |

---

## Scene Breakdown

### Scene 1: Title Drop (0s - 1s)
**Duration**: 1 second (30 frames)

#### Visual Elements
- [ ] Text: "Skills + Workflows"
- [ ] Subtitle: "Teaching AI New Abilities"
- [ ] Glowing underline

#### Animations
| Element | Animation Type | Start Frame | End Frame | Method |
|---------|----------------|-------------|-----------|--------|
| Title | Spring In | 0 | 20 | `spring({ damping: 15 })` scale |
| Subtitle | Fade In | 15 | 30 | `interpolate` opacity |
| Underline | Draw | 20 | 30 | SVG stroke from left |

---

### Scene 2: Skills Explainer (1s - 3.5s)
**Duration**: 2.5 seconds (75 frames)

#### Visual Elements
- [ ] Left side: "SKILLS" label (purple)
- [ ] Book/library icon
- [ ] Cards sliding in with skill examples:
  - "📐 50+ Styles"
  - "🎨 97 Color Palettes"
  - "✒️ 57 Font Pairings"
  - "📋 99 UX Guidelines"
- [ ] Brain icon absorbing the knowledge
- [ ] Text: "Files that teach AI new abilities"

#### Animations
| Element | Animation Type | Start Frame | End Frame | Method |
|---------|----------------|-------------|-----------|--------|
| SKILLS Label | Pop | 30 | 45 | `spring` from left |
| Book Icon | Spin In | 40 | 55 | Rotation + scale |
| Card 1 | Slide In | 50 | 65 | From left edge |
| Card 2 | Slide In | 55 | 70 | Staggered |
| Card 3 | Slide In | 60 | 75 | Staggered |
| Card 4 | Slide In | 65 | 80 | Staggered |
| Cards to Brain | Flow | 80 | 95 | Cards shrink and flow to brain |
| Brain | Glow Pulse | 90 | 105 | Brighten as knowledge enters |
| Description | Fade In | 95 | 105 | Below the visual |

---

### Scene 3: Workflows Explainer (3.5s - 6s)
**Duration**: 2.5 seconds (75 frames)

#### Visual Elements
- [ ] Right side: "WORKFLOWS" label (cyan)
- [ ] Gear/cog icon
- [ ] Flowchart nodes appearing:
  - "📝 Interview User"
  - "🔍 Search Skills"
  - "🎨 Generate Design"
  - "📦 Output Files"
- [ ] Arrows connecting the nodes
- [ ] Text: "Files that tell AI WHEN to use them"

#### Animations
| Element | Animation Type | Start Frame | End Frame | Method |
|---------|----------------|-------------|-----------|--------|
| WORKFLOWS Label | Pop | 105 | 120 | `spring` from right |
| Gear Icon | Spin | 110 | 180 | Continuous slow rotation |
| Node 1 | Pop | 120 | 135 | Scale from 0 |
| Arrow 1 | Draw | 130 | 140 | SVG stroke |
| Node 2 | Pop | 135 | 150 | Scale from 0 |
| Arrow 2 | Draw | 145 | 155 | SVG stroke |
| Node 3 | Pop | 150 | 165 | Scale from 0 |
| Arrow 3 | Draw | 160 | 170 | SVG stroke |
| Node 4 | Pop | 165 | 180 | Scale from 0 |
| Data Dots | Flow | 170 | 180 | Animated along arrows |

---

### Scene 4: Connection (6s - 8s)
**Duration**: 2 seconds (60 frames)

#### Visual Elements
- [ ] Both sides visible
- [ ] Golden connection beam between Skills brain and Workflows gear
- [ ] Text: "Together = Design System Engine"
- [ ] Pulsing energy flowing between them

#### Animations
| Element | Animation Type | Start Frame | End Frame | Method |
|---------|----------------|-------------|-----------|--------|
| Connection Beam | Draw | 180 | 200 | Gradient line from brain to gear |
| Energy Pulse | Flow | 195 | 240 | Particles moving along beam |
| Combined Text | Spring | 200 | 215 | Pop in from center |
| Both Sides | Sync Pulse | 210 | 240 | Simultaneous glow pulse |

---

## Technical Requirements

### Dependencies
```bash
pnpm install @remotion/google-fonts @remotion/shapes
```

### Props Schema (Zod)
```ts
import { z } from "zod";

export const SkillsWorkflowsExplainerSchema = z.object({
  skillStats: z.array(z.object({
    emoji: z.string(),
    text: z.string(),
  })).default([
    { emoji: '📐', text: '50+ Styles' },
    { emoji: '🎨', text: '97 Color Palettes' },
    { emoji: '✒️', text: '57 Font Pairings' },
    { emoji: '📋', text: '99 UX Guidelines' },
  ]),
  workflowSteps: z.array(z.string()).default([
    'Interview User',
    'Search Skills',
    'Generate Design',
    'Output Files',
  ]),
});
```

---

## Verification Plan
1. Verify both explanations are visually balanced
2. Test card stagger timing feels rhythmic
3. Check connection beam has premium feel
4. Ensure viewers understand Skills vs Workflows distinction
