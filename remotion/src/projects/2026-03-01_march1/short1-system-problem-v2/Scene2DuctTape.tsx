import React from 'react';
import { AbsoluteFill, spring, useCurrentFrame, useVideoConfig } from 'remotion';

export const Scene2DuctTape: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Fake cards representing "random stuff" / UI components getting downloaded
  const cards = [
    { text: '{ JSON }', color: '#FCD34D', rot: -10, startOffset: 10 },
    { text: 'app.py', color: '#60A5FA', rot: 15, startOffset: 30 },
    { text: '<svg />', color: '#F472B6', rot: -5, startOffset: 50 },
    { text: '.env', color: '#A78BFA', rot: 25, startOffset: 65 },
    { text: 'script.js', color: '#34D399', rot: -20, startOffset: 80 },
  ];

  // Duct tape slapping down over the chaotic pile
  const tapeSlam = spring({
    frame: frame - 100,
    fps,
    config: { stiffness: 500, damping: 15 },
  });

  return (
    <AbsoluteFill style={{ backgroundColor: '#F8FAFC', justifyContent: 'center', alignItems: 'center' }}>
      
      {cards.map((card, i) => {
        const fallScale = spring({
          frame: frame - card.startOffset,
          fps,
          config: { stiffness: 200, damping: 12 },
        });

        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              width: 400,
              height: 250,
              backgroundColor: '#FFFFFF',
              boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
              borderRadius: 24,
              border: `4px solid ${card.color}`,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              transform: `scale(${fallScale}) rotate(${card.rot}deg) translateY(${Math.sin((frame - card.startOffset)*0.1)*5}px)`,
            }}
          >
            <span style={{ fontSize: '60px', fontFamily: 'monospace', fontWeight: 'bold', color: '#0F172A' }}>
              {card.text}
            </span>
          </div>
        );
      })}

      {frame >= 100 && (
        <svg
          width="800"
          height="800"
          viewBox="0 0 800 800"
          style={{
            position: 'absolute',
            zIndex: 10,
            transform: `scale(${tapeSlam + (tapeSlam === 0 ? 5 : 0)})`, // starts huge, slams down
          }}
        >
          {/* Duct Tape Strip 1 */}
          <rect
            x="150" y="350" width="500" height="80"
            fill="#9CA3AF"
            opacity="0.95"
            transform="rotate(-5, 400, 400)"
            style={{ filter: 'drop-shadow(0 10px 10px rgba(0,0,0,0.2))' }}
          />
          {/* Duct Tape Strip 2 */}
          <rect
            x="200" y="420" width="400" height="80"
            fill="#D1D5DB"
            opacity="0.9"
            transform="rotate(8, 400, 400)"
            style={{ filter: 'drop-shadow(0 10px 10px rgba(0,0,0,0.15))' }}
          />
        </svg>
      )}

    </AbsoluteFill>
  );
};
