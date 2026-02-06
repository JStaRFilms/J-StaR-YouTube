# YouTube Content Engine - GitHub Issues

> **Total Issues:** 53 (40 MUS + 13 Future)
> **Format:** Professional Issue Template per /init_vibecode_genesis

---

# 🏗️ INFRASTRUCTURE & SETUP

---

## Title
[Setup] Initialize Next.js 14 project with core dependencies

## Labels
`MUS`, `enhancement`, `infrastructure`

## User Story
As a developer, I want the project scaffolded with all dependencies, so I can start building features immediately.

## Proposed Solution
1. Run `npx create-next-app@latest youtube-content-engine --typescript --tailwind --app`
2. Install core dependencies:
   - `prisma @prisma/client` (ORM)
   - `better-auth` (Authentication)
   - `stripe` (Payments)
   - `@anthropic-ai/sdk` (AI)
   - `zod` (Validation)
3. Initialize shadcn/ui: `npx shadcn-ui@latest init`
4. Configure TypeScript strict mode
5. Setup folder structure per Coding Guidelines

## Acceptance Criteria
- [ ] Next.js 14 app runs on localhost:3000
- [ ] All dependencies installed and lock file committed
- [ ] Folder structure matches `src/app`, `src/components`, `src/lib` pattern
- [ ] TypeScript strict mode enabled in tsconfig.json
- [ ] shadcn/ui initialized with default theme
- [ ] ESLint configured and passing

---

## Title
[Setup] Define Prisma schema and run migrations

## Labels
`MUS`, `enhancement`, `database`

## User Story
As a developer, I want the database schema defined, so I can store users, projects, and subscriptions.

## Proposed Solution
1. Create `prisma/schema.prisma` with models:
   - `User` (id, email, name, avatar, createdAt, updatedAt)
   - `Subscription` (id, userId, plan, stripeCustomerId, stripeSubId, currentPeriodEnd)
   - `Project` (id, userId, title, niche, status, currentPhase, phaseOutputs as JSON)
2. Define enums: `Plan`, `ProjectStatus`, `Phase`
3. Configure Neon connection string
4. Run `npx prisma migrate dev`
5. Generate Prisma client

## Acceptance Criteria
- [ ] Schema file created with all models
- [ ] Enums defined: Plan (FREE/PRO/AGENCY), ProjectStatus (DRAFT/IN_PROGRESS/COMPLETED/ARCHIVED), Phase (STRATEGY/PACKAGING/SCRIPTING/SHORTS/PRODUCTION/DISTRIBUTION)
- [ ] Migration runs successfully
- [ ] Prisma client generated
- [ ] `npx prisma studio` shows empty tables

---

## Title
[Auth] Implement Better Auth with OAuth providers

## Labels
`MUS`, `enhancement`, `auth`, `FR-100`

## User Story
As a user, I want to sign up and login with Google or email/password, so my projects are private and secure.

## Proposed Solution
1. Configure Better Auth in `src/lib/auth.ts`
2. Add Google OAuth provider
3. Add email/password authentication
4. Create auth routes:
   - `/login` - Login page
   - `/signup` - Signup page
   - `/api/auth/*` - Auth API routes
5. Create auth middleware for protected routes
6. Add session provider to layout

## Acceptance Criteria
- [ ] Google OAuth login flow works end-to-end
- [ ] Email/password signup creates user in database
- [ ] Email/password login authenticates existing user
- [ ] Session persists across page refreshes
- [ ] Logout clears session and redirects to login
- [ ] Protected routes redirect unauthenticated users to /login
- [ ] User object available in server components

---

## Title
[Payments] Implement Stripe subscription billing

## Labels
`MUS`, `enhancement`, `payments`, `FR-107`

## User Story
As a user, I want to subscribe to Pro or Agency plans, so I can create more projects per month.

## Proposed Solution
1. Create Stripe products and prices in Stripe Dashboard:
   - Free: $0 (1 project/month)
   - Pro: $29/month (10 projects/month)
   - Agency: $99/month (unlimited)
2. Implement `/api/stripe/checkout` - Create checkout session
3. Implement `/api/stripe/portal` - Customer portal redirect
4. Implement `/api/webhooks/stripe` - Handle subscription events
5. Create `/settings/billing` page with plan display and upgrade buttons
6. Update Subscription model on webhook events

## Acceptance Criteria
- [ ] Checkout session redirects to Stripe hosted page
- [ ] Successful payment creates subscription in database
- [ ] Webhook handles `customer.subscription.created`
- [ ] Webhook handles `customer.subscription.updated`
- [ ] Webhook handles `customer.subscription.deleted`
- [ ] Settings page shows current plan
- [ ] Upgrade/downgrade buttons redirect to Stripe

---

# 📊 DASHBOARD & PROJECTS

---

## Title
[Dashboard] Create project list view

## Labels
`MUS`, `enhancement`, `dashboard`, `FR-101`

## User Story
As a user, I want to see all my video projects in a dashboard, so I can track progress and access them quickly.

## Proposed Solution
1. Create `/dashboard` route (protected)
2. Create `getProjects(userId)` service function
3. Create `ProjectCard` component showing: title, phase badge, status, last updated
4. Create empty state component for new users
5. Add "New Project" button linking to `/new`
6. Sort projects by last updated (descending)

## Acceptance Criteria
- [ ] Dashboard shows list of user's projects
- [ ] Each project card displays title, current phase, and status
- [ ] Projects sorted by most recently updated first
- [ ] Empty state shows when user has no projects
- [ ] "New Project" button visible and links to /new
- [ ] Loading state shows while fetching projects

---

## Title
[Projects] Create new project flow

## Labels
`MUS`, `enhancement`, `projects`, `FR-001`

## User Story
As a creator, I want to start a new video project by entering a title and optional niche, so I can begin the content pipeline.

## Proposed Solution
1. Create `/new` route with form
2. Form fields: Title (required), Niche (optional)
3. Validate with Zod schema
4. Create `createProject(userId, data)` service function
5. POST to `/api/projects` endpoint
6. On success, redirect to `/projects/[id]`

## Acceptance Criteria
- [ ] Form validates title is required (min 1 char)
- [ ] Form submits to API endpoint
- [ ] Project created in database with status DRAFT
- [ ] Redirects to project detail page after creation
- [ ] New project appears in dashboard
- [ ] Error state shows if creation fails

---

## Title
[Projects] Create project detail view with phase navigation

## Labels
`MUS`, `enhancement`, `projects`, `FR-103`

## User Story
As a user, I want to see all phases of my video project and navigate between them freely.

## Proposed Solution
1. Create `/projects/[id]` route
2. Create sidebar with 6 phase cards (clickable)
3. Create main content area that renders active phase component
4. Show phase status indicators: pending (gray), active (blue), completed (green)
5. Store currentPhase in project model
6. Allow clicking any phase (not linear gating)

## Acceptance Criteria
- [ ] Project title displayed at top
- [ ] Sidebar shows all 6 phases: Strategy, Packaging, Scripting, Shorts, Production, Distribution
- [ ] Clicking a phase loads that phase's content
- [ ] Current phase is highlighted
- [ ] Completed phases show checkmark icon
- [ ] Phase content area is responsive

---

## Title
[Dashboard] Display project usage limits

## Labels
`MUS`, `enhancement`, `dashboard`, `FR-108`

## User Story
As a user, I want to see my remaining projects this month, so I know when I'm approaching my limit.

## Proposed Solution
1. Create `getMonthlyUsage(userId)` function - count projects created this month
2. Create `getPlanLimit(plan)` function - return limit per plan
3. Display usage badge on dashboard: "3/10 projects used"
4. Show upgrade prompt when usage > 80% of limit
5. Block project creation when at limit (Free tier)

## Acceptance Criteria
- [ ] Usage count accurate for current month
- [ ] Correct limits: Free=1, Pro=10, Agency=unlimited
- [ ] Usage badge visible on dashboard
- [ ] Upgrade prompt appears at 80%+ usage
- [ ] Free users see "Upgrade to create more" when at limit
- [ ] Create button disabled when at limit

---

# 🎯 PHASE 1: STRATEGY

---

## Title
[Strategy] Implement YouTube Studio HTML parser

## Labels
`MUS`, `enhancement`, `strategy`, `FR-002`

## User Story
As a creator, I want to upload my YouTube Studio "Inspiration" HTML export, so the system can analyze search demand signals for my niche.

## Proposed Solution
1. Create file upload component accepting .html files
2. Parse HTML server-side to extract topic cards
3. Extract for each topic: name, volume indicator (High/Medium/Low/Content Gap)
4. Store parsed results in project's strategyOutput JSON
5. Display results in sortable table

## Acceptance Criteria
- [ ] File upload accepts only .html files
- [ ] Parser extracts all topic names correctly
- [ ] Volume indicators displayed with color coding (High=green, Medium=yellow, Low=gray)
- [ ] Results sorted by volume priority (High first)
- [ ] Error message shown for invalid/corrupt files
- [ ] Parsed data persists in project

---

## Title
[Strategy] Create competitor video analysis input

## Labels
`MUS`, `enhancement`, `strategy`, `FR-003`

## User Story
As a creator, I want to input competitor video data from VidIQ, so the system can identify outlier topics with high views-per-hour.

## Proposed Solution
1. Create textarea for pasting competitor data
2. Parse format: Title | Views | Publish Date
3. Calculate VPH (Views Per Hour) for each video
4. Highlight "hot" videos (VPH > 100)
5. Store in strategyOutput

## Acceptance Criteria
- [ ] Textarea accepts multi-line paste
- [ ] Parser handles common formats (tab-separated, comma-separated)
- [ ] VPH calculated correctly: views / hours_since_publish
- [ ] Results sorted by VPH descending
- [ ] Videos with VPH > 100 highlighted as "Hot"
- [ ] Error handling for malformed data

---

## Title
[Strategy] Integrate Google Trends data retrieval

## Labels
`MUS`, `enhancement`, `strategy`, `FR-004`

## User Story
As a creator, I want the system to fetch Google Trends data for my topic, so I can validate demand with a third data source.

## Proposed Solution
1. Create input field for topic keyword
2. Call Google Trends API or scraping service
3. Return: related queries, rising queries, trend status
4. Highlight "BREAKOUT" queries as high opportunity
5. Display interest over time graph (optional)

## Acceptance Criteria
- [ ] Topic input accepts keyword string
- [ ] Related queries returned and displayed
- [ ] Rising queries shown with percentage increase
- [ ] BREAKOUT queries highlighted prominently
- [ ] Rate limit errors handled gracefully
- [ ] Loading state during fetch

---

## Title
[Strategy] Implement 3-source cross-validation view

## Labels
`MUS`, `enhancement`, `strategy`, `FR-005`

## User Story
As a creator, I want to see which topics appear in all 3 data sources, so I can identify "Perfect Storm" topics with the highest probability of success.

## Proposed Solution
1. Aggregate topics from: YT Studio, Competitors, Google Trends
2. Normalize topic names for matching (lowercase, trim)
3. Create matrix view: Topic × Source
4. Calculate match count per topic
5. Highlight 3/3 as "Perfect Storm", 2/3 as "Strong"

## Acceptance Criteria
- [ ] All topics from 3 sources combined
- [ ] Duplicate detection works across sources
- [ ] Match count displayed per topic (1/3, 2/3, 3/3)
- [ ] 3/3 matches highlighted gold/green
- [ ] 2/3 matches highlighted yellow
- [ ] User can select final topic for next phase

---

# 🏷️ PHASE 2: PACKAGING

---

## Title
[Packaging] Create avatar definition form

## Labels
`MUS`, `enhancement`, `packaging`, `FR-010`

## User Story
As a creator, I want to define my exact target viewer using 4 key questions, so all generated content is laser-focused on their needs.

## Proposed Solution
1. Create form with 4 textarea fields:
   - Who: "Who is the ideal viewer? (demographics, role, situation)"
   - Objection: "What objection prevents them from clicking?"
   - Stakes: "What do they lose by NOT watching?"
   - Transformation: "What transformation do they achieve?"
2. Validate minimum 10 characters per field
3. Store in project's packagingOutput
4. Pre-populate if already defined

## Acceptance Criteria
- [ ] All 4 fields displayed with helper text
- [ ] Validation enforces minimum 10 characters
- [ ] Save button stores to project
- [ ] Previously saved values pre-populate form
- [ ] Error messages display for invalid fields

---

## Title
[Packaging] Implement AI title generation (10 variants)

## Labels
`MUS`, `enhancement`, `packaging`, `FR-006`

## User Story
As a creator, I want 10 title variants using proven psychological archetypes, so I don't waste hours brainstorming from scratch.

## Proposed Solution
1. Create prompt template with 10 archetypes:
   - Open Loop, Counterintuitive, Secret, Warning, Extreme Number, Challenge, Story Start, The Mistake, Results First, Specific How-To
2. Include topic + avatar in prompt context
3. Call Claude API with structured output (JSON array)
4. Parse and display each title with archetype label
5. Allow user to select 1-3 favorites
6. Add "Regenerate" button

## Acceptance Criteria
- [ ] 10 titles generated per request
- [ ] Each title labeled with its archetype
- [ ] Reasoning/explanation shown for each
- [ ] User can select multiple favorites
- [ ] Regenerate button fetches new options
- [ ] Selected titles saved to project

---

## Title
[Packaging] Generate thumbnail concepts for selected titles

## Labels
`MUS`, `enhancement`, `packaging`, `FR-007`

## User Story
As a creator, I want a detailed thumbnail concept for each selected title, so I know exactly what visual to create or commission.

## Proposed Solution
1. For each selected title, generate concept including:
   - Type: Transformation, Contrast, Mystery, Result, Before/After
   - Contents: Face emotion, objects, text overlay
   - Composition: Rule of thirds placement, focal point
   - Contrast: Color scheme, background separation
   - Scroll Stoppers: Motion blur, arrows, circles, text callouts
2. Display as expandable cards

## Acceptance Criteria
- [ ] Concept generated for each selected title
- [ ] All 5 elements (Type, Contents, Composition, Contrast, Scroll Stoppers) included
- [ ] Display as card with expandable details
- [ ] Text overlay suggestion included
- [ ] User can mark favorite concept

---

## Title
[Packaging] Export Midjourney/DALL-E thumbnail prompts

## Labels
`MUS`, `enhancement`, `packaging`, `FR-008`

## User Story
As a creator, I want ready-to-use image generation prompts, so I can create thumbnails without writing prompts myself.

## Proposed Solution
1. Convert thumbnail concept to image generation prompt
2. Include: style, subject, lighting, colors, composition
3. Add Midjourney params: `--ar 16:9 --v 6`
4. Create alternative for DALL-E format
5. Add copy button for each prompt

## Acceptance Criteria
- [ ] Prompt generated from concept
- [ ] Midjourney format with aspect ratio params
- [ ] DALL-E format alternative provided
- [ ] Copy-to-clipboard button works
- [ ] Multiple style variants available (realistic, illustrated, etc.)

---

## Title
[Packaging] Implement title-thumbnail synergy check

## Labels
`MUS`, `enhancement`, `packaging`, `FR-009`

## User Story
As a creator, I want the system to verify my title and thumbnail work together, so I don't waste visual real estate with redundant information.

## Proposed Solution
1. AI analyzes selected title + thumbnail concept
2. Check for redundancy (same info in both)
3. Check for synergy (thumbnail adds context title can't)
4. Return: Pass/Fail with explanation
5. Suggest improvements if Fail

## Acceptance Criteria
- [ ] Analysis runs on selected combo
- [ ] Redundancy issues flagged
- [ ] Synergy score displayed
- [ ] Improvement suggestions provided
- [ ] Pass/Fail badge shown
- [ ] Explanation helps user understand issue

---

# ✍️ PHASE 3: SCRIPTING

---

## Title
[Scripting] Generate 4-step hook script (0:00-0:45)

## Labels
`MUS`, `enhancement`, `scripting`, `FR-011`

## User Story
As a creator, I want a scripted hook for the first 45 seconds, structured with proven psychological triggers to maximize retention.

## Proposed Solution
1. Generate 3 options for each step:
   - First Frame (0:00-0:05): Ego trap or contrarian statement
   - Stakes (0:05-0:15): Fear or desire toggle
   - Input Bias (0:15-0:30): Credibility statement
   - Promise (0:30-0:45): "3 steps" digestibility
2. User selects favorite for each step
3. Compile into full hook script preview
4. Include timing markers

## Acceptance Criteria
- [ ] 3 options generated per step
- [ ] User can select one option per step
- [ ] Full hook preview compiles selections
- [ ] Timestamps shown in preview
- [ ] Copy button for full hook
- [ ] Regenerate option per step

---

## Title
[Scripting] Generate breaking beliefs section

## Labels
`MUS`, `enhancement`, `scripting`, `FR-012`

## User Story
As a creator, I want to script a "breaking beliefs" section that addresses the viewer's misconceptions before I teach.

## Proposed Solution
1. User inputs the common misconception they're fighting
2. AI generates 3-part structure:
   - Old Way: "Most gurus tell you to do X..."
   - Breakdown: "...but that fails because [reason]"
   - New Mechanism: "That's why we use [new approach]"
3. Editable text areas
4. Save to scriptingOutput

## Acceptance Criteria
- [ ] Misconception input field works
- [ ] 3-part script generated
- [ ] Each part editable inline
- [ ] Save button persists changes
- [ ] Preview shows full section

---

## Title
[Scripting] Generate body structure with loop architecture

## Labels
`MUS`, `enhancement`, `scripting`, `FR-013`

## User Story
As a creator, I want each main point structured with open loops and DISC layers, so viewer retention stays high throughout.

## Proposed Solution
1. User inputs 3-5 main points
2. For each point, generate:
   - Open Loop: Hook that creates curiosity
   - Content: DISC layers (D=Result, I=Story, S=Steps, C=Data)
   - Payoff: Close the loop
   - Bridge: Transition to next point
3. Include visual cue markers inline
4. Drag-to-reorder points

## Acceptance Criteria
- [ ] User can add/remove main points (3-5)
- [ ] Loop structure generated per point
- [ ] DISC content included in each
- [ ] Open loops create genuine curiosity gaps
- [ ] Bridges connect points smoothly
- [ ] Reorder functionality works

---

## Title
[Scripting] Add visual cue markers throughout script

## Labels
`MUS`, `enhancement`, `scripting`, `FR-014`

## User Story
As a creator, I want the script to mark where visual changes should occur every 30-60 seconds, so my editor can follow the retention plan.

## Proposed Solution
1. AI inserts markers: `[A-ROLL]`, `[B-ROLL]`, `[GRAPHIC]`, `[PUNCH-IN]`
2. Display inline with script text
3. Color-code by type
4. Allow user to add custom markers
5. Mark pattern interrupts every 45-60 sec

## Acceptance Criteria
- [ ] Markers inserted automatically every 30-60 sec
- [ ] Color coding: A-Roll=blue, B-Roll=green, Graphic=purple, Punch-In=orange
- [ ] Pattern interrupt markers every 45-60 sec
- [ ] User can click to add custom markers
- [ ] Markers visible in final script export

---

## Title
[Scripting] Generate outro with bridge strategy

## Labels
`MUS`, `enhancement`, `scripting`, `FR-015`

## User Story
As a creator, I want an outro that drives viewers to my next video, not the typical "thanks for watching" that signals exit.

## Proposed Solution
1. User inputs their next video topic (or suggested by AI)
2. Generate 3-part outro:
   - Problem Link: New problem this video created
   - Solution: Next video as the fix
   - CTA: "If you want to [benefit], watch this next"
3. Explicitly avoid: "In conclusion", "That's it", "Thanks for watching"

## Acceptance Criteria
- [ ] Next video topic input/suggestion
- [ ] 3-part outro structure generated
- [ ] No typical exit phrases used
- [ ] CTA is action-oriented
- [ ] Editable output
- [ ] Includes endscreen timing note

---

# 🎬 PHASE 3.5: SHORTS

---

## Title
[Shorts] Generate 3 topic short scripts

## Labels
`MUS`, `enhancement`, `shorts`, `FR-016`

## User Story
As a creator, I want 3 fresh 60-second scripts on my video topic (not clips), so I have content to post during Week 1.

## Proposed Solution
1. Generate 3 types, 2 options each:
   - Hot Take: Spicy opinion on the topic
   - Quick Win: One actionable tip (do TODAY)
   - Story Hook: Personal experience with cliffhanger
2. User picks A or B for each
3. Include posting schedule: Mon/Wed/Fri

## Acceptance Criteria
- [ ] 3 distinct short types generated
- [ ] 2 options per type
- [ ] Selection UI works
- [ ] Scripts are ~60 seconds when read aloud
- [ ] Posting schedule included
- [ ] All 3 final selections saved

---

## Title
[Shorts] Generate 3 extract shorts with sandwich method

## Labels
`MUS`, `enhancement`, `shorts`, `FR-017`

## User Story
As a creator, I want 3 shorts clipped from my main video with new hooks/CTAs, so I can repurpose content for Week 2.

## Proposed Solution
1. Analyze main script to identify best sections:
   - Result: Demo/payoff moment
   - Pain: Rant/frustration section
   - Value: Standalone tip
2. Generate for each:
   - Hook (5 sec): New intro that stops scroll
   - Meat: Timestamp reference to main video
   - CTA (5-10 sec): Drive to main video
3. User confirms timestamps

## Acceptance Criteria
- [ ] 3 sections identified from script
- [ ] Hook options generated (3 per section)
- [ ] CTA options generated (2 per section)
- [ ] Timestamp input for clip boundaries
- [ ] Sandwich preview: Hook + Meat + CTA
- [ ] Week 2 posting schedule included

---

## Title
[Shorts] Generate 2-week posting calendar

## Labels
`MUS`, `enhancement`, `shorts`, `FR-018`

## User Story
As a creator, I want a complete posting schedule for my 6 shorts, so I know exactly when to upload each piece.

## Proposed Solution
1. Auto-generate calendar:
   - Week 1: Mon (Main + Topic 1), Wed (Topic 2), Fri (Topic 3)
   - Week 2: Mon (Extract 1), Wed (Extract 2), Fri (Extract 3)
2. Calculate dates from user's publish date
3. Show which content on which day
4. Export option (.ics calendar)

## Acceptance Criteria
- [ ] Calendar displays 2 weeks
- [ ] Correct content mapped to each day
- [ ] Dates calculated from publish date input
- [ ] Topic shorts before Extract shorts
- [ ] Export to .ics format option
- [ ] Print-friendly view

---

# 🎥 PHASE 4: PRODUCTION

---

## Title
[Production] Generate pre-filming checklist

## Labels
`MUS`, `enhancement`, `production`, `FR-019`

## User Story
As a creator, I want a checklist before I start filming, so I don't forget essential setup steps.

## Proposed Solution
1. Generate standard checklist:
   - Lighting: Soft, even, no harsh shadows
   - Audio: Mic close, test recording
   - Camera: 4K, lens clean, frame check
   - Background: Clean, matches tone
   - Script: Loaded on teleprompter/monitor
2. Energy check: Scale 1-10 prompt
3. Recording order: Main → Topic Shorts → Hook/CTAs
4. Checkable items that persist

## Acceptance Criteria
- [ ] All standard items listed
- [ ] Items are checkable
- [ ] Checked state persists
- [ ] Energy check prompt shows
- [ ] Recording order guide included
- [ ] Can reset checklist

---

## Title
[Production] Generate second-by-second edit rotation plan

## Labels
`MUS`, `enhancement`, `production`, `FR-020`

## User Story
As a creator, I want an edit plan showing exactly when to change visuals, so my editor can cut for maximum retention.

## Proposed Solution
1. Parse script into timed sections
2. For each 3-5 second chunk, assign visual type:
   - A-Roll (talking)
   - Punch-In (1.1x-1.2x zoom)
   - B-Roll (stock/recorded footage)
   - Graphic (text/diagram)
3. Mark pattern interrupts every 45-60 sec
4. Export to CSV/PDF

## Acceptance Criteria
- [ ] Timestamp ranges shown (e.g., [0:00-0:05])
- [ ] Visual type assigned to each range
- [ ] B-roll suggestions included
- [ ] Pattern interrupt markers every 45-60 sec
- [ ] Export to CSV option
- [ ] Export to PDF option

---

## Title
[Production] Generate music and SFX plan

## Labels
`MUS`, `enhancement`, `production`, `FR-021`

## User Story
As a creator, I want guidance on music and sound effects, so the audio enhances the video's energy.

## Proposed Solution
1. Generate music plan per section:
   - Intro: High energy/tension
   - Body: Subtle driving beat
   - Payoffs: Triumphant swell
   - Outro: Resolving
2. SFX markers inline with edit plan:
   - Graphic fly-in → Whoosh
   - Hard cut → Pop
   - Emphasis → Bass hit

## Acceptance Criteria
- [ ] Music style defined per section
- [ ] SFX markers aligned with edit plan
- [ ] Rule enforced: motion = sound
- [ ] Mood keywords included
- [ ] Exportable alongside edit plan

---

## Title
[Production] Generate QC checklist

## Labels
`MUS`, `enhancement`, `production`, `FR-022`

## User Story
As a creator, I want quality checks before exporting, so I catch retention issues early.

## Proposed Solution
1. Generate 4 tests:
   - Boredom Test: Mark timestamps where attention wanders
   - Mute Test: Is it visually engaging without audio?
   - 10% Rule: Cut at least 10% of footage
   - Pattern Interrupt Check: No 90sec stretches without change
2. Checkable with notes field

## Acceptance Criteria
- [ ] All 4 tests listed with instructions
- [ ] Each test has checkbox
- [ ] Notes field for flagged timestamps
- [ ] Guidance text explains each test
- [ ] Can mark test as Pass/Fail

---

# 📤 PHASE 5: DISTRIBUTION

---

## Title
[Distribution] Generate SEO description and tags

## Labels
`MUS`, `enhancement`, `distribution`, `FR-023`

## User Story
As a creator, I want a complete YouTube description with timestamps and relevant tags, so my video ranks in search.

## Proposed Solution
1. Generate description:
   - Hook line (from script)
   - "In this video, I cover:" bullets
   - Timestamps for each section
   - Links placeholder
   - Hashtags (3-5)
2. Generate tags: 15-20 relevant keywords
3. Character count display (5000 limit)

## Acceptance Criteria
- [ ] Description follows template structure
- [ ] Timestamps calculated from script sections
- [ ] Tags relevant to topic and niche
- [ ] Character count shown
- [ ] Copy button for description
- [ ] Copy button for tags

---

## Title
[Distribution] Generate cross-platform 2-week calendar

## Labels
`MUS`, `enhancement`, `distribution`, `FR-024`

## User Story
As a creator, I want a posting schedule across all platforms, so I maximize reach from one filming session.

## Proposed Solution
1. Generate calendar grid:
   - Columns: YouTube, TikTok, Instagram, LinkedIn
   - Rows: 14 days
2. Map content to days per platform rules
3. Include platform-specific notes (remove YT CTAs for TikTok, etc.)
4. Export options

## Acceptance Criteria
- [ ] All 4 platforms displayed
- [ ] 2-week view showing each day
- [ ] Correct content mapped per platform
- [ ] Platform notes included
- [ ] Export to CSV option
- [ ] Print-friendly layout

---

## Title
[Distribution] Generate 3 LinkedIn text posts

## Labels
`MUS`, `enhancement`, `distribution`, `FR-025`

## User Story
As a creator, I want LinkedIn posts to accompany my video content, so I engage my professional audience.

## Proposed Solution
1. Generate 3 posts:
   - Post 1 (Hook/Pain): Problem-focused, link to main video
   - Post 2 (Insight): Key learning, link to main video
   - Post 3 (Result/CTA): Transformation outcome, link to main video
2. Include hashtags per post
3. Copy buttons

## Acceptance Criteria
- [ ] 3 distinct posts generated
- [ ] Each follows its archetype
- [ ] Link placeholder included
- [ ] Hashtags relevant to LinkedIn
- [ ] Copy button per post
- [ ] Character count shown

---

## Title
[Export] Implement full project markdown/PDF export

## Labels
`MUS`, `enhancement`, `export`, `FR-026`

## User Story
As a creator, I want to download all my project content as organized files, so I can access everything offline.

## Proposed Solution
1. Compile all phases to markdown files:
   - strategy.md
   - packaging.md
   - script.md
   - shorts.md
   - production.md
   - distribution.md
2. Create zip file with folder structure
3. Include README with phase summary
4. Future: PDF export option

## Acceptance Criteria
- [ ] Download button triggers export
- [ ] All 6 phases included in zip
- [ ] Folder structure maintained
- [ ] README file included
- [ ] Files formatted correctly
- [ ] Works on all browsers

---

# 🎨 UI/UX

---

## Title
[UI] Implement AI generation loading states

## Labels
`MUS`, `enhancement`, `ui`, `FR-104`

## User Story
As a user, I want visual feedback while AI generates content, so I know the system is working.

## Proposed Solution
1. Create skeleton loader component
2. Show during all AI API calls
3. Add cancel button for long operations
4. Show error state with retry button
5. Optional: streaming text display

## Acceptance Criteria
- [ ] Skeleton fills content area during load
- [ ] No UI jump when content loads
- [ ] Cancel button appears after 5 seconds
- [ ] Error state displays with message
- [ ] Retry button re-triggers generation

---

## Title
[UI] Create option picker component for AI outputs

## Labels
`MUS`, `enhancement`, `ui`, `FR-105`

## User Story
As a user, I want to easily select from multiple AI-generated options, so I have control over the final content.

## Proposed Solution
1. Create reusable `OptionPicker` component
2. Radio button group for single select
3. Checkbox group for multi-select mode
4. "Regenerate" button fetches new options
5. "Use Custom" opens text input
6. Card-style display with expand option

## Acceptance Criteria
- [ ] Radio selection works for single-select
- [ ] Checkbox selection works for multi-select
- [ ] Selected state clearly visible
- [ ] Regenerate fetches new options
- [ ] Custom input option available
- [ ] Expand button shows full text

---

## Title
[Editor] Create rich text script editor

## Labels
`MUS`, `enhancement`, `editor`, `FR-106`

## User Story
As a user, I want to edit generated scripts inline with formatting, so I can customize content to my voice.

## Proposed Solution
1. Integrate headless editor (Tiptap or Slate)
2. Support: bold, italic, headers, lists
3. Auto-save on change (debounced)
4. Show save status indicator
5. Undo/redo support

## Acceptance Criteria
- [ ] Rich text editor renders script
- [ ] Basic formatting works
- [ ] Auto-save triggers after 2 seconds of inactivity
- [ ] Save status shows (Saved/Saving)
- [ ] Undo/redo with keyboard shortcuts
- [ ] Formatting preserved on save

---

## Title
[Wizard] Create step-by-step guided project flow

## Labels
`MUS`, `enhancement`, `wizard`, `FR-102`

## User Story
As a new user, I want a guided wizard flow, so I'm not overwhelmed by all the features at once.

## Proposed Solution
1. Create multi-step wizard component
2. Steps: Niche → Research → Packaging → Scripting → Shorts → Production → Distribution
3. Progress indicator bar
4. Back/Next navigation
5. Allow skip-ahead if phase complete
6. Save progress between sessions

## Acceptance Criteria
- [ ] All steps visible in progress bar
- [ ] Current step highlighted
- [ ] Back button returns to previous step
- [ ] Next button validates before proceeding
- [ ] Can click completed steps to revisit
- [ ] Progress persists if user leaves

---

# 📦 SKILL PACK SPECIFIC

---

## Title
[Skill Pack] Create one-click npm installation

## Labels
`MUS`, `enhancement`, `skill-pack`, `FR-200`

## User Story
As a developer, I want to install the YCE skill pack with a single command, so setup takes seconds.

## Proposed Solution
1. Create npm package: `youtube-content-engine`
2. Install script detects OS (Windows/Mac/Linux)
3. Copies skills to correct location:
   - Windows: `%USERPROFILE%\.gemini\antigravity\skills\`
   - Mac/Linux: `~/.gemini/antigravity/skills/`
4. Creates folders if missing
5. Success message with next steps

## Acceptance Criteria
- [ ] `npx youtube-content-engine install` works
- [ ] Detects OS correctly
- [ ] Files copied to correct location
- [ ] Folders created if missing
- [ ] Success message displayed
- [ ] Error handling for permissions

---

## Title
[Skill Pack] Implement global directory installation

## Labels
`MUS`, `enhancement`, `skill-pack`, `FR-201`

## User Story
As a developer, I want the skill pack installed globally, so it works in any project directory.

## Proposed Solution
1. Fork original skill structure
2. Modify to use global paths only
3. No local `node_modules` installation
4. Skills accessible from any directory
5. Document global path locations

## Acceptance Criteria
- [ ] Skills install to global directory
- [ ] Works from any project folder
- [ ] No npm install in working directory
- [ ] Skills detected by Antigravity/Cursor
- [ ] Documentation updated

---

## Title
[Skill Pack] Create individual phase workflow commands

## Labels
`MUS`, `enhancement`, `skill-pack`, `FR-202`

## User Story
As a developer, I want to run each pipeline phase via slash command, so I can use phases independently.

## Proposed Solution
1. Create workflow file for each phase:
   - `/yce-strategy`
   - `/yce-packaging`
   - `/yce-scripting`
   - `/yce-shorts`
   - `/yce-production`
   - `/yce-distribution`
2. Register in `.agent/workflows/`
3. Each phase outputs to project folder

## Acceptance Criteria
- [ ] All 6 phase workflows created
- [ ] Slash commands recognized
- [ ] Output saves to `docs/youtube/` folder
- [ ] Handoff prompts link to next phase
- [ ] Works standalone (any phase)

---

## Title
[Skill Pack] Include YouTube Studio HTML parser script

## Labels
`MUS`, `enhancement`, `skill-pack`, `FR-205`

## User Story
As a developer, I want a local script to parse YouTube Studio exports, so I don't need the web app for research.

## Proposed Solution
1. Include PowerShell script (Windows)
2. Include Node.js alternative (cross-platform)
3. Usage: `yce-parse <input.html> <output.md>`
4. Output: Markdown table with topics and volumes
5. Document in SKILL.md

## Acceptance Criteria
- [ ] PowerShell script works on Windows
- [ ] Node script works on all platforms
- [ ] Outputs markdown format
- [ ] Handles missing data gracefully
- [ ] Usage documented

---

## Title
[Skill Pack] Ensure multi-model compatibility

## Labels
`MUS`, `enhancement`, `skill-pack`, `FR-208`

## User Story
As a developer, I want the skill pack to work with any AI model, so I'm not locked to Claude.

## Proposed Solution
1. Remove hardcoded model references
2. Use generic prompt structures
3. Test with: Claude, GPT-4, Gemini, local models
4. Document model compatibility
5. Note model-specific considerations

## Acceptance Criteria
- [ ] Works with Antigravity (any model)
- [ ] Works with Claude Code
- [ ] Works with Cursor
- [ ] No Claude-specific syntax
- [ ] Compatibility matrix documented

---

# 🚀 FUTURE SCOPE

---

## Title
[Export] Add Google Docs export integration

## Labels
`future-scope`, `enhancement`, `export`, `FR-109`

## User Story
As a user, I want to export my project directly to Google Docs, so I can share with my team.

## Proposed Solution
Implement Google Docs API integration for one-click export of all project phases.

## Acceptance Criteria
- [ ] OAuth flow for Google sign-in
- [ ] Creates new Google Doc with all content
- [ ] Formatting preserved
- [ ] Shareable link returned

---

## Title
[Teams] Add team member invites and collaboration

## Labels
`future-scope`, `enhancement`, `teams`, `FR-110`

## User Story
As an agency owner, I want to invite team members to projects, so multiple people can collaborate.

## Proposed Solution
Implement team system with invites, roles (Admin/Editor/Viewer), and project sharing.

## Acceptance Criteria
- [ ] Team creation
- [ ] Email invites
- [ ] Role permissions
- [ ] Project sharing within team

---

## Title
[Templates] Save niche/avatar as reusable templates

## Labels
`future-scope`, `enhancement`, `templates`, `FR-111`

## User Story
As a creator, I want to save my niche and avatar as templates, so I don't re-enter for each video.

## Proposed Solution
Implement template CRUD with ability to apply template to new projects.

## Acceptance Criteria
- [ ] Save current niche/avatar as template
- [ ] Template library view
- [ ] Apply template to new project
- [ ] Edit/delete templates

---

## Title
[Settings] Add AI voice/persona selection

## Labels
`future-scope`, `enhancement`, `settings`, `FR-112`

## User Story
As a user, I want to choose my AI's tone (brutal, friendly, concise), so the output matches my style.

## Proposed Solution
Add voice dropdown in settings that modifies all prompt system messages.

## Acceptance Criteria
- [ ] Voice options: Brutal Expert, Friendly Coach, Concise Pro
- [ ] Setting persists
- [ ] Affects all generation

---

## Title
[Thumbnails] Generate actual thumbnail images in-app

## Labels
`future-scope`, `enhancement`, `thumbnails`, `FR-113`

## User Story
As a user, I want the app to generate actual thumbnail images, so I don't need external tools.

## Proposed Solution
Integrate DALL-E or custom image generation API to produce thumbnails from concepts.

## Acceptance Criteria
- [ ] Generate button on concept card
- [ ] Image displays inline
- [ ] Download button
- [ ] Regenerate option

---

## Title
[YouTube] Upload directly to YouTube from app

## Labels
`future-scope`, `enhancement`, `youtube`, `FR-114`

## User Story
As a user, I want to schedule uploads directly to YouTube, so I don't leave the app.

## Proposed Solution
Implement YouTube Data API v3 integration for authenticated upload and scheduling.

## Acceptance Criteria
- [ ] YouTube OAuth
- [ ] Video upload
- [ ] Metadata applied
- [ ] Schedule publish time

---

## Title
[Analytics] Track video performance dashboard

## Labels
`future-scope`, `enhancement`, `analytics`, `FR-115`

## User Story
As a user, I want to see which topics and titles performed best, so I learn what works.

## Proposed Solution
Connect to YouTube Analytics API and display CTR, AVD, VPH per project.

## Acceptance Criteria
- [ ] YouTube Analytics OAuth
- [ ] Fetch video stats
- [ ] Display per project
- [ ] Trend over time graph

---

## Title
[Skill Pack] Enable offline template usage

## Labels
`future-scope`, `enhancement`, `skill-pack`, `FR-209`

## User Story
As a developer, I want templates to work without internet, so I can plan on flights.

## Proposed Solution
Separate template structures from AI generation so planning works offline.

## Acceptance Criteria
- [ ] Templates load offline
- [ ] Structure guides work
- [ ] AI generation requires connection
- [ ] Clear offline indicators

---

## Title
[Skill Pack] Remember past projects for context

## Labels
`future-scope`, `enhancement`, `skill-pack`, `FR-210`

## User Story
As a developer, I want the skill to reference my past videos, so it learns my style.

## Proposed Solution
Store project history in local JSON and include in prompt context.

## Acceptance Criteria
- [ ] Past projects stored locally
- [ ] Included in new project context
- [ ] User can disable
- [ ] Privacy preserved

---

## Title
[Skill Pack] Allow template customization

## Labels
`MUS`, `enhancement`, `skill-pack`, `FR-207`

## User Story
As a developer, I want to edit the prompt templates, so I can match my content style and preferences.

## Proposed Solution
Store templates as editable markdown files with clear customization points documented.

## Acceptance Criteria
- [ ] Templates are editable markdown files
- [ ] Changes persist across sessions
- [ ] Reset to default option available
- [ ] Customization points documented in SKILL.md
- [ ] Examples of common customizations provided

---

# 📋 ISSUE SUMMARY

| Category | MUS | Future |
|----------|-----|--------|
| Infrastructure & Setup | 4 | 0 |
| Dashboard & Projects | 4 | 0 |
| Phase 1: Strategy | 4 | 0 |
| Phase 2: Packaging | 5 | 0 |
| Phase 3: Scripting | 5 | 0 |
| Phase 3.5: Shorts | 3 | 0 |
| Phase 4: Production | 4 | 0 |
| Phase 5: Distribution | 4 | 0 |
| UI/UX | 4 | 0 |
| Skill Pack | 6 | 2 |
| Future Features | 0 | 7 |
| **Total** | **43** | **9** |

---

## Quick Reference: Labels

| Label | Meaning |
|-------|---------|
| `MUS` | Minimum Usable State - required for v1.0 |
| `future-scope` | Post-v1.0 feature |
| `enhancement` | New feature |
| `infrastructure` | Setup, config, DevOps |
| `auth` | Authentication |
| `payments` | Stripe/billing |
| `dashboard` | Main dashboard UI |
| `projects` | Project CRUD |
| `strategy` | Phase 1 features |
| `packaging` | Phase 2 features |
| `scripting` | Phase 3 features |
| `shorts` | Phase 3.5 features |
| `production` | Phase 4 features |
| `distribution` | Phase 5 features |
| `ui` | General UI components |
| `editor` | Script editor |
| `wizard` | Project wizard |
| `export` | Export features |
| `skill-pack` | Skill pack specific |
