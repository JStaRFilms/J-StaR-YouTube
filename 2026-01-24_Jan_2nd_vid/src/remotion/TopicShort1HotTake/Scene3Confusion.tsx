import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import React from 'react';

const COLORS = {
    bg: '#E7E5E4', // Sand 200 (Darker for confusion)
    text: '#1C1917',
    fail: '#EA580C' // Terra 600
};

export const Scene3Confusion: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    // Robot Shake
    const shake = Math.sin(frame * 0.5) * 10;

    // Eye Animation
    const eyeScale = spring({ frame, fps, config: { damping: 10 } });

    // Stamps
    const stamp1Opacity = interpolate(frame, [10, 15], [0, 1]);
    const stamp1Scale = spring({ frame: frame - 10, fps, config: { stiffness: 200, damping: 10 } });

    const stamp2Opacity = interpolate(frame, [25, 30], [0, 1]);
    const stamp2Scale = spring({ frame: frame - 25, fps, config: { stiffness: 200, damping: 10 } });

    return (
        <AbsoluteFill style={{ backgroundColor: COLORS.bg, justifyContent: 'center', alignItems: 'center' }}>

            {/* Robot Head */}
            <div style={{
                width: 300,
                height: 300,
                backgroundColor: COLORS.text,
                borderRadius: 40,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                transform: `translateX(${shake}px)`,
                position: 'relative',
                boxShadow: '0 20px 40px rgba(0,0,0,0.2)'
            }}>
                {/* Antenna */}
                <div style={{ position: 'absolute', top: -40, left: 135, width: 30, height: 40, backgroundColor: COLORS.text }} />
                <div style={{ position: 'absolute', top: -60, left: 125, width: 50, height: 50, borderRadius: '50%', backgroundColor: COLORS.fail }} />

                {/* Eyes */}
                <div style={{ display: 'flex', gap: 40 }}>
                    <div style={{ fontSize: 100, color: '#FFF', fontWeight: 900, transform: `scale(${eyeScale})` }}>?</div>
                    <div style={{ fontSize: 100, color: '#FFF', fontWeight: 900, transform: `scale(${eyeScale})` }}>?</div>
                </div>

                {/* Mouth */}
                <div style={{
                    position: 'absolute',
                    bottom: 50,
                    width: 150,
                    height: 10,
                    backgroundColor: '#FFF',
                    borderRadius: 5
                }} />
            </div>

            {/* FAIL Stamps */}
            <div style={{
                position: 'absolute',
                top: 200,
                left: 100,
                fontSize: 80,
                fontWeight: 900,
                color: COLORS.fail,
                border: `8px solid ${COLORS.fail}`,
                padding: '10px 40px',
                transform: `rotate(-15deg) scale(${stamp1Scale})`,
                opacity: stamp1Opacity,
                fontFamily: 'Merriweather, serif'
            }}>
                CONTRAST?
            </div>

            <div style={{
                position: 'absolute',
                bottom: 300,
                right: 100,
                fontSize: 80,
                fontWeight: 900,
                color: COLORS.fail,
                border: `8px solid ${COLORS.fail}`,
                padding: '10px 40px',
                transform: `rotate(15deg) scale(${stamp2Scale})`,
                opacity: stamp2Opacity,
                fontFamily: 'Merriweather, serif'
            }}>
                THEORY?
            </div>

        </AbsoluteFill>
    );
};
