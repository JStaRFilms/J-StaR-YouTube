import React from 'react';
import { Series, Sequence, useCurrentFrame, useVideoConfig, AbsoluteFill } from 'remotion';
import { SplitScreenBeforeAfter } from './SplitScreenBeforeAfter';
import { GlitchText } from './GlitchText';
import { ScrollMontage } from './ScrollMontage';
import { WorkflowDiagram } from './WorkflowDiagram';
import { LinkInBioCTA } from './LinkInBioCTA';
import { ScrollIndicator } from './ScrollIndicator';
import { QualityBadge } from './QualityBadge';

const FPS = 30;
const HOOK_FRAMES = 150; // 0:00-0:05
const MEAT_FRAMES = 1350; // 0:05-0:50
const CTA_FRAMES = 300; // 0:50-0:60
const TOTAL_FRAMES = HOOK_FRAMES + MEAT_FRAMES + CTA_FRAMES; // 1800 frames (60 seconds)

export const ExtractShort1Result: React.FC = () => {
    const { fps } = useVideoConfig();

    return (
        <AbsoluteFill style={{ background: '#111827' }}>
            <Series>
                {/* Scene 1: HOOK - Split Screen Before/After (0:00-0:05) */}
                <Series.Sequence durationInFrames={HOOK_FRAMES} premountFor={1 * fps}>
                    <AbsoluteFill>
                        {/* Split screen background */}
                        <SplitScreenBeforeAfter beforeLabel="BEFORE" afterLabel="AFTER" />

                        {/* Glitch text overlay */}
                        <Sequence from={0} durationInFrames={HOOK_FRAMES} premountFor={1 * fps}>
                            <GlitchText text="SAME AI???" />
                        </Sequence>
                    </AbsoluteFill>
                </Series.Sequence>

                {/* Scene 2: MEAT - Project Montage Scroll (0:05-0:50) */}
                <Series.Sequence durationInFrames={MEAT_FRAMES} premountFor={1 * fps}>
                    <AbsoluteFill>
                        <ScrollMontage
                            cardDelays={[30, 120, 210, 300, 390, 480]}
                        />

                        {/* Quality badge */}
                        <Sequence from={60} durationInFrames={MEAT_FRAMES - 60} premountFor={1 * fps}>
                            <div style={{ position: 'absolute', top: '40px', right: '40px' }}>
                                <QualityBadge type="4K" delay={0} />
                            </div>
                        </Sequence>

                        <Sequence from={90} durationInFrames={MEAT_FRAMES - 90} premountFor={1 * fps}>
                            <div style={{ position: 'absolute', top: '40px', right: '180px' }}>
                                <QualityBadge type="PRO" delay={0} />
                            </div>
                        </Sequence>

                        {/* Scroll indicator */}
                        <ScrollIndicator direction="down" label="Scroll" />
                    </AbsoluteFill>
                </Series.Sequence>

                {/* Scene 3: CTA - Workflow Diagram + Link in Bio (0:50-End) */}
                <Series.Sequence durationInFrames={CTA_FRAMES} premountFor={1 * fps}>
                    <AbsoluteFill>
                        {/* Workflow diagram */}
                        <Sequence from={0} durationInFrames={180} premountFor={1 * fps}>
                            <WorkflowDiagram
                                steps={[
                                    { label: 'Input', icon: 'terminal' },
                                    { label: 'Process', icon: 'brain' },
                                    { label: 'Output', icon: 'palette' },
                                ]}
                            />
                        </Sequence>

                        {/* CTA with blur overlay */}
                        <Sequence from={180} durationInFrames={CTA_FRAMES - 180} premountFor={1 * fps}>
                            <LinkInBioCTA ctaText="Link in Bio" />
                        </Sequence>
                    </AbsoluteFill>
                </Series.Sequence>
            </Series>
        </AbsoluteFill>
    );
};

export default ExtractShort1Result;
