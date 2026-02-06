import React from 'react';
import {
    AbsoluteFill,
    Sequence,
    useCurrentFrame,
    useVideoConfig,
    interpolate,
    spring,
} from 'remotion';
import { UglyMockup } from './UglyMockup';
import { BeautifulMockup } from './BeautifulMockup';
import { ParticleSystem } from './ParticleSystem';
import { SceneLabels } from './SceneLabels';

/**
 * TransformationTeaser - BR04
 * 
 * A "magic wand" transformation effect showing ugly → beautiful UI
 * Duration: 5 seconds (150 frames @ 30fps)
 * 
 * Scene Breakdown:
 * - Scene 1 (0-1s): Ugly display with glitch
 * - Scene 2 (1-2.5s): Decomposition into particles
 * - Scene 3 (2.5-4s): Reconstruction on right side
 * - Scene 4 (4-5s): Reveal hold with sparkles
 */
export const TransformationTeaser: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    // Timeline (in frames)
    const SCENE_1_END = 1 * fps; // 30
    const SCENE_2_END = 2.5 * fps; // 75
    const SCENE_3_END = 4 * fps; // 120
    const SCENE_4_END = 5 * fps; // 150

    // Mockup positioning
    const MOCKUP_SCALE = 0.65;
    const MOCKUP_WIDTH = 800 * MOCKUP_SCALE;
    const MOCKUP_HEIGHT = 600 * MOCKUP_SCALE;

    // Left side: Ugly mockup position
    const uglyX = 160;
    const uglyY = (1080 - MOCKUP_HEIGHT) / 2;

    // Right side: Beautiful mockup position
    const beautifulX = 1920 - 160 - MOCKUP_WIDTH;
    const beautifulY = (1080 - MOCKUP_HEIGHT) / 2;

    // Glitch shake for ugly mockup (Scene 1)
    const glitchX = frame < SCENE_1_END
        ? Math.sin(frame * 2.5) * 3 + Math.sin(frame * 7) * 2
        : 0;
    const glitchY = frame < SCENE_1_END
        ? Math.cos(frame * 3.2) * 2 + Math.cos(frame * 5) * 1.5
        : 0;

    // Ugly mockup opacity (fades as decomposition progresses)
    const uglyOpacity = interpolate(
        frame,
        [SCENE_1_END, SCENE_1_END + 0.5 * fps],
        [1, 0],
        { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
    );

    // Beautiful mockup opacity (fades in during reconstruction)
    const beautifulOpacity = interpolate(
        frame,
        [SCENE_2_END + 0.3 * fps, SCENE_3_END - 0.3 * fps],
        [0, 1],
        { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
    );

    // Beautiful mockup scale (pops in)
    const beautifulScale = frame >= SCENE_2_END
        ? spring({
            frame: frame - SCENE_2_END,
            fps,
            config: { damping: 200 },
        })
        : 0;

    // Green glow on completion
    const glowStrength = frame >= SCENE_3_END - 0.5 * fps
        ? spring({
            frame: frame - (SCENE_3_END - 0.5 * fps),
            fps,
            config: { damping: 20, stiffness: 150 },
        })
        : 0;

    // Red aura pulsing (Scene 1)
    const redAuraOpacity = frame < SCENE_1_END
        ? 0.4 + Math.sin(frame * 0.5) * 0.2
        : interpolate(frame, [SCENE_1_END, SCENE_1_END + 0.3 * fps], [0.4, 0], { extrapolateRight: 'clamp' });

    return (
        <AbsoluteFill
            style={{
                backgroundColor: '#0a0a0f',
                overflow: 'hidden',
            }}
        >
            {/* Scene Labels */}
            <SceneLabels
                problemIn={0}
                problemOut={SCENE_1_END + 0.3 * fps}
                solutionIn={SCENE_3_END - 0.5 * fps}
                taglineIn={SCENE_3_END + 0.3 * fps}
            />

            {/* Ugly Mockup (Left Side) */}
            <div
                style={{
                    position: 'absolute',
                    left: uglyX + glitchX,
                    top: uglyY + glitchY,
                    opacity: uglyOpacity,
                    transform: `scale(${MOCKUP_SCALE})`,
                    transformOrigin: 'top left',
                }}
            >
                {/* Red Aura */}
                <div
                    style={{
                        position: 'absolute',
                        inset: -20,
                        background: 'radial-gradient(ellipse at center, rgba(255, 107, 107, 0.4) 0%, transparent 70%)',
                        opacity: redAuraOpacity,
                        filter: 'blur(20px)',
                    }}
                />
                <UglyMockup scale={1} />
            </div>

            {/* Beautiful Mockup (Right Side) */}
            <div
                style={{
                    position: 'absolute',
                    left: beautifulX,
                    top: beautifulY,
                    opacity: beautifulOpacity,
                    transform: `scale(${MOCKUP_SCALE * beautifulScale})`,
                    transformOrigin: 'top left',
                }}
            >
                {/* Green Glow */}
                <div
                    style={{
                        position: 'absolute',
                        inset: -30,
                        background: 'radial-gradient(ellipse at center, rgba(34, 197, 94, 0.5) 0%, transparent 70%)',
                        opacity: glowStrength,
                        filter: 'blur(30px)',
                    }}
                />
                <BeautifulMockup scale={1} />
            </div>

            {/* Particle System */}
            <ParticleSystem
                decomposeStart={SCENE_1_END}
                decomposeEnd={SCENE_2_END}
                reconstructStart={SCENE_2_END}
                reconstructEnd={SCENE_3_END}
                gridSize={40}
                sourceBounds={{
                    x: uglyX,
                    y: uglyY,
                    width: MOCKUP_WIDTH,
                    height: MOCKUP_HEIGHT,
                }}
                destBounds={{
                    x: beautifulX,
                    y: beautifulY,
                    width: MOCKUP_WIDTH,
                    height: MOCKUP_HEIGHT,
                }}
            />

            {/* Lingering Sparkles (Scene 4) */}
            {frame >= SCENE_3_END && (
                <SparkleOverlay startFrame={SCENE_3_END} />
            )}
        </AbsoluteFill>
    );
};

/**
 * Sparkle overlay for the final reveal
 */
const SparkleOverlay: React.FC<{ startFrame: number }> = ({ startFrame }) => {
    const frame = useCurrentFrame();
    const localFrame = frame - startFrame;

    // Generate deterministic sparkles
    const sparkles = Array.from({ length: 30 }, (_, i) => {
        const seed = i * 17;
        const x = 1920 - 160 - 520 + (Math.sin(seed) * 0.5 + 0.5) * 520;
        const y = 200 + (Math.cos(seed * 1.3) * 0.5 + 0.5) * 390;
        const delay = (i % 10) * 2;
        const duration = 20 + (i % 5) * 5;
        const size = 2 + (i % 3) * 2;

        const progress = (localFrame - delay) / duration;
        const opacity = progress > 0 && progress < 1
            ? Math.sin(progress * Math.PI) * 0.8
            : 0;

        const drift = progress * 30;

        return (
            <div
                key={i}
                style={{
                    position: 'absolute',
                    left: x,
                    top: y - drift,
                    width: size,
                    height: size,
                    borderRadius: '50%',
                    backgroundColor: '#22c55e',
                    opacity,
                    boxShadow: `0 0 ${size * 3}px #22c55e`,
                }}
            />
        );
    });

    return <>{sparkles}</>;
};

export default TransformationTeaser;
