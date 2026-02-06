import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import React from 'react';

const COLORS = {
    bg: '#FAF9F6', // Sand 100
    text: '#1C1917',
    codeBg: '#FFFFFF',
    border: '#E7E5E4'
};

export const Scene2Mistake: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    // Animations
    const trashScale = spring({ frame: frame - 20, fps, config: { damping: 15 } });

    // Lid Animation - Opens WIDE
    const lidRotation = spring({
        frame: frame - 45,
        fps,
        config: { damping: 15, stiffness: 100 }
    });

    const lidClose = spring({
        frame: frame - 80, // Close later
        fps,
        config: { damping: 15, stiffness: 100 }
    });

    const currentLidRotation = -110 * (lidRotation - lidClose); // Open even wider

    // Code Animation
    const codeEnter = spring({ frame: frame - 30, fps, config: { damping: 20 } });

    // Code falling INTO bin
    const codeFall = interpolate(frame, [60, 80], [0, 600], {
        easing: (t) => t * t,
        extrapolateRight: 'clamp'
    });

    const codeRotate = interpolate(frame, [60, 80], [0, 95], { extrapolateRight: 'clamp' });
    const codeScale = interpolate(frame, [60, 80], [1, 0.4], { extrapolateRight: 'clamp' });

    return (
        <AbsoluteFill style={{ backgroundColor: COLORS.bg }}>

            {/* Trash Can Container - Centered */}
            <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center', paddingTop: 400 }}>
                <div style={{ position: 'relative', transform: `scale(${trashScale})` }}>

                    {/* Trash Back (Behind Code) */}
                    <div style={{
                        position: 'absolute',
                        width: 140,
                        height: 180,
                        zIndex: 0,
                        top: 0,
                        left: 0
                    }}>
                        <svg width="140" height="180" viewBox="0 0 140 180" fill="none">
                            {/* Back panel: Darker internal color */}
                            <path d="M0 0 H140 L125 180 H15 L0 0 Z" fill="#D6D3D1" />
                        </svg>
                    </div>

                    {/* Code Block - Middle Layer */}
                    <div style={{
                        position: 'absolute',
                        top: -400, // Start high above
                        left: -100, // Center relative to bin
                        width: 340, // Match Approx Code width
                        transform: `translateY(${codeFall}px) rotate(${codeRotate}deg) scale(${codeScale})`,
                        zIndex: 10, // Between Back and Front
                        opacity: interpolate(frame, [75, 80], [1, 0]), // Fade out once fully deep inside
                    }}>
                        <div style={{
                            transform: `scale(${codeEnter})`,
                            backgroundColor: COLORS.codeBg,
                            padding: '20px 40px',
                            borderRadius: 12,
                            border: `1px solid ${COLORS.border}`,
                            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                            fontFamily: 'Inter, monospace',
                            fontSize: 32,
                            fontWeight: 600,
                            color: COLORS.text,
                            whiteSpace: 'nowrap'
                        }}>
                            <span style={{ color: '#EA580C' }}>const</span> col = <span style={{ color: '#3B82F6' }}>"#3B82F6"</span>;
                        </div>
                    </div>

                    {/* Trash Lid (Behind Front, On Top of Code entry point?) */}
                    <div style={{
                        position: 'absolute',
                        top: -15,
                        left: 20,
                        width: 160,
                        height: 20,
                        transformOrigin: 'bottom right',
                        transform: `rotate(${currentLidRotation}deg)`,
                        zIndex: 40
                    }}>
                        <div style={{ width: '100%', height: '100%', backgroundColor: COLORS.text, borderRadius: 6 }} />
                        <div style={{ width: 40, height: 8, backgroundColor: COLORS.text, borderRadius: '4px 4px 0 0', margin: '-8px auto 0' }} />
                    </div>

                    {/* Trash Body Front (In Front of Code) */}
                    <div style={{
                        position: 'relative',
                        width: 140,
                        height: 180,
                        zIndex: 20,
                        pointerEvents: 'none' // Let code fall through logically
                    }}>
                        <svg width="140" height="180" viewBox="0 0 140 180" fill="none">
                            {/* Front panel with transparency or style */}
                            <path d="M0 0 H140 L125 180 H15 L0 0 Z" fill="none" stroke={COLORS.text} strokeWidth="6" />
                            {/* Vertical Lines */}
                            <line x1="45" y1="40" x2="45" y2="140" stroke={COLORS.text} strokeWidth="6" strokeLinecap="round" />
                            <line x1="95" y1="40" x2="95" y2="140" stroke={COLORS.text} strokeWidth="6" strokeLinecap="round" />
                        </svg>
                    </div>

                </div>
            </AbsoluteFill>

        </AbsoluteFill>
    );
};
