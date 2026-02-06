import { AbsoluteFill, Sequence, interpolate, useCurrentFrame, useVideoConfig } from 'remotion';
import { z } from 'zod';
import { InstructionsSide } from './InstructionsSide';
import { KnowledgeSide } from './KnowledgeSide';
import { VsDivider } from './VsDivider';

export const InstructionsVsKnowledgeSchema = z.object({
    instructions: z.array(z.string()).default([
        "Use Inter font",
        "Hex #3b82f6",
        "16px padding",
        "border-radius: 8px",
        "width: 100%"
    ]),
    knowledgeConcepts: z.array(z.string()).default([
        "Typography Theory",
        "Color Psychology",
        "UX Patterns",
        "Visual Hierarchy",
        "Brand Identity"
    ]),
});

export const InstructionsVsKnowledge: React.FC<z.infer<typeof InstructionsVsKnowledgeSchema>> = ({
    instructions,
    knowledgeConcepts
}) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    // Animation Timings
    const instructionsStart = 0;
    const vsStart = 2.5 * fps; // 2.5s
    const knowledgeStart = 3.5 * fps; // 3.5s
    const revelationStart = 6.5 * fps; // 6.5s

    // Revelation Effect
    // At the end, Knowledge expends and Instructions fades out
    const revealProgress = interpolate(frame, [revelationStart, revelationStart + 1 * fps], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

    const instructionsOpacity = interpolate(revealProgress, [0, 1], [1, 0.2]);
    const instructionsScale = interpolate(revealProgress, [0, 1], [1, 0.8]);

    const knowledgeScale = interpolate(revealProgress, [0, 1], [1, 1.3]);
    const knowledgeX = interpolate(revealProgress, [0, 1], [0, -25]); // Move to center (it's at 25% offset relative to right half, so -25% of screen width?)
    // Actually, let's just scale it up and centering handles itself if we structure the layout right.
    // The layout is split screen.

    return (
        <AbsoluteFill style={{ backgroundColor: '#020617' }}>

            {/* Left Side: Instructions */}
            <AbsoluteFill style={{
                width: '50%',
                right: '50%',
                overflow: 'hidden',
                opacity: instructionsOpacity,
                transform: `scale(${instructionsScale})`,
                zIndex: 1
            }}>
                <Sequence from={instructionsStart} premountFor={30}>
                    <InstructionsSide instructions={instructions} />
                </Sequence>
            </AbsoluteFill>

            {/* Right Side: Knowledge */}
            <AbsoluteFill style={{
                width: '50%',
                left: '50%',
                overflow: 'visible', // Allow brain to pop out
                zIndex: revealProgress > 0 ? 100 : 2
            }}>
                <Sequence from={knowledgeStart} premountFor={30}>
                    <div style={{
                        width: '100%',
                        height: '100%',
                        transform: `scale(${knowledgeScale}) translateX(${interpolate(revealProgress, [0, 1], [0, -50])}%)`, // Move left to center screen
                        transformOrigin: 'center center',
                    }}>
                        <KnowledgeSide concepts={knowledgeConcepts} />
                    </div>
                </Sequence>
            </AbsoluteFill>

            {/* Center: VS Divider */}
            <Sequence from={vsStart} durationInFrames={knowledgeStart - vsStart + 1.5 * fps} premountFor={30}>
                {/* Keep VS visible for a bit into knowledge section then fade */}
                <div style={{ opacity: interpolate(frame, [knowledgeStart, knowledgeStart + 20], [1, 0]) }}>
                    <VsDivider />
                </div>
            </Sequence>

            {/* Final Text Overlay */}
            <Sequence from={revelationStart} premountFor={30}>
                <div style={{
                    position: 'absolute',
                    bottom: 100,
                    width: '100%',
                    textAlign: 'center',
                    opacity: interpolate(frame, [revelationStart, revelationStart + 20], [0, 1])
                }}>
                    <h1 style={{
                        fontFamily: 'Inter, sans-serif',
                        fontSize: 60,
                        color: 'white',
                        textShadow: '0 4px 20px rgba(0,0,0,0.5)'
                    }}>
                        Teach AI <span style={{ color: '#fbbf24', fontSize: '1.2em' }}>HOW</span> to think
                    </h1>
                </div>
            </Sequence>

        </AbsoluteFill>
    );
};
