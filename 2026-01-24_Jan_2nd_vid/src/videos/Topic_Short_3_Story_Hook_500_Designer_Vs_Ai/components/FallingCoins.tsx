import React from 'react';
import { useCurrentFrame, useVideoConfig, interpolate } from 'remotion';
import { Coins } from 'lucide-react';

interface CoinProps {
    delay: number;
    x: number;
    size: number;
}

const Coin: React.FC<CoinProps> = ({ delay, x, size }) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    // Fall animation
    const fallProgress = interpolate(
        frame - delay,
        [0, 90],
        [-100, 600],
        { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
    );

    // Rotation
    const rotation = (frame - delay) * 3;

    // Bounce effect at bottom
    const bounceFrame = frame - delay - 75;
    const bounceY = bounceFrame > 0 && bounceFrame < 15
        ? -Math.sin((bounceFrame / 15) * Math.PI) * 30
        : 0;

    // Fade out near end
    const opacity = interpolate(frame - delay, [70, 90], [1, 0], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
    });

    const totalY = fallProgress + bounceY;

    if (frame < delay) return null;

    return (
        <div
            style={{
                position: 'absolute',
                left: `${x}px`,
                top: `${totalY}px`,
                transform: `rotate(${rotation}deg)`,
                opacity,
            }}
        >
            <Coins size={size} color="#F59E0B" strokeWidth={2} />
        </div>
    );
};

export const FallingCoins: React.FC = () => {
    const coins: CoinProps[] = [
        { delay: 0, x: 50, size: 48 },
        { delay: 10, x: 150, size: 36 },
        { delay: 20, x: 250, size: 42 },
        { delay: 30, x: 350, size: 32 },
        { delay: 40, x: 100, size: 40 },
        { delay: 50, x: 200, size: 36 },
        { delay: 60, x: 300, size: 44 },
    ];

    return (
        <div
            style={{
                width: '400px',
                height: '500px',
                position: 'relative',
                overflow: 'hidden',
            }}
        >
            {coins.map((coin, index) => (
                <Coin key={index} {...coin} />
            ))}
        </div>
    );
};
