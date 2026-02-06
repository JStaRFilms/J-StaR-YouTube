import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate, random } from 'remotion';
import { Check } from 'lucide-react';
import { ProDashboard } from './components/ProDashboard';

// Dark background color to match main composition
const DARK_BG_COLOR = '#0A0A0F';

// Ugly Website Component
const UglyWebsite: React.FC<{ opacity: number; scale: number }> = ({ opacity, scale }) => {
    return (
        <div style={{
            width: '560px',
            height: '420px',
            backgroundColor: 'white',
            fontFamily: '"Times New Roman", Times, serif',
            color: 'black',
            border: '2px solid #ccc',
            boxShadow: '4px 4px 0px rgba(0,0,0,0.3)',
            display: 'flex',
            flexDirection: 'column',
            opacity,
            transform: `scale(${scale})`,
            transition: 'none'
        }}>
            {/* Old School Browser Bar */}
            <div style={{
                backgroundColor: '#e0e0e0',
                borderBottom: '1px solid #999',
                padding: '8px 12px',
                display: 'flex',
                gap: '6px',
                alignItems: 'center'
            }}>
                <div style={{ display: 'flex', gap: '4px' }}>
                    <div style={{ width: '10px', height: '10px', border: '1px solid #999', borderRadius: '2px', backgroundColor: '#fff' }}></div>
                    <div style={{ width: '10px', height: '10px', border: '1px solid #999', borderRadius: '2px', backgroundColor: '#fff' }}></div>
                    <div style={{ width: '10px', height: '10px', border: '1px solid #999', borderRadius: '2px', backgroundColor: '#fff' }}></div>
                </div>
                <div style={{
                    flex: 1, backgroundColor: 'white', border: '1px solid #999', padding: '2px 6px', fontSize: '10px', fontFamily: 'Arial'
                }}>
                    http://my-site.com
                </div>
            </div>

            {/* Content */}
            <div style={{ padding: '32px' }}>
                <h1 style={{ fontSize: '36px', marginBottom: '16px', borderBottom: '1px solid black' }}>Welcome</h1>
                <p style={{ fontSize: '20px', lineHeight: '1.4', marginBottom: '22px' }}>This is a basic page.</p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', alignItems: 'flex-start' }}>
                    <a href="#" style={{ color: '#0000EE', textDecoration: 'underline', fontSize: '20px' }}>
                        Click Here
                    </a>
                    <button style={{
                        backgroundColor: '#E0E0E0',
                        border: '2px outset buttonface',
                        padding: '12px 20px',
                        fontSize: '18px',
                        cursor: 'pointer',
                        color: 'black',
                        fontFamily: 'sans-serif'
                    }}>
                        Submit
                    </button>
                </div>
            </div>
        </div>
    );
};

// Checkmark component with animation
const AnimatedCheckmark: React.FC<{ delay: number; top: string; left: string }> = ({ delay, top, left }) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const checkSpring = spring({
        frame: frame - delay,
        fps,
        config: { damping: 12, stiffness: 150 },
    });

    const scale = interpolate(checkSpring, [0, 1], [0, 1]);
    const opacity = interpolate(checkSpring, [0, 0.5], [0, 1]);

    return (
        <div style={{
            position: 'absolute',
            top,
            left,
            transform: `scale(${scale})`,
            opacity,
            backgroundColor: '#22C55E',
            borderRadius: '50%',
            padding: '12px',
            boxShadow: '0 4px 15px rgba(34, 197, 94, 0.4)',
            zIndex: 30
        }}>
            <Check color="white" size={32} strokeWidth={3} />
        </div>
    );
};

export const Scene4_Morph: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    // Screen shake effect - happens at the start (0-15 frames)
    const shakeDuration = 15;
    const isShaking = frame < shakeDuration;

    // Generate consistent random offsets for shake
    const shakeX = isShaking ? (random(frame * 0.5) - 0.5) * 20 : 0;
    const shakeY = isShaking ? (random(frame * 0.7) - 0.5) * 20 : 0;
    const shakeRotate = isShaking ? (random(frame * 0.3) - 0.5) * 4 : 0;

    // Morph transition - crossfade from Ugly to Pro
    const morphStart = 10;
    const morphDuration = 20;
    const morphProgress = interpolate(
        frame,
        [morphStart, morphStart + morphDuration],
        [0, 1],
        { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
    );

    // Ugly fades out, Pro fades in
    const uglyOpacity = 1 - morphProgress;
    const proOpacity = morphProgress;

    // Scale animation for morph effect
    const uglyScale = interpolate(morphProgress, [0, 1], [1, 0.9]);
    const proScale = interpolate(morphProgress, [0, 1], [0.9, 1]);

    // "BOOM" text animation
    const boomSpring = spring({
        frame: frame - 5,
        fps,
        config: { damping: 8, stiffness: 200 },
    });
    const boomScale = interpolate(boomSpring, [0, 1], [3, 1]);
    const boomOpacity = interpolate(frame, [0, 5, 25, 35], [0, 1, 1, 0], { extrapolateRight: 'clamp' });

    return (
        <AbsoluteFill style={{
            backgroundColor: DARK_BG_COLOR,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden'
        }}>
            {/* Shake container */}
            <div style={{
                transform: `translate(${shakeX}px, ${shakeY}px) rotate(${shakeRotate}deg)`,
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                {/* Ugly Website (fading out) */}
                <div style={{
                    position: 'absolute',
                    opacity: uglyOpacity,
                    zIndex: 10
                }}>
                    <UglyWebsite opacity={1} scale={uglyScale} />
                </div>

                {/* Pro Dashboard (fading in) */}
                <div style={{
                    position: 'absolute',
                    opacity: proOpacity,
                    zIndex: 20,
                    transform: `scale(${0.75 * proScale})`
                }}>
                    <ProDashboard />
                </div>

                {/* Static placeholder to maintain layout */}
                <div style={{ visibility: 'hidden', transform: 'scale(0.75)' }}>
                    <ProDashboard />
                </div>
            </div>

            {/* BOOM text effect */}
            <div style={{
                position: 'absolute',
                top: '10%',
                left: '50%',
                transform: `translate(-50%, 0) scale(${boomScale})`,
                opacity: boomOpacity,
                fontSize: '100px',
                fontWeight: '900',
                color: '#8B5CF6',
                textShadow: '0 0 40px rgba(139, 92, 246, 0.5), 4px 4px 0px rgba(0,0,0,0.3)',
                fontFamily: 'Arial, sans-serif',
                zIndex: 40,
                letterSpacing: '4px'
            }}>
                BOOM!
            </div>

            {/* Green Checkmarks - positioned within top 80% safe area */}
            <AnimatedCheckmark delay={25} top="20%" left="20%" />
            <AnimatedCheckmark delay={30} top="55%" left="75%" />
            <AnimatedCheckmark delay={35} top="30%" left="78%" />
            <AnimatedCheckmark delay={40} top="60%" left="18%" />

            {/* Success label - moved up to stay in safe zone */}
            <div style={{
                position: 'absolute',
                bottom: '22%', // Moved up from 12% to stay within safe zone
                left: '50%',
                transform: 'translateX(-50%)',
                backgroundColor: '#22C55E',
                color: 'white',
                padding: '12px 32px',
                borderRadius: '100px',
                fontSize: '24px',
                fontWeight: '700',
                fontFamily: 'Inter, sans-serif',
                opacity: interpolate(frame, [35, 45], [0, 1], { extrapolateRight: 'clamp' }),
                boxShadow: '0 10px 30px rgba(34, 197, 94, 0.4)'
            }}>
                ✓ Professional Baseline Applied
            </div>
        </AbsoluteFill>
    );
};
