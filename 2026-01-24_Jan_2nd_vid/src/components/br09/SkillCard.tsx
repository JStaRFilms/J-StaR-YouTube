import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import React from "react";
import * as Icons from "./Icons";

interface SkillCardProps {
    iconName: string;
    text: string;
    index: number;
}

export const SkillCard: React.FC<SkillCardProps> = ({ iconName, text, index }) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    // Floating animation (Sine wave) - slower, more elegant
    const floatOffset = Math.sin((frame + index * 40) / (3 * fps) * Math.PI) * 8;

    // Glow Pulse - subtle breathing
    const glowOpacity = interpolate(
        Math.sin((frame + index * 20) / (2 * fps) * Math.PI),
        [-1, 1],
        [0.1, 0.3],
        { extrapolateRight: "clamp" }
    );

    // Spotlight effect (fake mouse movement)
    const spotlightX = interpolate(frame, [0, 10 * fps], [0, 100], { extrapolateRight: "wrap" });

    const IconComponent = (Icons as any)[`Icon${iconName}`] || Icons.IconStyles;

    return (
        <div
            style={{
                position: "relative",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                // Premium Glassmorphism
                backgroundColor: "rgba(15, 23, 42, 0.6)", // Slate-900/60
                backdropFilter: "blur(16px)",
                border: "1px solid rgba(255, 255, 255, 0.08)",
                borderRadius: "24px",
                padding: "32px",
                width: "220px",
                height: "160px",
                transform: `translateY(${floatOffset}px)`,
                boxShadow: `
            0 4px 6px -1px rgba(0, 0, 0, 0.1), 
            0 2px 4px -1px rgba(0, 0, 0, 0.06),
            inset 0 0 20px rgba(255, 255, 255, 0.02)
        `,
                overflow: "hidden"
            }}
        >
            {/* Spotlight Gradient */}
            <div style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: `radial-gradient(circle at ${spotlightX}% 50%, rgba(56, 189, 248, 0.08), transparent 70%)`,
                pointerEvents: "none",
            }} />

            {/* Top Border Highlight */}
            <div style={{
                position: "absolute",
                top: 0,
                left: "10%",
                right: "10%",
                height: "1px",
                background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)",
            }} />

            <div style={{
                color: "#38bdf8", // Sky-400
                marginBottom: "16px",
                filter: `drop-shadow(0 0 12px rgba(56, 189, 248, ${glowOpacity}))`
            }}>
                <IconComponent size={48} />
            </div>

            <div
                style={{
                    color: "#f1f5f9", // Slate-100
                    fontFamily: "Inter, sans-serif",
                    fontSize: "18px",
                    fontWeight: 600,
                    textAlign: "center",
                    letterSpacing: "-0.01em",
                    textShadow: "0 2px 10px rgba(0,0,0,0.5)"
                }}
            >
                {text}
            </div>
        </div>
    );
};
