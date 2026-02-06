import React from 'react';
import { AbsoluteFill } from 'remotion';

export const VoidBackground: React.FC = () => {
    return (
        <AbsoluteFill
            style={{
                background: '#0a0a0f',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            {/* Subtle Gradient Spot 1 (Top Left - Purple/Blue) */}
            <div
                style={{
                    position: 'absolute',
                    top: '-20%',
                    left: '-10%',
                    width: '50%',
                    height: '50%',
                    background: 'radial-gradient(circle, rgba(59, 130, 246, 0.15) 0%, rgba(0,0,0,0) 70%)',
                    filter: 'blur(60px)',
                    borderRadius: '50%',
                }}
            />

            {/* Subtle Gradient Spot 2 (Bottom Right - Purple) */}
            <div
                style={{
                    position: 'absolute',
                    bottom: '-20%',
                    right: '-10%',
                    width: '60%',
                    height: '60%',
                    background: 'radial-gradient(circle, rgba(168, 85, 247, 0.1) 0%, rgba(0,0,0,0) 70%)',
                    filter: 'blur(80px)',
                    borderRadius: '50%',
                }}
            />

            {/* Noise Texture Overlay */}
            <div
                style={{
                    position: 'absolute',
                    inset: 0,
                    background: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.05'/%3E%3C/svg%3E")`,
                    opacity: 0.4,
                    mixBlendMode: 'overlay',
                }}
            />
        </AbsoluteFill>
    );
};
