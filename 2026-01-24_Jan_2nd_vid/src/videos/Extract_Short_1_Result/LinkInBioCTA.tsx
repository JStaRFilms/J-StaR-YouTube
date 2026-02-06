import { useCurrentFrame, useVideoConfig, interpolate, spring, Easing } from 'remotion';
import { SparkleEffects } from './SparkleEffects';

const COLORS = {
    background: '#111827',
    primaryNeon: '#3B82F6',
    secondaryNeon: '#8B5CF6',
    textPrimary: '#FFFFFF',
    textSecondary: '#94A3B8',
    gradientStart: '#3B82F6',
    gradientEnd: '#8B5CF6',
};

interface LinkInBioCTAProps {
    ctaText?: string;
}

export const LinkInBioCTA: React.FC<LinkInBioCTAProps> = ({ ctaText = 'Link in Bio' }) => {
    const frame = useCurrentFrame();
    const { fps, width, height } = useVideoConfig();

    // Blur overlay fade in: frames 180-240
    const blurOpacity = interpolate(frame, [180, 240], [0, 0.8], {
        easing: Easing.inOut(Easing.quad),
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
    });

    // Button slide up + scale: frames 220-260
    const buttonSpring = spring({
        frame: frame - 220,
        fps,
        config: { damping: 12, stiffness: 100 },
    });
    const buttonY = interpolate(buttonSpring, [0, 1], [200, 0], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
    });
    const buttonScale = interpolate(buttonSpring, [0, 1], [0.8, 1], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
    });

    // Glow pulse animation: frames 240-300
    const glowPulse = interpolate(frame, [240, 270, 300], [1, 1.3, 1], {
        easing: Easing.inOut(Easing.quad),
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
    });

    return (
        <div
            style={{
                width: '100%',
                height: '100%',
                background: COLORS.background,
                position: 'relative',
                overflow: 'hidden',
            }}
        >
            {/* Blur overlay */}
            <div
                style={{
                    position: 'absolute',
                    inset: 0,
                    background: `rgba(17, 24, 39, ${blurOpacity})`,
                    backdropFilter: `blur(${blurOpacity * 20}px)`,
                }}
            />

            {/* CTA Button */}
            <div
                style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: `translate(-50%, -50%) translateY(${buttonY}px) scale(${buttonScale})`,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '20px',
                }}
            >
                {/* Main button */}
                <div
                    style={{
                        padding: '24px 48px',
                        background: `linear-gradient(135deg, ${COLORS.gradientStart}, ${COLORS.gradientEnd})`,
                        borderRadius: '16px',
                        boxShadow: `
              0 0 20px ${COLORS.primaryNeon},
              0 0 40px ${COLORS.primaryNeon}66,
              0 0 60px ${COLORS.secondaryNeon}44,
              0 ${20 * glowPulse}px 80px ${COLORS.primaryNeon}33
            `,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '16px',
                    }}
                >
                    {/* Instagram/YouTube finger point icon */}
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" style={{ overflow: 'visible' }}>
                        <path
                            d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"
                            fill="#fff"
                            opacity="0.2"
                        />
                        <path
                            d="M12 4c-1.93 0-3.68.7-5.04 1.86l1.44 1.44C9.07 6.61 10.47 6 12 6c3.31 0 6 2.69 6 6 0 1.53-.39 2.94-1.02 4.1l1.48 1.48C20.3 16.32 22 13.84 22 12c0-5.52-4.48-10-10-10z"
                            fill="#fff"
                        />
                        <circle cx="12" cy="12" r="4" fill="#fff" />
                        <path d="M12 8v8M8 12h8" stroke="#fff" strokeWidth="1" opacity="0.5" />
                    </svg>

                    <span
                        style={{
                            fontFamily: 'Inter, sans-serif',
                            fontSize: '36px',
                            fontWeight: 800,
                            color: '#fff',
                            textTransform: 'uppercase',
                            letterSpacing: '0.05em',
                            textShadow: '0 2px 10px rgba(0,0,0,0.3)',
                        }}
                    >
                        {ctaText}
                    </span>

                    {/* Down arrow indicator */}
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" style={{ overflow: 'visible' }}>
                        <path
                            d="M12 4v12M12 16l-4-4M12 16l4-4"
                            stroke="#fff"
                            strokeWidth="3"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </div>

                {/* Subtitle */}
                <div
                    style={{
                        color: COLORS.textSecondary,
                        fontFamily: 'Roboto Mono, monospace',
                        fontSize: '16px',
                        textAlign: 'center',
                        opacity: blurOpacity,
                    }}
                >
                    Full workflow breakdown waiting for you 👇
                </div>
            </div>

            {/* Sparkle effects around CTA */}
            <SparkleEffects
                centerX={width / 2}
                centerY={height / 2}
                count={12}
                radius={200}
                delay={240}
            />
        </div>
    );
};
