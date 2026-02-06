# 🎬 Video Spec: BR-13 Interview Process Flow

## Overview
| Property | Value |
|----------|-------|
| **Type** | B-Roll |
| **Duration** | 8 seconds (240 frames @ 30fps) |
| **Resolution** | 1920x1080 |
| **FPS** | 30 |
| **Composition ID** | `InterviewProcessFlow` |
| **Script Section** | POINT 4 - Live Demo (7:30-9:00) |

## Creative Direction
Animated chat-style interface showing the AI "interviewing" the user about their project. Each question appears, user responds, AI processes. Like a smart design assistant having a conversation. Modern chat UI with beautiful typing indicators.

### Color Palette
| Color | Hex | Usage |
|-------|-----|-------|
| Background | #0f172a | Dark blue |
| AI Bubble | #1e293b | Gray-blue for AI |
| User Bubble | #3b82f6 | Blue for user |
| Typing Indicator | #8b5cf6 | Purple dots |
| Highlight | #22c55e | Green for selected options |
| Text | #f8fafc | White text |

---

## Scene Breakdown

### Scene 1: Question 1 - Vibe (0s - 2.5s)
**Duration**: 2.5 seconds (75 frames)

#### Visual Elements
- [ ] Chat interface slides in
- [ ] AI message: "What's the vibe of your project?"
- [ ] Options appearing: [Modern] [Playful] [Corporate] [Minimal]
- [ ] User selects "Modern" (highlight + checkmark)
- [ ] Selection confirmation

#### Animations
| Element | Animation Type | Start Frame | End Frame | Method |
|---------|----------------|-------------|-----------|--------|
| Chat Window | Slide In | 0 | 20 | From bottom, `spring` |
| AI Avatar | Pop | 10 | 20 | Small avatar icon |
| AI Message | Typewriter | 15 | 40 | Letter by letter |
| Options | Stagger Pop | 40 | 55 | `spring`, 3-frame delay each |
| Selection | Highlight | 60 | 68 | "Modern" glows green |
| Checkmark | Draw | 65 | 72 | On selected option |

---

### Scene 2: Question 2 - Industry (2.5s - 5s)
**Duration**: 2.5 seconds (75 frames)

#### Visual Elements
- [ ] User message bubble: "Modern"
- [ ] AI typing indicator (three dots)
- [ ] AI: "What industry is this for?"
- [ ] Options: [Tech/SaaS] [Finance] [Healthcare] [E-commerce] [Other]
- [ ] User selects "Finance"

#### Animations
| Element | Animation Type | Start Frame | End Frame | Method |
|---------|----------------|-------------|-----------|--------|
| User Bubble | Slide In | 75 | 85 | From right |
| Typing Dots | Bounce Loop | 88 | 100 | Sequential bounce |
| AI Message | Typewriter | 100 | 120 | Question text |
| Options | Stagger Pop | 120 | 138 | More options this time |
| Selection | Highlight | 140 | 148 | "Finance" selected |

---

### Scene 3: Question 3 - Theme (5s - 7s)
**Duration**: 2 seconds (60 frames)

#### Visual Elements
- [ ] Faster pacing now (user is engaged)
- [ ] AI: "Dark mode or light mode?"
- [ ] Visual toggle instead of buttons
- [ ] User toggles to "Dark"
- [ ] Preview showing dark theme snippet

#### Animations
| Element | Animation Type | Start Frame | End Frame | Method |
|---------|----------------|-------------|-----------|--------|
| User Bubble 2 | Quick Slide | 150 | 158 | Faster |
| Typing | Shorter | 160 | 168 | Quick indicator |
| AI Message | Typewriter | 168 | 185 | Question |
| Toggle | Appear | 185 | 195 | Dark/Light toggle |
| Toggle Switch | Flip | 198 | 205 | Animate to dark |
| Preview | Fade In | 205 | 210 | Mini dark theme preview |

---

### Scene 4: Summary & Proceed (7s - 8s)
**Duration**: 1 second (30 frames)

#### Visual Elements
- [ ] All answers summarized in a card
- [ ] AI: "Perfect! Generating your design system..."
- [ ] Loading/processing indicator begins
- [ ] Progress starts

#### Animations
| Element | Animation Type | Start Frame | End Frame | Method |
|---------|----------------|-------------|-----------|--------|
| Summary Card | Pop | 210 | 225 | Consolidates answers |
| AI Message | Typewriter | 218 | 232 | "Perfect! Generating..." |
| Progress Start | Begin | 230 | 240 | Bar starts filling |
| Sparkle | Effect | 230 | 240 | Excitement particles |

---

## Technical Requirements

### Dependencies
```bash
pnpm install @remotion/google-fonts
```

### Props Schema (Zod)
```ts
import { z } from "zod";

const QuestionSchema = z.object({
  aiQuestion: z.string(),
  options: z.array(z.string()),
  userSelection: z.string(),
});

export const InterviewProcessFlowSchema = z.object({
  questions: z.array(QuestionSchema).default([
    {
      aiQuestion: "What's the vibe of your project?",
      options: ['Modern', 'Playful', 'Corporate', 'Minimal'],
      userSelection: 'Modern',
    },
    {
      aiQuestion: "What industry is this for?",
      options: ['Tech/SaaS', 'Finance', 'Healthcare', 'E-commerce'],
      userSelection: 'Finance',
    },
    {
      aiQuestion: "Dark mode or light mode?",
      options: ['Dark', 'Light'],
      userSelection: 'Dark',
    },
  ]),
});
```

### Chat Bubble Styles
```tsx
const aiBubble = {
  backgroundColor: '#1e293b',
  borderRadius: '18px 18px 18px 4px',
  padding: '12px 18px',
  maxWidth: '70%',
};

const userBubble = {
  backgroundColor: '#3b82f6',
  borderRadius: '18px 18px 4px 18px',
  padding: '12px 18px',
  alignSelf: 'flex-end',
};

// Typing indicator dots
const TypingDots = () => (
  <div style={{ display: 'flex', gap: 4 }}>
    {[0, 1, 2].map(i => (
      <div
        key={i}
        style={{
          width: 8,
          height: 8,
          borderRadius: '50%',
          backgroundColor: '#8b5cf6',
          transform: `scale(${spring({ frame: frame - i * 3, fps })})`,
        }}
      />
    ))}
  </div>
);
```

---

## Verification Plan
1. Verify chat feels natural, not robotic
2. Test pacing increases appropriately
3. Check selections are clearly visible
4. Ensure typing indicators are subtle but noticeable
