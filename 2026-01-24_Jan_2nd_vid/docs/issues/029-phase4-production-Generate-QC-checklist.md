## Title
[Production] Generate QC checklist

## Labels
`MUS`, `enhancement`, `production`, `FR-022`

## User Story
As a creator, I want quality checks before exporting, so I catch retention issues early.

## Proposed Solution
1. Generate 4 tests:
   - Boredom Test: Mark timestamps where attention wanders
   - Mute Test: Is it visually engaging without audio?
   - 10% Rule: Cut at least 10% of footage
   - Pattern Interrupt Check: No 90sec stretches without change
2. Checkable with notes field

## Acceptance Criteria
- [ ] All 4 tests listed with instructions
- [ ] Each test has checkbox
- [ ] Notes field for flagged timestamps
- [ ] Guidance text explains each test
- [ ] Can mark test as Pass/Fail
