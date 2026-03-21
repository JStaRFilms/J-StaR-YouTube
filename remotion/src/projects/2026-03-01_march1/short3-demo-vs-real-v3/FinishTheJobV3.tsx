import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { ArrowDown } from 'lucide-react';

export const FinishTheJobV3: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Entrance 1: "FINISH THE JOB"
  const textEntrance = spring({
    frame,
    fps,
    config: { damping: 15, stiffness: 180 }, // Punchy reveal
  });

  const textScale = interpolate(textEntrance, [0, 1], [0.8, 1]);
  const textOpacity = interpolate(textEntrance, [0, 1], [0, 1]);

  // Highlighter sweep (animates slightly after the text lands)
  const highlighterSweep = interpolate(frame, [10, 25], [0, 105], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Entrance 2: Arrow bounces down
  const arrowEntrance = spring({
    frame: frame - 45, // Wait 1.5 seconds before arrow drops
    fps,
    config: { damping: 12, stiffness: 150 },
  });

  const arrowTranslateY = interpolate(arrowEntrance, [0, 1], [-100, 0]);
  const arrowOpacity = interpolate(arrowEntrance, [0, 1], [0, 1]);
  
  // Continuous Arrow Bounce after entrance
  const bounce = frame > 45 ? Math.sin(frame * 0.2) * 15 : 0;

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
        gap: 60,
        backgroundColor: '#FAFAFA', // Clean white background again
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <h1
          style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: 110,
            fontWeight: 900,
            color: '#0F172A',
            margin: 0,
            transform: `scale(${textScale})`,
            opacity: textOpacity,
            letterSpacing: '-2px',
            textTransform: 'uppercase',
            textAlign: 'center',
            lineHeight: 1.1,
            position: 'relative'
          }}
        >
          FINISH<br />
          <div style={{ position: 'relative', display: 'inline-block' }}>
            <span style={{ color: '#0EA5E9', position: 'relative', zIndex: 1 }}>THE JOB</span>
            <div 
              style={{
                position: 'absolute',
                bottom: 8,
                left: '-2%',
                width: `${highlighterSweep}%`,
                height: 35,
                backgroundColor: '#bae6fd',
                zIndex: 0,
              }}
            />
          </div>
        </h1>
        
        <p
          style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: 40,
            fontWeight: 600,
            color: '#64748B',
            marginTop: 30,
            opacity: interpolate(textEntrance, [0, 1], [0, 1]), // Slightly delayed visually by the bounce
            transform: `translateY(${interpolate(textEntrance, [0, 1], [20, 0])}px)`,
          }}
        >
          Watch the full breakdown
        </p>
      </div>

      <div
        style={{
          width: 120,
          height: 120,
          backgroundColor: '#0EA5E9',
          borderRadius: 60,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 20px 40px rgba(14, 165, 233, 0.4)',
          transform: `translateY(${arrowTranslateY + bounce}px)`,
          opacity: arrowOpacity,
          marginTop: 60,
        }}
      >
        <ArrowDown size={60} color="white" strokeWidth={3} />
      </div>
    </div>
  );
};
