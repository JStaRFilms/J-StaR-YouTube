import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';

export const QuestionScene: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const text = "But what about the code?";

    // Typewriter effect
    const charsShown = Math.floor(interpolate(frame, [0, 20], [0, text.length], {
        extrapolateRight: 'clamp',
    }));

    const textToShow = text.slice(0, charsShown);

    // Question Mark Scale
    const qScale = spring({
        frame: frame - 15,
        fps,
        config: { damping: 10, stiffness: 200 } // Bouncy
    });

    const qScaleVal = interpolate(qScale, [0, 1], [0, 1]);

    return (
        <div style={{
            position: 'absolute',
            right: 150,
            top: '50%',
            transform: 'translateY(-50%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            zIndex: 100,
        }}>
            {/* Typewriter Text */}
            <h2 style={{
                color: '#94a3b8',
                fontFamily: 'Inter, sans-serif',
                fontSize: 32,
                fontWeight: 500,
                marginBottom: 20,
                textAlign: 'center',
                width: 400,
                height: 40, // fix height
            }}>
                {textToShow}
                <span style={{ opacity: frame % 10 < 5 ? 1 : 0 }}>|</span>
            </h2>

            {/* Giant Question Mark */}
            <div style={{
                fontSize: 180,
                fontWeight: 'bold',
                color: '#ef4444', // Red for "Stop/Problem"
                fontFamily: 'Inter, sans-serif',
                transform: `scale(${qScaleVal}) rotate(${interpolate(qScaleVal, [0, 1], [-20, 10])}deg)`,
                filter: 'drop-shadow(0 0 20px rgba(239, 68, 68, 0.4))'
            }}>
                ?
            </div>
        </div>
    );
};
