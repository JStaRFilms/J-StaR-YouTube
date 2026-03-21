import React from 'react';
import { interpolate, useCurrentFrame, useVideoConfig } from 'remotion';

export const AbstractMeshBackgroundV3: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();

  // Subtle breathing effect
  const scale = interpolate(frame, [0, 8 * fps], [1, 1.1], {
    extrapolateRight: 'clamp',
  });
  
  const rotation = interpolate(frame, [0, 8 * fps], [0, 5], {
    extrapolateRight: 'clamp',
  });

  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        backgroundColor: '#FAFAFA',
        overflow: 'hidden',
        width,
        height,
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: '-20%',
          left: '-20%',
          width: '140%',
          height: '140%',
          transform: `scale(${scale}) rotate(${rotation}deg)`,
          background: 'radial-gradient(circle at 15% 50%, #f0f9ff 0%, transparent 50%), radial-gradient(circle at 85% 30%, #e0f2fe 0%, transparent 50%)',
          opacity: 0.8,
        }}
      />
    </div>
  );
};
