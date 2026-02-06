import { useCurrentFrame, interpolate } from 'remotion';

export const ScanningLine: React.FC = () => {
    const frame = useCurrentFrame();

    // Linear scan from top to bottom across 150 frames
    const scanLineY = interpolate(frame, [0, 150], [-50, 2020], {
        extrapolateRight: 'clamp'
    });

    return (
        <div
            style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '4px',
                transform: `translateY(${scanLineY}px)`,
                background: 'linear-gradient(90deg, transparent, #3B82F6, #8B5CF6, transparent)',
                boxShadow: '0 0 20px #3B82F6, 0 0 40px #8B5CF6',
                zIndex: 10
            }}
        />
    );
};
