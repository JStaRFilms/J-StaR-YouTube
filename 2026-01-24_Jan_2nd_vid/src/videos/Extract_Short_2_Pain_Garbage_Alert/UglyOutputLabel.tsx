import { useCurrentFrame, useVideoConfig, interpolate } from 'remotion';

export const UglyOutputLabel: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    // Typewriter effect
    const fullText = 'UGLY OUTPUT';
    const charsToShow = Math.floor(interpolate(frame, [15, 45], [0, fullText.length], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
    }));

    const displayedText = fullText.substring(0, charsToShow);

    // Scale animation
    const labelScale = interpolate(frame, [15, 30], [0.8, 1], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
    });

    return (
        <div
            style={{
                position: 'absolute',
                top: '10%',
                left: '50%',
                transform: `translateX(-50%) scale(${labelScale})`,
                backgroundColor: '#EF4444',
                padding: '16px 48px',
                fontFamily: 'Inter, sans-serif',
                fontWeight: 900,
                fontSize: 32,
                color: '#FFFFFF',
                textTransform: 'uppercase',
                letterSpacing: 4,
                whiteSpace: 'nowrap',
            }}
        >
            {displayedText}
            <span style={{ animation: 'blink 0.5s infinite' }}>|</span>
        </div>
    );
};
