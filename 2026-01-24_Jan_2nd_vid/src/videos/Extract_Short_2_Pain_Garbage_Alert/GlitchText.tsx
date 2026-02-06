import { useCurrentFrame, useVideoConfig, interpolate } from 'remotion';

interface GlitchTextProps {
    text: string;
}

export const GlitchText: React.FC<GlitchTextProps> = ({ text }) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    // Random glitch offset
    const glitchIntensity = Math.random() > 0.9 ? (Math.random() - 0.5) * 10 : 0;

    // Text slide in from top
    const textY = interpolate(frame, [15, 45], [-100, 0], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
    });

    // Opacity for reveal
    const opacity = interpolate(frame, [15, 30], [0, 1], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
    });

    // Split text into parts
    const parts = text.split('=');

    return (
        <div
            style={{
                position: 'absolute',
                top: '35%',
                left: '50%',
                transform: `translateX(-50%) translateY(${textY}px) translateX(${glitchIntensity}px)`,
                opacity,
                fontFamily: 'Inter, sans-serif',
                fontWeight: 900,
                fontSize: 72,
                textAlign: 'center',
                whiteSpace: 'nowrap',
            }}
        >
            <span style={{ color: '#FFFFFF' }}>{parts[0]}</span>
            <span style={{ color: '#EF4444', marginLeft: 20, marginRight: 20 }}>=</span>
            <span
                style={{
                    color: '#EF4444',
                    textShadow: `${Math.random() > 0.8 ? 4 : 0}px 0 #3B82F6, ${Math.random() > 0.8 ? -4 : 0}px 0 #EF4444`,
                }}
            >
                {parts[1]}
            </span>
        </div>
    );
};
