## Title
[Production] Generate second-by-second edit rotation plan

## Labels
`MUS`, `enhancement`, `production`, `FR-020`

## User Story
As a creator, I want an edit plan showing exactly when to change visuals, so my editor can cut for maximum retention.

## Proposed Solution
1. Parse script into timed sections
2. For each 3-5 second chunk, assign visual type:
   - A-Roll (talking)
   - Punch-In (1.1x-1.2x zoom)
   - B-Roll (stock/recorded footage)
   - Graphic (text/diagram)
3. Mark pattern interrupts every 45-60 sec
4. Export to CSV/PDF

## Acceptance Criteria
- [ ] Timestamp ranges shown (e.g., [0:00-0:05])
- [ ] Visual type assigned to each range
- [ ] B-roll suggestions included
- [ ] Pattern interrupt markers every 45-60 sec
- [ ] Export to CSV option
- [ ] Export to PDF option
