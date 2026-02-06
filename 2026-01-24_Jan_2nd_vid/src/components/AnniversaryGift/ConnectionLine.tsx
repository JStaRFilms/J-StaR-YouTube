import React from "react";
import { useCurrentFrame, interpolate, Easing } from "remotion";
import { COLORS } from "./constants";

interface ConnectionLineProps {
    x1: number;
    y1: number;
    x2: number;
    y2: number;
    delay?: number;
}

export const ConnectionLine: React.FC<ConnectionLineProps> = ({ x1, y1, x2, y2, delay = 0 }) => {
    const frame = useCurrentFrame();

    const progress = interpolate(frame - delay, [0, 45], [0, 1], {
        easing: Easing.bezier(0.25, 1, 0.5, 1),
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });

    // Calculate length for dashoffset
    const length = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));

    return (
        <svg
            style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                pointerEvents: "none",
                zIndex: -1,
            }}
        >
            <line
                x1={x1 + 75} // +75 to center on 150px wide avatar
                y1={y1 + 75}
                x2={x2 + 75}
                y2={y2 + 75}
                stroke={COLORS.secondary}
                strokeWidth="6"
                strokeDasharray="20, 20"
                strokeDashoffset={length * (1 - progress)}
                fill="none"
                strokeLinecap="round"
            />
        </svg>
    );
};
