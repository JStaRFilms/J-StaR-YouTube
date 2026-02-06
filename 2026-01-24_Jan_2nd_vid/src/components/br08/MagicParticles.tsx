import { AbsoluteFill, useVideoConfig, useCurrentFrame, interpolate, random } from 'remotion';
import React from 'react';

export const MagicParticles: React.FC<{
    opacity: number;
    gathering: boolean; // true = converge to center, false = float outward
    color: string;
}> = ({ opacity, gathering, color }) => {
    const { width, height } = useVideoConfig();
    const frame = useCurrentFrame();

    const particleCount = 40;
    const particles = new Array(particleCount).fill(0).map((_, i) => i);

    return (
        <AbsoluteFill style={{ opacity }}>
            {particles.map((i) => {
                const seed = i * 1234;
                const startX = random(seed) * width;
                const startY = random(seed + 1) * height;

                const centerX = width / 2;
                const centerY = height / 2;

                // Animation logic
                // If gathering: move from Start -> Center
                // If floating: move from Random -> Random + drift

                let x, y, scale;

                if (gathering) {
                    // Converge to center over 60 frames
                    // Offset frame by efficient random to stagger
                    const offset = Math.floor(random(seed + 2) * 20);
                    const progress = interpolate(frame - offset, [0, 40], [0, 1], {
                        extrapolateRight: 'clamp',
                        extrapolateLeft: 'clamp'
                    });

                    x = interpolate(progress, [0, 1], [startX, centerX]);
                    y = interpolate(progress, [0, 1], [startY, centerY]);
                    scale = interpolate(progress, [0, 1], [1, 0]); // Shrink as they hit center
                } else {
                    // Float/Sparkle
                    // Circular drift
                    const speed = 0.5 + random(seed + 3);
                    const angle = frame * speed * 0.05 + (random(seed + 4) * Math.PI * 2);
                    const radius = 50 + (random(seed + 5) * 200);

                    x = centerX + Math.cos(angle) * (radius + Math.sin(frame * 0.02) * 50);
                    y = centerY + Math.sin(angle) * (radius + Math.cos(frame * 0.03) * 50);
                    scale = 0.5 + Math.abs(Math.sin(frame * 0.1 + i));
                }

                return (
                    <div
                        key={i}
                        style={{
                            position: 'absolute',
                            left: x,
                            top: y,
                            width: 4 + random(seed + 6) * 6,
                            height: 4 + random(seed + 6) * 6,
                            borderRadius: '50%',
                            backgroundColor: color,
                            transform: `scale(${scale})`,
                            boxShadow: `0 0 ${10 * scale}px ${color}`,
                        }}
                    />
                );
            })}
        </AbsoluteFill>
    );
};
