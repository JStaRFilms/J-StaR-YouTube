import React from 'react';

export const SimpleUglyMockup: React.FC = () => {
    // Generate noise pattern (static)
    const noise = Array.from({ length: 20 }, (_, i) => ({
        x: (i * 45) % 960, // Deterministic noise for stability
        y: (i * 73) % 1080,
        size: (i % 3) + 2,
        opacity: 0.3,
    }));

    return (
        <div
            style={{
                width: 1920,
                height: 1080,
                backgroundColor: '#1a1a1a',
                overflow: 'hidden',
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <div style={{
                width: 960,
                height: 800,
                backgroundColor: '#fff',
                position: 'relative',
                boxShadow: '0 0 20px rgba(0,0,0,0.5)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}>
                {/* Bad UI Mockup Content */}
                <div style={{ padding: 40, width: '100%' }}>
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
                            fill="#000"
                            opacity={n.opacity}
                        />
                    ))}
                </svg>
            </div>
        </div>
    );
};
