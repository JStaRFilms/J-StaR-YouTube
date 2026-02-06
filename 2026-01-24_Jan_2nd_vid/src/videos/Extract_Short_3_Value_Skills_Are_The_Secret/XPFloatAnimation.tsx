import { useCurrentFrame, interpolate, Easing } from 'remotion';

export const XPFloatAnimation: React.FC = () => {
    const frame = useCurrentFrame();

    // Float up animation: frames 165-210
    const floatProgress = interpolate(frame, [165, 210], [0, 1], {
        extrapolateRight: 'clamp',
        easing: Easing.out(Easing.quad)
    });

    const yOffset = interpolate(floatProgress, [0, 1], [0, -80]);
    const opacity = interpolate(floatProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
    const scale = interpolate(floatProgress, [0, 0.2, 1], [0.5, 1.2, 1]);

    return (
        <div
            style={{
                position: 'absolute',
                top: '38%',
                left: '50%',
                transform: `translate(-50%, -50%) scale(${scale}) translateY(${yOffset}px)`,
                opacity: opacity,
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
            }}
        >
            <div
                style={{
                    background: 'linear-gradient(135deg, #F59E0B, #EF4444)',
                    padding: '8px 16px',
                    borderRadius: '20px',
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '24px',
                    fontWeight: '900',
                    color: '#FFFFFF',
                    boxShadow: '0 4px 20px rgba(245, 158, 11, 0.5)',
                    whiteSpace: 'nowrap'
                }}
            >
                +999 XP
            </div>
            <span style={{ fontSize: '32px' }}>⚡</span>
        </div>
    );
};
