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
