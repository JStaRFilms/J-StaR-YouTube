# 🎨 Asset Manifest: BR10 Folder Structure 3D

## 1. Code-Generatable Components ✅
*These can be built entirely with React/SVG/Lucide code. Recommended for maximum quality and animation control.*

| Component | Description | Complexity |
|-----------|-------------|------------|
| `FolderNode.tsx` | Smart component handling Folder, Markdown, Script icons with open/close states and distinct colors (Gold, Green, Blue). Uses `lucide-react` for crisp vectors. | Medium |
| `TreeConnector.tsx` | SVG path generator that draws connecting lines between parent and child nodes with stroke animation. | High |
| `HolographicBackground.tsx` | "Dark void" background with subtle animated grid/particles to give depth without using video assets. | Medium |
| `CodePreview.tsx` | A glassmorphism card showing the "SKILL.md" content with syntax highlighting mockups. | Medium |
| `SimplicityReveal.tsx` | Final scene overlay with 'Spring' text and animated checkmark. | Low |

---

## 2. Image Prompts for User 🖼️
*None required. We can achieve the "Pro Max" look entirely with code, which allows for better scaling, crispness, and animation.*

---

## 3. External Assets Needed 📦

| Asset | Type | Description | Action |
|-------|------|-------------|--------|
| Fonts | Font | JetBrains Mono (for code) & Inter (for UI) | Load via `@remotion/google-fonts` |
| Icons | Library | `lucide-react` | Standard install (likely already present) |

---

## 4. Your Choices ⚡

Since we want "Sexy as shit" UI/UX:

| Item | Options | Recommendation |
|------|---------|----------------|
| **Icons** | [ ] PNG Images / [ ] Lucide React Vectors | **Lucide Vectors** (Crisp, colorable, animateable) |
| **Methods** | [ ] Real 3D (Three.js) / [ ] 2.5D (CSS Transforms) | **2.5D** (Cleaner for UI, smoother text rendering, matches spec "Visual Depth" logic) |

---

## After You Decide

**To proceed with the recommended pure-code approach (no external assets needed):**
Reply: "Proceed with code components"
