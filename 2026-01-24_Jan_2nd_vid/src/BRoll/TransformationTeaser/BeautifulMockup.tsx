import React from 'react';

/**
 * BeautifulMockup - A premium, modern dashboard design
 * Used as the "after" state in the transformation animation
 * 
 * Features: Glassmorphism, clean typography, subtle gradients,
 * consistent spacing, professional color palette
 */
export const BeautifulMockup: React.FC<{ scale?: number }> = ({ scale = 1 }) => {
    return (
        <div
            style={{
                width: 800 * scale,
                height: 600 * scale,
                background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
                borderRadius: 16 * scale,
                overflow: 'hidden',
                position: 'relative',
                fontFamily: 'Inter, system-ui, sans-serif',
                boxShadow: `0 ${25 * scale}px ${50 * scale}px rgba(0, 0, 0, 0.5)`,
            }}
        >
            {/* Subtle Grid Pattern */}
            <div
                style={{
                    position: 'absolute',
                    inset: 0,
                    backgroundImage: `
                        linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
                    `,
                    backgroundSize: `${40 * scale}px ${40 * scale}px`,
                }}
            />

            {/* Header */}
            <div
                style={{
                    height: 60 * scale,
                    borderBottom: '1px solid rgba(255,255,255,0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    padding: `0 ${24 * scale}px`,
                    justifyContent: 'space-between',
                    backdropFilter: 'blur(10px)',
                    background: 'rgba(255,255,255,0.03)',
                }}
            >
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 * scale }}>
                    {/* Logo */}
                    <div
                        style={{
                            width: 32 * scale,
                            height: 32 * scale,
                            borderRadius: 8 * scale,
                            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <div
                            style={{
                                width: 16 * scale,
                                height: 16 * scale,
                                borderRadius: 4 * scale,
                                backgroundColor: 'rgba(255,255,255,0.9)',
                            }}
                        />
                    </div>
                    <div
                        style={{
                            fontSize: 16 * scale,
                            fontWeight: 600,
                            color: '#ffffff',
                            letterSpacing: '-0.02em',
                        }}
                    >
                        Dashboard Pro
                    </div>
                </div>
                <div style={{ display: 'flex', gap: 8 * scale }}>
                    {[1, 2, 3].map((i) => (
                        <div
                            key={i}
                            style={{
                                width: 8 * scale,
                                height: 8 * scale,
                                borderRadius: '50%',
                                backgroundColor: i === 1 ? '#22c55e' : 'rgba(255,255,255,0.2)',
                            }}
                        />
                    ))}
                </div>
            </div>

            {/* Content */}
            <div style={{ padding: 24 * scale, display: 'flex', gap: 20 * scale }}>
                {/* Sidebar */}
                <div style={{ width: 180 * scale }}>
                    {['Overview', 'Analytics', 'Projects', 'Settings'].map((item, i) => (
                        <div
                            key={i}
                            style={{
                                padding: `${12 * scale}px ${16 * scale}px`,
                                marginBottom: 4 * scale,
                                borderRadius: 8 * scale,
                                backgroundColor: i === 0 ? 'rgba(102, 126, 234, 0.2)' : 'transparent',
                                color: i === 0 ? '#667eea' : 'rgba(255,255,255,0.6)',
                                fontSize: 14 * scale,
                                fontWeight: i === 0 ? 600 : 400,
                                display: 'flex',
                                alignItems: 'center',
                                gap: 10 * scale,
                            }}
                        >
                            <div
                                style={{
                                    width: 8 * scale,
                                    height: 8 * scale,
                                    borderRadius: 2 * scale,
                                    backgroundColor: i === 0 ? '#667eea' : 'rgba(255,255,255,0.3)',
                                }}
                            />
                            {item}
                        </div>
                    ))}
                </div>

                {/* Main Content */}
                <div style={{ flex: 1 }}>
                    {/* Stats Row */}
                    <div style={{ display: 'flex', gap: 16 * scale, marginBottom: 20 * scale }}>
                        {[
                            { label: 'Total Users', value: '24,521', change: '+12.5%', color: '#22c55e' },
                            { label: 'Revenue', value: '$84.2K', change: '+8.2%', color: '#22c55e' },
                            { label: 'Conversion', value: '3.24%', change: '-0.4%', color: '#ef4444' },
                        ].map((stat, i) => (
                            <div
                                key={i}
                                style={{
                                    flex: 1,
                                    padding: 16 * scale,
                                    borderRadius: 12 * scale,
                                    background: 'rgba(255,255,255,0.05)',
                                    border: '1px solid rgba(255,255,255,0.08)',
                                    backdropFilter: 'blur(10px)',
                                }}
                            >
                                <div
                                    style={{
                                        fontSize: 12 * scale,
                                        color: 'rgba(255,255,255,0.5)',
                                        marginBottom: 8 * scale,
                                        fontWeight: 500,
                                        textTransform: 'uppercase',
                                        letterSpacing: '0.05em',
                                    }}
                                >
                                    {stat.label}
                                </div>
                                <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 * scale }}>
                                    <div
                                        style={{
                                            fontSize: 24 * scale,
                                            fontWeight: 700,
                                            color: '#ffffff',
                                            letterSpacing: '-0.02em',
                                        }}
                                    >
                                        {stat.value}
                                    </div>
                                    <div
                                        style={{
                                            fontSize: 12 * scale,
                                            fontWeight: 600,
                                            color: stat.color,
                                        }}
                                    >
                                        {stat.change}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Chart Area */}
                    <div
                        style={{
                            height: 220 * scale,
                            borderRadius: 12 * scale,
                            background: 'rgba(255,255,255,0.05)',
                            border: '1px solid rgba(255,255,255,0.08)',
                            position: 'relative',
                            overflow: 'hidden',
                            padding: 20 * scale,
                        }}
                    >
                        {/* Chart Title */}
                        <div
                            style={{
                                fontSize: 14 * scale,
                                fontWeight: 600,
                                color: '#ffffff',
                                marginBottom: 16 * scale,
                            }}
                        >
                            Performance Overview
                        </div>
                        {/* Smooth Chart Line */}
                        <svg
                            width="100%"
                            height={140 * scale}
                            viewBox="0 0 400 100"
                            preserveAspectRatio="none"
                            style={{ position: 'absolute', bottom: 20 * scale, left: 0, right: 0 }}
                        >
                            <defs>
                                <linearGradient id="chartGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                                    <stop offset="0%" stopColor="#667eea" stopOpacity="0.3" />
                                    <stop offset="100%" stopColor="#667eea" stopOpacity="0" />
                                </linearGradient>
                            </defs>
                            <path
                                d="M0,80 C40,70 60,30 100,40 S140,60 180,35 S220,55 260,25 S300,45 340,30 S380,50 400,20"
                                fill="none"
                                stroke="#667eea"
                                strokeWidth="2"
                            />
                            <path
                                d="M0,80 C40,70 60,30 100,40 S140,60 180,35 S220,55 260,25 S300,45 340,30 S380,50 400,20 L400,100 L0,100 Z"
                                fill="url(#chartGradient)"
                            />
                        </svg>
                    </div>

                    {/* Action Button */}
                    <div
                        style={{
                            marginTop: 16 * scale,
                            display: 'flex',
                            justifyContent: 'flex-end',
                        }}
                    >
                        <div
                            style={{
                                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                color: '#ffffff',
                                padding: `${12 * scale}px ${24 * scale}px`,
                                borderRadius: 8 * scale,
                                fontSize: 14 * scale,
                                fontWeight: 600,
                                boxShadow: `0 ${4 * scale}px ${15 * scale}px rgba(102, 126, 234, 0.4)`,
                            }}
                        >
                            View Full Report
                        </div>
                    </div>
                </div>
            </div>

            {/* Success Indicator */}
            <div
                style={{
                    position: 'absolute',
                    top: 80 * scale,
                    right: 24 * scale,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6 * scale,
                    padding: `${6 * scale}px ${12 * scale}px`,
                    borderRadius: 20 * scale,
                    background: 'rgba(34, 197, 94, 0.2)',
                    border: '1px solid rgba(34, 197, 94, 0.3)',
                }}
            >
                <div
                    style={{
                        width: 6 * scale,
                        height: 6 * scale,
                        borderRadius: '50%',
                        backgroundColor: '#22c55e',
                    }}
                />
                <div
                    style={{
                        fontSize: 11 * scale,
                        fontWeight: 600,
                        color: '#22c55e',
                    }}
                >
                    All Systems Operational
                </div>
            </div>
        </div>
    );
};
