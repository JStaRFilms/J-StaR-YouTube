# 🎨 Asset Manifest: Topic_Short_3_Story_Hook_500_Designer_Vs_Ai

## 1. Code-Generatable Components ✅
*These will be built entirely with React/SVG code*

### Scene 1: The Invoice Hook (0:00-0:05)
| Component | Description | Complexity |
|-----------|-------------|------------|
| `InvoiceCard.tsx` | Professional invoice UI with "INVOICE #001" header, line items, and massive "$500.00" display with "≈ N750,000" below. Includes DUE stamp area. | Medium |
| `RedXMark.tsx` | Animated SVG X mark that draws itself over the invoice using stroke-dashoffset. Error red (#EF4444) color. | Low |
| `BrainWithPenTool.tsx` | Purple/violet gradient brain icon with Pen Tool symbol inside. Scales and rotates into view. | Medium |

### Scene 2: Time Passage + System Build (0:05-0:09)
| Component | Description | Complexity |
|-----------|-------------|------------|
| `AnimatedClock.tsx` | Circular clock with spinning hands (6 full rotations over 90 frames). White face, dark slate hands, motion blur effect. | Medium |
| `ProgressBar.tsx` | Rounded rectangle container with gradient fill (Blue → Purple). "Generating..." text with blinking dots above. | Medium |
| `SystemOnlineText.tsx` | Green monospace "SYSTEM ONLINE" text with typewriter effect and glow. Green checkmark that draws itself. | Low |

### Scene 3: The Montage (0:09-0:14)
| Component | Description | Complexity |
|-----------|-------------|------------|
| `ColorSwatchesGrid.tsx` | 3x3 grid of rounded color swatches showing tech industry palette (Blues, Purples, Neutrals). Staggered pop-in animation with hex codes below. | Medium |
| `FontPairingDemo.tsx` | White card showing "Inter + Playfair Display" typography pairing. Heading in Inter Bold, sample text in Playfair Display. Labels slide in from sides. | Medium |
| `SpacingGuides.tsx` | UI card with red lines showing 8px, 16px, 32px spacing indicators. Lines draw from left to right, labels pop in. | Medium |

### Scene 4: The Transformation (0:14-0:17)
| Component | Description | Complexity |
|-----------|-------------|------------|
| `GarbageWireframe.tsx` | Low-fidelity wireframe mockup with gray boxes, misaligned elements, "Lorem ipsum" placeholder text. "BEFORE" label in red. | Medium |
| `ProMockup.tsx` | High-fidelity polished UI mockup (crypto wallet style). Beautiful gradients, proper spacing. "AFTER" label in green. | High |
| `SliderWipe.tsx` | Interactive before/after slider with circular handle and arrows. Divider line moves left→right revealing transformation. | High |

### Scene 5: Savings + CTA (0:17-End)
| Component | Description | Complexity |
|-----------|-------------|------------|
| `FallingCoins.tsx` | Gold/amber coins (emoji or SVG) falling from top with rotation. Loop 3-4 coins with staggered timing. | Medium |
| `SavingsGraph.tsx` | Upward trending area chart with green gradient line and light green fill below. "Savings" label. Line draws from left to right. | Medium |
| `CTACard.tsx` | Video thumbnail placeholder card with "WATCH NOW" button. Slides up from bottom with pulsing button animation. | Low |
| `AnimatedArrow.tsx` | Bouncing arrow pointing down toward CTA card. Loop animation. | Low |

---

## 2. Image Prompts for User 🖼️
*None needed. All visual elements can be code-generated with React/SVG.*

The following will be created programmatically:
- All UI mockups (wireframe and high-fidelity)
- All icons (brain, pen tool, checkmark, coins)
- All charts and graphs
- All text elements and typography

---

## 3. External Assets Needed 📦
| Asset | Type | Description | Location | Action |
|-------|------|-------------|----------|--------|
| Voiceover Audio | Audio | "Design shorts.m4a" - Narration for the video | `public/footage/Audio/Design shorts.m4a` | ✅ Confirmed exists |
| Font: Inter | Font | Primary typography for UI elements | Google Fonts | Load via CSS |
| Font: JetBrains Mono | Font | Monospace for "SYSTEM ONLINE" and spacing labels | Google Fonts | Load via CSS |
| Font: Playfair Display | Font | Serif font for typography pairing demo | Google Fonts | Load via CSS |

---

## 4. Your Choices ⚡

### ✅ Confirmed Decisions

| Decision | Status | Notes |
|----------|--------|-------|
| All components code-generated | ✅ CONFIRMED | No external images needed - everything built with React/SVG |
| Audio file location | ✅ CONFIRMED | `public/footage/Audio/Design shorts.m4a` |
| Light mode aesthetic | ✅ CONFIRMED | #F8FAFC background, #FFFFFF surfaces, dark text |
| Nigerian market emphasis | ✅ CONFIRMED | N750,000 prominently displayed alongside $500 |

### 🎨 Design Notes
- **Hook Moment**: The $500/N750,000 animation will use spring with higher mass (1.5) for grand, weighty feel
- **Color Palette**: Light mode with Blue (#3B82F6), Purple (#8B5CF6), Green (#22C55E), Amber (#F59E0B), Red (#EF4444) accents
- **All animations** via `useCurrentFrame()` + `interpolate`/`spring` per Remotion rules
- **Safe zone**: Critical content kept above bottom 20% (384px from bottom)

---

## 5. Component Dependencies

### Shared/Utility Components
None required - all components are self-contained for this video.

### Reusable from Other Videos
| Component | Source | Usage |
|-----------|--------|-------|
| `ProMockup.tsx` | Can reference existing crypto wallet mockups in project | High-fidelity "AFTER" state |

---

## 6. Build Complexity Summary

| Scene | Component Count | Total Complexity |
|-------|-----------------|------------------|
| Scene 1 | 3 | Medium |
| Scene 2 | 3 | Medium |
| Scene 3 | 3 | Medium |
| Scene 4 | 3 | High |
| Scene 5 | 4 | Medium |
| **Total** | **16** | **Medium-High** |

**Estimated Build Time**: 4-6 hours for all components and scene assembly.
