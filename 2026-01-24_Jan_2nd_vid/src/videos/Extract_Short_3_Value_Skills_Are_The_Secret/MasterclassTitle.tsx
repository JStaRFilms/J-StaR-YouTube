import { useCurrentFrame, useVideoConfig, interpolate, spring, Easing } from 'remotion';

export const MasterclassTitle: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    // Spring bounce entrance: frames 120-180
    const scaleSpring = spring({
        frame: frame - 120,
        fps,
        config: { damping: 12, stiffness: 150 }
    });

    // Scale: 0 → 1.2 → 1
    const scale = interpolate(scaleSpring, [0, 1], [0, 1]);
    const overshoot = scaleSpring > 1 ? 0.2 * (scaleSpring - 1) : 0;
    const finalScale = scale + overshoot;

    // Glow burst effect: frames 150-210
    const glowRadius = interpolate(frame, [150, 210], [0, 80], {
        extrapolateRight: 'clamp',
        easing: Easing.out(Easing.quad)
    });

    // Opacity fade in
    const opacity = interpolate(frame, [120, 150], [0, 1], {
        extrapolateRight: 'clamp'
    });

    return (
        <div
            style={{
                position: 'absolute',
                top: '25%',
                left: '50%',
                transform: `translate(-50%, -50%) scale(${finalScale})`,
                opacity: opacity,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
            }}
        >
            {/* Glow effect */}
            <div
                style={{
                    position: 'absolute',
                    width: glowRadius * 4,
                    height: glowRadius * 4,
                    borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(139, 92, 246, 0.4) 0%, transparent 70%)',
                    transform: 'translate(-50%, -50%)',
                    top: '50%',
                    left: '50%'
                }}
            />

            {/* MAIN text */}
            <div
                style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '64px',
                    fontWeight: '900',
                    color: '#3B82F6',
                    textShadow: '0 0 40px rgba(59, 130, 246, 0.8), 0 0 80px rgba(139, 92, 246, 0.6)',
                    letterSpacing: '8px',
                    textTransform: 'uppercase',
                    zIndex: 1
                }}
            >
                MASTER
            </div>

            {/* CLASS text */}
            <div
                style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '64px',
                    fontWeight: '900',
                    color: '#8B5CF6',
                    textShadow: '0 0 40px rgba(139, 92, 246, 0.8)',
                    letterSpacing: '8px',
                    textTransform: 'uppercase',
                    zIndex: 1,
                    marginTop: '-8px'
                }}
            >
                CLASS
            </div>
        </div>
    );
};
