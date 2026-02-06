import React from 'react';
import { AbsoluteFill } from 'remotion';
import { AnimatedClock } from './components/AnimatedClock';
import { ProgressBar } from './components/ProgressBar';

const LIGHT_BG_COLOR = '#F8FAFC';

export const Scene2_ClockProgress: React.FC = () => {
    return (
        <AbsoluteFill
            style={{
                backgroundColor: LIGHT_BG_COLOR,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '48px',
            }}
        >
            {/* Animated Clock */}
            <AnimatedClock />

            {/* Progress Bar */}
            <ProgressBar />
        </AbsoluteFill>
    );
};
