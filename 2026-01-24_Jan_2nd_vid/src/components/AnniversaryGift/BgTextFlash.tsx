import React from "react";
import { useCurrentFrame, useVideoConfig, interpolate, random } from "remotion";
import { COLORS, FONT_FAMILY } from "./constants";

const WORDS = ["Adventures", "Laughs", "Memories", "Support", "Growth", "Trust", "Love", "Family", "Cuddles", "Travels"];

export const BgTextFlash: React.FC = () => {
    const frame = useCurrentFrame();
    const { width, height, fps } = useVideoConfig();

    return (
        <div style={{ position: 'absolute', width: '100%', height: '100%', overflow: 'hidden' }}>
            {WORDS.map((word, i) => {
                const startFrame = i * 15;
                const duration = 40;

                const opacity = interpolate(
                    frame,
                    [startFrame, startFrame + 10, startFrame + 30, startFrame + duration],
                    [0, 0.4, 0.4, 0],
                    { extrapolateRight: 'clamp' }
                );

                const scale = interpolate(frame, [startFrame, startFrame + duration], [0.5, 1.5]);

                const x = random(i) * width * 0.8 + width * 0.1;
                const y = random(i + 100) * height * 0.8 + height * 0.1;
                const rotate = random(i + 200) * 60 - 30;

                if (opacity <= 0) return null;

                return (
                    <div
                        key={i}
                        style={{
                            position: 'absolute',
                            left: x,
                            top: y,
                            opacity,
                            transform: `translate(-50%, -50%) scale(${scale}) rotate(${rotate}deg)`,
                            fontFamily: FONT_FAMILY.heading,
                            fontSize: 100, // BIG
                            fontWeight: 900,
                            color: i % 2 === 0 ? COLORS.primary : COLORS.secondary,
                            whiteSpace: 'nowrap',
                            zIndex: 0
                        }}
                    >
                        {word}
                    </div>
                );
            })}
        </div>
    );
};
