import React, { useMemo } from 'react';
import { AbsoluteFill, Sequence, useCurrentFrame, useVideoConfig, interpolate, spring } from 'remotion';
import { z } from 'zod';

// --- COMPONENTS ---

// 1. Terminal Typing Effect
const Terminal: React.FC<{ text: string }> = ({ text }) => {
    const frame = useCurrentFrame();
    const charsShown = Math.floor(frame / 2); // Type speed
    const textToShow = text.slice(0, charsShown);
    const cursorVisible = frame % 20 < 10;

    return (
        <div className="font-mono text-4xl text-green-400 p-20 w-full h-full bg-black flex items-center">
            <span className="mr-4 text-gray-500">{">"}</span>
            {textToShow}
            {cursorVisible && <span className="w-6 h-10 bg-green-400 ml-2 inline-block" />}
        </div>
    );
};

// 2. Matrix Rain Effect
const MatrixColumn: React.FC<{ x: number, delay: number, speed: number }> = ({ x, delay, speed }) => {
    const frame = useCurrentFrame();
    const { height } = useVideoConfig();
    const dropY = (frame - delay) * speed;

    // Hex codes recycling
    const hexChars = "0123456789ABCDEF#";
    const chars = useMemo(() => Array.from({ length: 20 }).map(() => hexChars[Math.floor(Math.random() * hexChars.length)]), []);

    if (frame < delay) return null;

    return (
        <div style={{ position: 'absolute', left: `${x}%`, top: dropY, opacity: 0.7 }} className="flex flex-col gap-2">
            {chars.map((char, i) => (
                <span key={i} style={{
                    color: i === chars.length - 1 ? '#fff' : '#0f0',
                    textShadow: i === chars.length - 1 ? '0 0 10px #fff' : 'none',
                    opacity: interpolate(i, [0, chars.length - 1], [0.1, 1])
                }} className="font-mono font-bold text-xl">
                    {char}
                </span>
            ))}
        </div>
    );
};

const MatrixRain: React.FC = () => {
    const columns = useMemo(() => Array.from({ length: 20 }).map((_, i) => ({
        id: i,
        x: i * 5,
        delay: Math.random() * 30,
        speed: 15 + Math.random() * 20
    })), []);

    return (
        <AbsoluteFill className="bg-black overflow-hidden">
            {columns.map(col => <MatrixColumn key={col.id} {...col} />)}

            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10" />
        </AbsoluteFill>
    );
};

// 3. Color Palette Grid (The Result)
const PaletteCard: React.FC<{ color: string, name: string, index: number }> = ({ color, name, index }) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const delay = index * 5;
    const progress = spring({ frame: frame - delay, fps, config: { damping: 12 } });
    const scale = interpolate(progress, [0, 1], [0, 1]);
    const opacity = interpolate(progress, [0, 1], [0, 1]);

    return (
        <div style={{ transform: `scale(${scale})`, opacity, backgroundColor: color }}
            className="w-full h-32 rounded-xl flex items-end p-4 shadow-2xl">
            <span className="font-mono text-white/90 font-bold bg-black/20 px-2 rounded backdrop-blur-sm">{name}</span>
        </div>
    );
};

// --- MAIN COMPOSITION ---

export const designSystemGenSchema = z.object({
    primaryColor: z.string(),
});

export const DesignSystemGen: React.FC<z.infer<typeof designSystemGenSchema>> = ({ primaryColor = "#6366f1" }) => {
    const { fps } = useVideoConfig();

    return (
        <AbsoluteFill className="bg-black text-white">

            {/* SCENE 1: TERMINAL (0s - 2s) */}
            <Sequence from={0} durationInFrames={2 * fps}>
                <Terminal text="init_vibecode_design" />
            </Sequence>

            {/* SCENE 2: MATRIX PROCESSING (1.5s - 4s) - Overlaps slightly */}
            <Sequence from={1.8 * fps} durationInFrames={2.5 * fps}>
                <MatrixRain />
                <AbsoluteFill className="justify-center items-center z-20">
                    <h1 className="text-6xl font-black italic tracking-tighter"
                        style={{
                            textShadow: '0 0 50px rgba(99, 102, 241, 0.8)',
                            transform: `scale(${spring({ frame: useCurrentFrame() - 1.8 * fps, fps })})`
                        }}>
                        GENERATING SYSTEM...
                    </h1>
                </AbsoluteFill>
            </Sequence>

            {/* SCENE 3: RESULT REVEAL (4s - END) */}
            <Sequence from={4 * fps}>
                <AbsoluteFill className="bg-neutral-900 p-10 flex flex-col justify-center">
                    <h2 className="text-4xl font-bold mb-8 text-neutral-400">Tokens Generated</h2>
                    <div className="grid grid-cols-3 gap-6 max-w-4xl w-full mx-auto">
                        <PaletteCard index={0} color={primaryColor} name="Primary" />
                        <PaletteCard index={1} color="#4f46e5" name="Dark" />
                        <PaletteCard index={2} color="#818cf8" name="Light" />
                        <PaletteCard index={3} color="#06b6d4" name="Secondary" />
                        <PaletteCard index={4} color="#f59e0b" name="Accent" />
                        <PaletteCard index={5} color="#10b981" name="Success" />
                    </div>
                </AbsoluteFill>
            </Sequence>

        </AbsoluteFill>
    );
};
