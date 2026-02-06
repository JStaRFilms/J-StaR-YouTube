import React from 'react';
import { AbsoluteFill } from 'remotion';
import { SliderWipe } from './components/SliderWipe';

const LIGHT_BG_COLOR = '#F8FAFC';

export const Scene4_SliderWipe: React.FC = () => {
    return (
        <AbsoluteFill
            style={{
                backgroundColor: LIGHT_BG_COLOR,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <SliderWipe />
        </AbsoluteFill>
    );
};
