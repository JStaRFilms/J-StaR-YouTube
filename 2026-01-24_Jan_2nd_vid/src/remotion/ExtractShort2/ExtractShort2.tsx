import { AbsoluteFill, Sequence, staticFile, Audio } from 'remotion';
import { z } from 'zod';
import { CodeTrashScene } from './scenes/CodeTrashScene';
import { UglyAuditScene } from './scenes/UglyAuditScene';
import { CtaLootBoxScene } from './scenes/CtaLootBoxScene';

export const ExtractShort2Schema = z.object({
    logo: z.string().optional(),
});

export const ExtractShort2 = () => {
    // 5s Hook + 45s Meat + 10s CTA = 60s Total
    // 30fps -> 150 + 1350 + 300 = 1800 frames

    return (
        <AbsoluteFill style={{ backgroundColor: '#000000' }}>

            {/* Audio Tracks (Placeholders) */}
            {/* <Audio src={staticFile('audio/hook_trash.mp3')} startFrom={0} endAt={150} /> */}
            {/* <Audio src={staticFile('audio/meat_ugly.mp3')} startFrom={150} endAt={1500} /> */}
            {/* <Audio src={staticFile('audio/cta_tutorial.mp3')} startFrom={1500} /> */}

            {/* Scene 1: The Hook (Garbage Alert) */}
            <Sequence durationInFrames={150}>
                <CodeTrashScene />
            </Sequence>

            {/* Scene 2: The Meat (Ugly UI) */}
            <Sequence from={150} durationInFrames={1350}>
                <UglyAuditScene />
            </Sequence>

            {/* Scene 3: The CTA (Free Fix) */}
            <Sequence from={1500} durationInFrames={300}>
                <CtaLootBoxScene />
            </Sequence>

        </AbsoluteFill>
    );
};
