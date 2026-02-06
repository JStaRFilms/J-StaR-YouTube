import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';

export const FintechDashboard = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    // Entry Animations
    const containerScale = spring({
        frame,
        fps,
        config: { damping: 20, stiffness: 100 },
    });

    const contentOpacity = interpolate(frame, [10, 30], [0, 1]);

    // Chart Animation
    const chartProgress = spring({
        frame: frame - 20,
        fps,
        config: { damping: 20 },
    });

    // Number Counter
    const revenueCount = interpolate(frame, [20, 80], [0, 12450], {
        extrapolateRight: 'clamp',
    });

    // Sparkle Animation
    const sparkleScale = interpolate(frame, [40, 50, 60], [0, 1.2, 1], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp'
    });

    return (
        <div style={{
            width: 900,
            height: 1200,
            backgroundColor: '#F9FAFB', // Gray-50
            borderRadius: 24,
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.15)',
            overflow: 'hidden',
            fontFamily: 'Inter, sans-serif',
            transform: `scale(${containerScale})`,
            display: 'flex',
            flexDirection: 'column',
        }}>
            {/* Sidebar + Main Content Layout */}
            <div style={{ display: 'flex', height: '100%', opacity: contentOpacity }}>

                {/* Sidebar */}
                <div style={{
                    width: 80,
                    borderRight: '1px solid #E5E7EB',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    paddingTop: 32,
                    gap: 24,
                }}>
                    <div style={{ width: 40, height: 40, borderRadius: 12, backgroundColor: '#111827' }} /> {/* Logo */}
                    <div style={{ width: 24, height: 24, borderRadius: 6, backgroundColor: '#E5E7EB' }} />
                    <div style={{ width: 24, height: 24, borderRadius: 6, backgroundColor: '#E5E7EB' }} />
                    <div style={{ width: 24, height: 24, borderRadius: 6, backgroundColor: '#E5E7EB' }} />
                </div>

                {/* Main */}
                <div style={{ flex: 1, padding: 40, display: 'flex', flexDirection: 'column', gap: 32 }}>

                    {/* Header */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <h2 style={{ fontSize: 32, fontWeight: 700, margin: 0, color: '#111827' }}>Overview</h2>
                        <div style={{ display: 'flex', gap: 12 }}>
                            <div style={{ padding: '8px 16px', borderRadius: 8, border: '1px solid #E5E7EB', fontSize: 14, fontWeight: 500, color: '#374151' }}>Export</div>
                            <div style={{ padding: '8px 16px', borderRadius: 8, backgroundColor: '#111827', fontSize: 14, fontWeight: 500, color: '#FFFFFF' }}>New Report</div>
                        </div>
                    </div>

                    {/* KPI Cards */}
                    <div style={{ display: 'flex', gap: 24 }}>
                        {/* Card 1: Revenue */}
                        <div style={{ flex: 1, padding: 24, backgroundColor: 'white', borderRadius: 16, border: '1px solid #E5E7EB', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
                            <div style={{ fontSize: 14, color: '#6B7280', fontWeight: 500 }}>Total Revenue</div>
                            <div style={{ fontSize: 36, fontWeight: 700, color: '#111827', marginTop: 8 }}>
                                ${Math.round(revenueCount).toLocaleString()}
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 8 }}>
                                <span style={{ color: '#10B981', fontSize: 14, fontWeight: 600 }}>+12.5%</span>
                                <span style={{ color: '#9CA3AF', fontSize: 14 }}>vs last month</span>
                            </div>
                        </div>
                        {/* Card 2: Users */}
                        <div style={{ flex: 1, padding: 24, backgroundColor: 'white', borderRadius: 16, border: '1px solid #E5E7EB', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
                            <div style={{ fontSize: 14, color: '#6B7280', fontWeight: 500 }}>Active Users</div>
                            <div style={{ fontSize: 36, fontWeight: 700, color: '#111827', marginTop: 8 }}>8,432</div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 8 }}>
                                <span style={{ color: '#10B981', fontSize: 14, fontWeight: 600 }}>+4.2%</span>
                                <span style={{ color: '#9CA3AF', fontSize: 14 }}>vs last month</span>
                            </div>
                        </div>
                    </div>

                    {/* Chart Container */}
                    <div style={{
                        flex: 1,
                        backgroundColor: 'white',
                        borderRadius: 16,
                        border: '1px solid #E5E7EB',
                        padding: 32,
                        position: 'relative',
                        display: 'flex',
                        alignItems: 'flex-end',
                        overflow: 'hidden'
                    }}>
                        {/* Mock Chart SVG */}
                        <svg width="100%" height="100%" viewBox="0 0 800 400" preserveAspectRatio="none">
                            <defs>
                                <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.2" />
                                    <stop offset="100%" stopColor="#3B82F6" stopOpacity="0" />
                                </linearGradient>
                            </defs>
                            {/* Animated Path */}
                            <path
                                d="M0 350 C 100 350, 150 200, 250 220 C 350 240, 400 100, 500 150 C 600 200, 650 50, 800 80"
                                fill="none"
                                stroke="#3B82F6"
                                strokeWidth="4"
                                strokeDasharray="1500"
                                strokeDashoffset={interpolate(chartProgress, [0, 1], [1500, 0])}
                            />
                            <path
                                d="M0 350 C 100 350, 150 200, 250 220 C 350 240, 400 100, 500 150 C 600 200, 650 50, 800 80 V 400 H 0 Z"
                                fill="url(#chartGradient)"
                                opacity={chartProgress}
                            />
                        </svg>
                    </div>

                </div>
            </div>

            {/* Sparkle Icon */}
            <div style={{
                position: 'absolute',
                top: 40,
                right: 40,
                transform: `scale(${sparkleScale})`,
            }}>
                <svg width="48" height="48" viewBox="0 0 24 24" fill="#F59E0B">
                    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                </svg>
            </div>
        </div>
    );
};
