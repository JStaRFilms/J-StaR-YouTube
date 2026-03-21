import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from 'remotion';

export const Scene5Ignition: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Grid drawing animation (Stroke dashoffset)
  const drawProgress = interpolate(frame, [20, 80], [1000, 0], {
    extrapolateRight: 'clamp',
    extrapolateLeft: 'clamp',
  });

  // Node ignition
  const ignitionScale = spring({
    frame: frame - 60,
    fps,
    config: { stiffness: 120, damping: 12 },
  });

  const ignitionGlow = interpolate(frame, [60, 90], [0, 1], { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' });

  return (
    <AbsoluteFill style={{ backgroundColor: '#F8FAFC', justifyContent: 'center', alignItems: 'center' }}>
      
      {/* Symmetrical Grid */}
      <svg width="1000" height="1000" viewBox="0 0 1000 1000" style={{ position: 'absolute' }}>
        <g stroke="#E5E7EB" strokeWidth="8" fill="none">
          {/* Vertical Lines */}
          <line x1="250" y1="0" x2="250" y2="1000" strokeDasharray="1000" strokeDashoffset={drawProgress} />
          <line x1="500" y1="0" x2="500" y2="1000" strokeDasharray="1000" strokeDashoffset={drawProgress} />
          <line x1="750" y1="0" x2="750" y2="1000" strokeDasharray="1000" strokeDashoffset={drawProgress} />
          
          {/* Horizontal Lines */}
          <line x1="0" y1="250" x2="1000" y2="250" strokeDasharray="1000" strokeDashoffset={drawProgress} />
          <line x1="0" y1="500" x2="1000" y2="500" strokeDasharray="1000" strokeDashoffset={drawProgress} />
          <line x1="0" y1="750" x2="1000" y2="750" strokeDasharray="1000" strokeDashoffset={drawProgress} />
          
          {/* Connection Lines from Center */}
          <line x1="500" y1="500" x2="250" y2="250" stroke="#3B82F6" strokeWidth="12" strokeDasharray="500" strokeDashoffset={interpolate(frame, [90, 120], [500, 0], { extrapolateRight: 'clamp' })} />
          <line x1="500" y1="500" x2="750" y2="250" stroke="#3B82F6" strokeWidth="12" strokeDasharray="500" strokeDashoffset={interpolate(frame, [90, 120], [500, 0], { extrapolateRight: 'clamp' })} />
          <line x1="500" y1="500" x2="250" y2="750" stroke="#3B82F6" strokeWidth="12" strokeDasharray="500" strokeDashoffset={interpolate(frame, [90, 120], [500, 0], { extrapolateRight: 'clamp' })} />
          <line x1="500" y1="500" x2="750" y2="750" stroke="#3B82F6" strokeWidth="12" strokeDasharray="500" strokeDashoffset={interpolate(frame, [90, 120], [500, 0], { extrapolateRight: 'clamp' })} />
        </g>
      </svg>

      {/* Center Ignition Node */}
      {frame >= 60 && (
        <div style={{
          width: 150,
          height: 150,
          backgroundColor: '#3B82F6',
          borderRadius: 40,
          boxShadow: `0 0 ${ignitionGlow * 150}px rgba(59, 130, 246, 0.8)`,
          transform: `scale(${ignitionScale}) rotate(45deg)`,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 10,
        }}>
          <div style={{
            width: 80,
            height: 80,
            backgroundColor: '#FFFFFF',
            borderRadius: 20,
            opacity: ignitionGlow,
          }} />
        </div>
      )}

      {/* Sleek Subtitle */}
      {frame >= 120 && (
        <h1 style={{
          position: 'absolute',
          bottom: 200,
          fontFamily: 'Inter',
          fontWeight: 900,
          fontSize: '90px',
          color: '#0F172A',
          backgroundColor: '#FFFFFF',
          padding: '20px 60px',
          border: '6px solid #E5E7EB',
          boxShadow: '0 20px 40px rgba(0,0,0,0.05)',
          transform: `translateY(${interpolate(frame, [120, 140], [100, 0], { extrapolateRight: 'clamp' })}px)`,
          opacity: interpolate(frame, [120, 140], [0, 1], { extrapolateRight: 'clamp' })
        }}>
          UNIFIED SYSTEM
        </h1>
      )}

    </AbsoluteFill>
  );
};
