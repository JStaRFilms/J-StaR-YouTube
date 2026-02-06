import { useCurrentFrame, useVideoConfig, interpolate, spring, Easing } from 'remotion';

export const ThumbnailPreview: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    // Scale entrance: frames 180-210
    const scaleSpring = spring({
        frame: frame - 180,
        fps,
        config: { damping: 15, stiffness: 150 }
    });
    const scale = interpolate(scaleSpring, [0, 1], [0, 1]);

    // Pulse glow: frames 210-300
    const pulseProgress = interpolate(frame, [210, 300], [0, 1], {
        extrapolateRight: 'clamp'
    });
    const glowIntensity = interpolate(pulseProgress, [0, 0.5, 1], [1, 1.5, 1], {
        easing: Easing.inOut(Easing.quad)
    });

    return (
        <div
            style={{
                position: 'absolute',
                bottom: '25%',
                left: '50%',
                transform: `translate(-50%, 0) scale(${scale})`,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
            }}
        >
            {/* Thumbnail frame */}
            <div
                style={{
                    width: '280px',
                    height: '157px',
                    border: '3px solid #3B82F6',
                    borderRadius: '8px',
                    overflow: 'hidden',
                    boxShadow: `0 0 ${30 * glowIntensity}px rgba(59, 130, 246, 0.6)`,
                    backgroundColor: '#1F2937'
                }}
            >
                {/* Placeholder thumbnail content */}
                <div
                    style={{
                        width: '100%',
                        height: '100%',
                        background: 'linear-gradient(135deg, #111827 0%, #1E293B 100%)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        position: 'relative'
                    }}
                >
                    {/* Play icon overlay */}
                    <div
                        style={{
                            width: '60px',
                            height: '60px',
                            borderRadius: '50%',
                            background: 'rgba(59, 130, 246, 0.9)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            boxShadow: '0 4px 20px rgba(59, 130, 246, 0.5)'
                        }}
                    >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                            <polygon points="8,5 19,12 8,19" />
                        </svg>
                    </div>
                </div>
            </div>

            {/* Label */}
            <div
                style={{
                    marginTop: '12px',
                    background: 'linear-gradient(135deg, #3B82F6, #8B5CF6)',
                    padding: '8px 20px',
                    borderRadius: '20px',
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '14px',
                    fontWeight: '700',
                    color: '#FFFFFF',
                    letterSpacing: '2px',
                    textTransform: 'uppercase'
                }}
            >
                FULL VIDEO
            </div>
        </div>
    );
};
