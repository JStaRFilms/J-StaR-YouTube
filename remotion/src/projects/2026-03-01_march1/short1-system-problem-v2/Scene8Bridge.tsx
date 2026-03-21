import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from 'remotion';

export const Scene8Bridge: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // "EVERY. SINGLE. TIME." Pops in sequentially
  const times = ["EVERY", "SINGLE", "TIME."];
  const bgColors = ["#DC2626", "#3B82F6", "#10B981"]; // Red, Blue, Green slam

  const arrowPulse = interpolate(
    Math.sin(frame * 0.1),
    [-1, 1],
    [0, 60]
  );
  
  const textScale = spring({
    frame: frame - 90,
    fps,
    config: { stiffness: 200, damping: 15 },
  });

  return (
    <AbsoluteFill style={{ backgroundColor: '#FFFFFF', justifyContent: 'center', alignItems: 'center' }}>
      
      {/* Rapid sequence slams (0 to 60 frames) */}
      {frame < 90 && (
        <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: bgColors[Math.floor(frame / 30) % 3] }}>
          <h1 style={{
            fontFamily: 'Inter',
            fontWeight: 900,
            fontSize: '200px',
            color: '#FFFFFF',
            textTransform: 'uppercase',
            margin: 0,
            transform: `scale(${spring({ frame: frame % 30, fps, config: { stiffness: 600, damping: 10 } })})`
          }}>
            {times[Math.floor(frame / 30) % 3]}
          </h1>
        </AbsoluteFill>
      )}

      {/* The CTA (90 frames onward) */}
      {frame >= 90 && (
        <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: '#F8FAFC' }}>
          
          <h1 style={{
            fontFamily: 'Inter',
            fontWeight: 900,
            fontSize: '100px',
            color: '#0F172A',
            textAlign: 'center',
            maxWidth: '80%',
            transform: `scale(${textScale})`
          }}>
            GET THE FULL <span style={{ color: '#3B82F6' }}>BLUEPRINT</span>
          </h1>

          <div style={{
            marginTop: 100,
            transform: `translateY(${arrowPulse}px)`
          }}>
            <svg width="150" height="150" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <polyline points="19 12 12 19 5 12"></polyline>
            </svg>
          </div>
          
        </AbsoluteFill>
      )}

    </AbsoluteFill>
  );
};
