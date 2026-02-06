import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig, spring } from 'remotion';
import React, { useMemo } from 'react';

const NODE_RADIUS = 60;
const GRAPH_RADIUS = 250;

export const KnowledgeSide: React.FC<{
    concepts: string[];
    style?: React.CSSProperties;
}> = ({ concepts, style }) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    // Calculate Node Positions in a circle
    // We memorize this so it doesn't recalculate every frame (though simple math is cheap)
    const nodes = useMemo(() => {
        return concepts.map((text, i) => {
            const angle = (i / concepts.length) * Math.PI * 2;
            return {
                id: i,
                text,
                x: Math.cos(angle) * GRAPH_RADIUS,
                y: Math.sin(angle) * GRAPH_RADIUS,
            };
        });
    }, [concepts]);

    // Center of the right half (approximate relative to component)
    // Since this component will be placed in a container, we assume 0,0 is center of THIS component
    // which will be AbsoluteFilled inside a container.

    const centralScale = spring({
        frame: frame - 20,
        fps,
        config: { damping: 15 }
    });

    return (
        <AbsoluteFill style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            ...style
        }}>
            {/* Container for the graph to center it */}
            <div style={{ position: 'relative', width: 0, height: 0 }}>

                {/* Label (Floating above) */}
                <div style={{
                    position: 'absolute',
                    top: -450,
                    left: 0,
                    transform: 'translateX(-50%)',
                    fontFamily: 'Inter, sans-serif',
                    fontSize: 40,
                    fontWeight: 'bold',
                    color: '#3b82f6', // Bright blue
                    textShadow: '0 0 20px rgba(59, 130, 246, 0.6)',
                    opacity: interpolate(frame, [10, 30], [0, 1]),
                    whiteSpace: 'nowrap'
                }}>
                    KNOWLEDGE
                </div>

                {/* Connections */}
                <svg style={{ overflow: 'visible', position: 'absolute', top: 0, left: 0 }}>
                    {nodes.map((startNode, i) =>
                        nodes.slice(i + 1).map((endNode, j) => {
                            const drawProgress = interpolate(frame, [40 + i * 5, 70 + i * 5], [0, 1], { extrapolateRight: 'clamp' });
                            return (
                                <line
                                    key={`${i}-${j}`}
                                    x1={startNode.x}
                                    y1={startNode.y}
                                    x2={endNode.x}
                                    y2={endNode.y}
                                    stroke="rgba(6, 182, 212, 0.4)" // Cyan low opacity
                                    strokeWidth={2}
                                    strokeDasharray="1000"
                                    strokeDashoffset={1000 * (1 - drawProgress)}
                                />
                            )
                        })
                    )}
                    {/* Connections to Center */}
                    {nodes.map((node, i) => {
                        const drawProgress = interpolate(frame, [40 + i * 5, 60 + i * 5], [0, 1], { extrapolateRight: 'clamp' });
                        return (
                            <line
                                key={`center-${i}`}
                                x1={0}
                                y1={0}
                                x2={node.x}
                                y2={node.y}
                                stroke="rgba(59, 130, 246, 0.6)"
                                strokeWidth={3}
                                strokeDasharray="500"
                                strokeDashoffset={500 * (1 - drawProgress)}
                            />
                        )
                    })}
                </svg>

                {/* Central Hub (Brain) */}
                <div style={{
                    position: 'absolute',
                    left: -40,
                    top: -40,
                    width: 80,
                    height: 80,
                    borderRadius: '50%',
                    backgroundColor: '#3b82f6',
                    boxShadow: '0 0 40px rgba(59, 130, 246, 0.8)',
                    transform: `scale(${spring({ frame: frame - 20, fps, config: { damping: 200 } })})`, // Smooth
                    zIndex: 10,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    {/* Brain Icon or similar */}
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="white">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
                        <circle cx="12" cy="12" r="4" />
                    </svg>
                </div>

                {/* Concept Nodes */}
                {nodes.map((node, i) => {
                    const delay = 30 + i * 5;
                    const scale = spring({
                        frame: frame - delay,
                        fps,
                        config: { damping: 200 } // Smooth reveal for "Knowledge"
                    });

                    // Pulse effect
                    const pulse = Math.sin(frame * 0.1 + i) * 0.05 + 1;

                    return (
                        <div
                            key={i}
                            style={{
                                position: 'absolute',
                                left: node.x,
                                top: node.y,
                                transform: `translate(-50%, -50%) scale(${scale * pulse})`,
                                zIndex: 5,
                            }}
                        >
                            <div style={{
                                backgroundColor: '#0f172a',
                                border: '2px solid #3b82f6',
                                borderRadius: 20,
                                padding: '12px 20px',
                                color: '#e2e8f0',
                                fontFamily: 'Inter, sans-serif',
                                fontWeight: 600,
                                fontSize: 20,
                                boxShadow: '0 0 20px rgba(59, 130, 246, 0.3)',
                                whiteSpace: 'nowrap'
                            }}>
                                {node.text}
                            </div>
                        </div>
                    );
                })}

            </div>
        </AbsoluteFill>
    );
};
