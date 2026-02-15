# Master Plan: Groq Whisper Transcription Tool

**Session ID:** orch-20260215-transcriber  
**Created:** 2026-02-15  
**Status:** In Progress

## Overview

Build a CLI transcription tool at `tools/transcriber/` that uses Groq's Whisper API to transcribe any audio/video file. Handles chunking, rate limiting, progress tracking, and resume support.

## Tasks

| #   | Task File                    | Status       | Assigned To | Dependencies |
| --- | ---------------------------- | ------------ | ----------- | ------------ |
| 1   | 01_scaffold.task.md          | ✅ Completed | /mode-code  | None         |
| 2   | 02_audio_module.task.md      | ✅ Completed | /mode-code  | Task 1       |
| 3   | 03_groq_module.task.md       | ✅ Completed | /mode-code  | Task 1       |
| 4   | 04_cli_orchestration.task.md | Pending      | /mode-code  | Tasks 2, 3   |
| 5   | 05_verify.task.md            | Pending      | /mode-debug | Task 4       |

## Dependency Graph

```
01_scaffold ──┬──► 02_audio_module ──┐
              │                      ├──► 04_cli_orchestration ──► 05_verify
              └──► 03_groq_module  ──┘
```

> Tasks 2 and 3 can run in **parallel** after Task 1 completes.

## Progress

- [x] Phase 1: Scaffold (Task 1)
- [x] Phase 2: Core Modules - Audio (Task 2)
- [x] Phase 2: Core Modules - Groq (Task 3)
- [ ] Phase 3: CLI Integration (Task 4)
- [ ] Phase 4: Verification (Task 5)

## Key Context

- **Workspace:** `C:\CreativeOS\01_Projects\Video\YouTube` (pnpm + Turborepo monorepo)
- **ffmpeg/ffprobe:** v8.0 installed and available on PATH
- **API:** Groq Whisper (`whisper-large-v3-turbo`), key goes in `tools/transcriber/.env`
- **Limits:** 20 req/min, 25MB/file, 7200 audio sec/hr
- **Strategy:** MP3 128kbps mono, 10-min chunks with 1-sec overlap
