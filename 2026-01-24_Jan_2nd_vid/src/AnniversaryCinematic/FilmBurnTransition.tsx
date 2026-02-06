import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate, random } from "remotion";
import { COLORS } from "../components/AnniversaryGift/constants";

export const FilmBurnTransition: React.FC = () => {
    const frame = useCurrentFrame();

    // Duration approx 30 frames
    const opacity = interpolate(frame, [0, 5, 25, 30], [0, 1, 1, 0]);
    const scale = interpolate(frame, [0, 30], [1, 1.5]);
    const x = interpolate(frame, [0, 30], [0, 100]);

    return (
        <AbsoluteFill style={{
            opacity,
            mixBlendMode: 'screen',
            pointerEvents: 'none',
            zIndex: 100
        }}>
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '120%',
                height: '100%',
                background: `linear-gradient(90deg, ${COLORS.accent} 0%, #FFD700 50%, ${COLORS.primary} 100%)`,
                transform: `translateX(-${x}px) scale(${scale})`,
                filter: 'blur(40px) contrast(200%)'
            }} />

            {/* White flash */}
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                background: 'white',
                opacity: interpolate(frame, [10, 15, 20], [0, 0.8, 0]),
            }} />
        </AbsoluteFill>
    );
};
