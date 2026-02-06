# 🎬 Video Spec: BR-18 Weak Model Flex

## Overview
| Property | Value |
|----------|-------|
| **Type** | B-Roll |
| **Duration** | 6 seconds (180 frames @ 30fps) |
| **Resolution** | 1920x1080 |
| **FPS** | 30 |
| **Composition ID** | `WeakModelFlex` |
| **Script Section** | POINT 6 - Weak Model Flex (15:00-16:00) |

## Creative Direction
The surprise twist. Showing that even a "weak" AI model produces professional results with the skill. Visual comparison of model tiers with price tags, revealing the cheap option still wins. "You don't need expensive subscriptions - you need the right skills."

### Color Palette
| Color | Hex | Usage |
|-------|-----|-------|
| Background | #0a0a0f | Dark void |
| Premium | #fbbf24 | Gold for expensive |
| Budget | #22c55e | Green for cheap/good |
| Danger | #ef4444 | Red for "supposed to be bad" |
| Text | #f8fafc | White |
| Highlight | #3b82f6 | Blue accent |

---

## Scene Breakdown

### Scene 1: Model Comparison Setup (0s - 2s)
**Duration**: 2 seconds (60 frames)

#### Visual Elements
- [ ] Text: "What if you can't afford Claude or GPT-4?"
- [ ] Premium model card:
  - Logo (placeholder)
  - Price: "$20/month"
  - Power bar: 10/10
- [ ] Budget model card:
  - Logo (placeholder)
  - Price: "FREE"
  - Power bar: 4/10 (shown in red)

#### Animations
| Element | Animation Type | Start Frame | End Frame | Method |
|---------|----------------|-------------|-----------|--------|
| Question | Typewriter | 0 | 25 | Building tension |
| Premium Card | Slide In | 30 | 45 | From left |
| Gold Glow | Pulse | 40 | 60 | Premium feeling |
| Budget Card | Slide In | 35 | 50 | From right |
| Red Warning | Flash | 45 | 55 | "Supposed to be worse" |
| Price Tags | Pop | 50 | 60 | Show the price difference |

---

### Scene 2: The Challenge (2s - 3.5s)
**Duration**: 1.5 seconds (45 frames)

#### Visual Elements
- [ ] Text: "Same prompt. Same skill. Cheap model."
- [ ] Budget model highlighted
- [ ] "VS" in the middle
- [ ] Dramatic tension

#### Animations
| Element | Animation Type | Start Frame | End Frame | Method |
|---------|----------------|-------------|-----------|--------|
| Premium | Dim | 60 | 70 | Lower opacity |
| Budget | Spotlight | 60 | 75 | Grows slightly, bright |
| VS | Pop | 70 | 80 | Classic versus |
| Lightning | Crackle | 75 | 90 | Energy between cards |
| Text | Typewriter | 80 | 100 | Setting up the reveal |

---

### Scene 3: The Result (3.5s - 5s)
**Duration**: 1.5 seconds (45 frames)

#### Visual Elements
- [ ] Beautiful output appears (same quality as before!)
- [ ] Shocked emoji/reaction
- [ ] Text: "Still professional. No stress."
- [ ] Green success indicators

#### Animations
| Element | Animation Type | Start Frame | End Frame | Method |
|---------|----------------|-------------|-----------|--------|
| Output | Spring In | 105 | 120 | Beautiful mockup |
| Shock Emoji | Pop | 118 | 128 | 😲 or similar |
| Quality Badge | Stamp | 122 | 130 | "Pro Quality" |
| Text | Fade | 125 | 140 | Verdict |
| Checkmarks | Stagger | 130 | 145 | Multiple success marks |

---

### Scene 4: The Revelation (5s - 6s)
**Duration**: 1 second (30 frames)

#### Visual Elements
- [ ] Budget model card glows green
- [ ] Price comparison emphasized
- [ ] Text: "The skill does the heavy lifting."
- [ ] Premium card fades/shrinks

#### Animations
| Element | Animation Type | Start Frame | End Frame | Method |
|---------|----------------|-------------|-----------|--------|
| Budget | Glow + Grow | 150 | 165 | Green border, 1.2x scale |
| Premium | Fade | 150 | 165 | Opacity down, shrink |
| Price | Highlight | 155 | 170 | "FREE" gets circle |
| Text | Pop | 160 | 175 | Final message |
| Arrow | Draw | 165 | 180 | Points to skill, not model |

---

## Technical Requirements

### Dependencies
```bash
pnpm install @remotion/google-fonts @remotion/shapes
```

### Props Schema (Zod)
```ts
import { z } from "zod";

const ModelCardSchema = z.object({
  name: z.string(),
  price: z.string(),
  powerLevel: z.number().min(1).max(10),
  tier: z.enum(['premium', 'budget']),
});

export const WeakModelFlexSchema = z.object({
  premiumModel: ModelCardSchema.default({
    name: 'GPT-4',
    price: '$20/month',
    powerLevel: 10,
    tier: 'premium',
  }),
  budgetModel: ModelCardSchema.default({
    name: 'Cheap Model',
    price: 'FREE',
    powerLevel: 4,
    tier: 'budget',
  }),
  outputImageSrc: z.string(),
});
```

### Model Card Component
```tsx
const ModelCard = ({ model, highlighted }: Props) => (
  <div
    style={{
      backgroundColor: '#1e293b',
      borderRadius: 16,
      padding: 24,
      border: `2px solid ${
        highlighted 
          ? '#22c55e' 
          : model.tier === 'premium' 
            ? '#fbbf24' 
            : '#ef4444'
      }`,
      transform: highlighted ? 'scale(1.1)' : 'scale(1)',
    }}
  >
    <h3>{model.name}</h3>
    <div className="price">{model.price}</div>
    <PowerBar level={model.powerLevel} />
  </div>
);

const PowerBar = ({ level }: { level: number }) => (
  <div style={{ display: 'flex', gap: 4 }}>
    {Array.from({ length: 10 }).map((_, i) => (
      <div
        key={i}
        style={{
          width: 16,
          height: 8,
          backgroundColor: i < level 
            ? (level < 5 ? '#ef4444' : '#22c55e')
            : '#334155',
          borderRadius: 2,
        }}
      />
    ))}
  </div>
);
```

---

## Verification Plan
1. Verify the "weak" model reveal is surprising
2. Test price emphasis lands
3. Check output quality message is clear
4. Ensure this doesn't come across as anti-premium-model
