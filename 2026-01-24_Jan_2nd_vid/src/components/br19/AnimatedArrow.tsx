import React from 'react';
import { interpolate, useCurrentFrame } from 'remotion';

interface AnimatedArrowProps {
    progress: number;
}

export const AnimatedArrow: React.FC<AnimatedArrowProps> = ({ progress }) => {
    // Arrow path definition
    // Straight line appearing
    const strokeDashoffset = interpolate(progress, [0, 1], [300, 0], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
    });

    return (
        <svg viewBox="0 0 300 100" style={{ width: 400, height: 133, overflow: 'visible' }}>
            <defs>
                <linearGradient id="arrowGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#f59e0b" stopOpacity="1" />
                </linearGradient>
                <filter id="glow">
                    <feGaussianBlur stdDeviation="2.5" result="coloredBlur" />
                    <feMerge>
                        <feMergeNode in="coloredBlur" />
                        <feMergeNode in="SourceGraphic" />
                    </feMerge>
                </filter>
            </defs>

            {/* Main Path */}
            <path
                d="M20,50 L260,50 M240,30 L260,50 L240,70"
                stroke="url(#arrowGradient)"
                strokeWidth="6"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeDasharray="300"
                strokeDashoffset={strokeDashoffset}
                filter="url(#glow)"
                style={{
                    // Move it slightly to center visually
                    transform: 'translateX(10px)'
                }}
            />
        </svg>
    );
};
