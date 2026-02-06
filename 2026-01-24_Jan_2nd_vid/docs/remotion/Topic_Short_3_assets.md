# Asset Manifest: Topic Short 3 (Designer vs AI)

**Directory:** `public/remotion/Topic_Short_3`

---

## 🎵 Audio
| Asset | Source | Filename |
|-------|--------|----------|
| **Voiceover** | ElevenLabs (User Provided) | `Topic_Short_3_VO.mp3` |
| **BGM** | Stock / Library | `Tech_House_Light.mp3` |
| **SFX** | Library | `whoosh.mp3`, `click.mp3`, `coins_drop.mp3`, `writer.mp3` |

---

## 🖼 Images/Icons
*Note: Prefer SVG/Code generation over images where possible for crispness.*

| Asset | Type | Description |
|-------|------|-------------|
| `Invoice_Icon` | Lucide Icon | Use `lucide-react` (FileText, DollarSign) |
| `Brain_Icon` | Lucide Icon | `Brain` |
| `Pen_Icon` | Lucide Icon | `PenTool` |
| `Coins` | Lottie/SVG | Gold coin vector or Lottie JSON |
| `Thumbnail` | Image | `public/assets/youtube_thumbnail_placeholder.png` |

---

## 🔤 Fonts
*Using `next/font/google`*

| Font | Weight | Usage |
|------|--------|-------|
| **Inter** | 400, 600, 800 | Main UI Text, Body |
| **JetBrains Mono** | 400, 700 | Code snippets, Tech overlays |
| **Outfit** | 700, 900 | Big Headers, CTA |

---

## 🎨 CSS/Tailwind Classes (Light Mode)

```css
/* Clean White Glass */
.glass-panel {
  @apply bg-white/80 backdrop-blur-md border border-gray-100 shadow-xl rounded-xl;
}

/* Neon Text (Light Mode) */
.text-neon-blue {
    @apply text-blue-600 drop-shadow-[0_0_10px_rgba(59,130,246,0.5)];
}

/* Error Red */
.text-error {
    @apply text-red-600 drop-shadow-[0_0_8px_rgba(239,68,68,0.4)];
}
```
