import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { AlertTriangle } from 'lucide-react';

export const ErrorModalCascadeV3: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const modals = [
    { title: 'Unhandled Promise Rejection', msg: 'Timed out waiting for connection to database cluster.', top: 300, left: 140, baseRotation: -6 },
    { title: 'Fatal Crash', msg: 'Memory limit exceeded. Container killed.', top: 480, left: 240, baseRotation: 8 },
    { title: 'Security Alert', msg: 'Multiple failed authentication attempts detected.', top: 660, left: 100, baseRotation: -12 },
    { title: 'API Error', msg: '502 Bad Gateway: Upstream server disconnected.', top: 840, left: 200, baseRotation: 15 },
    { title: 'System Failure', msg: 'All redundancy checks have failed.', top: 1020, left: 140, baseRotation: -4 },
  ];

  return (
    <div style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0 }}>
      {modals.map((modal, index) => {
        // Stagger entrances rapidly
        const delay = index * 10;
        const entrance = spring({
          frame: frame - delay,
          fps,
          config: { damping: 10, stiffness: 200, mass: 1 }, // Hard slam
        });

        // Modals slam in from the screen (scale 2.0 -> 1.0)
        const scale = interpolate(entrance, [0, 1], [2, 1]);
        const opacity = interpolate(entrance, [0, 1], [0, 1]);
        const rotation = interpolate(entrance, [0, 1], [modal.baseRotation * 3, modal.baseRotation]);
        
        // Trembling shake once landed
        let shakeX = 0;
        let shakeY = 0;
        if (frame > delay + 15) {
          shakeX = (Math.random() - 0.5) * 6;
          shakeY = (Math.random() - 0.5) * 6;
        }

        return (
          <div
            key={index}
            style={{
              position: 'absolute',
              top: modal.top,
              left: modal.left,
              width: 700,
              backgroundColor: '#FFFFFF',
              borderRadius: 24,
              boxShadow: '0 40px 80px -15px rgba(239, 68, 68, 0.6)', // deep red shadow
              border: '3px solid #FEF2F2',
              transform: `scale(${scale}) rotate(${rotation}deg) translate(${shakeX}px, ${shakeY}px)`,
              opacity,
              display: 'flex',
              flexDirection: 'column',
              zIndex: 10 + index,
              overflow: 'hidden',
            }}
          >
            {/* Red Header */}
            <div style={{ backgroundColor: '#EF4444', padding: '16px 24px', display: 'flex', alignItems: 'center', gap: 12 }}>
              <AlertTriangle color="white" size={28} />
              <h2 style={{ margin: 0, color: 'white', fontFamily: 'Inter, sans-serif', fontSize: 24, fontWeight: 800, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {modal.title}
              </h2>
            </div>
            
            {/* Body */}
            <div style={{ padding: '24px', backgroundColor: '#FAFAFA' }}>
              <p style={{ margin: 0, color: '#0F172A', fontFamily: 'Inter, sans-serif', fontSize: 22, fontWeight: 600, lineHeight: 1.4 }}>
                {modal.msg}
              </p>
              
              <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 28 }}>
                <div style={{ backgroundColor: '#FEE2E2', color: '#B91C1C', padding: '12px 24px', borderRadius: 12, fontSize: 18, fontWeight: 800, fontFamily: 'Inter, sans-serif', border: '2px solid #FECACA' }}>
                  Force Quit
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
