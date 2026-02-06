import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig, spring, random } from 'remotion';
import React from 'react';

export const InstructionsSide: React.FC<{
    instructions: string[];
    style?: React.CSSProperties;
}> = ({ instructions, style }) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    return (
        <AbsoluteFill style={{
            backgroundColor: 'transparent',
            ...style
        }}>
            {/* Label */}
            <div style={{
                position: 'absolute',
                top: 60,
                left: '25%',
                transform: 'translateX(-50%)',
                fontFamily: 'Inter, sans-serif',
                fontSize: 40,
                fontWeight: 'bold',
                color: '#64748b',
                opacity: interpolate(frame, [0, 20], [0, 1], { extrapolateRight: 'clamp' }),
            }}>
                INSTRUCTIONS
            </div>

            {/* Floating Bubbles */}
            {instructions.map((text, i) => {
                const seed = i * 123;
                const x = interpolate(random(seed), [0, 1], [10, 40]); // 10% to 40% of screen width
                const y = interpolate(random(seed + 1), [0, 1], [20, 80]); // 20% to 80% of height

                const delay = 10 + i * 10;
                const scale = spring({
                    frame: frame - delay,
                    fps,
                    config: { damping: 20, stiffness: 200 } // Snappy
                });

                // Drift animation
                const driftX = Math.sin(frame * 0.05 + seed) * 10;
                const driftY = Math.cos(frame * 0.03 + seed) * 10;

                return (
                    <div
                        key={i}
                        style={{
                            position: 'absolute',
                            left: `${x}%`,
                            top: `${y}%`,
                            backgroundColor: '#1e293b',
                            padding: '16px 24px',
                            borderRadius: 30, // Bubble shape
                            color: '#94a3b8',
                            fontFamily: 'monospace',
                            fontSize: 24,
                            border: '1px solid #334155',
                            transform: `translate(${driftX}px, ${driftY}px) scale(${scale})`,
                            boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                        }}
                    >
                        {text}
                    </div>
                );
            })}

            {/* Dashed Lines (Decorative background) */}
            <svg style={{ position: 'absolute', width: '100%', height: '100%', pointerEvents: 'none', zIndex: -1 }}>
                <path
                    d="M 200 200 Q 400 500 200 800"
                    stroke="#334155"
                    strokeWidth="2"
                    strokeDasharray="10, 10"
                    fill="none"
                    style={{
                        strokeDashoffset: -frame * 2
                    }}
                />
                <path
                    d="M 500 100 Q 600 400 400 900"
                    stroke="#334155"
                    strokeWidth="2"
                    strokeDasharray="10, 10"
                    fill="none"
                    style={{
                        strokeDashoffset: frame * 1.5
                    }}
                />
            </svg>

        </AbsoluteFill>
    );
};
