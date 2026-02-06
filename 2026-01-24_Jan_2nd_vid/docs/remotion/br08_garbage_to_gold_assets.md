# 🎨 Asset Manifest: BR08 Garbage to Gold

## 1. Code-Generatable Components ✅
*These can be built entirely with React/SVG code*

| Component | Description | Complexity |
|-----------|-------------|------------|
| `TransmutationCircle.tsx` | Rotating SVG circle with nested rings and "rune" text placement. | Medium |
| `CodeRunes.tsx` | Array of text elements positioned around the circle. | Low |
| `MagicParticles.tsx` | Particle system for the "energy gathering" and "sparkles". | Low |
| `FlashEffect.tsx` | Simple white overlay for the burst transition. | Low |
| `TrashItems.tsx` | scattered text blocks / bad UI skeletons (using Lucide icons). | Low |

---

## 2. Image Prompts for User 🖼️
*I CANNOT generate these myself. I am providing prompts for YOU to generate.*

> **Instructions for User:**
> Use these prompts with your preferred image generation tool (Midjourney, DALL-E, generate_image tool, etc.)
> After generating, save the images to `public/assets/br08_garbage_to_gold/`

| Asset | Prompt | Size | Save As |
|-------|--------|------|---------|
| Garbage Can | "Stylized 3D render of an overflowing metal trash can, dark cinematic lighting, isometric view, high fidelity, dark background" | 512x512 | `garbage_can.png` |
| Gold Bar | "Gleaming polished gold ingot, floating in dark void, cinematic lighting, sharp edges, 8k resolution, minimalist" | 512x512 | `gold_bar.png` |

**Total prompts**: 2 images for you to generate

---

## 3. External Assets Needed 📦
*These require you to provide - stock footage, your logos, audio files*

| Asset | Type | Description | Action |
|-------|------|-------------|--------|
| Transformation Sound | Audio | Magical chime / powerful sci-fi energy surge | Source from [Epidemic Sound](https://epidemicsound.com) |

---

## 4. Your Choices ⚡

Tell me for each:

| Item | Options |
|------|---------|
| Garbage Can | [ ] Generate with prompt above / [ ] I'll build a simple SVG icon version / [ ] I'll provide my own |
| Gold Bar | [ ] Generate with prompt above / [ ] I'll build a CSS Gradient version / [ ] I'll provide my own |

---

## After You Decide

**If you want me to proceed with code components:**
Reply: "Build the components (SVG/CSS for can and gold)"

**If you want to generate images first:**
Run the prompts yourself, then reply: "Assets ready in public/assets/br08_garbage_to_gold/"

**If you're providing your own assets:**
Reply: "I'm providing: [list files] - they're in public/assets/br08_garbage_to_gold/"
