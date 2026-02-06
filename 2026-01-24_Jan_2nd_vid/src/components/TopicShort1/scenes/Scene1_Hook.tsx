import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig, random } from 'remotion';
import React from 'react';
import { ColorPicker } from '../ui/ColorPickerUI';
import { LightWindow } from '../ui/LightWindow';
import { Cursor } from '../ui/Cursor';

export const Scene1_Hook: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    // Animations
    const scale = spring({
        frame,
        fps,
        config: {
            damping: 12, // Stiff slam
            stiffness: 200,
            mass: 1.5,
        },
    });

    // Shake effect after slam
    const shake = Math.sin(frame * 0.5) * interpolate(frame, [5, 15], [20, 0], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
    });

    // Chromatic Aberration for "STOP" (Simulated by 3 layers)
    const aberrationOffset = interpolate(frame, [0, 5, 20], [10, 5, 0], { extrapolateRight: 'clamp' });

    // Background Glitch (Random gray blocks)
    const glitchSeed = Math.floor(frame / 2); // Change every 2 frames
    const isGlitchy = random(glitchSeed) > 0.7; // 30% chance of glitch active
    const glitchHeight = random(glitchSeed + 1) * 100 + 50;
    const glitchTop = random(glitchSeed + 2) * 1080;

    // SLAP ACTION
    // Color Picker enters from center (or is just there)
    // Hand/Cursor enters quickly from right
    // Picker flies off to left

    const slapFrame = 15;

    // Slap Hand Movement
    const handX = interpolate(frame, [slapFrame - 5, slapFrame, slapFrame + 10], [1200, 540, -200], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp'
    });
    const handRotation = interpolate(frame, [slapFrame - 5, slapFrame], [20, -45], { extrapolateRight: 'clamp' });

    // Color Picker Movement (Getting slapped)
    const pickerX = interpolate(frame, [0, slapFrame, slapFrame + 10], [540, 540, -800], {
        extrapolateRight: 'clamp'
    });
    const pickerRotate = interpolate(frame, [slapFrame, slapFrame + 10], [0, -90], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

    // Picker is visible only for first few seconds
    const pickerOpacity = interpolate(frame, [0, 30], [1, 0]);

    return (
        <AbsoluteFill style={{ backgroundColor: '#FFFFFF', overflow: 'hidden' }}>

            {/* Glitch Background Layer */}
            {isGlitchy && (
                <div style={{
                    position: 'absolute',
                    top: glitchTop,
                    left: 0,
                    width: '100%',
                    height: glitchHeight,
                    backgroundColor: '#F3F4F6',
                    opacity: 0.5,
                    zIndex: 0,
                }} />
            )}

            {/* Elements to be SLAPPED */}
            <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center', opacity: pickerOpacity }}>
                <div style={{
                    transform: `translateX(${pickerX - 540}px) rotate(${pickerRotate}deg)`, // -540 to center relative to AbsoluteFill center
                    width: 600,
                }}>
                    <LightWindow title="Manual Color Picker">
                        <div style={{ padding: 24 }}>
                            <ColorPicker />
                        </div>
                    </LightWindow>
                </div>
            </AbsoluteFill>

            {/* The HAND (Giant Cursor) */}
            <div style={{
                position: 'absolute',
                top: '50%',
                left: handX,
                transform: `rotate(${handRotation}deg) scale(5)`,
                zIndex: 10,
            }}>
                <Cursor color="#000000" />
            </div>

            {/* Flash Overlay */}
            <AbsoluteFill style={{
                backgroundColor: '#9CA3AF',
                opacity: interpolate(frame, [0, 2, 8], [0, 0.3, 0]),
                zIndex: 20,
                pointerEvents: 'none'
            }} />

            {/* Main Text Layer (On top of everything) */}
            <AbsoluteFill
                style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '24px',
                    zIndex: 30,
                }}
            >
                {/* "STOP" with Aberration */}
                <div style={{ position: 'relative' }}>
                    {/* Red Channel */}
                    <h1 style={{
                        fontFamily: 'Inter, sans-serif', fontWeight: 900, fontSize: '180px', color: 'rgba(239, 68, 68, 0.7)',
                        margin: 0, lineHeight: 0.8, textAlign: 'center',
                        position: 'absolute', top: 0, left: -aberrationOffset,
                        transform: `scale(${scale}) translateX(${shake}px)`,
                    }}>STOP</h1>

                    {/* Blue Channel */}
                    <h1 style={{
                        fontFamily: 'Inter, sans-serif', fontWeight: 900, fontSize: '180px', color: 'rgba(37, 99, 235, 0.7)',
                        margin: 0, lineHeight: 0.8, textAlign: 'center',
                        position: 'absolute', top: 0, left: aberrationOffset,
                        transform: `scale(${scale}) translateX(${shake}px)`,
                    }}>STOP</h1>

                    {/* Main Text */}
                    <h1
                        style={{
                            fontFamily: 'Inter, sans-serif',
                            fontWeight: 900,
                            fontSize: '180px',
                            color: '#111827', // Black for contrast against the red/blue glitch implies severity, or stick to Red per script
                            // Script says Red #EF4444. Let's start with Red and assume the glitch handles the chaos.
                            // Actually, let's keep it Red #EF4444 main.
                        }}
                    >
                        <span style={{ color: '#EF4444', display: 'block', transform: `scale(${scale}) translateX(${shake}px)` }}>STOP</span>
                    </h1>
                </div>

                {/* Subtext */}
                <h2
                    style={{
                        fontFamily: 'Inter, sans-serif',
                        fontWeight: 700,
                        fontSize: '42px',
                        color: '#111827', // Gray-900
                        margin: 0,
                        textAlign: 'center',
                        opacity: interpolate(frame, [10, 20], [0, 1], {
                            extrapolateRight: 'clamp'
                        }),
                        transform: `translateY(${interpolate(frame, [10, 20], [20, 0], { extrapolateRight: 'clamp' })}px)`,
                        background: '#FFFFFF', // Boxed for readability
                        padding: '8px 16px',
                    }}
                >
                    TELLING AI WHAT<br />COLORS TO USE
                </h2>
            </AbsoluteFill>
        </AbsoluteFill>
    );
};
