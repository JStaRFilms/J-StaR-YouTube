import React from 'react';
import { AbsoluteFill, Series, useVideoConfig } from 'remotion';
import { z } from 'zod';
import { ChapterCard } from './ChapterCard';

// Schema for props validation
export const ChapterCardsSchema = z.object({
    cards: z.array(
        z.object({
            title: z.string(),
            gradientStart: z.string(),
            gradientEnd: z.string(),
            shapeColors: z.array(z.string()),
        })
    ).default([
        {
            title: 'THE MYTH',
            gradientStart: '#ff6b6b',
            gradientEnd: '#feca57',
            shapeColors: ['#ffffff', '#ffe66d', '#ff9f43'],
        },
        {
            title: 'THE FIX',
            gradientStart: '#48dbfb',
            gradientEnd: '#0abde3',
            shapeColors: ['#ffffff', '#c8d6e5', '#00d2d3'],
        },
        {
            title: 'THE PROOF',
            gradientStart: '#1dd1a1',
            gradientEnd: '#10ac84',
            shapeColors: ['#ffffff', '#badc58', '#26de81'],
        },
    ]),
});

type ChapterCardsProps = z.infer<typeof ChapterCardsSchema>;

export const ChapterCards: React.FC<ChapterCardsProps> = ({ cards }) => {
    const { fps } = useVideoConfig();
    const cardDuration = 3 * fps; // 3 seconds per card

    return (
        <AbsoluteFill style={{ backgroundColor: '#000' }}>
            <Series>
                {cards.map((card, index) => (
                    <Series.Sequence key={index} durationInFrames={cardDuration} premountFor={fps}>
                        <ChapterCard
                            title={card.title}
                            gradientStart={card.gradientStart}
                            gradientEnd={card.gradientEnd}
                            shapeColors={card.shapeColors}
                        />
                    </Series.Sequence>
                ))}
            </Series>
        </AbsoluteFill>
    );
};
