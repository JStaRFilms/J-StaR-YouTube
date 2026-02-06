## Title
[Setup] Initialize Next.js 14 project with core dependencies

## Labels
`MUS`, `enhancement`, `infrastructure`

## User Story
As a developer, I want the project scaffolded with all dependencies, so I can start building features immediately.

## Proposed Solution
1. Run `npx create-next-app@latest youtube-content-engine --typescript --tailwind --app`
2. Install core dependencies:
   - `prisma @prisma/client` (ORM)
   - `better-auth` (Authentication)
   - `paystack` (Payments)
   - `ai @openrouter/ai-sdk-provider` (AI via Vercel AI SDK + OpenRouter)
   - `zod` (Validation)
3. Initialize shadcn/ui: `npx shadcn-ui@latest init`
4. Configure TypeScript strict mode
5. Setup folder structure per Coding Guidelines
6. Create `src/lib/ai/provider.ts` with model configuration

## Acceptance Criteria
- [ ] Next.js 14 app runs on localhost:3000
- [ ] All dependencies installed and lock file committed
- [ ] Folder structure matches `src/app`, `src/components`, `src/lib` pattern
- [ ] TypeScript strict mode enabled in tsconfig.json
- [ ] shadcn/ui initialized with default theme
- [ ] ESLint configured and passing
- [ ] `provider.ts` created with OpenRouter + default model `openai/gpt-oss-120b`
