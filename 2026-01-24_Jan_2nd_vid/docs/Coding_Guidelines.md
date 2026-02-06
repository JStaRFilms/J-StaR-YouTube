# YouTube Content Engine - Coding Guidelines

> **Project:** YouTube Content Engine (YCE)
> **Tech Stack:** Next.js 14, TypeScript, Tailwind, Prisma, Neon, Better Auth, Paystack, OpenRouter + Vercel AI SDK

---

## The Blueprint and Build Protocol (Mandatory)

This protocol governs the entire lifecycle of creating any non-trivial feature.

### Phase 1: The Blueprint (Planning & Documentation)
Before writing code, a plan MUST be created in `docs/features/FeatureName.md`. This plan must detail:
- High-Level Goal
- Component Breakdown (label "Server" or "Client")
- Logic & Data Breakdown (hooks, API routes)
- Database Schema Changes (if any)
- Step-by-Step Implementation Plan

**This plan requires human approval before proceeding.**

### Phase 2: The Build (Iterative Implementation)
Execute the plan one step at a time. Present code AND updated documentation after each step.
Wait for "proceed" signal before continuing.

### Phase 3: Finalization
Announce completion. Present final documentation. Provide integration instructions.

---

## Project Structure

```
youtube-content-engine/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── (auth)/             # Auth routes
│   │   ├── (dashboard)/        # Protected dashboard routes
│   │   │   ├── projects/       # Project list & detail
│   │   │   ├── new/            # New project wizard
│   │   │   └── settings/       # User settings
│   │   ├── api/                # API routes
│   │   │   ├── projects/       # CRUD
│   │   │   ├── generate/       # AI generation endpoints
│   │   │   └── webhooks/       # Stripe webhooks
│   │   └── layout.tsx
│   ├── components/
│   │   ├── ui/                 # shadcn/ui components
│   │   └── features/           # Feature-specific components
│   │       ├── projects/
│   │       ├── wizard/
│   │       └── phases/
│   ├── lib/
│   │   ├── db.ts               # Prisma client
│   │   ├── paystack.ts          # Paystack config
│   │   └── ai/                 # AI generation logic
│   │       ├── provider.ts     # Universal model config
│   │       ├── prompts/        # Prompt templates
│   │       ├── strategy.ts
│   │       ├── packaging.ts
│   │       ├── scripting.ts
│   │       ├── shorts.ts
│   │       ├── production.ts
│   │       └── distribution.ts
│   ├── hooks/                  # Custom React hooks
│   ├── types/                  # TypeScript types
│   └── utils/                  # Utility functions
├── prisma/
│   ├── schema.prisma
│   └── seed.ts
├── docs/
│   ├── Project_Requirements.md
│   ├── Coding_Guidelines.md
│   ├── Builder_Prompt.md
│   ├── features/
│   └── issues/
└── public/
```

---

## Next.js App Router Standards

### Server Components First
All components are React Server Components (RSC) by default.

```tsx
// ✅ Good - Server Component by default
async function ProjectList() {
  const projects = await getProjects();
  return <div>{projects.map(p => <ProjectCard key={p.id} project={p} />)}</div>;
}

// ❌ Bad - Unnecessary client directive
'use client';
function ProjectList() { ... }
```

### Client Components Sparingly
Only use `'use client'` for:
- Interactivity (`onClick`, `onChange`, `onSubmit`)
- Browser APIs (`localStorage`, `window`)
- React hooks (`useState`, `useEffect`)

```tsx
// ✅ Good - Client only when needed
'use client';

function TitleSelector({ titles, onSelect }: Props) {
  const [selected, setSelected] = useState<string | null>(null);
  
  return (
    <RadioGroup value={selected} onValueChange={setSelected}>
      {titles.map(t => <RadioItem key={t.id} value={t.id}>{t.text}</RadioItem>)}
    </RadioGroup>
  );
}
```

### Data Fetching
Fetch in Server Components. Pass data down as props.

```tsx
// ✅ Good - Fetch in RSC
async function ProjectPage({ params }: { params: { id: string } }) {
  const project = await getProject(params.id);
  return <ProjectView project={project} />;
}

// ❌ Bad - Fetching in client with useEffect
'use client';
function ProjectPage({ params }) {
  const [project, setProject] = useState(null);
  useEffect(() => { fetchProject(params.id).then(setProject); }, []);
}
```

---

## API Route Handlers

### Pattern: Thin Controllers
Route handlers should be thin. Move logic to services.

```tsx
// src/app/api/projects/route.ts
import { createProject, getProjects } from '@/lib/services/project.service';

export async function GET() {
  const user = await getAuthUser();
  if (!user) return unauthorizedResponse();
  
  const projects = await getProjects(user.id);
  return NextResponse.json(projects);
}

export async function POST(req: Request) {
  const user = await getAuthUser();
  if (!user) return unauthorizedResponse();
  
  const body = await req.json();
  const validated = ProjectCreateSchema.parse(body);
  
  const project = await createProject(user.id, validated);
  return NextResponse.json(project, { status: 201 });
}
```

### Service Layer
Business logic lives in services.

```tsx
// src/lib/services/project.service.ts
import { prisma } from '@/lib/db';
import { ProjectCreateInput } from '@/types';

export async function createProject(userId: string, data: ProjectCreateInput) {
  return prisma.project.create({
    data: {
      userId,
      title: data.title,
      niche: data.niche,
      status: 'DRAFT',
    },
  });
}
```

---

## AI Generation Pattern

### Universal Provider Configuration
Configure all AI models in a single file for easy swapping.

```tsx
// src/lib/ai/provider.ts
import { createOpenRouter } from '@openrouter/ai-sdk-provider';

export const openrouter = createOpenRouter({
  apiKey: process.env.OPENROUTER_API_KEY!,
});

// Model configuration - easy to swap
export const models = {
  // Default model for most generation
  default: openrouter('openai/gpt-oss-120b'),
  
  // Specific models for specific tasks (future flexibility)
  titles: openrouter('openai/gpt-oss-120b'),
  scripts: openrouter('openai/gpt-oss-120b'),
  thumbnails: openrouter('openai/gpt-oss-120b'),
  
  // Fast model for simple tasks
  fast: openrouter('openai/gpt-4o-mini'),
} as const;
```

### Prompt Templates
Store prompts as template strings with placeholders.

```tsx
// src/lib/ai/prompts/titles.ts
export const TITLE_GENERATION_PROMPT = `
You are a YouTube title engineer. Generate 10 title variants using these archetypes:
1. The Open Loop
2. The Counterintuitive
3. The Secret
...

Topic: {{topic}}
Niche: {{niche}}
Avatar: {{avatar}}

Output as JSON array:
[{ "archetype": "Open Loop", "title": "...", "reasoning": "..." }]
`;
```

### Generation Service with Vercel AI SDK
Use `generateText` or `streamText` from Vercel AI SDK.

```tsx
// src/lib/ai/packaging.ts
import { generateText } from 'ai';
import { models } from './provider';
import { TITLE_GENERATION_PROMPT } from './prompts/titles';

interface TitleOption {
  archetype: string;
  title: string;
  reasoning: string;
}

export async function generateTitles(
  topic: string,
  niche: string,
  avatar: AvatarDefinition
): Promise<TitleOption[]> {
  const prompt = TITLE_GENERATION_PROMPT
    .replace('{{topic}}', topic)
    .replace('{{niche}}', niche)
    .replace('{{avatar}}', JSON.stringify(avatar));

  const { text } = await generateText({
    model: models.titles,
    prompt,
  });

  return JSON.parse(text) as TitleOption[];
}
```

### Streaming for Long Content
Use streaming for script generation (better UX).

```tsx
// src/lib/ai/scripting.ts
import { streamText } from 'ai';
import { models } from './provider';

export async function streamScript(prompt: string) {
  const result = await streamText({
    model: models.scripts,
    prompt,
  });

  return result.toTextStreamResponse();
}
```
```

---

## Database Schema

```prisma
// prisma/schema.prisma

model User {
  id            String    @id @default(cuid())
  email         String    @unique
  name          String?
  avatar        String?
  subscription  Subscription?
  projects      Project[]
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
}

model Subscription {
  id              String   @id @default(cuid())
  userId          String   @unique
  user            User     @relation(fields: [userId], references: [id])
  plan            Plan     @default(FREE)
  paystackCustomerId String?
  paystackSubCode    String?
  currentPeriodEnd DateTime?
  createdAt       DateTime @default(now())
}

enum Plan {
  FREE
  PRO
  AGENCY
}

model Project {
  id          String   @id @default(cuid())
  userId      String
  user        User     @relation(fields: [userId], references: [id])
  title       String
  niche       String?
  status      ProjectStatus @default(DRAFT)
  currentPhase Phase    @default(STRATEGY)
  
  // Phase outputs stored as JSON
  strategyOutput    Json?
  packagingOutput   Json?
  scriptingOutput   Json?
  shortsOutput      Json?
  productionOutput  Json?
  distributionOutput Json?
  
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}

enum ProjectStatus {
  DRAFT
  IN_PROGRESS
  COMPLETED
  ARCHIVED
}

enum Phase {
  STRATEGY
  PACKAGING
  SCRIPTING
  SHORTS
  PRODUCTION
  DISTRIBUTION
}
```

---

## Validation with Zod

All inputs must be validated.

```tsx
// src/types/project.ts
import { z } from 'zod';

export const ProjectCreateSchema = z.object({
  title: z.string().min(1).max(200),
  niche: z.string().optional(),
});

export const AvatarSchema = z.object({
  who: z.string().min(10),
  objection: z.string().min(10),
  stakes: z.string().min(10),
  transformation: z.string().min(10),
});

export type ProjectCreateInput = z.infer<typeof ProjectCreateSchema>;
export type AvatarDefinition = z.infer<typeof AvatarSchema>;
```

---

## Error Handling

### API Routes
Use consistent error responses.

```tsx
// src/lib/api-utils.ts
export function errorResponse(message: string, status: number = 400) {
  return NextResponse.json({ error: message }, { status });
}

export function unauthorizedResponse() {
  return errorResponse('Unauthorized', 401);
}

export function notFoundResponse(resource: string) {
  return errorResponse(`${resource} not found`, 404);
}
```

### Try-Catch Pattern
Wrap AI calls and external services.

```tsx
try {
  const titles = await generateTitles(topic, niche, avatar);
  return NextResponse.json({ titles });
} catch (error) {
  console.error('Title generation failed:', error);
  return errorResponse('Failed to generate titles', 500);
}
```

---

## Testing Requirements

### Type Checking
Run before every PR:
```bash
npx tsc --noEmit
```

### Linting
```bash
npm run lint
```

### Unit Tests (Future)
```bash
npm test
```

---

## UI Components

### Use shadcn/ui
All UI primitives come from shadcn/ui.

```bash
npx shadcn-ui@latest add button card dialog
```

### Feature Components
Complex features get their own components.

```tsx
// src/components/features/wizard/PhaseCard.tsx
interface PhaseCardProps {
  phase: Phase;
  status: 'pending' | 'active' | 'completed';
  onClick: () => void;
}

export function PhaseCard({ phase, status, onClick }: PhaseCardProps) {
  return (
    <Card 
      className={cn(
        'cursor-pointer transition-all',
        status === 'active' && 'ring-2 ring-primary',
        status === 'completed' && 'opacity-60'
      )}
      onClick={onClick}
    >
      <CardHeader>
        <CardTitle>{phase}</CardTitle>
      </CardHeader>
    </Card>
  );
}
```

---

## Environment Variables

```env
# .env.local
DATABASE_URL=postgresql://...
OPENROUTER_API_KEY=sk-or-v1-...
PAYSTACK_SECRET_KEY=sk_live_...
PAYSTACK_PUBLIC_KEY=pk_live_...
BETTER_AUTH_SECRET=...
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

---

## Git Conventions

### Branch Naming
- `feature/FR-001-topic-input`
- `fix/title-generation-error`
- `chore/update-deps`

### Commit Messages
```
feat(packaging): add thumbnail prompt generation

- Implement FR-008
- Add template for Midjourney/DALL-E prompts
- Include style params and aspect ratio
```

---

## The 200-Line Rule

If a file approaches 200 lines, **STOP and refactor**:
- Extract hooks to `hooks/`
- Move UI to `components/`
- Move logic to `lib/services/`

---

## Pre-Delivery Checklist

Before merging any feature:
- [ ] `npx tsc --noEmit` passes
- [ ] `npm run lint` passes
- [ ] Feature doc updated in `docs/features/`
- [ ] No console.logs left in code
- [ ] Loading states implemented
- [ ] Error states handled
- [ ] Mobile responsive (if UI)
