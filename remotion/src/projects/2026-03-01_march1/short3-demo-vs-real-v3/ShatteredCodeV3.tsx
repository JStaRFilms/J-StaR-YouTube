import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';

export const ShatteredCodeV3: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Entrance
  const entrance = spring({
    frame: frame - 15, // Enters slightly after the glitch starts
    fps,
    config: { damping: 14, stiffness: 150 }, // Bouncier to feel abrupt
  });

  const translateY = interpolate(entrance, [0, 1], [-200, 0]);
  const scale = interpolate(entrance, [0, 1], [0.8, 1]);
  const opacity = interpolate(entrance, [0, 1], [0, 1]);

  // Code turning red (at frame 45)
  const breakStart = 45;
  const isBroken = frame > breakStart;
  
  // Erratic shake when breaking
  let shakeX = 0;
  let shakeY = 0;
  if (isBroken && frame < breakStart + 20) {
    shakeX = (Math.random() - 0.5) * 20;
    shakeY = (Math.random() - 0.5) * 20;
  }
  
  // Flash of red background on the whole container when it just broke
  const isJustBroken = isBroken && frame < breakStart + 3;

  const lines = [
    { text: 'import { authenticateUser } from "@/lib/auth";', safe: true },
    { text: 'function handleRequest(req, res) {', safe: true },
    { text: '  const user = authenticateUser(req.token);', breakable: true, error: 'TypeError: undefined is not a function' },
    { text: '  const data = db.execute(`SELECT * FROM users WHERE id = ${req.body.id}`);', breakable: true, error: 'SecurityRisk: Unsanitized SQL injection detected' },
    { text: '  if (user.role === "admin") {', breakable: true, error: 'Uncaught Exception: Cannot read property "role" of null' },
    { text: '    return res.status(200).send(data);', safe: true },
    { text: '  }', safe: true },
    { text: '}', safe: true }
  ];

  return (
    <div
      style={{
        position: 'absolute',
        top: 250,
        left: 80,
        right: 80,
        backgroundColor: isJustBroken ? '#451a1a' : '#0F172A',
        borderRadius: 20,
        padding: 40,
        boxShadow: isBroken ? '0 25px 50px -12px rgba(239, 68, 68, 0.8)' : '0 10px 30px rgba(0, 0, 0, 0.2)',
        transform: `translate(${shakeX}px, ${translateY + shakeY}px) scale(${scale})`,
        opacity,
        border: isBroken ? '4px solid #EF4444' : '4px solid #334155',
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
        fontFamily: 'JetBrains Mono, monospace',
        fontSize: 22,
      }}
    >
      {/* Title bar */}
      <div style={{ display: 'flex', gap: 10, marginBottom: 20 }}>
        <div style={{ width: 16, height: 16, borderRadius: 8, backgroundColor: '#EF4444' }} />
        <div style={{ width: 16, height: 16, borderRadius: 8, backgroundColor: '#EAB308' }} />
        <div style={{ width: 16, height: 16, borderRadius: 8, backgroundColor: '#22C55E' }} />
      </div>

      {lines.map((line, i) => {
        const lineBroken = isBroken && line.breakable;
        const color = lineBroken ? '#FCA5A5' : (line.safe ? '#94A3B8' : '#38BDF8');
        const bgColor = lineBroken ? 'rgba(239, 68, 68, 0.2)' : 'transparent';
        const textDecoration = lineBroken ? 'line-through' : 'none';

        // Add a slight glitch offset to the red bad lines
        const glitchLineX = lineBroken ? (Math.random() - 0.5) * 4 : 0;

        return (
          <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: 5, transform: `translateX(${glitchLineX}px)` }}>
            <div style={{ display: 'flex', alignItems: 'center', backgroundColor: bgColor, padding: '4px 8px', borderRadius: 4 }}>
              <span style={{ color: '#475569', width: 40, userSelect: 'none' }}>{i + 1}</span>
              <span style={{ color, textDecoration }}>
                {line.text}
              </span>
            </div>
            {lineBroken && (
              <div style={{ color: '#EF4444', backgroundColor: 'rgba(239, 68, 68, 0.1)', padding: '8px 16px', borderRadius: 8, marginTop: 4, borderLeft: '4px solid #EF4444', fontWeight: 600 }}>
                {line.error}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
