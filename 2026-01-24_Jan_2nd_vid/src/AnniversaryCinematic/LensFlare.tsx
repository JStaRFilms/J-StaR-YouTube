import React from "react";
import { useCurrentFrame, interpolate, useVideoConfig } from "remotion";
import { COLORS } from "../components/AnniversaryGift/constants";

export const LensFlare: React.FC<{ opacity?: number }> = ({ opacity = 1 }) => {
    const frame = useCurrentFrame();
    const { width, height } = useVideoConfig();

    // Subtle moving light leak
    const moveX = Math.sin(frame / 50) * 200;

    return (
        <div style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            overflow: 'hidden',
            opacity: opacity,
            mixBlendMode: 'screen', // This is key for light leaks
            pointerEvents: 'none',
            zIndex: 50
        }}>
            {/* Big soft glow */}
            <div style={{
                position: 'absolute',
                top: -200,
                left: -200 + moveX,
                width: width * 1.5,
                height: height * 0.8,
                background: `radial-gradient(circle, ${COLORS.accent} 0%, rgba(0,0,0,0) 70%)`,
                opacity: 0.2,
                transform: 'rotate(20deg)',
                filter: 'blur(50px)'
            }} />

            {/* Sharp flare */}
            <div style={{
                position: 'absolute',
                bottom: 100,
                right: -100 - moveX,
                width: 500,
                height: 500,
                background: `radial-gradient(circle, ${COLORS.secondary} 0%, rgba(0,0,0,0) 60%)`,
                opacity: 0.3,
                filter: 'blur(30px)'
            }} />
        </div>
    );
};
