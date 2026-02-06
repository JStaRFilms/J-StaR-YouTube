import { useCurrentFrame, useVideoConfig, interpolate, spring } from 'remotion';

export const SparkleEffects: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    // Sparkle particles
    const sparkles = Array.from({ length: 20 }).map((_, i) => {
        const delay = 90 + i * 5;
        const sparkleProgress = spring({
            frame: frame - delay,
            fps,
            config: { damping: 15, stiffness: 100 },
        });

        const angle = (i / 20) * Math.PI * 2;
        const distance = 150;
        const x = Math.cos(angle) * distance * sparkleProgress;
        const y = Math.sin(angle) * distance * sparkleProgress;

        const size = 8 + Math.random() * 8;
        const color = ['#F59E0B', '#EF4444', '#FFFFFF', '#3B82F6'][i % 4];

        return { x, y, size, color, delay, progress: sparkleProgress };
    });

    // Opacity fade in
    const opacity = interpolate(frame, [90, 110], [0, 1], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
    });

    return (
        <div
            style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                opacity,
                pointerEvents: 'none',
            }}
        >
            {sparkles.map((sparkle, i) => (
                <div
                    key={i}
                    style={{
                        position: 'absolute',
                        left: sparkle.x,
                        top: sparkle.y,
                        width: sparkle.size,
                        height: sparkle.size,
                        backgroundColor: sparkle.color,
                        borderRadius: '50%',
                        boxShadow: `0 0 ${sparkle.size * 2}px ${sparkle.color}`,
                        opacity: sparkle.progress,
                        transform: `scale(${sparkle.progress})`,
                    }}
                />
            ))}
        </div>
    );
};
