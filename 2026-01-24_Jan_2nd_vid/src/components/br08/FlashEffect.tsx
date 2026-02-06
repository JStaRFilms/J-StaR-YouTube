import { AbsoluteFill } from 'remotion';
import React from 'react';

export const FlashEffect: React.FC<{
    opacity: number;
}> = ({ opacity }) => {
    return (
        <AbsoluteFill
            style={{
                backgroundColor: 'white',
                opacity,
                mixBlendMode: 'screen', // Additive blending for "light" feel
                zIndex: 100, // Top of everything
            }}
        />
    );
};
