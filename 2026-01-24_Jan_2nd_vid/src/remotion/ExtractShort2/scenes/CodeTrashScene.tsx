import { AbsoluteFill, Sequence, interpolate, useCurrentFrame, Audio, staticFile } from 'remotion';
import { WarningTriangle } from '../components/WarningTriangle';
import { GlitchText } from '../components/GlitchText';

export const CodeTrashScene = () => {
    const frame = useCurrentFrame();

    // Red Tint Animation: Slow pulse (0.2 -> 0.5 -> 0.2)
    const tintOpacity = interpolate(frame, [0, 30, 60, 90, 120, 150], [0.2, 0.5, 0.2, 0.5, 0.2, 0.5], {
        extrapolateRight: 'clamp',
    });

    return (
        <AbsoluteFill style={{ backgroundColor: '#111827' }}>
            {/* Red Tint Overlay */}
            <AbsoluteFill
                style={{
                    backgroundColor: '#FF0000',
                    opacity: tintOpacity,
                    zIndex: 0,
                }}
            />

            {/* Audio Placeholder - The user will provide this later or we use silent placeholder */}
            {/* <Audio src={staticFile('audio/hook_trash.mp3')} /> */}

            {/* Visual Elements */}
            <Sequence durationInFrames={150}>
                <AbsoluteFill
                    style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        zIndex: 1,
                    }}
                >
                    <WarningTriangle />
                </AbsoluteFill>
            </Sequence>

            <Sequence from={15} durationInFrames={135}>
                <AbsoluteFill
                    style={{
                        top: 300, // Positioned above the triangle slightly or overlaying
                        alignItems: 'center',
                        zIndex: 2,
                    }}
                >
                    <GlitchText text="YOUR CODE" color="#FFFFFF" delay={0} />
                </AbsoluteFill>
            </Sequence>

            <Sequence from={45} durationInFrames={105}>
                <AbsoluteFill
                    style={{
                        top: 1100, // Below the triangle
                        alignItems: 'center',
                        zIndex: 2,
                    }}
                >
                    <GlitchText text="= TRASH" color="#FF0000" fontSize={120} delay={0} />
                </AbsoluteFill>
            </Sequence>
        </AbsoluteFill>
    );
};
