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
