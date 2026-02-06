import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';

interface CommandRowProps {
    command: string;
    comment: string;
    startFrame: number;
    highlighted?: boolean;
    index?: number;
}

export const CommandRow: React.FC<CommandRowProps> = ({
    command,
    comment,
    startFrame,
    highlighted = false,
    index = 0,
}) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const localFrame = frame - startFrame;

    // Entry animation
    const slideProgress = spring({
        frame: localFrame,
        fps,
        config: { damping: 200 },
    });

    const translateX = interpolate(slideProgress, [0, 1], [-50, 0]);
    const opacity = interpolate(slideProgress, [0, 1], [0, 1]);

    // Glow pulse for highlighted items
    const glowIntensity = highlighted
        ? interpolate(
            Math.sin((frame - startFrame) * 0.1),
            [-1, 1],
            [0.4, 0.8],
            { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
        )
        : 0;

    if (localFrame < 0) {
        return null;
    }

    return (
        <div
            style={{
                display: 'flex',
                alignItems: 'center',
                gap: 16,
                padding: '12px 16px',
                marginBottom: 8,
                borderRadius: 8,
                transform: `translateX(${translateX}px)`,
                opacity,
                backgroundColor: highlighted
                    ? `rgba(34, 211, 238, ${0.08 + glowIntensity * 0.05})`
                    : 'transparent',
                border: highlighted
                    ? `1px solid rgba(34, 211, 238, ${0.3 + glowIntensity * 0.3})`
                    : '1px solid transparent',
                boxShadow: highlighted
                    ? `0 0 ${20 + glowIntensity * 20}px rgba(34, 211, 238, ${glowIntensity * 0.3})`
                    : 'none',
            }}
        >
            {/* Glow indicator */}
            {highlighted && (
                <span style={{
                    color: '#22d3ee',
                    fontSize: 18,
                    textShadow: '0 0 10px #22d3ee',
                }}>
                    ✦
                </span>
            )}

            {/* Command */}
            <span style={{
                color: highlighted ? '#22d3ee' : '#a5b4fc',
                fontWeight: highlighted ? 600 : 400,
                textShadow: highlighted ? '0 0 8px rgba(34, 211, 238, 0.5)' : 'none',
            }}>
                uipro init --ai {command}
            </span>

            {/* Comment */}
            <span style={{
                color: '#6b7280',
                marginLeft: 'auto',
            }}>
                # {comment}
            </span>
        </div>
    );
};
