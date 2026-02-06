import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';

export const HolographicBackground: React.FC = () => {
    const frame = useCurrentFrame();

    // Subtle animation for the grid
    const gridOffset = (frame * 0.5) % 40;

    return (
        <AbsoluteFill
            style={{
                backgroundColor: '#0a0a0f',
                overflow: 'hidden',
                perspective: '1000px',
            }}
        >
            {/* Grid Pattern */}
            <AbsoluteFill
                style={{
                    backgroundImage: `
            linear-gradient(to right, rgba(255, 255, 255, 0.03) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.03) 1px, transparent 1px)
          `,
                    backgroundSize: '40px 40px',
                    transform: `translateY(${gridOffset}px) rotateX(60deg) scale(2)`,
                    transformOrigin: '50% 0%',
                    opacity: 0.5,
                }}
            />

            {/* Vignette */}
            <AbsoluteFill
                style={{
                    background: 'radial-gradient(circle at center, transparent 0%, #0a0a0f 90%)',
                }}
            />

            {/* Ambient Glow */}
            <div
                style={{
                    position: 'absolute',
                    top: '20%',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '600px',
                    height: '600px',
                    background: 'radial-gradient(circle, rgba(168, 85, 247, 0.05) 0%, transparent 70%)',
                    borderRadius: '50%',
                    filter: 'blur(60px)',
                }}
            />
        </AbsoluteFill>
    );
};
