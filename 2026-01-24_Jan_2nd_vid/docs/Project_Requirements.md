# YouTube Content Engine - Product Requirements Document

> **Project Name:** YouTube Content Engine (YCE)
> **Version:** 1.0
> **Last Updated:** 2026-01-24
> **Author:** J STAR FILMS STUDIOS

---

## Executive Summary

YouTube Content Engine is a dual-product offering that automates the complete YouTube video production pipeline from ideation to distribution. It transforms a manual 5-phase creative workflow (Strategy → Packaging → Scripting → Shorts → Production → Distribution) into an AI-powered system that generates all content assets in minutes instead of hours.

### The Two Products

| Product | Target User | Delivery | Monetization |
|---------|-------------|----------|--------------|
| **YCE SaaS** | Content creators, agencies, beginners | Web app | Subscription ($29/mo - $99/mo) |
| **YCE Skill Pack** | Developers, AI power users | Installable skills/workflows | One-time purchase ($49-$99) |

---

## Problem Statement

### The Pain
Creating a single YouTube video requires:
1. **2-4 hours** of topic research and validation
2. **1-2 hours** of title/thumbnail ideation
3. **3-5 hours** of scriptwriting
4. **1-2 hours** of planning shorts
5. **1 hour** of production planning
6. **1 hour** of distribution scheduling

**Total: 9-16 hours of planning before filming.**

Most creators skip steps, leading to:
- Poor topic choices (no validation)
- Weak titles/thumbnails (no strategy)
- Rambling scripts (no loop architecture)
- No shorts strategy (leaving views on table)
- Inconsistent posting (no distribution plan)

### The Solution
YouTube Content Engine reduces this to **30-60 minutes** of guided AI interaction that produces:
- Validated topic with 3-source proof
- 10 engineered titles + thumbnail concepts
- Full script with hook/loop architecture
- 6 shorts scripts (3 topic + 3 extract)
- Production checklist + edit rotation plan
- 2-week distribution calendar

---

## User Personas

### Persona 1: The Solo Creator (SaaS Target)
- **Name:** Alex
- **Age:** 25-35
- **Pain:** Has ideas but struggles with consistent quality
- **Goal:** Produce 1 video/week without burnout
- **Tech Level:** Low-medium (uses Canva, basic tools)
- **Willingness to pay:** $29-49/month

### Persona 2: The Agency/Team (SaaS Target)
- **Name:** Content Agency
- **Pain:** Managing multiple creator accounts
- **Goal:** Standardize content process across clients
- **Tech Level:** Medium
- **Willingness to pay:** $99-199/month

### Persona 3: The Power User (Skill Pack Target)
- **Name:** Dev Creator
- **Pain:** Wants control, dislikes subscriptions
- **Goal:** Own the system, use own API keys
- **Tech Level:** High (uses Cursor, AI agents)
- **Willingness to pay:** $49-99 one-time

---

## Product Architecture

### YCE SaaS Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    YCE Web App                          │
├─────────────────────────────────────────────────────────┤
│  [Next.js Frontend]                                     │
│  ├── Dashboard (projects list)                          │
│  ├── New Project Wizard (guided flow)                   │
│  ├── Phase Views (Strategy → Distribution)              │
│  └── Export/Download                                    │
├─────────────────────────────────────────────────────────┤
│  [API Layer]                                            │
│  ├── /api/projects (CRUD)                               │
│  ├── /api/generate/* (AI generation endpoints)          │
│  ├── /api/research/* (Google Trends, externals)        │
│  └── /api/export (markdown, PDF)                        │
├─────────────────────────────────────────────────────────┤
│  [AI Engine - OpenRouter + Vercel AI SDK]               │
│  ├── Universal provider.ts (model configuration)        │
│  ├── Default model: openai/gpt-oss-120b                 │
│  ├── Prompt templates (per phase)                       │
│  └── Output structured as JSON → UI                     │
├─────────────────────────────────────────────────────────┤
│  [Database - Neon/Supabase]                             │
│  ├── users                                              │
│  ├── projects                                           │
│  ├── phase_outputs                                      │
│  └── subscriptions                                      │
└─────────────────────────────────────────────────────────┘
```

### YCE Skill Pack Architecture

```
~/.gemini/antigravity/skills/youtube-content-engine/
├── SKILL.md (master instructions)
├── workflows/
│   ├── phase1-strategy.md
│   ├── phase2-packaging.md
│   ├── phase3-scripting.md
│   ├── phase35-shorts.md
│   ├── phase4-production.md
│   └── phase5-distribution.md
├── scripts/
│   ├── parse_yt_studio.ps1
│   ├── google_trends.js
│   └── export_project.js
├── templates/
│   ├── title_archetypes.md
│   ├── hook_templates.md
│   ├── loop_structure.md
│   └── shorts_sandwich.md
└── examples/
    └── sample_output/
```

---

## Functional Requirements

### Core Engine (Shared Between Both Products)

| Requirement ID | Description | User Story | Expected Behavior / Outcome | Status |
| :--- | :--- | :--- | :--- | :--- |
| FR-001 | Topic Input & Niche Definition | As a creator, I want to define my niche and topic ideas, so the system understands my content focus. | User provides niche, past video topics, and 3-5 seed ideas. System stores for context. | MUS |
| FR-002 | YouTube Studio Data Parser | As a creator, I want to upload my YouTube Studio "Inspiration" export, so the system can analyze demand signals. | User uploads HTML file. System parses, extracts topics with volume indicators (High/Medium/Low). | MUS |
| FR-003 | Competitor Analysis Input | As a creator, I want to input competitor video data (title, views, publish date), so the system can identify outliers. | User pastes VidIQ-style data. System calculates VPH, identifies hot topics. | MUS |
| FR-004 | Google Trends Integration | As a creator, I want the system to check Google Trends for my topic, so I can validate demand across sources. | System queries Google Trends API/CLI for related queries, rising keywords, breakout signals. | MUS |
| FR-005 | 3-Source Cross-Validation | As a creator, I want to see which topics appear in all 3 sources, so I can pick "Perfect Storm" topics. | System cross-references YT Studio + Competitors + Trends. Highlights topics with 2+ source matches. | MUS |
| FR-006 | Title Engineering (10 Variants) | As a creator, I want 10 title options using proven archetypes, so I don't have to brainstorm from scratch. | System generates 10 titles using: Open Loop, Counterintuitive, Secret, Extreme, etc. Shows reasoning for each. | MUS |
| FR-007 | Thumbnail Concept Generation | As a creator, I want thumbnail concepts for each title, so I know what visual to create. | System generates concept description: type, contents, composition, contrast, scroll stoppers, text overlay. | MUS |
| FR-008 | Thumbnail Image Prompt Export | As a creator, I want detailed Midjourney/DALL-E prompts, so I can generate the actual images. | System outputs ready-to-use prompts with style params, aspect ratio, etc. | MUS |
| FR-009 | Synergy Check (Title + Thumbnail) | As a creator, I want to verify my title and thumbnail work together, so I don't waste visual real estate. | System checks for redundancy, adds context, creates stronger combined gap. | MUS |
| FR-010 | Avatar Definition (4 Questions) | As a creator, I want to define my exact target viewer, so all content is focused. | System asks: Who, Objection, Stakes, Transformation. Stores for script context. | MUS |
| FR-011 | Hook Generation (4-Step) | As a creator, I want a hook script for 0:00-0:45, so I nail the first impression. | System generates: First Frame, Context/Stakes, Input Bias Flex, Payoff Promise. Multiple options each. | MUS |
| FR-012 | Breaking Beliefs Section | As a creator, I want to address misconceptions before teaching, so viewers trust my method. | System generates: Old Way, Breakdown, New Mechanism pattern. | MUS |
| FR-013 | Body Structure (Loop Architecture) | As a creator, I want my main points structured with open loops, so retention stays high. | For each point: Open Loop → Content (DISC layers) → Payoff → Bridge. Visual cues marked. | MUS |
| FR-014 | Visual Cue Markers | As a creator, I want the script to mark where visuals change, so my editor can follow. | Every 30-60 sec marked with: A-Roll, Punch-In, B-Roll, Graphic suggestion. | MUS |
| FR-015 | Outro Generation (Bridge Strategy) | As a creator, I want an outro that drives to my next video, so viewers stay in my ecosystem. | System generates: Problem Link, Solution Pitch, CTA script. No "thanks for watching." | MUS |
| FR-016 | Topic Shorts Generation (3) | As a creator, I want 3 fresh short scripts on the topic, so I have content for Week 1. | System generates: Hot Take, Quick Win, Story Hook. Full 60-sec scripts. | MUS |
| FR-017 | Extract Shorts Generation (3) | As a creator, I want 3 clip-based shorts with sandwich method, so I have content for Week 2. | System identifies Result, Pain, Value sections. Generates Hook + CTA for each. | MUS |
| FR-018 | Shorts Posting Schedule | As a creator, I want a 2-week posting calendar, so I know when to upload each piece. | System outputs: Day 1 Main + Topic 1, Wed Topic 2, Fri Topic 3, etc. | MUS |
| FR-019 | Pre-Filming Checklist | As a creator, I want a checklist before I film, so I don't forget setup steps. | System generates: Lighting, Audio, Camera, Background, Energy check, Recording order. | MUS |
| FR-020 | Edit Rotation Plan | As a creator, I want a second-by-second edit plan, so my editor can cut for retention. | For each section: timestamp, visual type (A-Roll/Punch-In/B-Roll/Graphic), pattern interrupt markers. | MUS |
| FR-021 | Sound Design Plan | As a creator, I want music and SFX guidance, so the audio matches the energy. | System outputs: Music per section (intro/body/payoff), SFX markers (whoosh, pop, impact). | MUS |
| FR-022 | QC Checklist | As a creator, I want quality checks before export, so I catch issues early. | System provides: Boredom Test, Mute Test, 10% Rule, Pattern Interrupt Check. | MUS |
| FR-023 | SEO Metadata Generation | As a creator, I want description and tags, so I don't forget SEO. | System generates: Full description with timestamps, 15+ relevant tags. | MUS |
| FR-024 | Distribution Calendar | As a creator, I want a cross-platform posting schedule, so I maximize reach. | System outputs: 2-week calendar for YouTube, TikTok, Instagram, LinkedIn. | MUS |
| FR-025 | LinkedIn Text Posts (3) | As a creator, I want LinkedIn posts to accompany my shorts, so I engage that audience. | System generates: Hook/Pain, Insight, Result/CTA posts. Ready to copy-paste. | MUS |
| FR-026 | Full Project Export | As a creator, I want to export everything to markdown/PDF, so I can access offline. | System exports all phases to a single folder with organized files. | MUS |

### SaaS-Specific Requirements

| Requirement ID | Description | User Story | Expected Behavior / Outcome | Status |
| :--- | :--- | :--- | :--- | :--- |
| FR-100 | User Authentication | As a user, I want to sign up/login securely, so my projects are private. | OAuth (Google/GitHub) + email/password. Session management. | MUS |
| FR-101 | Project Dashboard | As a user, I want to see all my video projects, so I can track progress. | List view with: Project name, Phase, Last updated, Status. | MUS |
| FR-102 | Guided New Project Wizard | As a user, I want a step-by-step flow, so I don't get overwhelmed. | Wizard with: Niche → Research → Packaging → Scripting → Shorts → Production → Distribution. | MUS |
| FR-103 | Phase Navigation | As a user, I want to jump between phases, so I can edit non-linearly. | Sidebar with all phases. Click to navigate. Shows completion status. | MUS |
| FR-104 | AI Generation Loading States | As a user, I want to see progress while AI generates, so I know it's working. | Skeleton loaders, streaming text, progress indicators. | MUS |
| FR-105 | Option Selection UI | As a user, I want to pick from generated options, so I have control over output. | For titles/hooks/CTAs: Radio button selection, "Regenerate" button. | MUS |
| FR-106 | Edit Generated Content | As a user, I want to edit AI output inline, so I can customize. | Rich text editor for scripts. Save button. | MUS |
| FR-107 | Subscription Management | As a user, I want to manage my subscription, so I can upgrade/downgrade. | Paystack integration. Plans: Free (1 project), Pro (10/mo), Agency (unlimited). | MUS |
| FR-108 | Usage Limits | As a user, I want to know my remaining projects this month, so I don't hit limits unexpectedly. | Dashboard shows: "3/10 projects used this month." | MUS |
| FR-109 | Export to Google Docs | As a user, I want to export directly to Google Docs, so I can share with my team. | Google Docs API integration. One-click export. | Future |
| FR-110 | Team Collaboration | As an agency, I want to invite team members, so multiple people can work on projects. | Team invites, role permissions (Admin, Editor, Viewer). | Future |
| FR-111 | Template Library | As a user, I want to save my niche/avatar as a template, so I don't re-enter for each video. | Save/load templates. Pre-populate wizard from template. | Future |
| FR-112 | AI Voice Selection | As a user, I want to choose my AI persona (brutal, friendly, concise), so the tone matches my style. | Settings: Voice dropdown. Affects all prompts. | Future |
| FR-113 | Thumbnail Image Generation | As a user, I want the app to generate actual thumbnail images, so I don't need external tools. | In-app DALL-E/Midjourney API integration. Generate and download. | Future |
| FR-114 | YouTube API Integration | As a user, I want to upload directly to YouTube, so I don't have to leave the app. | YouTube Data API. Schedule upload, add metadata. | Future |
| FR-115 | Analytics Dashboard | As a user, I want to track which topics/titles performed best, so I can learn what works. | Connect YouTube Analytics. Show: CTR, AVD, VPH per project. | Future |

### Skill Pack-Specific Requirements

| Requirement ID | Description | User Story | Expected Behavior / Outcome | Status |
| :--- | :--- | :--- | :--- | :--- |
| FR-200 | One-Click Installation | As a dev, I want to install via a single command, so setup is fast. | `npx youtube-content-engine install` or manual folder copy. | MUS |
| FR-201 | Global Skills Directory Support | As a dev, I want skills installed globally, so they work in any project. | Fork installs to `~/.gemini/antigravity/skills/`. | MUS |
| FR-202 | Workflow Slash Commands | As a dev, I want to invoke each phase via `/command`, so I can run them individually. | `/yce-strategy`, `/yce-packaging`, `/yce-scripting`, etc. | MUS |
| FR-203 | Full Pipeline Command | As a dev, I want a single command to run all phases, so I can go end-to-end. | `/yce-full` runs all phases sequentially with user input between. | MUS |
| FR-204 | Output to Project Folder | As a dev, I want all outputs saved to my project folder, so files are where I expect. | Creates `docs/youtube/` with all phase outputs. | MUS |
| FR-205 | YT Studio Parser Script | As a dev, I want a script to parse YouTube Studio HTML, so I don't do it manually. | PowerShell/Node script: `parse_yt_studio.ps1 input.html output.md`. | MUS |
| FR-206 | Google Trends CLI Integration | As a dev, I want Google Trends search built-in, so I don't need extra setup. | Uses existing `google-trends` skill or built-in Node CLI. | MUS |
| FR-207 | Template Customization | As a dev, I want to edit templates, so I can match my content style. | Templates are markdown files. User can edit titles, hooks, etc. | MUS |
| FR-208 | Multi-Model Support | As a dev, I want to use any AI model (Claude, GPT, Gemini), so I'm not locked in. | Skills work with any Antigravity-compatible model. | MUS |
| FR-209 | Offline Mode | As a dev, I want templates to work offline, so I can plan on flights. | Templates and structures work without API. AI generation requires connection. | Future |
| FR-210 | Project Memory | As a dev, I want the skill to remember my past projects, so it can reference them. | Stores past topics, avatars in local JSON. | Future |

---

## Non-Functional Requirements

| NFR ID | Requirement | Target | Priority |
| :--- | :--- | :--- | :--- |
| NFR-001 | Response Time (AI Generation) | < 30 seconds for any single generation | High |
| NFR-002 | Uptime (SaaS) | 99.5% availability | High |
| NFR-003 | Mobile Responsiveness | Works on tablet (iPad) | Medium |
| NFR-004 | Data Security | All user data encrypted at rest | High |
| NFR-005 | API Rate Limiting | 100 req/min per user | Medium |
| NFR-006 | Export Speed | Full project export < 5 seconds | Medium |

---

## Tech Stack

### SaaS Stack
- **Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS
- **Database:** Neon (PostgreSQL) or Supabase
- **ORM:** Prisma
- **Auth:** Better Auth
- **Payments:** Paystack
- **AI:** OpenRouter via Vercel AI SDK
  - Universal `provider.ts` for model configuration
  - Default model: `openai/gpt-oss-120b`
  - Easily swap models per feature
- **Hosting:** Vercel

### Skill Pack Stack
- **Format:** Markdown workflows + scripts
- **Scripts:** PowerShell (Windows), Bash (Mac), Node.js (cross-platform)
- **Compatibility:** Antigravity, Cursor, any MCP-compatible agent
- **Distribution:** npm package or GitHub release

---

## Phased Roadmap

### Phase 1: MUS (Minimum Usable State) - 4 weeks
- Core engine (all FR-001 to FR-026)
- Basic SaaS UI (FR-100 to FR-108)
- Skill Pack (FR-200 to FR-208)
- Launch as beta

### Phase 2: Polish - 2 weeks
- UI refinements based on feedback
- Add more template variants
- Performance optimization

### Phase 3: Growth Features - 4 weeks
- Google Docs export (FR-109)
- Team collaboration (FR-110)
- Template library (FR-111)
- Thumbnail generation (FR-113)

### Phase 4: Pro Features - 4 weeks
- YouTube API upload (FR-114)
- Analytics dashboard (FR-115)
- AI voice customization (FR-112)

---

## Success Metrics

| Metric | Target (Month 1) | Target (Month 6) |
|--------|------------------|------------------|
| SaaS Signups | 500 | 5,000 |
| Skill Pack Downloads | 200 | 2,000 |
| MRR (SaaS) | $1,500 | $15,000 |
| Projects Created | 1,000 | 20,000 |
| Time Saved per Project | 8+ hours | 10+ hours |

---

## Appendix: Reference Workflows

The following workflows were tested and validated during development:
- Phase 1: Strategy Engine (`/youtube-phase1-strategy`)
- Phase 2: Packaging Lab (`/youtube-phase2-packaging`)
- Phase 3: Scripting Forge (`/youtube-phase3-scripting`)
- Phase 3.5: Shorts Bridge (`/youtube-phase3.5-shorts`)
- Phase 4: Production (`/youtube-phase4-production`)
- Phase 5: Repurposing (`/youtube-phase5-repurposing`)

These exist in `~/.gemini/antigravity/skills/youtube-pipeline/` and serve as the source of truth for all generation logic.
