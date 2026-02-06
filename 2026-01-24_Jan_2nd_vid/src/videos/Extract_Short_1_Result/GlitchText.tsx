import { useCurrentFrame, useVideoConfig, interpolate, Easing } from 'remotion';
import { useMemo } from 'react';

const COLORS = {
    primaryNeon: '#3B82F6',
    secondaryNeon: '#8B5CF6',
    textPrimary: '#FFFFFF',
    errorRed: '#EF4444',
};

interface GlitchTextProps {
    text?: string;
}

export const GlitchText: React.FC<GlitchTextProps> = ({ text = 'SAME AI???' }) => {
    const frame = useCurrentFrame();
    const { fps, width, height } = useVideoConfig();

    // Pulsing scale animation: frames 0-150, loop
    const pulseScale = interpolate(frame, [0, 75, 150], [1, 1.1, 1], {
        easing: Easing.inOut(Easing.quad),
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
    });

    // Glow pulse animation
    const glowIntensity = interpolate(frame, [0, 75, 150], [1, 1.5, 1], {
        easing: Easing.inOut(Easing.quad),
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
    });

    // Random glitch offset for each frame
    const glitchOffsets = useMemo(() => {
        return Array.from({ length: 150 }).map(() => ({
            x: Math.random() > 0.85 ? (Math.random() - 0.5) * 8 : 0,
            y: Math.random() > 0.85 ? (Math.random() - 0.5) * 4 : 0,
        }));
    }, []);
    const currentGlitch = glitchOffsets[frame % glitchOffsets.length];

    // Color shift glitch
    const colorShift = useMemo(() => {
        return Array.from({ length: 150 }).map(() =>
            Math.random() > 0.9 ? COLORS.primaryNeon : Math.random() > 0.9 ? COLORS.secondaryNeon : COLORS.textPrimary
        );
    }, []);
    const currentColor = colorShift[frame % colorShift.length];

    return (
        <div
            style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: `translate(-50%, -50%) scale(${pulseScale}) translate(${currentGlitch.x}px, ${currentGlitch.y}px)`,
                fontFamily: 'Inter, sans-serif',
                fontSize: '72px',
                fontWeight: 900,
                color: currentColor,
                textAlign: 'center',
                textShadow: `
          0 0 20px ${COLORS.primaryNeon},
          0 0 40px ${COLORS.primaryNeon},
          0 0 60px ${COLORS.primaryNeon}66,
          ${glowIntensity * 2}px ${glowIntensity * 2}px 0 ${COLORS.secondaryNeon}44
        `,
                letterSpacing: '0.05em',
                whiteSpace: 'nowrap',
            }}
        >
            {/* Main text layer */}
            <span style={{ position: 'relative', zIndex: 2 }}>{text}</span>

            {/* Glitch layers (chromatic aberration effect) */}
            <span
                style={{
                    position: 'absolute',
                    top: 0,
                    left: '-2px',
                    color: COLORS.errorRed,
                    opacity: Math.random() > 0.8 ? 0.8 : 0,
                    zIndex: 1,
                }}
            >
                {text}
            </span>
            <span
                style={{
                    position: 'absolute',
                    top: 0,
                    left: '2px',
                    color: COLORS.primaryNeon,
                    opacity: Math.random() > 0.8 ? 0.8 : 0,
                    zIndex: 1,
                }}
            >
                {text}
            </span>
        </div>
    );
};
