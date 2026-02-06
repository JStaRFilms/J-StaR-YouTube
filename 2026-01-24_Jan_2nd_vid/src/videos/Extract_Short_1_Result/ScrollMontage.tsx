import { useCurrentFrame, useVideoConfig, interpolate } from 'remotion';
import { DesignSystemCard } from './DesignSystemCard';

const COLORS = {
    background: '#111827',
    primaryNeon: '#3B82F6',
    textPrimary: '#FFFFFF',
};

interface ScrollMontageProps {
    cardDelays?: number[];
}

export const ScrollMontage: React.FC<ScrollMontageProps> = ({
    cardDelays = [0, 90, 180, 270, 360, 450],
}) => {
    const frame = useCurrentFrame();
    const { height } = useVideoConfig();

    // Vertical scroll effect: frames 0-1350
    const scrollY = interpolate(frame, [0, 1350], [0, -1200], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
    });

    // Container fade in: frames 0-30
    const containerOpacity = interpolate(frame, [0, 30], [0, 1], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
    });

    const cardTypes: Array<'colors' | 'typography' | 'spacing' | 'shadows' | 'components' | 'buttons'> = [
        'colors',
        'typography',
        'spacing',
        'shadows',
        'components',
        'buttons',
    ];

    return (
        <div
            style={{
                width: '100%',
                height: '100%',
                background: COLORS.background,
                overflow: 'hidden',
                position: 'relative',
                opacity: containerOpacity,
            }}
        >
            {/* Gradient overlays for smooth scroll edges */}
            <div
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '200px',
                    background: `linear-gradient(180deg, ${COLORS.background} 0%, transparent 100%)`,
                    zIndex: 10,
                }}
            />
            <div
                style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: '200px',
                    background: `linear-gradient(0deg, ${COLORS.background} 0%, transparent 100%)`,
                    zIndex: 10,
                }}
            />

            {/* Scrollable content */}
            <div
                style={{
                    transform: `translateY(${scrollY}px)`,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '120px',
                    paddingTop: '400px',
                    paddingBottom: '400px',
                }}
            >
                {cardTypes.map((type, index) => (
                    <DesignSystemCard
                        key={type}
                        type={type}
                        delay={cardDelays[index] || index * 90}
                    />
                ))}
            </div>
        </div>
    );
};
