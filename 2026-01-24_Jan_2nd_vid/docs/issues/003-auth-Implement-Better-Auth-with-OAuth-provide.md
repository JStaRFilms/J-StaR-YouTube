## Title
[Auth] Implement Better Auth with OAuth providers

## Labels
`MUS`, `enhancement`, `auth`, `FR-100`

## User Story
As a user, I want to sign up and login with Google or email/password, so my projects are private and secure.

## Proposed Solution
1. Configure Better Auth in `src/lib/auth.ts`
2. Add Google OAuth provider
3. Add email/password authentication
4. Create auth routes:
   - `/login` - Login page
   - `/signup` - Signup page
   - `/api/auth/*` - Auth API routes
5. Create auth middleware for protected routes
6. Add session provider to layout

## Acceptance Criteria
- [ ] Google OAuth login flow works end-to-end
- [ ] Email/password signup creates user in database
- [ ] Email/password login authenticates existing user
- [ ] Session persists across page refreshes
- [ ] Logout clears session and redirects to login
- [ ] Protected routes redirect unauthenticated users to /login
- [ ] User object available in server components
