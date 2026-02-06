import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { TrendingUp, Users, DollarSign, Activity } from "lucide-react";
import React from 'react';

const COLORS = {
    bg: '#FDFCFB',
    surface: '#FFFFFF',
    text: '#1C1917',
    textSec: '#78716C',
    accent: '#EA580C',
    success: '#65A30D',
    border: '#E7E5E4'
};

const Card = ({ title, value, icon, delay }: { title: string, value: string, icon: any, delay: number }) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();
    const scale = spring({ frame: frame - delay, fps, config: { damping: 15 } });
    const opacity = interpolate(frame, [delay, delay + 10], [0, 1]);

    return (
        <div style={{
            backgroundColor: COLORS.surface,
            borderRadius: 16,
            padding: 24,
            border: `1px solid ${COLORS.border}`,
            boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
            transform: `scale(${scale})`,
            opacity,
            display: 'flex',
            flexDirection: 'column',
            gap: 12
        }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: COLORS.textSec, fontSize: 16, fontWeight: 500 }}>{title}</span>
                {icon}
            </div>
            <div style={{ fontSize: 32, fontWeight: 700, color: COLORS.text, fontFamily: 'Merriweather, serif' }}>{value}</div>
        </div>
    );
};

export const Scene5Result: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    // Dashboard Slide Up
    const slideUp = spring({ frame, fps, config: { damping: 20 } });
    const containerY = interpolate(slideUp, [0, 1], [1920, 0]);

    // Typing Effect
    const text = "Build Fintech Dashboard";
    const charsShown = Math.floor(interpolate(frame, [0, 30], [0, text.length], { extrapolateRight: 'clamp' }));

    return (
        <AbsoluteFill style={{ backgroundColor: COLORS.bg }}>

            {/* Typing Intro (Fades out) */}
            <AbsoluteFill style={{
                justifyContent: 'center',
                alignItems: 'center',
                opacity: interpolate(frame, [30, 40], [1, 0])
            }}>
                <div style={{ fontSize: 48, fontFamily: 'Inter', fontWeight: 600 }}>
                    {text.slice(0, charsShown)}
                    <span style={{ opacity: Math.floor(frame / 10) % 2 ? 1 : 0 }}>|</span>
                </div>
            </AbsoluteFill>

            {/* Dashboard Container */}
            <AbsoluteFill style={{
                marginTop: 200,
                padding: 40,
                transform: `translateY(${containerY}px)`
            }}>
                <h1 style={{ fontFamily: 'Merriweather', fontSize: 48, fontWeight: 900, marginBottom: 40 }}>Overview</h1>

                {/* Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
                    <Card title="Total Revenue" value="$45,231.89" delay={35} icon={<DollarSign color={COLORS.success} />} />
                    <Card title="Active Users" value="2,543" delay={40} icon={<Users color={COLORS.accent} />} />
                    <Card title="Growth" value="+12.5%" delay={45} icon={<TrendingUp color={COLORS.success} />} />
                    <Card title="Bounce Rate" value="2.4%" delay={50} icon={<Activity color={COLORS.textSec} />} />
                </div>

                {/* Big Chart Area */}
                <div style={{
                    marginTop: 20,
                    backgroundColor: COLORS.surface,
                    borderRadius: 16,
                    padding: 24,
                    height: 400,
                    border: `1px solid ${COLORS.border}`,
                    display: 'flex',
                    alignItems: 'end',
                    justifyContent: 'space-between',
                    paddingBottom: 0,
                    overflow: 'hidden',
                    boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
                    transform: `scale(${spring({ frame: frame - 55, fps })})`,
                    opacity: interpolate(frame, [55, 65], [0, 1])
                }}>
                    {[...Array(10)].map((_, i) => {
                        const height = 100 + Math.random() * 200;
                        return (
                            <div key={i} style={{
                                width: '8%',
                                height: `${height}px`,
                                backgroundColor: i % 2 === 0 ? COLORS.accent : COLORS.success,
                                borderRadius: '8px 8px 0 0',
                                opacity: 0.8
                            }} />
                        )
                    })}
                </div>

            </AbsoluteFill>
        </AbsoluteFill>
    );
};
