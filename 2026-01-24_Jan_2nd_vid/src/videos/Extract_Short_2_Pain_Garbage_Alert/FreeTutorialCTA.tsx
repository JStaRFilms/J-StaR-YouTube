import { useCurrentFrame, useVideoConfig, interpolate, spring } from 'remotion';

export const FreeTutorialCTA: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    // Text reveal with spring
    const textScale = spring({
        frame: frame - 75,
        fps,
        config: { damping: 12, stiffness: 100 },
    });

    // Text slide up
    const textY = interpolate(frame, [75, 120], [100, 0], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
    });

    // Glow pulse
    const glowIntensity = interpolate(frame, [120, 300], [0.5, 1], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
    });

    // Opacity
    const opacity = interpolate(frame, [75, 90], [0, 1], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
    });

    return (
        <div
            style={{
                position: 'absolute',
                top: '70%',
                left: '50%',
                transform: `translateX(-50%) translateY(${textY}px) scale(${textScale})`,
                opacity,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 10,
            }}
        >
            <div
                style={{
                    backgroundColor: '#F59E0B',
                    padding: '20px 60px',
                    borderRadius: 12,
                    boxShadow: `0 0 ${30 * glowIntensity}px ${15 * glowIntensity}px rgba(245, 158, 11, ${glowIntensity})`,
                    border: '3px solid #FFFFFF',
                }}
            >
                <span
                    style={{
                        fontFamily: 'Inter, sans-serif',
                        fontWeight: 900,
                        fontSize: 48,
                        color: '#FFFFFF',
                        textTransform: 'uppercase',
                        letterSpacing: 2,
                        textShadow: '2px 2px 0 #B45309',
                    }}
                >
                    FREE TUTORIAL
                </span>
            </div>
            <span
                style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: 20,
                    color: '#94A3B8',
                    textAlign: 'center',
                }}
            >
                Full tutorial linked below 👇
            </span>
        </div>
    );
};
