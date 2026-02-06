import React from 'react';
import { AbsoluteFill, Sequence } from 'remotion';
import { z } from 'zod';
import { Scene1_Hook } from './scenes/Scene1_Hook';
import { Scene2_Problem } from './scenes/Scene2_Problem';
import { Scene3_Confusion } from './scenes/Scene3_Confusion';
import { Scene3_Solution } from './scenes/Scene3_Solution';
import { Scene4_Result } from './scenes/Scene4_Result';

export const TopicShort1Schema = z.object({
    theme: z.enum(['light']).default('light'),
});

export const TopicShort1Composition: React.FC<z.infer<typeof TopicShort1Schema>> = ({
    theme,
}) => {
    return (
        <AbsoluteFill style={{ backgroundColor: '#FFFFFF' }}>
            <Sequence durationInFrames={90}>
                <Scene1_Hook />
            </Sequence>
            <Sequence from={90} durationInFrames={90}>
                <Scene2_Problem />
            </Sequence>
            {/* Scene 3 (0:06-0:10 = 4s = 120f) */}
            <Sequence from={180} durationInFrames={120}>
                <Scene3_Confusion />
            </Sequence>
            {/* Scene 3.5 (0:10-0:14 = 4s = 120f) */}
            <Sequence from={300} durationInFrames={120}>
                <Scene3_Solution />
            </Sequence>
            {/* Scene 4 (0:14-0:20 = 6s = 180f) */}
            <Sequence from={420} durationInFrames={180}>
                <Scene4_Result />
            </Sequence>
        </AbsoluteFill>
    );
};
