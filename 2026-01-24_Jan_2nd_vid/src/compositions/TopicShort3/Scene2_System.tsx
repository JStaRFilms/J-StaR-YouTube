import React from 'react';
import {
    AbsoluteFill,
    interpolate,
    spring,
    useCurrentFrame,
    useVideoConfig,
} from 'remotion';
import { Brain, PenTool, Zap, Hexagon, CircuitBoard } from 'lucide-react';
import { NeonText } from './components/NeonText';
import { NoiseOverlay } from './components/NoiseOverlay';

export const Scene2_System: React.FC<{ progress?: number }> = ({ progress = 100 }) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    // Background: High-tech Light Mode
    const bgStyle: React.CSSProperties = {
        backgroundColor: '#ffffff',
        backgroundImage: 'radial-gradient(#e2e8f0 1.5px, transparent 1.5px)',
        backgroundSize: '24px 24px',
    };

    // 1. Icon Animation (Rotate & Scale In)
    const iconScale = spring({
        frame,
        fps,
        config: { damping: 15 },
    });

    // Rotate ring
    const rotation = interpolate(frame, [0, 200], [0, 180]); // Slow, premium rotation

    // 2. Progress Bar
    const progressFill = interpolate(frame, [10, 80], [0, 100], {
        extrapolateRight: 'clamp',
        easing: (t) => t * (2 - t), // Ease out
    });

    // 3. Text Flash "SYSTEM ONLINE"
    const textStartFrame = 85;
    const textScale = spring({
        frame: frame - textStartFrame,
        fps,
        config: { damping: 12, stiffness: 200 },
    });

    // Flashing bloom effect
    const textBloom = interpolate(frame - textStartFrame, [0, 10, 20, 60], [0, 1, 0.6, 0.8], {
        extrapolateLeft: 'clamp',
    });

    // Opacity flicker
    const flicker = Math.random() > 0.95 ? 0.8 : 1;
    const textOpacity = interpolate(frame - textStartFrame, [0, 5], [0, 1], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
    });

    const showText = frame > textStartFrame;

    return (
        <AbsoluteFill style={bgStyle} className="flex flex-col items-center justify-center">
            <NoiseOverlay opacity={0.04} />

            {/* Center Piece: Glass Orb Container */}
            <div className="relative mb-24 scale-150 transform" style={{ transform: `scale(${iconScale * 2})` }}>

                {/* Outer Spinning Ring */}
                <div
                    className="absolute inset-0 rounded-full border border-dashed border-blue-200 w-48 h-48 -m-12 opacity-50"
                    style={{ transform: `rotate(${rotation}deg)` }}
                />

                {/* Inner Spinning Ring */}
                <div
                    className="absolute inset-0 rounded-full border-2 border-blue-100 border-t-blue-500 w-40 h-40 -m-8"
                    style={{ transform: `rotate(-${rotation * 1.5}deg)` }}
                />

                {/* Glass Orb */}
                <div className="w-24 h-24 rounded-full flex items-center justify-center relative z-10 backdrop-blur-md bg-white/60 border border-white/50 shadow-[0_8px_32px_rgba(59,130,246,0.15)]">

                    {/* Background Circuit */}
                    <CircuitBoard className="absolute w-16 h-16 text-blue-50 opacity-50" />

                    {/* Primary Icon Cluster */}
                    <div className="relative">
                        <Brain className="w-10 h-10 text-slate-800 relative z-10 drop-shadow-sm" />
                        <div className="absolute -right-4 -bottom-3 bg-white p-1.5 rounded-full shadow-lg border border-blue-100">
                            <PenTool className="w-5 h-5 text-blue-600" />
                        </div>
                        <div className="absolute -left-4 -top-3 bg-blue-600 p-1.5 rounded-full shadow-lg border border-blue-500">
                            <Zap className="w-4 h-4 text-white" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Progress Bar Container */}
            <div className="w-[40%] text-center mb-12">
                <div className="flex justify-between text-xs font-mono font-bold text-blue-900/40 mb-2 px-1 tracking-widest uppercase">
                    <span>Analysis</span>
                    <span>{Math.round(progressFill)}%</span>
                </div>
                <div className="h-2 bg-slate-100 rounded-full overflow-hidden relative shadow-inner">
                    <div
                        className="h-full bg-blue-600 rounded-full"
                        style={{
                            width: `${progressFill}%`,
                            boxShadow: '0 0 15px rgba(37, 99, 235, 0.6)' // Glow
                        }}
                    />
                </div>
            </div>

            {/* SYSTEM ONLINE Text */}
            <div
                className="relative"
                style={{
                    opacity: showText ? textOpacity * flicker : 0,
                    transform: `scale(${showText ? textScale : 0.8})`
                }}
            >
                <div className="absolute inset-0 blur-xl bg-blue-400/30 rounded-full scale-150" style={{ opacity: textBloom }} />
                <NeonText
                    text="SYSTEM ONLINE"
                    className="text-7xl font-sans font-black tracking-tighter text-slate-900 relative z-10"
                    color="#000000" // Text is dark
                    glowColor="rgba(59,130,246,0.8)" // Glow is blue
                />
            </div>

        </AbsoluteFill>
    );
};

