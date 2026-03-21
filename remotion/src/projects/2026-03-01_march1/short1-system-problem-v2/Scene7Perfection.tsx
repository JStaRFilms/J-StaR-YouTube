import React from 'react';
import { AbsoluteFill, useCurrentFrame, spring, useVideoConfig } from 'remotion';

export const Scene7Perfection: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const zeroScale = spring({
    frame: frame - 10,
    fps,
    config: { stiffness: 500, damping: 15 },
  });

  const exactScale = spring({
    frame: frame - 60, // 1s
    fps,
    config: { stiffness: 500, damping: 15 },
  });

  // Cascading Checkmarks
  const checks = [0, 1, 2, 3, 4, 5];

  return (
    <AbsoluteFill style={{ backgroundColor: '#F8FAFC', justifyContent: 'center', alignItems: 'center', display: 'flex', flexDirection: 'column' }}>
      
      {/* "ZERO SETUP" in Brutal Ink */}
      <h1 style={{
        fontFamily: 'Inter',
        fontWeight: 900,
        fontSize: '140px',
        color: '#0F172A',
        margin: 0,
        textTransform: 'uppercase',
        transform: `scale(${zeroScale})`,
        lineHeight: 1,
      }}>
        ZERO SETUP.
      </h1>

      {/* "PERFECT CONTEXT" in Emerald */}
      <h1 style={{
        fontFamily: 'Inter',
        fontWeight: 900,
        fontSize: '120px',
        color: '#10B981',
        margin: 0,
        textTransform: 'uppercase',
        transform: `scale(${exactScale})`,
        lineHeight: 1,
        marginTop: 20,
      }}>
        PERFECT CONTEXT.
      </h1>

      {/* Cascading Emerald Checkmarks */}
      <div style={{ display: 'flex', marginTop: 60, gap: '40px' }}>
        {checks.map(i => {
          const checkScale = spring({
            frame: frame - (80 + i * 10), // Staggered
            fps,
            config: { stiffness: 400, damping: 12 }
          });

          return (
            <div key={i} style={{ transform: `scale(${checkScale})` }}>
              <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            </div>
          )
        })}
      </div>

    </AbsoluteFill>
  );
};
