import React from "react";
import { useCurrentFrame, interpolate, Easing } from "remotion";
import { COLORS, FONT_FAMILY } from "./constants";

interface NameMorphProps {
    john: string;
    enny: string;
    combined: string;
}

export const NameMorph: React.FC<NameMorphProps> = ({ john, enny, combined }) => {
    const frame = useCurrentFrame();

    const moveProgress = interpolate(frame, [0, 60], [0, 1], {
        easing: Easing.inOut(Easing.ease),
        extrapolateRight: "clamp",
    });

    const fadeOut = interpolate(frame, [45, 60], [1, 0], { extrapolateRight: "clamp" });
    const fadeIn = interpolate(frame, [50, 70], [0, 1], { extrapolateRight: "clamp" });

    const startX = 250; // Wider start
    const endX = 0;

    const johnX = interpolate(moveProgress, [0, 1], [-startX, endX]);
    const ennyX = interpolate(moveProgress, [0, 1], [startX, endX]);

    return (
        <div style={{ position: "relative", width: 800, height: 200, display: "flex", justifyContent: "center", alignItems: "center" }}>
            {/* Original Names - SCALED UP */}
            <div
                style={{
                    position: "absolute",
                    transform: `translateX(${johnX}px)`,
                    opacity: fadeOut,
                    fontFamily: FONT_FAMILY.heading,
                    fontSize: 100, // Up from 60
                    color: COLORS.john,
                    textShadow: "0 4px 10px rgba(0,0,0,0.1)"
                }}
            >
                {john}
            </div>

            <div
                style={{
                    position: "absolute",
                    transform: `translateX(${ennyX}px)`,
                    opacity: fadeOut,
                    fontFamily: FONT_FAMILY.heading,
                    fontSize: 100, // Up from 60
                    color: COLORS.enny,
                    textShadow: "0 4px 10px rgba(0,0,0,0.1)"
                }}
            >
                {enny}
            </div>

            {/* Combined Name - MASSIVE */}
            <div
                style={{
                    position: "absolute",
                    opacity: fadeIn,
                    transform: `scale(${1 + fadeIn * 0.2})`,
                    fontFamily: FONT_FAMILY.heading,
                    fontSize: 160, // Up from 80
                    color: COLORS.primary,
                    // Gradient text
                    background: `-webkit-linear-gradient(45deg, ${COLORS.john}, ${COLORS.enny})`,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    filter: "drop-shadow(0 10px 20px rgba(255, 105, 180, 0.4))"
                }}
            >
                {combined}
            </div>
        </div>
    );
};
