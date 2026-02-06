# 🎬 Video Spec: Anniversary Gift (Cinematic Redesign)

## Overview
| Property | Value |
|----------|-------|
| **Theme** | Cinematic Digital Scrapbook |
| **Colors** | Rose Gold (#B76E79), Deep Navy (#1A1A2E), Warm White (#FDF5E6) |
| **Motion** | Parallax, Camera Fly-through, Match Cuts |
| **Music** | (Ideally something emotional/cinematic - User provides) |

## Scene Breakdown

### Scene 1: The Spark (2022)
- **Visuals**: Deep Navy background with subtle film grain.
- **Action**: Lens flare opening. Chat bubbles pop in (bouncy).
- **Font**: Modern Sans-Serif (Inter/Montserrat).
- **Juice**: Optical flares.

### Scene 2: The Timeline (2023-2025)
- **Visuals**: Camera flies *across* a timeline.
- **Action**: Years pass by (2023... 2024...). Keywords (Trust, Support) float in Z-space (Parallax).
- **Easter Eggs**: Code icon `</>`, Camera icon 📷.

### Scene 3: The Convergence (Milestone)
- **Visuals**: Transition to White/Gold Shimmer. Clean & Sophisticated.
- **Action**: "John" and "Enny" text collide.
- **Effect**: Particle spark/glow on collision -> Morphs into "Jenny" (Script font).
- **Object**: Ring icon with shimmer gloss.

### Closing
- "Forever to go" with pulsing heart.

## Technical Components Plan
1.  `ScrapbookTexture`: CSS noise overlay + vignette.
2.  `LensOverlay`: Additive blending png/svg for flare.
3.  `TimelineTunnel`: 3D sequence moving elements towards camera.
4.  `JennyReveal`: New morph component with collision physics.
