import { useCurrentFrame, useVideoConfig, spring, interpolate } from 'remotion';

export const GlowingDivider: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    // Scale height animation (45-60 frames, offset by scene start = 0-15 frames here)
    const heightScale = spring({
        frame,
        fps,
        config: { damping: 15 },
        durationInFrames: 15,
    });

    const height = heightScale * 1080;

    // Glow pulse animation (45-75 frames)
    const glowIntensity = interpolate(frame, [0, 30], [20, 30], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
    }) + Math.sin(frame * 0.2) * 10;

    // Sparks
    const sparks = Array.from({ length: 12 }, (_, i) => {
        const sparkFrame = frame - 5 - i * 2; // Staggered start
        const isActive = sparkFrame >= 0 && sparkFrame <= 20;
        const progress = isActive ? sparkFrame / 20 : 0;
        const angle = (i / 12) * Math.PI * 2;
        const velocity = 100 + Math.random() * 50;
        const sparkX = Math.cos(angle) * velocity * progress;
        const sparkY = Math.sin(angle) * velocity * progress;
        const opacity = isActive ? 1 - progress : 0;

        return { sparkX, sparkY, opacity, isActive };
    });

    return (
        <div
            style={{
                position: 'absolute',
                left: '50%',
                top: '50%',
                transform: 'translate(-50%, -50%)',
                width: 4,
                height: height,
                pointerEvents: 'none',
            }}
        >
            {/* Main Divider Line */}
            <div
                style={{
                    position: 'absolute',
                    inset: 0,
                    backgroundColor: '#ffffff',
                    boxShadow: `
                        0 0 ${glowIntensity}px ${glowIntensity / 2}px #06b6d4,
                        0 0 ${glowIntensity * 2}px ${glowIntensity}px rgba(6, 182, 212, 0.5)
                    `,
                }}
            />

            {/* Inner Core */}
            <div
                style={{
                    position: 'absolute',
                    left: 1,
                    top: 0,
                    right: 1,
                    bottom: 0,
                    backgroundColor: '#06b6d4',
                    opacity: 0.8,
                }}
            />

            {/* Sparks Container */}
            <div
                style={{
                    position: 'absolute',
                    left: '50%',
                    top: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 0,
                    height: 0,
                }}
            >
                {sparks.map((spark, i) => (
                    <div
                        key={i}
                        style={{
                            position: 'absolute',
                            left: spark.sparkX,
                            top: spark.sparkY,
                            width: 6,
                            height: 6,
                            borderRadius: '50%',
                            backgroundColor: '#06b6d4',
                            boxShadow: '0 0 10px 2px #06b6d4',
                            opacity: spark.opacity,
                            transform: 'translate(-50%, -50%)',
                        }}
                    />
                ))}
            </div>

            {/* Electric Pulse Rings */}
            {frame > 10 && (
                <div
                    style={{
                        position: 'absolute',
                        left: '50%',
                        top: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: 60,
                        height: 60,
                        borderRadius: '50%',
                        border: '2px solid #06b6d4',
                        opacity: Math.max(0, 1 - (frame - 10) / 15),
                        boxShadow: '0 0 20px #06b6d4',
                    }}
                />
            )}
            {frame > 15 && (
                <div
                    style={{
                        position: 'absolute',
                        left: '50%',
                        top: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: 100,
                        height: 100,
                        borderRadius: '50%',
                        border: '2px solid #06b6d4',
                        opacity: Math.max(0, 1 - (frame - 15) / 15),
                        boxShadow: '0 0 20px #06b6d4',
                    }}
                />
            )}
        </div>
    );
};
