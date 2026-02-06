import React from 'react';

/**
 * UglyMockup - A deliberately terrible dashboard design
 * Used as the "before" state in the transformation animation
 * 
 * Features: Comic Sans, clashing colors, misaligned elements, error badges,
 * broken layout, unnecessary borders, chaotic spacing
 */
export const UglyMockup: React.FC<{ scale?: number }> = ({ scale = 1 }) => {
    return (
        <div
            style={{
                width: 800 * scale,
                height: 600 * scale,
                backgroundColor: '#2a2a2a',
                border: '4px solid #ff6b6b',
                borderRadius: 0,
                overflow: 'hidden',
                position: 'relative',
                fontFamily: 'Comic Sans MS, cursive',
                transform: 'rotate(-1deg)',
            }}
        >
            {/* Ugly Header */}
            <div
                style={{
                    height: 60 * scale,
                    background: 'linear-gradient(90deg, #8B0000, #FF4500)',
                    borderBottom: '3px dashed #ffff00',
                    display: 'flex',
                    alignItems: 'center',
                    padding: `0 ${20 * scale}px`,
                    justifyContent: 'space-between',
                }}
            >
                <div
                    style={{
                        fontSize: 24 * scale,
                        color: '#00ff00',
                        fontWeight: 'bold',
                        textShadow: '2px 2px #000',
                    }}
                >
                    🌐 MY DASHBOARD v1.0
                </div>
                <div
                    style={{
                        fontSize: 12 * scale,
                        color: '#ffff00',
                        backgroundColor: '#ff0000',
                        padding: `${4 * scale}px ${8 * scale}px`,
                        fontWeight: 'bold',
                    }}
                >
                    ⚠️ 47 ERRORS
                </div>
            </div>

            {/* Chaotic Content */}
            <div style={{ padding: 20 * scale, display: 'flex', gap: 15 * scale }}>
                {/* Sidebar - Misaligned */}
                <div
                    style={{
                        width: 150 * scale,
                        backgroundColor: '#3d3d3d',
                        border: '2px solid #666',
                        padding: 10 * scale,
                    }}
                >
                    {['🏠 Home', '📊 Stats', '⚙️ Settings', '❓ Help???'].map((item, i) => (
                        <div
                            key={i}
                            style={{
                                padding: `${8 * scale}px`,
                                marginBottom: 5 * scale,
                                backgroundColor: i === 1 ? '#ff00ff' : 'transparent',
                                color: i === 1 ? '#000' : '#00ffff',
                                fontSize: 14 * scale,
                                borderLeft: i === 2 ? '3px solid #00ff00' : 'none',
                                transform: i === 3 ? 'rotate(3deg)' : 'none',
                            }}
                        >
                            {item}
                        </div>
                    ))}
                </div>

                {/* Main Content - Messy */}
                <div style={{ flex: 1 }}>
                    {/* Stats Cards - Mismatched */}
                    <div style={{ display: 'flex', gap: 10 * scale, marginBottom: 15 * scale }}>
                        <div
                            style={{
                                flex: 1,
                                height: 80 * scale,
                                backgroundColor: '#004400',
                                border: '3px solid #00ff00',
                                borderRadius: 0,
                                padding: 10 * scale,
                            }}
                        >
                            <div style={{ color: '#ffff00', fontSize: 12 * scale }}>USERS</div>
                            <div style={{ color: '#00ff00', fontSize: 28 * scale, fontWeight: 'bold' }}>
                                1,234
                            </div>
                        </div>
                        <div
                            style={{
                                flex: 1,
                                height: 80 * scale,
                                backgroundColor: '#440044',
                                border: '3px dotted #ff00ff',
                                borderRadius: 20 * scale,
                                padding: 10 * scale,
                            }}
                        >
                            <div style={{ color: '#ff00ff', fontSize: 10 * scale }}>revenue</div>
                            <div style={{ color: '#ffffff', fontSize: 22 * scale }}>$$$</div>
                        </div>
                        <div
                            style={{
                                flex: 1,
                                height: 80 * scale,
                                backgroundColor: '#442200',
                                border: '2px solid #ff6600',
                                padding: 10 * scale,
                                transform: 'skewX(-5deg)',
                            }}
                        >
                            <div style={{ color: '#ffaa00', fontSize: 14 * scale }}>CLICKS</div>
                            <div style={{ color: '#ff6600', fontSize: 24 * scale }}>???</div>
                        </div>
                    </div>

                    {/* Ugly Chart Placeholder */}
                    <div
                        style={{
                            height: 200 * scale,
                            backgroundColor: '#1a1a1a',
                            border: '2px inset #666',
                            position: 'relative',
                            overflow: 'hidden',
                        }}
                    >
                        {/* Fake bar chart - misaligned */}
                        <div style={{ display: 'flex', gap: 15 * scale, padding: 20 * scale, alignItems: 'flex-end', height: '100%' }}>
                            {[60, 40, 90, 30, 70, 50, 80].map((h, i) => (
                                <div
                                    key={i}
                                    style={{
                                        width: 40 * scale,
                                        height: `${h}%`,
                                        backgroundColor: ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff', '#ff6600'][i],
                                        border: '1px solid #333',
                                        transform: `rotate(${(i - 3) * 2}deg)`,
                                    }}
                                />
                            ))}
                        </div>
                        {/* "Loading" text */}
                        <div
                            style={{
                                position: 'absolute',
                                top: 10 * scale,
                                right: 10 * scale,
                                color: '#ff6b6b',
                                fontSize: 10 * scale,
                            }}
                        >
                            Loading...
                        </div>
                    </div>

                    {/* Ugly Button */}
                    <div
                        style={{
                            marginTop: 15 * scale,
                            backgroundColor: '#ff4444',
                            color: '#ffff00',
                            padding: `${12 * scale}px ${20 * scale}px`,
                            fontSize: 16 * scale,
                            fontWeight: 'bold',
                            display: 'inline-block',
                            border: '3px outset #888',
                            cursor: 'pointer',
                            textTransform: 'uppercase',
                        }}
                    >
                        CLICK HERE!!! 👆
                    </div>
                </div>
            </div>

            {/* Floating Error Badges */}
            <div
                style={{
                    position: 'absolute',
                    top: 100 * scale,
                    right: 20 * scale,
                    backgroundColor: '#ff0000',
                    color: '#fff',
                    padding: `${4 * scale}px ${8 * scale}px`,
                    fontSize: 10 * scale,
                    fontWeight: 'bold',
                    transform: 'rotate(5deg)',
                }}
            >
                ERROR!
            </div>
            <div
                style={{
                    position: 'absolute',
                    bottom: 80 * scale,
                    left: 30 * scale,
                    backgroundColor: '#ff6600',
                    color: '#000',
                    padding: `${4 * scale}px ${8 * scale}px`,
                    fontSize: 10 * scale,
                    fontWeight: 'bold',
                    transform: 'rotate(-3deg)',
                }}
            >
                WARNING!
            </div>
        </div>
    );
};
