import { AbsoluteFill, Series } from 'remotion';
import { z } from 'zod';
import { SlowFlashIntro } from './SlowFlashIntro';
import { RapidToggle } from './RapidToggle';
import { BeautifulVictory } from './BeautifulVictory';

export const UglyBeautifulFlashSchema = z.object({
    uglyImageSrc: z.string().optional(),
    beautifulImageSrc: z.string().optional(),
    victoryText: z.string().default("First Try."),
});

export const UglyBeautifulFlash: React.FC<z.infer<typeof UglyBeautifulFlashSchema>> = () => {
    return (
        <AbsoluteFill style={{ backgroundColor: 'black' }}>
            <Series>
                {/* Scene 1: Slow Flash Intro (0s - 1s, 30 frames) */}
                <Series.Sequence durationInFrames={30}>
                    <SlowFlashIntro />
                </Series.Sequence>

                {/* Scene 2: Rapid Toggle (1s - 2.5s, 45 frames) */}
                <Series.Sequence durationInFrames={45}>
                    <RapidToggle />
                </Series.Sequence>

                {/* Scene 3: Beautiful Victory (2.5s - 3s, 15 frames + hold) */}
                <Series.Sequence durationInFrames={30}> {/* Extend slightly for lingering feeling */}
                    <BeautifulVictory />
                </Series.Sequence>
            </Series>
        </AbsoluteFill>
    );
};
