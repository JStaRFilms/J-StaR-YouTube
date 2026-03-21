import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';

export const PulseProgressBarV3: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Enter nicely at frame 0 (local)
  const scaleEntrance = spring({
    frame,
    fps,
    config: { damping: 14, stiffness: 120 }
  });
  
  const scaleIn = interpolate(scaleEntrance, [0, 1], [0.8, 1]);
  const opacityIn = interpolate(scaleEntrance, [0, 1], [0, 1]);

  // Progress from 0 to 90%
  const progressEndFrame = 105;
  const progress = interpolate(frame, [15, progressEndFrame], [0, 90], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  // The critical stop is when frame >= progressEndFrame
  const isBroken = frame >= progressEndFrame;

  // Violent shake after it breaks
  let shakeX = 0;
  let shakeY = 0;
  if (isBroken) {
     shakeX = (Math.random() - 0.5) * 30; // heavy jitter
     shakeY = (Math.random() - 0.5) * 20;
  }
  
  // Flash red background for 3 frames when breaking
  const justBroken = isBroken && frame < progressEndFrame + 4;
  const bg = justBroken ? '#FECACA' : '#FFFFFF';

  // The "10%" marker trembling and pulsing
  const pulseScale = isBroken ? 1 + (Math.random() * 0.3) : 1;

  // Color changes from Cyan to Piercing Red instantly at break
  const barColor = isBroken ? '#DC2626' : '#0EA5E9';
  const trackColor = isBroken ? '#FCA5A5' : '#E0F2FE';
  
  // Glitch the main headline on break
  const glitchTextOffsetX = isBroken ? (Math.random() - 0.5) * 10 : 0;
  
  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 40,
        backgroundColor: bg,
        transform: `scale(${scaleIn}) translate(${shakeX}px, ${shakeY}px)`,
        opacity: opacityIn,
      }}
    >
      <div style={{ position: 'relative' }}>
          <h1 style={{ 
            fontFamily: 'Inter, sans-serif', 
            fontSize: 100, 
            fontWeight: 900, 
            margin: 0, 
            color: isBroken ? '#DC2626' : '#0F172A',
            letterSpacing: '-2px',
            transform: `translateX(${glitchTextOffsetX}px)`,
            textShadow: isBroken ? '0px 10px 40px rgba(220, 38, 38, 0.4)' : 'none'
          }}>
            {isBroken ? 'CRITICAL FAILURE' : 'INITIAL PROGRESS'}
          </h1>
          {isBroken && (
            <h1 style={{ 
                fontFamily: 'Inter, sans-serif', 
                fontSize: 100, 
                fontWeight: 900, 
                margin: 0, 
                color: '#EF4444',
                letterSpacing: '-2px',
                position: 'absolute',
                top: 0,
                left: glitchTextOffsetX - 8,
                mixBlendMode: 'multiply',
                opacity: 0.7
              }}>
                CRITICAL FAILURE
              </h1>
          )}
      </div>

      {/* Progress Track */}
      <div style={{ width: 800, height: 80, backgroundColor: trackColor, borderRadius: 40, overflow: 'hidden', border: isBroken ? '4px solid #DC2626' : '4px solid #bae6fd', boxShadow: isBroken ? '0 0 50px rgba(220, 38, 38, 0.6)' : 'none' }}>
        {/* Progress Fill */}
        <div style={{ width: `${progress}%`, height: '100%', backgroundColor: barColor }} />
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', width: 800 }}>
        <h2 style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 60, color: barColor, margin: 0, fontWeight: 800 }}>
          {Math.floor(progress)}%
        </h2>

        {/* The 10% marker that pulses */}
        <h2 
          style={{ 
            fontFamily: 'Inter, sans-serif', 
            fontSize: 60, 
            color: '#DC2626', 
            margin: 0, 
            fontWeight: 900,
            opacity: isBroken ? 1 : 0.2,
            transform: `scale(${pulseScale})`,
            transformOrigin: 'right center',
            textShadow: isBroken ? '0 0 20px rgba(239, 68, 68, 0.8)' : 'none'
          }}
        >
          THE LAST 10%
        </h2>
      </div>
    </div>
  );
};
