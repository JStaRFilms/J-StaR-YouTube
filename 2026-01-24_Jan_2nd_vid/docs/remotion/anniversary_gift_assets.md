# 🎨 Asset Manifest: Anniversary Gift

## 1. Code-Generatable Components ✅
*All assets will be built programmatically using React and SVGs as per user request.*

| Component | Description | Complexity |
|-----------|-------------|------------|
| `Avatar.tsx` | Simple SVG circle avatars for John & Enny with initials/faces. | Low |
| `ConnectionLine.tsx` | Animated dashed line connecting the two avatars. | Low |
| `ChatBubble.tsx` | Pop-up bubbles for "Hello". | Low |
| `CalendarFlip.tsx` | Animated calendar page turning effect. | Medium |
| `HeartMeter.tsx` | Vertical or horizontal container filling up with hearts. | Medium |
| `Ring.tsx` | SVG Illustration of a diamond ring with sparkle animations. | Medium |
| `WeddingGown.tsx` | SVG Illustration of a simple wedding dress. | Medium |
| `NameMorph.tsx` | Text component handling the "John + Enny -> Jola" transition. | Low |

---

## 2. External Assets
*None required. Transformation to code-only approved.*

## 3. Executive Decision
User stated: "create everyting using svgs or what ot I don't have any images"
**Action Plan**:
1. Build `src/components/AnniversaryGift` directory.
2. Implement all visual elements as functional React components.
3. Use `lucide-react` for standard icons if applicable, or custom `<svg>` paths for specific items (Ring/Gown).
