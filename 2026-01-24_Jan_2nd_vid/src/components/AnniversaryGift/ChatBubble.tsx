import React from "react";
import { useCurrentFrame, useVideoConfig, spring } from "remotion";
import { COLORS } from "./constants";

interface ChatBubbleProps {
    text: string;
    isLeft: boolean;
    delay?: number;
    top: number;
}

export const ChatBubble: React.FC<ChatBubbleProps> = ({ text, isLeft, delay = 0, top }) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const scale = spring({
        frame: frame - delay,
        fps,
        config: {
            damping: 15,
        },
    });

    return (
        <div
            style={{
                position: "absolute",
                top,
                left: isLeft ? "20%" : "auto",
                right: isLeft ? "auto" : "20%",
                transform: `scale(${scale})`,
                backgroundColor: "white",
                padding: "20px 40px",
                borderRadius: isLeft ? "30px 30px 30px 0" : "30px 30px 0 30px",
                boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
                maxWidth: 400,
            }}
        >
            <span
                style={{
                    fontFamily: "Nunito, sans-serif",
                    fontSize: 32,
                    color: COLORS.text,
                }}
            >
                {text}
            </span>
        </div>
    );
};
