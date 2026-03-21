import React from 'react';
import { AbsoluteFill } from 'remotion';
import { ScenesV3 } from './ScenesV3';

export const Short3DemoVsRealV3: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: '#FAFAFA' }}>
      <ScenesV3 />
    </AbsoluteFill>
  );
};
