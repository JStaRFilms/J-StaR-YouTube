import React from "react";
import { useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";
import { COLORS } from "./constants";
import { Heart } from "lucide-react";

interface HeartMeterProps {
    progress: number; // 0 to 1
}

export const HeartMeter: React.FC<HeartMeterProps> = ({ progress }) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const fillHeight = interpolate(progress, [0, 1], [0, 100], { extrapolateRight: "clamp" });

    // Pop animation for the container
    const scale = spring({
        frame,
        fps,
        config: { damping: 15 },
    });

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                transform: `scale(${scale})`,
            }}
        >
            <div
                style={{
                    width: 80,
                    height: 300,
                    border: `4px solid ${COLORS.primary}`,
                    borderRadius: 40,
                    position: "relative",
                    overflow: "hidden",
                    backgroundColor: "white",
                }}
            >
                <div
                    style={{
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                        width: "100%",
                        height: `${fillHeight}%`,
                        backgroundColor: COLORS.primary,
                        transition: "height 0.2s linear", // Slight smooth for discrete updates
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        overflow: "hidden",
                    }}
                >
                    {/* Animated bubbles/hearts inside */}
                    {Array.from({ length: 5 }).map((_, i) => (
                        <Heart
                            key={i}
                            fill="white"
                            color="white"
                            size={20}
                            style={{
                                position: "absolute",
                                bottom: -20,
                                left: 10 + i * 15,
                                animation: `float ${2 + i}s infinite linear`, // Note: useCurrentFrame is better but for particles pure css is ok if simple
                                // Actually, let's use transforms based on frame for strictness
                                transform: `translateY(-${(frame * (2 + i)) % 350}px)`,
                                opacity: 0.6,
                            }}
                        />
                    ))}
                </div>
            </div>
            <Heart
                fill={COLORS.primary}
                color={COLORS.primary}
                size={50}
                style={{ marginTop: -25, zIndex: 10 }}
            />
        </div>
    );
};
