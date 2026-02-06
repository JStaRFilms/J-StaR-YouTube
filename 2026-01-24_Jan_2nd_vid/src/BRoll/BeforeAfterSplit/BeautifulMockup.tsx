import { useCurrentFrame, useVideoConfig, interpolate, Easing } from 'remotion';

export const BeautifulMockup: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    // Slide in animation (75-105 frames, offset by scene start)
    const x = interpolate(frame, [0, 30], [1920, 960], {
        extrapolateRight: 'clamp',
        easing: Easing.out(Easing.exp),
    });

    // Shine sweep animation (90-120 frames, offset by scene start = 15-45 frames in this component)
    const shineX = interpolate(frame, [15, 45], [960, 1920], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
        easing: Easing.inOut(Easing.ease),
    });

    return (
        <div
            style={{
                position: 'absolute',
                left: x,
                top: 0,
                width: 960,
                height: 1080,
                background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
                overflow: 'hidden',
            }}
        >
            {/* Beautiful UI Mockup Content */}
            <div style={{ padding: 60 }}>
                {/* Header */}
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 16,
                    marginBottom: 48,
                }}>
                    <div style={{
                        width: 48,
                        height: 48,
                        borderRadius: 12,
                        background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M5 13l4 4L19 7" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </div>
                    <div style={{
                        fontFamily: 'Inter, system-ui, sans-serif',
                        fontSize: 28,
                        fontWeight: 700,
                        color: '#f8fafc',
                        letterSpacing: '-0.02em',
                    }}>
                        DesignPro
                    </div>
                </div>

                {/* Hero Section */}
                <div style={{
                    background: 'linear-gradient(135deg, rgba(34, 197, 94, 0.1) 0%, rgba(34, 197, 94, 0.05) 100%)',
                    borderRadius: 24,
                    padding: 40,
                    marginBottom: 32,
                    border: '1px solid rgba(34, 197, 94, 0.2)',
                }}>
                    <div style={{
                        fontFamily: 'Inter, system-ui, sans-serif',
                        fontSize: 36,
                        fontWeight: 700,
                        color: '#f8fafc',
                        marginBottom: 16,
                        letterSpacing: '-0.02em',
                    }}>
                        Beautiful Design
                    </div>
                    <div style={{
                        fontFamily: 'Inter, system-ui, sans-serif',
                        fontSize: 18,
                        color: '#94a3b8',
                        lineHeight: 1.6,
                    }}>
                        Professional, polished, and perfectly aligned.
                    </div>
                </div>

                {/* Feature Grid */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(2, 1fr)',
                    gap: 20,
                    marginBottom: 32,
                }}>
                    {[
                        { icon: '✓', text: 'Clean Layout', color: '#22c55e' },
                        { icon: '✓', text: 'Perfect Spacing', color: '#3b82f6' },
                        { icon: '✓', text: 'Great Typography', color: '#8b5cf6' },
                        { icon: '✓', text: 'Consistent Colors', color: '#f59e0b' },
                    ].map((item, i) => (
                        <div
                            key={i}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 12,
                                padding: 20,
                                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                                borderRadius: 16,
                                border: '1px solid rgba(255, 255, 255, 0.1)',
                            }}
                        >
                            <div style={{
                                width: 28,
                                height: 28,
                                borderRadius: '50%',
                                backgroundColor: item.color,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: 14,
                                color: 'white',
                                fontWeight: 'bold',
                            }}>
                                {item.icon}
                            </div>
                            <span style={{
                                fontFamily: 'Inter, system-ui, sans-serif',
                                fontSize: 16,
                                color: '#e2e8f0',
                                fontWeight: 500,
                            }}>
                                {item.text}
                            </span>
                        </div>
                    ))}
                </div>

                {/* CTA Button */}
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                }}>
                    <div style={{
                        background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
                        color: 'white',
                        padding: '18px 48px',
                        borderRadius: 12,
                        fontFamily: 'Inter, system-ui, sans-serif',
                        fontSize: 18,
                        fontWeight: 600,
                        boxShadow: '0 4px 20px rgba(34, 197, 94, 0.3)',
                    }}>
                        Get Started
                    </div>
                </div>
            </div>

            {/* Success Checkmarks */}
            <div style={{
                position: 'absolute',
                top: 100,
                right: 80,
                width: 32,
                height: 32,
                borderRadius: '50%',
                backgroundColor: '#22c55e',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <path d="M5 13l4 4L19 7" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </div>
            <div style={{
                position: 'absolute',
                top: 300,
                right: 120,
                width: 24,
                height: 24,
                borderRadius: '50%',
                backgroundColor: '#3b82f6',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                    <path d="M5 13l4 4L19 7" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </div>

            {/* Shine Sweep Effect */}
            <div style={{
                position: 'absolute',
                top: 0,
                left: shineX - 960,
                width: 200,
                height: '100%',
                background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.15) 50%, transparent 100%)',
                transform: 'skewX(-20deg)',
                pointerEvents: 'none',
            }} />

            {/* Subtle Glow */}
            <div style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 600,
                height: 600,
                background: 'radial-gradient(circle, rgba(34, 197, 94, 0.1) 0%, transparent 70%)',
                pointerEvents: 'none',
            }} />
        </div>
    );
};
