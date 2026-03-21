import React from 'react';
import { AbsoluteFill, spring, useCurrentFrame, useVideoConfig, interpolate } from 'remotion';

export const Scene1Hook: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Part 1: "MORE AI SKILLS" (0-120 frames)
  const text1Scale = spring({
    frame,
    fps,
    config: { stiffness: 300, damping: 10 },
  });
  
  // Vibration effect (like it's unstable)
  const vibrationX = Math.sin(frame * 0.5) * 5;
  const vibrationY = Math.cos(frame * 0.7) * 5;

  // Part 2: "THEY DON'T" + Red X (120-180 frames)
  const text2In = spring({
    frame: frame - 120, // 2.0s mark
    fps,
    config: { stiffness: 400, damping: 12 },
  });
  
  const slashProgress = interpolate(frame, [130, 140], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill style={{ backgroundColor: '#FFFFFF', justifyContent: 'center', alignItems: 'center' }}>
      
      {/* BASE TEXT */}
      <h1 style={{
        fontFamily: 'Inter, sans-serif',
        fontWeight: 900,
        fontSize: '150px',
        color: '#0F172A',
        textAlign: 'center',
        margin: 0,
        lineHeight: 1,
        transform: `scale(${text1Scale}) translate(${vibrationX}px, ${vibrationY}px)`,
        textTransform: 'uppercase',
      }}>
        More AI<br />Skills
      </h1>

      {/* INTERRUPTION TEXT & CROSSOUT */}
      {frame >= 120 && (
        <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(255, 255, 255, 0.9)' }}>
          <h1 style={{
            fontFamily: 'Inter, sans-serif',
            fontWeight: 900,
            fontSize: '180px',
            color: '#DC2626',
            textAlign: 'center',
            margin: 0,
            transform: `scale(${text2In})`,
            textTransform: 'uppercase',
            zIndex: 2,
          }}>
            THEY DON'T.
          </h1>

          {/* Massive Red Slashing X over the text */}
          <svg
            width="800"
            height="400"
            viewBox="0 0 800 400"
            style={{
              position: 'absolute',
              zIndex: 3,
            }}
          >
            {/* Line 1 (Top Left to Bottom Right) */}
            <line
              x1="100" y1="100" x2="700" y2="300"
              stroke="#DC2626"
              strokeWidth="40"
              strokeLinecap="round"
              strokeDasharray={800}
              strokeDashoffset={interpolate(slashProgress, [0, 0.5], [800, 0], { extrapolateRight: 'clamp' })}
            />
            {/* Line 2 (Bottom Left to Top Right) */}
            <line
              x1="100" y1="300" x2="700" y2="100"
              stroke="#DC2626"
              strokeWidth="40"
              strokeLinecap="round"
              strokeDasharray={800}
              strokeDashoffset={interpolate(slashProgress, [0.5, 1], [800, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })}
            />
          </svg>
        </AbsoluteFill>
      )}

    </AbsoluteFill>
  );
};
