import { z } from 'zod';
import { Composition, AbsoluteFill, Video, useVideoConfig, Sequence, interpolate, useCurrentFrame } from 'remotion';
import { ASSETS } from '../utils/assets';
import React from 'react';

// BASIC COLOR GRADE COMPONENT
const ColorGrade: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return ( // Brightness + Contrast boost
        <div style={{ filter: 'contrast(1.1) saturation(1.15) brightness(1.05)', width: '100%', height: '100%' }}>
            {children}
        </div>
    );
};

// IMPACT TEXT COMPONENT
const ImpactText: React.FC<{ text: string, y?: number, color?: string }> = ({ text, y = 0, color = 'white' }) => {
    const frame = useCurrentFrame();
    const opacity = interpolate(frame, [0, 5], [0, 1]);
    const scale = interpolate(frame, [0, 5], [0.9, 1]);

    return (
        <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: `translate(-50%, calc(-50% + ${y}px)) scale(${scale})`,
            opacity,
            width: '80%',
            textAlign: 'center',
            fontFamily: 'Impact, sans-serif',
            fontSize: 70,
            lineHeight: 1.1,
            color: color,
            textShadow: '0 4px 20px rgba(0,0,0,0.8)',
            textTransform: 'uppercase',
        }}>
            {text}
        </div>
    );
};

export const topicShort1Schema = z.object({
    startFrame: z.number().min(0).step(1),
    durationSec: z.number().min(5).max(300),
});

export const TopicShort1: React.FC<z.infer<typeof topicShort1Schema>> = ({
    startFrame = 51431,
    durationSec = 60
}) => {
    const { fps } = useVideoConfig();
    const endFrame = startFrame + (durationSec * fps);

    // SCRIPT TIMING (Tentative - User to adjust)
    // 0s: "Stop telling AI what colors to use. Seriously."
    // 4s: "Every time you type 'use #3B82F6...'"
    // ...

    return (
        <AbsoluteFill>
            <ColorGrade>
                <Video
                    src={ASSETS.C0116}
                    startFrom={startFrame}
                    endAt={endFrame}
                    style={{
                        height: '100%',
                        width: 'auto',
                        position: 'absolute',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        objectFit: 'cover',
                    }}
                />
            </ColorGrade>

            {/* SCRIPT OVERLAYS */}
            <Sequence from={0} durationInFrames={3.5 * fps}>
                <ImpactText text="STOP TELLING AI WHAT COLORS TO USE" />
            </Sequence>

            <Sequence from={3.5 * fps} durationInFrames={1.5 * fps}>
                <ImpactText text="SERIOUSLY." color="#FF4444" />
            </Sequence>

            <Sequence from={5 * fps} durationInFrames={4 * fps}>
                <ImpactText text="Every time you type hex codes..." y={200} />
            </Sequence>

            <Sequence from={9 * fps} durationInFrames={4 * fps}>
                <ImpactText text="YOU'RE WASTING YOUR BREATH" color="#FF4444" />
            </Sequence>

            <Sequence from={13 * fps} durationInFrames={3 * fps}>
                <ImpactText text="The AI doesn't know WHY it works" />
            </Sequence>

            <Sequence from={16 * fps} durationInFrames={4 * fps}>
                <ImpactText text="NO COLOR THEORY. NO CONTRAST." />
            </Sequence>

            {/* DEBUG OVERLAY - Helps confirm sync */}
            <AbsoluteFill style={{
                pointerEvents: 'none',
                justifyContent: 'flex-start',
                alignItems: 'flex-start',
                padding: 40,
            }}>
                <div style={{ fontFamily: 'monospace', fontSize: 24, color: '#00ff00', background: 'rgba(0,0,0,0.5)', padding: 10 }}>
                    OFFSET: {startFrame}
                </div>
            </AbsoluteFill>
        </AbsoluteFill>
    );
};
