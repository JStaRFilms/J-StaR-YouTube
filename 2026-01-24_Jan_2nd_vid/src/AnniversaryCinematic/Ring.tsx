import React from "react";
import { useCurrentFrame, useVideoConfig, spring, interpolate, Easing } from "remotion";
import { COLORS } from "./constants";

export const Ring: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    // Entrance pop
    const scale = spring({
        frame,
        fps,
        config: { damping: 10, stiffness: 100 }, // Bouncier
    });

    const rotateY = interpolate(frame, [0, 60, 120], [0, 360, 380], {
        extrapolateRight: "clamp",
        easing: Easing.out(Easing.exp)
    });

    const floatY = Math.sin(frame / 20) * 15;
    const flash = interpolate(frame, [40, 50, 60], [0, 1, 0], { extrapolateRight: 'clamp' });

    return (
        <div
            style={{
                transform: `translateY(${floatY}px) scale(${scale * 1.5})`, // Scaled up 1.5x
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
                perspective: 1000,
            }}
        >
            <div style={{ transform: `rotateY(${rotateY}deg)`, transformStyle: "preserve-3d" }}>
                <svg width="300" height="300" viewBox="0 0 100 100" style={{ overflow: "visible" }}>
                    <defs>
                        <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#FFF7CC" />
                            <stop offset="50%" stopColor="#FFD700" />
                            <stop offset="100%" stopColor="#B39700" />
                        </linearGradient>
                        <filter id="glow">
                            <feGaussianBlur stdDeviation="2.5" result="coloredBlur" />
                            <feMerge>
                                <feMergeNode in="coloredBlur" />
                                <feMergeNode in="SourceGraphic" />
                            </feMerge>
                        </filter>
                    </defs>

                    <path d="M25 65 A 25 25 0 1 0 75 65" fill="none" stroke="#B39700" strokeWidth="2" strokeLinecap="round" />
                    <circle cx="50" cy="65" r="25" fill="none" stroke="url(#goldGradient)" strokeWidth="2" filter="url(#glow)" />
                    {/* Diamond setting - also refined */}
                    <path d="M35 40 L65 40 L50 65 Z" fill="url(#goldGradient)" stroke="none" transform="scale(0.7) translate(18, 20)" />
                    <g transform="scale(0.8) translate(10, 10)">
                        <path
                            d="M30 40 L50 20 L70 40 L50 55 Z"
                            fill="#E0F7FA"
                            stroke="white"
                            strokeWidth="0.5"
                            style={{ filter: "drop-shadow(0 0 5px cyan)" }}
                        />
                        <path d="M30 40 L50 20 L50 55 Z" fill="rgba(255,255,255,0.4)" />
                        <path d="M70 40 L50 20 L50 55 Z" fill="rgba(255,255,255,0.2)" />
                    </g>
                </svg>
            </div>

            <div style={{
                position: "absolute",
                top: -20,
                left: 50,
                width: 100,
                height: 100,
                marginLeft: -50,
                opacity: flash,
                background: "radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(255,255,255,0) 70%)",
                transform: "scale(2)",
                pointerEvents: "none"
            }} />
        </div>
    );
};
