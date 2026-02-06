import { AbsoluteFill, random, useVideoConfig } from 'remotion';
import React from 'react';
import { loadFont } from "@remotion/google-fonts/JetBrainsMono";

const { fontFamily } = loadFont();

const TRASH_CONTENT = [
    '<div>center?</div>',
    'float: left;',
    'z-index: 99999;',
    '!important',
    'position: absolute;',
    '<br><br><br>',
    'undefined is not a function',
    'margin-top: -10px;',
];

export const TrashItems: React.FC<{
    opacity: number;
    scale: number;
}> = ({ opacity, scale }) => {
    const { width, height } = useVideoConfig();

    const items = new Array(15).fill(0).map((_, i) => i);

    return (
        <AbsoluteFill style={{ opacity, transform: `scale(${scale})` }}>
            {items.map((i) => {
                const seed = i * 888;
                const x = (width / 2) + ((random(seed) - 0.5) * 400); // Spread around center
                const y = (height / 2) - 100 + ((random(seed + 1) - 0.5) * 300); // Mostly above/around
                const rotation = (random(seed + 2) - 0.5) * 60;
                const content = TRASH_CONTENT[Math.floor(random(seed + 3) * TRASH_CONTENT.length)];
                const fontSize = 14 + random(seed + 4) * 10;

                return (
                    <div
                        key={i}
                        style={{
                            position: 'absolute',
                            left: x,
                            top: y,
                            transform: `rotate(${rotation}deg)`,
                            fontFamily,
                            color: '#4b5563', // Gray-600
                            fontSize,
                            backgroundColor: '#1f2937', // Gray-800
                            padding: '4px 8px',
                            borderRadius: 4,
                            border: '1px solid #374151',
                            opacity: 0.8,
                        }}
                    >
                        {content}
                    </div>
                );
            })}
        </AbsoluteFill>
    );
};
