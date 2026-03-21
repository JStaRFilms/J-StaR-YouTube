import React from 'react';
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import { colors, MainText } from './shared';

export const Scene5Build: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const drawProgress = interpolate(frame, [10, 90], [0, 1], {
    extrapolateRight: 'clamp',
    extrapolateLeft: 'clamp',
  });
  const nodeGlow = spring({ frame: frame - 100, fps, config: { damping: 200 } });

  return (
    <AbsoluteFill
      style={{ justifyContent: 'center', alignItems: 'center', padding: 80 }}
    >
      <MainText style={{ position: 'absolute', top: 120 }}>
        Building a <span style={{ color: colors.accentGreen }}>real workflow.</span>
      </MainText>

      <div style={{ position: 'relative', width: 600, height: 600, marginTop: 100 }}>
        <div
          style={{
            position: 'absolute',
            top: 300,
            left: 0,
            width: `${drawProgress * 100}%`,
            height: 8,
            backgroundColor: colors.border,
            borderRadius: 4,
          }}
        />
        <div
          style={{
            position: 'absolute',
            left: 300,
            top: 0,
            height: `${drawProgress * 100}%`,
            width: 8,
            backgroundColor: colors.border,
            borderRadius: 4,
          }}
        />

        <div
          style={{
            position: 'absolute',
            top: 300,
            left: 300,
            marginTop: -60,
            marginLeft: -60,
            width: 120,
            height: 120,
            backgroundColor: colors.surface,
            borderRadius: '50%',
            border: `8px solid ${colors.accentGreen}`,
            transform: `scale(${interpolate(drawProgress, [0.9, 1], [0, 1], {
              extrapolateLeft: 'clamp',
            })})`,
            boxShadow: `0 0 ${interpolate(nodeGlow, [0, 1], [0, 80])}px ${colors.accentGreen}`,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <svg width="54" height="54" viewBox="0 0 54 54" fill="none">
            <circle
              cx="27"
              cy="27"
              r="20"
              stroke={colors.accentGreen}
              strokeWidth="4"
            />
            <circle
              cx="27"
              cy="27"
              r="8"
              fill={colors.accentGreen}
              opacity="0.3"
            />
          </svg>
        </div>
      </div>
    </AbsoluteFill>
  );
};
