import { useCurrentFrame, useVideoConfig, interpolate, spring } from 'remotion';

interface RejectBadgeProps {
    delay?: number;
}

export const RejectBadge: React.FC<RejectBadgeProps> = ({ delay = 0 }) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    // Scale animation with spring
    const badgeScale = spring({
        frame: frame - delay,
        fps,
        config: { damping: 12, stiffness: 100 },
    });

    // Rotation animation
    const badgeRotation = interpolate(badgeScale, [0, 1], [0, 360]);

    // Opacity fade in
    const opacity = interpolate(frame - delay, [0, 15], [0, 1], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
    });

    return (
        <div
            style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: `translate(-50%, -50%) scale(${badgeScale}) rotate(${badgeRotation}deg)`,
                opacity,
                width: 80,
                height: 80,
                backgroundColor: '#EF4444',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '4px solid #FFFFFF',
            }}
        >
            <span style={{ color: '#FFFFFF', fontSize: 48, fontWeight: 'bold' }}>✕</span>
        </div>
    );
};
