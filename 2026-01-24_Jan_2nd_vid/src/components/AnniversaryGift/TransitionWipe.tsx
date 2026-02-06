import React from "react";
import { useCurrentFrame, useVideoConfig, interpolate, Easing, AbsoluteFill } from "remotion";
import { COLORS } from "./constants";

export const TransitionWipe: React.FC<{
    color?: string;
    direction?: "left" | "right" | "up" | "down";
}> = ({ color = COLORS.primary, direction = "left" }) => {
    const frame = useCurrentFrame();
    const { width, height, fps } = useVideoConfig();

    const progress = interpolate(frame, [0, 15], [0, 1], {
        easing: Easing.bezier(0.22, 1, 0.36, 1),
        extrapolateRight: "clamp",
    });

    const leave = interpolate(frame, [20, 35], [0, 1], {
        easing: Easing.bezier(0.22, 1, 0.36, 1),
        extrapolateRight: "clamp",
    });

    const getTransform = (prog: number) => {
        switch (direction) {
            case "right": return `translateX(${(prog - 1) * 100}%)`;
            case "up": return `translateY(${(1 - prog) * 100}%)`;
            case "down": return `translateY(${(prog - 1) * 100}%)`;
            case "left": default: return `translateX(${(1 - prog) * 100}%)`;
        }
    };

    // If frame > 20, we move the wipe OUT (to reveal next scene)
    // Actually, standard wipe overlays: Slide IN then Slide OUT? 
    // Let's do a simple: Overlay covers screen, then uncovers.

    // Slide IN
    const xIn = interpolate(frame, [0, 15], [width, 0], {
        easing: Easing.out(Easing.exp),
        extrapolateRight: "clamp"
    });

    // Slide OUT
    const xOut = interpolate(frame, [20, 35], [0, -width], {
        easing: Easing.in(Easing.exp),
        extrapolateRight: "clamp"
    });

    // Effective X
    const x = frame < 18 ? xIn : xOut;

    return (
        <AbsoluteFill style={{
            backgroundColor: color,
            transform: `translateX(${x}px)`,
            zIndex: 1000
        }} />
    );
};
