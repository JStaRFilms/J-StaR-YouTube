import { useCurrentFrame, interpolate } from 'remotion';

export const TerminalCursor: React.FC = () => {
    const frame = useCurrentFrame();

    // Blinking cursor effect
    const cursorOpacity = Math.sin(frame / 8) > 0 ? 1 : 0;

    return (
        <span
            style={{
                display: 'inline-block',
                width: '8px',
                height: '16px',
                backgroundColor: '#22C55E',
                marginLeft: '4px',
                opacity: cursorOpacity,
                verticalAlign: 'middle'
            }}
        />
    );
};
