# 🎨 Asset Manifest: Extract_Short_1_Result

**Video:** Extract_Short_1_Result  
**Duration:** ~60 seconds (1800 frames @ 30fps)  
**Style:** Cyberpunk (Neon Blue #3B82F6, Neon Purple #8B5CF6, Dark Gray #111827)  
**Format:** 1080x1920 (9:16)

---

## 1. Code-Generatable Components ✅

*These will be built entirely with React/SVG code - no external images required*

| Component | Description | Scene | Complexity |
|-----------|-------------|-------|------------|
| `SplitScreenBeforeAfter.tsx` | Vertical 50/50 split container with clip-path and divider line | HOOK | Medium |
| `GlitchText.tsx` | Animated glitch text effect with random displacement | HOOK | Medium |
| `ScrollMontage.tsx` | Vertical scrolling viewport for design system cards | MEAT | High |
| `DesignSystemCard.tsx` | Individual card with colors, typography, spacing, shadows | MEAT | Medium |
| `WorkflowDiagram.tsx` | Horizontal flow chart with animated arrows and node icons | CTA | High |
| `LinkInBioCTA.tsx` | Animated CTA button with blur overlay and sparkle effects | CTA | Medium |
| `SparkleEffects.tsx` | Particle celebration effects around CTA | CTA | Low |
| `ScrollIndicator.tsx` | Animated arrow showing scroll direction | MEAT | Low |
| `QualityBadge.tsx` | "4K Ready", "Production Ready" badges | MEAT | Low |

**Subtotal:** 9 code-generatable components

### Code Implementation Notes

```tsx
// All animations via useCurrentFrame() + interpolate/spring
// Glitch effect: random frame offsets for BEFORE side
// Scroll effect: translateY with clamp extrapolation
// Arrow drawing: stroke-dashoffset animation
// Blur effect: backdrop-filter via CSS
```

---

## 2. Image Prompts for User 🖼️

*Optional background enhancements that can be AI-generated*

| Asset | Prompt | Size | Usage Scene |
|-------|--------|------|-------------|
| `before_background.png` | "Dark terminal screen with static noise, grayscale, glitch artifacts, cyberpunk aesthetic, low quality wireframe UI elements, 1080x1920" | 1080x1920 | HOOK (Before side bg) |
| `after_background.png` | "Sleek modern dashboard UI, dark mode, vibrant neon blue and purple accents, 4K quality, polished design, professional interface, 1080x1920" | 1080x1920 | HOOK (After side bg) |
| `particle_texture.png` | "Subtle digital noise texture, transparent background, sparkle particles, cyberpunk style, for overlay effects" | 1080x1920 | CTA (overlay) |

**Subtotal:** 3 optional AI-generated images (NOT required - code fallback available)

> **Note:** These are optional. The code can generate glitch effects and backgrounds using pure CSS/SVG without external images.

---

## 3. External Assets Needed 📦

*These require user input or external sources*

| Asset | Type | Description | Source |
|-------|------|-------------|--------|
| Audio | Voiceover | "Same AI, same model. Before skills vs after skills." | User records |
| Audio | Voiceover | "Want the full breakdown? I recorded the entire workflow. Link in bio 👇" | User records |
| Audio | BGM/Track | Cyberpunk background music, 60 seconds | User provides |
| Font: Inter | Typography | Main UI font (Google Fonts - handled in code) | Free |
| Font: Roboto Mono | Typography | Code/technical labels (Google Fonts - handled in code) | Free |

**Subtotal:** 2 voiceover lines + 1 BGM track from user

### Audio Requirements

| Line | Duration | Content | Timing |
|------|----------|---------|--------|
| Voiceover 1 | ~3 sec | "Same AI, same model. Before skills vs after skills." | 0:00-0:05 |
| Voiceover 2 | ~5 sec | "Want the full breakdown? I recorded the entire workflow. Link in bio 👇" | 0:50-0:60 |

---

## 4. User Choices Section ⚡

For each item below, tell me: **Use Code-Generated** or **I'll Provide Custom**?

| Asset | Default (Code) | Your Choice |
|-------|----------------|-------------|
| Before Background | Code-generated glitch effect | [ ] Code / [ ] My Image |
| After Background | Code-generated gradient | [ ] Code / [ ] My Image |
| Particle Texture | Code-generated SVG particles | [ ] Code / [ ] My Image |
| Voiceover Line 1 | User records | [ ] Record / [ ] AI Voice / [ ] Use Text-to-Speech |
| Voiceover Line 2 | User records | [ ] Record / [ ] AI Voice / [ ] Use Text-to-Speech |
| Background Music | User provides | [ ] My Track / [ ] Royalty-Free (I'll find) |

---

## 5. Implementation Order 📋

Once choices are confirmed:

### Phase 1: Code Components
1. Create `SplitScreenBeforeAfter.tsx` (vertical split + divider)
2. Create `GlitchText.tsx` (pulsing "SAME AI???" text)
3. Create `ScrollMontage.tsx` (scroll container)
4. Create `DesignSystemCard.tsx` (card variants)

### Phase 2: CTA Elements
5. Create `WorkflowDiagram.tsx` (horizontal flow)
6. Create `LinkInBioCTA.tsx` (CTA button)
7. Create `SparkleEffects.tsx` (particles)

### Phase 3: Polish Components
8. Create `ScrollIndicator.tsx` (scroll arrow)
9. Create `QualityBadge.tsx` (badges)

### Phase 4: Integration
10. Compose `ExtractShort1Result.tsx` main composition
11. Add audio hooks
12. Test frame-by-frame timing

---

## 6. Color Palette Reference 🎨

| Usage | Color | Hex | Component |
|-------|-------|-----|-----------|
| Background | Dark Gray | #111827 | All scenes |
| Primary Neon | Neon Blue | #3B82F6 | AFTER side, text |
| Secondary Neon | Neon Purple | #8B5CF6 | Glows, accents |
| Success | Green | #22C55E | AFTER labels |
| Error | Red | #EF4444 | BEFORE labels, glitch |
| Grid Lines | Dark | #1F2937 | UI guides |
| Text Primary | White | #FFFFFF | Headings |
| Text Secondary | Muted | #94A3B8 | Body text |

---

*Asset Manifest created for Remotion Builder workflow*
