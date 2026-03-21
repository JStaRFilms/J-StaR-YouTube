import React from 'react';
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';

export const Scene8Cta: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const arrowPulse = interpolate(Math.sin(frame * 0.2), [-1, 1], [0, 50]);
  const textIn = spring({ frame, fps, config: { damping: 200 } });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#3B82F6',
        color: '#FFF',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 80,
      }}
    >
      <div
        style={{
          fontSize: 120,
          fontWeight: 900,
          lineHeight: 1.1,
          textAlign: 'center',
          letterSpacing: '-3px',
          transform: `translateY(${interpolate(textIn, [0, 1], [100, 0])}px)`,
          opacity: textIn,
        }}
      >
        Watch the Full Breakdown
      </div>

      <div style={{ marginTop: 180, transform: `translateY(${arrowPulse}px)` }}>
        <svg width="140" height="140" viewBox="0 0 140 140" fill="none">
          <path
            d="M70 18V104"
            stroke="#FFFFFF"
            strokeWidth="12"
            strokeLinecap="round"
          />
          <path
            d="M36 78L70 114L104 78"
            stroke="#FFFFFF"
            strokeWidth="12"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </AbsoluteFill>
  );
};
