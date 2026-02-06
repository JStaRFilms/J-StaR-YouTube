import { useCurrentFrame, useVideoConfig, interpolate, Easing } from 'remotion';

interface ProgressBarProps {
    width?: number;
    height?: number;
    color?: string;
    duration?: number;
    startFrame?: number;
    label?: string;
}

export const ProgressBarAnimation: React.FC<ProgressBarProps> = ({
    width = 400,
    height = 12,
    color = '#3B82F6',
    duration = 60,
    startFrame = 0,
    label
}) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    // Progress animation over specified duration
    const progressFrame = Math.max(0, frame - startFrame);
    const progress = interpolate(progressFrame, [0, duration], [0, 1], {
        extrapolateRight: 'clamp',
        easing: Easing.linear
    });

    const barWidth = interpolate(progress, [0, 1], [0, width]);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
            {label && (
                <div
                    style={{
                        fontFamily: 'Roboto Mono, monospace',
                        fontSize: '12px',
                        color: '#94A3B8'
                    }}
                >
                    {label}
                </div>
            )}
            <div
                style={{
                    width: width + 4,
                    height: height + 4,
                    backgroundColor: '#1F2937',
                    borderRadius: (height + 4) / 2,
                    overflow: 'hidden',
                    border: `1px solid ${color}44`
                }}
            >
                <div
                    style={{
                        width: barWidth,
                        height: height,
                        background: `linear-gradient(90deg, ${color}, ${color}88)`,
                        borderRadius: height / 2,
                        transition: 'width 0.1s linear'
                    }}
                />
            </div>
            <div
                style={{
                    fontFamily: 'Roboto Mono, monospace',
                    fontSize: '14px',
                    fontWeight: 'bold',
                    color: color
                }}
            >
                {Math.floor(progress * 100)}%
            </div>
        </div>
    );
};
