import { AbsoluteFill, Sequence, useVideoConfig, interpolate, spring, Easing, useCurrentFrame } from "remotion";
import { z } from "zod";
import { ScrapbookTexture } from "./ScrapbookTexture";
import { LensFlare } from "./LensFlare";
import { TimelineFlythrough } from "./TimelineFlythrough";
import { FilmBurnTransition } from "./FilmBurnTransition";
import { PolaroidScatter } from "./PolaroidScatter";
import { KineticText } from "./KineticText";
import { COLORS, FONT_FAMILY } from "./constants";
import { Ring } from "./Ring";
import { Avatar } from "../components/AnniversaryGift/Avatar"; // Keeping logic shared for now
import { loadFont as loadPlayfair } from "@remotion/google-fonts/PlayfairDisplay";
import { loadFont as loadMontserrat } from "@remotion/google-fonts/Montserrat";
import { loadFont as loadGreatVibes } from "@remotion/google-fonts/GreatVibes";

loadPlayfair();
loadMontserrat();
loadGreatVibes();

export const AnniversaryCinematicSchema = z.object({
    herName: z.string().default("Enny"),
    hisName: z.string().default("John"),
    comboName: z.string().default("Jenny"),
    date: z.string().default("Jan 27, 2026")
});

export const AnniversaryCinematic: React.FC<z.infer<typeof AnniversaryCinematicSchema>> = ({
    herName, hisName, comboName, date
}) => {
    const { fps, width, height } = useVideoConfig();
    const frame = useCurrentFrame();

    // SCENE 1: The Spark (0-5s) - REPLACED WITH KINETIC TEXT
    const Scene1 = () => (
        <AbsoluteFill style={{ backgroundColor: COLORS.background }}>
            <ScrapbookTexture />
            <LensFlare />
            <KineticText />
        </AbsoluteFill>
    );

    // SCENE 2: The Timeline (5s-10s) - ADDED POLAROIDS
    const Scene2 = () => (
        <AbsoluteFill style={{ backgroundColor: COLORS.background }}>
            <ScrapbookTexture />
            {/* Flythrough Effect */}
            <TimelineFlythrough />
            <PolaroidScatter />

            {/* Overlay Gradient for depth */}
            <AbsoluteFill style={{
                background: `radial-gradient(circle, transparent 30%, ${COLORS.background} 90%)`
            }} />
        </AbsoluteFill>
    );

    // SCENE 3: The Convergence (10s-15s)
    const Scene3 = () => {
        const startFrame = 300; // Scene 3 start
        const f = frame - startFrame; // Relative frame for this scene

        return (
            <AbsoluteFill style={{ backgroundColor: COLORS.lightBg }}> {/* Light Theme switch */}
                <ScrapbookTexture />
                <LensFlare opacity={0.5} />

                {/* Intro Names: John & Enny (Fades out as Jenny appears) */}
                <Sequence from={0} durationInFrames={60}>
                    <div style={{
                        position: 'absolute',
                        top: height * 0.25,
                        width: '100%',
                        textAlign: 'center',
                        fontFamily: FONT_FAMILY.body,
                        fontSize: 40,
                        fontWeight: 300,
                        color: COLORS.textDark,
                        letterSpacing: 5,
                        opacity: interpolate(f, [0, 40, 60], [0, 1, 0])
                    }}>
                        {hisName} & {herName}
                    </div>
                </Sequence>

                <Sequence from={10} durationInFrames={140}>
                    <div style={{
                        position: 'absolute',
                        width: '100%',
                        top: height * 0.40, // Moved down slightly (was 0.35)
                        textAlign: 'center'
                    }}>
                        <Ring />
                    </div>
                </Sequence>

                <Sequence from={40} durationInFrames={110}>
                    {/* Name Morph Logic - Cinematic Version */}
                    <div style={{
                        position: 'absolute',
                        top: height * 0.55, // Moved up to be closer to ring (was 0.6)
                        width: '100%',
                        height: 200,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        {/* Simplified Morph for Cinematic: Just fade clean text */}
                        <div style={{
                            fontFamily: FONT_FAMILY.script,
                            fontSize: 200, // Slight bump
                            color: COLORS.primary,
                            opacity: interpolate(f, [40, 70], [0, 1]),
                            // Cinematic Blur In - using relative frame 'f'
                            filter: `blur(${interpolate(f, [40, 70], [20, 0])}px)`,
                            // Changed target to 0 (normal) and made it settle faster
                            letterSpacing: interpolate(f, [40, 80], [50, 0], { extrapolateRight: 'clamp' }),
                            transform: `scale(${spring({ frame: f - 40, fps, config: { damping: 100, mass: 2 } })})`,
                            textShadow: `0 10px 30px rgba(183, 110, 121, 0.3)`
                        }}>
                            {comboName}
                        </div>
                    </div>
                </Sequence>

                <Sequence from={90} durationInFrames={60}>
                    <div style={{
                        position: 'absolute',
                        bottom: 250, // Adjusted
                        width: '100%',
                        textAlign: 'center',
                        fontFamily: FONT_FAMILY.body,
                        fontSize: 40,
                        letterSpacing: 10,
                        color: COLORS.textDark,
                        opacity: interpolate(f, [90, 110], [0, 1])
                    }}>
                        FOREVER TO GO
                    </div>
                </Sequence>
            </AbsoluteFill>
        );
    };

    return (
        <AbsoluteFill>
            <Sequence from={0} durationInFrames={150}>
                <Scene1 />
            </Sequence>

            {/* Transition 1 -> 2 */}
            <Sequence from={135} durationInFrames={30} layout="none">
                <FilmBurnTransition />
            </Sequence>

            <Sequence from={150} durationInFrames={150}>
                <Scene2 />
            </Sequence>

            {/* Transition 2 -> 3 */}
            <Sequence from={285} durationInFrames={30} layout="none">
                <FilmBurnTransition />
            </Sequence>

            <Sequence from={300} durationInFrames={150}>
                <Scene3 />
            </Sequence>
        </AbsoluteFill>
    );
};
