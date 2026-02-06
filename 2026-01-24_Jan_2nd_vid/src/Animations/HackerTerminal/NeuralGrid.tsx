import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, random, spring } from 'remotion';

export const NeuralGrid: React.FC = () => {
    const frame = useCurrentFrame();
    const { width, height, fps } = useVideoConfig();

    const NODES = 12;
    const CENTER_X = width / 2;
    const CENTER_Y = height / 2;

    return (
        <AbsoluteFill style={{ backgroundColor: '#0a0a0f' }}>
            <svg style={{ width: '100%', height: '100%', position: 'absolute' }}>
                {new Array(NODES).fill(0).map((_, i) => {
                    // Random positions around center
                    const angle = (i / NODES) * Math.PI * 2;
                    const radius = interpolate(random(i), [0, 1], [150, 400]);

                    const nodeX = CENTER_X + Math.cos(angle) * radius;
                    const nodeY = CENTER_Y + Math.sin(angle) * radius;

                    // Spring animation for entrance
                    const spr = spring({
                        frame: frame - i * 2,
                        fps,
                        config: { damping: 15 }
                    });

                    const currentX = interpolate(spr, [0, 1], [CENTER_X, nodeX]);
                    const currentY = interpolate(spr, [0, 1], [CENTER_Y, nodeY]);

                    // Connection to center
                    const dashOffset = interpolate(frame, [0, 60], [1000, 0], { extrapolateRight: 'clamp' });

                    return (
                        <g key={i}>
                            <line
                                x1={CENTER_X}
                                y1={CENTER_Y}
                                x2={currentX}
                                y2={currentY}
                                stroke="#06b6d4"
                                strokeWidth="2"
                                strokeOpacity="0.3"
                                strokeDasharray="1000"
                                strokeDashoffset={dashOffset}
                            />
                            {/* Particle flow */}
                            <circle
                                r="3"
                                fill="#ec4899"
                            >
                                <animateMotion
                                    dur={`${2 + random(i)}s`}
                                    repeatCount="indefinite"
                                    path={`M ${CENTER_X} ${CENTER_Y} L ${nodeX} ${nodeY}`}
                                />
                            </circle>
                            <circle cx={currentX} cy={currentY} r="6" fill="#06b6d4" opacity={spr} />
                        </g>
                    );
                })}
                {/* Center Node */}
                <circle cx={CENTER_X} cy={CENTER_Y} r="15" fill="#06b6d4">
                    <animate attributeName="r" values="15;20;15" dur="2s" repeatCount="indefinite" />
                    <animate attributeName="fill-opacity" values="1;0.6;1" dur="2s" repeatCount="indefinite" />
                </circle>
            </svg>
        </AbsoluteFill>
    );
};
