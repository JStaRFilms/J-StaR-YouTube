import React from 'react';
import { AbsoluteFill } from 'remotion';

export const GridBackground: React.FC<{ backgroundColor?: string; gridColor?: string }> = ({
  backgroundColor = '#FAFAFA',
  gridColor = '#E5E7EB',
}) => {
  return (
    <AbsoluteFill style={{ backgroundColor }}>
      <div
        style={{
          width: '100%',
          height: '100%',
          backgroundImage: `
            linear-gradient(to right, ${gridColor} 2px, transparent 2px),
            linear-gradient(to bottom, ${gridColor} 2px, transparent 2px)
          `,
          backgroundSize: '100px 100px',
        }}
      />
    </AbsoluteFill>
  );
};
