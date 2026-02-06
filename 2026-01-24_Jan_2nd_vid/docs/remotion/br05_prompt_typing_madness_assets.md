# 🎨 Asset Manifest: BR-05 Prompt Typing Madness

> **Composition ID**: `PromptTypingMadness`  
> **Duration**: 5 seconds (150 frames @ 30fps)

---

## 1. Code-Generatable Components ✅
*These can be built entirely with code - no external assets needed*

| Component | Description | Complexity |
|-----------|-------------|------------|
| `PromptTypingMadness.tsx` | Main composition orchestrator | Medium |
| `AIPromptInput.tsx` | Modern AI chat input box with cursor | Low |
| `TypewriterText.tsx` | Fast character-by-character text reveal | Low |
| `ScrollingContent.tsx` | Auto-scrolling container for overflow text | Low |
| `FrustrationEmoji.tsx` | Animated 😩 pop-in with spring | Low |
| `ExhaustingStamp.tsx` | "EXHAUSTING." slam text overlay | Low |
| `RedXOverlay.tsx` | SVG animated X draw | Low |
| `StressGlow.tsx` | Pulsing red border glow effect | Low |

**Subtotal**: 8 components to generate

---

## 2. AI-Generatable Images 🖼️
*These can be created using the generate_image tool*

| Asset | Prompt | Size | Usage |
|-------|--------|------|-------|
| *None Required* | All visuals are code-generated | — | — |

**Subtotal**: 0 images to generate

---

## 3. External Assets Needed 📦
*These require user input - stock footage, specific logos, audio files*

| Asset | Type | Description | Suggestion |
|-------|------|-------------|------------|
| *None Required* | — | All visuals are code-generated | — |

**Subtotal**: 0 assets needed from user

---

## 4. Fonts Required

| Font | Source | Usage |
|------|--------|-------|
| JetBrains Mono | `@remotion/google-fonts` | Prompt text (monospace code feel) |

**Install**: Already in project dependencies via `@remotion/google-fonts`

---

## 5. User Decision Required ⚡

This B-roll is **100% code-generated**. No external assets or AI-generated images needed.

The entire animation will be built with:
- React components styled with inline CSS
- Frame-based animations using `useCurrentFrame()` and `interpolate()`
- Spring physics for the stamp effect
- SVG path animations for the X overlay

**No decisions needed** — ready to proceed to implementation.

---

## Asset Generation Queue

### Batch 1: Code Components (All)

1. **`PromptTypingMadness.tsx`** - Main composition with all scenes
2. **`AIPromptInput.tsx`** - The chat-style input box container
3. **Inline animations** - Typewriter, scroll, blur, stamp, X overlay

> **Note**: Given the simplicity, all components can be consolidated into a single `PromptTypingMadness.tsx` file with internal helper components.

---

## Implementation Checklist

After approval, I will:

- [ ] Create `src/BRoll/PromptTypingMadness/index.tsx` (main composition)
- [ ] Create `src/BRoll/PromptTypingMadness/types.ts` (Zod schema + types)
- [ ] Register composition in `Root.tsx`
- [ ] Verify in Remotion Studio (`pnpm start`)
