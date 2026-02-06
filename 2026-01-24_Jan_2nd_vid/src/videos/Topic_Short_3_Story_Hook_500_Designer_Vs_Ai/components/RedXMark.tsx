import React from 'react';
import { useCurrentFrame, interpolate } from 'remotion';

export const RedXMark: React.FC = () => {
    const frame = useCurrentFrame();

    // SVG stroke animation - draw the X (starts at frame 60)
    const strokeProgress = interpolate(frame, [60, 90], [0, 1], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
    });

    // Total path length for stroke-dasharray
    const pathLength = 400; // Increased for larger X
    const strokeDashoffset = pathLength * (1 - strokeProgress);

    // Scale animation (starts at frame 60)
    const scaleProgress = interpolate(frame, [60, 80], [0.5, 1], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
    });

    // Shake effect after drawing (starts at frame 90)
    const shakeFrame = frame - 90;
    const shakeIntensity = shakeFrame > 0 && shakeFrame < 30 ? 5 : 0;
    const shakeX = shakeFrame > 0 ? Math.sin(shakeFrame * 0.8) * shakeIntensity : 0;

    return (
        <svg
            width="500"
            height="500"
            viewBox="0 0 500 500"
            style={{
                transform: `scale(${scaleProgress}) translateX(${shakeX}px) rotate(-5deg)`,
            }}
        >
            {/* First diagonal line (top-left to bottom-right) */}
            <line
                x1="50"
                y1="50"
                x2="450"
                y2="450"
                stroke="#EF4444"
                strokeWidth="40"
                strokeLinecap="round"
                strokeDasharray={pathLength / 2}
                strokeDashoffset={strokeDashoffset / 2}
                style={{
                    filter: 'drop-shadow(0 0 20px rgba(239, 68, 68, 0.8))',
                }}
            />
            {/* Second diagonal line (top-right to bottom-left) */}
            <line
                x1="450"
                y1="50"
                x2="50"
                y2="450"
                stroke="#EF4444"
                strokeWidth="40"
                strokeLinecap="round"
                strokeDasharray={pathLength / 2}
                strokeDashoffset={strokeDashoffset / 2}
                style={{
                    filter: 'drop-shadow(0 0 20px rgba(239, 68, 68, 0.8))',
                }}
            />
        </svg>
    );
};
