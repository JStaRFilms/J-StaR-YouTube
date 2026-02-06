import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from 'remotion';
import { loadFont } from '@remotion/google-fonts/Inter';

const { fontFamily } = loadFont();

export const CounterOverlay = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    // Scene 2 starts at 2s (60 frames)
    const startFrame = 60;

    const count = Math.floor(interpolate(frame, [startFrame, startFrame + 20], [0, 20], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp'
    }));

    const scale = spring({
        frame: frame - (startFrame + 10),
        fps,
        config: { damping: 12 }
    });

    const opacity = interpolate(frame, [startFrame, startFrame + 10], [0, 1], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp'
    });

    return (
        <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center', zIndex: 10 }}>
            <div style={{
                fontFamily,
                fontSize: '120px',
                fontWeight: 900,
                color: 'white',
                opacity,
                transform: `scale(${scale})`,
                textShadow: '0 0 40px rgba(59, 130, 246, 0.5)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '20px'
            }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <span>{count}+</span>
                </div>
                <div style={{
                    fontSize: '40px',
                    fontWeight: 500,
                    color: '#94a3b8',
                    letterSpacing: '0.1em'
                }}>
                    REAL PROJECTS
                </div>
            </div>
        </AbsoluteFill>
    );
};
