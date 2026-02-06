import React from 'react';
import { spring, useCurrentFrame, useVideoConfig, interpolate } from 'remotion';

interface CheckmarkProps {
    startFrame: number;
    size?: number;
}

export const Checkmark: React.FC<CheckmarkProps> = ({
    startFrame,
    size = 28,
}) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();
    const localFrame = frame - startFrame;

    // Scale spring animation
    const scaleProgress = spring({
        frame: localFrame,
        fps,
        config: { damping: 12, stiffness: 200 },
    });

    // Stroke draw animation
    const strokeProgress = interpolate(
        localFrame,
        [0, 15],
        [0, 1],
        { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
    );

    // Glow pulse
    const glowOpacity = interpolate(
        localFrame,
        [0, 10, 30],
        [0, 0.8, 0.4],
        { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
    );

    if (localFrame < 0) {
        return null;
    }

    return (
        <div
            style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                transform: `scale(${scaleProgress})`,
                marginLeft: 12,
            }}
        >
            <svg
                width={size}
                height={size}
                viewBox="0 0 24 24"
                fill="none"
                style={{
                    filter: `drop-shadow(0 0 ${8 + glowOpacity * 8}px rgba(34, 197, 94, ${glowOpacity}))`,
                }}
            >
                {/* Circle background */}
                <circle
                    cx="12"
                    cy="12"
                    r="10"
                    fill="rgba(34, 197, 94, 0.2)"
                    stroke="#22c55e"
                    strokeWidth="2"
                    strokeDasharray={62.83}
                    strokeDashoffset={62.83 * (1 - strokeProgress)}
                />
                {/* Checkmark path */}
                <path
                    d="M8 12l3 3 5-6"
                    stroke="#22c55e"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeDasharray={20}
                    strokeDashoffset={20 * (1 - strokeProgress)}
                />
            </svg>
        </div>
    );
};
