import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';
import { colors, MainText } from './shared';

export const Scene7Results: React.FC = () => {
  const frame = useCurrentFrame();
  const widthDraw = interpolate(frame, [20, 80], [0, 100], {
    extrapolateRight: 'clamp',
    extrapolateLeft: 'clamp',
  });

  return (
    <AbsoluteFill
      style={{ justifyContent: 'center', alignItems: 'center', padding: 80 }}
    >
      <div
        style={{
          width: 800,
          height: 500,
          borderLeft: `6px solid ${colors.text}`,
          borderBottom: `6px solid ${colors.text}`,
          position: 'relative',
        }}
      >
        <div
          style={{
            position: 'absolute',
            left: 0,
            bottom: 0,
            height: '100%',
            width: `${widthDraw}%`,
            overflow: 'hidden',
          }}
        >
          <svg style={{ width: 800, height: 500 }} viewBox="0 0 800 500">
            <path
              d="M 0 500 Q 200 400 300 300 T 600 150 Q 700 50 800 50"
              fill="none"
              stroke={colors.accentGreen}
              strokeWidth="16"
              strokeLinecap="round"
            />
            <path
              d="M 0 500 Q 200 400 300 300 T 600 150 Q 700 50 800 50 L 800 500 Z"
              fill={colors.accentGreen}
              opacity="0.1"
            />
          </svg>
        </div>
      </div>

      <MainText style={{ marginTop: 80 }}>
        Better results, <span style={{ color: colors.accentGreen }}>every time.</span>
      </MainText>
    </AbsoluteFill>
  );
};
