import React from 'react';
import { useCurrentFrame, interpolate, spring, useVideoConfig } from 'remotion';
import { loadFont } from '@remotion/google-fonts/Inter';

const { fontFamily } = loadFont();

interface GlitchTextProps {
    text: string;
    color?: string;
    fontSize?: number;
    delay?: number;
}

export const GlitchText: React.FC<GlitchTextProps> = ({
    text,
    color = '#FFFFFF',
    fontSize = 100,
    delay = 0,
}) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    // Delay logic
    const activeFrame = Math.max(0, frame - delay);

    // Entrance animation
    const scale = spring({
        frame: activeFrame,
        fps,
        config: { damping: 15 },
    });

    // Glitch effect: Random opacity flickering
    // We use a deterministic pseudo-random logic based on frame number
    const isGlitchFrame = activeFrame > 30 && activeFrame % 7 === 0;
    const opacity = isGlitchFrame ? 0.3 : 1;

    // Glitch effect: Slight position offset
    const offsetX = isGlitchFrame ? (Math.random() - 0.5) * 10 : 0;
    const offsetY = isGlitchFrame ? (Math.random() - 0.5) * 5 : 0;

    return (
        <div
            style={{
                fontFamily,
                fontWeight: 900,
                color,
                fontSize,
                textAlign: 'center',
                opacity: activeFrame < 0 ? 0 : opacity,
                transform: `scale(${scale}) translate(${offsetX}px, ${offsetY}px)`,
            }}
        >
            {text}
        </div>
    );
};
