# 📌 PHASE 1 OUTPUT - LOCKED (v2)

> **Date**: 2026-01-24
> **Topic**: Custom AI Design Skill (UI/UX Pro Max + init_vibecode_design)

---

## Video Content Outline (REVISED)

### Section 1: Hook (0:00-0:30)
- "AI agents are great at coding... but they suck at design"
- Quick before/after demo snippet

### Section 2: The Problem (0:30-2:00)
- AI default designs are ugly/generic
- You have to manually provide design specs every time

### Section 3: Solution Overview (2:00-4:00)
- Introduce: **Skills** = files that teach AI new abilities
- Two components:
  - **UI/UX Pro Max**: Design knowledge database (found online)
  - **init_vibecode_design**: Your workflow that orchestrates it

### Section 4: Installation & Setup (4:00-6:00) ← REVISED
- Show the skills folder structure (`~/.gemini/antigravity/skills/`)
- Brief: "Skills are just markdown files + scripts the AI can read"
- Show how to install: copy to skills folder, done
- "The AI handles the rest - you never touch the code"
- **Skills vs MCP**: "Unlike MCP servers that occupy context from the start, skills only load when the AI decides to use them - keeps your context clean"

### Section 5: Live Demo - The Workflow in Action (6:00-12:00)
- Run `/init_vibecode_design` or invoke naturally
- Show the interview process (vibe, colors, fonts)
- Show design system generation
- Show mockup output

### Section 6: The Comparison (12:00-15:00) ← REVISED
**3-way comparison to prove value:**
1. Vanilla AI (no skill, no workflow) - ugly output
2. Workflow alone - better but generic colors/fonts
3. Workflow + UI/UX Pro Max - professional output

### Section 7: CTA + Outro (15:00-16:00)
- "Want to build your own skills?"
- Subscribe + comment

---

## Comparison Prompts (For Section 6)

Use the SAME prompt for all 3 tests:

```
Build a landing page for a premium crypto wallet app called "VaultX".
- Dark mode, modern aesthetic
- Hero section with CTA
- Features grid
- Testimonials section
- Footer with links
```

### Bonus: Weak Model Flex 💪
Run the Workflow + Skill test with a weaker model (e.g., GPT-3.5, Gemini Flash, smaller Claude)
- Shows the skill compensates for model limitations
- "Even [weak model] produced this with no stress"

### Test 1: Vanilla AI
Just paste the prompt into a fresh Antigravity/AI session with NO skills loaded.

### Test 2: Workflow Only
Run `/init_vibecode_design` but WITHOUT the UI/UX Pro Max skill installed.

### Test 3: Workflow + UI/UX Skill
Run `/init_vibecode_design` WITH the UI/UX Pro Max skill active.

---

## Expected Differences

| Aspect | Vanilla | Workflow Only | Workflow + Skill |
|--------|---------|---------------|------------------|
| Colors | Random/default | Interview-based | Data-driven palette |
| Typography | System fonts | Generic pairing | Researched pairing |
| Layout | Generic | Structured sitemap | Optimized patterns |
| Components | Basic | Design system | Professional components |
| UX | None | Basic | Anti-patterns avoided |
