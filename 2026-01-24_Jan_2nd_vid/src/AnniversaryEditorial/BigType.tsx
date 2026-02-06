import React from "react";
import { useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { COLORS, FONT_FAMILY } from "./constants";

interface BigTypeProps {
    text: string;
    subText?: string;
    color?: string;
    bgColor?: string;
    enterDelay?: number;
}

export const BigType: React.FC<BigTypeProps> = ({
    text, subText, color = COLORS.text, bgColor = "transparent", enterDelay = 0
}) => {
    const frame = useCurrentFrame();
    const { fps, width } = useVideoConfig();
    const f = frame - enterDelay;

    // Aggressive Slide In (Left to Right) - INSTANT SNAP
    const slide = spring({
        frame: f,
        fps,
        config: { damping: 20, mass: 0.5, stiffness: 400 } // Super fast
    });

    // Scale Slam - Synced with slide
    const scale = spring({
        frame: f,
        fps,
        config: { damping: 12, mass: 1.5 }
    });

    // Aggressive Slide In: Start from just outside screen (0.8 * width) to appear faster
    const slideX = interpolate(slide, [0, 1], [-width * 0.8, 0]);

    // Opacity: Visible immediately
    // const opacity = interpolate(f, [0, 5], [0, 1]); 

    if (f < 0) return null;

    return (
        <div style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            backgroundColor: bgColor,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            overflow: 'hidden'
        }}>
            <h1 style={{
                fontFamily: FONT_FAMILY.heading,
                fontSize: 200,
                color: color,
                margin: 0,
                lineHeight: 0.8,
                textTransform: 'uppercase',
                transform: `translateX(${slideX}px) scale(${interpolate(scale, [0, 1], [1.5, 1])})`,
                opacity: 1, // Full opacity start
                textAlign: 'center'
            }}>
                {text}
            </h1>
            {subText && (
                <h2 style={{
                    fontFamily: FONT_FAMILY.body,
                    fontSize: 40,
                    color: color,
                    marginTop: 20,
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: 10,
                    opacity: interpolate(f, [40, 55], [0, 1]),
                    transform: `translateY(${interpolate(f, [40, 55], [50, 0])}px)`
                }}>
                    {subText}
                </h2>
            )}
        </div>
    );
};
