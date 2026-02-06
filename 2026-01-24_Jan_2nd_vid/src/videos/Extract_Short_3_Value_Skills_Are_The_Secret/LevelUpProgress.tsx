import { useCurrentFrame, useVideoConfig, interpolate, Easing } from 'remotion';

export const LevelUpProgress: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    // Level counter animation: 1 → 100 over frames 15-150
    const levelProgress = interpolate(frame, [15, 150], [0, 1], {
        extrapolateRight: 'clamp',
        easing: Easing.linear
    });

    const currentLevel = Math.floor(1 + levelProgress * 99);
    const progressWidth = interpolate(levelProgress, [0, 1], [0, 400]);

    return (
        <div
            style={{
                position: 'absolute',
                top: '30%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '16px'
            }}
        >
            {/* Level number */}
            <div
                style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '72px',
                    fontWeight: '900',
                    color: '#FFFFFF',
                    textShadow: '0 0 30px rgba(59, 130, 246, 0.8)',
                    lineHeight: 1
                }}
            >
                LVL {currentLevel}
            </div>

            {/* Progress bar */}
            <div
                style={{
                    width: '420px',
                    height: '16px',
                    backgroundColor: '#1F2937',
                    borderRadius: '8px',
                    overflow: 'hidden',
                    border: '2px solid #3B82F6'
                }}
            >
                <div
                    style={{
                        width: progressWidth,
                        height: '100%',
                        background: 'linear-gradient(90deg, #3B82F6, #8B5CF6)',
                        borderRadius: '6px'
                    }}
                />
            </div>

            {/* XP progress text */}
            <div
                style={{
                    fontFamily: 'Roboto Mono, monospace',
                    fontSize: '14px',
                    color: '#94A3B8'
                }}
            >
                {Math.floor(levelProgress * 9999)} / 9999 XP
            </div>
        </div>
    );
};
