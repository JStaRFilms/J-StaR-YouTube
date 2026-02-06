import React from 'react';
import { useCurrentFrame, useVideoConfig, spring, interpolate } from 'remotion';
import { Play, ArrowDown } from 'lucide-react';

export const CTACard: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    // Card slide up
    const cardSpring = spring({
        frame: frame - 50,
        fps,
        config: { damping: 15, stiffness: 100 },
    });
    const cardY = interpolate(cardSpring, [0, 1], [100, 0]);

    // Button pulse
    const pulseFrame = (frame - 70) % 20;
    const buttonScale = interpolate(pulseFrame, [0, 10, 20], [1, 1.05, 1], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
    });

    // Arrow bounce
    const arrowBounce = Math.sin((frame - 60) * 0.2) * 5;

    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '16px',
            }}
        >
            {/* Arrow pointing down */}
            <div
                style={{
                    transform: `translateY(${arrowBounce}px)`,
                    opacity: interpolate(frame, [60, 70], [0, 1], { extrapolateRight: 'clamp' }),
                }}
            >
                <ArrowDown size={40} color="#64748B" />
            </div>

            {/* CTA Card */}
            <div
                style={{
                    width: '320px',
                    backgroundColor: '#FFFFFF',
                    borderRadius: '20px',
                    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(0,0,0,0.05)',
                    overflow: 'hidden',
                    transform: `translateY(${cardY}px)`,
                }}
            >
                {/* Thumbnail placeholder */}
                <div
                    style={{
                        height: '180px',
                        background: 'linear-gradient(135deg, #3B82F6 0%, #8B5CF6 100%)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        position: 'relative',
                    }}
                >
                    {/* Play icon */}
                    <div
                        style={{
                            width: '64px',
                            height: '64px',
                            backgroundColor: 'rgba(255, 255, 255, 0.9)',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
                        }}
                    >
                        <Play size={32} color="#3B82F6" fill="#3B82F6" />
                    </div>

                    {/* Video duration badge */}
                    <div
                        style={{
                            position: 'absolute',
                            bottom: '12px',
                            right: '12px',
                            backgroundColor: 'rgba(0, 0, 0, 0.7)',
                            color: 'white',
                            padding: '4px 8px',
                            borderRadius: '4px',
                            fontSize: '12px',
                            fontFamily: 'Inter, sans-serif',
                            fontWeight: '600',
                        }}
                    >
                        12:34
                    </div>
                </div>

                {/* Card content */}
                <div
                    style={{
                        padding: '20px',
                        textAlign: 'center',
                    }}
                >
                    <div
                        style={{
                            fontSize: '14px',
                            color: '#64748B',
                            fontFamily: 'Inter, sans-serif',
                            marginBottom: '12px',
                        }}
                    >
                        Full breakdown dropping this week
                    </div>

                    {/* WATCH NOW Button */}
                    <button
                        style={{
                            width: '100%',
                            padding: '16px 24px',
                            backgroundColor: '#EF4444',
                            color: 'white',
                            border: 'none',
                            borderRadius: '12px',
                            fontSize: '18px',
                            fontWeight: '700',
                            fontFamily: 'Inter, sans-serif',
                            cursor: 'pointer',
                            boxShadow: '0 4px 15px rgba(239, 68, 68, 0.4)',
                            transform: `scale(${buttonScale})`,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '8px',
                        }}
                    >
                        <Play size={20} fill="white" />
                        WATCH NOW
                    </button>
                </div>
            </div>
        </div>
    );
};
