import React from 'react';
import { useCurrentFrame, useVideoConfig, spring, interpolate } from 'remotion';

// Tech industry color palette (3x3 grid)
const SWATCHES = [
    { color: '#3B82F6', name: 'Primary' },
    { color: '#8B5CF6', name: 'Secondary' },
    { color: '#22C55E', name: 'Success' },
    { color: '#F59E0B', name: 'Warning' },
    { color: '#EF4444', name: 'Error' },
    { color: '#64748B', name: 'Neutral' },
    { color: '#0EA5E9', name: 'Info' },
    { color: '#EC4899', name: 'Accent' },
    { color: '#1E293B', name: 'Dark' },
];

export const ColorSwatchesGrid: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    // Container fade in
    const containerOpacity = interpolate(frame, [0, 10], [0, 1], {
        extrapolateRight: 'clamp',
    });

    return (
        <div
            style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '24px',
                opacity: containerOpacity,
            }}
        >
            {SWATCHES.map((swatch, index) => {
                // Staggered animation - faster (3 frames per swatch instead of 5)
                const delay = index * 3;
                const swatchSpring = spring({
                    frame: frame - delay - 5,
                    fps,
                    config: { damping: 15, stiffness: 150 },
                });
                const swatchScale = interpolate(swatchSpring, [0, 1], [0, 1]);

                return (
                    <div
                        key={swatch.color}
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            gap: '12px',
                            transform: `scale(${swatchScale})`,
                        }}
                    >
                        {/* Color swatch */}
                        <div
                            style={{
                                width: '100px',
                                height: '100px',
                                backgroundColor: swatch.color,
                                borderRadius: '16px',
                                boxShadow: `0 8px 24px ${swatch.color}40`,
                            }}
                        />
                        {/* Color name */}
                        <div
                            style={{
                                fontSize: '14px',
                                fontWeight: '600',
                                color: '#1E293B',
                                fontFamily: 'Inter, sans-serif',
                            }}
                        >
                            {swatch.name}
                        </div>
                        {/* Hex code */}
                        <div
                            style={{
                                fontSize: '12px',
                                fontFamily: '"JetBrains Mono", monospace',
                                color: '#64748B',
                            }}
                        >
                            {swatch.color}
                        </div>
                    </div>
                );
            })}
        </div>
    );
};
