# J-Star YouTube Monorepo

Production-ready monorepo for YouTube video projects using Remotion, pnpm workspaces, Turborepo caching, and CreativeOS structure.

## 🏗️ Structure

```
YouTube/
├── 2026-01-12_Antigravity/   # CreativeOS video project
├── 2026-01-24_Jan_2nd_vid/   # Remotion video project
├── 2026-02-06_Feb_1st_Vid/   # CreativeOS video project
├── packages/                 # Shared packages
│   ├── remotion-shared/      # Shared Remotion components
│   ├── tsconfig/             # Shared TypeScript configs
│   └── eslint-config/        # Shared ESLint rules
└── scripts/                  # Automation scripts
    ├── new-video.ps1
    └── clean-all.ps1
```

## 🚀 Quick Start

### Create a New Video

```powershell
# Create new project from template
.\scripts\new-video.ps1 -VideoName "My Awesome Video"

# Navigate to project
cd 2026-02-06_My_Awesome_Video

# Start Remotion studio
pnpm dev
```

## 📦 Workspace Commands

```powershell
# Work on a specific video
$env:VIDEO = "@jstar/2026-01-24_jan_2nd_vid"
pnpm dev                # Start Remotion studio
pnpm render             # Render final video

# Workspace-wide operations
pnpm install            # Install all dependencies
pnpm build              # Build all projects
pnpm lint               # Lint all projects
pnpm type-check  # TypeScript check all projects
pnpm format             # Format all code
pnpm clean              # Remove all node_modules
```

## 🎬 Project Structure (Per Video)

Each video project follows the CreativeOS structure:

```
2026-XX-XX_VideoName/
├── 00_Notes/           # Scripts, research, planning
│   └── Script/
├── 01_Footage/         # Raw video files (NOT in Git)
│   ├── A-Roll/
│   ├── B-Roll/
│   └── Screen/
├── 02_Assets/          # Graphics, music, SFX
├── 03_Resolve/         # DaVinci Resolve project files
├── 04_Previews/        # Draft renders
├── 99_Archive/         # Old versions
├── src/                # Remotion components
│   ├── index.tsx       # Remotion composition
│   └── Main.tsx        # Main video component
├── public/             # Static assets
├── package.json
└── tsconfig.json
```

## 🔧 Shared Components

Import shared components from `@jstar/remotion-shared`:

```typescript
import { Intro, Outro, Subscribe, Transition } from '@jstar/remotion-shared';

export const Main: React.FC = () => {
  return (
    <AbsoluteFill>
      <Sequence from={0} durationInFrames={90}>
        <Intro title="My Video Title" subtitle="Subtitle here" />
      </Sequence>
      {/* Your content */}
    </AbsoluteFill>
  );
};
```

## 📏 File Size Guidelines

**What's tracked in Git:**
- Source code (`.ts`, `.tsx`, `.js`)
- Configuration files
- Documentation (`.md`)
- Small assets (<10MB)

**What's excluded from Git:**
- Video files (`.mp4`, `.mov`, `.avi`) - **Local only**
- Audio files (`.wav`, `.aiff`)
- `node_modules`
- Build artifacts (`out/`, `dist/`)
- DaVinci Resolve project files

**Recommendation**: Store large footage files in cloud storage (Google Drive, Dropbox, etc.) and sync locally as needed.

## 🛠️ Troubleshooting

### Issue: `pnpm install` fails
**Solution**: Clean and reinstall.

```powershell
.\scripts\clean-all.ps1
pnpm install
```

### Issue: Can't import shared components
**Solution**: Ensure `@jstar/remotion-shared` is in dependencies with `workspace:*` protocol.

### Issue: GitHub push fails (file too large)
**Solution**: Verify `.gitignore` is excluding large files.

```powershell
git status --ignored
```

## 🎙️ Transcription Tool

A CLI tool for transcribing audio/video files using Groq's Whisper API.

```bash
# Setup
cd tools/transcriber
cp .env.example .env
# Add your GROQ_API_KEY in .env

# Usage (from root)
pnpm transcribe "path/to/video.mp4"
```

Features:
- **Smart Chunking**: Splits large files into 10-min chunks
- **Resume Capability**: `pnpm transcribe --resume "file.mp4"`
- **Rate Limiting**: Handles API limits automatically

[View full documentation](tools/transcriber/README.md)

## 📜 License

Private repository. All rights reserved.
