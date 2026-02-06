## Title
[Packaging] Implement AI title generation (10 variants)

## Labels
`MUS`, `enhancement`, `packaging`, `FR-006`

## User Story
As a creator, I want 10 title variants using proven psychological archetypes, so I don't waste hours brainstorming from scratch.

## Proposed Solution
1. Create prompt template with 10 archetypes:
   - Open Loop, Counterintuitive, Secret, Warning, Extreme Number, Challenge, Story Start, The Mistake, Results First, Specific How-To
2. Include topic + avatar in prompt context
3. Call Claude API with structured output (JSON array)
4. Parse and display each title with archetype label
5. Allow user to select 1-3 favorites
6. Add "Regenerate" button

## Acceptance Criteria
- [ ] 10 titles generated per request
- [ ] Each title labeled with its archetype
- [ ] Reasoning/explanation shown for each
- [ ] User can select multiple favorites
- [ ] Regenerate button fetches new options
- [ ] Selected titles saved to project
