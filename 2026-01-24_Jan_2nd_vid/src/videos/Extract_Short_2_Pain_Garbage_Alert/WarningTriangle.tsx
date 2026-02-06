import { useCurrentFrame, useVideoConfig, interpolate, Easing } from 'remotion';

export const WarningTriangle: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    // Pulsing scale animation
    const triangleScale = interpolate(frame, [0, 75, 150], [1, 1.1, 1], {
        easing: Easing.inOut(Easing.quad),
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
    });

    // Opacity fade in
    const opacity = interpolate(frame, [0, 15], [0, 1], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
    });

    // Exclamation mark slide down
    const exclamationY = interpolate(frame, [0, 20], [-50, 0], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
    });

    return (
        <div
            style={{
                position: 'absolute',
                top: '15%',
                left: '50%',
                transform: `translateX(-50%) scale(${triangleScale})`,
                opacity,
                width: 200,
                height: 200,
            }}
        >
            <svg width="200" height="200" viewBox="0 0 200 200">
                {/* Warning triangle path */}
                <path
                    d="M100 10 L190 170 L10 170 Z"
                    fill="none"
                    stroke="#F59E0B"
                    strokeWidth="8"
                    strokeLinejoin="round"
                />
                {/* Inner fill */}
                <path
                    d="M100 25 L175 160 L25 160 Z"
                    fill="#F59E0B"
                    fillOpacity={0.2}
                />
                {/* Exclamation mark */}
                <rect
                    x="94"
                    y={70 + exclamationY}
                    width="12"
                    height="50"
                    rx="4"
                    fill="#F59E0B"
                />
                <circle
                    cx="100"
                    cy={135 + exclamationY}
                    r="8"
                    fill="#F59E0B"
                />
            </svg>
        </div>
    );
};
