import { useCurrentFrame, useVideoConfig, interpolate, spring } from 'remotion';

export const GiftBox3D: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    // Box base scale in
    const boxScale = spring({
        frame: frame - 15,
        fps,
        config: { damping: 12, stiffness: 100 },
    });

    // Lid slide up animation
    const lidY = interpolate(frame, [30, 60], [0, -200], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
        easing: (t) => t * t,
    });

    // Lid rotation (pseudo-3D)
    const lidRotation = interpolate(frame, [30, 60], [0, -120], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
    });

    // Ribbon appear
    const ribbonOpacity = interpolate(frame, [45, 75], [0, 1], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
    });

    return (
        <div
            style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: `translate(-50%, -50%) scale(${boxScale})`,
                width: 200,
                height: 200,
                perspective: 1000,
            }}
        >
            {/* Box Base */}
            <div
                style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    width: 200,
                    height: 150,
                    backgroundColor: '#F59E0B',
                    border: '4px solid #B45309',
                    borderRadius: '0 0 8px 8px',
                    transformStyle: 'preserve-3d',
                }}
            >
                {/* Box front face */}
                <div
                    style={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        width: 200,
                        height: 150,
                        backgroundColor: '#F59E0B',
                        border: '4px solid #B45309',
                    }}
                />
                {/* Vertical ribbon on box */}
                <div
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: '50%',
                        transform: 'translateX(-50%)',
                        width: 30,
                        height: '100%',
                        backgroundColor: '#EF4444',
                        opacity: ribbonOpacity,
                    }}
                />
            </div>

            {/* Box Lid */}
            <div
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: 200,
                    height: 50,
                    transform: `translateY(${lidY}px) rotateX(${lidRotation}deg)`,
                    transformOrigin: 'bottom center',
                    backgroundColor: '#F59E0B',
                    border: '4px solid #B45309',
                    borderRadius: '8px 8px 0 0',
                    transformStyle: 'preserve-3d',
                }}
            >
                {/* Lid ribbon */}
                <div
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: '50%',
                        transform: 'translateX(-50%)',
                        width: 30,
                        height: '100%',
                        backgroundColor: '#EF4444',
                        opacity: ribbonOpacity,
                    }}
                />
                {/* Lid top ribbon (bow hint) */}
                <div
                    style={{
                        position: 'absolute',
                        top: -20,
                        left: '50%',
                        transform: 'translateX(-50%)',
                        width: 60,
                        height: 30,
                        backgroundColor: '#EF4444',
                        borderRadius: '50%',
                        opacity: ribbonOpacity,
                    }}
                />
            </div>
        </div>
    );
};
