# 🎬 Video Spec: Short_1_System_Problem (Hyper-Retention Version)

## Overview
| Property | Value |
|----------|-------|
| **Type** | Short (Voiceover Only, NO Assisting Video) |
| **Duration** | ~30 seconds |
| **Resolution** | 1080x1920 |
| **FPS** | 60 (for buttery smooth kinetic motion) |
| **Composition ID** | `Short1SystemProblem` |

## Rules I Read Before Writing This Spec
- [x] youtube-phase3-scripting.md (Retention & Hooks)
- [x] youtube-phase4-production.md (Dopamine Machine, Cut gaps, Sound design)
- [x] animations.md / timing.md / sequencing.md 
- [x] text-animations.md / fonts.md

## Creative Direction
**The "Dopamine Machine" Edit.** Since there is no on-camera face, the visuals carry *100% of the retention weight*. 
- **Rule 1: Visual Change.** The screen MUST violently or elegantly shift every 1.5 to 2.5 seconds.
- **Rule 2: Hyper-Light Mode.** Pure whites, subtle grays, and highly saturated accent colors. *Zero dark mode elements.*
- **Rule 3: Sound is 50%.** If a graphic moves, it has a sound. Silent motion = cheap.
- **Rule 4: Brutal Typography.** Use massive, bold Inter/Helvetica. Fill the negative space. Words punch the screen as they are spoken.

### Color Palette
| Color | Hex | Usage |
|-------|-----|-------|
| Clean Canvas | `#FFFFFF` | Absolute white background for maximum contrast |
| Soft Structure | `#F3F4F6` | Ultra-subtle grays for grids and borders |
| Brutal Ink | `#0F172A` | Almost black for primary typography |
| Error Red | `#DC2626` | Deep red for mistakes / "Total collapse" / "X" |
| Electric Blue | `#2563EB` | 100% saturation blue for "The System" / The fix |
| Success Emerald| `#059669` | vibrant green for checkmarks / growth |

### Typography
| Font | Weight | Size | Usage |
|------|--------|------|-------|
| Inter | 900 (Black) | 120-180px | Kinetic slam hooks |
| Inter | 600 (Semi) | 60-80px | Quick read subtitles / terminal text |

---

## Scene Breakdown (Pacing: One visual hook every ~3s)

### Scene 1: The Contrarian Hook (0.0s - 3.0s)
**Transcript**: "Most people think they need more AI skills. They don't."
#### Visual Elements
- [ ] 0.0s: Pure white screen. "MORE AI SKILLS" slams into the center, vibrating slightly.
- [ ] 2.0s: "THEY DON'T." A massive, aggressive Error Red slashing "X" paints itself over the text.
#### Audio & Animation
- **SFX**: Deep sub-bass boom on text. Sharp marker "shhkkkk" on the red X.
- **Anim**: `spring({ stiffness: 300, damping: 10 })` for violent text entry.

### Scene 2: The Duct-Tape Mirage (3.0s - 6.0s)
**Transcript**: "They download random code, duct-tape it together, and pray it works."
#### Visual Elements
- [ ] Rapid-fire cascading UI cards (Python logos, JSON snippets) piling up messily.
- [ ] Literal SVGs of gray duct tape slapping across the cards, holding them awkwardly.
#### Audio & Animation
- **SFX**: 4-5 quick paper/card shuffling sounds. Ripping tape sound.
- **Anim**: Staggered `spring` drops. The tape scales down rapidly from 5x to 1x on impact.

### Scene 3: The Production Collapse (6.0s - 9.0s)
**Transcript**: "It looks fine... until it hits production. Then? Total collapse."
#### Visual Elements
- [ ] 6.0s: The messy pile gets a soft green glow and a "LOOKS FINE" banner.
- [ ] 7.5s: "PRODUCTION" text drops like an anvil. The entire stack of cards violently shatters out of frame (Y-axis translation + rotation out bounds).
#### Audio & Animation
- **SFX**: A soft chime... interrupted by a massive glass shatter / bass drop.
- **Anim**: Easing array `[0, 1]` to `[0, 2000]` translateY via `interpolate`, accelerating out.

### Scene 4: The Minimalist Reset (9.0s - 12.0s)
**Transcript**: "I lost months to this exact trap."
#### Visual Elements
- [ ] Hard cut to pristine white. A clean animated calendar icon.
- [ ] The pages rapidly tear off (Jan, Feb, Mar, Apr).
- [ ] Red typography beneath: "LOST MONTHS".
#### Audio & Animation
- **SFX**: Rapid paper tearing sounds matching the pages.
- **Anim**: Fast looping translate transitions on the calendar page SVGs.

### Scene 5: The System Ignition (12.0s - 16.0s)
**Transcript**: "So I burned it down and built a single, unified system."
#### Visual Elements
- [ ] A perfect, symmetrical geometric grid draws itself.
- [ ] A glowing Electric Blue node ignites in the center. Lines connect flawlessly outward.
#### Audio & Animation
- **SFX**: Match strike ("burned it down"), followed by a futuristic, deep power-up hum.
- **Anim**: Stroke-dashoffset animation for the grid lines (`interpolate` 100 to 0).

### Scene 6: The Magic Command (16.0s - 21.0s)
**Transcript**: "Now? One terminal command. The AI instantly reads my entire codebase."
#### Visual Elements
- [ ] A beautiful, Light-Mode MacOS terminal expands (`border: 1px solid #E5E7EB`).
- [ ] Typewriter: `> system --analyze`
- [ ] Flash! A web of folder structure nodes explodes outward on screen, highly organized.
#### Audio & Animation
- **SFX**: Clack-clack-clack mechanical keyboard hits. A "whoosh" network sound.
- **Anim**: Terminal uses bouncy `spring`. Codebase network uses staggered scale-ins.

### Scene 7: Perfection (21.0s - 25.0s)
**Transcript**: "Zero setup. Perfect context. Every single time."
#### Visual Elements
- [ ] 21.0s: "ZERO SETUP" in Brutal Ink.
- [ ] 22.5s: "PERFECT CONTEXT" in Success Emerald with a cascading wave of checkmarks ✅.
- [ ] 24.0s: "EVERY TIME" scales up continuously toward the camera.
#### Audio & Animation
- **SFX**: Two clean pop sounds. A rising synth tone.
- **Anim**: `spring({ damping: 15, mass: 1.5 })`

### Scene 8: The Bridge (25.0s - 30.0s)
**Transcript**: "I just dropped the full system breakdown. Watch it here."
#### Visual Elements
- [ ] Clean white screen, blue play button glowing.
- [ ] Extremely kinetic arrow bouncing downwards, pointing at the YouTube Shorts related-link zone.
#### Audio & Animation
- **SFX**: Soft hum, rhythmic swoosh.
- **Anim**: Sine-wave translation mapped to the arrow, looping cleanly.

---

## Technical Requirements (Remotion)

### Props Schema (Zod)
```ts
import { z } from "zod";
export const Short1SystemProblemSchema = z.object({
  audioUrl: z.string(),
  transcription: z.any().describe("TikTok/Whisper timestamps for precise word sync"),
});
```

### Critical Rules
> ⛔ FORBIDDEN: CSS transitions. Avoid dark colors and low contrast. Don't let a scene sit still for >60 frames.
> ✅ REQUIRED: `spring()` and `interpolate()` bound to `useCurrentFrame()`.
> ✅ REQUIRED: Audio component integration for EVERY SFX listed. SFX file paths bound to `<Audio>`.
> ✅ REQUIRED: SVGs for everything. No raw ping assets unless necessary. Sharp paths.
