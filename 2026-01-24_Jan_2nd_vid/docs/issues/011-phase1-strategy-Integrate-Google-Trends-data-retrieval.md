## Title
[Strategy] Integrate Google Trends data retrieval

## Labels
`MUS`, `enhancement`, `strategy`, `FR-004`

## User Story
As a creator, I want the system to fetch Google Trends data for my topic, so I can validate demand with a third data source.

## Proposed Solution
1. Create input field for topic keyword
2. Call Google Trends API or scraping service
3. Return: related queries, rising queries, trend status
4. Highlight "BREAKOUT" queries as high opportunity
5. Display interest over time graph (optional)

## Acceptance Criteria
- [ ] Topic input accepts keyword string
- [ ] Related queries returned and displayed
- [ ] Rising queries shown with percentage increase
- [ ] BREAKOUT queries highlighted prominently
- [ ] Rate limit errors handled gracefully
- [ ] Loading state during fetch
