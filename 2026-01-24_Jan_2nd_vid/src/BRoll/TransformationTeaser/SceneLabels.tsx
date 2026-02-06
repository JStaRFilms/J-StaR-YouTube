import React from 'react';
import { useCurrentFrame, useVideoConfig, interpolate, spring } from 'remotion';

interface SceneLabelsProps {
    /** "The Problem" label timing */
    problemIn: number;
    problemOut: number;
    /** "The Solution" label timing */
    solutionIn: number;
    /** Final tagline timing */
    taglineIn: number;
}

export const SceneLabels: React.FC<SceneLabelsProps> = ({
    problemIn,
    problemOut,
    solutionIn,
    taglineIn,
}) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    // "The Problem" label
    const problemOpacity = interpolate(
        frame,
        [problemIn, problemIn + 0.3 * fps, problemOut - 0.2 * fps, problemOut],
        [0, 1, 1, 0],
        { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
    );

    // "The Solution" label
    const solutionScale = frame >= solutionIn
        ? spring({
            frame: frame - solutionIn,
            fps,
            config: { damping: 15, stiffness: 150 },
        })
        : 0;

    const solutionOpacity = interpolate(
        frame,
        [solutionIn, solutionIn + 0.2 * fps],
        [0, 1],
        { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
    );

    // "Same AI. Free Skill." tagline - typewriter effect
    const taglineText = 'Same AI. Free Skill.';
    const taglineProgress = frame >= taglineIn
        ? interpolate(
            frame,
            [taglineIn, taglineIn + 0.8 * fps],
            [0, 1],
            { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
        )
        : 0;
    const taglineVisible = Math.floor(taglineProgress * taglineText.length);
    const displayedTagline = taglineText.slice(0, taglineVisible);

    return (
        <>
            {/* "The Problem" - Top Left */}
            <div
                style={{
                    position: 'absolute',
                    top: 80,
                    left: 80,
                    opacity: problemOpacity,
                    fontFamily: 'Inter, system-ui, sans-serif',
                    fontSize: 32,
                    fontWeight: 700,
                    color: '#ff6b6b',
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                    textShadow: '0 0 20px rgba(255, 107, 107, 0.5)',
                }}
            >
                The Problem
            </div>

            {/* "The Solution" - Top Right */}
            <div
                style={{
                    position: 'absolute',
                    top: 80,
                    right: 80,
                    opacity: solutionOpacity,
                    transform: `scale(${solutionScale})`,
                    fontFamily: 'Inter, system-ui, sans-serif',
                    fontSize: 32,
                    fontWeight: 700,
                    color: '#22c55e',
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                    textShadow: '0 0 20px rgba(34, 197, 94, 0.5)',
                }}
            >
                The Solution
            </div>

            {/* "Same AI. Free Skill." - Bottom Center */}
            {frame >= taglineIn && (
                <div
                    style={{
                        position: 'absolute',
                        bottom: 80,
                        left: '50%',
                        transform: 'translateX(-50%)',
                        fontFamily: 'Inter, system-ui, sans-serif',
                        fontSize: 48,
                        fontWeight: 800,
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        backgroundClip: 'text',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        letterSpacing: '-0.02em',
                    }}
                >
                    {displayedTagline}
                    <span style={{ opacity: frame % 15 < 8 ? 1 : 0 }}>|</span>
                </div>
            )}
        </>
    );
};
