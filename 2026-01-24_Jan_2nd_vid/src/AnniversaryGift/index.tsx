import { AbsoluteFill, Sequence, useVideoConfig, interpolate, spring, Easing, useCurrentFrame } from "remotion";
import { z } from "zod";
import { Avatar } from "../components/AnniversaryGift/Avatar";
import { ChatBubble } from "../components/AnniversaryGift/ChatBubble";
import { ConnectionLine } from "../components/AnniversaryGift/ConnectionLine";
import { CalendarFlip } from "../components/AnniversaryGift/CalendarFlip";
import { HeartMeter } from "../components/AnniversaryGift/HeartMeter";
import { Ring } from "../components/AnniversaryGift/Ring";
import { NameMorph } from "../components/AnniversaryGift/NameMorph";
import { COLORS, FONT_FAMILY } from "../components/AnniversaryGift/constants";
import { TransitionWipe } from "../components/AnniversaryGift/TransitionWipe";
import { Sparkles } from "../components/AnniversaryGift/Sparkles";
import { BgTextFlash } from "../components/AnniversaryGift/BgTextFlash";
import { CalendarExplosion } from "../components/AnniversaryGift/CalendarExplosion";
import { loadFont as loadPlayfair } from "@remotion/google-fonts/PlayfairDisplay";
import { loadFont as loadMontserrat } from "@remotion/google-fonts/Montserrat";
import { loadFont as loadGreatVibes } from "@remotion/google-fonts/GreatVibes";

loadPlayfair();
loadMontserrat();
loadGreatVibes();

export const AnniversaryGiftSchema = z.object({
    startDate: z.string().default("May 2nd, 2022"),
    proposalDate: z.string().default("Jan 27th, 2026"),
    herName: z.string().default("Enny"),
    hisName: z.string().default("John"),
    comboName: z.string().default("Jenny"),
});

export const AnniversaryGift: React.FC<z.infer<typeof AnniversaryGiftSchema>> = ({
    startDate,
    proposalDate,
    herName,
    hisName,
    comboName,
}) => {
    const { fps, width, height } = useVideoConfig();

    // Scene 1: The Spark (0 - 5s)
    // More dynamic: Avatars slam in, messages fly fast, date slams
    const Scene1 = () => {
        const frame = useCurrentFrame();

        // Camera shake effect on impact
        const shake = spring({ frame: frame - 40, fps, config: { damping: 5 } });
        const shakeVal = interpolate(shake, [0, 1], [0, 0], { easing: Easing.bounce }); // Placeholder if we want shake

        return (
            <AbsoluteFill style={{ backgroundColor: COLORS.background }}>
                <Sparkles count={30} />

                {/* Date Big Title Background */}
                <div style={{
                    position: 'absolute', top: 150, width: '100%', textAlign: 'center',
                    opacity: 0.1, fontFamily: FONT_FAMILY.heading, fontSize: 200, color: COLORS.primary
                }}>
                    2022
                </div>

                <Sequence from={0} durationInFrames={140} layout="none">
                    <Avatar
                        name={hisName}
                        color={COLORS.john}
                        initial={hisName[0]}
                        delay={5}
                        x={width * 0.25 - 75}
                        y={height * 0.4}
                    />
                    <Avatar
                        name={herName}
                        color={COLORS.enny}
                        initial={herName[0]}
                        delay={10}
                        x={width * 0.75 - 75}
                        y={height * 0.4}
                    />
                </Sequence>

                <Sequence from={20} durationInFrames={120} layout="none">
                    {/* Dynamic pulsing connection */}
                    <ConnectionLine x1={width * 0.25} y1={height * 0.4} x2={width * 0.75} y2={height * 0.4} />
                </Sequence>

                {/* Rapid fire chat bubbles */}
                <Sequence from={30} durationInFrames={110} layout="none">
                    <ChatBubble text="Hey! 👋" isLeft={true} top={height * 0.25} />
                </Sequence>
                <Sequence from={45} durationInFrames={95} layout="none">
                    <ChatBubble text="Hi there! ✨" isLeft={false} top={height * 0.55} delay={15} />
                </Sequence>
                <Sequence from={60} durationInFrames={80} layout="none">
                    <ChatBubble text="Wanna hang? 🥺" isLeft={true} top={height * 0.35} delay={30} />
                </Sequence>

                <Sequence from={80} durationInFrames={70} layout="none">
                    <div style={{
                        position: 'absolute',
                        bottom: 250,
                        width: '100%',
                        textAlign: 'center',
                        fontFamily: FONT_FAMILY.body,
                        fontSize: 60,
                        fontWeight: 900,
                        color: COLORS.text,
                        transform: `scale(${spring({ frame: frame - 80, fps, config: { damping: 12 } })})`
                    }}>
                        {startDate}
                    </div>
                </Sequence>
            </AbsoluteFill>
        );
    };

    // Scene 2: The Journey (5s - 10s)
    // Fast, energetic montage feel
    const Scene2 = () => (
        <AbsoluteFill style={{ backgroundColor: "#FFE4E1" }}> {/* Slightly darker pink */}
            <BgTextFlash />
            <Sparkles count={50} />

            <div style={{
                fontFamily: FONT_FAMILY.heading,
                fontSize: 80,
                width: "100%",
                textAlign: "center",
                marginTop: 150,
                color: COLORS.primary,
                textShadow: "4px 4px 0px white", // Pop art style
                zIndex: 10
            }}>
                Growing Closer
            </div>

            <Sequence from={0} durationInFrames={150} layout="none">
                <div style={{
                    position: 'absolute',
                    left: width / 2 - 150,
                    top: height * 0.35,
                    zIndex: 20
                }}>
                    <CalendarExplosion startYear={2022} endYear={2026} />
                </div>
            </Sequence>

            <Sequence from={30} durationInFrames={120} layout="none">
                <div style={{ position: 'absolute', left: width / 2 - 40, top: height * 0.65, zIndex: 20 }}>
                    {/* Meter fills super fast */}
                    <HeartMeter progress={1} />
                </div>
            </Sequence>
        </AbsoluteFill>
    );

    // Scene 3: The Proposal (10s - 15s)
    // Grand, cinematic, glowing
    const Scene3 = () => (
        <AbsoluteFill style={{
            background: `radial-gradient(circle, #FFF0F5 0%, #FFB6C1 100%)`, // Gradient bg
        }}>
            <Sparkles count={60} />

            <Sequence from={10} durationInFrames={140} layout="none">
                <div style={{
                    position: 'absolute',
                    top: height * 0.3,
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    zIndex: 20
                }}>
                    <Ring />
                </div>
            </Sequence>

            <Sequence from={40} durationInFrames={110} layout="none">
                <div style={{
                    position: 'absolute',
                    top: height * 0.55,
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    zIndex: 25
                }}>
                    <NameMorph john={hisName} enny={herName} combined={comboName} />
                </div>
            </Sequence>

            <Sequence from={80} durationInFrames={70} layout="none">
                <div style={{
                    position: 'absolute',
                    bottom: 350,
                    fontFamily: FONT_FAMILY.body,
                    fontSize: 50,
                    color: COLORS.text,
                    width: "100%",
                    textAlign: "center",
                    backgroundColor: "rgba(255,255,255,0.8)", // Legibility pill
                    padding: "10px 0"
                }}>
                    {proposalDate}
                </div>
            </Sequence>

            <Sequence from={100} durationInFrames={50} layout="none">
                <div style={{
                    position: 'absolute',
                    bottom: 200,
                    fontFamily: FONT_FAMILY.heading,
                    fontSize: 90, // Bigger
                    color: COLORS.primary,
                    width: "100%",
                    textAlign: "center",
                    textShadow: "0px 0px 20px white" // Glow
                }}>
                    Forever to go ❤️
                </div>
            </Sequence>
        </AbsoluteFill>
    );

    return (
        <AbsoluteFill>
            <Sequence from={0} durationInFrames={160}> {/* Overlap by 10 frames */}
                <Scene1 />
            </Sequence>

            {/* Wipe into Scene 2 */}
            <Sequence from={140} durationInFrames={40} layout="none">
                <TransitionWipe color={COLORS.john} />
            </Sequence>

            <Sequence from={150} durationInFrames={160}>
                <Scene2 />
            </Sequence>

            {/* Wipe into Scene 3 */}
            <Sequence from={290} durationInFrames={40} layout="none">
                <TransitionWipe color={COLORS.primary} direction="up" />
            </Sequence>

            <Sequence from={300} durationInFrames={150}>
                <Scene3 />
            </Sequence>
        </AbsoluteFill>
    );
};
