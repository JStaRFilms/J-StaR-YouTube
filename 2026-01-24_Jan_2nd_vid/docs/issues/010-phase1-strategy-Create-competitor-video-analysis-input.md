## Title
[Strategy] Create competitor video analysis input

## Labels
`MUS`, `enhancement`, `strategy`, `FR-003`

## User Story
As a creator, I want to input competitor video data from VidIQ, so the system can identify outlier topics with high views-per-hour.

## Proposed Solution
1. Create textarea for pasting competitor data
2. Parse format: Title | Views | Publish Date
3. Calculate VPH (Views Per Hour) for each video
4. Highlight "hot" videos (VPH > 100)
5. Store in strategyOutput

## Acceptance Criteria
- [ ] Textarea accepts multi-line paste
- [ ] Parser handles common formats (tab-separated, comma-separated)
- [ ] VPH calculated correctly: views / hours_since_publish
- [ ] Results sorted by VPH descending
- [ ] Videos with VPH > 100 highlighted as "Hot"
- [ ] Error handling for malformed data
