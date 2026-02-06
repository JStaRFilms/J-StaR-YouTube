import React from 'react';
import { useCurrentFrame, interpolate } from 'remotion';

const SPACING_VALUES = [
    { value: 8, label: '8px', description: 'Tight' },
    { value: 16, label: '16px', description: 'Normal' },
    { value: 32, label: '32px', description: 'Loose' },
];

export const SpacingGuides: React.FC = () => {
    const frame = useCurrentFrame();

    // UI Card fade in
    const cardOpacity = interpolate(frame, [0, 10], [0, 1], {
        extrapolateRight: 'clamp',
    });

    return (
        <div
            style={{
                width: '500px',
                backgroundColor: '#FFFFFF',
                borderRadius: '20px',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(0,0,0,0.05)',
                padding: '40px',
                opacity: cardOpacity,
            }}
        >
            {/* Sample UI Card */}
            <div
                style={{
                    backgroundColor: '#F8FAFC',
                    borderRadius: '12px',
                    padding: '24px',
                    border: '1px solid #E2E8F0',
                    position: 'relative',
                }}
            >
                {/* Content */}
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '16px',
                    }}
                >
                    <div
                        style={{
                            width: '60%',
                            height: '20px',
                            backgroundColor: '#E2E8F0',
                            borderRadius: '4px',
                        }}
                    />
                    <div
                        style={{
                            width: '80%',
                            height: '12px',
                            backgroundColor: '#F1F5F9',
                            borderRadius: '4px',
                        }}
                    />
                    <div
                        style={{
                            width: '70%',
                            height: '12px',
                            backgroundColor: '#F1F5F9',
                            borderRadius: '4px',
                        }}
                    />
                </div>

                {/* Spacing Guides */}
                {SPACING_VALUES.map((spacing, index) => {
                    const startFrame = 10 + index * 15;
                    const endFrame = startFrame + 15;
                    const lineWidth = interpolate(frame, [startFrame, endFrame], [0, 100], {
                        extrapolateLeft: 'clamp',
                        extrapolateRight: 'clamp',
                    });
                    const labelOpacity = interpolate(frame, [endFrame, endFrame + 10], [0, 1], {
                        extrapolateLeft: 'clamp',
                        extrapolateRight: 'clamp',
                    });

                    return (
                        <div
                            key={spacing.value}
                            style={{
                                position: 'absolute',
                                left: '-60px',
                                top: `${20 + index * 40}px`,
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px',
                            }}
                        >
                            {/* Red spacing line */}
                            <div
                                style={{
                                    width: `${lineWidth}px`,
                                    height: '2px',
                                    backgroundColor: '#EF4444',
                                    position: 'relative',
                                }}
                            >
                                {/* End marker */}
                                <div
                                    style={{
                                        position: 'absolute',
                                        right: '-4px',
                                        top: '-3px',
                                        width: '8px',
                                        height: '8px',
                                        backgroundColor: '#EF4444',
                                        borderRadius: '50%',
                                    }}
                                />
                            </div>

                            {/* Label */}
                            <div
                                style={{
                                    opacity: labelOpacity,
                                    fontSize: '12px',
                                    fontFamily: '"JetBrains Mono", monospace',
                                    color: '#EF4444',
                                    fontWeight: '600',
                                    whiteSpace: 'nowrap',
                                }}
                            >
                                {spacing.label}
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Legend */}
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    gap: '24px',
                    marginTop: '24px',
                }}
            >
                {SPACING_VALUES.map((spacing, index) => {
                    const labelOpacity = interpolate(frame, [45 + index * 5, 55 + index * 5], [0, 1], {
                        extrapolateLeft: 'clamp',
                        extrapolateRight: 'clamp',
                    });

                    return (
                        <div
                            key={spacing.value}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px',
                                opacity: labelOpacity,
                            }}
                        >
                            <div
                                style={{
                                    width: '12px',
                                    height: '12px',
                                    backgroundColor: '#EF4444',
                                    borderRadius: '2px',
                                }}
                            />
                            <span
                                style={{
                                    fontSize: '14px',
                                    color: '#64748B',
                                    fontFamily: 'Inter, sans-serif',
                                }}
                            >
                                {spacing.label} - {spacing.description}
                            </span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
