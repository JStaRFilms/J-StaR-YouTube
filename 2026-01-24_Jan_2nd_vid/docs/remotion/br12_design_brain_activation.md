# 🎬 Video Spec: BR-12 Design Brain Activation

## Overview
| Property | Value |
|----------|-------|
| **Type** | B-Roll |
| **Duration** | 5 seconds (150 frames @ 30fps) |
| **Resolution** | 1920x1080 |
| **FPS** | 30 |
| **Composition ID** | `DesignBrainActivation` |
| **Script Section** | POINT 3 - Payoff (6:30-7:30) |

## Creative Direction
A literal brain "powering up" with design knowledge. Neural pathways lighting up, regions activating with different design concepts. Think MRI scan meets Iron Man HUD. "You now have a design brain installed."

### Color Palette
| Color | Hex | Usage |
|-------|-----|-------|
| Background | #0a0a0f | Void |
| Brain Base | #1e293b | Dormant neural tissue |
| Active Neural | #3b82f6 | Blue activation |
| Color Region | #22c55e | Green for color knowledge |
| Typography Region | #a855f7 | Purple for fonts |
| Layout Region | #f59e0b | Orange for spacing |
| Peak Power | #f8fafc | White peak glow |

---

## Scene Breakdown

### Scene 1: Dormant Brain (0s - 1s)
**Duration**: 1 second (30 frames)

#### Visual Elements
- [ ] Stylized brain outline (geometric/low-poly or medical style)
- [ ] Dim, inactive appearance
- [ ] Subtle pulse (alive but dormant)
- [ ] Text: "Before Skills..."

#### Animations
| Element | Animation Type | Start Frame | End Frame | Method |
|---------|----------------|-------------|-----------|--------|
| Brain | Fade In | 0 | 15 | Opacity |
| Outline | Draw | 0 | 20 | SVG stroke |
| Dim Pulse | Loop | 0 | 30 | `0.7 + Math.sin(frame * 0.2) * 0.1` opacity |
| Text | Fade | 15 | 30 | Below brain |

---

### Scene 2: First Activation (1s - 2.5s)
**Duration**: 1.5 seconds (45 frames)

#### Visual Elements
- [ ] Skill files "entering" the brain
- [ ] First region lights up: "Color Theory"
- [ ] Neural pathways start glowing
- [ ] Electric crackle effect

#### Animations
| Element | Animation Type | Start Frame | End Frame | Method |
|---------|----------------|-------------|-----------|--------|
| Skill File | Fly In | 30 | 45 | From left toward brain |
| Impact Flash | Burst | 45 | 50 | White burst at entry point |
| Region 1 | Glow | 48 | 60 | Green area lights up |
| Neural Paths | Draw | 50 | 70 | Lines spreading from region |
| Label "Color" | Pop | 55 | 65 | Appears near region |

---

### Scene 3: Full Activation (2.5s - 4s)
**Duration**: 1.5 seconds (45 frames)

#### Visual Elements
- [ ] More skill files entering
- [ ] Multiple regions activating:
  - Typography (purple)
  - Layout (orange)
  - UX Patterns (cyan)
- [ ] Brain becomes fully illuminated
- [ ] Energy overflowing

#### Animations
| Element | Animation Type | Start Frame | End Frame | Method |
|---------|----------------|-------------|-----------|--------|
| Skill File 2 | Fly In | 75 | 85 | Enter brain |
| Region 2 | Glow | 85 | 95 | Purple activation |
| Skill File 3 | Fly In | 90 | 100 | Enter brain |
| Region 3 | Glow | 100 | 110 | Orange activation |
| Skill File 4 | Fly In | 105 | 115 | Enter brain |
| Region 4 | Glow | 115 | 125 | Cyan activation |
| Full Brain | Intensify | 110 | 120 | All regions bright |
| Overflow | Particles | 115 | 135 | Energy particles emanating |

---

### Scene 4: Powered State (4s - 5s)
**Duration**: 1 second (30 frames)

#### Visual Elements
- [ ] Brain fully glowing, stable
- [ ] Continuous neural activity
- [ ] Text: "Design Brain: ACTIVATED"
- [ ] Status indicators (all green)

#### Animations
| Element | Animation Type | Start Frame | End Frame | Method |
|---------|----------------|-------------|-----------|--------|
| Brain | Stable Glow | 120 | 150 | Continuous, pulsing |
| Activity | Loop | 120 | 150 | Random neural sparkles |
| Text | Spring | 125 | 140 | Pop in with power |
| Status Bar | Fill | 130 | 145 | Green bar to 100% |

---

## Technical Requirements

### Dependencies
```bash
pnpm install @remotion/google-fonts @remotion/shapes @remotion/paths
```

### Props Schema (Zod)
```ts
import { z } from "zod";

const BrainRegionSchema = z.object({
  name: z.string(),
  color: z.string(),
  position: z.object({ x: z.number(), y: z.number() }),
});

export const DesignBrainActivationSchema = z.object({
  regions: z.array(BrainRegionSchema).default([
    { name: 'Color Theory', color: '#22c55e', position: { x: 30, y: 25 } },
    { name: 'Typography', color: '#a855f7', position: { x: 60, y: 35 } },
    { name: 'Layout', color: '#f59e0b', position: { x: 45, y: 55 } },
    { name: 'UX Patterns', color: '#06b6d4', position: { x: 70, y: 50 } },
  ]),
});
```

### Brain Shape Options
```tsx
// Option 1: SVG outline (recommended)
// Use a simplified brain silhouette path

// Option 2: Geometric/Low-poly
// Triangulated mesh with glowing vertices

// Option 3: Medical style
// More detailed brain with visible regions
```

---

## Verification Plan
1. Verify brain shape is recognizable but stylized
2. Test activation sequence feels progressive
3. Check color regions are distinct
4. Ensure final state feels "powerful"
