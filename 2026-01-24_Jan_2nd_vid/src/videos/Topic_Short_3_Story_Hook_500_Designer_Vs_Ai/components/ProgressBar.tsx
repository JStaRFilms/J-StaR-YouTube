import React from 'react';
import { useCurrentFrame, useVideoConfig, spring, interpolate } from 'remotion';

// Light mode colors
const COLORS = {
    textSecondary: '#64748B',
    accentBlue: '#3B82F6',
    accentPurple: '#8B5CF6',
    successGreen: '#22C55E',
};

export const ProgressBar: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    // Container scale animation
    const containerSpring = spring({
        frame,
        fps,
        config: { damping: 20, stiffness: 100 },
    });
    const containerScaleX = interpolate(containerSpring, [0, 1], [0, 1]);

    // Progress fill (0% to 100%)
    const progressWidth = interpolate(
        frame,
        [0.5 * fps, 2.5 * fps],
        [0, 100],
        { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
    );

    // Blinking dots for "Generating..."
    const dotCount = (Math.floor(frame / 10) % 3) + 1;

    // SYSTEM ONLINE appearance
    const systemOnlineOpacity = interpolate(frame, [2.8 * fps, 3 * fps], [0, 1], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
    });

    // Checkmark draw animation
    const checkmarkProgress = interpolate(frame, [2.8 * fps, 3 * fps], [0, 1], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
    });

    return (
        <div
            style={{
                width: '400px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '16px',
            }}
        >
            {/* Generating text */}
            <div
                style={{
                    fontSize: '18px',
                    fontWeight: '600',
                    color: COLORS.textSecondary,
                    fontFamily: 'Inter, sans-serif',
                    opacity: progressWidth < 100 ? 1 : 0,
                    transition: 'none',
                }}
            >
                Generating{'.'.repeat(dotCount)}
            </div>

            {/* Progress container */}
            <div
                style={{
                    width: '100%',
                    height: '24px',
                    backgroundColor: '#F1F5F9',
                    borderRadius: '12px',
                    overflow: 'hidden',
                    transform: `scaleX(${containerScaleX})`,
                    transformOrigin: 'left',
                }}
            >
                {/* Progress fill with gradient */}
                <div
                    style={{
                        width: `${progressWidth}%`,
                        height: '100%',
                        background: `linear-gradient(90deg, ${COLORS.accentBlue} 0%, ${COLORS.accentPurple} 100%)`,
                        borderRadius: '12px',
                        transition: 'none',
                    }}
                />
            </div>

            {/* SYSTEM ONLINE */}
            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    opacity: systemOnlineOpacity,
                }}
            >
                {/* Green checkmark */}
                <svg width="28" height="28" viewBox="0 0 28 28">
                    <circle
                        cx="14"
                        cy="14"
                        r="12"
                        fill={COLORS.successGreen}
                    />
                    <path
                        d="M8 14 L12 18 L20 10"
                        fill="none"
                        stroke="white"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeDasharray="20"
                        strokeDashoffset={20 * (1 - checkmarkProgress)}
                    />
                </svg>

                <span
                    style={{
                        fontSize: '18px',
                        fontWeight: '700',
                        color: COLORS.successGreen,
                        fontFamily: '"JetBrains Mono", monospace',
                        letterSpacing: '2px',
                    }}
                >
                    SYSTEM ONLINE
                </span>
            </div>
        </div>
    );
};
