import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate } from 'remotion';
import { FallingCoins } from './components/FallingCoins';
import { SavingsGraph } from './components/SavingsGraph';
import { CTACard } from './components/CTACard';

const LIGHT_BG_COLOR = '#F8FAFC';

export const Scene5_SavingsCTA: React.FC = () => {
    const frame = useCurrentFrame();

    // Layout transition
    const coinsOpacity = interpolate(frame, [0, 60], [1, 0], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
    });

    const graphOpacity = interpolate(frame, [30, 50], [0, 1], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
    });

    // SAVE $$$ text scale animation
    const saveScale = interpolate(frame, [30, 50], [0.5, 1], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
    });

    // CTA Card slide up from bottom center
    const cardY = interpolate(frame, [50, 70], [100, 0], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
    });

    return (
        <AbsoluteFill
            style={{
                backgroundColor: LIGHT_BG_COLOR,
            }}
        >
            {/* Falling Coins - full background */}
            <div
                style={{
                    position: 'absolute',
                    inset: 0,
                    opacity: coinsOpacity,
                }}
            >
                <FallingCoins />
            </div>

            {/* Main content - centered */}
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '100%',
                    paddingBottom: '400px', // Safe zone
                }}
            >
                {/* SAVE $$$ - large prominent text */}
                <div
                    style={{
                        fontSize: '72px',
                        fontWeight: '900',
                        color: '#F59E0B',
                        fontFamily: 'Inter, sans-serif',
                        textShadow: '0 0 40px rgba(245, 158, 11, 0.6)',
                        transform: `scale(${saveScale})`,
                        marginBottom: '40px',
                    }}
                >
                    SAVE $$$
                </div>

                {/* Savings Graph */}
                <div
                    style={{
                        opacity: graphOpacity,
                        transform: `translateX(${interpolate(frame, [30, 50], [-50, 0], { extrapolateRight: 'clamp' })}px)`,
                        marginBottom: '40px',
                    }}
                >
                    <SavingsGraph />
                </div>

                {/* CTA Card - slides up from bottom center */}
                <div
                    style={{
                        transform: `translateY(${cardY}px)`,
                    }}
                >
                    <CTACard />
                </div>
            </div>
        </AbsoluteFill>
    );
};
