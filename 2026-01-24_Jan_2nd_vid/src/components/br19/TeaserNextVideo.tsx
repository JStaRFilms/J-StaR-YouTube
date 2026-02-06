import React from 'react';
import { AbsoluteFill, Sequence, useVideoConfig } from 'remotion';
import { z } from 'zod';
import { VoidBackground } from './VoidBackground';
import { MockupScene } from './MockupScene';
import { QuestionScene } from './QuestionScene';
import { TransformationScene } from './TransformationScene';
import { CtaScene } from './CtaScene';

// Zod Schema
export const TeaserNextVideoSchema = z.object({
    mockupSrc: z.string().optional(), // kept for compatibility but unused
    appPreviewSrc: z.string().optional(),
    ctaText: z.string().default("Watch next →"),
    nextVideoTitle: z.string().default("From Mockup to Deployed App"),
});

export const TeaserNextVideo: React.FC = () => {
    const { fps, durationInFrames } = useVideoConfig();

    // Timeline:
    // 0s - 1.5s: Mockup Scene (45 frames)
    // 1.5s - 2.5s: Question Scene (30 frames)
    // 2.5s - 4.5s: Transformation Scene (60 frames)
    // 4.5s - 5.0s: CTA Scene (15 frames)

    const SCENE_1_DURATION = 90; // Extend mockups presence
    const SCENE_2_START = 45;
    const SCENE_3_START = 75;
    const SCENE_4_START = 135;

    return (
        <AbsoluteFill style={{ background: '#000' }}>
            <VoidBackground />

            {/* Scene 1: Mockup - Stays visible but shrinks/moves in later scenes handling */}
            <Sequence from={0} durationInFrames={durationInFrames} premountFor={1 * fps}>
                <MockupScene />
                {/* Note: MockupScene handles its own internal exit/shrink via component prop logic if needed, 
             or we rely on overlaying scenes. For now, we keep it simple. */}
            </Sequence>

            {/* Scene 2: Question */}
            <Sequence from={SCENE_2_START} durationInFrames={SCENE_3_START - SCENE_2_START + 20} premountFor={1 * fps}>
                <QuestionScene />
            </Sequence>

            {/* Scene 3: Transformation */}
            <Sequence from={SCENE_3_START} durationInFrames={durationInFrames - SCENE_3_START} premountFor={1 * fps}>
                <TransformationScene />
            </Sequence>

            {/* Scene 4: CTA */}
            <Sequence from={SCENE_4_START} durationInFrames={durationInFrames - SCENE_4_START} premountFor={1 * fps}>
                <CtaScene />
            </Sequence>

        </AbsoluteFill>
    );
};
