import React, { useMemo, useRef, useEffect } from "react";
import {
    AbsoluteFill,
    interpolate,
    spring,
    useCurrentFrame,
    useVideoConfig,
    Sequence,
    Easing,
} from "remotion";
import { loadFont } from "@remotion/google-fonts/JetBrainsMono";
import { PromptTypingMadnessProps } from "./types";

const { fontFamily } = loadFont();

export const PromptTypingMadness: React.FC<PromptTypingMadnessProps> = ({
    prompt,
    typingSpeed = 4,
}) => {
    const frame = useCurrentFrame();
    const { fps, width, height } = useVideoConfig();

    // Scene Timing
    const scene1End = 0.5 * fps;
    const scene2End = 3 * fps;
    const scene3End = 4.5 * fps;

    // Typing logic
    const charsTyped = Math.floor(
        interpolate(frame, [scene1End, scene2End], [0, prompt.length], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
        })
    );
    const displayedText = prompt.slice(0, charsTyped);

    // Cursor blink
    const cursorVisible = frame % 20 < 10;

    // Styling Constants
    const bgColor = "#1e1e2e";
    const editorBg = "#11111b";
    const textColor = "#cdd6f4";
    const highlightColor = "#f9e2af";
    const cursorColor = "#89b4fa";
    const redColor = "#f38ba8";

    // Overwhelm effects (Scene 3)
    const overwhelmProgress = interpolate(
        frame,
        [scene2End, scene3End],
        [0, 1],
        { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
    );

    const blur = interpolate(overwhelmProgress, [0, 1], [0, 4]);
    const redGlow = interpolate(overwhelmProgress, [0, 0.5, 1], [0, 1, 0.5]);

    // Stamp logic (Scene 4)
    const stampFrame = frame - (4.5 * fps);
    const stampScale = spring({
        frame: stampFrame,
        fps,
        config: {
            stiffness: 500,
            damping: 20,
        },
        from: 4,
        to: 2,
        durationInFrames: 10,
    });

    const stampOpacity = interpolate(stampFrame, [0, 5], [0, 1], {
        extrapolateRight: "clamp",
    });

    // Red X Draw animation
    const xFrame = frame - (4.7 * fps);
    const xProgress = interpolate(xFrame, [0, 10], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });

    return (
        <AbsoluteFill
            style={{
                backgroundColor: bgColor,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontFamily,
            }}
        >
            <div
                style={{
                    width: "80%",
                    height: "60%",
                    backgroundColor: editorBg,
                    borderRadius: 16,
                    border: `2px solid ${redGlow > 0 ? `rgba(243, 139, 168, ${redGlow})` : "#313244"}`,
                    boxShadow: redGlow > 0 ? `0 0 ${redGlow * 30}px rgba(243, 139, 168, ${redGlow})` : "none",
                    padding: 32,
                    display: "flex",
                    flexDirection: "column",
                    position: "relative",
                    overflow: "hidden",
                    filter: `blur(${blur}px)`,
                }}
            >
                {/* Top Bar / Header */}
                <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
                    <div style={{ width: 12, height: 12, borderRadius: "50%", backgroundColor: "#f38ba8" }} />
                    <div style={{ width: 12, height: 12, borderRadius: "50%", backgroundColor: "#f9e2af" }} />
                    <div style={{ width: 12, height: 12, borderRadius: "50%", backgroundColor: "#a6e3a1" }} />
                    <span style={{ color: "#585b70", fontSize: 14, marginLeft: "auto" }}>Prompt Editor</span>
                </div>

                {/* Editor Content Area */}
                <div
                    style={{
                        flex: 1,
                        color: textColor,
                        fontSize: 24,
                        lineHeight: 1.5,
                        whiteSpace: "pre-wrap",
                        overflow: "hidden",
                        position: "relative",
                    }}
                >
                    <div
                        style={{
                            transform: `translateY(${interpolate(
                                charsTyped,
                                [200, prompt.length],
                                [0, -height * 0.25], // Reduced scroll amount
                                { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
                            )}px)`,
                        }}
                    >
                        {displayedText}
                        {cursorVisible && (
                            <span
                                style={{
                                    display: "inline-block",
                                    width: 2,
                                    height: 28,
                                    backgroundColor: cursorColor,
                                    verticalAlign: "middle",
                                    marginLeft: 4,
                                }}
                            />
                        )}
                    </div>

                    {charsTyped === 0 && frame < scene1End && (
                        <span style={{ color: "#585b70" }}>Describe your design...</span>
                    )}
                </div>

                {/* Character Counter */}
                <div
                    style={{
                        position: "absolute",
                        bottom: 20,
                        right: 20,
                        fontSize: 14,
                        color: overwhelmProgress > 0.5 ? redColor : "#585b70",
                    }}
                >
                    {displayedText.length} characters
                </div>
            </div>

            {/* Frustration Emoji (Scene 3) */}
            {frame >= scene2End && (
                <div
                    style={{
                        position: "absolute",
                        top: "20%",
                        right: "15%",
                        fontSize: 80,
                        transform: `scale(${spring({ frame: frame - scene2End, fps, config: { damping: 10 } })})`,
                    }}
                >
                    😩
                </div>
            )}

            {/* Scene 4: EXHAUSTING. Stamp */}
            {frame >= 4.5 * fps && (
                <AbsoluteFill
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        zIndex: 10,
                        pointerEvents: "none",
                    }}
                >
                    <div
                        style={{
                            transform: `scale(${stampScale}) rotate(-15deg)`,
                            opacity: stampOpacity,
                            color: "#f38ba8",
                            fontSize: 160,
                            fontWeight: "black",
                            border: "12px solid #f38ba8",
                            padding: "20px 60px",
                            borderRadius: 20,
                            textTransform: "uppercase",
                            backgroundColor: "rgba(30, 30, 46, 0.8)",
                            boxShadow: "0 20px 50px rgba(0,0,0,0.5)",
                        }}
                    >
                        EXHAUSTING.
                    </div>
                </AbsoluteFill>
            )}

            {/* Red X Overlay */}
            {frame >= 4.7 * fps && (
                <AbsoluteFill style={{ pointerEvents: "none", zIndex: 11 }}>
                    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
                        <path
                            d={`M ${width * 0.2} ${height * 0.2} L ${width * 0.8} ${height * 0.8}`}
                            fill="transparent"
                            stroke="#f38ba8"
                            strokeWidth="40"
                            strokeDasharray={2000}
                            strokeDashoffset={2000 * (1 - xProgress)}
                            strokeLinecap="round"
                        />
                        <path
                            d={`M ${width * 0.8} ${height * 0.2} L ${width * 0.2} ${height * 0.8}`}
                            fill="transparent"
                            stroke="#f38ba8"
                            strokeWidth="40"
                            strokeDasharray={2000}
                            strokeDashoffset={2000 * (1 - xProgress)}
                            strokeLinecap="round"
                        />
                    </svg>
                </AbsoluteFill>
            )}
        </AbsoluteFill>
    );
};
