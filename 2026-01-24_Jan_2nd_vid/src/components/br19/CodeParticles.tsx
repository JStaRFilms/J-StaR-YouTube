import React from 'react';
import { interpolate, useCurrentFrame, useVideoConfig, random } from 'remotion';

const SYMBOLS = ['{ }', '</>', '//', '=>', ';', '#', '&&'];
const COLORS = ['#22c55e', '#3b82f6', '#a855f7', '#fbbf24'];

export const CodeParticles: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    // Create 50 particles
    const particles = new Array(50).fill(0).map((_, i) => {
        const seed = i * 123.45;
        const xStart = interpolate(random(seed), [0, 1], [-200, -50]); // Start left of screen
        const y = interpolate(random(seed + 1), [0, 1], [0, 1080]);
        const speed = interpolate(random(seed + 2), [0, 1], [10, 25]);
        const symbol = SYMBOLS[Math.floor(random(seed + 3) * SYMBOLS.length)];
        const color = COLORS[Math.floor(random(seed + 4) * COLORS.length)];
        const size = interpolate(random(seed + 5), [0, 1], [14, 24]);

        // Animate x position based on frame and speed
        const currentX = xStart + (frame * speed) % 2500; // Loop across wide range

        const opacity = interpolate(
            currentX,
            [0, 100, 1700, 1920],
            [0, 1, 1, 0], // Fade in/out at edges
            { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
        );

        return (
            <div
                key={i}
                style={{
                    position: 'absolute',
                    left: currentX,
                    top: y,
                    fontSize: size,
                    color,
                    opacity,
                    fontFamily: 'monospace',
                    fontWeight: 'bold',
                    textShadow: `0 0 10px ${color}`,
                    zIndex: 0,
                    pointerEvents: 'none',
                }}
            >
                {symbol}
            </div>
        );
    });

    return <>{particles}</>;
};
