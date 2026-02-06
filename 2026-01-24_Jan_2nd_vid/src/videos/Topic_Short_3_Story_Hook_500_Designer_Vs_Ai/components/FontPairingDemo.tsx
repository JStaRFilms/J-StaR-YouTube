import React from 'react';
import { useCurrentFrame, useVideoConfig, spring, interpolate } from 'remotion';

export const FontPairingDemo: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    // Card slide up + fade
    const cardSpring = spring({
        frame,
        fps,
        config: { damping: 20, stiffness: 100 },
    });
    const cardY = interpolate(cardSpring, [0, 1], [50, 0]);
    const cardOpacity = interpolate(frame, [0, 15], [0, 1], { extrapolateRight: 'clamp' });

    // Inter slide from left
    const interSpring = spring({
        frame: frame - 15,
        fps,
        config: { damping: 15, stiffness: 120 },
    });
    const interX = interpolate(interSpring, [0, 1], [-50, 0]);
    const interOpacity = interpolate(frame, [15, 30], [0, 1], { extrapolateRight: 'clamp' });

    // Playfair slide from right
    const playfairSpring = spring({
        frame: frame - 20,
        fps,
        config: { damping: 15, stiffness: 120 },
    });
    const playfairX = interpolate(playfairSpring, [0, 1], [50, 0]);
    const playfairOpacity = interpolate(frame, [20, 35], [0, 1], { extrapolateRight: 'clamp' });

    // Sample text fade
    const sampleOpacity = interpolate(frame, [30, 45], [0, 1], { extrapolateRight: 'clamp' });

    return (
        <div
            style={{
                width: '600px',
                backgroundColor: '#FFFFFF',
                borderRadius: '20px',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(0,0,0,0.05)',
                padding: '48px',
                transform: `translateY(${cardY}px)`,
                opacity: cardOpacity,
            }}
        >
            {/* Font Pairing Title */}
            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '16px',
                    marginBottom: '32px',
                }}
            >
                {/* Inter */}
                <div
                    style={{
                        transform: `translateX(${interX}px)`,
                        opacity: interOpacity,
                    }}
                >
                    <span
                        style={{
                            fontSize: '32px',
                            fontWeight: '700',
                            color: '#1E293B',
                            fontFamily: 'Inter, sans-serif',
                        }}
                    >
                        Inter
                    </span>
                    <span
                        style={{
                            fontSize: '14px',
                            color: '#64748B',
                            marginLeft: '8px',
                            fontFamily: 'Inter, sans-serif',
                        }}
                    >
                        (Heading)
                    </span>
                </div>

                <span
                    style={{
                        fontSize: '24px',
                        color: '#CBD5E1',
                    }}
                >
                    +
                </span>

                {/* Playfair */}
                <div
                    style={{
                        transform: `translateX(${playfairX}px)`,
                        opacity: playfairOpacity,
                    }}
                >
                    <span
                        style={{
                            fontSize: '32px',
                            fontWeight: '600',
                            color: '#1E293B',
                            fontFamily: 'Georgia, serif',
                            fontStyle: 'italic',
                        }}
                    >
                        Playfair Display
                    </span>
                    <span
                        style={{
                            fontSize: '14px',
                            color: '#64748B',
                            marginLeft: '8px',
                            fontFamily: 'Inter, sans-serif',
                        }}
                    >
                        (Body)
                    </span>
                </div>
            </div>

            {/* Sample Text */}
            <div
                style={{
                    opacity: sampleOpacity,
                    textAlign: 'center',
                }}
            >
                <h2
                    style={{
                        fontSize: '28px',
                        fontWeight: '700',
                        color: '#1E293B',
                        fontFamily: 'Inter, sans-serif',
                        marginBottom: '16px',
                    }}
                >
                    Beautiful Typography
                </h2>
                <p
                    style={{
                        fontSize: '18px',
                        color: '#64748B',
                        fontFamily: 'Georgia, serif',
                        lineHeight: '1.6',
                        fontStyle: 'italic',
                    }}
                >
                    The quick brown fox jumps over the lazy dog.
                    <br />
                    Perfect harmony between modern and classic.
                </p>
            </div>

            {/* Labels */}
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    gap: '24px',
                    marginTop: '24px',
                    opacity: sampleOpacity,
                }}
            >
                <span
                    style={{
                        fontSize: '12px',
                        fontWeight: '600',
                        color: '#3B82F6',
                        backgroundColor: '#EFF6FF',
                        padding: '6px 12px',
                        borderRadius: '6px',
                        fontFamily: 'Inter, sans-serif',
                        textTransform: 'uppercase',
                        letterSpacing: '1px',
                    }}
                >
                    HEADING
                </span>
                <span
                    style={{
                        fontSize: '12px',
                        fontWeight: '600',
                        color: '#8B5CF6',
                        backgroundColor: '#F5F3FF',
                        padding: '6px 12px',
                        borderRadius: '6px',
                        fontFamily: 'Inter, sans-serif',
                        textTransform: 'uppercase',
                        letterSpacing: '1px',
                    }}
                >
                    BODY
                </span>
            </div>
        </div>
    );
};
