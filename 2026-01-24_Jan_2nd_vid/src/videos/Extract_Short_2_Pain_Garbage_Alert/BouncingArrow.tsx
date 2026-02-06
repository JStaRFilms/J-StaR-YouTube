import { useCurrentFrame, useVideoConfig, interpolate, Easing } from 'remotion';

export const BouncingArrow: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    // Bounce animation (down then up)
    const arrowY = interpolate(frame, [120, 150, 180], [0, 40, 0], {
        easing: Easing.bounce,
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
    });

    // Second bounce
    const arrowY2 = interpolate(frame, [210, 240, 270], [0, 30, 0], {
        easing: Easing.bounce,
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
    });

    // Combine bounces
    const combinedY = frame < 210 ? arrowY : arrowY2;

    // Opacity fade in
    const opacity = interpolate(frame, [120, 135], [0, 1], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
    });

    return (
        <div
            style={{
                position: 'absolute',
                top: '85%',
                left: '50%',
                transform: `translateX(-50%) translateY(${combinedY}px)`,
                opacity,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 8,
            }}
        >
            <svg width="60" height="60" viewBox="0 0 60 60">
                <path
                    d="M30 50 L30 10 M30 10 L10 30 M30 10 L50 30"
                    stroke="#FFFFFF"
                    strokeWidth="6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                />
            </svg>
            <span
                style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: 16,
                    color: '#94A3B8',
                }}
            >
                Check comments
            </span>
        </div>
    );
};
