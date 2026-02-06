import React from 'react';
import { useCurrentFrame, useVideoConfig, spring, interpolate } from 'remotion';

// Light mode colors
const COLORS = {
    textPrimary: '#1E293B',
    textSecondary: '#64748B',
    accentBlue: '#3B82F6',
    accentPurple: '#8B5CF6',
    border: '#E2E8F0',
};

export const AnimatedClock: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    // Clock spins for 6 months (6 full rotations)
    const rotationDuration = 3 * fps; // 3 seconds for full animation
    const totalRotation = (frame / rotationDuration) * 360 * 6; // 6 full rotations

    // Fade out near end
    const opacity = interpolate(frame, [2.5 * fps, 3 * fps], [1, 0], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
    });

    return (
        <div
            style={{
                width: '200px',
                height: '200px',
                position: 'relative',
                opacity,
            }}
        >
            {/* Clock face */}
            <svg width="200" height="200" viewBox="0 0 200 200">
                {/* Outer circle */}
                <circle
                    cx="100"
                    cy="100"
                    r="90"
                    fill="none"
                    stroke={COLORS.border}
                    strokeWidth="4"
                />

                {/* Inner circle */}
                <circle
                    cx="100"
                    cy="100"
                    r="85"
                    fill="white"
                    stroke="none"
                />

                {/* Hour markers */}
                {[...Array(12)].map((_, i) => {
                    const angle = (i * 30 - 90) * (Math.PI / 180);
                    const x1 = 100 + 70 * Math.cos(angle);
                    const y1 = 100 + 70 * Math.sin(angle);
                    const x2 = 100 + 80 * Math.cos(angle);
                    const y2 = 100 + 80 * Math.sin(angle);
                    return (
                        <line
                            key={i}
                            x1={x1}
                            y1={y1}
                            x2={x2}
                            y2={y2}
                            stroke={COLORS.textSecondary}
                            strokeWidth="3"
                            strokeLinecap="round"
                        />
                    );
                })}

                {/* Hour hand */}
                <line
                    x1="100"
                    y1="100"
                    x2="100"
                    y2="50"
                    stroke={COLORS.textPrimary}
                    strokeWidth="6"
                    strokeLinecap="round"
                    transform={`rotate(${totalRotation * 0.5} 100 100)`}
                    style={{
                        filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))',
                    }}
                />

                {/* Minute hand */}
                <line
                    x1="100"
                    y1="100"
                    x2="100"
                    y2="35"
                    stroke={COLORS.accentBlue}
                    strokeWidth="4"
                    strokeLinecap="round"
                    transform={`rotate(${totalRotation} 100 100)`}
                    style={{
                        filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))',
                    }}
                />

                {/* Center dot */}
                <circle cx="100" cy="100" r="8" fill={COLORS.accentPurple} />
            </svg>

            {/* Time label */}
            <div
                style={{
                    position: 'absolute',
                    bottom: '-30px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    fontSize: '14px',
                    fontWeight: '600',
                    color: COLORS.textSecondary,
                    fontFamily: 'Inter, sans-serif',
                }}
            >
                6 months
            </div>
        </div>
    );
};
