# 🎬 Video Spec: Short_1_System_Problem

## Overview
| Property | Value |
|----------|-------|
| **Type** | Short |
| **Duration** | ~40 seconds |
| **Resolution** | 1080x1920 |
| **FPS** | 30 |
| **Composition ID** | `Short1SystemProblem` |

## Rules I Read Before Writing This Spec
- [x] animations.md
- [x] timing.md
- [x] sequencing.md
- [x] text-animations.md
- [x] images.md
- [x] assets.md
- [x] audio.md
- [x] fonts.md
- [x] transitions.md
- [x] display-captions.md
- [x] transcribe-captions.md

## Creative Direction
A fast-paced, highly kinetic typographic video using a very clean, pristine **light-mode** palette. The viewer is kept engaged through smooth spring animations, word-by-word highlights synced with the voiceover, and sleek abstract iconography that conveys the "messy workflow vs clean system" narrative. *No dark mode backgrounds allowed.*

### Color Palette
| Color | Hex | Usage |
|-------|-----|-------|
| Background | #F8FAFC | Clean slate grey-white base |
| Primary Text | #0F172A | Dark slate, highly legible contrast |
| Accent Primary | #3B82F6 | Electric Blue for key words/action items |
| Accent Danger | #EF4444 | Red for "falling apart" / mistakes / random skills |
| Accent Success| #10B981 | Emerald for "real system" / results / commands |

### Typography
| Font | Weight | Size | Usage |
|------|--------|------|-------|
| Inter | 800 (Bold) | 80-120px | Major emphasize text / kinetic words |
| Inter | 500 (Medium) | 60px | Supporting text |

---

## Scene Breakdown

### Voiceover Total Duration: ~40s (1200 frames @ 30fps) - Final frame timings will be driven by audio transcription.

### Scene 1: The Trap (0s - 4s)
**Transcript**: "Most people think they need more AI skills. They don't."
#### Visual Elements
- [ ] Central text changing dynamically with voiceover.
- [ ] Primary text "more AI skills" highlighted in Blue.
- [ ] "They don't" slams down in bold Red, crossing out "AI skills".
#### Animations
| Element | Type | Start | End | Easing |
|---------|------|-------|-----|--------|
| Text In | spring | 0s | 1s | {damping:200} |
| "They don't" slam | spring | 2.5s | 3s | {damping:15, stiffness:80, mass:2} |

### Scene 2: The Mess (4s - 9s)
**Transcript**: "They go online, download random stuff, plug it into their workflow, and hope it works."
#### Visual Elements
- [ ] Very clean grid background quickly gets cluttered with "random stuff" (icons of code, files, gears) appearing rapidly.
- [ ] Kinetic typography layered tightly over the icons.
#### Animations
| Element | Type | Start | End | Easing |
|---------|------|-------|-----|--------|
| Icons appear | spring | staggered | staggered | {damping:12} (bouncy, chaotic) |

### Scene 3: The Illusion & Collapse (9s - 15s)
**Transcript**: "Sometimes it even looks good at first. But once the project gets real, it starts falling apart."
#### Visual Elements
- [ ] The chaotic icons neatly assemble into a clean-looking "workflow stack".
- [ ] Then the stack aggressively violently scatters and falls to the bottom of the screen.
#### Animations
| Element | Type | Start | End | Easing |
|---------|------|-------|-----|--------|
| Blocks fall | interpolate | 12s | 14s | {easing: Easing.in(Easing.exp)} (accelerating to fall) |

### Scene 4: Identification (15s - 18s)
**Transcript**: "I know because I used to do the same thing."
#### Visual Elements
- [ ] Screen wipes to entirely clean white slate.
- [ ] Minimalist dark slate text appearing line by line with a quiet, calm motion to reset the pace.
#### Animations
| Element | Type | Start | End | Easing |
|---------|------|-------|-----|--------|
| Screen Wipe | Transition | 15s | 15.5s | slide({direction: 'from-bottom'}) |

### Scene 5: The Build (18s - 25s)
**Transcript**: "So I stopped chasing random skills and spent a couple of months building a real workflow for myself."
#### Visual Elements
- [ ] Sleek, interconnected grid lines drawing themselves on screen.
- [ ] Glowing "System" node turning on in Emerald green.
#### Animations
| Element | Type | Start | End | Easing |
|---------|------|-------|-----|--------|
| Line Draw | interpolate | 18s | 21s | Easing.inOut(Easing.ease) (mapping 0-1 to width/height) |
| Node Glow | interpolate | 22s | 23s | mapping to opacity/box-shadow |

### Scene 6: One Command (25s - 32s)
**Transcript**: "Now I can run one command, and the AI already knows what to check from my system."
#### Visual Elements
- [ ] A clean Light Theme terminal window pops up from the bottom.
- [ ] Typewriter effect: `> npx vibesuite init`
- [ ] A clean checkmark ✅ icon springs out as a success signal.
#### Animations
| Element | Type | Start | End | Easing |
|---------|------|-------|-----|--------|
| Terminal pop | spring | 25s | 26s | {damping: 20, stiffness: 200} |
| Typewriter | JS Slice | 26s | 28s | String slicing by frame math |

### Scene 7: Results (32s - 37s)
**Transcript**: "That's how I get better results without starting from scratch every single time."
#### Visual Elements
- [ ] A smooth, elegant line chart trending upwards (Emerald green) with a soft light-green gradient fill below it.
- [ ] Typography reinforcing "better results".
#### Animations
| Element | Type | Start | End | Easing |
|---------|------|-------|-----|--------|
| Chart draw | interpolate | 32s | 34s | mapping width from 0 to 100% with overflow: hidden |

### Scene 8: Call to Action (37s - Out)
**Transcript**: "If you want to see how that system actually works, I break it down in the full video."
#### Visual Elements
- [ ] Clean pulsing arrow animation pointing down toward where the related video link appears in Shorts.
- [ ] Kinetic CTA text: "Watch Full Breakdown".
#### Animations
| Element | Type | Start | End | Easing |
|---------|------|-------|-----|--------|
| Arrow pulse | interpolated | looping | looping | sin curve mapped to translateY |

---

## Technical Requirements

### Props Schema (Zod)
```ts
import { z } from "zod";
export const Short1SystemProblemSchema = z.object({
  audioUrl: z.string().describe("Path to the voiceover audio file"),
  transcription: z.any().describe("Transcription data (TikTokPage objects)"),
});
```

### Critical Rules (MEMORIZE THESE)
> ⛔ FORBIDDEN: CSS transitions, CSS animations, Tailwind animation classes
> ✅ REQUIRED: All animations via useCurrentFrame() + interpolate()/spring()
> ✅ REQUIRED: premountFor={1 * fps} on all <Sequence> components
> ✅ REQUIRED: staticFile() for public folder assets
> ✅ REQUIRED: Clamp extrapolation to prevent values going beyond range
