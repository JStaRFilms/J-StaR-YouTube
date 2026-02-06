import React from "react";
import { useCurrentFrame, useVideoConfig, interpolate, Easing } from "remotion";
import { COLORS, FONT_FAMILY } from "./constants";

const TIMELINE_EVENTS = [
    { year: 2023, text: "Trust", x: -300, y: -200 },
    { year: 2024, text: "Support", x: 300, y: 100 },
    { year: 2025, text: "Growth", x: -200, y: 400 },
    { year: 2026, text: "Forever", x: 0, y: 0 },
];

export const TimelineFlythrough: React.FC = () => {
    const frame = useCurrentFrame();
    const { width, height, fps } = useVideoConfig();

    // Camera move down the Z axis
    // Events are placed at different Z depths
    // We move the "camera" (or events) towards viewer

    return (
        <div style={{
            perspective: 1000,
            width: '100%',
            height: '100%',
            position: 'absolute',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            {TIMELINE_EVENTS.map((event, i) => {
                const zDepth = i * 1200 + 1000; // Increased spacing (1000, 2200, 3400, 4600)

                // Camera Move: Start fast, slow down to "land" on 2026
                // Frame 0 -> 0px
                // Frame 150 -> 4200px (Just before 2026 at 4600, so it stays in front)
                const cameraZ = interpolate(frame, [0, 150], [0, 4200], {
                    easing: Easing.out(Easing.cubic) // Slow down at the end
                });

                // Relative position
                const currentZ = zDepth - cameraZ;

                // Fade out ONLY when it is essentially behind us
                // -500: Gone
                // -200: Fading out rapid
                // 100: Full Opacity (Near camera)
                // 2000: Far away fade in
                const opacity = interpolate(currentZ, [-500, -200, 0, 2000], [0, 0, 1, 0]);

                // Scale dramatically as it passes
                const scale = interpolate(currentZ, [0, 2000], [2, 0.5]);

                if (currentZ < -2000) return null; // Optimization

                return (
                    <div
                        key={event.year}
                        style={{
                            position: 'absolute',
                            transform: `translate3d(${event.x}px, ${event.y}px, ${currentZ}px) scale(${scale})`,
                            textAlign: 'center'
                        }}
                    >
                        <div style={{
                            fontFamily: FONT_FAMILY.body,
                            fontSize: 120, // Big modern font
                            fontWeight: 900,
                            color: COLORS.text,
                            letterSpacing: -5,
                            opacity: 0.1 // Background year
                        }}>
                            {event.year}
                        </div>
                        <div style={{
                            fontFamily: FONT_FAMILY.script,
                            fontSize: 100,
                            color: COLORS.primary,
                            marginTop: -80,
                            transform: 'rotate(-5deg)',
                            textShadow: `0 0 20px ${COLORS.accent}`
                        }}>
                            {event.text}
                        </div>
                    </div>
                );
            })}
        </div>
    );
};
