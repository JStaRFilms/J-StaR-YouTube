# 🎬 Video Spec: Extract_Short_3_Value_Skills_Are_The_Secret

## Overview
| Property | Value |
|----------|-------|
| **Type** | Short (9:16) |
| **Duration** | ~60 seconds (1800 frames @ 30fps) |
| **Resolution** | 1080x1920 |
| **FPS** | 30 |
| **Composition ID** | `ExtractShort3ValueSkillsAreTheSecret` |
| **Style** | Cyberpunk |

## Rules I Read Before Writing This Spec
- [x] animations.md
- [x] timing.md
- [x] sequencing.md
- [x] text-animations.md
- [x] fonts.md
- [x] assets.md
- [x] images.md
- [x] transitions.md

## Creative Direction
**Theme:** Cyberpunk Aesthetic. High contrast, neon accents, dark backgrounds with mysterious, secretive elements.
**Vibe:** Tech-focused, "hacker" energy, revealing hidden knowledge, level-up progression.

### Color Palette (Cyberpunk)
| Color | Hex | Usage |
|-------|-----|-------|
| Background | #111827 | Main bg - dark gray |
| Primary Neon | #3B82F6 | Neon blue accents, highlights, terminal |
| Secondary Neon | #8B5CF6 | Neon purple accents, glows, secrets |
| Text Primary | #FFFFFF | Main headings, white |
| Text Secondary | #94A3B8 | Body text, muted |
| Success Green | #22C55E | Terminal success states, completed steps |
| Warning Yellow | #F59E0B | Loading, in-progress states |
| Secret Gold | #F59E0B | "Top Secret" stamp, special emphasis |
| Grid Lines | #1F2937 | UI guides, borders, folder structures |

### Typography
| Font | Family | Usage |
|------|--------|-------|
| Primary | 'Inter', sans-serif | UI Elements, Labels, Body |
| Display | 'Inter', sans-serif (900 weight) | "THE SECRET 1%", "MASTERCLASS", Big headlines |
| Mono | 'Roboto Mono', monospace | Terminal text, folder paths, step numbers |

---

## Scene Breakdown

### Scene 1: HOOK - Top Secret Reveal (0:00-0:05)
**Duration:** 150 frames (0:00-0:05)
**Audio:** "Skills are the secret nobody's talking about."

#### Visual Elements
- [ ] **Dark Background**: Deep dark gray (#111827) with subtle grid overlay
- [ ] **"Shhh" Emoji/Finger to Lips**: Centered, minimalist
  - Size: ~120px
  - Color: White with subtle glow
- [ ] **"TOP SECRET" Stamp**: Red/Gold stamp effect
  - Rotation: ~15 degrees
  - Border: Dashed line
  - Color: Secret Gold (#F59E0B)
  - Opacity: Starts at 0, fades in with stamp effect
- [ ] **"THE SECRET 1%" Text**: Large, bold centered text
  - Color: Neon Purple (#8B5CF6) with glow
  - Size: 64px+, heavy weight
  - Subtle pulse animation
- [ ] **Scanning Line**: Horizontal scan line moving down the screen (hacker aesthetic)

#### Animations Table
| Element | Animation | Frames | Easing |
|---------|-----------|--------|--------|
| Background Grid | Fade in | 0-15 | easeOut |
| "Shhh" Emoji | Scale 0 → 1 + Fade | 15-45 | spring |
| Finger Icon | Subtle float | 45-150 | easeInOut |
| "TOP SECRET" Stamp | Scale + Rotate + Fade | 30-60 | easeOut |
| "THE SECRET 1%" | Typewriter + Fade | 45-90 | easeOut |
| "THE SECRET 1%" | Glow pulse | 90-150 | loop |
| Scanning Line | Move top → bottom | 0-150 | linear |
| Global Vignette | Fade in | 0-30 | easeOut |

#### Code Approach
```tsx
// Secret stamp effect with rotation and scale
const stampProgress = spring({
  frame: frame - 30,
  fps,
  config: { damping: 15, stiffness: 200 }
});

const stampScale = interpolate(stampProgress, [0, 1], [2, 1]);
const stampOpacity = interpolate(stampProgress, [0, 0.3, 1], [0, 0, 1]);
const stampRotation = interpolate(stampProgress, [0, 1], [-15, -12]);

// Typewriter effect for "THE SECRET 1%"
const textFrame = interpolate(frame, [45, 90], [0, 1]);
const displayText = "THE SECRET 1%".slice(0, Math.floor(textFrame * 16));

// Scanning line effect
const scanLineY = interpolate(frame, [0, 150], [-100, 2020]);

// Pulse glow effect
const glowPulse = interpolate(frame, [90, 120, 150], [1, 1.2, 1], {
  easing: Easing.inOut(Easing.quad),
});
```

---

### Scene 2: MEAT - Installation/File Copy Terminal (0:05-0:50)
**Duration:** 1350 frames (0:05-0:50)
**Audio:** (Clip from Main Video: Installation/File Copy section)
**Focus:** Satisfying "Copy -> Paste" of folder structure + Terminal "Success" messages

#### Visual Elements
- [ ] **Terminal Window**: Dark background with code-like appearance
  - Header bar: Neon blue (#3B82F6)
  - Window controls: Red/Yellow/Green dots
  - Content area: Dark gray (#0D1117)
- [ ] **Source Folder**: Visual representation of folders being copied
  - Icon: Folder with documents
  - Label: "/design-system-output"
- [ ] **Copy Animation**: Progress bar or loading indicator
  - Animated percentage: 0% → 100%
  - File count: "Copying 247 files..."
- [ ] **Destination Folder**: Empty folder structure appearing
  - Animated appearance as files populate
- [ ] **Terminal Success Messages**: Green text appearing
  - "✓ Folder structure created"
  - "✓ Design tokens parsed"
  - "✓ Components generated"
  - "✓ SUCCESS: Full system ready"
- [ ] **File Tree Visualization**: Expanding tree structure
  - Branch lines appearing one by one
  - File names fading in

#### Animations Table
| Element | Animation | Frames | Easing |
|---------|-----------|--------|--------|
| Terminal Window | Slide down + Fade | 0-30 | easeOut |
| Terminal Header | Width 0 → 100% | 15-45 | easeInOut |
| Source Folder Icon | Scale bounce | 30-60 | spring |
| Copy Progress Bar | Width 0 → 100% | 60-300 | linear |
| Percentage Counter | 0% → 100% | 60-300 | linear |
| Destination Folder | Fade in + Scale | 120-150 | spring |
| File Tree Lines | Draw one by one | 180-480 | easeInOut |
| File Names | Stagger fade in | 240-540 | spring |
| Success Message 1 | Typewriter + Green | 480-540 | linear |
| Success Message 2 | Typewriter + Green | 510-570 | linear |
| Success Message 3 | Typewriter + Green | 540-600 | linear |
| Final "SUCCESS" | Scale pulse + Glow | 600-750 | spring |
| Terminal Cursor | Blink | 0-750 | loop |

#### Code Approach
```tsx
// Copy progress animation
const copyProgress = interpolate(frame, [60, 300], [0, 1], {
  extrapolateLeft: 'clamp',
  extrapolateRight: 'clamp',
});

const percentage = Math.floor(copyProgress * 100);

// File tree line drawing effect
const treeLineProgress = interpolate(frame, [180, 480], [0, 1], {
  extrapolateLeft: 'clamp',
  extrapolateRight: 'clamp',
});

// Staggered success messages
const successDelay = index * 30;
const successFrame = frame - successDelay;
const showSuccess = successFrame > 480 && successFrame < 540;

// Terminal cursor blink
const cursorOpacity = Math.sin(frame / 10) > 0 ? 1 : 0;
```

---

### Scene 3: CTA - Level Up to Masterclass (0:50-End)
**Duration:** 300 frames (0:50-0:60)
**Audio:** "That was step 1. Full masterclass shows you how to USE it. Link below 👇"

#### Visual Elements
- [ ] **Level Progress Bar**: Step 1 → Step 100 visualization
  - Number counter: Animated from 1 to 100
  - Progress bar filling up
  - Level-up flash effect at 100
- [ ] **"MASTERCLASS" Text**: Large, animated
  - Color: Neon Blue (#3B82F6) with purple glow
  - Size: 72px+, ultra bold
  - Entrance: Scale + Fade + Glow burst
- [ ] **Experience/XP Indicator**: "+999 XP" or similar gaming reference
  - Animated float-up effect
- [ ] **Thumbnail Preview**: Small preview of main video
  - Position: Bottom right or center
  - Border: Glowing neon
  - Label: "FULL VIDEO"
- [ ] **"Link in Bio" Callout**: Animated finger point
  - Background: Gradient button
  - Icon: YouTube/Social finger point
- [ ] **Confetti/Particle Effects**: Celebration particles

#### Animations Table
| Element | Animation | Frames | Easing |
|---------|-----------|--------|--------|
| Level Container | Fade in | 0-15 | easeOut |
| Level Number | 1 → 100 counting | 15-150 | linear |
| Progress Bar | Width 0 → 100% | 15-150 | linear |
| Level Up Flash | White flash | 150-165 | easeInOut |
| "MASTERCLASS" | Scale 0 → 1.2 → 1 | 120-180 | spring |
| "MASTERCLASS" | Glow burst | 150-210 | easeOut |
| XP Float | Float up + Fade | 165-210 | easeOut |
| Thumbnail Preview | Scale 0 → 1 + Border | 180-210 | spring |
| Thumbnail Glow | Pulse | 210-300 | loop |
| "Link in Bio" | Slide up + Scale | 210-250 | spring |
| "Link in Bio" | Glow pulse | 250-300 | loop |
| Confetti | Pop around | 150-250 | spring |

#### Code Approach
```tsx
// Level counter from 1 to 100
const levelProgress = interpolate(frame, [15, 150], [0, 1], {
  extrapolateLeft: 'clamp',
  extrapolateRight: 'clamp',
});
const currentLevel = Math.floor(1 + levelProgress * 99);

// Progress bar filling
const progressWidth = interpolate(levelProgress, [0, 1], [0, 800]);

// Level up flash effect
const flashOpacity = interpolate(frame, [150, 165], [1, 0], {
  extrapolateLeft: 'clamp',
  extrapolateRight: 'clamp',
});

// Masterclass text with spring bounce
const masterclassScale = spring({
  frame: frame - 120,
  fps,
  config: { damping: 12, stiffness: 150 }
});

// XP float animation
const xpY = interpolate(frame, [165, 210], [0, -50]);
const xpOpacity = interpolate(frame, [165, 210], [1, 0]);

// Glow burst effect
const glowRadius = interpolate(frame, [150, 210], [0, 50]);
```

---

## Technical Requirements

### Schema
```ts
import { z } from "zod";

export const ExtractShort3ValueSkillsAreTheSecretSchema = z.object({
  // Optional: Custom secret message text
  secretText: z.string().optional(),
  
  // Optional: Custom folder structure to display
  folderStructure: z.array(z.object({
    name: z.string(),
    type: z.enum(['folder', 'file']),
    indented: z.number().optional(),
  })).optional(),
  
  // Optional: Custom success messages
  successMessages: z.array(z.string()).optional(),
  
  // Optional: Masterclass title override
  masterclassTitle: z.string().optional(),
  
  // Optional: Thumbnail image for final frame
  thumbnailImage: z.string().optional(),
  
  // Optional: CTA link URL
  ctaUrl: z.string().url().optional(),
});
```

### Components to Build
1. `TopSecretStamp.tsx` - Animated "TOP SECRET" stamp with rotation and scale
2. `ShhhFingerIcon.tsx` - Minimalist finger to lips emoji with glow
3. `ScanningLine.tsx` - Hacker-style horizontal scan line effect
4. `TerminalWindow.tsx` - Terminal window with header, content area, and glow effects
5. `FileCopyProgress.tsx` - Copy animation with progress bar and percentage
6. `FileTreeVisualizer.tsx` - Animated folder/file tree structure
7. `TerminalSuccessMessages.tsx` - Typewriter success messages with green text
8. `LevelUpProgress.tsx` - Step counter animation from 1 to 100
9. `MasterclassTitle.tsx` - Animated "MASTERCLASS" text with glow burst
10. `ThumbnailPreview.tsx` - Final frame thumbnail with glowing border
11. `LinkInBioCTA.tsx` - Animated CTA button with finger point icon
12. `ConfettiParticles.tsx` - Celebration particle effects

### Critical Rules
> ⛔ FORBIDDEN: CSS transitions, CSS animations, Tailwind animation classes
> ✅ REQUIRED: All animations via `useCurrentFrame()` + `interpolate`/`spring`
> ✅ REQUIRED: `premountFor={30}` on all `<Sequence>` components
> ✅ REQUIRED: `staticFile()` for any images (if any)
> ✅ REQUIRED: Clamp extrapolation to prevent values going beyond range
> ✅ REQUIRED: Safe zone - keep critical content above bottom 20% (384px from bottom)
> ✅ REQUIRED: Use `<Series>` for sequential scene transitions
> ✅ REQUIRED: Use `interpolate` with proper easing for typewriter effects

### Special Notes
- **Mystery Vibe**: The HOOK should feel secretive and mysterious. Use minimal elements, dark background, and focused attention on the "SECRET" message.
- **Terminal Satisfaction**: The MEAT section should feel satisfying to watch. Use smooth progress animations, clear success states, and the "hacker" aesthetic with green terminal text.
- **Level Up Energy**: The CTA should feel like a video game level-up. Use spring animations with overshoot, flash effects, and celebration particles.
- **Frame-Accurate Timing**: All animations must be tied to `useCurrentFrame()` for smooth 30fps rendering.
- **Pacing**: Keep the transition between scenes snappy. Use fade + slide combinations for smooth but fast scene changes.
- **Safe Zone**: Ensure "MASTERCLASS" text and CTA elements stay within safe zone (above bottom 20% of frame).
