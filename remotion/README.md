# Root Remotion Workspace

This is the shared root-level Remotion workspace for the YouTube monorepo.

## Purpose

- Keep Remotion work out of unrelated video-local app folders
- Store reusable Shorts and video compositions in one place
- Organize compositions by project slug so new videos can be added cleanly

## Structure

- `src/projects/<video-slug>/...`
- `src/shared/...`

## Current project

- `2026-03-01_march1`
  - three hype Shorts

## Commands

- `pnpm --filter @jstar/remotion-workspace studio`
- `pnpm --filter @jstar/remotion-workspace type-check`
