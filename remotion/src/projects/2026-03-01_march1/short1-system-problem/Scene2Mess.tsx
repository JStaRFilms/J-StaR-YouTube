import React from 'react';
import {
  AbsoluteFill,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import { colors, MainText } from './shared';

const chaosItems = [
  'code.js',
  'prompt_V9.txt',
  'random_tool',
  'plugin.zip',
  'workflow_final.xml',
];

export const Scene2Mess: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill
      style={{ justifyContent: 'center', alignItems: 'center', padding: 80 }}
    >
      <div style={{ position: 'relative', width: '100%', height: '100%' }}>
        {chaosItems.map((item, i) => {
          const delay = i * 15;
          const pop = spring({
            frame: frame - delay,
            fps,
            config: { damping: 12 },
          });
          const x = (i % 2 === 0 ? 1 : -1) * (i * 80);
          const y = (i - 2) * 120;
          const rot = (i * 15) % 45;

          return (
            <div
              key={item}
              style={{
                position: 'absolute',
                left: '50%',
                top: '50%',
                marginLeft: -150 + x,
                marginTop: -50 + y,
                width: 300,
                padding: 20,
                backgroundColor: colors.surface,
                borderRadius: 16,
                border: `2px solid ${colors.border}`,
                boxShadow: '0 20px 40px rgba(0,0,0,0.05)',
                transform: `scale(${pop}) rotate(${rot}deg)`,
                fontSize: 32,
                fontWeight: 700,
                color: colors.textMuted,
                textAlign: 'center',
              }}
            >
              {item}
            </div>
          );
        })}
      </div>
      <AbsoluteFill
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          pointerEvents: 'none',
        }}
      >
        <MainText
          style={{
            backgroundColor: 'rgba(248, 250, 252, 0.9)',
            padding: '40px 80px',
            borderRadius: 40,
            boxShadow: '0 30px 60px rgba(0,0,0,0.05)',
          }}
        >
          They download{' '}
          <span style={{ color: colors.accentRed }}>random stuff</span>
          <br />
          and hope it works.
        </MainText>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
