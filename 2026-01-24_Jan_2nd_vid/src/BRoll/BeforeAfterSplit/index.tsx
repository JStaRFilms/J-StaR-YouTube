import { AbsoluteFill, Sequence, useVideoConfig, spring, interpolate, useCurrentFrame } from 'remotion';
import { z } from 'zod';
import { UglyMockup } from './UglyMockup';
import { BeautifulMockup } from './BeautifulMockup';
import { GlowingDivider } from './GlowingDivider';

export const BeforeAfterSplitSchema = z.object({
    beforeLabel: z.string().default('BEFORE'),
    afterLabel: z.string().default('AFTER'),
    impactText: z.string().default('Same AI. Different Result.'),
});

export const BeforeAfterSplit: React.FC<z.infer<typeof BeforeAfterSplitSchema>> = ({
    beforeLabel,
    afterLabel,
    impactText,
}) => {
    const { fps } = useVideoConfig();
    const frame = useCurrentFrame();

    // Label animations
    const beforeLabelScale = spring({
        frame: frame - 20,
        fps,
        config: { damping: 20 },
        durationInFrames: 20,
    });
    const beforeLabelOpacity = interpolate(frame, [20, 40], [0, 1], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
    });

    const afterLabelScale = spring({
        frame: frame - 85,
        fps,
        config: { damping: 20 },
        durationInFrames: 20,
    });
    const afterLabelOpacity = interpolate(frame, [85, 105], [0, 1], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
    });

    // Impact text animation (120-140 frames)
    const impactScale = spring({
        frame: frame - 120,
        fps,
        config: { damping: 12 },
        durationInFrames: 20,
    });
    const impactOpacity = interpolate(frame, [120, 140], [0, 1], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
    });

    // Divider pulse during hold phase (105-150 frames)
    const dividerPulse = 1 + Math.sin(frame * 0.3) * 0.05;

    return (
        <AbsoluteFill style={{ backgroundColor: '#0a0a0f', overflow: 'hidden' }}>
            {/* Scene 1: Left Side Reveal (0s - 1.5s) */}
            <Sequence from={0} durationInFrames={1.5 * fps} premountFor={1 * fps}>
                <UglyMockup />
            </Sequence>

            {/* BEFORE Label */}
            <div
                style={{
                    position: 'absolute',
                    top: 40,
                    left: 40,
                    padding: '12px 24px',
                    backgroundColor: 'rgba(255, 107, 107, 0.2)',
                    border: '2px solid #ff6b6b',
                    borderRadius: 8,
                    opacity: beforeLabelOpacity,
                    transform: `scale(${0.8 + beforeLabelScale * 0.2})`,
                    zIndex: 10,
                }}
            >
                <span
                    style={{
                        fontFamily: 'Inter, system-ui, sans-serif',
                        fontSize: 18,
                        fontWeight: 700,
                        color: '#ff6b6b',
                        letterSpacing: '0.1em',
                    }}
                >
                    {beforeLabel}
                </span>
            </div>

            {/* Scene 2: Glowing Divider (1.5s - 2.5s) */}
            <Sequence from={1.5 * fps} durationInFrames={1 * fps} premountFor={1 * fps}>
                <GlowingDivider />
            </Sequence>

            {/* Scene 3: Right Side Reveal (2.5s - 4s) */}
            <Sequence from={2.5 * fps} durationInFrames={1.5 * fps} premountFor={1 * fps}>
                <BeautifulMockup />
            </Sequence>

            {/* AFTER Label */}
            <div
                style={{
                    position: 'absolute',
                    top: 40,
                    right: 40,
                    padding: '12px 24px',
                    backgroundColor: 'rgba(34, 197, 94, 0.2)',
                    border: '2px solid #22c55e',
                    borderRadius: 8,
                    opacity: afterLabelOpacity,
                    transform: `scale(${0.8 + afterLabelScale * 0.2})`,
                    zIndex: 10,
                }}
            >
                <span
                    style={{
                        fontFamily: 'Inter, system-ui, sans-serif',
                        fontSize: 18,
                        fontWeight: 700,
                        color: '#22c55e',
                        letterSpacing: '0.1em',
                    }}
                >
                    {afterLabel}
                </span>
            </div>

            {/* Scene 4: Impact Hold (4s - 5s) */}
            {/* Impact Text Overlay */}
            <div
                style={{
                    position: 'absolute',
                    bottom: 80,
                    left: '50%',
                    transform: `translateX(-50%) scale(${impactScale * dividerPulse})`,
                    padding: '20px 48px',
                    backgroundColor: 'rgba(10, 10, 15, 0.9)',
                    border: '2px solid rgba(255, 255, 255, 0.3)',
                    borderRadius: 16,
                    opacity: impactOpacity,
                    zIndex: 20,
                    boxShadow: '0 0 40px rgba(6, 182, 212, 0.3)',
                }}
            >
                <span
                    style={{
                        fontFamily: 'Inter, system-ui, sans-serif',
                        fontSize: 32,
                        fontWeight: 700,
                        color: '#ffffff',
                        letterSpacing: '-0.02em',
                        textAlign: 'center',
                        whiteSpace: 'nowrap',
                    }}
                >
                    {impactText}
                </span>
            </div>

            {/* Persistent Divider during hold phase */}
            {frame >= 105 && (
                <div
                    style={{
                        position: 'absolute',
                        left: '50%',
                        top: '50%',
                        transform: `translate(-50%, -50%) scaleY(${dividerPulse})`,
                        width: 4,
                        height: 1080,
                        backgroundColor: '#ffffff',
                        boxShadow: `
                            0 0 30px 15px #06b6d4,
                            0 0 60px 30px rgba(6, 182, 212, 0.5)
                        `,
                        zIndex: 5,
                    }}
                >
                    <div
                        style={{
                            position: 'absolute',
                            left: 1,
                            top: 0,
                            right: 1,
                            bottom: 0,
                            backgroundColor: '#06b6d4',
                            opacity: 0.8,
                        }}
                    />
                </div>
            )}
        </AbsoluteFill>
    );
};
