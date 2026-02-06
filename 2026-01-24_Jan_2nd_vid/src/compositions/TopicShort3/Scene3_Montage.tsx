import React from 'react';
import {
    AbsoluteFill,
    interpolate,
    spring,
    useCurrentFrame,
    useVideoConfig,
    Series,
    Sequence
} from 'remotion';
import { UI_Card } from './components/UI_Card';
import { NoiseOverlay } from './components/NoiseOverlay';

// Background: High-tech Light Mode (Subtle Grid)
const gridStyle: React.CSSProperties = {
    backgroundImage: `
        linear-gradient(to right, rgba(0,0,0,0.05) 1px, transparent 1px),
        linear-gradient(to bottom, rgba(0,0,0,0.05) 1px, transparent 1px)
    `,
    backgroundSize: '40px 40px',
    backgroundColor: '#fafafa',
};

// Sub-scene 1: Color Palette
const ColorGrid = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const colors = [
        ['#F8FAFC', '#F1F5F9', '#E2E8F0', '#CBD5E1'], // Slate
        ['#EFF6FF', '#DBEAFE', '#BFDBFE', '#93C5FD'], // Blue
        ['#EEF2FF', '#E0E7FF', '#C7D2FE', '#A5B4FC'], // Indigo
    ];

    return (
        <AbsoluteFill className="flex flex-col items-center justify-center gap-4">
            {colors.map((row, rowIndex) => (
                <div key={rowIndex} className="flex gap-4">
                    {row.map((color, colIndex) => {
                        const delay = (rowIndex * 4) + colIndex;
                        const scale = spring({
                            frame: frame - delay,
                            fps,
                            config: { damping: 10, stiffness: 200 }
                        });

                        return (
                            <div
                                key={colIndex}
                                className="w-24 h-24 rounded-2xl shadow-sm border border-black/5"
                                style={{
                                    backgroundColor: color,
                                    transform: `scale(${scale})`
                                }}
                            />
                        );
                    })}
                </div>
            ))}
            <h2 className="text-3xl font-bold text-slate-800 mt-8 tracking-tight font-sans">AUTO-PALETTE</h2>
        </AbsoluteFill>
    );
};

// Sub-scene 2: Typography
const TypeLockup = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const slideLeft = spring({ frame, fps, config: { damping: 12 } });
    const slideRight = spring({ frame: frame - 5, fps, config: { damping: 12 } });

    const leftX = interpolate(slideLeft, [0, 1], [-500, 0]);
    const rightX = interpolate(slideRight, [0, 1], [500, 0]);

    return (
        <AbsoluteFill className="flex flex-col items-center justify-center p-20">
            <div className="flex flex-col gap-8 w-full max-w-4xl">
                {/* Heading Font */}
                <div
                    className="p-8 bg-white rounded-xl shadow-lg border border-gray-100"
                    style={{ transform: `translateX(${leftX}px)` }}
                >
                    <div className="flex justify-between items-center mb-4">
                        <span className="text-sm font-mono text-gray-400">Heading</span>
                        <span className="text-sm font-bold text-blue-600">Outfit</span>
                    </div>
                    <p className="text-6xl font-sans font-bold text-gray-900">Ag</p>
                </div>

                {/* Body Font */}
                <div
                    className="p-8 bg-white rounded-xl shadow-lg border border-gray-100"
                    style={{ transform: `translateX(${rightX}px)` }}
                >
                    <div className="flex justify-between items-center mb-4">
                        <span className="text-sm font-mono text-gray-400">Body</span>
                        <span className="text-sm font-bold text-indigo-600">Inter</span>
                    </div>
                    <p className="text-6xl font-sans text-gray-600">Ag</p>
                </div>
            </div>
        </AbsoluteFill>
    );
};

// Sub-scene 3: Spacing
const SpacingSpec = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const cardScale = spring({ frame, fps });

    // Blinking effect for markers
    const opacity = Math.sin(frame / 3) > 0 ? 1 : 0.5;

    return (
        <AbsoluteFill className="flex items-center justify-center">
            <div className="relative" style={{ transform: `scale(${cardScale})` }}>
                <UI_Card className="w-[500px] h-[300px] flex items-center justify-center bg-white shadow-xl">
                    <div className="w-32 h-10 bg-blue-500 rounded-lg shadow-lg flex items-center justify-center text-white font-bold">
                        Button
                    </div>
                </UI_Card>

                {/* Spacing Markers */}
                {/* Top Padding */}
                <div
                    className="absolute top-0 left-1/2 -translate-x-1/2 h-12 w-px bg-red-400"
                    style={{ height: '48px', top: '40px', opacity }}
                >
                    <span className="absolute left-2 top-1/2 -translate-y-1/2 text-xs font-mono text-red-500 bg-red-50 px-1 rounded">48px</span>
                </div>

                {/* Side Padding */}
                <div
                    className="absolute left-0 top-1/2 -translate-y-1/2 w-12 h-px bg-red-400"
                    style={{ width: '48px', left: '40px', opacity }}
                >
                    <span className="absolute top-2 left-1/2 -translate-x-1/2 text-xs font-mono text-red-500 bg-red-50 px-1 rounded">48px</span>
                </div>

                {/* Corner Markers */}
                <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-red-400" style={{ opacity }} />
                <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-red-400" style={{ opacity }} />
                <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-red-400" style={{ opacity }} />
                <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-red-400" style={{ opacity }} />
            </div>
            <h2 className="absolute bottom-20 text-3xl font-bold text-red-500 tracking-tight font-mono">AUTO-SPACING</h2>
        </AbsoluteFill>
    );
};

export const Scene3_Montage: React.FC = () => {
    return (
        <AbsoluteFill style={gridStyle}>
            <NoiseOverlay opacity={0.03} />
            <Series>
                <Series.Sequence durationInFrames={45}>
                    <ColorGrid />
                </Series.Sequence>
                <Series.Sequence durationInFrames={45}>
                    <TypeLockup />
                </Series.Sequence>
                <Series.Sequence durationInFrames={50}>
                    <SpacingSpec />
                </Series.Sequence>
            </Series>
        </AbsoluteFill>
    );
};

