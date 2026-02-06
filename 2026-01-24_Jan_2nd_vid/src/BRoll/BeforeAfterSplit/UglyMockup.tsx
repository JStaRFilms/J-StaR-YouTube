import { useCurrentFrame, useVideoConfig, interpolate, Easing } from 'remotion';

export const UglyMockup: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    // Slide in animation (0-30 frames)
    const x = interpolate(frame, [0, 30], [-960, 0], {
        extrapolateRight: 'clamp',
        easing: Easing.out(Easing.exp),
    });

    // Red tint fade in (30-45 frames)
    const redTintOpacity = interpolate(frame, [30, 45], [0, 0.2], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
    });

    // Generate noise pattern
    const noise = Array.from({ length: 20 }, (_, i) => ({
        x: Math.random() * 960,
        y: Math.random() * 1080,
        size: Math.random() * 3 + 1,
        opacity: Math.random() * 0.3 + 0.1,
    }));

    return (
        <div
            style={{
                position: 'absolute',
                left: x,
                top: 0,
                width: 960,
                height: 1080,
                backgroundColor: '#1a1a1a',
                overflow: 'hidden',
            }}
        >
            {/* Bad UI Mockup Content */}
            <div style={{ padding: 40 }}>
                {/* Header */}
                <div style={{
                    backgroundColor: '#333',
                    padding: 20,
                    marginBottom: 30,
                    border: '3px solid #ff6b6b',
                    borderRadius: 0,
                }}>
                    <div style={{
                        fontFamily: 'Comic Sans MS, cursive',
                        fontSize: 32,
                        color: '#ff6b6b',
                        fontWeight: 'bold',
                    }}>
                        BAD DESIGN INC.
                    </div>
                </div>

                {/* Content Boxes */}
                <div style={{ display: 'flex', gap: 20, marginBottom: 30 }}>
                    <div style={{
                        flex: 1,
                        height: 150,
                        backgroundColor: '#444',
                        border: '2px dashed #666',
                    }} />
                    <div style={{
                        flex: 1,
                        height: 150,
                        backgroundColor: '#3a3a3a',
                        border: '2px solid #555',
                    }} />
                </div>

                {/* Text Lines */}
                <div style={{ marginBottom: 20 }}>
                    <div style={{
                        height: 16,
                        backgroundColor: '#555',
                        width: '90%',
                        marginBottom: 10,
                    }} />
                    <div style={{
                        height: 16,
                        backgroundColor: '#555',
                        width: '70%',
                        marginBottom: 10,
                    }} />
                    <div style={{
                        height: 16,
                        backgroundColor: '#555',
                        width: '80%',
                    }} />
                </div>

                {/* Error Indicators */}
                <div style={{
                    position: 'absolute',
                    top: 200,
                    right: 50,
                    backgroundColor: '#ff6b6b',
                    color: 'white',
                    padding: '8px 16px',
                    fontFamily: 'monospace',
                    fontSize: 14,
                    fontWeight: 'bold',
                }}>
                    ERROR!
                </div>
                <div style={{
                    position: 'absolute',
                    top: 400,
                    left: 100,
                    backgroundColor: '#ff6b6b',
                    color: 'white',
                    padding: '8px 16px',
                    fontFamily: 'monospace',
                    fontSize: 14,
                    fontWeight: 'bold',
                }}>
                    WARNING!
                </div>

                {/* Misaligned Button */}
                <div style={{
                    marginTop: 40,
                    backgroundColor: '#ff4444',
                    color: 'white',
                    padding: '15px 30px',
                    display: 'inline-block',
                    fontFamily: 'Comic Sans MS, cursive',
                    fontSize: 20,
                    transform: 'rotate(-2deg)',
                }}>
                    CLICK ME???
                </div>
            </div>

            {/* Red Tint Overlay */}
            <div style={{
                position: 'absolute',
                inset: 0,
                backgroundColor: '#ff6b6b',
                opacity: redTintOpacity,
                pointerEvents: 'none',
            }} />

            {/* Noise Overlay */}
            <svg style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                pointerEvents: 'none',
                opacity: 0.15,
            }}>
                {noise.map((n, i) => (
                    <rect
                        key={i}
                        x={n.x}
                        y={n.y}
                        width={n.size}
                        height={n.size}
                        fill="white"
                        opacity={n.opacity}
                    />
                ))}
            </svg>

            {/* Desaturation filter */}
            <div style={{
                position: 'absolute',
                inset: 0,
                backgroundColor: 'rgba(100, 100, 100, 0.3)',
                mixBlendMode: 'saturation',
                pointerEvents: 'none',
            }} />
        </div>
    );
};
