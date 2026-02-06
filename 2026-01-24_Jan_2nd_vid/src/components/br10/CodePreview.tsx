import React from 'react';
import { interpolate, useCurrentFrame, useVideoConfig } from 'remotion';

export const CodePreview: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    // Animation
    const opacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: 'clamp' });
    const scale = interpolate(frame, [0, 30], [0.8, 1], {
        extrapolateRight: 'clamp',
        easing: (t) => t * (2 - t)
    });

    return (
        <div
            style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: `translate(-50%, -50%) scale(${scale})`,
                width: 800,
                height: 500,
                background: 'rgba(15, 23, 42, 0.9)', // Slate-900
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: 16,
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
                backdropFilter: 'blur(20px)',
                opacity,
                overflow: 'hidden',
                fontFamily: '"JetBrains Mono", monospace',
                display: 'flex',
                flexDirection: 'column',
            }}
        >
            {/* Header */}
            <div style={{
                padding: '16px 24px',
                borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                display: 'flex',
                alignItems: 'center',
                gap: 12
            }}>
                <div style={{ display: 'flex', gap: 8 }}>
                    <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#ef4444' }} />
                    <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#eab308' }} />
                    <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#22c55e' }} />
                </div>
                <span style={{ color: '#94a3b8', fontSize: 14 }}>SKILL.md</span>
            </div>

            {/* Content */}
            <div style={{ padding: 32, color: '#f8fafc', fontSize: 16, lineHeight: 1.6 }}>
                <div style={{ marginBottom: 16 }}>
                    <span style={{ color: '#c084fc' }}>---</span><br />
                    <span style={{ color: '#38bdf8' }}>name</span>: <span style={{ color: '#a5f3fc' }}>ui-ux-pro-max</span><br />
                    <span style={{ color: '#38bdf8' }}>description</span>: <span style={{ color: '#cbd5e1' }}>Comprehensive design guide for web apps.</span><br />
                    <span style={{ color: '#c084fc' }}>---</span>
                </div>

                <div>
                    <span style={{ color: '#f472b6' }}># ui-ux-pro-max</span><br /><br />
                    <span style={{ color: '#cbd5e1' }}>Use when the user requests </span>
                    <span style={{ color: '#fbbf24' }}>UI/UX work</span>
                    <span style={{ color: '#cbd5e1' } as React.CSSProperties}>...</span><br /><br />
                    <span style={{ color: '#94a3b8' }}>// Instructions load automatically</span><br />
                    <span style={{ color: '#818cf8' }}>const</span> <span style={{ color: '#e2e8f0' }}>skill</span> <span style={{ color: '#c084fc' }}>=</span> <span style={{ color: '#22c55e' }}>loadSkill</span>(<span style={{ color: '#fcd34d' }}>'ui-ux-pro-max'</span>);
                </div>
            </div>
        </div>
    );
};
