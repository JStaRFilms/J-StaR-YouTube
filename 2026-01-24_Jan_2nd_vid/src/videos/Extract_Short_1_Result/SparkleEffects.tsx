import { useCurrentFrame, useVideoConfig, interpolate, spring } from 'remotion';
import { useMemo } from 'react';

const COLORS = {
    primaryNeon: '#3B82F6',
    secondaryNeon: '#8B5CF6',
    successGreen: '#22C55E',
    gold: '#F59E0B',
};

interface SparkleEffectsProps {
    centerX?: number;
    centerY?: number;
    count?: number;
    radius?: number;
    delay?: number;
}

export const SparkleEffects: React.FC<SparkleEffectsProps> = ({
    centerX = 540,
    centerY = 960,
    count = 8,
    radius = 150,
    delay = 0,
}) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    // Generate random sparkle data
    const sparkles = useMemo(() => {
        return Array.from({ length: count }).map((_, i) => {
            const angle = (i / count) * Math.PI * 2;
            const randomRadius = radius + (Math.random() - 0.5) * radius * 0.5;
            const size = 4 + Math.random() * 8;
            const color = [COLORS.primaryNeon, COLORS.secondaryNeon, COLORS.successGreen, COLORS.gold][
                Math.floor(Math.random() * 4)
            ];
            const offsetAngle = Math.random() * Math.PI * 2;
            const orbitRadius = 30 + Math.random() * 50;
            const orbitSpeed = 0.5 + Math.random() * 1;

            return { angle, randomRadius, size, color, offsetAngle, orbitRadius, orbitSpeed };
        });
    }, [count, radius]);

    // Animation starts at delay
    const animationFrame = Math.max(0, frame - delay);

    // Pop in animation
    const popIn = spring({
        frame: animationFrame,
        fps,
        config: { damping: 12, stiffness: 100 },
    });

    // Continuous sparkle animation
    const sparkleOpacity = interpolate(animationFrame, [0, 20], [0, 1], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
    });

    const twinkle = interpolate(
        Math.sin(animationFrame * 0.2),
        [-1, 1],
        [0.3, 1]
    );

    return (
        <div
            style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                pointerEvents: 'none',
                opacity: sparkleOpacity,
            }}
        >
            {sparkles.map((sparkle, index) => {
                // Orbiting motion
                const orbitX = sparkle.offsetAngle + animationFrame * sparkle.orbitSpeed * 0.02;
                const orbitOffsetX = Math.cos(orbitX) * sparkle.orbitRadius;
                const orbitOffsetY = Math.sin(orbitX) * sparkle.orbitRadius;

                const x = centerX + Math.cos(sparkle.angle) * sparkle.randomRadius * popIn + orbitOffsetX;
                const y = centerY + Math.sin(sparkle.angle) * sparkle.randomRadius * popIn + orbitOffsetY;
                const size = sparkle.size * popIn;
                const opacity = twinkle * popIn;

                return (
                    <div
                        key={index}
                        style={{
                            position: 'absolute',
                            left: x,
                            top: y,
                            width: size,
                            height: size,
                            background: sparkle.color,
                            borderRadius: '50%',
                            boxShadow: `0 0 ${size * 2}px ${sparkle.color}, 0 0 ${size * 4}px ${sparkle.color}66`,
                            opacity,
                            transform: `rotate(${animationFrame * 2}deg)`,
                        }}
                    />
                );
            })}

            {/* Larger starburst effects */}
            {Array.from({ length: 4 }).map((_, index) => {
                const angle = (index / 4) * Math.PI * 2 + animationFrame * 0.01;
                const distance = radius * 0.7 * popIn;
                const x = centerX + Math.cos(angle) * distance;
                const y = centerY + Math.sin(angle) * distance;
                const scale = popIn * (0.5 + Math.sin(animationFrame * 0.1 + index) * 0.5);

                return (
                    <div
                        key={`star-${index}`}
                        style={{
                            position: 'absolute',
                            left: x,
                            top: y,
                            width: 16 * scale,
                            height: 16 * scale,
                            background: 'transparent',
                            opacity: popIn * 0.6,
                        }}
                    >
                        <svg width="16" height="16" viewBox="0 0 24 24" style={{ overflow: 'visible' }}>
                            <path
                                d="M12 2L14.4 9.6L22 12L14.4 14.4L12 22L9.6 14.4L2 12L9.6 9.6L12 2Z"
                                fill={index % 2 === 0 ? COLORS.primaryNeon : COLORS.secondaryNeon}
                            />
                        </svg>
                    </div>
                );
            })}
        </div>
    );
};
