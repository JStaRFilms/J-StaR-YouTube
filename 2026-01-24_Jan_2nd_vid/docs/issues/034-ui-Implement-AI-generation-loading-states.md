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
