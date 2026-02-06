import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import React from 'react';
import { RobotHead } from '../ui/RobotHead';

const SkillFile = ({ scale = 1, opacity = 1 }) => (
    <div style={{
        width: 120 * scale,
        height: 160 * scale,
        backgroundColor: '#FFFFFF',
        border: '2px solid #111827',
        borderRadius: 8 * scale,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
        opacity,
    }}>
        <div style={{
            fontFamily: 'JetBrains Mono, monospace',
            fontWeight: 700,
            fontSize: 24 * scale,
            color: '#111827',
            textAlign: 'center',
        }}>
            SKILL<br />.md
        </div>
        <div style={{
            position: 'absolute',
            top: -10 * scale,
            right: -10 * scale,
            backgroundColor: '#22C55E', // Green-500
            color: 'white',
            padding: '4px 8px',
            borderRadius: 4,
            fontSize: 12 * scale,
            fontWeight: 700,
        }}>
            NEW
        </div>
    </div>
);

export const Scene3_Solution: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    // Timeline
    // 0-30: Skill flies in
    // 30-45: Injection (Absorb)
    // 45-60: Shock/Glow
    // 60+: Happy Sigh (Relief that it doesn't have to guess colors anymore)

    // FILE ANIMATION
    const skillProgress = spring({
        frame,
        fps,
        config: { damping: 20 },
    });

    // Path: Top Right -> Head Center
    const skillX = interpolate(skillProgress, [0, 1], [800, 540]);
    const skillY = interpolate(skillProgress, [0, 1], [-200, 650]);

    // Merge Effect: File shrinks but also fades out as if 'entering' volume
    // Rather than just disappearing, let's make it shrink to 0 scale rapidly at the hit moment
    const hitFrame = 25; // slightly faster hit
    const absorbProgress = spring({
        frame: frame - hitFrame,
        fps,
        config: { stiffness: 200, damping: 20 }
    });

    const skillScale = interpolate(absorbProgress, [0, 1], [1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
    const skillOpacity = interpolate(absorbProgress, [0, 0.5], [1, 0], { extrapolateRight: 'clamp' });


    // HEAD ANIMATION
    // Impact bounce when file hits
    const impactBounce = spring({
        frame: frame - hitFrame,
        fps,
        config: { stiffness: 300, damping: 10 }
    });
    const headScale = interpolate(impactBounce, [0, 0.2, 1], [1, 1.3, 1]); // Bulge out then back

    // Expressions
    const isAbsorbing = frame > hitFrame && frame < 50;
    const isHappy = frame > 50;

    const currentExpression = isHappy
        ? 'happy-sigh'
        : isAbsorbing
            ? 'glowing' // Brief shock state
            : 'neutral'; // Waiting for file

    // GLOW EFFECT
    const glowOpacity = interpolate(frame, [hitFrame, hitFrame + 10], [0, 1], { extrapolateRight: 'clamp' });

    // "SIGH" EFFECT (Vertical gentle movement + Scale breath)
    const sighY = isHappy ? Math.sin((frame - 50) * 0.1) * 10 : 0;

    return (
        <AbsoluteFill style={{ backgroundColor: '#FFFFFF' }}>

            {/* Robot Head */}
            <div style={{
                position: 'absolute',
                left: '50%',
                top: '50%',
                transform: `translate(-50%, -50%) scale(${headScale}) translateY(${sighY}px)`,
                zIndex: 5
            }}>
                <RobotHead scale={3} expression={currentExpression} />

                {/* Glow Ring (Active during absorb/happy) */}
                <div style={{
                    position: 'absolute',
                    top: -20,
                    left: -20,
                    right: -20,
                    bottom: -20,
                    border: '4px solid #3B82F6',
                    borderRadius: 30,
                    opacity: glowOpacity,
                    filter: 'blur(8px)',
                    transform: `scale(${interpolate(frame, [hitFrame, hitFrame + 20], [0.8, 1.2])})`,
                }} />
            </div>

            {/* Skill File (On top, zIndex higher than head until it 'enters') */}
            <div style={{
                position: 'absolute',
                left: skillX,
                top: skillY,
                transform: `translate(-50%, -50%) scale(${skillScale})`,
                zIndex: 10,
                opacity: skillOpacity
            }}>
                <SkillFile scale={1.5} opacity={1} />
            </div>

            {/* Text Overlay */}
            <div style={{
                position: 'absolute',
                top: 200,
                width: '100%',
                textAlign: 'center',
                fontFamily: 'Inter, sans-serif',
                fontWeight: 800,
                fontSize: 64,
                color: '#111827',
                opacity: interpolate(frame, [50, 70], [0, 1]), // Fade in after happy sigh roughly
            }}>
                PRINCIPLES LOADED
            </div>

        </AbsoluteFill>
    );
};
