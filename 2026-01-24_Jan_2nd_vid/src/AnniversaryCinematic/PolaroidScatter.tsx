import React from "react";
import { useCurrentFrame, interpolate, random, Easing, useVideoConfig } from "remotion";
import { COLORS } from "./constants";

const POLAROIDS = Array.from({ length: 15 }).map((_, i) => ({
    id: i,
    x: (random(i) - 0.5) * 1500, // Wide spread
    y: (random(i + 100) - 0.5) * 1000,
    zStart: (random(i + 200) * 4000) + 1000, // Start far back
    rotation: random(i + 300) * 40 - 20,
    color: i % 2 === 0 ? COLORS.primary : COLORS.secondary
}));

export const PolaroidScatter: React.FC = () => {
    const frame = useCurrentFrame();

    return (
        <div style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            perspective: 1000,
            transformStyle: 'preserve-3d',
            pointerEvents: 'none'
        }}>
            {POLAROIDS.map((p) => {
                // Camera Move: MATCHES TimelineFlythrough EXACTLY
                // Frame 0 -> 0px
                // Frame 150 -> 4200px (Slowing down at end)
                const cameraZ = interpolate(frame, [0, 150], [0, 4200], {
                    easing: Easing.out(Easing.cubic)
                });

                const currentZ = p.zStart - cameraZ;

                // Fade out distance
                const opacity = interpolate(currentZ, [-500, 0, 1000, 3000], [0, 0, 1, 0]);

                if (currentZ < -2000) return null; // Optimization

                return (
                    <div
                        key={p.id}
                        style={{
                            position: 'absolute',
                            left: '50%',
                            top: '50%',
                            width: 200,
                            height: 240,
                            backgroundColor: 'white',
                            padding: '10px 10px 40px 10px',
                            boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
                            transform: `translate3d(${p.x}px, ${p.y}px, ${currentZ}px) rotate(${p.rotation}deg)`,
                            opacity,
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}
                    >
                        <div style={{
                            width: '100%',
                            height: '100%',
                            backgroundColor: '#eee',
                            overflow: 'hidden',
                            position: 'relative'
                        }}>
                            {/* Abstract "Memory" Art */}
                            <div style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                width: '100%',
                                height: '100%',
                                background: `linear-gradient(${p.rotation * 5}deg, ${p.color}, #1A1A2E)`
                            }} />
                            <div style={{
                                position: 'absolute',
                                top: '20%',
                                left: '20%',
                                width: '60%',
                                height: '60%',
                                border: '2px solid white',
                                borderRadius: '50%'
                            }} />
                        </div>
                    </div>
                );
            })}
        </div>
    );
};
