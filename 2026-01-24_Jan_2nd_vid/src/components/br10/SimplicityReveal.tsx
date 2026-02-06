import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { Check } from 'lucide-react';

export const SimplicityReveal: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const scale = spring({
        frame,
        fps,
        config: { damping: 12 },
    });

    const opacity = interpolate(frame, [0, 10], [0, 1]);

    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 24,
                transform: `scale(${scale})`,
                opacity,
            }}
        >
            <div
                style={{
                    width: 80,
                    height: 80,
                    borderRadius: '50%',
                    background: '#22c55e',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 0 40px rgba(34, 197, 94, 0.5)',
                }}
            >
                <Check color="white" size={48} strokeWidth={3} />
            </div>

            <h1
                style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: 64,
                    fontWeight: 800,
                    color: '#f8fafc',
                    textShadow: '0 4px 20px rgba(0,0,0, 0.5)',
                    margin: 0,
                }}
            >
                No complex setup.
            </h1>
        </div>
    );
};
