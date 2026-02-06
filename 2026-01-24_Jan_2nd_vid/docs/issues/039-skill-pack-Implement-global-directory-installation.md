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
