import { useCurrentFrame, useVideoConfig, interpolate } from 'remotion';

export const ScanlineEffect: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    // Horizontal scroll animation
    const scanlineY = interpolate(frame, [0, fps], [0, 1920], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
    });

    return (
        <div
            style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                pointerEvents: 'none',
                overflow: 'hidden',
            }}
        >
            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
                <div
                    key={i}
                    style={{
                        position: 'absolute',
                        top: (scanlineY + i * 8) % 1920,
                        left: 0,
                        width: '100%',
                        height: 2,
                        backgroundColor: 'rgba(0, 0, 0, 0.3)',
                    }}
                />
            ))}
        </div>
    );
};
