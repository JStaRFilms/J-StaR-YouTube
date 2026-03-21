import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate } from 'remotion';

export const GridBackgroundV2: React.FC<{ backgroundColor?: string; gridColor?: string }> = ({
  backgroundColor = '#FAFAFA',
  gridColor = '#E5E7EB',
}) => {
  const frame = useCurrentFrame();

  // Scroll the grid slowly to maintain constant motion (Pattern interrupt / dopamine)
  const bgY = (frame * 1.5) % 100;
  const bgX = (frame * 0.8) % 100;

  return (
    <AbsoluteFill style={{ backgroundColor }}>
      <div
        style={{
          width: '200%',
          height: '200%',
          position: 'absolute',
          top: -100,
          left: -100,
          transform: `translate(${bgX}px, ${bgY}px)`,
          backgroundImage: `
            linear-gradient(to right, ${gridColor} 2px, transparent 2px),
            linear-gradient(to bottom, ${gridColor} 2px, transparent 2px)
          `,
          backgroundSize: '100px 100px',
        }}
      />
      {/* Dynamic light gradient sweep */}
      <div
         style={{
           width: '100%',
           height: '100%',
           position: 'absolute',
           background: `linear-gradient(${frame}deg, rgba(6,182,212,0.03) 0%, transparent 50%, rgba(16,185,129,0.03) 100%)`
         }}
      />
    </AbsoluteFill>
  );
};
