import React from 'react';
import { useCurrentFrame, useVideoConfig, spring, interpolate } from 'remotion';

// Light mode colors
const COLORS = {
    background: '#F8FAFC',
    surface: '#FFFFFF',
    textPrimary: '#1E293B',
    textSecondary: '#64748B',
    accentBlue: '#3B82F6',
    accentPurple: '#8B5CF6',
    border: '#E2E8F0',
    shadow: 'rgba(0,0,0,0.1)',
};

export const InvoiceCard: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    // Card entrance animation
    const cardSpring = spring({
        frame,
        fps,
        config: { damping: 20, stiffness: 100 },
    });
    const cardScale = interpolate(cardSpring, [0, 1], [0.8, 1]);
    const cardOpacity = interpolate(frame, [0, 15], [0, 1], { extrapolateRight: 'clamp' });

    // GRAND $500 animation - heavy spring for weighty feel
    const priceSpring = spring({
        frame: frame - 15,
        fps,
        config: { mass: 1.5, damping: 10, stiffness: 100 },
    });
    const priceScale = interpolate(priceSpring, [0, 1], [1, 1.2]);

    // Glow pulse effect
    const glowIntensity = interpolate(frame, [15, 30, 45], [0, 20, 0], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
    });

    // Naira slide up animation
    const nairaSlide = spring({
        frame: frame - 30,
        fps,
        config: { damping: 15, stiffness: 120 },
    });
    const nairaY = interpolate(nairaSlide, [0, 1], [30, 0]);
    const nairaOpacity = interpolate(frame, [30, 50], [0, 1], { extrapolateRight: 'clamp' });

    // DUE stamp animation
    const stampSpring = spring({
        frame: frame - 40,
        fps,
        config: { damping: 12, stiffness: 150 },
    });
    const stampScale = interpolate(stampSpring, [0, 1], [1.5, 1]);
    const stampRotation = interpolate(stampSpring, [0, 1], [-20, -12]);

    return (
        <div
            style={{
                width: '600px',
                backgroundColor: COLORS.surface,
                borderRadius: '20px',
                boxShadow: `0 25px 50px -12px ${COLORS.shadow}, 0 0 0 1px ${COLORS.border}`,
                padding: '48px',
                fontFamily: '"Inter", sans-serif',
                transform: `scale(${cardScale})`,
                opacity: cardOpacity,
            }}
        >
            {/* Invoice Header */}
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    marginBottom: '32px',
                    paddingBottom: '24px',
                    borderBottom: `2px solid ${COLORS.border}`,
                }}
            >
                <div>
                    <div
                        style={{
                            fontSize: '14px',
                            fontWeight: '600',
                            color: COLORS.textSecondary,
                            letterSpacing: '2px',
                            marginBottom: '8px',
                        }}
                    >
                        INVOICE
                    </div>
                    <div
                        style={{
                            fontSize: '24px',
                            fontWeight: '700',
                            color: COLORS.textPrimary,
                        }}
                    >
                        #001
                    </div>
                </div>

                {/* DUE Stamp */}
                <div
                    style={{
                        transform: `scale(${stampScale}) rotate(${stampRotation}deg)`,
                        border: '4px solid #EF4444',
                        color: '#EF4444',
                        fontSize: '28px',
                        fontWeight: '900',
                        padding: '8px 20px',
                        borderRadius: '8px',
                        fontFamily: 'Arial, sans-serif',
                        letterSpacing: '3px',
                    }}
                >
                    DUE
                </div>
            </div>

            {/* Service Line Item */}
            <div style={{ marginBottom: '40px' }}>
                <div
                    style={{
                        fontSize: '18px',
                        color: COLORS.textSecondary,
                        marginBottom: '8px',
                    }}
                >
                    Description
                </div>
                <div
                    style={{
                        fontSize: '24px',
                        fontWeight: '600',
                        color: COLORS.textPrimary,
                    }}
                >
                    UI/UX Design Services
                </div>
            </div>

            {/* GRAND TOTAL Section */}
            <div
                style={{
                    backgroundColor: COLORS.background,
                    borderRadius: '16px',
                    padding: '32px',
                    textAlign: 'center',
                    position: 'relative',
                }}
            >
                <div
                    style={{
                        fontSize: '14px',
                        fontWeight: '600',
                        color: COLORS.textSecondary,
                        letterSpacing: '2px',
                        marginBottom: '16px',
                    }}
                >
                    TOTAL AMOUNT
                </div>

                {/* $500 - GRAND ANIMATION */}
                <div
                    style={{
                        fontSize: '72px',
                        fontWeight: '800',
                        color: COLORS.textPrimary,
                        transform: `scale(${priceScale})`,
                        textShadow: `0 0 ${glowIntensity}px rgba(59, 130, 246, 0.5)`,
                        lineHeight: 1,
                        marginBottom: '8px',
                    }}
                >
                    $500.00
                </div>

                {/* Naira equivalent */}
                <div
                    style={{
                        fontSize: '36px',
                        fontWeight: '700',
                        color: COLORS.accentPurple,
                        transform: `translateY(${nairaY}px)`,
                        opacity: nairaOpacity,
                    }}
                >
                    ≈ N750,000 Naira
                </div>
            </div>

            {/* Footer note */}
            <div
                style={{
                    marginTop: '24px',
                    textAlign: 'center',
                    fontSize: '14px',
                    color: COLORS.textSecondary,
                }}
            >
                Payment due within 30 days
            </div>
        </div>
    );
};
