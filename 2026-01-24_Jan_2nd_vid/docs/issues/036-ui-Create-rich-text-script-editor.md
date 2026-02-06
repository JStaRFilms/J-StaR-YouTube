## Title
[Editor] Create rich text script editor

## Labels
`MUS`, `enhancement`, `editor`, `FR-106`

## User Story
As a user, I want to edit generated scripts inline with formatting, so I can customize content to my voice.

## Proposed Solution
1. Integrate headless editor (Tiptap or Slate)
2. Support: bold, italic, headers, lists
3. Auto-save on change (debounced)
4. Show save status indicator
5. Undo/redo support

## Acceptance Criteria
- [ ] Rich text editor renders script
- [ ] Basic formatting works
- [ ] Auto-save triggers after 2 seconds of inactivity
- [ ] Save status shows (Saved/Saving)
- [ ] Undo/redo with keyboard shortcuts
- [ ] Formatting preserved on save
