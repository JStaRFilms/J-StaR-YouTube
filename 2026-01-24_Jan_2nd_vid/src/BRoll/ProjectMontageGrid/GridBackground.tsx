import { AbsoluteFill } from 'remotion';

export const GridBackground = () => {
    return (
        <AbsoluteFill
            style={{
                backgroundColor: '#0a0a0f',
                backgroundSize: '40px 40px',
                backgroundImage: 'linear-gradient(to right, #1e293b 1px, transparent 1px), linear-gradient(to bottom, #1e293b 1px, transparent 1px)',
                opacity: 0.5
            }}
        />
    );
};
