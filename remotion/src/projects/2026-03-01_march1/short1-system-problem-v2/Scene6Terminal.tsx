import React from 'react';
import { AbsoluteFill, useCurrentFrame, spring, useVideoConfig } from 'remotion';

export const Scene6Terminal: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Terminal expands in
  const termScale = spring({
    frame: frame - 20,
    fps,
    config: { stiffness: 300, damping: 18 },
  });

  // Typewriter effect logic
  const textStr = " system --analyze";
  const typeLength = Math.min(
    Math.max(0, Math.floor((frame - 60) / 3)), 
    textStr.length
  );
  
  // The moment "enter" is hit
  const explosionFrame = frame >= 120;
  
  // Fake file structure popping out
  const nodes = [
    { x: -300, y: -400, delay: 125, name: 'src/' },
    { x: 300, y: -300, delay: 130, name: 'public/' },
    { x: -400, y: -100, delay: 135, name: 'components/' },
    { x: 350, y: 150, delay: 140, name: 'utils.ts' },
    { x: -200, y: 350, delay: 145, name: 'schema.prisma' },
    { x: 200, y: -500, delay: 150, name: 'package.json' },
  ];

  return (
    <AbsoluteFill style={{ backgroundColor: '#FFFFFF', justifyContent: 'center', alignItems: 'center' }}>
      
      {/* Network Nodes Exploding Outward */}
      {nodes.map((n, i) => {
        const nodeScale = spring({
          frame: frame - n.delay,
          fps,
          config: { stiffness: 150, damping: 12 }
        });
        
        return (
          <div key={i} style={{
            position: 'absolute',
            transform: `translate(${n.x}px, ${n.y}px) scale(${nodeScale})`,
            backgroundColor: '#F3F4F6',
            border: '4px solid #E5E7EB',
            padding: '20px 40px',
            borderRadius: 20,
            display: 'flex',
            alignItems: 'center',
            boxShadow: '0 20px 40px rgba(0,0,0,0.05)',
            zIndex: 1
          }}>
            <span style={{ fontSize: '40px', fontFamily: 'monospace', fontWeight: 600, color: '#3B82F6' }}>
              {n.name}
            </span>
          </div>
        )
      })}

      {/* Terminal Window (MacOS Light) */}
      {frame >= 20 && (
        <div style={{
          width: 800,
          height: 300,
          backgroundColor: '#FFFFFF',
          border: '2px solid #E5E7EB',
          borderRadius: 20,
          overflow: 'hidden',
          boxShadow: '0 40px 80px rgba(0,0,0,0.15)',
          transform: `scale(${explosionFrame ? 0.8 : termScale})`,
          transition: 'transform 0.3s ease-out', // Only using transition here for a soft scale-down post explosion, but mostly spring config
          zIndex: 10,
        }}>
          {/* Top Bar */}
          <div style={{ height: 50, backgroundColor: '#F9FAFB', borderBottom: '2px solid #E5E7EB', display: 'flex', alignItems: 'center', paddingLeft: 20 }}>
            <div style={{ width: 16, height: 16, backgroundColor: '#EF4444', borderRadius: 8, marginRight: 10 }} />
            <div style={{ width: 16, height: 16, backgroundColor: '#F59E0B', borderRadius: 8, marginRight: 10 }} />
            <div style={{ width: 16, height: 16, backgroundColor: '#10B981', borderRadius: 8 }} />
          </div>
          
          {/* Content */}
          <div style={{ padding: 40, fontFamily: 'monospace', fontSize: '50px', fontWeight: 700, color: '#0F172A' }}>
            <span style={{ color: '#10B981' }}>{'>'}</span> 
            {textStr.slice(0, typeLength)}
            {/* Cursor blink */}
            <span style={{ opacity: frame % 30 < 15 ? 1 : 0 }}>_</span>
          </div>
        </div>
      )}

    </AbsoluteFill>
  );
};
