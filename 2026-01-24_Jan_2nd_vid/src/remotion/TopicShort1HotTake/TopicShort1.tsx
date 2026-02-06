import { AbsoluteFill, Sequence, Audio, staticFile } from "remotion";
import { z } from "zod";
import { Scene1Hook } from "./Scene1Hook";
import { Scene2Mistake } from "./Scene2Mistake";
import { Scene3Confusion } from "./Scene3Confusion";
import { Scene4Solution } from "./Scene4Solution";
import { Scene5Result } from "./Scene5Result";
import { Scene6Outro } from "./Scene6Outro";

export const topicShort1Schema = z.object({
    primaryColor: z.string().default('#EA580C'), // Terra-600
    secondaryColor: z.string().default('#65A30D'), // Sage-600
    backgroundColor: z.string().default('#FDFCFB'), // Sand-50
    textColor: z.string().default('#1C1917'), // Stone-900
});

export const TopicShort1: React.FC<z.infer<typeof topicShort1Schema>> = ({
    primaryColor,
    secondaryColor,
    backgroundColor,
    textColor
}) => {
    // 30 FPS
    return (
        <AbsoluteFill style={{ backgroundColor }}>

            {/* Scene 1: Hook (0s - 3s) -> 0 - 90 */}
            <Sequence from={0} durationInFrames={90} premountFor={30}>
                <Scene1Hook />
            </Sequence>

            {/* Scene 2: Mistake (3s - 6s) -> 90 - 90 */}
            <Sequence from={90} durationInFrames={90} premountFor={30}>
                <Scene2Mistake />
            </Sequence>

            {/* Scene 3: Confusion (6s - 10s) -> 180 - 120 */}
            <Sequence from={180} durationInFrames={120} premountFor={30}>
                <Scene3Confusion />
            </Sequence>

            {/* Scene 4: Solution (10s - 14s) -> 300 - 120 */}
            <Sequence from={300} durationInFrames={120} premountFor={30}>
                <Scene4Solution />
            </Sequence>

            {/* Scene 5: Result (14s - 18s) -> 420 - 120 */}
            <Sequence from={420} durationInFrames={120} premountFor={30}>
                <Scene5Result />
            </Sequence>

            {/* Scene 6: Outro (18s - End/20s) -> 540 - 60 */}
            <Sequence from={540} durationInFrames={60} premountFor={30}>
                <Scene6Outro />
            </Sequence>

            {/* Placeholder Audio - Un-comment when file is available */}
            {/* <Audio src={staticFile("voiceover_topic_short_1.mp3")} /> */}

        </AbsoluteFill>
    );
};
