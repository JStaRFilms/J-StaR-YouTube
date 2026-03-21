import React from 'react';
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import { colors, MainText } from './shared';

export const Scene1Trap: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const textIn = spring({ frame, fps, config: { damping: 200 } });
  const slam = spring({
    frame: frame - 75,
    fps,
    config: { damping: 15, stiffness: 80, mass: 2 },
  });

  return (
    <AbsoluteFill
      style={{ justifyContent: 'center', alignItems: 'center', padding: 80 }}
    >
      <MainText
        style={{
          transform: `scale(${interpolate(textIn, [0, 1], [0.9, 1])})`,
          opacity: textIn,
        }}
      >
        Most people think they need{' '}
        <span style={{ color: colors.accentBlue }}>more AI skills.</span>
      </MainText>

      {frame >= 75 ? (
        <div
          style={{
            position: 'absolute',
            transform: `scale(${interpolate(slam, [0, 1], [3, 1])}) rotate(-5deg)`,
            opacity: interpolate(slam, [0, 0.5], [0, 1], {
              extrapolateRight: 'clamp',
            }),
            fontSize: 140,
            fontWeight: 900,
            color: colors.accentRed,
            textTransform: 'uppercase',
            border: `12px solid ${colors.accentRed}`,
            padding: '20px 60px',
            borderRadius: 20,
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
          }}
        >
          They don't.
        </div>
      ) : null}
    </AbsoluteFill>
  );
};
