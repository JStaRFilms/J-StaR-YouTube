# 🎬 Video Spec: Anniversary Gift (Pro Max)

## Overview
| Property | Value |
|----------|-------|
| **Type** | High-Energy Animation / Gift |
| **Duration** | 15 seconds (450 frames @ 30fps) |
| **Resolution** | 1080x1920 (Portrait) |
| **FPS** | 30 |
| **Name** | Jenny (John + Enny) |

## Changes from V1
- [x] **Name**: Switched to "Jenny".
- [x] **Vibe**: Upgraded from "Cute" to "Dynamic/Energetic".
- [x] **Transitions**: Added `TransitionWipe` (Slide) between scenes.
- [x] **Visuals**: Added `Sparkles` particles, 3D Ring rotation, Gradient backgrounds.

## Scene Breakdown (Revised)

### Scene 1: The Spark (0s - 5s)
- **Action**: Avatars slam in. Connection pulses. Chat bubbles fire rapidly.
- **Juice**: Camera shake on impact. Sparkles.
- **Transition**: Blue Wipe (John's color) to Scene 2.

### Scene 2: The Journey (5s - 10s)
- **Action**: "Growing Closer" title. Multiple Calendar years flying by. Heart meter fills instantly.
- **Juice**: Tilted angles (rotate -5deg, 5deg). Pop-art shadows.
- **Transition**: Pink Wipe (Primary color) UP to Scene 3.

### Scene 3: The Proposal (10s - 15s)
- **Action**: Ring spins in 3D. "Forever to go" text glows. Name morphs to "Jenny".
- **Juice**: Radial gradient background. Diamond flash effect.

## Technical Components
- `TransitionWipe.tsx`: Reusable wipe overlay.
- `Sparkles.tsx`: Random particle generator.
- `Ring.tsx`: SVG with 3D rotation transform.
