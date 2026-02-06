import React from "react";
import { useCurrentFrame, interpolate, Easing } from "remotion";
import { COLORS } from "./constants";

interface CalendarFlipProps {
    year: number;
}

export const CalendarFlip: React.FC<CalendarFlipProps> = ({ year }) => {
    const frame = useCurrentFrame();

    // Subtle shake/rotate for "active" look
    const rotate = Math.sin(frame / 5) * 2;

    return (
        <div
            style={{
                width: 300,
                height: 300,
                backgroundColor: "white",
                borderRadius: 20,
                boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                transform: `rotate(${rotate}deg)`,
                position: "relative",
                overflow: "hidden",
            }}
        >
            <div
                style={{
                    width: "100%",
                    height: "30px",
                    backgroundColor: COLORS.primary,
                    position: "absolute",
                    top: 0,
                }}
            />

            {/* Holes for rings */}
            <div style={{ position: "absolute", top: 10, left: 50, width: 20, height: 20, borderRadius: "50%", backgroundColor: "#eee" }} />
            <div style={{ position: "absolute", top: 10, right: 50, width: 20, height: 20, borderRadius: "50%", backgroundColor: "#eee" }} />

            <span
                style={{
                    fontFamily: "Nunito, sans-serif",
                    fontSize: 80,
                    fontWeight: "bold",
                    color: COLORS.text,
                    marginTop: 20,
                }}
            >
                {year}
            </span>
        </div>
    );
};
