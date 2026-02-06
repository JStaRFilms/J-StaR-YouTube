# 🎨 Asset Manifest: BR-03 Project Montage Grid

## 1. Code-Generatable Components ✅
*These can be built entirely with code - no external assets needed*

| Component | Description | Complexity |
|-----------|-------------|------------|
| `ProjectMontageGrid.tsx` | Main composition handling the grid layout and scene orchestration | High |
| `ProjectCard.tsx` | Individual card component with shadow, border, and image rendering | Low |
| `GridBackground.tsx` | Dark canvas #0a0a0f with potential subtle grid lines (optional) | Low |
| `GlowWave.tsx` | Overlay component for the "Grid Pulse" scene | Medium |
| `CounterOverlay.tsx` | "20+ Real Projects" text with count-up animation | Low |

**Subtotal**: 5 components to generate

---

## 2. AI-Generatable Images 🖼️
*These can be created using the generate_image tool*

| Asset | Prompt | Size | Usage |
|-------|--------|------|-------|
| (Optional) `placeholder_project_[1-20].png` | "Modern SaaS dashboard screenshot, dark mode, analytics graph, vibrant colors, minimal UI" | 1920x1080 | Placeholders if real screenshots aren't available |

**Subtotal**: 0 required (optional placeholders available)

---

## 3. External Assets Needed 📦
*These require user input*

| Asset | Type | Description | Suggestion |
|-------|------|-------------|------------|
| Project Screenshots (20+) | Images | Real screenshots of your projects | User provides |
| `Inter-Bold.ttf` | Font | Google Font (handled via @remotion/google-fonts) | Code handles this |

**Subtotal**: 20+ images needed from user

---

## 4. User Decision Required ⚡

For each item below, tell me: **AI-Generate Placeholders** or **I'll Provide My Own**?

| Asset | Default | Your Choice |
|-------|---------|-------------|
| 20+ Project Screenshots | User provides | [ ] AI Placeholders / [ ] My Own Real Screenshots |

---

## Asset Generation Queue

Once you confirm choices, I will:

### Batch 1: Code Components
1. Create `ProjectCard.tsx`
2. Create `GridBackground.tsx`
3. Create `CounterOverlay.tsx`
4. Create `ProjectMontageGrid.tsx` (Main composition)

### Batch 2: AI Images (if selected)
1. Generate batch of 20 placeholder dashboard screenshots (if you choose AI)

### Batch 3: Await User Assets
- [ ] Waiting for: `public/projects/*.png` (if you choose "My Own")
