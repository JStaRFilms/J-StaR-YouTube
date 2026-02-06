import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import React from 'react';
import { LightWindow } from '../ui/LightWindow';

const TrashCanOpen = ({ openAmount = 0 }) => (
    <svg width="200" height="240" viewBox="0 0 24 24" fill="none" stroke="#111827" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        {/* Lid - Rotates based on openAmount */}
        <g transform={`rotate(${openAmount * -45}, 12, 6)`}>
            <path d="M3 6h18" />
            <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
        </g>

        {/* Body */}
        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
        <line x1="10" y1="11" x2="10" y2="17" />
        <line x1="14" y1="11" x2="14" y2="17" />
    </svg>
);

export const Scene2_Problem: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    // Text Typing Animation
    const textToType = "use #3B82F6";
    const typeSpeed = 3;
    const charsShown = Math.min(textToType.length, Math.floor(frame / typeSpeed));
    const currentText = textToType.substring(0, charsShown);

    // Animation: Hex Code flies to trash
    // Flies starts after typing (approx frame 40)
    const flyStart = 40;
    const flyProgress = spring({
        frame: frame - flyStart,
        fps,
        config: { damping: 15 },
    });

    // X Position: Left side -> Right side
    const hexX = interpolate(flyProgress, [0, 1], [0, 500]);
    // Y Position: Center -> Into Trash
    const hexY = interpolate(flyProgress, [0, 1], [0, 100]);
    // Scale: Normal -> Shrink into trash
    const hexScale = interpolate(flyProgress, [0.8, 1], [1, 0]);
    // Rotate: 0 -> Tumble
    const hexRotate = interpolate(flyProgress, [0, 1], [0, 360]);

    // Trash Can Open
    // Opens as hex approaches
    const trashOpen = interpolate(frame, [flyStart, flyStart + 10, flyStart + 30], [0, 1, 0], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp'
    });

    // Source Text Visibility
    // Hex code should vanish from prompt when it flies away
    const sourceHexOpacity = frame > flyStart ? 0 : 1;

    // Window Reaction (Shake when text gets ripped out)
    const windowShake = frame > flyStart && frame < flyStart + 10
        ? Math.sin((frame - flyStart) * 1.5) * 5
        : 0;

    return (
        <AbsoluteFill style={{ backgroundColor: '#FFFFFF', flexDirection: 'row' }}>

            {/* Left Side: Prompt Editor */}
            <div style={{
                flex: 1,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                borderRight: '1px solid #E5E7EB',
                backgroundColor: '#F9FAFB'
            }}>
                <div style={{ width: 400, height: 300, transform: `translateX(${windowShake}px)` }}>
                    <LightWindow title="Prompt">
                        <div style={{
                            padding: 24,
                            fontFamily: 'Inter, sans-serif',
                            fontSize: 32,
                            color: '#111827',
                            fontWeight: 500
                        }}>
                            <span style={{ color: '#9CA3AF' }}>User: </span>
                            {/* Static part */}
                            <span>use </span>
                            {/* Vanishing part (if typed) */}
                            {currentText.length > 4 && (
                                <span style={{ opacity: sourceHexOpacity }}>
                                    {currentText.substring(4)}
                                </span>
                            )}
                        </div>
                    </LightWindow>
                </div>
            </div>

            {/* Right Side: Trash */}
            <div style={{
                flex: 1,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#FFFFFF'
            }}>
                <TrashCanOpen openAmount={trashOpen} />
            </div>

            {/* The Flying Object */}
            {frame > flyStart && (
                <div style={{
                    position: 'absolute',
                    left: '25%', // Start at visual center of left panel roughly
                    top: '50%',
                    fontFamily: 'JetBrains Mono, monospace',
                    fontWeight: 500,
                    fontSize: 32,
                    color: '#3B82F6',
                    backgroundColor: '#EFF6FF',
                    padding: '4px 8px',
                    borderRadius: 4,
                    transform: `translate(${hexX}px, ${hexY}px) rotate(${hexRotate}deg) scale(${hexScale})`,
                    zIndex: 20
                }}>
                    #3B82F6
                </div>
            )}

        </AbsoluteFill>
    );
};
