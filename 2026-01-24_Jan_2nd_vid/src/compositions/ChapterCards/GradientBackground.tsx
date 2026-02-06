import React from 'react';
import { AbsoluteFill } from 'remotion';

interface GradientBackgroundProps {
    gradientStart: string;
    gradientEnd: string;
}

export const GradientBackground: React.FC<GradientBackgroundProps> = ({
    gradientStart,
    gradientEnd,
}) => {
    return (
        <AbsoluteFill
            style={{
                background: `linear-gradient(135deg, ${gradientStart} 0%, ${gradientEnd} 100%)`,
            }}
        />
    );
};
