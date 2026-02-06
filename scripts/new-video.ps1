<#
.SYNOPSIS
    Create a new YouTube video project from template
.DESCRIPTION
    Scaffolds a new video project with CreativeOS folder structure and Remotion setup
.PARAMETER VideoName
    Human-readable name for the video (e.g., "Why Monorepos Win")
.EXAMPLE
    .\scripts\new-video.ps1 -VideoName "My Awesome Video"
#>

param(
    [Parameter(Mandatory=$true)]
    [string]$VideoName
)

# Generate slug with date prefix
$slug = (Get-Date -Format "yyyy-MM-dd") + "_" + ($VideoName -replace '\s+', '_')
$videoPath = "$slug"

Write-Host "🎬 Creating new video project: $slug" -ForegroundColor Cyan

# Create CreativeOS folder structure
New-Item -ItemType Directory -Path $videoPath -Force | Out-Null
New-Item -ItemType Directory -Path "$videoPath\00_Notes\Script" -Force | Out-Null
New-Item -ItemType Directory -Path "$videoPath\01_Footage\A-Roll" -Force | Out-Null
New-Item -ItemType Directory -Path "$videoPath\01_Footage\B-Roll" -Force | Out-Null
New-Item -ItemType Directory -Path "$videoPath\01_Footage\Screen" -Force | Out-Null
New-Item -ItemType Directory -Path "$videoPath\02_Assets" -Force | Out-Null
New-Item -ItemType Directory -Path "$videoPath\03_Resolve" -Force | Out-Null
New-Item -ItemType Directory -Path "$videoPath\04_Previews" -Force | Out-Null
New-Item -ItemType Directory -Path "$videoPath\99_Archive" -Force | Out-Null
New-Item -ItemType Directory -Path "$videoPath\src" -Force | Out-Null
New-Item -ItemType Directory -Path "$videoPath\public" -Force | Out-Null

# Create package.json
$packageJson = @"
{
  "name": "@jstar/$($slug.ToLower())",
  "version": "0.0.0",
  "private": true,
  "scripts": {
    "dev": "remotion studio src/index.tsx",
    "render": "remotion render src/index.tsx Main out/video.mp4",
    "studio": "remotion studio",
    "build": "echo 'No build needed for Remotion project'",
    "lint": "eslint src/",
    "type-check": "tsc --noEmit"
  },
  "dependencies": {
    "@jstar/remotion-shared": "workspace:*"
  },
  "devDependencies": {
    "@jstar/tsconfig": "workspace:*",
    "@jstar/eslint-config": "workspace:*"
  }
}
"@

Set-Content -Path "$videoPath\package.json" -Value $packageJson

# Create project metadata
$projectMeta = @"
{
  "title": "$VideoName",
  "slug": "$slug",
  "created": "$(Get-Date -Format 'yyyy-MM-ddTHH:mm:ss')",
  "type": "youtube-video",
  "status": "planning"
}
"@

Set-Content -Path "$videoPath\.project_meta.json" -Value $projectMeta

# Create tsconfig.json
$tsconfig = @"
{
  "extends": "@jstar/tsconfig/remotion.json",
  "compilerOptions": {
    "outDir": "dist",
    "rootDir": "src"
  },
  "include": ["src"]
}
"@

Set-Content -Path "$videoPath\tsconfig.json" -Value $tsconfig

# Create Remotion index
$remotionIndex = @"
import { Composition } from 'remotion';
import { Main } from './Main';

export const RemotionRoot: React.FC = () => {
  return (
    <Composition
      id="Main"
      component={Main}
      durationInFrames={300}
      fps={30}
      width={1920}
      height={1080}
    />
  );
};
"@

Set-Content -Path "$videoPath\src\index.tsx" -Value $remotionIndex

# Create Main component
$mainComponent = @"
import React from 'react';
import { AbsoluteFill, Sequence } from 'remotion';
import { Intro } from '@jstar/remotion-shared';

export const Main: React.FC = () => {
  return (
    <AbsoluteFill>
      <Sequence from={0} durationInFrames={90}>
        <Intro title="$VideoName" />
      </Sequence>
      {/* Add more sequences here */}
    </AbsoluteFill>
  );
};
"@

Set-Content -Path "$videoPath\src\Main.tsx" -Value $mainComponent

Write-Host "✅ Project created successfully!" -ForegroundColor Green
Write-Host ""
Write-Host "📁 Location: $videoPath" -ForegroundColor Yellow
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Cyan
Write-Host "  1. cd $slug"
Write-Host "  2. pnpm install"
Write-Host "  3. pnpm dev"
