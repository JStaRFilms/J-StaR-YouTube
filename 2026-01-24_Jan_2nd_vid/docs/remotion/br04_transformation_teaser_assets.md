# 🎨 Asset Manifest: BR04 Transformation Teaser

> **Companion to**: [br04_transformation_teaser.md](./br04_transformation_teaser.md)

---

## 1. New Mockup Components ✅
*Fresh designs specifically for this transformation*

| Component | Description | Status |
|-----------|-------------|--------|
| `UglyMockup.tsx` | Chaotic dashboard: Comic Sans, clashing colors, misaligned elements, errors | ✅ Done |
| `BeautifulMockup.tsx` | Premium dashboard: Glass morphism, clean typography, subtle gradients | ✅ Done |

**Subtotal**: 2 new components created

---

## 2. Code-Generatable Components ✅
*These will be built entirely with code*

| Component | Description | Status |
|-----------|-------------|--------|
| `ParticleSystem.tsx` | Core particle engine: generates 1600 particles (40×40), bezier paths, color transitions | ✅ Done |
| `SceneLabels.tsx` | "The Problem" / "The Solution" / "Same AI. Free Skill." text overlays | ✅ Done |
| `TransformationTeaser.tsx` | Main composition orchestrating all sequences | ✅ Done |

**Subtotal**: 5 components created

---

## 3. AI-Generatable Images 🖼️
*Optional background textures or overlays*

| Asset | Prompt | Size | Status |
|-------|--------|------|--------|
| None required | All visuals are code-generated | N/A | ✅ Skipped |

**Subtotal**: 0 images needed

---

## 4. External Assets Needed 📦
*Assets that require user input*

| Asset | Type | Status |
|-------|------|--------|
| None | — | ✅ All code-generated |

**Subtotal**: 0 external assets needed

---

## 5. User Decision Required ⚡

This B-Roll is **100% code-generatable**. No external assets required.

| Decision Point | Default | Your Choice |
|----------------|---------|-------------|
| Ugly Mockup | Reuse `SimpleUglyMockup` | [ ] Keep / [ ] Custom |
| Beautiful Mockup | Reuse `SimpleBeautifulMockup` | [ ] Keep / [ ] Custom |
| Particle Count | 2500 (50×50 grid) | [ ] Keep / [ ] Adjust |
| Background Color | `#0a0a0f` | [ ] Keep / [ ] Custom |

---

## Build Queue (After Approval)

### Phase 1: Create Core Engine
1. ✅ Create `ParticleSystem.tsx` - Bezier path generation, staggered animation, color interpolation
2. ✅ Create `MagicCursor.tsx` - Animated cursor leading transformation

### Phase 2: Create Composition
3. ✅ Create `SceneLabels.tsx` - Animated text overlays
4. ✅ Create `TransformationTeaser.tsx` - Main composition with 4 scenes
5. ✅ Register in `Root.tsx`

### Phase 3: Verify
6. Run in Remotion Studio
7. Check particle performance (target: 60fps @ 2500 particles)
8. Verify color transition smoothness

---

## Technical Notes

### Performance Strategy
```tsx
// Pre-calculate all particle paths at mount (not per-frame)
const particlePaths = useMemo(() => 
  generateParticlePaths(2500, startBounds, endBounds), 
  []
);

// Each particle just reads its pre-calculated path
const progress = spring({ frame: frame - particle.startFrame, fps, config: { damping: 200 } });
```

### Color Transition
```tsx
// Per-particle color based on progress
const color = interpolateColors(
  progress,
  [0, 0.5, 1],
  ['#ff6b6b', '#fbbf24', '#22c55e'] // Red → Yellow → Green
);
```
