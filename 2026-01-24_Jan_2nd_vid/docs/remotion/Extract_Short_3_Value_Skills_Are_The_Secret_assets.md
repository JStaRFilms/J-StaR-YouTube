# 🎨 Asset Manifest: Extract_Short_3_Value_Skills_Are_The_Secret

**Video:** Extract_Short_3_Value_Skills_Are_The_Secret  
**Duration:** ~60 seconds (1800 frames @ 30fps)  
**Style:** Cyberpunk (Neon Blue #3B82F6, Neon Purple #8B5CF6, Dark Gray #111827)  
**Format:** 1080x1920 (9:16)

---

## 1. Code-Generatable Components ✅

*These will be built entirely with React/SVG code - no external images required*

| Component | Description | Scene | Complexity |
|-----------|-------------|-------|------------|
| `TopSecretStamp.tsx` | Animated "TOP SECRET" stamp with rotation, scale, and dashed border | HOOK | Medium |
| `ShhhFingerIcon.tsx` | Minimalist finger to lips emoji with subtle glow animation | HOOK | Low |
| `ScanningLine.tsx` | Hacker-style horizontal scan line moving down screen | HOOK | Low |
| `GridBackground.tsx` | Subtle grid overlay with fade-in animation | HOOK | Low |
| `TerminalWindow.tsx` | Terminal window with header bar, window controls, and dark content area | MEAT | Medium |
| `SourceFolderIcon.tsx` | Folder icon with documents label "/design-system-output" | MEAT | Low |
| `FileCopyProgress.tsx` | Progress bar with animated percentage counter (0% → 100%) | MEAT | Medium |
| `FileTreeVisualizer.tsx` | Animated folder/file tree structure with branch lines | MEAT | High |
| `TerminalSuccessMessages.tsx` | Typewriter success messages with green text ("✓ Folder structure created", etc.) | MEAT | Medium |
| `TerminalCursor.tsx` | Blinking cursor effect in terminal | MEAT | Low |
| `LevelUpProgress.tsx` | Step counter animation from 1 to 100 with progress bar | CTA | Medium |
| `MasterclassTitle.tsx` | Animated "MASTERCLASS" text with glow burst and spring bounce | CTA | Medium |
| `XPFloatAnimation.tsx` | "+999 XP" float-up effect | CTA | Low |
| `ThumbnailPreview.tsx` | Final frame thumbnail with glowing neon border | CTA | Medium |
| `LinkInBioCTA.tsx` | Animated "Link in Bio" CTA button with finger point icon | CTA | Medium |
| `ConfettiParticles.tsx` | Celebration confetti particle effects | CTA | Medium |
| `LevelUpFlash.tsx` | White flash overlay effect for level-up moment | CTA | Low |

**Subtotal:** 16 code-generatable components (most can be pure React/SVG)

### Code Implementation Notes

```tsx
// All animations via useCurrentFrame() + interpolate/spring
// Stamp effect: scale + rotation interpolation with spring physics
// Typewriter effect: text slicing based on frame interpolation
// Scanning line: translateY with linear easing
// File tree: stroke-dashoffset for branch lines
// XP float: translateY + opacity fade interpolation
// Level counter: Math.floor interpolation from 1 to 100
```

---

## 2. Image Prompts for User 🖼️

*Optional background enhancements that can be AI-generated*

| Asset | Prompt | Size | Usage Scene |
|-------|--------|------|-------------|
| `terminal_bg.png` | "Dark terminal screen background, cyberpunk aesthetic, subtle grid lines, deep dark gray #111827, professional hacker interface, 1080x1920" | 1080x1920 | MEAT (terminal bg) |
| `level_up_flash.png` | "White flash burst effect, radial gradient from white to transparent, celebration energy, clean overlay, 1080x1920" | 1080x1920 | CTA (flash effect) |
| `confetti_particle.png` | "Digital confetti particles, cyberpunk colors neon blue and purple, transparent background, scattered celebration, for overlay effects, 1080x1920" | 1080x1920 | CTA (particles) |

**Subtotal:** 3 optional AI-generated images (NOT required - code fallback available)

> **Note:** These are optional. All effects can be generated using pure CSS/SVG without external images. The terminal background, scan lines, and confetti can be created with React components.

---

## 3. External Assets Needed 📦

*These require user input or external sources*

| Asset | Type | Description | Source |
|-------|------|-------------|--------|
| Audio | Voiceover | "Skills are the secret nobody's talking about." | User records |
| Audio | Voiceover | "That was step 1. Full masterclass shows you how to USE it. Link below 👇" | User records |
| Audio | Voiceover (MEAT) | Terminal/file copy section narration (clip from main video) | User extracts from source |
| Audio | BGM/Track | Cyberpunk/Tech background music, 60 seconds | User provides |
| Font: Inter | Typography | Main UI font (Google Fonts - handled in code) | Free |
| Font: Roboto Mono | Typography | Terminal text, folder paths, step numbers (Google Fonts - handled in code) | Free |

**Subtotal:** 3 voiceover lines + 1 BGM track from user

### Audio Requirements

| Line | Duration | Content | Timing |
|------|----------|---------|--------|
| Voiceover 1 | ~3 sec | "Skills are the secret nobody's talking about." | 0:00-0:05 (HOOK) |
| Voiceover 2 | ~10 sec | Terminal/file copy narration (extracted from main video) | 0:05-0:50 (MEAT) |
| Voiceover 3 | ~5 sec | "That was step 1. Full masterclass shows you how to USE it. Link below 👇" | 0:50-0:60 (CTA) |

---

## 4. User Choices Section ⚡

For each item below, tell me: **Use Code-Generated** or **I'll Provide Custom**?

| Asset | Default (Code) | Your Choice |
|-------|----------------|-------------|
| Terminal Background | Code-generated dark terminal | [ ] Code / [ ] My Image |
| Level Up Flash | Code-generated white flash | [ ] Code / [ ] My Image |
| Confetti Particles | Code-generated SVG particles | [ ] Code / [ ] My Image |
| Voiceover Line 1 | User records | [ ] Record / [ ] AI Voice / [ ] Use Text-to-Speech |
| Voiceover Line 2 | User extracts from main video | [ ] Extract from source / [ ] Re-record |
| Voiceover Line 3 | User records | [ ] Record / [ ] AI Voice / [ ] Use Text-to-Speech |
| Background Music | User provides | [ ] My Track / [ ] Royalty-Free (I'll find) |

---

## 5. Implementation Order 📋

Once choices are confirmed:

### Phase 1: HOOK Components
1. Create `GridBackground.tsx` (subtle grid overlay)
2. Create `ShhhFingerIcon.tsx` (finger to lips emoji)
3. Create `ScanningLine.tsx` (hacker scan line)
4. Create `TopSecretStamp.tsx` (animated stamp effect)

### Phase 2: MEAT Components
5. Create `TerminalWindow.tsx` (terminal container)
6. Create `SourceFolderIcon.tsx` (source folder visual)
7. Create `FileCopyProgress.tsx` (progress bar + percentage)
8. Create `FileTreeVisualizer.tsx` (animated tree structure)
9. Create `TerminalSuccessMessages.tsx` (typewriter messages)
10. Create `TerminalCursor.tsx` (blinking cursor)

### Phase 3: CTA Components
11. Create `LevelUpProgress.tsx` (1-100 counter)
12. Create `LevelUpFlash.tsx` (flash effect)
13. Create `MasterclassTitle.tsx` (animated MASTERCLASS text)
14. Create `XPFloatAnimation.tsx` (XP float-up)
15. Create `ThumbnailPreview.tsx` (thumbnail with glow)
16. Create `LinkInBioCTA.tsx` (CTA button)
17. Create `ConfettiParticles.tsx` (celebration particles)

### Phase 4: Integration
18. Compose `ExtractShort3ValueSkillsAreTheSecret.tsx` main composition
19. Add audio hooks
20. Test frame-by-frame timing

---

## 6. Color Palette Reference 🎨

| Usage | Color | Hex | Component |
|-------|-------|-----|-----------|
| Background | Dark Gray | #111827 | All scenes |
| Primary Neon | Neon Blue | #3B82F6 | Terminal, MASTERCLASS, accents |
| Secondary Neon | Neon Purple | #8B5CF6 | THE SECRET 1%, glows, secrets |
| Success Green | Green | #22C55E | Terminal success messages |
| Warning Yellow | Yellow | #F59E0B | Loading states, XP |
| Secret Gold | Gold | #F59E0B | TOP SECRET stamp |
| Grid Lines | Dark | #1F2937 | UI guides, folder structures |
| Text Primary | White | #FFFFFF | Headings |
| Text Secondary | Muted | #94A3B8 | Body text, labels |
| Terminal BG | Very Dark | #0D1117 | Terminal content area |

---

## 7. Scene Timing Reference ⏱️

| Scene | Time | Frames | Key Elements |
|-------|------|--------|--------------|
| HOOK | 0:00-0:05 | 0-150 | Secret reveal, scan line, stamp |
| MEAT | 0:05-0:50 | 150-1500 | Terminal, file copy, success messages |
| CTA | 0:50-0:60 | 1500-1800 | Level up, MASTERCLASS, CTA |

---

*Asset Manifest created for Remotion Builder workflow*
