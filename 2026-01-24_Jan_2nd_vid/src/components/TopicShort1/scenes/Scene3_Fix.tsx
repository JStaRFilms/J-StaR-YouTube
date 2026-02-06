import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import React from 'react';
import { LightWindow } from '../ui/LightWindow';
import { Cursor } from '../ui/Cursor';

const TrashCan = ({ scale = 1 }) => (
    <svg width={100 * scale} height={120 * scale} viewBox="0 0 24 24" fill="none" stroke="#111827" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="3 6 5 6 21 6" />
        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
        <line x1="10" y1="11" x2="10" y2="17" />
        <line x1="14" y1="11" x2="14" y2="17" />
    </svg>
);

const RobotHead = ({ scale = 1 }) => (
    <svg width={200 * scale} height={200 * scale} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="2" y="3" width="20" height="18" rx="4" fill="#F3F4F6" stroke="#111827" strokeWidth="2" />
        <path d="M8 10C8 10 9 12 12 12C15 12 16 10 16 10" stroke="#111827" strokeWidth="2" strokeLinecap="round" />
        <circle cx="7" cy="7" r="1.5" fill="#3B82F6" />
        <circle cx="17" cy="7" r="1.5" fill="#3B82F6" />
        <rect x="6" y="15" width="12" height="3" rx="1.5" fill="#111827" />
    </svg>
);

const SkillFile = ({ scale = 1 }) => (
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
            backgroundColor: '#22C55E',
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

export const Scene3_Fix: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    // Animation Phase 1: Trash the Slop (0-90 frames)
    // Slop card falls in, Trash can eats it.

    const slopY = spring({
        frame: frame - 10,
        fps,
        config: { damping: 15, mass: 2 }, // Heavy fall
    });
    const slopTop = interpolate(slopY, [0, 1], [-300, 600]);
    const slopRotate = interpolate(slopY, [0, 1], [-10, 45]);
    const slopScale = interpolate(frame, [40, 60], [1, 0], { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' }); // Disappear into trash

    // Trash Can Bounce when hit
    const trashBounce = spring({
        frame: frame - 40,
        fps,
        config: { damping: 12, stiffness: 200 },
    });
    const trashScale = interpolate(trashBounce, [0, 0.5, 1], [1, 1.2, 1]);

    // Animation Phase 2: Inject Skill (90 - 210 frames)
    const phase2Start = 90;

    // Robot slide up
    const robotY = spring({
        frame: frame - phase2Start,
        fps,
        config: { damping: 20 },
    });
    const robotTop = interpolate(robotY, [0, 1], [1200, 600]);

    // Skill File entry and insertion
    const skillProgress = spring({
        frame: frame - (phase2Start + 30),
        fps,
        config: { damping: 20 },
    });
    // Moves from top right into robot head center
    const skillX = interpolate(skillProgress, [0, 1], [800, 540]); // Assuming 1080 width, center is 540
    const skillY = interpolate(skillProgress, [0, 1], [-200, 650]);
    const skillScale = interpolate(skillProgress, [0, 0.8, 1], [1, 1, 0]); // Shrink into head

    // Robot "Activation" glow
    const robotGlow = interpolate(frame, [phase2Start + 50, phase2Start + 70], [0, 1], { extrapolateRight: 'clamp' });

    return (
        <AbsoluteFill style={{ backgroundColor: '#FFFFFF' }}>

            {/* Phase 1: Trash */}
            <div style={{
                position: 'absolute',
                left: '50%',
                top: '50%',
                transform: `translate(-50%, 200px) scale(${trashScale})`,
                opacity: interpolate(frame, [80, 90], [1, 0]),
            }}>
                <TrashCan scale={3} />
            </div>

            {/* Slop Card */}
            <div style={{
                position: 'absolute',
                left: '50%',
                top: slopTop,
                transform: `translate(-50%, 0) rotate(${slopRotate}deg) scale(${slopScale})`,
                opacity: interpolate(frame, [80, 90], [1, 0]),
            }}>
                <div style={{
                    width: 300,
                    height: 200,
                    backgroundColor: '#F3F4F6',
                    border: '1px dashed #9CA3AF',
                    borderRadius: 8,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    color: '#9CA3AF',
                    fontFamily: 'Inter, sans-serif',
                }}>
                    Bad AI Design
                </div>
            </div>

            {/* Phase 2: Robot */}
            <div style={{
                position: 'absolute',
                left: '50%',
                top: robotTop,
                transform: 'translate(-50%, -50%)',
            }}>
                <RobotHead scale={3} />
                {/* Glow Ring */}
                <div style={{
                    position: 'absolute',
                    top: -20,
                    left: -20,
                    right: -20,
                    bottom: -20,
                    border: '4px solid #3B82F6',
                    borderRadius: 30, // Matches rect radius roughly scaled
                    opacity: robotGlow,
                    filter: 'blur(8px)',
                }} />
            </div>

            {/* Skill File */}
            <div style={{
                position: 'absolute',
                left: skillX,
                top: skillY,
                transform: `translate(-50%, -50%) scale(${skillScale})`,
            }}>
                <SkillFile scale={1.5} />
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
                opacity: interpolate(frame, [phase2Start, phase2Start + 20], [0, 1]),
            }}>
                GIVE IT SKILLS.
            </div>

        </AbsoluteFill>
    );
};
