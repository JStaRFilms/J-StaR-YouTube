import { AbsoluteFill, SpringConfig, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import React from 'react';

export const VsDivider: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const entrance = spring({
        frame,
        fps,
        config: { damping: 12, stiffness: 150 } // Semi-bouncy for "Pop"
    });

    const height = interpolate(entrance, [0, 1], [0, 100]);
    const opacity = interpolate(frame, [0, 10], [0, 1]);

    return (
        <AbsoluteFill style={{
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 20
        }}>
            {/* Vertical Line */}
            <div style={{
                position: 'absolute',
                width: 4,
                height: `${height}%`,
                backgroundColor: '#f8fafc',
                boxShadow: '0 0 20px rgba(255, 255, 255, 0.5)',
                opacity
            }} />

            {/* VS Badge */}
            <div style={{
                backgroundColor: '#000',
                border: '4px solid #f8fafc',
                borderRadius: '50%',
                width: 100,
                height: 100,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                transform: `scale(${entrance})`,
                boxShadow: '0 0 30px rgba(255,255,255,0.3)'
            }}>
                <h1 style={{
                    color: '#fff',
                    fontFamily: 'Inter, sans-serif',
                    fontSize: 48,
                    margin: 0,
                    fontWeight: 900,
                    fontStyle: 'italic'
                }}>
                    VS
                </h1>
            </div>

            {/* Lightning / Energy (Simulated with simple rapid flashes of extra glow) */}
            <div style={{
                position: 'absolute',
                width: 120,
                height: 120,
                borderRadius: '50%',
                boxShadow: '0 0 50px rgba(6, 182, 212, 0.8)',
                opacity: Math.sin(frame * 0.8) > 0.8 ? 0.8 : 0,
                pointerEvents: 'none'
            }} />

        </AbsoluteFill>
    );
};
