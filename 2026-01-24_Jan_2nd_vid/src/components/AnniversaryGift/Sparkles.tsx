import React from "react";
import { useCurrentFrame, useVideoConfig, random, interpolate } from "remotion";
import { COLORS } from "./constants";

export const Sparkles: React.FC<{ count?: number }> = ({ count = 20 }) => {
    const frame = useCurrentFrame();
    const { width, height } = useVideoConfig();

    const particles = new Array(count).fill(0).map((_, i) => {
        const x = random(i) * width;
        const y = random(i + 100) * height;
        const size = random(i + 200) * 10 + 5;
        const speed = random(i + 300) * 2 + 1;
        const offset = random(i + 400) * 100;

        // Float upwards
        const currentY = (y - (frame * speed) + offset) % (height + 50) - 50;
        const opacity = interpolate(Math.sin((frame + offset) / 10), [-1, 1], [0.2, 0.8]);

        return { x, y: currentY, size, opacity, color: i % 2 === 0 ? COLORS.primary : COLORS.secondary };
    });

    return (
        <div style={{ position: "absolute", width: "100%", height: "100%", pointerEvents: "none" }}>
            {particles.map((p, i) => (
                <div
                    key={i}
                    style={{
                        position: "absolute",
                        left: p.x,
                        top: p.y,
                        width: p.size,
                        height: p.size,
                        borderRadius: "50%",
                        backgroundColor: p.color,
                        opacity: p.opacity,
                        boxShadow: `0 0 10px ${p.color}`,
                    }}
                />
            ))}
        </div>
    );
};
