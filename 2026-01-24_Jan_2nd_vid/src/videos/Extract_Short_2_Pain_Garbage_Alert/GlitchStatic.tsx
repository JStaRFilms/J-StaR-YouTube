import { useCurrentFrame, useVideoConfig, interpolate } from 'remotion';

export const GlitchStatic: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps, width, height } = useVideoConfig();

    // Opacity varies randomly
    const opacity = interpolate(frame, [0, 150], [0, 0.3], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
    });

    // Generate random noise pattern
    const noisePattern = Array.from({ length: 20 }).map((_, i) => ({
        x: (Math.random() * width) % width,
        y: (Math.random() * height) % height,
        w: Math.random() * 200 + 50,
        h: Math.random() * 10 + 2,
    }));

    return (
        <div
            style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                pointerEvents: 'none',
                opacity,
            }}
        >
            {noisePattern.map((rect, i) => (
                <div
                    key={i}
                    style={{
                        position: 'absolute',
                        left: rect.x + (Math.random() > 0.95 ? (Math.random() - 0.5) * 20 : 0),
                        top: rect.y,
                        width: rect.w,
                        height: rect.h,
                        backgroundColor: Math.random() > 0.5 ? '#FFFFFF' : '#000000',
                    }}
                />
            ))}
        </div>
    );
};
