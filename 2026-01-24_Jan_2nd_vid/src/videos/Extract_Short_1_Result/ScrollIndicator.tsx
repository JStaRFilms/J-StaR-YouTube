import { useCurrentFrame, useVideoConfig, interpolate, Easing } from 'remotion';

const COLORS = {
    primaryNeon: '#3B82F6',
    secondaryNeon: '#8B5CF6',
    textSecondary: '#94A3B8',
};

interface ScrollIndicatorProps {
    direction?: 'down' | 'up';
    label?: string;
}

export const ScrollIndicator: React.FC<ScrollIndicatorProps> = ({
    direction = 'down',
    label = 'Scroll',
}) => {
    const frame = useCurrentFrame();
    const { width, height } = useVideoConfig();

    // Arrow bounce animation: continuous loop
    const bounceY = interpolate(frame % 60, [0, 30, 60], [0, 15, 0], {
        easing: Easing.inOut(Easing.quad),
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
    });

    // Rotate animation for continuous spin
    const rotate = interpolate(frame, [0, 1350], [0, 45], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
    });

    // Opacity fade in/out at edges
    const opacity = interpolate(frame, [0, 50, 1300, 1350], [0, 1, 1, 0], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
    });

    // Position at bottom center with safe zone consideration
    const posY = height - 200;

    return (
        <div
            style={{
                position: 'absolute',
                bottom: `${200 - bounceY}px`,
                left: '50%',
                transform: `translateX(-50%)`,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '8px',
                opacity,
            }}
        >
            {/* Animated arrow */}
            <div
                style={{
                    width: '40px',
                    height: '40px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <svg
                    width="40"
                    height="40"
                    viewBox="0 0 24 24"
                    fill="none"
                    style={{
                        overflow: 'visible',
                        transform: direction === 'down' ? 'rotate(0deg)' : 'rotate(180deg)',
                    }}
                >
                    {/* Outer circle */}
                    <circle
                        cx="12"
                        cy="12"
                        r="10"
                        stroke={COLORS.primaryNeon}
                        strokeWidth="2"
                        fill="transparent"
                        opacity="0.3"
                    />
                    {/* Rotating indicator */}
                    <circle
                        cx="12"
                        cy="12"
                        r="8"
                        fill="transparent"
                        strokeDasharray="30 20"
                        strokeLinecap="round"
                        stroke={COLORS.secondaryNeon}
                        opacity="0.6"
                        style={{
                            transformOrigin: 'center',
                            transform: `rotate(${rotate}deg)`,
                        }}
                    />
                    {/* Arrow path */}
                    <path
                        d="M12 6v12M7 11l5 5 5-5"
                        stroke={COLORS.primaryNeon}
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            </div>

            {/* Label */}
            <span
                style={{
                    fontFamily: 'Roboto Mono, monospace',
                    fontSize: '12px',
                    color: COLORS.textSecondary,
                    letterSpacing: '2px',
                    textTransform: 'uppercase',
                }}
            >
                {label}
            </span>
        </div>
    );
};
