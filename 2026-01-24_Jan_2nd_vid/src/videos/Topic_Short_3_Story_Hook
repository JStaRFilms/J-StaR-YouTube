import React from 'react';
import { useCurrentFrame, useVideoConfig, spring, interpolate } from 'remotion';
import { PenTool } from 'lucide-react';

// Light mode colors
const COLORS = {
    background: '#F8FAFC',
    surface: '#FFFFFF',
    textPrimary: '#1E293B',
    accentPurple: '#8B5CF6',
    accentBlue: '#3B82F6',
};

export const BrainWithPenTool: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    // Brain entrance animation
    const brainSpring = spring({
        frame,
        fps,
        config: { damping: 15, stiffness: 100 },
    });
    const brainScale = interpolate(brainSpring, [0, 1], [0, 1]);
    const brainRotation = interpolate(frame, [0, 30], [-10, 0], {
        extrapolateRight: 'clamp',
    });

    // Pen tool draw animation
    const penSpring = spring({
        frame: frame - 20,
        fps,
        config: { damping: 12, stiffness: 120 },
    });
    const penOpacity = interpolate(frame, [20, 35], [0, 1], { extrapolateRight: 'clamp' });
    const penScale = interpolate(penSpring, [0, 1], [0.5, 1]);

    // Pulse effect
    const pulseFrame = frame % 60;
    const pulseScale = interpolate(pulseFrame, [0, 30, 60], [1, 1.05, 1], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
    });

    return (
        <div
            style={{
                width: '280px',
                height: '280px',
                position: 'relative',
                transform: `scale(${brainScale * pulseScale}) rotate(${brainRotation}deg)`,
            }}
        >
            {/* Brain SVG Outline */}
            <svg
                width="280"
                height="280"
                viewBox="0 0 280 280"
                fill="none"
                style={{
                    filter: `drop-shadow(0 0 20px ${COLORS.accentPurple}40)`,
                }}
            >
                {/* Brain shape - stylized outline */}
                <path
                    d="M140 40C100 40 60 70 60 120C60 160 80 200 120 220C130 225 140 230 140 230C140 230 150 225 160 220C200 200 220 160 220 120C220 70 180 40 140 40Z"
                    stroke={COLORS.accentPurple}
                    strokeWidth="4"
                    fill={`${COLORS.accentPurple}15`}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                {/* Brain left hemisphere lines */}
                <path
                    d="M100 80C90 90 85 110 90 130"
                    stroke={COLORS.accentPurple}
                    strokeWidth="3"
                    fill="none"
                    strokeLinecap="round"
                />
                <path
                    d="M80 120C85 140 100 160 120 170"
                    stroke={COLORS.accentPurple}
                    strokeWidth="3"
                    fill="none"
                    strokeLinecap="round"
                />
                {/* Brain right hemisphere lines */}
                <path
                    d="M180 80C190 90 195 110 190 130"
                    stroke={COLORS.accentPurple}
                    strokeWidth="3"
                    fill="none"
                    strokeLinecap="round"
                />
                <path
                    d="M200 120C195 140 180 160 160 170"
                    stroke={COLORS.accentPurple}
                    strokeWidth="3"
                    fill="none"
                    strokeLinecap="round"
                />
                {/* Center line */}
                <path
                    d="M140 50L140 210"
                    stroke={COLORS.accentPurple}
                    strokeWidth="3"
                    fill="none"
                    strokeLinecap="round"
                />
            </svg>

            {/* Pen Tool Icon - Centered in brain */}
            <div
                style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: `translate(-50%, -50%) scale(${penScale})`,
                    opacity: penOpacity,
                    backgroundColor: COLORS.surface,
                    borderRadius: '50%',
                    padding: '16px',
                    boxShadow: `0 4px 20px ${COLORS.accentPurple}30`,
                }}
            >
                <PenTool size={48} color={COLORS.accentPurple} strokeWidth={2} />
            </div>

            {/* Sparkle decorations */}
            <div
                style={{
                    position: 'absolute',
                    top: '20%',
                    right: '10%',
                    width: '8px',
                    height: '8px',
                    backgroundColor: COLORS.accentBlue,
                    borderRadius: '50%',
                    opacity: interpolate(frame, [30, 45], [0, 1], { extrapolateRight: 'clamp' }),
                }}
            />
            <div
                style={{
                    position: 'absolute',
                    bottom: '25%',
                    left: '15%',
                    width: '6px',
                    height: '6px',
                    backgroundColor: COLORS.accentPurple,
                    borderRadius: '50%',
                    opacity: interpolate(frame, [35, 50], [0, 1], { extrapolateRight: 'clamp' }),
                }}
            />
        </div>
    );
};
