import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { DeviceFrame } from './DeviceFrame';
import { MockDashboard } from './MockDashboard';

export const MockupScene: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    // Slide in from left
    const slideIn = spring({
        frame,
        fps,
        config: { damping: 200 },
    });

    const x = interpolate(slideIn, [0, 1], [-500, 0]);
    const opacity = interpolate(slideIn, [0, 1], [0, 1]);

    // Text Fade In
    const textOpacity = interpolate(frame, [15, 30], [0, 1], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
    });

    // Subtle Pulse
    const pulse = Math.sin(frame / 15) * 0.02 + 1; // 0.98 to 1.02 scale

    return (
        <div style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
        }}>
            {/* The Mockup */}
            <div style={{
                transform: `translateX(${x}px) scale(${pulse})`,
                opacity,
                width: 900,
                height: 600,
            }}>
                <DeviceFrame title="Dashboard Design.fig - Figma">
                    <MockDashboard />
                </DeviceFrame>
            </div>

            {/* The Text */}
            <h1 style={{
                marginTop: 40,
                color: 'white',
                fontFamily: 'Inter, sans-serif',
                fontSize: 48,
                fontWeight: 600,
                opacity: textOpacity,
                textShadow: '0 0 20px rgba(0,0,0,0.5)',
                transform: `translateX(${x}px)`,
            }}>
                You have the design skill.
            </h1>
        </div>
    );
};
