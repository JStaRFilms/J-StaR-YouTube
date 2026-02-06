import { useCurrentFrame, useVideoConfig, interpolate, spring, Easing } from 'remotion';

interface TerminalWindowProps {
    width?: number;
    height?: number;
}

export const TerminalWindow: React.FC<TerminalWindowProps> = ({ width = 800, height = 500 }) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    // Slide down + fade in animation
    const slideProgress = spring({
        frame: frame - 0,
        fps,
        config: { damping: 20, stiffness: 100 }
    });
    const translateY = interpolate(slideProgress, [0, 1], [-100, 0]);
    const opacity = interpolate(frame, [0, 15, 30], [0, 0, 1], {
        extrapolateRight: 'clamp'
    });

    // Header bar width animation
    const headerProgress = spring({
        frame: frame - 15,
        fps,
        config: { damping: 15, stiffness: 150 }
    });
    const headerWidth = interpolate(headerProgress, [0, 1], [0, width]);

    return (
        <div
            style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: `translate(-50%, -50%) translateY(${translateY}px)`,
                width: width,
                height: height,
                opacity: opacity,
                borderRadius: '8px',
                overflow: 'hidden',
                boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5), 0 0 40px rgba(59, 130, 246, 0.2)'
            }}
        >
            {/* Header bar */}
            <div
                style={{
                    width: headerWidth,
                    height: '36px',
                    background: 'linear-gradient(180deg, #3B82F6 0%, #2563EB 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    paddingLeft: '12px',
                    gap: '8px'
                }}
            >
                {/* Window controls */}
                <div style={{ display: 'flex', gap: '6px' }}>
                    <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#EF4444' }} />
                    <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#F59E0B' }} />
                    <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#22C55E' }} />
                </div>
                {/* Terminal title */}
                <div
                    style={{
                        marginLeft: '12px',
                        color: 'white',
                        fontSize: '13px',
                        fontFamily: 'Roboto Mono, monospace',
                        opacity: 0.9
                    }}
                >
                    root@design-system:~/design-system-output
                </div>
            </div>

            {/* Content area */}
            <div
                style={{
                    width: '100%',
                    height: height - 36,
                    backgroundColor: '#0D1117',
                    padding: '16px',
                    fontFamily: 'Roboto Mono, monospace',
                    fontSize: '14px',
                    color: '#22C55E',
                    lineHeight: '1.6'
                }}
            >
                <span style={{ color: '#3B82F6' }}>$</span> ./install-design-system.sh
                <br />
                <span style={{ color: '#22C55E' }}>Initializing installation...</span>
                <br />
                <span style={{ color: '#94A3B8' }}>[</span>
                <span style={{ color: '#F59E0B' }}>INFO</span>
                <span style={{ color: '#94A3B8' }}>]</span> Parsing design tokens...
            </div>
        </div>
    );
};
