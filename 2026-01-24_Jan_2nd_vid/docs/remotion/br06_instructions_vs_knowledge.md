# 🎬 Video Spec: BR-06 Instructions vs Knowledge Diagram

## Overview
| Property | Value |
|----------|-------|
| **Type** | B-Roll |
| **Duration** | 8 seconds (240 frames @ 30fps) |
| **Resolution** | 1920x1080 |
| **FPS** | 30 |
| **Composition ID** | `InstructionsVsKnowledge` |
| **Script Section** | BREAKING BELIEFS - The New Mechanism (1:00-1:30) |

## Creative Direction
Animated concept diagram showing WHAT vs HOW. Left side shows scattered, superficial "instructions." Right side shows a brain/neural network with deep "knowledge." The revelation moment when the viewer understands the paradigm shift.

### Color Palette
| Color | Hex | Usage |
|-------|-----|-------|
| Background | #0a0a0f | Dark canvas |
| Instructions (Cold) | #64748b | Gray, lifeless |
| Knowledge (Warm) | #3b82f6 | Blue, alive |
| Neural Glow | #06b6d4 | Connection lines |
| Highlight | #fbbf24 | Key revelation moment |
| Text | #f8fafc | Labels |

---

## Scene Breakdown

### Scene 1: Instructions Side (0s - 3s)
**Duration**: 3 seconds (90 frames)

#### Visual Elements
- [ ] Left half of screen
- [ ] Label: "INSTRUCTIONS" (gray, boring font)
- [ ] Floating text bubbles with explicit commands:
  - "Use Inter font"
  - "Hex #3b82f6"
  - "16px padding"
  - "border-radius: 8px"
- [ ] Dotted lines connecting randomly (no structure)
- [ ] Gray, desaturated feeling

#### Animations
| Element | Animation Type | Start Frame | End Frame | Method |
|---------|----------------|-------------|-----------|--------|
| Label | Fade In | 0 | 20 | `interpolate` opacity |
| Bubble 1 | Float In | 10 | 30 | `spring` from random angle |
| Bubble 2 | Float In | 20 | 40 | `spring` from random angle |
| Bubble 3 | Float In | 30 | 50 | `spring` from random angle |
| Bubble 4 | Float In | 40 | 60 | `spring` from random angle |
| Dotted Lines | Draw | 50 | 80 | SVG stroke-dashoffset |
| All Bubbles | Drift | 0 | 90 | Subtle random drift (lost, aimless) |

#### Visual Treatment
```tsx
// Gray, lifeless appearance
const instructionStyle = {
  filter: 'saturate(0.3) brightness(0.8)',
  opacity: 0.7,
};
```

---

### Scene 2: VS Divider (3s - 4s)
**Duration**: 1 second (30 frames)

#### Visual Elements
- [ ] "VS" text in the center (large, bold)
- [ ] Glowing divider line
- [ ] Lightning/energy effect

#### Animations
| Element | Animation Type | Start Frame | End Frame | Method |
|---------|----------------|-------------|-----------|--------|
| VS Text | Scale Pop | 90 | 105 | `spring({ damping: 10 })` 0 → 1 |
| Divider | Draw | 90 | 110 | Line from top to bottom |
| Lightning | Flash | 100 | 110 | Quick branching lines |

---

### Scene 3: Knowledge Side (4s - 7s)
**Duration**: 3 seconds (90 frames)

#### Visual Elements
- [ ] Right half of screen
- [ ] Label: "KNOWLEDGE" (vibrant, glowing)
- [ ] Brain/neural network visualization
- [ ] Interconnected nodes representing concepts:
  - "Typography Theory"
  - "Color Psychology"
  - "UX Patterns"
  - "Visual Hierarchy"
- [ ] Glowing connections showing how concepts relate
- [ ] Pulsing, alive feeling

#### Animations
| Element | Animation Type | Start Frame | End Frame | Method |
|---------|----------------|-------------|-----------|--------|
| Label | Glow In | 120 | 140 | `spring` + box-shadow glow |
| Central Brain | Scale In | 125 | 150 | `spring({ damping: 15 })` |
| Node 1 | Pop | 135 | 150 | `spring` from center |
| Node 2 | Pop | 140 | 155 | `spring` from center |
| Node 3 | Pop | 145 | 160 | `spring` from center |
| Node 4 | Pop | 150 | 165 | `spring` from center |
| Connections | Draw | 150 | 180 | SVG line draw from center outward |
| All Nodes | Pulse | 165 | 210 | `Math.sin(frame * 0.1) * 0.05 + 1` scale |
| Data Particles | Flow | 160 | 210 | Particles moving along connections |

#### Visual Treatment
```tsx
// Vibrant, alive appearance
const knowledgeStyle = {
  filter: 'saturate(1.2) brightness(1.1)',
};
// Glowing nodes
const nodeGlow = {
  boxShadow: '0 0 20px rgba(59, 130, 246, 0.5)',
};
```

---

### Scene 4: Revelation (7s - 8s)
**Duration**: 1 second (30 frames)

#### Visual Elements
- [ ] Knowledge side grows larger, dominant
- [ ] Instructions side shrinks/fades
- [ ] Text overlay: "Teach AI HOW to think"
- [ ] Golden highlight on key phrase

#### Animations
| Element | Animation Type | Start Frame | End Frame | Method |
|---------|----------------|-------------|-----------|--------|
| Instructions | Shrink + Fade | 210 | 230 | `interpolate` scale 1 → 0.7, opacity 1 → 0.3 |
| Knowledge | Expand | 210 | 230 | `interpolate` scale 1 → 1.2, x: 0 (center) |
| Text | Typewriter | 215 | 235 | Reveal with golden highlight on "HOW" |
| Background | Shift | 210 | 240 | Gradient shifts toward blue |

---

## Technical Requirements

### Dependencies
```bash
pnpm install @remotion/google-fonts @remotion/shapes @remotion/paths
```

### Props Schema (Zod)
```ts
import { z } from "zod";

export const InstructionsVsKnowledgeSchema = z.object({
  instructions: z.array(z.string()).default([
    "Use Inter font",
    "Hex #3b82f6",
    "16px padding",
    "border-radius: 8px",
  ]),
  knowledgeConcepts: z.array(z.string()).default([
    "Typography Theory",
    "Color Psychology", 
    "UX Patterns",
    "Visual Hierarchy",
  ]),
});
```

### Neural Network Implementation
```tsx
// Generate node positions in a radial pattern
const nodePositions = knowledgeConcepts.map((_, i) => ({
  x: centerX + Math.cos((i / concepts.length) * Math.PI * 2) * radius,
  y: centerY + Math.sin((i / concepts.length) * Math.PI * 2) * radius,
}));

// Draw connections between all nodes
const connections = nodePositions.flatMap((start, i) =>
  nodePositions.slice(i + 1).map(end => ({ start, end }))
);
```

---

## Verification Plan
1. Verify contrast between "dead" instructions and "alive" knowledge
2. Test neural network animation smoothness
3. Check reveal timing creates "aha" moment
4. Ensure text is readable on both sides
