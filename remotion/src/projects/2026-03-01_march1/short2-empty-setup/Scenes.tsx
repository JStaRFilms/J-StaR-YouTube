import React from 'react';
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig, Sequence } from 'remotion';
import { AiIconSvg, CheckBadgeSvg, EmptyFolderSvg, QuestionMarkSvg, RedStampSvg, SpinnerSvg } from './Icons';

// Reusable text style
const getTitleStyle = (fontSize: number): React.CSSProperties => ({
  fontFamily: 'Inter, sans-serif',
  fontWeight: 800,
  fontSize,
  color: '#111827',
  textAlign: 'center',
  margin: 0,
});

export const Scene1AiScapegoat: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const iconScale = spring({ frame, fps, config: { damping: 12, stiffness: 150 } });
  
  const textY = interpolate(spring({ frame: frame - 15, fps, config: { damping: 200 } }), [0, 1], [100, 0]);
  const textOpacity = interpolate(frame, [15, 30], [0, 1], { extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center' }}>
      <div style={{ transform: `scale(${iconScale})`, marginBottom: 80 }}>
        <AiIconSvg size={400} color="#06B6D4" />
      </div>
      <h1 style={{
        ...getTitleStyle(120),
        transform: `translateY(${textY}px)`,
        opacity: textOpacity,
      }}>
        <span style={{color: '#06B6D4'}}>AI</span> IS THE<br/>PROBLEM
      </h1>
    </AbsoluteFill>
  );
};

export const Scene2EmptyVoid: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Zoom out the AI icon from previous frame
  const iconScaleOut = interpolate(spring({ frame, fps, config: { damping: 200 } }), [0, 1], [1, 0.0]);
  const iconOpacityOut = interpolate(frame, [0, 15], [1, 0], { extrapolateRight: 'clamp' });

  // Draw the dashed folder
  const dashOffset = interpolate(frame, [10, 60], [60, 0], { extrapolateRight: 'clamp' });
  const folderOpacity = interpolate(frame, [10, 20], [0, 1], { extrapolateRight: 'clamp' });

  // Empty text scale
  const textScale = spring({ frame: frame - 30, fps, config: { damping: 15, stiffness: 200 } });

  return (
    <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center' }}>
      <div style={{ position: 'absolute', transform: `scale(${iconScaleOut})`, opacity: iconOpacityOut, top: '35%' }}>
        <AiIconSvg size={400} color="#06B6D4" />
      </div>

      <div style={{ position: 'absolute', opacity: folderOpacity, top: '30%' }}>
        <EmptyFolderSvg size={450} color="#9CA3AF" dashOffset={dashOffset} />
      </div>

      <div style={{ position: 'absolute', top: '70%', transform: `scale(${textScale})` }}>
        <h1 style={{ ...getTitleStyle(110) }}>
          EMPTY<br/>WORKSPACE
        </h1>
      </div>
    </AbsoluteFill>
  );
};

export const Scene3MissingPieces: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const cards = ['CONTEXT', 'STANDARDS', 'DESIGN', 'CHECKS'];

  return (
    <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center', padding: 40, gap: 40, flexDirection: 'row', flexWrap: 'wrap' }}>
      <div style={{...getTitleStyle(90), position:'absolute', top: 120, width: '100%'}}>
        NOTHING<br/>TO WORK FROM
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 60, justifyContent: 'center', marginTop: 150 }}>
        {cards.map((title, i) => {
          const startFrame = i * 20;
          const cardScale = spring({ frame: frame - startFrame, fps, config: { damping: 200 } });
          const stampScale = spring({ frame: frame - startFrame - 10, fps, config: { damping: 10, stiffness: 200 } });
          const opacity = interpolate(frame, [startFrame, startFrame + 1], [0, 1], { extrapolateRight: 'clamp' });
          
          return (
            <div key={title} style={{
              width: 350, height: 250, 
              backgroundColor: '#FFF', 
              boxShadow: '0 25px 50px -12px rgba(0,0,0,0.1)',
              borderRadius: 30,
              display: 'flex', justifyContent: 'center', alignItems: 'center',
              position: 'relative',
              transform: `scale(${cardScale})`,
              opacity,
              border: '2px solid #F3F4F6'
            }}>
              <h2 style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 36, color: '#4B5563', margin: 0 }}>
                {title}
              </h2>

              <div style={{ position: 'absolute', transform: `scale(${stampScale}) rotate(-15deg)` }}>
                <RedStampSvg size={200} />
              </div>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

export const Scene4TheGuesswork: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Spinner rotates
  const rotation = interpolate(frame, [0, 60], [0, 720]);
  
  // Transition from spinner to question mark
  const spinnerOpacity = interpolate(frame, [40, 50], [1, 0], { extrapolateRight: 'clamp' });
  const questionOpacity = interpolate(frame, [40, 50], [0, 1], { extrapolateRight: 'clamp' });
  const questionScale = spring({ frame: frame - 40, fps, config: { damping: 12, stiffness: 150 } });

  // Badge pop in
  const badgeScale = spring({ frame: frame - 100, fps, config: { damping: 15, stiffness: 200 } });

  return (
    <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center' }}>
      
      <div style={{ position: 'absolute', top: 150 }}>
        <h1 style={{ ...getTitleStyle(100) }}>
          SO IT HAS TO<br/>
          <span style={{color: '#06B6D4'}}>GUESS</span>
        </h1>
      </div>

      <div style={{ position: 'relative', width: 300, height: 300, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div style={{ position: 'absolute', opacity: spinnerOpacity }}>
          <SpinnerSvg size={250} rotation={rotation} />
        </div>
        <div style={{ position: 'absolute', opacity: questionOpacity, transform: `scale(${questionScale})` }}>
           <QuestionMarkSvg size={250} />
        </div>
      </div>

      <div style={{
          position: 'absolute', top: '70%',
          display: 'flex', alignItems: 'center', gap: 20,
          backgroundColor: '#ECFDF5', padding: '20px 40px',
          borderRadius: 100, transform: `scale(${badgeScale})`,
          border: '2px solid #10B981'
        }}>
          <CheckBadgeSvg size={60} />
          <h2 style={{ fontFamily: 'Inter, sans-serif', fontWeight: 800, fontSize: 50, color: '#065F46', margin: 0 }}>
            LOOKS FINE...
          </h2>
      </div>

    </AbsoluteFill>
  );
};

export const Scene5TheCollapse: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // The components fall down due to "gravity"
  const fallTrigger = 30;
  
  const shake = interpolate(frame, [0, fallTrigger], [0, 1], { extrapolateRight: 'clamp' });
  const shakeOffset = Math.sin(frame * 2) * 15 * shake;

  // After fallTrigger, gravity takes over
  const gravity = Math.pow(Math.max(0, frame - fallTrigger) / 10, 2) * 50;

  // The screen flash wipes it out
  const flashScale = interpolate(spring({ frame: frame - 120, fps, config: { damping: 200 } }), [0, 1], [0, 100]);

  const boxes = [
    { color: '#3B82F6', w: 400, h: 100, x: -200, y: -150, spinTarget: 45 },
    { color: '#10B981', w: 200, h: 200, x: 100, y: -100, spinTarget: -30 },
    { color: '#F59E0B', w: 300, h: 100, x: -50, y: 50, spinTarget: 15 },
    { color: '#8B5CF6', w: 250, h: 250, x: -150, y: 150, spinTarget: -60 },
    { color: '#EF4444', w: 350, h: 120, x: 50, y: 200, spinTarget: 80 },
  ];

  return (
    <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center', overflow: 'hidden' }}>
      
      <div style={{ position: 'absolute', top: 150, opacity: frame < fallTrigger ? 1 : 0 }}>
        <h1 style={{ ...getTitleStyle(100), color: '#EF4444' }}>
          AT FIRST
        </h1>
      </div>

      <div style={{ transform: frame < fallTrigger ? `translateX(${shakeOffset}px)` : undefined, width: '100%', height: '100%', position: 'absolute' }}>
        {boxes.map((b, i) => {
          // Individual fall speeds and rotations
          const individualGravity = gravity * (1 + (i * 0.2));
          const rotation = frame > fallTrigger ? interpolate(frame, [fallTrigger, fallTrigger + 60], [0, b.spinTarget], { extrapolateRight: 'clamp' }) : 0;
          
          return (
            <div key={i} style={{
              position: 'absolute',
              left: `calc(50% + ${b.x}px)`,
              top: `calc(50% + ${b.y}px)`,
              width: b.w,
              height: b.h,
              backgroundColor: b.color,
              borderRadius: 20,
              transform: `translate('-50%', '-50%') translateY(${individualGravity}px) rotate(${rotation}deg)`,
              boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)'
            }} />
          );
        })}
      </div>

      <div style={{
        position: 'absolute',
        width: 100, height: 100,
        backgroundColor: '#FAFAFA', // Matches Grid background
        borderRadius: '50%',
        transform: `scale(${flashScale})`,
        left: 'calc(50% - 50px)', top: 'calc(50% - 50px)'
      }} />

    </AbsoluteFill>
  );
};

export const Scene6TheSetup: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Blueprint framework slots in
  const strokeOffset = interpolate(frame, [0, 60], [1000, 0], { extrapolateRight: 'clamp' });

  // System blocks slot into the scaffold
  const systemBlocks = ['APP ARCHITECTURE', 'THE SYSTEM', 'RULES'];
  
  return (
    <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center' }}>
      <h1 style={{ ...getTitleStyle(90), position: 'absolute', top: 100 }}>
        GIVE IT A <span style={{color: '#06B6D4'}}>SYSTEM</span>
      </h1>

      {/* Blueprint Scaffold */}
      <svg width="800" height="600" style={{ position: 'absolute', top: 300 }}>
        <rect x="50" y="50" width="700" height="500" fill="none" stroke="#06B6D4" strokeWidth="8" strokeDasharray="1000" strokeDashoffset={strokeOffset} rx="20" />
        <line x1="50" y1="200" x2="750" y2="200" stroke="#06B6D4" strokeWidth="6" strokeDasharray="1000" strokeDashoffset={strokeOffset} />
        <line x1="400" y1="200" x2="400" y2="550" stroke="#06B6D4" strokeWidth="6" strokeDasharray="1000" strokeDashoffset={strokeOffset} />
      </svg>

      {/* Blocks slot in */}
      <div style={{ position: 'absolute', top: 300, width: 800, height: 600 }}>
        {systemBlocks.map((b, i) => {
          const startFrame = 60 + (i * 20);
          const blockScale = spring({ frame: frame - startFrame, fps, config: { damping: 200 } });
          const blockOpacity = interpolate(frame, [startFrame, startFrame + 1], [0, 1], { extrapolateRight: 'clamp' });

          let blockStyle: React.CSSProperties = { position: 'absolute', backgroundColor: '#06B6D4', borderRadius: 10, display: 'flex', justifyContent: 'center', alignItems: 'center' };
          
          if (i === 0) {
            blockStyle = { ...blockStyle, left: 60, top: 60, width: 680, height: 130 };
          } else if (i === 1) {
            blockStyle = { ...blockStyle, left: 60, top: 210, width: 330, height: 330 };
          } else {
            blockStyle = { ...blockStyle, left: 410, top: 210, width: 330, height: 330 };
          }

          return (
            <div key={b} style={{ ...blockStyle, transform: `scale(${blockScale})`, opacity: blockOpacity }}>
               <h2 style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 30, color: '#FFF', margin: 0 }}>
                {b}
              </h2>
            </div>
          );
        })}
      </div>

      {/* Glowing System Online */}
      <div style={{
          position: 'absolute', top: '85%',
          opacity: frame > 150 ? 1 : 0,
          transform: `scale(${1 + Math.sin(frame / 10) * 0.05})`,
        }}>
          <h2 style={{ fontFamily: 'Inter, sans-serif', fontWeight: 800, fontSize: 50, color: '#10B981', textShadow: '0 0 40px rgba(16, 185, 129, 0.5)', margin: 0 }}>
            SYSTEM ONLINE
          </h2>
      </div>

    </AbsoluteFill>
  );
};

export const Scene7OutroCTA: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Scale down the whole screen
  const containerScale = interpolate(spring({ frame, fps, config: { damping: 80 } }), [0, 1], [1.2, 1]);
  
  // Arrow bounce
  const arrowY = Math.sin(frame / 6) * 20;

  return (
    <AbsoluteFill style={{ backgroundColor: '#111827', color: '#FFF', justifyContent: 'center', alignItems: 'center' }}>
      
      <AbsoluteFill style={{ transform: `scale(${containerScale})`, justifyContent: 'center', alignItems: 'center' }}>
        <h1 style={{ ...getTitleStyle(100), color: '#FFF', marginBottom: 200 }}>
          FIX THE <span style={{color: '#06B6D4'}}>SETUP</span>
        </h1>

        <div style={{ position: 'absolute', bottom: 300, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 40 }}>
          <h2 style={{ fontFamily: 'Inter, sans-serif', fontWeight: 800, fontSize: 60, color: '#F3F4F6', margin: 0, textAlign: 'center' }}>
            WATCH THE<br/>FULL VIDEO
          </h2>
          
          <svg style={{ transform: `translateY(${arrowY}px)` }} width="100" height="150" viewBox="0 0 24 24" fill="none" stroke="#06B6D4" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="5" x2="12" y2="19" />
            <polyline points="19 12 12 19 5 12" />
          </svg>
        </div>
      </AbsoluteFill>

    </AbsoluteFill>
  );
};
