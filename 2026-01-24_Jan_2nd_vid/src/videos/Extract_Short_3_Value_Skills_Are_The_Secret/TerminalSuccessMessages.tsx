import { useCurrentFrame, interpolate, Easing } from 'remotion';

const successMessages = [
    '✓ Folder structure created',
    '✓ Design tokens parsed',
    '✓ Components generated',
    '✓ SUCCESS: Full system ready'
];

export const TerminalSuccessMessages: React.FC = () => {
    const frame = useCurrentFrame();

    return (
        <div
            style={{
                position: 'absolute',
                bottom: '15%',
                left: '50%',
                transform: 'translateX(-50%)',
                fontFamily: 'Roboto Mono, monospace',
                fontSize: '16px',
                lineHeight: '2',
                textAlign: 'left'
            }}
        >
            {successMessages.map((message, index) => {
                // Staggered typewriter effect
                const startFrame = 480 + index * 30;
                const endFrame = startFrame + 60;

                const typeProgress = interpolate(frame, [startFrame, endFrame], [0, 1], {
                    extrapolateRight: 'clamp',
                    easing: Easing.linear
                });

                const displayText = message.slice(0, Math.floor(typeProgress * message.length));
                const isComplete = typeProgress >= 1;

                return (
                    <div
                        key={index}
                        style={{
                            color: isComplete ? '#22C55E' : '#94A3B8',
                            opacity: frame >= startFrame ? 1 : 0,
                            transform: `translateX(${isComplete ? 0 : -10}px)`,
                            transition: 'all 0.2s ease-out'
                        }}
                    >
                        {displayText}
                        {isComplete && index === successMessages.length - 1 && (
                            <span style={{ marginLeft: '8px', animation: 'pulse 1s infinite' }}>🎉</span>
                        )}
                    </div>
                );
            })}
        </div>
    );
};
