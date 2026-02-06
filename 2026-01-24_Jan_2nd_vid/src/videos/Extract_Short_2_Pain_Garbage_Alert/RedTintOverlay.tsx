import { useCurrentFrame, useVideoConfig, interpolate, Easing } from 'remotion';

export const RedTintOverlay: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    // Pulsing red opacity (0.1 -> 0.3 -> 0.1)
    const redOpacity = interpolate(frame, [0, 75, 150], [0.1, 0.3, 0.1], {
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
                backgroundColor: `rgba(239, 68, 68, ${redOpacity})`,
                pointerEvents: 'none',
            }}
        />
    );
};
