import React from 'react';
import { useCurrentFrame, useVideoConfig, spring, interpolate } from 'remotion';

// Graph data points
const DATA_POINTS = [20, 35, 30, 55, 45, 70, 85, 95];

export const SavingsGraph: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    // Graph line draw animation
    const lineProgress = interpolate(frame, [10, 50], [0, 1], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
    });

    // Fill fade in after line
    const fillOpacity = interpolate(frame, [40, 60], [0, 0.3], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
    });

    // Bar animations
    const getBarHeight = (index: number) => {
        const delay = index * 5;
        const barProgress = interpolate(frame - 20 - delay, [0, 30], [0, 1], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
        });
        return DATA_POINTS[index] * barProgress;
    };

    // Build SVG path
    const width = 400;
    const height = 200;
    const padding = 20;
    const chartWidth = width - padding * 2;
    const chartHeight = height - padding * 2;

    const points = DATA_POINTS.map((value, index) => {
        const x = padding + (index / (DATA_POINTS.length - 1)) * chartWidth;
        const y = height - padding - (value / 100) * chartHeight;
        return { x, y };
    });

    // Create path string
    const pathData = points.reduce((acc, point, index) => {
        if (index === 0) return `M ${point.x} ${point.y}`;
        return `${acc} L ${point.x} ${point.y}`;
    }, '');

    // Create area path for fill
    const areaPath = `${pathData} L ${points[points.length - 1].x} ${height - padding} L ${points[0].x} ${height - padding} Z`;

    // Calculate path length for stroke-dasharray
    const pathLength = 500; // Approximate

    return (
        <div
            style={{
                width: '450px',
                backgroundColor: '#FFFFFF',
                borderRadius: '20px',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(0,0,0,0.05)',
                padding: '32px',
            }}
        >
            {/* Header */}
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '24px',
                }}
            >
                <div>
                    <div
                        style={{
                            fontSize: '18px',
                            fontWeight: '700',
                            color: '#1E293B',
                            fontFamily: 'Inter, sans-serif',
                        }}
                    >
                        Savings
                    </div>
                    <div
                        style={{
                            fontSize: '14px',
                            color: '#64748B',
                            fontFamily: 'Inter, sans-serif',
                            marginTop: '4px',
                        }}
                    >
                        Design cost reduction
                    </div>
                </div>
                <div
                    style={{
                        fontSize: '28px',
                        fontWeight: '800',
                        color: '#22C55E',
                        fontFamily: 'Inter, sans-serif',
                    }}
                >
                    +$3,000
                </div>
            </div>

            {/* Line Chart */}
            <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
                {/* Grid lines */}
                {[0, 25, 50, 75, 100].map((tick) => {
                    const y = height - padding - (tick / 100) * chartHeight;
                    return (
                        <line
                            key={tick}
                            x1={padding}
                            y1={y}
                            x2={width - padding}
                            y2={y}
                            stroke="#E2E8F0"
                            strokeWidth="1"
                            strokeDasharray="4"
                        />
                    );
                })}

                {/* Area fill */}
                <path
                    d={areaPath}
                    fill="#22C55E"
                    opacity={fillOpacity}
                />

                {/* Line */}
                <path
                    d={pathData}
                    fill="none"
                    stroke="#22C55E"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeDasharray={pathLength}
                    strokeDashoffset={pathLength * (1 - lineProgress)}
                />

                {/* Data points */}
                {points.map((point, index) => {
                    const pointOpacity = interpolate(frame - 30 - index * 3, [0, 10], [0, 1], {
                        extrapolateLeft: 'clamp',
                        extrapolateRight: 'clamp',
                    });

                    return (
                        <circle
                            key={index}
                            cx={point.x}
                            cy={point.y}
                            r="6"
                            fill="#22C55E"
                            opacity={pointOpacity}
                        />
                    );
                })}
            </svg>

            {/* Bar chart below */}
            <div
                style={{
                    display: 'flex',
                    alignItems: 'flex-end',
                    justifyContent: 'space-between',
                    gap: '8px',
                    marginTop: '24px',
                    height: '80px',
                }}
            >
                {DATA_POINTS.map((value, index) => {
                    const barHeight = getBarHeight(index);
                    const isHighlighted = index === DATA_POINTS.length - 1;

                    return (
                        <div
                            key={index}
                            style={{
                                flex: 1,
                                height: `${barHeight}%`,
                                background: isHighlighted
                                    ? 'linear-gradient(180deg, #22C55E 0%, #16A34A 100%)'
                                    : '#E2E8F0',
                                borderRadius: '4px 4px 0 0',
                                transition: 'none',
                            }}
                        />
                    );
                })}
            </div>
        </div>
    );
};
