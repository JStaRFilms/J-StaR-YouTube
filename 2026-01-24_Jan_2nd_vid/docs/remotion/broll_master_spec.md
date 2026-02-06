# 🎬 B-Roll Master Specification

> **Video Title**: "Why Your AI Designs Look Like Garbage (And How to Fix It)"
> **Total Duration**: ~16 minutes
> **This Document**: Comprehensive B-Roll animations for each script section

---

## 📋 B-Roll Index

| ID | Name | Section | Duration | Status |
|----|------|---------|----------|--------|
| BR-01 | Before/After Split Screen | HOOK (0:00-0:05) | 5s | ⬜ |
| BR-02 | Ugly vs Beautiful Flash | HOOK (0:05-0:15) | 3s | ⬜ |
| BR-03 | Project Montage Grid | HOOK (0:15-0:30) | 5s | ⬜ |
| BR-04 | Transformation Teaser | HOOK (0:30-0:45) | 5s | ⬜ |
| BR-05 | Prompt Typing Madness | BREAKING BELIEFS (0:45-1:00) | 5s | ⬜ |
| BR-06 | Instructions vs Knowledge Diagram | BREAKING BELIEFS (1:00-1:30) | 8s | ⬜ |
| BR-07 | Vanilla AI Cringe Output | POINT 1 (1:30-2:30) | 6s | ⬜ |
| BR-08 | Garbage to Gold Alchemy | POINT 1 (2:30-3:30) | 5s | ⬜ |
| BR-09 | Skills & Workflows Explainer | POINT 2 (3:30-4:30) | 8s | ⬜ |
| BR-10 | Folder Structure 3D | POINT 2 (4:30-5:30) | 6s | ⬜ |
| BR-11 | Installation Copy-Paste | POINT 3 (5:30-6:30) | 6s | ⬜ |
| BR-12 | Design Brain Activation | POINT 3 (6:30-7:30) | 5s | ⬜ |
| BR-13 | Interview Process Flow | POINT 4 (7:30-9:00) | 8s | ⬜ |
| BR-14 | Design System Generator | POINT 4 (9:00-11:00) | 10s | ⬜ |
| BR-15 | Before/After Reveal | POINT 4 (11:00-12:00) | 5s | ⬜ |
| BR-16 | 3-Way Comparison Grid | POINT 5 (12:00-14:00) | 10s | ⬜ |
| BR-17 | Design Principles Overlay | POINT 5 (14:00-15:00) | 5s | ⬜ |
| BR-18 | Weak Model Flex | POINT 6 (15:00-16:00) | 6s | ⬜ |
| BR-19 | Teaser to Next Video | OUTRO (16:00-17:00) | 5s | ⬜ |

---

## 🎨 Global Design System

### Color Palette
| Color | Hex | Usage |
|-------|-----|-------|
| Background Dark | #0a0a0f | Primary background |
| Background Card | #141420 | Card/Panel backgrounds |
| Coral Red (Bad) | #ff6b6b | "Garbage" states, errors |
| Emerald (Good) | #22c55e | "Gold" states, success |
| Electric Blue | #3b82f6 | Primary accent, UI elements |
| Cyan Glow | #06b6d4 | Highlights, glows |
| Purple Accent | #a855f7 | Secondary accent |
| White Text | #f8fafc | Primary text |
| Muted Gray | #64748b | Secondary text |

### Typography
| Font | Weight | Size | Usage |
|------|--------|------|-------|
| Inter | 900 | 64-96px | Big impact headings |
| Inter | 600 | 32-48px | Section headers |
| JetBrains Mono | 400 | 18-24px | Code, terminal text |
| JetBrains Mono | 700 | 24-32px | Emphasized code |

### Animation Principles
- **Smooth Motion**: Use `spring({ damping: 200 })` for reveals
- **Snappy UI**: Use `spring({ damping: 20, stiffness: 200 })` for UI
- **Bouncy Fun**: Use `spring({ damping: 8 })` for playful elements
- **Always Clamp**: Use `extrapolateRight: 'clamp'` on all interpolations

---
