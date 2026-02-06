import { useCurrentFrame, interpolate, Easing } from 'remotion';

export const GridBackground: React.FC = () => {
    const frame = useCurrentFrame();

    // Fade in
    const opacity = interpolate(frame, [0, 15], [0, 1], {
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
                backgroundColor: '#111827',
                opacity: opacity,
                backgroundImage: `
					linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
					linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
				`,
                backgroundSize: '60px 60px'
            }}
        />
    );
};
