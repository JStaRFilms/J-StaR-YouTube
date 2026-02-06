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
