import React from 'react';
import { AbsoluteFill, Sequence, useVideoConfig } from 'remotion';
import { Scene1_Comparison } from './Scene1_Comparison';
import { Scene2_Terminal } from './Scene2_Terminal';
import { Scene3_Typing } from './Scene3_Typing';
import { Scene4_Morph } from './Scene4_Morph';
import { Scene5_Directory } from './Scene5_Directory';

// Safe zone constants for 1080x1920 (9:16) format
const VIDEO_HEIGHT = 1920;
const SAFE_ZONE_PERCENT = 0.20; // 20% at bottom
const SAFE_ZONE_HEIGHT = VIDEO_HEIGHT * SAFE_ZONE_PERCENT; // 384px
const CONTENT_AREA_HEIGHT = VIDEO_HEIGHT - SAFE_ZONE_HEIGHT; // 1536px

// Dark background color - premium near-black with subtle blue tint
const DARK_BG_COLOR = '#0A0A0F'; // Near black with slight blue tint

export const Topic_Short_2_Quick_Win: React.FC = () => {
    const { fps } = useVideoConfig();

    // Scene durations (in frames)
    // Total: ~16 seconds = 480 frames @ 30fps
    const SCENE_1_DURATION = 4 * fps;  // 0:00-0:04 (120 frames)
    const SCENE_2_DURATION = 2 * fps;  // 0:04-0:06 (60 frames)
    const SCENE_3_DURATION = 5 * fps;  // 0:06-0:11 (150 frames)
    const SCENE_4_DURATION = 3 * fps;  // 0:11-0:14 (90 frames)
    const SCENE_5_DURATION = 3 * fps;  // 0:14-End (90 frames)

    // Calculate start times
    const SCENE_2_START = SCENE_1_DURATION;
    const SCENE_3_START = SCENE_2_START + SCENE_2_DURATION;
    const SCENE_4_START = SCENE_3_START + SCENE_3_DURATION;
    const SCENE_5_START = SCENE_4_START + SCENE_4_DURATION;

    return (
        <AbsoluteFill style={{ backgroundColor: DARK_BG_COLOR }}>
            {/* SCENE 1: Side-by-Side Comparison (0:00-0:04) */}
            <Sequence
                from={0}
                durationInFrames={SCENE_1_DURATION}
                premountFor={1 * fps}
            >
                <Scene1_Comparison />
            </Sequence>

            {/* SCENE 2: Terminal/Code Editor Zoom (0:04-0:06) */}
            <Sequence
                from={SCENE_2_START}
                durationInFrames={SCENE_2_DURATION}
                premountFor={1 * fps}
            >
                <Scene2_Terminal />
            </Sequence>

            {/* SCENE 3: Typing Animation (0:06-0:11) */}
            <Sequence
                from={SCENE_3_START}
                durationInFrames={SCENE_3_DURATION}
                premountFor={1 * fps}
            >
                <Scene3_Typing />
            </Sequence>

            {/* SCENE 4: Screen Shake + Morph (0:11-0:14) */}
            <Sequence
                from={SCENE_4_START}
                durationInFrames={SCENE_4_DURATION}
                premountFor={1 * fps}
            >
                <Scene4_Morph />
            </Sequence>

            {/* SCENE 5: File Directory + CTA (0:14-End) */}
            <Sequence
                from={SCENE_5_START}
                durationInFrames={SCENE_5_DURATION}
                premountFor={1 * fps}
            >
                <Scene5_Directory />
            </Sequence>

            {/* Safe Zone - subtle dark overlay at bottom 20% (no text/patterns) */}
            <div
                style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: `${SAFE_ZONE_HEIGHT}px`,
                    backgroundColor: 'rgba(0, 0, 0, 0.15)',
                    pointerEvents: 'none',
                    zIndex: 1000,
                }}
            />
        </AbsoluteFill>
    );
};
