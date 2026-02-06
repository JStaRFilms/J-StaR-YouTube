## Title
[Packaging] Implement title-thumbnail synergy check

## Labels
`MUS`, `enhancement`, `packaging`, `FR-009`

## User Story
As a creator, I want the system to verify my title and thumbnail work together, so I don't waste visual real estate with redundant information.

## Proposed Solution
1. AI analyzes selected title + thumbnail concept
2. Check for redundancy (same info in both)
3. Check for synergy (thumbnail adds context title can't)
4. Return: Pass/Fail with explanation
5. Suggest improvements if Fail

## Acceptance Criteria
- [ ] Analysis runs on selected combo
- [ ] Redundancy issues flagged
- [ ] Synergy score displayed
- [ ] Improvement suggestions provided
- [ ] Pass/Fail badge shown
- [ ] Explanation helps user understand issue
