import { useCurrentFrame, useVideoConfig, interpolate, Easing } from 'remotion';

export const FileCopyProgress: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    // Progress animation: 0% to 100% over frames 60-300
    const progressFrame = Math.max(0, frame - 60);
    const progress = interpolate(progressFrame, [0, 240], [0, 1], {
        extrapolateRight: 'clamp',
        easing: Easing.linear
    });

    const percentage = Math.floor(progress * 100);
    const progressWidth = interpolate(progress, [0, 1], [0, 400]);

    return (
        <div
            style={{
                position: 'absolute',
                top: '45%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '12px'
            }}
        >
            {/* Progress bar container */}
            <div
                style={{
                    width: '420px',
                    height: '24px',
                    backgroundColor: '#1F2937',
                    borderRadius: '12px',
                    overflow: 'hidden',
                    border: '2px solid #3B82F6',
                    boxShadow: '0 0 20px rgba(59, 130, 246, 0.3)'
                }}
            >
                {/* Progress bar fill */}
                <div
                    style={{
                        width: progressWidth,
                        height: '100%',
                        background: 'linear-gradient(90deg, #3B82F6, #8B5CF6)',
                        borderRadius: '10px'
                    }}
                />
            </div>

            {/* Percentage display */}
            <div
                style={{
                    fontFamily: 'Roboto Mono, monospace',
                    fontSize: '28px',
                    fontWeight: 'bold',
                    color: '#3B82F6',
                    textShadow: '0 0 10px rgba(59, 130, 246, 0.5)'
                }}
            >
                {percentage}%
            </div>

            {/* File count text */}
            <div
                style={{
                    fontFamily: 'Roboto Mono, monospace',
                    fontSize: '14px',
                    color: '#94A3B8'
                }}
            >
                Copying {Math.floor(progress * 247)} of 247 files...
            </div>
        </div>
    );
};
