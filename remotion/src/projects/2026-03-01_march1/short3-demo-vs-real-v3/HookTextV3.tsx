import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';

export const HookTextV3: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // "TICKING TIME BOMB" hits the screen word by word
  const words = ["TICKING", "TIME", "BOMB"];
  
  // Hard camera shake when "BOMB" lands (delay: 16 frames)
  const bombDelay = 16;
  let shakeY = 0;
  let shakeX = 0;
  if (frame >= bombDelay && frame < bombDelay + 10) {
    const intensity = 1 - (frame - bombDelay) / 10;
    shakeY = (Math.random() - 0.5) * 60 * intensity;
    shakeX = (Math.random() - 0.5) * 40 * intensity;
  }
  
  return (
    <div
      style={{
        position: 'absolute',
        top: 250,
        left: 0,
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 20,
        transform: `translate(${shakeX}px, ${shakeY}px)`,
      }}
    >
      {words.map((word, index) => {
        const delay = index * 8; // Snap in fast
        const scale = spring({
          frame: frame - delay,
          fps,
          config: { damping: 12, stiffness: 220, mass: 1.2 }, // Very punchy, slight overshoot
        });
        
        const translateY = interpolate(scale, [0, 1], [150, 0]);
        const rotate = interpolate(scale, [0, 1], [-10 + (index * 5), 0]);
        const opacity = interpolate(frame - delay, [0, 2], [0, 1], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
        });

        return (
          <h1
            key={word}
            style={{
              fontSize: 160,
              fontWeight: 900,
              fontFamily: 'Inter, sans-serif',
              margin: 0,
              color: index === 2 ? '#EF4444' : '#0F172A', // "BOMB" is piercing red
              transform: `translateY(${translateY}px) scale(${scale}) rotate(${rotate}deg)`,
              opacity,
              lineHeight: 1,
              textTransform: 'uppercase',
              letterSpacing: '-6px',
              textShadow: index === 2 ? '0px 25px 60px rgba(239, 68, 68, 0.5)' : 'none'
            }}
          >
            {word}
          </h1>
        );
      })}
    </div>
  );
};
