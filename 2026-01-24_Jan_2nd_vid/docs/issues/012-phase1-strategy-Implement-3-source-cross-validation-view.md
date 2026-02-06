## Title
[Strategy] Implement 3-source cross-validation view

## Labels
`MUS`, `enhancement`, `strategy`, `FR-005`

## User Story
As a creator, I want to see which topics appear in all 3 data sources, so I can identify "Perfect Storm" topics with the highest probability of success.

## Proposed Solution
1. Aggregate topics from: YT Studio, Competitors, Google Trends
2. Normalize topic names for matching (lowercase, trim)
3. Create matrix view: Topic Ã— Source
4. Calculate match count per topic
5. Highlight 3/3 as "Perfect Storm", 2/3 as "Strong"

## Acceptance Criteria
- [ ] All topics from 3 sources combined
- [ ] Duplicate detection works across sources
- [ ] Match count displayed per topic (1/3, 2/3, 3/3)
- [ ] 3/3 matches highlighted gold/green
- [ ] 2/3 matches highlighted yellow
- [ ] User can select final topic for next phase
