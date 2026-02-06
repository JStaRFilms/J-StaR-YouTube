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
