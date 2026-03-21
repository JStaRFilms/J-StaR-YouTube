import React from 'react';
import { interpolate, useCurrentFrame } from 'remotion';

export const GlitchEffectV3: React.FC<{ children: React.ReactNode; active: boolean }> = ({ children, active }) => {
  const frame = useCurrentFrame();

  if (!active) {
    return <>{children}</>;
  }

  // Jitter effect using sine waves at different frequencies
  const jitterX = Math.sin(frame * 1.5) * 10;
  const jitterY = Math.cos(frame * 2.1) * 5;
  
  // Chromatic aberration separation
  const redOffset = Math.sin(frame * 3.4) * 8;
  const blueOffset = Math.cos(frame * 2.8) * -8;

  // Occasional opacity drops (simulate failing screen)
  const opacity = frame % 7 === 0 ? 0.8 : 1;

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      {/* Base Layer */}
      <div style={{ position: 'absolute', top: jitterY, left: jitterX, opacity }}>
        {children}
      </div>

      {/* Red Glitch Layer */}
      <div
        style={{
          position: 'absolute',
          top: jitterY,
          left: jitterX + redOffset,
          opacity: 0.5,
          mixBlendMode: 'multiply',
          filter: 'hue-rotate(90deg)', // Shifting colors
        }}
      >
        {children}
      </div>

      {/* Blue Glitch Layer */}
      <div
        style={{
          position: 'absolute',
          top: jitterY,
          left: jitterX + blueOffset,
          opacity: 0.5,
          mixBlendMode: 'screen',
        }}
      >
        {children}
      </div>
    </div>
  );
};
