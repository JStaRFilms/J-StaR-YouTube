## Title
[Dashboard] Display project usage limits

## Labels
`MUS`, `enhancement`, `dashboard`, `FR-108`

## User Story
As a user, I want to see my remaining projects this month, so I know when I'm approaching my limit.

## Proposed Solution
1. Create `getMonthlyUsage(userId)` function - count projects created this month
2. Create `getPlanLimit(plan)` function - return limit per plan
3. Display usage badge on dashboard: "3/10 projects used"
4. Show upgrade prompt when usage > 80% of limit
5. Block project creation when at limit (Free tier)

## Acceptance Criteria
- [ ] Usage count accurate for current month
- [ ] Correct limits: Free=1, Pro=10, Agency=unlimited
- [ ] Usage badge visible on dashboard
- [ ] Upgrade prompt appears at 80%+ usage
- [ ] Free users see "Upgrade to create more" when at limit
- [ ] Create button disabled when at limit
