import React from "react";
import { useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";
import { COLORS, FONT_FAMILY } from "./constants";

export const KineticText: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    // Scene 1: "It started" (Moves Left to Right)
    // Scene 2: "with a" (Moves Right to Left)
    // Scene 3: "HELLO" (Slams in center)

    const slide1 = spring({ frame, fps, config: { damping: 200 } });
    const slide2 = spring({ frame: frame - 10, fps, config: { damping: 200 } });
    const scale3 = spring({ frame: frame - 25, fps, config: { mass: 2, damping: 10 } }); // Bouncy slam

    return (
        <div style={{ position: 'absolute', width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            {/* LINE 1 */}
            <div style={{
                fontFamily: FONT_FAMILY.body,
                fontSize: 80,
                fontWeight: 900,
                color: COLORS.text,
                textTransform: 'uppercase',
                letterSpacing: 20,
                opacity: interpolate(frame, [0, 10], [0, 1]),
                transform: `translateX(${interpolate(slide1, [0, 1], [-200, 0])}px)`
            }}>
                IT STARTED
            </div>

            {/* LINE 2 */}
            <div style={{
                fontFamily: FONT_FAMILY.body,
                fontSize: 60,
                fontWeight: 300,
                color: COLORS.primary,
                fontStyle: 'italic',
                opacity: interpolate(frame, [10, 20], [0, 1]),
                transform: `translateX(${interpolate(slide2, [0, 1], [200, 0])}px)`
            }}>
                with a simple
            </div>

            {/* LINE 3 - THE SLAM */}
            <div style={{
                fontFamily: FONT_FAMILY.heading,
                fontSize: 250,
                fontWeight: 'bold',
                color: COLORS.text,
                lineHeight: 0.8,
                marginTop: 20,
                opacity: interpolate(frame, [25, 27], [0, 1]),
                transform: `scale(${scale3})`,
                textShadow: `10px 10px 0px ${COLORS.accent}` // Pop art shadow
            }}>
                HELLO
            </div>

            {/* LINE 4 - FLIRTY TYPEWRITER */}
            <div style={{
                fontFamily: FONT_FAMILY.body,
                fontSize: 40,
                marginTop: 30,
                color: COLORS.text,
                opacity: interpolate(frame, [40, 50], [0, 1])
            }}>
                {/* Typewriter Logic */}
                {(() => {
                    const text = "can I dm you?";
                    const startFrame = 45;
                    const duration = 30;
                    const progress = interpolate(frame, [startFrame, startFrame + duration], [0, text.length], {
                        extrapolateRight: "clamp"
                    });
                    return text.substring(0, Math.round(progress));
                })()}
                <span style={{
                    opacity: frame % 10 < 5 ? 1 : 0,
                    marginLeft: 5,
                    color: COLORS.accent
                }}>|</span>
            </div>
        </div>
    );
};
