# 🎨 Asset Manifest: Extract_Short_2_Pain_Garbage_Alert

**Video:** Extract_Short_2_Pain_Garbage_Alert  
**Duration:** ~60 seconds (1800 frames @ 30fps)  
**Style:** Cyberpunk Warning Theme (Red #EF4444, Yellow #F59E0B, Dark Gray #111827)  
**Format:** 1080x1920 (9:16)

---

## 1. Code-Generatable Components ✅

*These will be built entirely with React/SVG code - no external images required*

| Component | Description | Scene | Complexity |
|-----------|-------------|-------|------------|
| `WarningTriangle.tsx` | Animated yellow triangle with pulsing exclamation mark | HOOK | Medium |
| `GlitchText.tsx` | "YOUR CODE = TRASH" with random character swap glitch effect | HOOK | Medium |
| `RedTintOverlay.tsx` | Full-screen pulsing red overlay for warning theme | HOOK | Low |
| `ScanlineEffect.tsx` | CRT-style horizontal scanlines for tech aesthetic | HOOK | Low |
| `GlitchStatic.tsx` | Random displacement glitch static effect | HOOK | Low |
| `UglyOutputGrid.tsx` | 2x2 or 3x3 grid display of bad AI outputs with glitch animations | MEAT | High |
| `RejectBadge.tsx` | Red "X" badge with spinning entrance animation | MEAT | Low |
| `UglyOutputLabel.tsx` | "UGLY OUTPUT" banner with typewriter effect | MEAT | Low |
| `GiftBox3D.tsx` | 3D gift box with opening animation (lid slides up) | CTA | High |
| `FreeTutorialCTA.tsx` | "FREE TUTORIAL" text reveal with glow effect | CTA | Medium |
| `BouncingArrow.tsx` | Downward pointing arrow with bounce animation | CTA | Low |
| `SparkleEffects.tsx` | Particle celebration system around box reveal | CTA | Medium |
| `GradientBackground.tsx` | Smooth red-to-purple gradient transition | CTA | Low |

**Subtotal:** 13 code-generatable components

### Code Implementation Notes

```tsx
// All animations via useCurrentFrame() + interpolate/spring
// Warning triangle: scale pulse with easing
// Glitch effect: random character swap or displacement per frame
// Red tint: opacity interpolation loop
// Gift box: pseudo-3D perspective with lid rotation
// Sparkles: particle system with staggered delays
```

---

## 2. Image Prompts for User 🖼️

*Optional background enhancements that can be AI-generated*

| Asset | Prompt | Size | Usage Scene |
|-------|--------|------|-------------|
| `warning_bg.png` | "Dark terminal screen with static noise, warning stripes, caution tape background, industrial hazard aesthetic, red and yellow warning colors, 1080x1920" | 1080x1920 | HOOK (bg) |
| `glitch_texture.png` | "Digital glitch artifacts, RGB split effect, corruption texture, transparent background, cyberpunk style, for overlay effects" | 1080x1920 | HOOK (overlay) |
| `ugly_ai_output_1.png` | "Terrible UI design, clashing orange on purple, bad spacing, misaligned elements, amateur web design, amateur graphic design, 400x400" | 400x400 | MEAT (grid item) |
| `ugly_ai_output_2.png` | "Awkward layout, terrible color combination, broken grid, amateur designer output, ugly interface, 400x400" | 400x400 | MEAT (grid item) |
| `ugly_ai_output_3.png` | "Generic vanilla styling, no creativity, bland design, missing visual hierarchy, 400x400" | 400x400 | MEAT (grid item) |
| `ugly_ai_output_4.png` | "Misaligned borders, clashing colors, amateur AI generation, terrible design, 400x400" | 400x400 | MEAT (grid item) |
| `celebration_bg.png` | "Hopeful purple gradient background, smooth transition, clean professional look, subtle glow, 1080x1920" | 1080x1920 | CTA (bg) |

**Subtotal:** 7 optional AI-generated images (NOT required - code fallback available)

> **Note:** These are optional. The code can generate all effects using pure CSS/SVG without external images. The Ugly Output Grid can be created programmatically with intentionally bad design choices.

---

## 3. External Assets Needed 📦

*These require user input or external sources*

| Asset | Type | Description | Source |
|-------|------|-------------|--------|
| Audio | Voiceover | "This is the garbage you're producing right now." | User records |
| Audio | Voiceover | "There's a fix. And it's free. Full tutorial linked below 👇" | User records |
| Audio | Voiceover | Clip from Main Video: "Ugly Output" section | Extract from source |
| Audio | SFX | Warning alarm/beep sound for triangle pulse | User provides |
| Audio | SFX | Box opening sound effect | User provides |
| Audio | SFX | Celebration chime for CTA | User provides |
| Font: Inter | Typography | Main UI font (Google Fonts - handled in code) | Free |
| Font: Roboto Mono | Typography | Code/technical labels (Google Fonts - handled in code) | Free |

**Subtotal:** 3 voiceover lines + 3 SFX + 1 BGM track from user

### Audio Requirements

| Line | Duration | Content | Timing |
|------|----------|---------|--------|
| Voiceover 1 | ~3 sec | "This is the garbage you're producing right now." | 0:00-0:05 |
| Voiceover 2 | ~5 sec | "There's a fix. And it's free. Full tutorial linked below 👇" | 0:50-0:60 |
| Voiceover 3 | ~45 sec | (Clip from Main Video) Ugly AI output commentary | 0:05-0:50 |
| SFX 1 | 0.5 sec | Warning alert beep (pulse with triangle) | 0:00-0:05 |
| SFX 2 | 0.3 sec | Box opening pop | 0:50-0:55 |
| SFX 3 | 1.0 sec | Celebration chime | 0:55-0:60 |

---

## 4. User Choices Section ⚡

For each item below, tell me: **Use Code-Generated** or **I'll Provide Custom**?

| Asset | Default (Code) | Your Choice |
|-------|----------------|-------------|
| Warning Background | Code-generated dark terminal with glitch | [ ] Code / [ ] My Image |
| Glitch Texture | Code-generated RGB split effect | [ ] Code / [ ] My Image |
| Ugly AI Output Images | Code-generated bad designs | [ ] Code / [ ] My Images |
| Celebration Background | Code-generated gradient | [ ] Code / [ ] My Image |
| Voiceover Line 1 | User records | [ ] Record / [ ] AI Voice / [ ] Text-to-Speech |
| Voiceover Line 2 | User records | [ ] Record / [ ] AI Voice / [ ] Text-to-Speech |
| Voiceover Line 3 (Ugly Output) | Extract from source video | [ ] Extract / [ ] Re-record |
| Warning SFX | User provides | [ ] My SFX / [ ] Find royalty-free |
| Box Opening SFX | User provides | [ ] My SFX / [ ] Find royalty-free |
| Celebration SFX | User provides | [ ] My SFX / [ ] Find royalty-free |
| Background Music | User provides | [ ] My Track / [ ] Royalty-free |

---

## 5. Implementation Order 📋

Once choices are confirmed:

### Phase 1: Hook Components
1. Create `WarningTriangle.tsx` (pulsing yellow triangle + exclamation)
2. Create `GlitchText.tsx` ("YOUR CODE = TRASH" glitch effect)
3. Create `RedTintOverlay.tsx` (pulsing red overlay)
4. Create `ScanlineEffect.tsx` (CRT scanlines)

### Phase 2: Meat Components
5. Create `UglyOutputGrid.tsx` (grid of bad AI outputs)
6. Create `RejectBadge.tsx` (red X badges)
7. Create `UglyOutputLabel.tsx` (typewriter banner)

### Phase 3: CTA Components
8. Create `GiftBox3D.tsx` (3D box opening animation)
9. Create `FreeTutorialCTA.tsx` (text reveal with glow)
10. Create `BouncingArrow.tsx` (downward arrow)
11. Create `SparkleEffects.tsx` (particle celebration)

### Phase 4: Polish Components
12. Create `GradientBackground.tsx` (red→purple transition)
13. Create `GlitchStatic.tsx` (random displacement)

### Phase 5: Integration
14. Compose `ExtractShort2PainGarbageAlert.tsx` main composition
15. Add audio hooks (voiceover + SFX)
16. Test frame-by-frame timing
17. Verify glitch intensity and timing

---

## 6. Color Palette Reference 🎨

| Usage | Color | Hex | Component |
|-------|-------|-----|-----------|
| Background | Dark Gray | #111827 | All scenes |
| Warning Yellow | Amber | #F59E0B | Triangle, highlights |
| Error Red | Red | #EF4444 | TRASH text, tint, badges |
| Primary Neon | Neon Blue | #3B82F6 | Accents (for contrast) |
| Secondary Neon | Neon Purple | #8B5CF6 | Glows, accents |
| Gift Gold | Amber | #F59E0B | Gift box, CTA elements |
| Text Primary | White | #FFFFFF | Headings |
| Text Secondary | Muted | #94A3B8 | Body text |
| Grid Lines | Dark | #1F2937 | UI guides, borders |

---

## 7. Scene Timing Reference ⏱️

| Scene | Time | Duration | Key Elements |
|-------|------|----------|--------------|
| HOOK | 0:00-0:05 | 150 frames | Warning triangle, "YOUR CODE = TRASH", red tint, scanlines |
| MEAT | 0:05-0:50 | 1350 frames | Ugly output grid, reject badges, global flicker |
| CTA | 0:50-End | 300 frames | Gift box reveal, "FREE TUTORIAL", arrow, sparkles |

---

*Asset Manifest created for Remotion Builder workflow*
