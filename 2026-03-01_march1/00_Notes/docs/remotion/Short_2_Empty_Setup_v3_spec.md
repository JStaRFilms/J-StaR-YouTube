# 🎬 Video Spec: Short_2_Empty_Setup_

## Overview
| Property | Value |
|----------|-------|
| **Type** | Short |
| **Duration** | 35 seconds (1050 frames @ 30fps) |
| **Resolution** | 1080x1920 |
| **FPS** | 30 |
| **Composition ID** | `Short2EmptySetup` |

## Rules I Read Before Writing This Spec
- [x] animations.md
- [x] timing.md
- [x] sequencing.md
- [x] transitions.md 
- [x] text-animations.md 
- [x] fonts.md
- [x] assets.md
- [x] images.md

## Creative Direction
A highly kinetic, light-mode visual journey emphasizing the contrast between an empty, chaotic workspace and a highly structured, robust system. Uses clean whites, soft grays, and highly saturated accent colors. Features rapid zooms, dynamic typography, and satisfying geometric alignments to maintain maximum retention for a voiceover-only video.

### Color Palette
| Color | Hex | Usage |
|-------|-----|-------|
| Background | #FAFAFA | Main canvas background |
| Grid Lines | #E5E7EB | Subtle structural grid in background |
| Text Dark | #111827 | Primary typography, stark contrast |
| Brand Cyan | #06B6D4 | Positive action, system components |
| Alert Red | #EF4444 | Missing files, errors, falling apart |
| Soft Shadow | rgba(0,0,0,0.05) | For elevating UI cards and giving depth |

### Typography
| Font | Weight | Size | Usage |
|------|--------|------|-------|
| Inter | 800 (ExtraBold) | 120px | Big punchy keywords and hooks |
| Inter | 600 (SemiBold) | 80px | Subtitles and supporting text |
| JetBrains Mono | 500 (Medium) | 60px | Code snippets and technical terms |

---

## Scene Breakdown

### Scene 1: The AI Scapegoat (0s - 3s)
**Audio:** "I used to think the AI was the problem."
**Duration**: 3 seconds (90 frames)

#### Visual Elements
- **Background**: Soft white grid (#FAFAFA with #E5E7EB lines).
- **Element 1**: A sleek, stylized AI icon (robot head/sparkle) in the center.
- **Element 2**: Large text "AI IS THE PROBLEM" dropping in, word by word.

#### Animations (from timing.md / animations.md)
| Element | Type | Start | End | Easing |
|---------|------|-------|-----|--------|
| Element 1 | scale/spring | 0 | 30 | `spring({damping: 12, stiffness: 150})` (bouncy) |
| Element 2 | slideUp/fade | 15 | 45 | `spring({damping: 200})` mapped to translateY/opacity |

#### Code Approach
```tsx
const frame = useCurrentFrame();
const scale = spring({frame, fps, config: {damping: 12, stiffness: 150}});
const textY = interpolate(spring({frame: frame - 15, fps}), [0, 1], [50, 0]);
const textOpacity = interpolate(frame, [15, 30], [0, 1]);
```

---

### Scene 2: The Empty Void (3s - 7s)
**Audio:** "But the real problem was that my workspace was empty."
**Duration**: 4 seconds (120 frames)

#### Visual Elements
- **Element 1**: Camera "zooms out" dramatically, making the AI icon tiny, revealing a massive, perfectly empty white expanse.
- **Element 2**: A hollow dashed outline of a folder titled "Workspace" sitting in the middle.
- **Element 3**: Text "EMPTY WORKSPACE" flashing in the center.

#### Animations 
| Element | Type | Start | End | Easing |
|---------|------|-------|-----|--------|
| Element 1 | zoomOut | 0 | 40 | `spring({damping: 200})` mapped to scale (1 -> 0.1) |
| Element 2 | strokeDashoffset | 10 | 60 | `interpolate` linear to draw the outline |
| Element 3 | scaleText | 30 | 60 | `spring({damping: 15, stiffness: 200})` |

---

### Scene 3: Missing Pieces (7s - 11s)
**Audio:** "No context files. No coding standards. No design system. No checks."
**Duration**: 4 seconds (120 frames)

#### Visual Elements
- **Element 1-4**: Four distinct high-end UI cards (Context, Standards, Design, Checks) rapidly slamming onto the screen one by one. But they are instantly stamped with a huge red "MISSING" or an "X".

#### Animations 
| Element | Type | Start | End | Easing |
|---------|------|-------|-----|--------|
| Element 1 | slideIn+Stamp | 0 | 15 | spring (card) + interpolate scale (stamp) |
| Element 2 | slideIn+Stamp | 20 | 35 | spring (card) + interpolate scale (stamp) |
| Element 3 | slideIn+Stamp | 40 | 55 | spring (card) + interpolate scale (stamp) |
| Element 4 | slideIn+Stamp | 60 | 75 | spring (card) + interpolate scale (stamp) |

---

### Scene 4: The Guesswork (11s - 16s)
**Audio:** "So every time I asked it to build something, it had to guess. And guessed output might look fine at first."
**Duration**: 5 seconds (150 frames)

#### Visual Elements
- **Element 1**: A giant loading spinner turning into a 3D question mark.
- **Element 2**: Random UI components (buttons, text fields, boxes) flying out from the center, forming a neatly stacked "Component".
- **Element 3**: A green "LOOKS FINE" badge pops up.

#### Animations 
| Element | Type | Start | End | Easing |
|---------|------|-------|-----|--------|
| Element 1 | spin + rotateX | 0 | 60 | linear rotation |
| Element 2 | radial fly-out | 30 | 90 | spring to target coordinates (x, y) |
| Element 3 | popIn | 100 | 120 | bouncy spring |

---

### Scene 5: The Collapse (16s - 21s)
**Audio:** "But once the project gets real, it starts falling apart. That was the shift for me."
**Duration**: 5 seconds (150 frames)

#### Visual Elements
- **Element 1**: The neat "Component" from Scene 4 suddenly shudders.
- **Element 2**: Gravity turns on. All the pieces physically fall to the bottom of the screen in a chaotic jumble. Red error sparks fly.
- **Element 3**: A bright light flashes, sweeping the broken pieces away.

#### Animations 
| Element | Type | Start | End | Easing |
|---------|------|-------|-----|--------|
| Element 1 | shake | 0 | 30 | `Math.sin(frame) * 10` |
| Element 2 | fall (gravity) | 30 | 90 | quadratic interpolate (`Math.pow`) for gravity |
| Element 3 | flash/wipe | 120| 150 | scale up a white circle to cover screen |

---

### Scene 6: The Setup (21s - 28s)
**Audio:** "I stopped blaming the AI and started fixing the setup. Once I gave it a real system to work from, the results got way better."
**Duration**: 7 seconds (210 frames)

#### Visual Elements
- **Element 1**: A beautifully animated blueprint grid (cyan lines) constructs itself.
- **Element 2**: Context files, Standards, and Design System components smoothly slide into designated slots perfectly.
- **Element 3**: A glowing green "SYSTEM ONLINE" indicator.

#### Animations 
| Element | Type | Start | End | Easing |
|---------|------|-------|-----|--------|
| Element 1 | stroke draw | 0 | 60 | interpolate strokeDashoffset |
| Element 2 | slot-in | 60 | 120 | sequenced springs with `{damping: 200}` |
| Element 3 | glow pulse | 150 | 210 | `interpolate(Math.sin(...))` for glowing |

---

### Scene 7: Outro CTA (28s - 35s)
**Audio:** "That's part of what I break down in the full video."
**Duration**: 7 seconds (210 frames)

#### Visual Elements
- **Element 1**: The screen scales back into a sleek frame.
- **Element 2**: Text "WATCH FULL VIDEO".
- **Element 3**: An animated arrow pointing to the actual YouTube Short related video link location (usually bottom center or bottom right on YouTube).

#### Animations 
| Element | Type | Start | End | Easing |
|---------|------|-------|-----|--------|
| Element 1 | scaleDown | 0 | 40 | spring({damping: 80}) |
| Element 2 | typewriter | 40 | 100 | string slicing |
| Element 3 | loop bounce | 100 | 210 | `Math.sin(frame / 5) * 20` |

---

## Technical Requirements

### Props Schema (Zod)
```ts
import { z } from "zod";
export const Short2EmptySetupSchema = z.object({
  titleText: z.string().default("The Real Problem"),
  accentColor: z.string().default("#06B6D4"),
});
```

### Critical Rules (MEMORIZE THESE)
> ⛔ FORBIDDEN: CSS transitions, CSS animations, Tailwind animation classes
> ✅ REQUIRED: All animations via useCurrentFrame() + interpolate()/spring()
> ✅ REQUIRED: premountFor={1 * fps} on all <Sequence> components
> ✅ REQUIRED: staticFile() for public folder assets
> ✅ REQUIRED: Clamp extrapolation to prevent values going beyond range
