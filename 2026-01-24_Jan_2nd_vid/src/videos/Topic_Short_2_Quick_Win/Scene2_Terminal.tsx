import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate } from 'remotion';

// Dark background color to match main composition
const DARK_BG_COLOR = '#0A0A0F';

export const Scene2_Terminal: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    // Camera zoom effect - zoom into the editor
    const zoomProgress = interpolate(frame, [0, 2 * fps], [1, 1.3], {
        extrapolateRight: 'clamp',
        easing: (t) => t * (2 - t) // Ease out
    });

    // QUICK FIX stamp animation
    const stampSpring = spring({
        frame: frame - 5,
        fps,
        config: { damping: 8, stiffness: 200 },
    });
    const stampScale = interpolate(stampSpring, [0, 1], [2.5, 1]);
    const stampRotation = interpolate(stampSpring, [0, 1], [-30, -10]);
    const stampOpacity = interpolate(frame, [0, 8], [0, 1], { extrapolateRight: 'clamp' });

    return (
        <AbsoluteFill style={{
            backgroundColor: DARK_BG_COLOR,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden'
        }}>
            {/* Code Editor Container with Zoom */}
            <div style={{
                transform: `scale(${zoomProgress})`,
                transformOrigin: 'center center',
                width: '90%',
                maxWidth: '900px'
            }}>
                {/* VS Code-like Window */}
                <div style={{
                    backgroundColor: 'white',
                    borderRadius: '16px',
                    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(0,0,0,0.05)',
                    overflow: 'hidden',
                    border: '1px solid #E2E8F0'
                }}>
                    {/* Window Header */}
                    <div style={{
                        backgroundColor: '#F1F5F9',
                        padding: '16px 20px',
                        borderBottom: '1px solid #E2E8F0',
                        display: 'flex',
                        gap: '8px',
                        alignItems: 'center'
                    }}>
                        <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#EF4444' }} />
                        <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#F59E0B' }} />
                        <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#22C55E' }} />
                        <span style={{ marginLeft: '16px', fontSize: '14px', color: '#64748B', fontFamily: 'Inter, sans-serif' }}>
                            prompt.txt
                        </span>
                    </div>

                    {/* Editor Content */}
                    <div style={{
                        padding: '32px',
                        fontFamily: '"JetBrains Mono", "Fira Code", monospace',
                        fontSize: '22px',
                        lineHeight: '1.8',
                        backgroundColor: '#FFFFFF',
                        minHeight: '300px'
                    }}>
                        {/* Line numbers and code */}
                        <div style={{ display: 'flex', gap: '24px' }}>
                            {/* Line Numbers */}
                            <div style={{
                                color: '#94A3B8',
                                textAlign: 'right',
                                userSelect: 'none',
                                fontSize: '18px',
                                lineHeight: '1.8'
                            }}>
                                <div>1</div>
                                <div>2</div>
                                <div>3</div>
                                <div>4</div>
                                <div>5</div>
                            </div>

                            {/* Code Content */}
                            <div style={{ color: '#1E293B' }}>
                                <div>
                                    <span style={{ color: '#64748B' }}>// </span>
                                    <span style={{ color: '#64748B' }}>Before you prompt, add this line:</span>
                                </div>
                                <div style={{ marginTop: '16px' }}>
                                    <span style={{ color: '#8B5CF6' }}>const</span>
                                    <span> prompt = </span>
                                    <span style={{ color: '#22C55E' }}>"Reference the Tailwind UI</span>
                                </div>
                                <div>
                                    <span style={{ color: '#22C55E' }}>design patterns..."</span>
                                </div>
                                <div style={{ marginTop: '16px' }}>
                                    <span style={{ color: '#64748B' }}>// This is your quick fix ✨</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* QUICK FIX Stamp */}
            <div style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: `translate(-50%, -50%) scale(${stampScale}) rotate(${stampRotation}deg)`,
                opacity: stampOpacity,
                border: '8px solid #EF4444',
                borderRadius: '16px',
                padding: '20px 50px',
                color: '#EF4444',
                fontSize: '72px',
                fontWeight: '900',
                textTransform: 'uppercase',
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                boxShadow: '0 20px 40px rgba(239, 68, 68, 0.3), inset 0 0 20px rgba(239, 68, 68, 0.1)',
                fontFamily: 'Arial, sans-serif',
                letterSpacing: '4px',
                zIndex: 10
            }}>
                QUICK FIX
            </div>
        </AbsoluteFill>
    );
};
