import React from 'react';
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import { colors, MainText } from './shared';

export const Scene3Collapse: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const isFalling = frame > 90;

  return (
    <AbsoluteFill
      style={{ justifyContent: 'center', alignItems: 'center', padding: 80 }}
    >
      <MainText style={{ marginBottom: 150 }}>
        {frame < 90 ? 'Sometimes it looks good...' : 'Until it falls apart.'}
      </MainText>

      <div style={{ position: 'relative', width: 400, height: 400 }}>
        {[0, 1, 2, 3].map((i) => {
          const fallProgress = spring({
            frame: isFalling ? frame - 90 - i * 5 : 0,
            fps,
            config: { damping: 200 },
          });
          const fallY = interpolate(fallProgress, [0, 1], [0, 1500]);
          const rot = interpolate(
            fallProgress,
            [0, 1],
            [0, (i % 2 === 0 ? 1 : -1) * 90]
          );

          return (
            <div
              key={i}
              style={{
                position: 'absolute',
                bottom: i * 80,
                left: '50%',
                marginLeft: -150,
                width: 300,
                height: 70,
                backgroundColor: isFalling
                  ? colors.accentRed
                  : colors.surface,
                border: `2px solid ${
                  isFalling ? colors.accentRed : colors.accentBlue
                }`,
                borderRadius: 12,
                transform: `translateY(${fallY}px) rotate(${rot}deg)`,
              }}
            />
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
