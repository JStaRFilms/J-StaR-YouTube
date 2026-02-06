## Title
[Skill Pack] Ensure multi-model compatibility

## Labels
`MUS`, `enhancement`, `skill-pack`, `FR-208`

## User Story
As a developer, I want the skill pack to work with any AI model, so I'm not locked to Claude.

## Proposed Solution
1. Remove hardcoded model references
2. Use generic prompt structures
3. Test with: Claude, GPT-4, Gemini, local models
4. Document model compatibility
5. Note model-specific considerations

## Acceptance Criteria
- [ ] Works with Antigravity (any model)
- [ ] Works with Claude Code
- [ ] Works with Cursor
- [ ] No Claude-specific syntax
- [ ] Compatibility matrix documented
