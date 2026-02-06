import { useCurrentFrame, useVideoConfig, interpolate, spring, Easing } from 'remotion';

const COLORS = {
    primaryNeon: '#3B82F6',
    secondaryNeon: '#8B5CF6',
    textPrimary: '#FFFFFF',
    successGreen: '#22C55E',
    gold: '#F59E0B',
};

type BadgeType = '4K' | 'PRO' | 'READY' | 'EXPORT';

interface QualityBadgeProps {
    type?: BadgeType;
    delay?: number;
}

export const QualityBadge: React.FC<QualityBadgeProps> = ({ type = '4K', delay = 60 }) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    // Spring animation for scale 0 -> 1
    const scaleSpring = spring({
        frame: frame - delay,
        fps,
        config: { damping: 12, stiffness: 100 },
    });

    const opacity = interpolate(frame, [delay, delay + 30], [0, 1], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
    });

    const scale = interpolate(scaleSpring, [0, 1], [0, 1], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
    });

    // Glow pulse animation
    const glowPulse = interpolate(frame, [delay + 30, delay + 80, delay + 130], [1, 1.2, 1], {
        easing: (t) => Easing.inOut(Easing.quad)(t % 1),
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
    });

    const getBadgeConfig = (badgeType: BadgeType) => {
        switch (badgeType) {
            case '4K':
                return {
                    label: '4K READY',
                    gradient: `linear-gradient(135deg, ${COLORS.primaryNeon}, ${COLORS.secondaryNeon})`,
                    icon: (
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <rect x="4" y="4" width="16" height="16" rx="2" stroke="#fff" strokeWidth="2" />
                            <text x="12" y="15" textAnchor="middle" fill="#fff" fontSize="8" fontWeight="bold">
                                4K
                            </text>
                        </svg>
                    ),
                };
            case 'PRO':
                return {
                    label: 'PRO',
                    gradient: `linear-gradient(135deg, ${COLORS.gold}, ${COLORS.successGreen})`,
                    icon: (
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path
                                d="M12 2L15 8.5L22 9.5L17 14.5L18 21.5L12 18.5L6 21.5L7 14.5L2 9.5L9 8.5L12 2Z"
                                fill="#fff"
                            />
                        </svg>
                    ),
                };
            case 'READY':
                return {
                    label: 'READY',
                    gradient: `linear-gradient(135deg, ${COLORS.successGreen}, ${COLORS.primaryNeon})`,
                    icon: (
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <circle cx="12" cy="12" r="10" stroke="#fff" strokeWidth="2" />
                            <path
                                d="M8 12l3 3 5-5"
                                stroke="#fff"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    ),
                };
            case 'EXPORT':
                return {
                    label: 'EXPORT',
                    gradient: `linear-gradient(135deg, ${COLORS.secondaryNeon}, ${COLORS.primaryNeon})`,
                    icon: (
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path
                                d="M12 3v13M12 16l-4-4M12 16l4-4M4 21h16"
                                stroke="#fff"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    ),
                };
            default:
                return {
                    label: badgeType,
                    gradient: `linear-gradient(135deg, ${COLORS.primaryNeon}, ${COLORS.secondaryNeon})`,
                    icon: null,
                };
        }
    };

    const config = getBadgeConfig(type);

    return (
        <div
            style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 16px',
                background: config.gradient,
                borderRadius: '8px',
                transform: `scale(${scale})`,
                opacity,
                boxShadow: `0 0 20px ${COLORS.primaryNeon}66, 0 0 40px ${COLORS.primaryNeon}33, 0 ${10 * glowPulse}px 30px ${COLORS.primaryNeon}22`,
            }}
        >
            {config.icon}
            <span
                style={{
                    fontFamily: 'Roboto Mono, monospace',
                    fontSize: '14px',
                    fontWeight: 700,
                    color: '#fff',
                    letterSpacing: '1px',
                }}
            >
                {config.label}
            </span>
        </div>
    );
};
