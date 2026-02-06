## Title
[Setup] Define Prisma schema and run migrations

## Labels
`MUS`, `enhancement`, `database`

## User Story
As a developer, I want the database schema defined, so I can store users, projects, and subscriptions.

## Proposed Solution
1. Create `prisma/schema.prisma` with models:
   - `User` (id, email, name, avatar, createdAt, updatedAt)
   - `Subscription` (id, userId, plan, stripeCustomerId, stripeSubId, currentPeriodEnd)
   - `Project` (id, userId, title, niche, status, currentPhase, phaseOutputs as JSON)
2. Define enums: `Plan`, `ProjectStatus`, `Phase`
3. Configure Neon connection string
4. Run `npx prisma migrate dev`
5. Generate Prisma client

## Acceptance Criteria
- [ ] Schema file created with all models
- [ ] Enums defined: Plan (FREE/PRO/AGENCY), ProjectStatus (DRAFT/IN_PROGRESS/COMPLETED/ARCHIVED), Phase (STRATEGY/PACKAGING/SCRIPTING/SHORTS/PRODUCTION/DISTRIBUTION)
- [ ] Migration runs successfully
- [ ] Prisma client generated
- [ ] `npx prisma studio` shows empty tables
