import React from 'react';
import { spring, useCurrentFrame, useVideoConfig, interpolate } from 'remotion';

interface MoreIndicatorProps {
    count: number;
    startFrame: number;
}

export const MoreIndicator: React.FC<MoreIndicatorProps> = ({
    count,
    startFrame,
}) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();
    const localFrame = frame - startFrame;

    // Entry animation
    const entryProgress = spring({
        frame: localFrame,
        fps,
        config: { damping: 200 },
    });

    // Subtle pulse
    const pulseOpacity = interpolate(
        Math.sin((frame - startFrame) * 0.08),
        [-1, 1],
        [0.6, 1],
        { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
    );

    if (localFrame < 0) {
        return null;
    }

    return (
        <div
            style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 12,
                padding: '16px 24px',
                marginTop: 16,
                borderRadius: 12,
                background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.15), rgba(34, 211, 238, 0.15))',
                border: '1px solid rgba(168, 85, 247, 0.3)',
                opacity: entryProgress,
                transform: `scale(${0.9 + entryProgress * 0.1})`,
            }}
        >
            {/* Dots */}
            <div style={{ display: 'flex', gap: 6 }}>
                {[0, 1, 2].map((i) => (
                    <div
                        key={i}
                        style={{
                            width: 8,
                            height: 8,
                            borderRadius: '50%',
                            backgroundColor: '#a855f7',
                            opacity: 0.4 + (i * 0.2) * pulseOpacity,
                            boxShadow: '0 0 8px rgba(168, 85, 247, 0.5)',
                        }}
                    />
                ))}
            </div>

            {/* Text */}
            <span
                style={{
                    color: '#e5e7eb',
                    fontSize: 20,
                    fontFamily: 'Inter, sans-serif',
                    fontWeight: 500,
                    opacity: pulseOpacity,
                }}
            >
                +{count} more assistants supported
            </span>

            {/* Dots */}
            <div style={{ display: 'flex', gap: 6 }}>
                {[2, 1, 0].map((i) => (
                    <div
                        key={i}
                        style={{
                            width: 8,
                            height: 8,
                            borderRadius: '50%',
                            backgroundColor: '#22d3ee',
                            opacity: 0.4 + (i * 0.2) * pulseOpacity,
                            boxShadow: '0 0 8px rgba(34, 211, 238, 0.5)',
                        }}
                    />
                ))}
            </div>
        </div>
    );
};
