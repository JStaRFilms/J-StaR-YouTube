import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { MousePointer2, X } from "lucide-react";
import React from 'react';

const COLORS = {
    bg: '#FDFCFB',
    text: '#1C1917',
    accent: '#EA580C',
    panel: '#FFFFFF',
    border: '#E7E5E4'
};

const PALETTE = [
    '#EF4444', '#F97316', '#F59E0B', '#84CC16',
    '#10B981', '#06B6D4', '#3B82F6', '#6366F1',
    '#8B5CF6', '#D946EF', '#F43F5E', '#881337'
];

export const Scene1Hook: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    // Animations
    const cursorProgress = spring({
        frame: frame - 15,
        fps,
        config: { damping: 20 }
    });

    // Target the X button (approx coordinates based on layout)
    // Modal is 600px wide, center is 540. X is at right edge minus padding.
    // Center screen is 540, 960.
    // Modal is width 600.
    // X button container is flex-end.
    const cursorX = interpolate(cursorProgress, [0, 1], [600, 780]);
    const cursorY = interpolate(cursorProgress, [0, 1], [1000, 780]); // Adjusted to hit Top-Right

    // Click effect
    const clickFrame = 40;
    const isClicked = frame >= clickFrame;
    const clickScale = interpolate(frame, [clickFrame, clickFrame + 5, clickFrame + 10], [1, 0.8, 1], { extrapolateRight: 'clamp' });

    // Modal Animations
    const modalOpacity = interpolate(frame, [0, 10], [0, 1], { extrapolateRight: 'clamp' });
    // Close modal on click
    const modalScale = spring({
        frame: isClicked ? frame - clickFrame : frame,
        fps,
        config: { damping: 20 },
        from: isClicked ? 1 : 0,
        to: isClicked ? 0 : 1 // Scale down to 0 when clicked
    });

    // STOP Text - Appears AFTER click/close
    const stopScale = spring({
        frame: frame - (clickFrame + 5),
        fps,
        config: { damping: 12, stiffness: 100 }
    });

    return (
        <AbsoluteFill style={{ backgroundColor: COLORS.bg, justifyContent: 'center', alignItems: 'center' }}>

            {/* Background Ambience */}
            <AbsoluteFill style={{ opacity: 0.05, backgroundImage: 'radial-gradient(circle at center, #000 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

            {/* Modal Window */}
            <div style={{
                backgroundColor: COLORS.panel,
                borderRadius: 20,
                boxShadow: '0 20px 50px -10px rgba(0,0,0,0.1)',
                border: `1px solid ${COLORS.border}`,
                padding: 40,
                width: 600,
                opacity: modalOpacity,
                transform: `scale(${modalScale})`,
                display: 'flex',
                flexDirection: 'column',
                gap: 20
            }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                    <div style={{ fontSize: 24, fontWeight: 600, color: COLORS.text, fontFamily: 'Inter, sans-serif' }}>Color Picker</div>
                    <div style={{ padding: 8, cursor: 'pointer' }}>
                        <X size={24} color={COLORS.text} />
                    </div>
                </div>

                {/* Color Grid Populated */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
                    {PALETTE.map((color, i) => (
                        <div key={i} style={{
                            aspectRatio: '1',
                            backgroundColor: color,
                            borderRadius: 12,
                            transform: i === 6 && isClicked ? 'scale(0.95)' : 'scale(1)', // Index 6 is #3B82F6
                            boxShadow: i === 6 && isClicked ? 'inset 0 2px 4px rgba(0,0,0,0.2)' : 'none',
                            transition: 'transform 0.1s'
                        }} />
                    ))}
                </div>
            </div>

            {/* STOP Text Overlay */}
            <div style={{
                position: 'absolute',
                fontSize: 180,
                fontWeight: 900,
                color: COLORS.accent,
                fontFamily: 'Merriweather, serif',
                transform: `scale(${stopScale}) rotate(-5deg)`,
                opacity: Math.min(1, Math.max(0, interpolate(frame, [clickFrame + 10, clickFrame + 15], [0, 1]))),
                textShadow: '0 10px 30px rgba(234, 88, 12, 0.2)',
                zIndex: 100,
                pointerEvents: 'none'
            }}>
                STOP
            </div>

            {/* Cursor */}
            <div style={{
                position: 'absolute',
                left: cursorX,
                top: cursorY,
                transform: `scale(${clickScale})`,
                zIndex: 200,
                filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.1))',
                marginTop: -10, // Offset to make pointer tip hit target
                marginLeft: -10
            }}>
                <MousePointer2 size={64} fill="black" color="white" strokeWidth={1} />
            </div>

        </AbsoluteFill>
    );
};
