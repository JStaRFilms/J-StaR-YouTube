import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';

export const CtaScene: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const scale = spring({
        frame,
        fps,
        config: { damping: 10, stiffness: 100 },
    });

    const glowOpacity = interpolate(Math.sin(frame / 5), [-1, 1], [0.3, 0.7]);

    return (
        <div style={{
            position: 'absolute',
            bottom: 100,
            left: 0,
            right: 0,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 200,
        }}>
            <div style={{
                background: '#3b82f6',
                padding: '20px 60px',
                borderRadius: 50,
                transform: `scale(${scale})`,
                boxShadow: `0 0 40px rgba(59, 130, 246, ${glowOpacity})`,
                border: '2px solid rgba(255,255,255,0.2)',
                display: 'flex',
                alignItems: 'center',
                gap: 16
            }}>
                <span style={{
                    color: 'white',
                    fontFamily: 'Inter, sans-serif',
                    fontWeight: 700,
                    fontSize: 36,
                    letterSpacing: '-0.02em',
                }}>
                    Watch how to build it
                </span>
                <span style={{
                    fontSize: 36,
                    transform: `translateX(${Math.sin(frame / 5) * 5}px)`
                }}>
                    →
                </span>
            </div>
        </div>
    );
};
