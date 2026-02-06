import React, { useMemo } from 'react';
import { useCurrentFrame, useVideoConfig, interpolate, spring } from 'remotion';

const Node = ({ x, y, delay, label }: { x: number, y: number, delay: number, label: string }) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const scale = spring({
        frame: frame - delay,
        fps,
        config: { stiffness: 200, damping: 20 },
    });

    return (
        <g transform={`translate(${x}, ${y}) scale(${scale})`}>
            <circle r="40" fill="#111827" stroke="#3B82F6" strokeWidth="4" />
            <text
                dy="5"
                textAnchor="middle"
                fill="#ffffff"
                fontSize="14"
                fontWeight="bold"
                fontFamily="Inter, sans-serif"
            >
                {label}
            </text>
        </g>
    );
};

const Edge = ({ start, end, delay }: { start: [number, number], end: [number, number], delay: number }) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const progress = spring({
        frame: frame - delay,
        fps,
        config: { stiffness: 100, damping: 20 },
    });

    return (
        <line
            x1={start[0]}
            y1={start[1]}
            x2={interpolate(progress, [0, 1], [start[0], end[0]])}
            y2={interpolate(progress, [0, 1], [start[1], end[1]])}
            stroke="#4B5563"
            strokeWidth="2"
            strokeDasharray="5,5"
        />
    );
};

export const WorkflowDiagram: React.FC = () => {
    const frame = useCurrentFrame();
    const { width, height, fps } = useVideoConfig();

    // Fade out / Blur logic for CTA
    const blurStartFrame = 150; // 5 seconds into this component loop (assuming 10s duration)
    const blur = interpolate(frame, [blurStartFrame, blurStartFrame + 20], [0, 20], { extrapolateRight: 'clamp' });
    const opacity = interpolate(frame, [blurStartFrame, blurStartFrame + 20], [1, 0.4], { extrapolateRight: 'clamp' });

    // CTA Text Animation
    const ctaSlide = spring({
        frame: frame - blurStartFrame - 10,
        fps,
        config: { damping: 15 },
    });
    const ctaY = interpolate(ctaSlide, [0, 1], [100, 0]);
    const ctaOpacity = interpolate(ctaSlide, [0, 1], [0, 1]);

    const centerX = width / 2;
    const centerY = height / 2;

    return (
        <div style={{ width, height, backgroundColor: '#0f172a', position: 'relative', overflow: 'hidden' }}>

            {/* The Diagram */}
            <div style={{
                filter: `blur(${blur}px)`,
                opacity,
                transform: `scale(${interpolate(frame, [blurStartFrame, blurStartFrame + 60], [1, 1.1])})`, // Slow zoom on blur
                transformOrigin: 'center center',
                width: '100%',
                height: '100%'
            }}>
                <svg width={width} height={height}>
                    {/* Edges */}
                    <Edge start={[centerX, centerY - 300]} end={[centerX - 200, centerY - 100]} delay={10} />
                    <Edge start={[centerX, centerY - 300]} end={[centerX + 200, centerY - 100]} delay={15} />
                    <Edge start={[centerX - 200, centerY - 100]} end={[centerX, centerY + 100]} delay={30} />
                    <Edge start={[centerX + 200, centerY - 100]} end={[centerX, centerY + 100]} delay={35} />
                    <Edge start={[centerX, centerY + 100]} end={[centerX, centerY + 300]} delay={50} />

                    {/* Nodes */}
                    <Node x={centerX} y={centerY - 300} delay={0} label="IDEA" />
                    <Node x={centerX - 200} y={centerY - 100} delay={20} label="SCRIPT" />
                    <Node x={centerX + 200} y={centerY - 100} delay={25} label="AUDIO" />
                    <Node x={centerX} y={centerY + 100} delay={45} label="EDIT" />
                    <Node x={centerX} y={centerY + 300} delay={60} label="PUBLISH" />
                </svg>
            </div>

            {/* CTA Overlay */}
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                opacity: ctaOpacity,
                transform: `translateY(${ctaY}px)`
            }}>
                <h1 style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: 80,
                    fontWeight: 900,
                    color: '#ffffff',
                    textAlign: 'center',
                    marginBottom: 20,
                    textShadow: '0 0 20px rgba(59, 130, 246, 0.5)'
                }}>
                    FULL<br />WORKFLOW
                </h1>
                <div style={{
                    backgroundColor: '#3B82F6',
                    padding: '20px 60px',
                    borderRadius: 100,
                    fontSize: 40,
                    fontWeight: 700,
                    color: 'white',
                    fontFamily: 'Inter, sans-serif',
                    boxShadow: '0 0 30px rgba(59, 130, 246, 0.6)'
                }}>
                    Link in Bio 👇
                </div>
            </div>
        </div>
    );
};
