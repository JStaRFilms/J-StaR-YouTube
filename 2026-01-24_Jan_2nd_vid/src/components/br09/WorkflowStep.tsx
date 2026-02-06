import React from "react";
import { useCurrentFrame, useVideoConfig, spring } from "remotion";
import * as Icons from "./Icons";

interface WorkflowStepProps {
    label: string;
    iconName: string;
    index: number;
}

export const WorkflowStep: React.FC<WorkflowStepProps> = ({ label, iconName, index }) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const scale = spring({
        frame: frame - index * 5,
        fps,
        config: { damping: 15 },
    });

    const IconComponent = (Icons as any)[`Icon${iconName}`] || Icons.IconFile;

    return (
        <div
            style={{
                display: "flex",
                alignItems: "center",
                // Darker, sleeker background
                backgroundColor: "rgba(30, 41, 59, 0.8)", // Slate-800/80
                backdropFilter: "blur(12px)",
                border: "1px solid rgba(148, 163, 184, 0.2)",
                borderRadius: "12px", // Slightly less rounded, more techy
                padding: "16px 24px",
                transform: `scale(${scale})`,
                boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.3), 0 4px 6px -2px rgba(0, 0, 0, 0.2)",
                zIndex: 10,
                minWidth: "220px",
                gap: "16px"
            }}
        >
            <div style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "36px",
                height: "36px",
                borderRadius: "8px",
                backgroundColor: "rgba(56, 189, 248, 0.1)",
                color: "#38bdf8"
            }}>
                <IconComponent size={20} />
            </div>

            <span
                style={{
                    color: "#f8fafc",
                    fontFamily: "Inter, sans-serif",
                    fontSize: "18px",
                    fontWeight: 600,
                    letterSpacing: "-0.01em"
                }}
            >
                {label}
            </span>
        </div>
    );
};
