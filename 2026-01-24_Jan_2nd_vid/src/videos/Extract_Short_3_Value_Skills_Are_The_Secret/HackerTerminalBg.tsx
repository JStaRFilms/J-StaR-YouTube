import { useCurrentFrame, interpolate, Easing } from 'remotion';

export const HackerTerminalBg: React.FC = () => {
    const frame = useCurrentFrame();

    // Fade in background
    const bgOpacity = interpolate(frame, [0, 30], [0, 1], {
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
                backgroundColor: '#0D1117',
                opacity: bgOpacity,
                backgroundImage: `
					linear-gradient(rgba(31, 41, 55, 0.3) 1px, transparent 1px),
					linear-gradient(90deg, rgba(31, 41, 55, 0.3) 1px, transparent 1px)
				`,
                backgroundSize: '40px 40px'
            }}
        />
    );
};
