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
