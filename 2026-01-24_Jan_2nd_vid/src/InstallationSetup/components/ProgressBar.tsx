import React from 'react';
import { interpolate, useCurrentFrame } from 'remotion';

interface ProgressBarProps {
    startFrame: number;
    durationFrames: number;
    width?: number;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
    startFrame,
    durationFrames,
    width = 400,
}) => {
    const frame = useCurrentFrame();
    const localFrame = frame - startFrame;

    const progress = interpolate(
        localFrame,
        [0, durationFrames],
        [0, 100],
        { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
    );

    const opacity = interpolate(
        localFrame,
        [-5, 0],
        [0, 1],
        { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
    );

    if (localFrame < -5) {
        return null;
    }

    return (
        <div
            style={{
                opacity,
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                marginTop: 16,
            }}
        >
            {/* Progress bar container */}
            <div
                style={{
                    width,
                    height: 8,
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    borderRadius: 4,
                    overflow: 'hidden',
                }}
            >
                {/* Progress fill */}
                <div
                    style={{
                        width: `${progress}%`,
                        height: '100%',
                        background: 'linear-gradient(90deg, #22d3ee, #a855f7)',
                        borderRadius: 4,
                        boxShadow: '0 0 10px rgba(34, 211, 238, 0.5)',
                    }}
                />
            </div>

            {/* Percentage text */}
            <span style={{
                color: '#22d3ee',
                fontSize: 16,
                fontFamily: 'JetBrains Mono, monospace',
                minWidth: 50,
            }}>
                {Math.round(progress)}%
            </span>
        </div>
    );
};
