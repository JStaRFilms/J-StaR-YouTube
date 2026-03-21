import React from 'react';
import { Sequence, useVideoConfig, useCurrentFrame } from 'remotion';
import { AbstractMeshBackgroundV3 } from './AbstractMeshBackgroundV3';
import { HookTextV3 } from './HookTextV3';
import { GlassyUICardV3 } from './GlassyUICardV3';
import { GlitchEffectV3 } from './GlitchEffectV3';
import { ShatteredCodeV3 } from './ShatteredCodeV3';
import { ErrorModalCascadeV3 } from './ErrorModalCascadeV3';
import { PulseProgressBarV3 } from './PulseProgressBarV3';
import { FinishTheJobV3 } from './FinishTheJobV3';

export const ScenesV3: React.FC = () => {
    const { fps } = useVideoConfig();
    const frame = useCurrentFrame();

    return (
        <React.Fragment>
            {/* Background runs for the entire video */}
            <Sequence from={0} durationInFrames={1350} premountFor={1 * fps}>
                <AbstractMeshBackgroundV3 />
            </Sequence>

            {/* Scene 1: The Hook Text (0-8s) */}
            <Sequence from={0} durationInFrames={9 * fps} premountFor={1 * fps}>
                <HookTextV3 />
            </Sequence>

            {/* The Glassy UI Card appears in Scene 1 and stays during Scene 2 but glitches heavily */}
            <Sequence from={0} durationInFrames={25 * fps} premountFor={1 * fps}>
                <GlitchEffectV3 active={frame > 8.5 * fps}>
                    <GlassyUICardV3 />
                </GlitchEffectV3>
            </Sequence>

            {/* Scene 2 Elements (Code drops at 11s, Modals cascade at 16s) */}
            <Sequence from={11 * fps} durationInFrames={15 * fps} premountFor={1 * fps}>
                <ShatteredCodeV3 />
            </Sequence>
            
            <Sequence from={16 * fps} durationInFrames={10 * fps} premountFor={1 * fps}>
                <ErrorModalCascadeV3 />
            </Sequence>

            {/* Scene 3: The 90/10 Rule (Wipes everything at 26s exactly) */}
            <Sequence from={26 * fps} durationInFrames={10 * fps} premountFor={1 * fps}>
                <PulseProgressBarV3 />
            </Sequence>

            {/* Scene 4: The Final CTA (36s - 45s) */}
            <Sequence from={36 * fps} durationInFrames={9 * fps} premountFor={1 * fps}>
                <FinishTheJobV3 />
            </Sequence>
        </React.Fragment>
    );
};
