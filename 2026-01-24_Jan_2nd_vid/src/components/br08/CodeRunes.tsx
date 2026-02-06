import { AbsoluteFill, useVideoConfig, useCurrentFrame, interpolate } from 'remotion';
import React from 'react';
import { loadFont } from "@remotion/google-fonts/JetBrainsMono";

const { fontFamily } = loadFont();

const RUNES = [
    '{ color: harmony }',
    '{ font: paired }',
    '{ spacing: 8pt }',
    '{ contrast: WCAG }',
    '{ hierarchy: clear }',
    '{ whitespace: breathe }',
    '{ grid: dynamic }',
    '{ state: flow }'
];

export const CodeRunes: React.FC<{
    opacity: number;
    scale: number;
    rotation: number;
    color: string;
}> = ({ opacity, scale, rotation, color }) => {
    const { width, height } = useVideoConfig();
    const frame = useCurrentFrame();

    const radius = 320; // Slightly outside the circle

    return (
        <AbsoluteFill
            style={{
                opacity,
                transform: `scale(${scale}) rotate(${rotation}deg)`,
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            {RUNES.map((text, i) => {
                const angleStep = 360 / RUNES.length;
                const angle = i * angleStep;

                // Typewriter effect for each rune
                // Staggered start: each rune starts 2 frames after the previous
                const startFrame = i * 3;
                // Duration to type fully: length * 2 frames
                const endFrame = startFrame + (text.length * 2);

                const progress = interpolate(frame, [startFrame, endFrame], [0, text.length], {
                    extrapolateRight: 'clamp',
                    extrapolateLeft: 'clamp'
                });

                const visibleText = text.slice(0, Math.floor(progress));

                return (
                    <div
                        key={i}
                        style={{
                            position: 'absolute',
                            left: '50%',
                            top: '50%',
                            transform: `rotate(${angle}deg) translate(${radius}px) rotate(90deg)`,
                            fontFamily,
                            color: color,
                            fontSize: 16,
                            fontWeight: 'bold',
                            whiteSpace: 'nowrap',
                            textShadow: `0 0 5px ${color}`,
                        }}
                    >
                        {visibleText}
                    </div>
                );
            })}
        </AbsoluteFill>
    );
};
