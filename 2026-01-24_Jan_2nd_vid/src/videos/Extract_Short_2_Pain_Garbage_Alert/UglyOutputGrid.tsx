import { useCurrentFrame, useVideoConfig, interpolate, Easing } from 'remotion';

export const UglyOutputGrid: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    // Grid container fade in
    const gridOpacity = interpolate(frame, [0, 30], [0, 1], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
    });

    // Flicker effect
    const flickerOpacity = interpolate(frame, [0, 1350], [1, 1], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
    });

    // Individual glitch shake for each grid item
    const getShake = (offset: number) =>
        interpolate(frame, [offset, offset + 1350], [0, 0], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
        });

    // Ugly output card designs (code-generated)
    const uglyCards = [
        { color1: '#F97316', color2: '#8B5CF6', label: 'Orange/Purple' },
        { color1: '#EC4899', color2: '#22C55E', label: 'Pink/Green' },
        { color1: '#3B82F6', color2: '#EF4444', label: 'Blue/Red' },
        { color1: '#A855F7', color2: '#EAB308', label: 'Purple/Yellow' },
    ];

    return (
        <div
            style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: `translate(-50%, -50%) scale(0.8) opacity(${gridOpacity})`,
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: 20,
                padding: 40,
                backgroundColor: '#111827',
                borderRadius: 16,
                border: '2px solid #EF4444',
            }}
        >
            {uglyCards.map((card, i) => (
                <div
                    key={i}
                    style={{
                        width: 200,
                        height: 200,
                        backgroundColor: card.color1,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        border: `8px solid ${card.color2}`,
                        borderRadius: 8,
                        transform: `translateX(${(Math.random() > 0.95 ? (Math.random() - 0.5) * 15 : 0)}px) translateY(${(Math.random() > 0.95 ? (Math.random() - 0.5) * 15 : 0)}px)`,
                    }}
                >
                    <div
                        style={{
                            width: '80%',
                            height: 20,
                            backgroundColor: '#FFFFFF',
                            marginBottom: 10,
                            borderRadius: 4,
                        }}
                    />
                    <div
                        style={{
                            width: '60%',
                            height: 20,
                            backgroundColor: card.color2,
                            borderRadius: 4,
                        }}
                    />
                    <div
                        style={{
                            position: 'absolute',
                            bottom: -10,
                            right: -10,
                            width: 40,
                            height: 40,
                            backgroundColor: '#EF4444',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: '#FFFFFF',
                            fontWeight: 'bold',
                            fontSize: 24,
                        }}
                    >
                        ✕
                    </div>
                </div>
            ))}
        </div>
    );
};
