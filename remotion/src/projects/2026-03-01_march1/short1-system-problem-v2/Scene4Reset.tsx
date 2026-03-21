import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from 'remotion';

export const Scene4Reset: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Fast page tearing
  // Change page every 10 frames
  const pages = ["JAN", "FEB", "MAR", "APR", "MAY"];
  const currentPageIndex = Math.min(Math.floor(frame / 15), pages.length - 1);
  const currentTearFrame = frame % 15;

  const calendarScale = spring({
    frame,
    fps,
    config: { stiffness: 200, damping: 20 }
  });

  const pageTearY = interpolate(currentTearFrame, [5, 14], [0, 800], { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' });
  const pageTearRot = interpolate(currentTearFrame, [5, 14], [0, 45], { extrapolateRight: 'clamp' });
  const opacityFade = interpolate(currentTearFrame, [10, 14], [1, 0], { extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill style={{ backgroundColor: '#FFFFFF', justifyContent: 'center', alignItems: 'center' }}>
      
      {/* Clean Calendar Structure */}
      <div style={{
        position: 'relative',
        width: 300,
        height: 350,
        backgroundColor: '#FFFFFF',
        border: '12px solid #0F172A',
        borderRadius: 40,
        overflow: 'hidden',
        transform: `scale(${calendarScale})`,
        display: 'flex',
        flexDirection: 'column',
      }}>
        <div style={{ height: 80, backgroundColor: '#EF4444', borderBottom: '12px solid #0F172A' }} />
        <div style={{ flex: 1, position: 'relative' }}>
          
          {/* Next Page behind */}
          <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ fontFamily: 'Inter', fontSize: '80px', fontWeight: 900, color: '#9CA3AF' }}>
              {currentPageIndex < pages.length - 1 ? pages[currentPageIndex + 1] : "LOST"}
            </span>
          </div>

          {/* Current tearing page */}
          {currentPageIndex < pages.length && (
            <div style={{ 
              position: 'absolute', 
              inset: 0, 
              backgroundColor: '#FFFFFF',
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              transformOrigin: 'top left',
              transform: `translateY(${pageTearY}px) rotate(${pageTearRot}deg)`,
              opacity: opacityFade,
              boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
              borderBottom: '4px solid #DFDFDF'
            }}>
              <span style={{ fontFamily: 'Inter', fontSize: '80px', fontWeight: 900, color: '#0F172A' }}>
                {pages[currentPageIndex]}
              </span>
            </div>
          )}

        </div>
      </div>

      <h1 style={{
        fontFamily: 'Inter',
        fontWeight: 900,
        fontSize: '80px',
        color: '#DC2626',
        marginTop: 60,
        opacity: interpolate(frame, [30, 40], [0, 1], { extrapolateRight: 'clamp' })
      }}>
        LOST MONTHS.
      </h1>

    </AbsoluteFill>
  );
};
