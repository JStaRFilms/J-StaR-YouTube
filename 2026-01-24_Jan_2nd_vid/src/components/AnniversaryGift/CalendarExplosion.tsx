import React from "react";
import { useCurrentFrame, useVideoConfig, interpolate, spring, random, Easing } from "remotion";
import { COLORS, FONT_FAMILY } from "./constants";

const CalendarPage: React.FC<{ year: number; index: number; progress: number }> = ({ year, index, progress }) => {
    // progress goes from 0 to 1 for this specific page's lifespan
    // 0 = visible
    // 0.5 = starts falling (Earlier start, longer fall)
    // 1 = gone

    const fallStart = 0.5;

    // Fall animation - Changed easing to cubic for less sudden acceleration
    const y = interpolate(progress, [fallStart, 1], [0, 800], {
        easing: Easing.in(Easing.cubic),
        extrapolateLeft: 'clamp'
    });

    const rotate = interpolate(progress, [fallStart, 1], [
        random(index) * 5 - 2.5,
        random(index + 1) * 60 - 30
    ]);

    const opacity = interpolate(progress, [0.8, 1], [1, 0]);

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
                position: "absolute",
                top: 0,
                left: 0,
                transform: `translateY(${y}px) rotate(${rotate}deg)`,
                opacity,
                zIndex: 100 - index, // Higher index = lower z-index (stacking order handled by parent usually, but here we want first year on top?) 
                // Wait, typically generic stack: Last item is top? 
                // We want 2022 on top, it flies off, revealing 2023.
                // So 2022 should be highest Z.
            }}
        >
            <div style={{ width: "100%", height: "40px", backgroundColor: COLORS.primary, position: "absolute", top: 0 }} />
            <div style={{ position: "absolute", top: 15, left: 50, width: 20, height: 20, borderRadius: "50%", backgroundColor: "#ddd" }} />
            <div style={{ position: "absolute", top: 15, right: 50, width: 20, height: 20, borderRadius: "50%", backgroundColor: "#ddd" }} />

            <span style={{ fontFamily: FONT_FAMILY.heading, fontSize: 100, fontWeight: "bold", color: COLORS.text, marginTop: 20 }}>
                {year}
            </span>
        </div>
    );
};

export const CalendarExplosion: React.FC<{ startYear: number; endYear: number }> = ({ startYear, endYear }) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const years = [];
    for (let y = startYear; y <= endYear; y++) {
        years.push(y);
    }

    // Duration per flip - Slower pace
    const durationPerYear = 25; // frames (was 20)

    return (
        <div style={{ position: "relative", width: 300, height: 300 }}>
            {years.map((year, i) => {
                // Determine lifecycle of this page
                // It should stay until its turn comes
                // Turn starts at i * durationPerYear

                const startFrame = i * durationPerYear;
                const endFrame = startFrame + durationPerYear * 2; // More overlap (was 1.5)

                // If it's the last year, it doesn't fall off
                if (i === years.length - 1) {
                    return (
                        <div key={year} style={{ position: 'absolute', zIndex: 0 }}>
                            <CalendarPage year={year} index={i} progress={0} />
                        </div>
                    )
                }

                // Calculate local progress for falling
                const progress = interpolate(frame, [startFrame, endFrame], [0, 1], {
                    extrapolateLeft: 'clamp',
                    extrapolateRight: 'clamp'
                });

                // Only render if needed (optimization)
                if (frame > endFrame && progress >= 1) return null;

                return (
                    <div key={year} style={{ position: 'absolute', zIndex: years.length - i }}>
                        <CalendarPage year={year} index={i} progress={progress} />
                    </div>
                );
            })}
        </div>
    );
};
