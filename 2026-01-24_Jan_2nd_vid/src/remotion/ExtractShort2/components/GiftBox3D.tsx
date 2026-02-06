import { AbsoluteFill, useCurrentFrame, interpolate } from 'remotion';
import React from 'react';

export const GiftBox3D = () => {
    const frame = useCurrentFrame();

    // Rotation animation
    const rotateY = frame * 2;
    const rotateX = Math.sin(frame / 20) * 10 + 20;

    // Scale/Pop-in
    const scale = Math.min(1, frame / 20);

    const boxSize = 200;
    const halfSize = boxSize / 2;

    const faceStyle: React.CSSProperties = {
        position: 'absolute',
        width: boxSize,
        height: boxSize,
        backgroundColor: '#3B82F6', // Neon Blue
        border: '2px solid #60A5FA',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'white',
        fontSize: 40,
        fontWeight: 'bold',
        backfaceVisibility: 'visible', // Make sure we see it
        opacity: 0.9,
    };

    return (
        <AbsoluteFill style={{
            justifyContent: 'center',
            alignItems: 'center',
            perspective: '1000px'
        }}>
            <div
                style={{
                    width: boxSize,
                    height: boxSize,
                    transformStyle: 'preserve-3d',
                    transform: `scale(${scale}) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
                }}
            >
                {/* Front */}
                <div style={{ ...faceStyle, transform: `translateZ(${halfSize}px)` }}>
                    🎁
                </div>
                {/* Back */}
                <div style={{ ...faceStyle, transform: `rotateY(180deg) translateZ(${halfSize}px)` }} />
                {/* Right */}
                <div style={{ ...faceStyle, transform: `rotateY(90deg) translateZ(${halfSize}px)` }} />
                {/* Left */}
                <div style={{ ...faceStyle, transform: `rotateY(-90deg) translateZ(${halfSize}px)` }} />
                {/* Top */}
                <div style={{ ...faceStyle, transform: `rotateX(90deg) translateZ(${halfSize}px)`, backgroundColor: '#2563EB' }} />
                {/* Bottom */}
                <div style={{ ...faceStyle, transform: `rotateX(-90deg) translateZ(${halfSize}px)`, backgroundColor: '#1D4ED8' }} />
            </div>
        </AbsoluteFill>
    );
};
