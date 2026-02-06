import React, { useMemo } from "react";
import { AbsoluteFill, Sequence, useCurrentFrame, useVideoConfig, interpolate, random } from "remotion";
import { z } from "zod";
import { loadFont } from "@remotion/google-fonts/Inter";
import { SkillCard } from "./SkillCard";
import { WorkflowStep } from "./WorkflowStep";
import { ConnectionBeam } from "./ConnectionBeam";

const { fontFamily } = loadFont();

// --- COMPONENTS ---

const Background = () => {
    const frame = useCurrentFrame();
    const { fps, width, height } = useVideoConfig();

    // Slow movement for Aurora blobs
    const t = frame / fps;

    // Blob 1 (Top Left - Purple/Blue)
    const x1 = Math.sin(t * 0.5) * 200;
    const y1 = Math.cos(t * 0.3) * 100;

    // Blob 2 (Bottom Right - Cyan)
    const x2 = Math.cos(t * 0.4) * 200;
    const y2 = Math.sin(t * 0.6) * 100;

    return (
        <AbsoluteFill style={{ background: "#020617", overflow: "hidden" }}>
            {/* Base Gradient */}
            <div style={{
                position: "absolute",
                inset: 0,
                background: "radial-gradient(circle at 50% 0%, #1e1b4b 0%, #020617 60%)"
            }} />

            {/* Aurora Blob 1 */}
            <div style={{
                position: "absolute",
                top: "20%",
                left: "20%",
                width: "800px",
                height: "800px",
                background: "radial-gradient(circle, rgba(79, 70, 229, 0.15) 0%, transparent 70%)",
                transform: `translate(${x1}px, ${y1}px)`,
                filter: "blur(60px)",
            }} />

            {/* Aurora Blob 2 */}
            <div style={{
                position: "absolute",
                bottom: "10%",
                right: "10%",
                width: "600px",
                height: "600px",
                background: "radial-gradient(circle, rgba(6, 182, 212, 0.15) 0%, transparent 70%)",
                transform: `translate(${x2}px, ${y2}px)`,
                filter: "blur(50px)",
            }} />

            {/* Grid Overlay */}
            <div style={{
                position: "absolute",
                inset: 0,
                backgroundImage: "linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px)",
                backgroundSize: "40px 40px",
                maskImage: "radial-gradient(circle at 50% 50%, black 40%, transparent 80%)"
            }} />
        </AbsoluteFill>
    );
};

export const SkillsWorkflowsExplainerSchema = z.object({
    skillStats: z.array(z.object({
        iconName: z.string(),
        text: z.string(),
    })).default([
        { iconName: 'Styles', text: '50+ Styles' },
        { iconName: 'Palette', text: '97 Palettes' },
        { iconName: 'Typography', text: '57 Fonts' },
        { iconName: 'Ruler', text: '99 Rules' },
    ]),
    workflowSteps: z.array(z.object({
        label: z.string(),
        iconName: z.string()
    })).default([
        { label: 'Interview User', iconName: 'User' },
        { label: 'Search Skills', iconName: 'Search' },
        { label: 'Generate Design', iconName: 'Cpu' },
        { label: 'Output Files', iconName: 'File' },
    ]),
});

export const SkillsWorkflowsExplainer: React.FC<z.infer<typeof SkillsWorkflowsExplainerSchema>> = ({
    skillStats,
    workflowSteps,
}) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    // Title Animation
    const titleOpacity = interpolate(frame, [0, 30], [0, 1], { extrapolateRight: "clamp" });
    const titleY = interpolate(frame, [0, 30], [20, 0], { extrapolateRight: "clamp" });
    const vsScale = interpolate(frame, [20, 40], [0, 1], { extrapolateRight: "clamp", easing: (t) => t * (2 - t) }); // simple ease out

    return (
        <AbsoluteFill style={{ fontFamily, color: "white" }}>
            <Background />

            {/* Content Container */}
            <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>

                {/* Title */}
                <div style={{
                    position: "absolute",
                    top: 100,
                    textAlign: "center",
                    opacity: titleOpacity,
                    transform: `translateY(${titleY}px)`,
                    zIndex: 20
                }}>
                    <h1 style={{
                        fontSize: 72,
                        fontWeight: 800,
                        margin: 0,
                        background: "linear-gradient(to right, #f8fafc, #94a3b8)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        filter: "drop-shadow(0 4px 12px rgba(0,0,0,0.5))"
                    }}>
                        Skills
                        <span style={{
                            display: "inline-block",
                            margin: "0 16px",
                            fontSize: 48,
                            color: "#a5b4fc",
                            WebkitTextFillColor: "#a5b4fc", // Override transparent
                            transform: `scale(${vsScale})`
                        }}>vs</span>
                        Workflows
                    </h1>
                </div>

                <div style={{
                    display: "flex",
                    flexDirection: "row",
                    width: "100%",
                    maxWidth: "1400px",
                    height: "100%",
                    paddingTop: 240,
                    justifyContent: "center",
                    gap: "80px"
                }}>

                    {/* LEFT COLUMN: SKILLS (Grid) */}
                    <div style={{ flex: 1, display: "flex", justifyContent: "center", paddingTop: 40 }}>
                        <div style={{
                            display: "grid",
                            gridTemplateColumns: "1fr 1fr",
                            gap: "40px",
                            height: "fit-content",
                            justifyItems: "center"
                        }}>
                            {skillStats.map((stat, i) => (
                                <Sequence
                                    key={i}
                                    from={15 + i * 8}
                                    style={{ position: "relative", display: "flex", justifyContent: "center", width: "100%" }}
                                    premountFor={30}
                                >
                                    <SkillCard index={i} iconName={stat.iconName} text={stat.text} />
                                </Sequence>
                            ))}
                        </div>
                    </div>

                    {/* DIVIDER */}
                    <div style={{
                        width: "2px",
                        backgroundColor: "rgba(255,255,255,0.05)",
                        height: "60%",
                        alignSelf: "center",
                        position: "relative"
                    }}>
                        {/* Glow Line */}
                        <div style={{
                            position: "absolute",
                            top: 0,
                            left: "-1px",
                            width: "4px",
                            height: "30%",
                            background: "linear-gradient(to bottom, transparent, #38bdf8, transparent)",
                            opacity: 0.5,
                            transform: `translateY(${interpolate(frame, [0, 4 * fps], [0, 600], { extrapolateRight: 'wrap' })}%)`
                        }} />
                    </div>

                    {/* RIGHT COLUMN: WORKFLOWS (Vertical List) */}
                    <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center" }}>
                        {workflowSteps.map((step, i) => {
                            const isLast = i === workflowSteps.length - 1;
                            return (
                                <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%" }}>
                                    <Sequence
                                        from={40 + i * 15}
                                        style={{ position: "relative", display: "flex", justifyContent: "center", width: "100%" }}
                                        premountFor={30}
                                    >
                                        <WorkflowStep label={step.label} iconName={step.iconName} index={i} />
                                    </Sequence>

                                    {!isLast && (
                                        <Sequence
                                            from={40 + i * 15 + 10}
                                            style={{ position: "relative", display: "flex", justifyContent: "center", width: "100%" }}
                                            premountFor={30}
                                        >
                                            <ConnectionBeam height={60} delay={0} />
                                        </Sequence>
                                    )}
                                    {/* Spacer */}
                                    {!isLast && <div style={{ height: 60 }} />}
                                </div>
                            );
                        })}
                    </div>
                </div>
            </AbsoluteFill>
        </AbsoluteFill>
    );
};
