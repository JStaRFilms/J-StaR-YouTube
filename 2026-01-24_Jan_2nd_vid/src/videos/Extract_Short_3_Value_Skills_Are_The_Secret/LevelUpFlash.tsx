import { useCurrentFrame, interpolate, Easing } from 'remotion';

export const LevelUpFlash: React.FC = () => {
    const frame = useCurrentFrame();

    // White flash effect: frames 150-165
    const flashOpacity = interpolate(frame, [150, 165], [1, 0], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
        easing: Easing.out(Easing.quad)
    });

    return (
        <div
            style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundColor: '#FFFFFF',
                opacity: flashOpacity,
                pointerEvents: 'none'
            }}
        />
    );
};
