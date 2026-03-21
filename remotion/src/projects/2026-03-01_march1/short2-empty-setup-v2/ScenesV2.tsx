import React from 'react';
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { ConnectorsSvg, FolderWireframeV2, RedStampV2, RobotHeadV2 } from './IconsV2';

// Kinetic Typography style - much bolder and tighter letter spacing
const getTextKinetic = (fontSize: number, color: string = '#111827'): React.CSSProperties => ({
  fontFamily: 'Inter, sans-serif',
  fontWeight: 900,
  fontSize,
  color,
  lineHeight: 0.9,
  letterSpacing: '-0.04em',
  margin: 0,
  textTransform: 'uppercase',
  textAlign: 'center',
});

// --- SCENE 1: AI Scapegoat (0s - 3s / 90 frames) ---
// Brutal pop-in text shaking the screen
export const Scene1V2: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const words = ["AI", "IS THE", "PROBLEM"];
  
  // Screen shake on every impact
  const globalShake = 
    (frame >= 20 && frame < 25 ? Math.sin(frame * 3) * 15 : 0) +
    (frame >= 35 && frame < 40 ? Math.sin(frame * 3) * 15 : 0) +
    (frame >= 50 && frame < 55 ? Math.sin(frame * 3) * 20 : 0);

  return (
    <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center', transform: `translate(${globalShake}px, ${globalShake}px)` }}>
      <div style={{
        position: 'absolute', top: 350,
        transform: `scale(${spring({ frame: frame - 5, fps, config: { damping: 10, stiffness: 400 } })})`
      }}>
        <RobotHeadV2 size={350} color="#06B6D4" glow={frame > 50} />
      </div>

      <div style={{ position: 'absolute', top: 750, display: 'flex', flexDirection: 'column', gap: 10 }}>
        {words.map((w, i) => {
          const trigger = 20 + i * 15;
          const scale = spring({ frame: frame - trigger, fps, config: { damping: 12, stiffness: 350 } });
          const rotate = interpolate(spring({ frame: frame - trigger, fps }), [0, 1], [(i%2===0?15:-15), 0]);
          return (
            <h1 key={w} style={{ 
              ...getTextKinetic(140, i === 0 ? '#06B6D4' : '#111827'),
              transform: `scale(${scale}) rotate(${rotate}deg)`,
              opacity: frame >= trigger ? 1 : 0,
              textShadow: i === 0 ? '0 10px 30px rgba(6, 182, 212, 0.4)' : 'none'
            }}>
              {w}
            </h1>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

// --- SCENE 2: The Empty Void (3s - 7s / 120 frames) ---
// Massive pullback, infinite empty space, rotating hollow wireframes
export const Scene2V2: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Dramatic snap zoom out
  const zoomScale = interpolate(spring({ frame, fps, config: { damping: 15, stiffness: 200 } }), [0, 1], [5, 1]);
  const blur = interpolate(frame, [0, 10], [20, 0], { extrapolateRight: 'clamp' });

  // Floating empty folders appearing
  const folderDash = interpolate(frame, [15, 45], [100, 0], { extrapolateRight: 'clamp' });
  const folderRotate = interpolate(frame, [0, 120], [0, 360]);

  const textScale = spring({ frame: frame - 40, fps, config: { damping: 12, stiffness: 250 } });

  return (
    <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center', filter: `blur(${blur}px)`, transform: `scale(${zoomScale})` }}>
      
      <div style={{ position: 'absolute', transform: `rotate(${folderRotate}deg) scale(1.5)` }}>
         <FolderWireframeV2 size={500} color="#D1D5DB" dashOffset={folderDash} />
      </div>

      <div style={{ transform: `scale(${textScale})`, padding: '40px 60px', backgroundColor: '#FFF', borderRadius: 40, boxShadow: '0 25px 50px -12px rgba(0,0,0,0.1)' }}>
        <h1 style={{ ...getTextKinetic(120, '#EF4444') }}>EMPTY</h1>
        <h1 style={{ ...getTextKinetic(120) }}>WORKSPACE</h1>
      </div>

    </AbsoluteFill>
  );
};

// --- SCENE 3: Missing Pieces (7s - 11s / 120 frames) ---
// Cards don't just slide, they smash into the lens
export const Scene3V2: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const labels = ['CONTEXT', 'STANDARDS', 'DESIGN SYS', 'CHECKS'];

  return (
    <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center', padding: 20 }}>
      {labels.map((lbl, i) => {
        const trigger = i * 25;
        // Smoothed out slam from scale 1.3 to 1
        const slam = interpolate(spring({ frame: frame - trigger, fps, config: { damping: 14, mass: 1, stiffness: 150 } }), [0, 1], [1.3, 1]);
        const opacity = interpolate(frame, [trigger, trigger + 5], [0, 1], { extrapolateRight: 'clamp' });
        
        // Jitter / shake right after impact reduced
        const jitter = (frame > trigger && frame < trigger + 5) ? Math.sin(frame * 10) * 5 : 0;
        
        // Red stamp slams slightly after
        const stampScale = spring({ frame: frame - trigger - 8, fps, config: { damping: 12, stiffness: 200 } });

        // Distribute them dynamically
        const yOffset = (i * 180) - 270;
        const xOffset = (i % 2 === 0) ? -50 : 50;

        return (
          <div key={lbl} style={{
            position: 'absolute',
            width: 700, height: 160,
            transform: `translate(${xOffset + jitter}px, ${yOffset}px) scale(${slam})`,
            opacity,
            backgroundColor: '#FFF',
            border: '4px solid #111827',
            display: 'flex', justifyContent: 'center', alignItems: 'center',
            boxShadow: '20px 20px 0px rgba(17, 24, 39, 0.1)', // Brutalist shadow
          }}>
             <h2 style={{ ...getTextKinetic(80) }}>{lbl}</h2>
             
             <div style={{ position: 'absolute', right: -50, top: -50, transform: `scale(${stampScale}) rotate(${i % 2 === 0 ? 15 : -15}deg)` }}>
                <div style={{ backgroundColor: '#FFF', borderRadius: '50%', padding: 20, border: '4px dashed #EF4444' }}>
                   <RedStampV2 size={120} />
                </div>
             </div>
          </div>
        )
      })}
    </AbsoluteFill>
  );
};

// --- SCENE 4: Full Chaos Guesswork (11s - 16s / 150 frames) ---
// A slot machine / roulette of random code and components spinning furiously
export const Scene4V2: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Roulette spin
  const spinY = interpolate(frame, [0, 60], [1000, 0], { extrapolateRight: 'clamp' });
  // Fade out slot machine after guess
  const slotOpacity = interpolate(frame, [65, 75], [1, 0], { extrapolateRight: 'clamp' });
  const scaleIn = spring({ frame, fps, config: { damping: 15, stiffness: 200 } });
  
  // Fake component pop
  const compPop = spring({ frame: frame - 70, fps, config: { damping: 14, stiffness: 250 } });
  
  // "Looks fine!" sticker
  const stickerSpring = spring({ frame: frame - 100, fps, config: { damping: 10, stiffness: 300 } });

  return (
    <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: '#F3F4F6' }}>
      
      <h1 style={{ ...getTextKinetic(140), position: 'absolute', top: 150, WebkitTextStroke: '3px #111827', color: 'transparent' }}>
        GUESSWORK
      </h1>

      {/* The Slot Machine "Guess" mechanism */}
      <div style={{
        width: 800, height: 400, backgroundColor: '#111827', borderRadius: 40,
        transform: `scale(${scaleIn})`, overflow: 'hidden', position: 'absolute', opacity: slotOpacity,
        display: 'flex', justifyContent: 'center', alignItems: 'center', top: 'calc(50% - 200px)',
        border: '10px solid #FFF', boxShadow: '0 30px 60px rgba(0,0,0,0.2)', zIndex: 1
      }}>
        <h1 style={{ ...getTextKinetic(200, '#06B6D4'), position: 'absolute', transform: `translateY(${spinY}px)` }}>?</h1>
        <h1 style={{ ...getTextKinetic(200, '#F59E0B'), position: 'absolute', transform: `translateY(${spinY - 500}px)` }}>??</h1>
        <h1 style={{ ...getTextKinetic(200, '#10B981'), position: 'absolute', transform: `translateY(${spinY - 1000}px)` }}>UI</h1>
      </div>

      {/* The highly detailed result pops out */}
      <div style={{
        position: 'absolute', width: 800, height: 500, backgroundColor: '#FFF',
        borderRadius: 40, transform: `scale(${compPop})`, border: '4px solid #F3F4F6',
        display: 'flex', flexDirection: 'column',
        boxShadow: '0 40px 80px rgba(0,0,0,0.1)', zIndex: 2, overflow: 'hidden'
      }}>
        {/* Background Gradients */}
        <div style={{ position: 'absolute', top: -300, left: -100, width: 600, height: 600, background: 'radial-gradient(circle, rgba(6,182,212,0.15) 0%, rgba(255,255,255,0) 70%)' }} />
        <div style={{ position: 'absolute', top: -200, right: -200, width: 500, height: 500, background: 'radial-gradient(circle, rgba(59,130,246,0.1) 0%, rgba(255,255,255,0) 70%)' }} />

        {/* Navbar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '24px 40px', borderBottom: '1px solid rgba(229,231,235,0.5)', position: 'relative', zIndex: 10 }}>
           <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ width: 32, height: 32, background: 'linear-gradient(135deg, #06B6D4, #3B82F6)', borderRadius: 10, boxShadow: '0 4px 10px rgba(6,182,212,0.3)' }} />
              <span style={{ fontWeight: 900, fontSize: 24, color: '#111827', letterSpacing: '-0.02em', fontFamily: 'Inter, sans-serif' }}>NexUI</span>
           </div>
           <div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
              <span style={{ fontSize: 15, color: '#6B7280', fontWeight: 600, fontFamily: 'Inter, sans-serif' }}>Features</span>
              <span style={{ fontSize: 15, color: '#6B7280', fontWeight: 600, fontFamily: 'Inter, sans-serif' }}>Pricing</span>
              <span style={{ fontSize: 15, color: '#6B7280', fontWeight: 600, fontFamily: 'Inter, sans-serif' }}>Docs</span>
              <div style={{ padding: '8px 20px', backgroundColor: '#111827', color: '#FFF', borderRadius: 20, fontSize: 14, fontWeight: 700, fontFamily: 'Inter, sans-serif' }}>Sign In</div>
           </div>
        </div>

        {/* Hero Section */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', marginTop: 50, position: 'relative', zIndex: 10 }}>
            <div style={{ padding: '6px 16px', background: 'rgba(6,182,212,0.1)', color: '#06B6D4', borderRadius: 20, fontSize: 14, fontWeight: 800, border: '1px solid rgba(6,182,212,0.2)', marginBottom: 20, fontFamily: 'Inter, sans-serif' }}>
               ✨ v2.0 is now live
            </div>
            
            <h1 style={{ fontSize: 60, fontWeight: 900, color: '#111827', lineHeight: 1.1, letterSpacing: '-0.04em', margin: 0, fontFamily: 'Inter, sans-serif' }}>
               Build stunning apps<br/>
               <span style={{ background: 'linear-gradient(to right, #06B6D4, #3B82F6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>at warp speed.</span>
            </h1>
            
            <p style={{ fontSize: 18, color: '#6B7280', fontWeight: 500, maxWidth: 550, lineHeight: 1.5, marginTop: 20, marginBottom: 30, fontFamily: 'Inter, sans-serif' }}>
               The most powerful UI kit for modern web applications. Beautifully crafted, highly customizable components that just work.
            </p>
            
            <div style={{ display: 'flex', gap: 16 }}>
               <div style={{ padding: '16px 32px', background: 'linear-gradient(135deg, #06B6D4, #0284C7)', color: '#FFF', borderRadius: 30, fontSize: 18, fontWeight: 800, boxShadow: '0 10px 25px rgba(6,182,212,0.4)', fontFamily: 'Inter, sans-serif' }}>
                  Start Building
               </div>
               <div style={{ padding: '16px 32px', backgroundColor: '#FFF', color: '#111827', border: '2px solid #E5E7EB', borderRadius: 30, fontSize: 18, fontWeight: 800, fontFamily: 'Inter, sans-serif', boxShadow: '0 4px 6px rgba(0,0,0,0.02)' }}>
                  View Components
               </div>
            </div>
        </div>

        {/* Subtle decorative mock dashboard peeking from bottom */}
        <div style={{ position: 'absolute', bottom: -100, left: '50%', transform: 'translateX(-50%)', width: 680, height: 200, backgroundColor: '#FFF', borderRadius: '24px 24px 0 0', border: '1px solid #E5E7EB', boxShadow: '0 -20px 40px rgba(0,0,0,0.05)', display: 'flex', padding: 20, gap: 20, zIndex: 1 }}>
            <div style={{ width: 160, height: '100%', backgroundColor: '#F9FAFB', borderRadius: 12, border: '1px solid #F3F4F6' }} />
            <div style={{ flex: 1, height: '100%', backgroundColor: '#F9FAFB', borderRadius: 12, border: '1px solid #F3F4F6' }} />
        </div>
      </div>

      {/* Sticker */}
      <div style={{
         position: 'absolute', bottom: 300, right: 100, transform: `scale(${stickerSpring}) rotate(-10deg)`,
         backgroundColor: '#10B981', padding: '20px 40px', borderRadius: 100,
         border: '8px solid #FFF', boxShadow: '0 20px 40px rgba(16, 185, 129, 0.4)'
      }}>
        <h2 style={{ ...getTextKinetic(70, '#FFF') }}>LOOKS FINE!</h2>
      </div>

    </AbsoluteFill>
  );
};

// --- SCENE 5: The Collapse (16s - 21s / 150 frames) ---
// Shattering UI and red alarms
export const Scene5V2: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Violent shaking starts at frame 10
  const isShaking = frame > 10 && frame < 50;
  const shakeX = isShaking ? Math.sin(frame * 15) * 30 : 0;
  const shakeY = isShaking ? Math.cos(frame * 15) * 20 : 0;
  
  // At frame 50, gravity completely takes over and explodes outwards
  const timeFalling = Math.max(0, frame - 50);
  const gravity = Math.pow(timeFalling / 5, 2) * 50;

  // Screen flashes intensely red then white
  const flashOpacity = frame === 48 || frame === 49 ? 1 : 0;
  
  // Better looking dashboard layout parts
  const dashboardParts = [
    { id: 1, type: 'navbar', w: 800, h: 100, x: 540, y: 700, bg: '#111827', spin: 15, xVel: -20 },
    { id: 2, type: 'sidebar', w: 200, h: 400, x: 240, y: 970, bg: '#F3F4F6', spin: -25, xVel: -30 },
    { id: 3, type: 'card1', w: 570, h: 200, x: 655, y: 870, bg: '#FFF', border: '3px solid #E5E7EB', spin: 10, xVel: 15 },
    { id: 4, type: 'card2', w: 570, h: 180, x: 655, y: 1080, bg: '#FFF', border: '3px solid #06B6D4', spin: -15, xVel: 25 },
    { id: 5, type: 'button', w: 150, h: 60, x: 800, y: 700, bg: '#06B6D4', spin: 40, xVel: 30 },
    { id: 6, type: 'avatar', w: 60, h: 60, x: 900, y: 700, bg: '#10B981', spin: -40, xVel: 40 },
  ];

  return (
    <AbsoluteFill style={{ backgroundColor: '#FAFAFA', justifyContent: 'center', alignItems: 'center' }}>
      
      <AbsoluteFill style={{ position: 'absolute', opacity: flashOpacity, backgroundColor: '#EF4444' }} />

      <h1 style={{ ...getTextKinetic(160, '#EF4444'), position: 'absolute', top: 150, opacity: frame > 20 ? 1 : 0, transform: `scale(${spring({ frame: frame - 20, fps, config: {stiffness: 400}})})` }}>
        FALLS APART
      </h1>

      <div style={{ transform: `translate(${shakeX}px, ${shakeY}px)`, position: 'absolute', width: '100%', height: '100%' }}>
         {dashboardParts.map((p) => {
           const fallTranslateY = timeFalling > 0 ? gravity : 0;
           const fallTranslateX = timeFalling > 0 ? (p.xVel * timeFalling * 0.15) : 0;
           const fallRotate = timeFalling > 0 ? timeFalling * p.spin * 0.1 : 0;

           return (
             <div key={p.id} style={{
               position: 'absolute', width: p.w, height: p.h, backgroundColor: p.bg,
               borderRadius: p.w === p.h ? p.w : 20, // circle if square
               border: p.border,
               boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
               left: p.x - p.w/2, top: p.y - p.h/2, // centered around x,y
               transform: `translate(${fallTranslateX}px, ${fallTranslateY}px) rotate(${fallRotate}deg)`
             }} />
           )
         })}
      </div>

    </AbsoluteFill>
  );
};

// --- SCENE 6: The Setup (21s - 28s / 210 frames) ---
// "Iron man armor" style locking structure
export const Scene6V2: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Cyan laser lines drawing the grid
  const dashOffset = interpolate(frame, [0, 60], [2000, 0], { extrapolateRight: 'clamp' });
  const pulseScale = 1 + Math.sin(frame / 5) * 0.05;

  return (
    <AbsoluteFill style={{ backgroundColor: '#111827', justifyContent: 'center', alignItems: 'center' }}> {/* Dark mode reverse for just this scene as a pattern interrupt */}
      
      <div style={{ position: 'absolute', transform: `scale(${pulseScale})`, opacity: frame > 80 ? 1 : 0.5 }}>
        <svg width="1080" height="1920" viewBox="0 0 1080 1920">
           <rect x="200" y="500" width="680" height="600" fill="none" stroke="#06B6D4" strokeWidth="15" strokeDasharray="2000" strokeDashoffset={dashOffset} rx="40" />
           <line x1="200" y1="800" x2="880" y2="800" stroke="#06B6D4" strokeWidth="15" strokeDasharray="1000" strokeDashoffset={dashOffset/2} />
           <line x1="540" y1="800" x2="540" y2="1100" stroke="#06B6D4" strokeWidth="15" strokeDasharray="1000" strokeDashoffset={dashOffset/2} />
        </svg>
      </div>

      <div style={{ position: 'absolute', width: 1080, height: 1920, display: 'flex', flexDirection: 'column', gap: 30, justifyContent: 'center', alignItems: 'center', top: -160 }}>
        
        {/* Slapping the modules in with extreme force */}
        <div style={{
          width: 600, height: 200, backgroundColor: '#06B6D4', borderRadius: 20,
          transform: `scale(${spring({ frame: frame - 40, fps, config: { damping: 12, stiffness: 300 } })})`,
          display: 'flex', justifyContent: 'center', alignItems: 'center', boxShadow: '0 0 100px rgba(6, 182, 212, 0.4)'
        }}>
           <h1 style={{...getTextKinetic(80, '#FFF')}}>CORE SYSTEM</h1>
        </div>

        <div style={{ display: 'flex', gap: 30 }}>
          <div style={{
            width: 285, height: 230, backgroundColor: '#0ea5e9', borderRadius: 20,
            transform: `scale(${spring({ frame: frame - 60, fps, config: { damping: 12, stiffness: 300 } })})`,
            display: 'flex', justifyContent: 'center', alignItems: 'center'
          }}>
             <h1 style={{...getTextKinetic(35, '#FFF')}}>RULES</h1>
          </div>
          <div style={{
            width: 285, height: 230, backgroundColor: '#38bdf8', borderRadius: 20,
            transform: `scale(${spring({ frame: frame - 70, fps, config: { damping: 12, stiffness: 300 } })})`,
            display: 'flex', justifyContent: 'center', alignItems: 'center'
          }}>
             <h1 style={{...getTextKinetic(35, '#111827')}}>CONTEXT</h1>
          </div>
        </div>
      </div>

      <div style={{
         position: 'absolute', bottom: 300,
         transform: `scale(${spring({ frame: frame - 120, fps, config: { damping: 8, stiffness: 200 } })}) rotate(${Math.sin(frame/4)*2}deg)`,
      }}>
        <h1 style={{ ...getTextKinetic(120, '#10B981'), textShadow: '0 0 50px rgba(16, 185, 129, 0.6)' }}>ONLINE</h1>
      </div>

    </AbsoluteFill>
  );
};

// --- SCENE 7: Outro CTA (28s - 35s / 210 frames) ---
// Massive looping arrow and text
export const Scene7V2: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const slamDown = interpolate(spring({ frame, fps, config: { damping: 12, stiffness: 200 } }), [0, 1], [-1000, 0]);
  const arrowY = Math.sin(frame / 4) * 40;

  return (
    <AbsoluteFill style={{ backgroundColor: '#FAFAFA', justifyContent: 'center', alignItems: 'center' }}>
      
      <div style={{ position: 'absolute', top: 300, transform: `translateY(${slamDown}px)` }}>
        <h1 style={{ ...getTextKinetic(140) }}>WATCH THE</h1>
        <h1 style={{ ...getTextKinetic(160, '#06B6D4') }}>FULL VIDEO</h1>
      </div>

      <div style={{ position: 'absolute', bottom: 250, transform: `translateY(${arrowY}px)` }}>
         <svg width="200" height="300" viewBox="0 0 24 24" fill="none" stroke="#111827" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" style={{ filter: 'drop-shadow(0 20px 20px rgba(0,0,0,0.1))' }}>
            <line x1="12" y1="2" x2="12" y2="22" />
            <polyline points="19 15 12 22 5 15" />
          </svg>
      </div>

    </AbsoluteFill>
  );
};
