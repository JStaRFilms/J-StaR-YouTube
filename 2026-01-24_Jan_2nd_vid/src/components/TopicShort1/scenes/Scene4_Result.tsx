import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import React from 'react';
import { FintechDashboard } from '../ui/FintechDashboard';
import { LightWindow } from '../ui/LightWindow';

const DownArrow = ({ scale = 1 }) => (
    <svg width={100 * scale} height={100 * scale} viewBox="0 0 24 24" fill="none" stroke="#EF4444" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="5" x2="12" y2="19" />
        <polyline points="19 12 12 19 5 12" />
    </svg>
);

export const Scene4_Result: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    // Timeline:
    // 0-45: Prompt Typing "Build Fintech Dashboard"
    // 45: SNAP to Dashboard
    // 45-120: Dashboard Animation
    // 120-180: Outro (Arrow + Text)

    const snapFrame = 45;
    const outroFrame = 120;

    // Phase 1: Prompt
    const text = "Build Fintech Dashboard";
    const chars = Math.min(text.length, Math.floor(frame / 2));
    const currentText = text.substring(0, chars);
    const promptOpacity = frame < snapFrame ? 1 : 0;

    // Phase 2: Dashboard Snap
    // Scale starts slightly larger and snaps to 1? Or just appears.
    // Script says "Instant Snap".
    const showDashboard = frame >= snapFrame;
    const dashScale = spring({
        frame: frame - snapFrame,
        fps,
        config: { stiffness: 300, damping: 20 }, // Snappy
    });

    // Phase 3: Outro
    const showOutro = frame > outroFrame;
    const outroOpacity = interpolate(frame, [outroFrame, outroFrame + 20], [0, 1]);
    const arrowBounce = Math.sin((frame - outroFrame) * 0.3) * 10;

    return (
        <AbsoluteFill style={{ backgroundColor: '#FFFFFF', justifyContent: 'center', alignItems: 'center' }}>

            {/* Phase 1: Prompt Input */}
            <div style={{
                opacity: promptOpacity,
                position: 'absolute',
                width: 600,
                height: 200,
            }}>
                <LightWindow title="Cursor Chat">
                    <div style={{
                        padding: 32,
                        fontFamily: 'Inter, sans-serif',
                        fontSize: 32,
                        fontWeight: 500,
                        color: '#111827',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 2,
                    }}>
                        {currentText}
                        <div style={{
                            width: 3,
                            height: 40,
                            backgroundColor: '#3B82F6',
                            opacity: Math.sin(frame * 0.5) > 0 ? 1 : 0
                        }} />
                    </div>
                </LightWindow>
            </div>

            {/* Phase 2: Dashboard */}
            {showDashboard && (
                <div style={{ transform: `scale(${dashScale})` }}>
                    <FintechDashboard />
                </div>
            )}

            {/* Phase 3: Outro */}
            <div style={{
                position: 'absolute',
                bottom: 100,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 24,
                opacity: outroOpacity,
            }}>
                <div style={{ transform: `translateY(${arrowBounce}px)` }}>
                    <DownArrow scale={1.5} />
                </div>
                <div style={{
                    fontFamily: 'Inter, sans-serif',
                    fontWeight: 900,
                    fontSize: 48,
                    color: '#111827',
                    letterSpacing: 2,
                    backgroundColor: '#FFFFFF',
                    padding: '8px 24px',
                    borderRadius: 12,
                    boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)',
                    border: '1px solid #E5E7EB',
                }}>
                    LINK IN DESCRIPTION
                </div>
            </div>
        </AbsoluteFill>
    );
};
