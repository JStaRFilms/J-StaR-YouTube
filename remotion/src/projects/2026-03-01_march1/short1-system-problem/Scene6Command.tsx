import React from 'react';
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import { colors, MainText } from './shared';

export const Scene6Command: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const pop = spring({
    frame: frame - 15,
    fps,
    config: { damping: 20, stiffness: 200 },
  });

  const textChars = '> npx vibesuite init'.split('');
  const typeIndex = Math.floor(
    interpolate(frame, [45, 75], [0, textChars.length], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    })
  );
  const visibleText = textChars.slice(0, typeIndex).join('');
  const successPop = spring({ frame: frame - 90, fps, config: { damping: 12 } });

  return (
    <AbsoluteFill
      style={{ justifyContent: 'center', alignItems: 'center', padding: 80 }}
    >
      <MainText style={{ position: 'absolute', top: 120 }}>
        Now I run <span style={{ color: colors.accentBlue }}>one command.</span>
      </MainText>

      <div
        style={{
          width: 800,
          backgroundColor: colors.surface,
          borderRadius: 24,
          overflow: 'hidden',
          boxShadow: '0 40px 100px rgba(0,0,0,0.1)',
          border: `2px solid ${colors.border}`,
          transform: `scale(${pop}) translateY(${interpolate(pop, [0, 1], [100, 0])}px)`,
        }}
      >
        <div
          style={{
            height: 60,
            backgroundColor: '#F1F5F9',
            borderBottom: `2px solid ${colors.border}`,
            display: 'flex',
            alignItems: 'center',
            padding: '0 24px',
            gap: 12,
          }}
        >
          <div style={{ width: 18, height: 18, borderRadius: '50%', backgroundColor: colors.accentRed }} />
          <div style={{ width: 18, height: 18, borderRadius: '50%', backgroundColor: '#F59E0B' }} />
          <div style={{ width: 18, height: 18, borderRadius: '50%', backgroundColor: colors.accentGreen }} />
        </div>

        <div
          style={{
            padding: 60,
            fontSize: 60,
            fontFamily: 'monospace',
            color: colors.text,
            minHeight: 400,
          }}
        >
          {visibleText}
          <span style={{ opacity: frame % 15 < 7 ? 1 : 0 }}>_</span>

          <div
            style={{
              marginTop: 80,
              display: 'flex',
              alignItems: 'center',
              gap: 20,
              transform: `scale(${successPop})`,
              transformOrigin: 'left center',
              color: colors.accentGreen,
              fontWeight: 800,
              fontSize: 40,
            }}
          >
            <div
              style={{
                width: 28,
                height: 28,
                borderRadius: '50%',
                backgroundColor: colors.accentGreen,
              }}
            />
            AI Context Loaded.
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
