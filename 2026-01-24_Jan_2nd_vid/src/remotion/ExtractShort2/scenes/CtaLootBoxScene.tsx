import { AbsoluteFill, Sequence, interpolate, useCurrentFrame, useVideoConfig } from 'remotion';
import { GiftBox3D } from '../components/GiftBox3D';
import { GlitchText } from '../components/GlitchText';

export const CtaLootBoxScene = () => {
    const frame = useCurrentFrame();
    const { height } = useVideoConfig();

    // Arrow bounce animation
    const arrowY = interpolate(frame, [0, 10, 20, 30], [0, 20, 0, 20], {
        extrapolateRight: 'clamp',
    });

    return (
        <AbsoluteFill style={{ backgroundColor: '#111827' }}>
            {/* 3D Box */}
            <AbsoluteFill style={{ zIndex: 1, top: -200 }}>
                <GiftBox3D />
            </AbsoluteFill>

            {/* CTA Text */}
            <Sequence from={20}>
                <AbsoluteFill
                    style={{
                        top: 600,
                        alignItems: 'center',
                        zIndex: 2,
                    }}
                >
                    <GlitchText text="FREE TUTORIAL" color="#3B82F6" fontSize={100} delay={0} />
                </AbsoluteFill>
            </Sequence>

            {/* Arrow */}
            <Sequence from={30}>
                <AbsoluteFill
                    style={{
                        top: 900,
                        alignItems: 'center',
                        transform: `translateY(${arrowY}px)`,
                        zIndex: 2,
                    }}
                >
                    <svg width="100" height="100" viewBox="0 0 24 24" fill="white">
                        <path d="M12 21l-12-18h24z" />
                    </svg>
                    <div
                        style={{
                            color: 'white',
                            fontFamily: 'sans-serif',
                            marginTop: 10,
                            fontSize: 40
                        }}
                    >
                        LINK IN BIO
                    </div>
                </AbsoluteFill>
            </Sequence>
        </AbsoluteFill>
    );
};
