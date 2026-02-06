import { useCurrentFrame, interpolate, Easing } from 'remotion';

interface StatItem {
    label: string;
    value: number;
    color: string;
}

const stats: StatItem[] = [
    { label: 'FILES COPIED', value: 247, color: '#3B82F6' },
    { label: 'COMPONENTS', value: 42, color: '#8B5CF6' },
    { label: 'TOKENS', value: 156, color: '#22C55E' }
];

export const StatsCounter: React.FC = () => {
    const frame = useCurrentFrame();

    return (
        <div
            style={{
                position: 'absolute',
                top: '20%',
                left: '50%',
                transform: 'translateX(-50%)',
                display: 'flex',
                gap: '40px'
            }}
        >
            {stats.map((stat, index) => {
                // Staggered counter animation
                const startFrame = 600 + index * 20;
                const progress = interpolate(frame, [startFrame, startFrame + 60], [0, 1], {
                    extrapolateRight: 'clamp',
                    easing: Easing.out(Easing.quad)
                });

                const currentValue = Math.floor(progress * stat.value);

                return (
                    <div
                        key={index}
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            opacity: frame >= startFrame ? 1 : 0,
                            transform: `scale(${frame >= startFrame ? 1 : 0.8})`,
                            transition: 'all 0.3s ease-out'
                        }}
                    >
                        <div
                            style={{
                                fontFamily: 'Inter, sans-serif',
                                fontSize: '36px',
                                fontWeight: '900',
                                color: stat.color,
                                textShadow: `0 0 20px ${stat.color}66`
                            }}
                        >
                            {currentValue}
                        </div>
                        <div
                            style={{
                                fontFamily: 'Roboto Mono, monospace',
                                fontSize: '12px',
                                color: '#94A3B8',
                                marginTop: '4px',
                                letterSpacing: '1px'
                            }}
                        >
                            {stat.label}
                        </div>
                    </div>
                );
            })}
        </div>
    );
};
