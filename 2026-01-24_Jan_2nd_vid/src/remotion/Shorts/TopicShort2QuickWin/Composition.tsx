import React from 'react';
import { AbsoluteFill, Sequence, useVideoConfig, spring, useCurrentFrame, interpolate } from 'remotion';
import { UglyWebsite } from './components/UglyWebsite';
import { ProCard } from './components/ProCard';
import { CodeEditor } from './components/CodeEditor';
import { FileDirectory } from './components/FileDirectory';
import { Puzzle, Check } from 'lucide-react';

export const TopicShort2QuickWin: React.FC = () => {
    const { fps } = useVideoConfig();
    const frame = useCurrentFrame();

    // Scene durations
    const SCENE_1_DURATION = 4 * fps;
    const SCENE_2_DURATION = 2 * fps;
    const SCENE_3_DURATION = 5 * fps;
    const SCENE_4_DURATION = 3 * fps;
    const SCENE_5_DURATION = 3 * fps; // Remaining time

    // Calculate start times for easier sequencing
    const SCENE_2_START = SCENE_1_DURATION;
    const SCENE_3_START = SCENE_2_START + SCENE_2_DURATION;
    const SCENE_4_START = SCENE_3_START + SCENE_3_DURATION;
    const SCENE_5_START = SCENE_4_START + SCENE_4_DURATION;

    // --- ANIMATIONS ---

    // Scene 1: Puzzle Piece Pulse
    const puzzleScale = spring({
        frame: frame % 60, // Loop every 2 seconds
        fps,
        config: { damping: 10, stiffness: 50 },
    });
    const puzzleScaleMapped = interpolate(puzzleScale, [0, 1], [1, 1.2]);


    // Scene 4: Morph Transition (Crossfade)
    // We want to fade ProCard IN over UglyWebsite
    // Use the relative frame inside Scene 4

    return (
        <AbsoluteFill style={{ backgroundColor: '#0F172A' }}>

            {/* SCENE 1: The Problem (Split Screen) */}
            <Sequence from={0} durationInFrames={SCENE_1_DURATION}>
                {/* Safe Zone Container - Top 80% (40/40 Split) to avoid bottom UI */}
                <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '80%',
                    display: 'flex',
                    flexDirection: 'column'
                }}>
                    {/* Top Side (Ugly) */}
                    <div style={{
                        flex: 1,
                        position: 'relative',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderBottom: '4px solid #1F2937' // Darker separator
                    }}>
                        <div style={{ transform: 'scale(0.85)' }}>
                            <UglyWebsite />
                        </div>

                        {/* "UGLY" Stamp */}
                        <div style={{
                            position: 'absolute',
                            top: '20%',
                            right: '10%',
                            transform: 'rotate(-15deg)',
                            border: '8px solid #EF4444',
                            color: '#EF4444',
                            fontSize: '80px',
                            fontWeight: '900',
                            padding: '10px 40px',
                            opacity: 0.9,
                            fontFamily: 'Arial, sans-serif',
                            textTransform: 'uppercase',
                            maskImage: 'url("https://s3.us-west-2.amazonaws.com/s.cdpn.io/8399/grunge.png")',
                        }}>
                            UGLY
                        </div>
                    </div>

                    {/* Bottom Side (Pro) */}
                    <div style={{
                        flex: 1,
                        position: 'relative',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        // Subtle grid pattern for dark mode
                        backgroundImage: 'radial-gradient(#374151 1px, transparent 1px)',
                        backgroundSize: '20px 20px'
                    }}>
                        <div style={{ transform: 'scale(0.85)' }}>
                            <ProCard />
                        </div>
                    </div>
                </div>

                {/* Center / Pulse Icon - Absolute over the whole container */}
                <div style={{
                    position: 'absolute',
                    top: '40%', // Centered in the 80% container (50% of 80%)
                    left: '50%',
                    transform: `translate(-50%, -50%) scale(${puzzleScaleMapped})`,
                    zIndex: 20,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}>
                    <div style={{
                        filter: 'drop-shadow(0 10px 30px rgba(59, 130, 246, 0.4))',
                        background: '#1E293B',
                        borderRadius: '50%',
                        padding: '20px',
                        border: '1px solid #374151'
                    }}>
                        <Puzzle size={100} color="#60A5FA" strokeWidth={2} fill="rgba(59, 130, 246, 0.2)" />
                    </div>

                    <div style={{
                        marginTop: '15px',
                        whiteSpace: 'nowrap', fontSize: '32px', fontWeight: '900', color: 'white',
                        backgroundColor: '#EF4444', padding: '8px 24px', borderRadius: '12px',
                        boxShadow: '0 4px 15px rgba(239, 68, 68, 0.4)',
                        transform: 'rotate(-5deg)'
                    }}>
                        MISSING!
                    </div>
                </div>
            </Sequence>

            {/* SCENE 2: Code Editor & Stamp */}
            <Sequence from={SCENE_2_START} durationInFrames={SCENE_2_DURATION}>
                <ZoomInContainer>
                    <CodeEditor typingProgress={0} showStamp={true} />
                </ZoomInContainer>
            </Sequence>

            {/* SCENE 3: Typing & Highlights */}
            <Sequence from={SCENE_3_START} durationInFrames={SCENE_3_DURATION}>
                {/* 
                    We need to animate typingProgress from 0 to 1 over the duration.
                    Note: CodeEditor text is static, but we can animate the 'typingProgress' prop.
                  */}
                <TypingSequence duration={SCENE_3_DURATION} />
            </Sequence>

            {/* SCENE 4: Transformation */}
            <Sequence from={SCENE_4_START} durationInFrames={SCENE_4_DURATION}>
                {/* 
                    Idea: Start with UglyWebsite, then rapid transition to ProCard. 
                    "Boom" effect at start of scene.
                */}
                <BoomTransition />
            </Sequence>

            {/* SCENE 5: CTA */}
            <Sequence from={SCENE_5_START} durationInFrames={SCENE_5_DURATION + 30}> {/* Add buffer */}
                <FileDirectory />
            </Sequence>

        </AbsoluteFill>
    );
};

// Helper component for Scene 3 to use hooks cleanly
const TypingSequence: React.FC<{ duration: number }> = ({ duration }) => {
    const frame = useCurrentFrame();
    // "Hacker speed": Complete typing in 60% of the scene duration
    const progress = interpolate(frame, [0, duration * 0.6], [0, 1], { extrapolateRight: 'clamp' });
    return <CodeEditor typingProgress={progress} showStamp={false} />;
};

// Helper for Scene 4 BOOM
const BoomTransition: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    // 0 to 1 transition happens fast at frame 10-20
    const transitionProgress = interpolate(frame, [5, 15], [0, 1], { extrapolateRight: 'clamp' });

    // Shake effect
    const shake = spring({
        frame,
        fps,
        config: { damping: 5, stiffness: 200 }
    });
    const shakeX = interpolate(shake, [0, 1], [0, frame < 10 ? 20 : 0]);

    // Checkmarks appearing
    const checkScale = spring({
        frame: frame - 20,
        fps,
        config: { damping: 15 }
    });

    return (
        <AbsoluteFill style={{ overflow: 'hidden' }}>
            <div style={{
                width: '100%',
                height: '80%', // SAFE ZONE to match Scene 1
                position: 'relative',
                transform: `translateX(${shakeX}px)`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                {/* Crossfade Layering */}
                <div style={{
                    position: 'absolute',
                    opacity: 1 - transitionProgress,
                    transform: 'scale(0.85)'
                }}>
                    <UglyWebsite />
                </div>
                <div style={{
                    position: 'absolute',
                    opacity: transitionProgress,
                    transform: `scale(${interpolate(transitionProgress, [0, 1], [0.8, 0.85])})`
                }}>
                    <ProCard />

                    {/* Floating Checks */}
                    <div style={{ position: 'absolute', top: '20%', left: '20%', transform: `scale(${checkScale})` }}>
                        <div style={{ background: '#10B981', borderRadius: '50%', padding: '10px' }}>
                            <Check color="white" size={40} />
                        </div>
                    </div>
                    <div style={{ position: 'absolute', bottom: '20%', right: '20%', transform: `scale(${checkScale})` }}>
                        <div style={{ background: '#10B981', borderRadius: '50%', padding: '10px' }}>
                            <Check color="white" size={40} />
                        </div>
                    </div>
                </div>
            </div>
        </AbsoluteFill>
    );
}

const ZoomInContainer: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    // Smooth camera push (Zoom In)
    const scale = interpolate(frame, [0, 2 * fps], [1, 1.15], {
        extrapolateRight: 'clamp',
        easing: (t) => t * (2 - t) // Ease out
    });

    return (
        <AbsoluteFill style={{
            transform: `scale(${scale})`,
            transformOrigin: 'center center',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            <div style={{ width: '100%', height: '80%' }}> {/* Safe Zone constraint */}
                {children}
            </div>
        </AbsoluteFill>
    );
};
