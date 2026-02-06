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
