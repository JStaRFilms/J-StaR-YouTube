import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring } from 'remotion';
import { loadFont } from '@remotion/google-fonts/Outfit';
import { GradientBackground } from './GradientBackground';
import { FloatingShapes } from './FloatingShapes';

const { fontFamily } = loadFont('normal', {
    weights: ['800'],
    subsets: ['latin'],
});

interface ChapterCardProps {
    title: string;
    gradientStart: string;
    gradientEnd: string;
    shapeColors: string[];
}

export const ChapterCard: React.FC<ChapterCardProps> = ({
    title,
    gradientStart,
    gradientEnd,
    shapeColors,
}) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    // Bouncy scale-in animation starting at frame 15
    const scale = spring({
        frame: frame - 15,
        fps,
        config: { damping: 12 },
    });

    // Clamp to prevent negative scale
    const clampedScale = Math.max(0, scale);

    // Seed based on title for unique shape positions per card
    const seed = title.charCodeAt(0) + title.charCodeAt(title.length - 1);

    return (
        <AbsoluteFill>
            {/* Gradient Background */}
            <GradientBackground gradientStart={gradientStart} gradientEnd={gradientEnd} />

            {/* Floating Shapes */}
            <FloatingShapes shapeColors={shapeColors} seed={seed} />

            {/* Title Text */}
            <AbsoluteFill
                style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <div
                    style={{
                        fontFamily,
                        fontSize: 140,
                        fontWeight: 800,
                        color: '#ffffff',
                        textShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
                        transform: `scale(${clampedScale})`,
                        letterSpacing: '-0.02em',
                    }}
                >
                    {title}
                </div>
            </AbsoluteFill>
        </AbsoluteFill>
    );
};
