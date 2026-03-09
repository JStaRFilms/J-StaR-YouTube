# VibeForge — Demo Build Plan

## What Is VibeForge?
A premium dark-mode SaaS landing page for the **VibeCoding Protocol Suite** — built live on camera using 12+ skills in a single session. It's meta: we're building the marketing site for the skills system USING the skills system.

---

## Tech Stack
- **Next.js 14** (App Router, RSC, TypeScript strict)
- **Tailwind CSS** (dark mode + custom glassmorphism)
- **Framer Motion** (scroll animations, page transitions, micro-interactions)
- **SVG Animations** (morphing shapes, generative patterns)
- **Remotion** (programmatic video component embedded on page)

---

## Page Sections (7 Sections)

### 1. Hero Section
- **Visual:** Dark gradient background with animated SVG liquid blobs morphing behind text
- **Content:** Main headline, sub-copy, CTA button ("Install with one command"), terminal mockup showing `npx vibesuite init`
- **Animation:** Floating glassmorphism cards with skill icons, parallax on scroll
- **Skills Used:** `stitch` (initial design), `frontend-design` (premium polish), `ui-ux-pro-max` (color palette + typography)

### 2. Stats/Social Proof Bar
- **Visual:** Horizontal strip with animated counters
- **Content:** "64 Skills" / "26 Workflows" / "1 Command Install" / "100% Free"
- **Animation:** Count-up animation on scroll-into-view
- **Skills Used:** `copywriting` (writes the copy)

### 3. Skills Showcase Grid
- **Visual:** Animated card grid, 6 categories, each card has a hover glow effect
- **Categories:**
  1. 🏗️ Project Lifecycle (genesis → build → finalize)
  2. 🎨 Design Engine (stitch, frontend-design, ui-ux-pro-max)
  3. 🛡️ Quality Gate (code-review, security-audit, component-analysis)
  4. 📈 SEO & Marketing (seo-ready, copywriting, programmatic-seo)
  5. 🔬 Research Layer (context7, google-trends, audit-website)
  6. 🎬 Media & Content (remotion, youtube-pipeline, social-content)
- **Animation:** Cards stagger-in on scroll, hover reveals skill description + icon
- **Skills Used:** `algorithmic-art` (generative SVG patterns on cards)

### 4. Live Demo Section
- **Visual:** Split view — code editor on left, live preview on right
- **Content:** "Watch the VibeCoding Protocol in action"
- **Animation:** Typewriter effect showing code being written, preview updating
- **Skills Used:** `nextjs-standards` (shown in code), `spawn-task` (referenced)

### 5. Remotion Video Section
- **Visual:** Embedded Remotion-generated animated explainer
- **Content:** 15-second looping animation showing the workflow: Text prompt → Skills activate → Code generated → App deployed
- **Animation:** Programmatic — built with Remotion, rendered as video/gif
- **Skills Used:** `remotion` (builds the video component)

### 6. Installation Section
- **Visual:** Dark terminal mockup with syntax-highlighted commands
- **Content:** The 4 install options (Quick start, Core essentials, Convex suite, Full suite)
- **Animation:** Tab switcher between install options, copy-to-clipboard
- **Skills Used:** `seo-ready` (meta tags, structured data)

### 7. Footer/CTA
- **Visual:** Gradient fade, GitHub link, social links
- **Content:** "Stop downloading random skills. Build a system." + GitHub button
- **Animation:** Subtle parallax, hover effects
- **Skills Used:** `copywriting` (CTA copy)

---

## Skills Activation Map (What Fires & When)

| Build Phase | Skill | What It Does | Screen Time |
|-------------|-------|-------------|-------------|
| Scaffold | `/vibe-genesis` | Generates PRD, issues, folder structure | 2 min |
| Scaffold | `nextjs-standards` | Enforces App Router, TSC strict | auto |
| Scaffold | `spawn-task` | Breaks features into sub-tasks | 30 sec |
| Design | `stitch` | Generates UI from Stitch designs | 3 min |
| Design | `frontend-design` | Premium polish, micro-animations | 1 min |
| Design | `ui-ux-pro-max` | Color palette + font selection | 30 sec |
| Design | `algorithmic-art` | Generative SVG hero background | 2 min |
| Video | `remotion` | Builds embedded animated component | 3 min |
| Quality | `code-review` | J-Star review finds/fixes issues | 2 min |
| Quality | `security-audit` | Catches XSS, auth gaps | 2 min |
| Marketing | `seo-ready` | Meta tags, OG, structured data | 1 min |
| Marketing | `copywriting` | Rewrites all headlines/CTAs | 1 min |
| Meta | `prompt-engineering` | Refines a messy prompt live | 1 min |
| Meta | `skill-creator` | Creates a new skill on the fly | 1 min |
| Bonus | `context7` | Pulls live Framer Motion docs | 30 sec |
| Reveal | `youtube-pipeline` | "This video was planned by a skill" | 30 sec |

**Total skills demoed on screen: 16**
**Total skills mentioned: 50+**

---

## Color Palette (Dark Mode)
- **Background:** `#0a0a0f` (near-black)
- **Surface:** `#12121a` (dark card)
- **Glass:** `rgba(255, 255, 255, 0.05)` with backdrop-blur
- **Primary accent:** Electric purple `#8b5cf6`
- **Secondary accent:** Cyan `#06b6d4`
- **Text:** White `#fafafa` with `#a1a1aa` for secondary

## Typography
- **Headings:** Inter (900 weight) or Outfit (700)
- **Body:** Inter (400)
- **Code/Terminal:** JetBrains Mono

---

## Estimated Build Time
- Project scaffold: 5 min
- Hero + Stats: 15 min
- Skills Grid: 10 min
- Live Demo section: 10 min
- Remotion component: 15 min
- Install section + Footer: 10 min
- Quality + SEO pass: 10 min
- **Total: ~75 min of screen recording**
