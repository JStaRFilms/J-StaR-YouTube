import React from 'react';
import { AbsoluteFill, spring, useCurrentFrame, useVideoConfig, interpolate, Easing } from 'remotion';

export const Scene3Collapse: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // The chaotic pile carried over conceptually, but unified initially
  const stackGlow = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: 'clamp' });
  
  // Production Text Anvil
  const anvilFall = spring({
    frame: frame - 60, // Hits at 1s mark
    fps,
    config: { stiffness: 600, damping: 18 },
  });

  // The big collapse! Hits production and explodes.
  const shatterProgress = frame >= 65 
    ? interpolate(frame - 65, [0, 60], [0, 2000], { easing: Easing.in(Easing.exp) }) 
    : 0;

  return (
    <AbsoluteFill style={{ backgroundColor: '#F8FAFC', justifyContent: 'center', alignItems: 'center' }}>
      
      {/* Pretend unified pile (Starts looking fine) */}
      <div 
        style={{
          width: 500,
          height: 500,
          backgroundColor: '#FFFFFF',
          border: '4px solid #DFDFDF',
          borderRadius: 40,
          boxShadow: `0 0 ${stackGlow * 100}px rgba(5, 150, 105, 0.4)`,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'absolute',
          transform: frame >= 65 ? `translateY(${shatterProgress}px) rotate(${shatterProgress * 0.1}deg)` : 'none'
        }}
      >
        <span style={{ fontSize: '100px', fontWeight: 'bold' }}>📦</span>
        <h2 style={{ fontFamily: 'Inter', fontSize: '30px', color: '#059669', opacity: stackGlow }}>
          "LOOKS FINE"
        </h2>
      </div>

      {frame >= 60 && (
        <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center', zIndex: 10 }}>
          <h1 style={{
            fontFamily: 'Inter, sans-serif',
            fontWeight: 900,
            fontSize: '140px',
            color: '#DC2626',
            backgroundColor: '#FFFFFF',
            padding: '20px 40px',
            border: '8px solid #DC2626',
            transform: `scale(${anvilFall}) ${frame >= 70 ? `translateY(${interpolate(frame - 70, [0, 30], [0, 50])}px)` : 'none'}`,
            textAlign: 'center',
            textTransform: 'uppercase',
            boxShadow: '0 40px 60px rgba(220, 38, 38, 0.3)'
          }}>
            PRODUCTION
          </h1>
        </AbsoluteFill>
      )}

      {/* Particle Shatter effect (simulate breaking parts) */}
      {frame >= 65 && [1,2,3,4,5].map(i => (
        <div key={i} style={{
          position: 'absolute',
          width: 100,
          height: 100,
          backgroundColor: '#DC2626',
          borderRadius: 20,
          zIndex: 5,
          transform: `
            translate(
              ${interpolate(frame - 65, [0, 40], [0, (i%2===0?1:-1) * (i*200)])}px, 
              ${shatterProgress * (1 + (i*0.2))}px
            ) 
            rotate(${frame * i * 5}deg)
          `
        }} />
      ))}

    </AbsoluteFill>
  );
};
