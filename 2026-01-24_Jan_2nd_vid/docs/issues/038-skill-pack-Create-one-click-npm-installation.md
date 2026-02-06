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
