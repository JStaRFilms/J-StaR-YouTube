import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig, random } from 'remotion';
import React from 'react';
import { RobotHead } from '../ui/RobotHead';

const FailStamp = ({ scale = 1, rotation = 0 }) => (
    <div style={{
        border: '4px solid #EF4444',
        color: '#EF4444',
        padding: '8px 16px',
        fontSize: 32,
        fontWeight: 900,
        fontFamily: 'Inter, sans-serif',
        transform: `rotate(${rotation}deg) scale(${scale})`,
        borderRadius: 8,
        display: 'inline-block',
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
    }}>
        FAIL
    </div>
);

export const Scene3_Confusion: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    // Robot Animation
    // Shake head "confused"
    const headShake = Math.sin(frame * 0.2) * 5;

    // Question Marks popping up
    const q1Opacity = interpolate(frame, [10, 20], [0, 1]);
    const q2Opacity = interpolate(frame, [25, 35], [0, 1]);
    const q3Opacity = interpolate(frame, [40, 50], [0, 1]);

    // FAIL Stamps
    // Appearing randomly
    const showFail1 = frame > 60;
    const showFail2 = frame > 75;
    const showFail3 = frame > 90;

    const failScale = spring({
        frame: frame - 60,
        fps,
        config: { damping: 15, stiffness: 200 }
    });

    return (
        <AbsoluteFill style={{ backgroundColor: '#E5E7EB', justifyContent: 'center', alignItems: 'center' }}>
            {/* Desaturated BG per script */}

            {/* Robot Head */}
            <div style={{ transform: `rotate(${headShake}deg)` }}>
                <RobotHead scale={2.5} expression="confused" />
            </div>

            {/* Question Marks */}
            <div style={{ position: 'absolute', top: '35%', left: '55%', fontSize: 48, fontWeight: 'bold', color: '#111827', opacity: q1Opacity }}>?</div>
            <div style={{ position: 'absolute', top: '30%', right: '35%', fontSize: 64, fontWeight: 'bold', color: '#111827', opacity: q2Opacity }}>?</div>
            <div style={{ position: 'absolute', top: '25%', left: '40%', fontSize: 56, fontWeight: 'bold', color: '#111827', opacity: q3Opacity }}>?</div>

            {/* FAIL Stamps Overlay */}
            {showFail1 && (
                <div style={{ position: 'absolute', top: '20%', left: '10%' }}>
                    <FailStamp rotation={-15} scale={failScale} />
                </div>
            )}
            {showFail2 && (
                <div style={{ position: 'absolute', bottom: '20%', right: '15%' }}>
                    <FailStamp rotation={10} />
                </div>
            )}
            {showFail3 && (
                <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%) rotate(-5deg)' }}>
                    <FailStamp rotation={-5} scale={1.5} />
                </div>
            )}

            {/* Contrast Ratio Text */}
            <div style={{
                position: 'absolute',
                bottom: 100,
                fontFamily: 'Inter, sans-serif',
                fontWeight: 700,
                fontSize: 24,
                color: '#6B7280',
                opacity: 0.8
            }}>
                Contrast Ratio: 1.2:1
            </div>

        </AbsoluteFill>
    );
};
