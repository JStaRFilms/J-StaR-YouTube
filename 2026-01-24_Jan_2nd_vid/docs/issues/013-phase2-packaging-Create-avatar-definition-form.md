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
