import { useCurrentFrame, useVideoConfig, interpolate, spring } from 'remotion';

export const SourceFolderIcon: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    // Scale bounce animation at frames 30-60
    const scaleProgress = spring({
        frame: frame - 30,
        fps,
        config: { damping: 12, stiffness: 150 }
    });
    const scale = interpolate(scaleProgress, [0, 0.5, 1], [0.8, 1.1, 1]);

    // Opacity fade in
    const opacity = interpolate(frame, [0, 30, 45], [0, 0, 1], {
        extrapolateRight: 'clamp'
    });

    return (
        <div
            style={{
                position: 'absolute',
                top: '15%',
                left: '50%',
                transform: `translate(-50%, 0) scale(${scale})`,
                opacity: opacity,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
            }}
        >
            {/* Folder SVG */}
            <svg width="80" height="64" viewBox="0 0 80 64" fill="none">
                <path
                    d="M4 12C4 8.686 6.686 6 10 6H36L42 12H76C78.209 12 80 13.791 80 16V56C80 58.209 78.209 60 76 60H4C1.791 60 0 58.209 0 56V16C0 13.791 1.791 12 4 12Z"
                    fill="#3B82F6"
                />
                <path
                    d="M4 16C4 13.791 5.791 12 8 12H34L40 18H76C78.209 18 80 16.209 80 14V12C80 9.791 78.209 8 76 8H10C6.686 8 4 10.686 4 14V16Z"
                    fill="#60A5FA"
                />
                {/* Document icon inside folder */}
                <rect x="28" y="28" width="24" height="28" rx="2" fill="#1E293B" />
                <path d="M32 32H48V36H32V32Z" fill="#3B82F6" />
                <path d="M32 40H44V44H32V40Z" fill="#3B82F6" />
                <path d="M32 48H40V52H32V48Z" fill="#3B82F6" />
            </svg>
            <div
                style={{
                    marginTop: '8px',
                    color: '#3B82F6',
                    fontFamily: 'Roboto Mono, monospace',
                    fontSize: '14px',
                    background: 'rgba(59, 130, 246, 0.1)',
                    padding: '4px 12px',
                    borderRadius: '4px',
                    border: '1px solid rgba(59, 130, 246, 0.3)'
                }}
            >
                /design-system-output
            </div>
        </div>
    );
};
