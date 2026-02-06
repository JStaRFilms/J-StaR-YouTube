import React from "react";
import { useCurrentFrame, useVideoConfig, spring } from "remotion";
import { COLORS } from "./constants";

interface AvatarProps {
    name: string;
    color: string;
    initial: string;
    delay?: number;
    x: number;
    y: number;
}

export const Avatar: React.FC<AvatarProps> = ({ name, color, initial, delay = 0, x, y }) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const scale = spring({
        frame: frame - delay,
        fps,
        config: {
            damping: 12,
        },
    });

    // Float animation
    const float = Math.sin((frame - delay) / 15) * 10;

    return (
        <div
            style={{
                position: "absolute",
                left: x,
                top: y + float,
                transform: `scale(${scale})`,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
            }}
        >
            <svg width="150" height="150" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="45" fill={color} stroke="white" strokeWidth="4" />
                <text
                    x="50"
                    y="65"
                    textAnchor="middle"
                    fill="white"
                    fontSize="50"
                    fontFamily="Nunito, sans-serif"
                    fontWeight="bold"
                >
                    {initial}
                </text>
            </svg>
            <div
                style={{
                    marginTop: 10,
                    fontFamily: "Nunito, sans-serif",
                    fontSize: 30,
                    fontWeight: "bold",
                    color: COLORS.text,
                    backgroundColor: "rgba(255, 255, 255, 0.8)",
                    padding: "5px 15px",
                    borderRadius: 20,
                }}
            >
                {name}
            </div>
        </div>
    );
};
