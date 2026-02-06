import { useCurrentFrame, useVideoConfig, interpolate, Easing } from 'remotion';

interface GradientBackgroundProps {
    startColor?: string;
    endColor?: string;
}

export const GradientBackground: React.FC<GradientBackgroundProps> = ({
    startColor = '#EF4444', // Red
    endColor = '#8B5CF6',   // Purple
}) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    // Smooth color transition (red to purple)
    const colorMix = interpolate(frame, [0, 30], [0, 1], {
        easing: Easing.inOut(Easing.quad),
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
    });

    return (
        <div
            style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                background: `linear-gradient(180deg, ${startColor} 0%, ${endColor} 100%)`,
                opacity: 1,
            }}
        />
    );
};
