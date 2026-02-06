import React from "react";
import { useCurrentFrame, useVideoConfig, interpolate } from "remotion";

interface ConnectionBeamProps {
    height: number;
    delay: number;
}

export const ConnectionBeam: React.FC<ConnectionBeamProps> = ({ height, delay }) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    // Delay the start of the flow
    const activeFrame = Math.max(0, frame - delay);

    // Animate the line drawing itself
    const drawProgress = interpolate(activeFrame, [0, 20], [0, 1], {
        extrapolateRight: "clamp",
    });

    // Continuous flow animation
    const flowOffset = interpolate(activeFrame, [0, 2 * fps], [0, -100], {
        extrapolateRight: "wrap",
    });

    return (
        <div style={{ width: "4px", height, position: "relative", overflow: "hidden" }}>
            {/* Background line */}
            <div
                style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    backgroundColor: "#334155", // Slate-700
                    borderRadius: "2px",
                }}
            />

            {/* Animated Flow Line */}
            <svg
                width="4"
                height={height}
                viewBox={`0 0 4 ${height}`}
                style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    height: "100%",
                    opacity: drawProgress,
                }}
            >
                <line
                    x1="2"
                    y1="0"
                    x2="2"
                    y2={height}
                    stroke="#38bdf8" // Sky-400
                    strokeWidth="4"
                    strokeDasharray="20 10" // Dash pattern
                    strokeDashoffset={flowOffset}
                    strokeLinecap="round"
                />
            </svg>
        </div>
    );
};
