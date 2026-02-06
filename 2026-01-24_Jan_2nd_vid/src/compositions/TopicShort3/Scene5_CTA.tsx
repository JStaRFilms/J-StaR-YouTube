import React, { useMemo } from 'react';
import {
    AbsoluteFill,
    interpolate,
    spring,
    useCurrentFrame,
    useVideoConfig,
    random,
    Img,
    staticFile
} from 'remotion';
import { NeonText } from './components/NeonText';
import { NoiseOverlay } from './components/NoiseOverlay';

const Coin = ({ delay, xPos, speed }: { delay: number; xPos: number; speed: number }) => {
    const frame = useCurrentFrame();
    const { height } = useVideoConfig();

    // Fall animation
    // Starts at -100px (top), falls to height + 100
    const progress = interpolate(frame, [delay, delay + speed], [0, 1]);
    const y = interpolate(progress, [0, 1], [-100, height + 100]);
    const rotate = interpolate(progress, [0, 1], [0, 720]);

    return (
        <div
            className="absolute w-16 h-16 bg-yellow-400 rounded-full border-4 border-yellow-500 flex items-center justify-center shadow-lg text-yellow-700 font-bold text-2xl"
            style={{
                left: `${xPos}%`,
                top: y,
                transform: `rotate(${rotate}deg)`,
                zIndex: 10
            }}
        >
            $
        </div>
    );
};

export const Scene5_CTA: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps, width, height } = useVideoConfig();

    // 1. Coin Rain
    // Generate 30 coins
    const coins = useMemo(() => {
        return new Array(30).fill(0).map((_, i) => {
            return {
                id: i,
                delay: random(i) * 30, // Start within first 1 sec
                xPos: random(i + 100) * 100, // 0-100% width
                speed: 60 + random(i + 200) * 40, // Fall speed between 60-100 frames
            };
        });
    }, []);

    // 2. Graph Animation
    // Simple upward trend
    const graphStart = 15;
    const graphProgress = spring({
        frame: frame - graphStart,
        fps,
        config: { damping: 15 }
    });

    // 3. Text "SAVE $$$"
    const textStart = 30;
    const textScale = spring({
        frame: frame - textStart,
        fps,
        config: { stiffness: 200, damping: 10 }
    });

    // 4. Thumbnail Overlay
    const thumbStart = 60;
    const thumbOpacity = interpolate(frame, [thumbStart, thumbStart + 15], [0, 1]);

    const thumbSpring = spring({
        frame: frame - thumbStart,
        fps,
        config: { damping: 15 }
    });
    const thumbScale = interpolate(thumbSpring, [0, 1], [0.8, 1]);

    return (
        <AbsoluteFill className="bg-white overflow-hidden">
            <NoiseOverlay opacity={0.05} />

            {/* Background Graph */}
            <svg className="absolute bottom-0 left-0 w-full h-[60%] opacity-20" viewBox="0 0 100 100" preserveAspectRatio="none">
                <path
                    d="M0,100 L20,80 L40,85 L60,40 L80,50 L100,10 L100,100 Z"
                    fill="#10B981"
                    style={{
                        transform: `scaleY(${graphProgress})`,
                        transformOrigin: 'bottom'
                    }}
                />
            </svg>

            {/* Coins */}
            {coins.map(coin => (
                <Coin key={coin.id} {...coin} />
            ))}

            {/* Main Text */}
            <div className="absolute top-[20%] w-full flex flex-col items-center z-20">
                <div style={{ transform: `scale(${textScale})` }}>
                    <h1 className="text-8xl font-black text-green-500 drop-shadow-lg tracking-tighter">
                        SAVE $$$
                    </h1>
                </div>
            </div>

            {/* Final CTA Overlay */}
            <div
                className="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-50"
                style={{ opacity: thumbOpacity, pointerEvents: thumbOpacity > 0.5 ? 'auto' : 'none' }}
            >
                <div className="flex flex-col items-center gap-8" style={{ transform: `scale(${thumbScale})` }}>
                    {/* Thumbnail Placeholder */}
                    <div className="w-[600px] h-[340px] bg-gray-800 rounded-xl shadow-2xl overflow-hidden relative border border-gray-700">
                        <Img src={staticFile('assets/youtube_thumbnail_placeholder.png')} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-white/50 font-mono">Thumbnail Placeholder</span>
                        </div>
                    </div>

                    <button className="bg-red-600 text-white text-3xl font-bold px-12 py-4 rounded-full shadow-[0_0_30px_rgba(220,38,38,0.6)] animate-pulse">
                        WATCH NOW
                    </button>
                </div>
            </div>
        </AbsoluteFill>
    );
};
