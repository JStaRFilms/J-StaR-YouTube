import React from 'react';
import { AbsoluteFill, Sequence, useVideoConfig } from 'remotion';
import { Scene1_InvoiceBrain } from './Scene1_InvoiceBrain';
import { Scene2_ClockProgress } from './Scene2_ClockProgress';
import { Scene3_Montage } from './Scene3_Montage';
import { Scene4_SliderWipe } from './Scene4_SliderWipe';
import { Scene5_SavingsCTA } from './Scene5_SavingsCTA';

// Safe zone constants for 1080x1920 (9:16) format
const VIDEO_HEIGHT = 1920;
const SAFE_ZONE_PERCENT = 0.20; // 20% at bottom
const SAFE_ZONE_HEIGHT = VIDEO_HEIGHT * SAFE_ZONE_PERCENT; // 384px
const CONTENT_AREA_HEIGHT = VIDEO_HEIGHT - SAFE_ZONE_HEIGHT; // 1536px

// Light background color - soft white
const LIGHT_BG_COLOR = '#F8FAFC';

export const Topic_Short_3_Story_Hook_500_Designer_Vs_Ai: React.FC = () => {
    const { fps } = useVideoConfig();

    // Scene durations (in frames) - Total: 600 frames (20 seconds @ 30fps)
    // Scene 1: 0-150 frames (5s) - Invoice → Red X → Brain
    // Scene 2: 150-270 frames (4s) - Clock + Progress
    // Scene 3: 270-420 frames (5s) - Montage
    // Scene 4: 420-510 frames (3s) - Slider Wipe
    // Scene 5: 510-600 frames (3s) - Savings + CTA

    const SCENE_1_DURATION = 5 * fps;  // 0:00-0:05 (150 frames)
    const SCENE_2_DURATION = 4 * fps;  // 0:05-0:09 (120 frames)
    const SCENE_3_DURATION = 5 * fps;  // 0:09-0:14 (150 frames)
    const SCENE_4_DURATION = 3 * fps;  // 0:14-0:17 (90 frames)
    const SCENE_5_DURATION = 3 * fps;  // 0:17-0:20 (90 frames)

    // Calculate start times
    const SCENE_2_START = SCENE_1_DURATION;
    const SCENE_3_START = SCENE_2_START + SCENE_2_DURATION;
    const SCENE_4_START = SCENE_3_START + SCENE_3_DURATION;
    const SCENE_5_START = SCENE_4_START + SCENE_4_DURATION;

    return (
        <AbsoluteFill style={{ backgroundColor: LIGHT_BG_COLOR }}>
            {/* SCENE 1: Invoice Hook - $500/N750,000 (0:00-0:05) */}
            <Sequence
                from={0}
                durationInFrames={SCENE_1_DURATION}
                premountFor={1 * fps}
            >
                <Scene1_InvoiceBrain />
            </Sequence>

            {/* SCENE 2: Time Passage + System Build (0:05-0:09) */}
            <Sequence
                from={SCENE_2_START}
                durationInFrames={SCENE_2_DURATION}
                premountFor={1 * fps}
            >
                <Scene2_ClockProgress />
            </Sequence>

            {/* SCENE 3: The Montage - Colors, Fonts, Spacing (0:09-0:14) */}
            <Sequence
                from={SCENE_3_START}
                durationInFrames={SCENE_3_DURATION}
                premountFor={1 * fps}
            >
                <Scene3_Montage />
            </Sequence>

            {/* SCENE 4: The Transformation - Slider Wipe (0:14-0:17) */}
            <Sequence
                from={SCENE_4_START}
                durationInFrames={SCENE_4_DURATION}
                premountFor={1 * fps}
            >
                <Scene4_SliderWipe />
            </Sequence>

            {/* SCENE 5: Savings + CTA (0:17-End) */}
            <Sequence
                from={SCENE_5_START}
                durationInFrames={SCENE_5_DURATION}
                premountFor={1 * fps}
            >
                <Scene5_SavingsCTA />
            </Sequence>

            {/* Safe Zone - subtle light overlay at bottom 20% (no text/patterns) */}
            <div
                style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: `${SAFE_ZONE_HEIGHT}px`,
                    backgroundColor: 'rgba(0, 0, 0, 0.02)',
                    pointerEvents: 'none',
                    zIndex: 1000,
                }}
            />
        </AbsoluteFill>
    );
};
