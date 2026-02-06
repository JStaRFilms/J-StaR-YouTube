import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { FileCode, Check } from "lucide-react";
import React from 'react';

const COLORS = {
    bg: '#FDFCFB',
    text: '#1C1917',
    success: '#65A30D', // Sage 600
    accent: '#EA580C',
    panel: '#FFFFFF'
};

export const Scene4Solution: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    // Animation Timing
    const enterFrame = 10; // File appears
    const holdDuration = 40; // Stay readable for longer (was instant)
    const injectFrame = enterFrame + holdDuration; // 50
    const finishFrame = injectFrame + 15; // 65

    // File Animation
    // 1. Enter Phase: Fade in / Slide down slightly
    const fileEnter = spring({
        frame: frame - enterFrame,
        fps,
        config: { damping: 15 }
    });

    // 2. Inject Phase: Shoot down
    const fileInject = spring({
        frame: frame - injectFrame,
        fps,
        config: { damping: 15, stiffness: 80 }
    });

    // Y Position Logic:
    // 0 to 1 (Enter): -400 to -300 (Visible above head)
    // 0 to 1 (Inject): -300 to 150 (Deep inside)

    // Combine animations manually or via variable
    const initialY = interpolate(fileEnter, [0, 1], [-400, -300]);
    const injectY = interpolate(fileInject, [0, 1], [0, 450]);
    const currentY = initialY + injectY;

    const fileScale = interpolate(frame, [injectFrame, finishFrame], [1, 0.2], { extrapolateRight: 'clamp' });
    const fileOpacity = interpolate(frame, [injectFrame + 5, finishFrame], [1, 0], { extrapolateRight: 'clamp' });

    // Robot Reaction
    const isLoaded = frame > finishFrame - 5;
    const headPulse = spring({ frame: frame - (finishFrame - 5), fps, config: { damping: 10 } });

    // Text Reveal
    const textY = spring({ frame: frame - (finishFrame + 5), fps, config: { damping: 15 } });
    const textOpacity = interpolate(frame, [finishFrame + 5, finishFrame + 15], [0, 1]);

    return (
        <AbsoluteFill style={{ backgroundColor: COLORS.bg, justifyContent: 'center', alignItems: 'center' }}>

            {/* Container for Head + Injection */}
            <div style={{ position: 'relative', width: 300, height: 400, display: 'flex', justifyContent: 'center', alignItems: 'flex-end' }}>

                {/* Flying File */}
                <div style={{
                    position: 'absolute',
                    top: 0,
                    transform: `translateY(${currentY}px) scale(${fileScale})`,
                    opacity: fileEnter < 0.1 ? 0 : fileOpacity, // Hide before entry
                    zIndex: 5,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <div style={{
                        backgroundColor: COLORS.panel,
                        padding: 20,
                        borderRadius: 16,
                        boxShadow: '0 10px 20px rgba(0,0,0,0.1)',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center'
                    }}>
                        <FileCode size={80} color={COLORS.accent} />
                        <div style={{ fontWeight: 700, marginTop: 10, fontSize: 20, fontFamily: 'Inter' }}>SKILL.md</div>
                    </div>
                </div>

                {/* Robot Head (The Mask) */}
                <div style={{
                    width: 300,
                    height: 300,
                    backgroundColor: isLoaded ? COLORS.success : COLORS.text,
                    borderRadius: 40,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    position: 'relative',
                    boxShadow: isLoaded ? '0 0 60px rgba(101, 163, 13, 0.6)' : '0 20px 40px rgba(0,0,0,0.2)',
                    zIndex: 10,
                    overflow: 'hidden',
                    transform: `scale(${isLoaded ? 1 + (headPulse * 0.1) : 1})`,
                    transition: 'background-color 0.3s'
                }}>

                    {/* Slot Graphic at Top */}
                    <div style={{
                        position: 'absolute',
                        top: -5,
                        width: 120,
                        height: 20,
                        backgroundColor: '#444',
                        borderRadius: '0 0 10px 10px'
                    }} />

                    {/* Eyes */}
                    <div style={{ display: 'flex', gap: 40 }}>
                        {isLoaded ? (
                            <>
                                <Check size={80} color="#FFF" strokeWidth={4} />
                                <Check size={80} color="#FFF" strokeWidth={4} />
                            </>
                        ) : (
                            <>
                                <div style={{ width: 60, height: 60, borderRadius: '50%', backgroundColor: '#FFF' }} />
                                <div style={{ width: 60, height: 60, borderRadius: '50%', backgroundColor: '#FFF' }} />
                            </>
                        )}
                    </div>
                </div>
            </div>

            {/* Success Text */}
            <div style={{
                position: 'absolute',
                bottom: 300,
                width: '100%',
                textAlign: 'center',
                fontFamily: 'Merriweather, serif',
                fontSize: 60,
                fontWeight: 900,
                color: COLORS.success,
                opacity: textOpacity,
                transform: `translateY(${100 * (1 - textY)}px)`
            }}>
                PRINCIPLES LOADED
            </div>

        </AbsoluteFill>
    );
};
