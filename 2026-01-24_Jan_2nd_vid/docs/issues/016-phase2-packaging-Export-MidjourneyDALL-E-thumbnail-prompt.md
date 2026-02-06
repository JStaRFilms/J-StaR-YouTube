## Title
[Packaging] Export Midjourney/DALL-E thumbnail prompts

## Labels
`MUS`, `enhancement`, `packaging`, `FR-008`

## User Story
As a creator, I want ready-to-use image generation prompts, so I can create thumbnails without writing prompts myself.

## Proposed Solution
1. Convert thumbnail concept to image generation prompt
2. Include: style, subject, lighting, colors, composition
3. Add Midjourney params: `--ar 16:9 --v 6`
4. Create alternative for DALL-E format
5. Add copy button for each prompt

## Acceptance Criteria
- [ ] Prompt generated from concept
- [ ] Midjourney format with aspect ratio params
- [ ] DALL-E format alternative provided
- [ ] Copy-to-clipboard button works
- [ ] Multiple style variants available (realistic, illustrated, etc.)
