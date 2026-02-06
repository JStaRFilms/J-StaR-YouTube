import { useCurrentFrame, useVideoConfig, interpolate, spring, Easing } from 'remotion';

export const LinkInBioCTA: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    // Slide up + scale: frames 210-250
    const slideSpring = spring({
        frame: frame - 210,
        fps,
        config: { damping: 15, stiffness: 150 }
    });
    const translateY = interpolate(slideSpring, [0, 1], [100, 0]);
    const scale = interpolate(slideSpring, [0, 1], [0.8, 1]);

    // Glow pulse: frames 250-300
    const pulseProgress = interpolate(frame, [250, 300], [0, 1], {
        extrapolateRight: 'clamp'
    });
    const glowIntensity = interpolate(pulseProgress, [0, 0.5, 1], [1, 1.3, 1], {
        easing: Easing.inOut(Easing.quad)
    });

    return (
        <div
            style={{
                position: 'absolute',
                bottom: '8%',
                left: '50%',
                transform: `translate(-50%, 0) scale(${scale}) translateY(${translateY}px)`,
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                cursor: 'pointer'
            }}
        >
            {/* Finger point icon */}
            <div
                style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #3B82F6, #8B5CF6)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: `0 0 ${20 * glowIntensity}px rgba(59, 130, 246, 0.6)`
                }}
            >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                </svg>
            </div>

            {/* Button */}
            <div
                style={{
                    background: 'linear-gradient(135deg, #3B82F6 0%, #8B5CF6 100%)',
                    padding: '14px 28px',
                    borderRadius: '30px',
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '18px',
                    fontWeight: '800',
                    color: '#FFFFFF',
                    letterSpacing: '1px',
                    textTransform: 'uppercase',
                    boxShadow: `0 4px ${20 * glowIntensity}px rgba(59, 130, 246, 0.5)`
                }}
            >
                Link in Bio 👇
            </div>
        </div>
    );
};
