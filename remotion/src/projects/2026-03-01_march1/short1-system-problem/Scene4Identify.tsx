import React from 'react';
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import { colors, MainText } from './shared';

export const Scene4Identify: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const slideIn = spring({ frame, fps, config: { damping: 200 } });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: colors.surface,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 80,
      }}
    >
      <MainText
        style={{
          transform: `translateY(${interpolate(slideIn, [0, 1], [100, 0])}px)`,
          opacity: slideIn,
        }}
      >
        I know because I used to do the same thing.
      </MainText>
    </AbsoluteFill>
  );
};
