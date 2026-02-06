import React from "react";
import { AbsoluteFill, Sequence, useVideoConfig, interpolate, useCurrentFrame, spring } from "remotion";
import { z } from "zod";
import { loadFont as loadAnton } from "@remotion/google-fonts/Anton";
import { loadFont as loadInter } from "@remotion/google-fonts/Inter";
import { COLORS } from "./constants";
import { BigType } from "./BigType";

loadAnton();
loadInter();

export const AnniversaryEditorialSchema = z.object({
    herName: z.string().default("Enny"),
    hisName: z.string().default("John"),
    comboName: z.string().default("Jenny"),
});

export const AnniversaryEditorial: React.FC<z.infer<typeof AnniversaryEditorialSchema>> = ({
    herName, hisName, comboName
}) => {
    const { fps, width, height } = useVideoConfig();
    const frame = useCurrentFrame();

    // Scene Transition: Sliding Panels
    const TransitionSlide: React.FC<{ color: string; direction?: number; delay: number }> = ({ color, direction = 1, delay }) => {
        const f = frame - delay;
        const progress = spring({ frame: f, fps, config: { damping: 20 } });
        const y = interpolate(progress, [0, 1], [height * direction, 0]);

        if (f < 0) return null;
        return (
            <AbsoluteFill style={{
                backgroundColor: color,
                transform: `translateY(${y}px)`,
                zIndex: 10
            }} />
        );
    };

    return (
        <AbsoluteFill style={{ backgroundColor: COLORS.bg, perspective: 2000 }}>

            {/* BEAT 1 & 2: 3D ROTATING SWAP (Extended Readability) */}
            {/* "TWO PEOPLE" - Rotates OUT starts at frame 50 (was 25) */}
            <Sequence from={0} durationInFrames={70}>
                <AbsoluteFill style={{
                    transformOrigin: '50% 50% -600px', // Pushed back to prevent clipping (Gap at hinge)
                    transform: `rotateY(${interpolate(frame, [50, 65], [0, 90], { extrapolateRight: 'clamp' })}deg)`,
                    backfaceVisibility: 'hidden'
                }}>
                    <BigType text="TWO" subText="PEOPLE" color={COLORS.text} enterDelay={0} />
                </AbsoluteFill>
            </Sequence>

            {/* "ONE SOUL" - Rotates IN starts at frame 50 */}
            <Sequence from={50} durationInFrames={60}>
                <AbsoluteFill style={{
                    transformOrigin: '50% 50% -600px', // Matches pivot
                    transform: `rotateY(${interpolate(frame, [50, 65], [-90, 0], { extrapolateRight: 'clamp' })}deg)`,
                    backfaceVisibility: 'hidden',
                    backgroundColor: COLORS.bg
                }}>
                    <BigType text="ONE" subText="SOUL" color={COLORS.bg} bgColor={COLORS.text} enterDelay={0} />
                </AbsoluteFill>
            </Sequence>

            {/* BEAT 3: UNSTOPPABLE (Pushed back to 100) */}
            <Sequence from={100} durationInFrames={40}>
                <TransitionSlide color={COLORS.accent} direction={1} delay={100} />
                <Sequence from={5}>
                    <BigType text="UNSTOPPABLE" color={COLORS.text} enterDelay={10} />
                </Sequence>
            </Sequence>

            {/* BEAT 4: Split Screen (Start 140, Duration 40 - Faster/Punchier) */}
            <Sequence from={140} durationInFrames={40}>
                <AbsoluteFill style={{ display: 'flex' }}>
                    {/* Left Panel - Slides Down */}
                    <div style={{
                        flex: 1,
                        backgroundColor: COLORS.text,
                        overflow: 'hidden',
                        position: 'relative',
                        transform: `translateY(${interpolate(spring({ frame: frame - 140, fps, config: { damping: 15 } }), [0, 1], [-height, 0])}px)`
                    }}>
                        <div style={{
                            position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%) rotate(90deg)',
                            color: COLORS.bg, fontFamily: 'Anton', fontSize: 100
                        }}>
                            {hisName}
                        </div>
                    </div>

                    {/* Right Panel - Slides Up */}
                    <div style={{
                        flex: 1,
                        backgroundColor: COLORS.bg,
                        overflow: 'hidden',
                        position: 'relative',
                        transform: `translateY(${interpolate(spring({ frame: frame - 140, fps, config: { damping: 15 } }), [0, 1], [height, 0])}px)`
                    }}>
                        <div style={{
                            position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%) rotate(-90deg)',
                            color: COLORS.text, fontFamily: 'Anton', fontSize: 100
                        }}>
                            {herName}
                        </div>
                    </div>
                </AbsoluteFill>
            </Sequence>

            {/* BEAT 5: Finale (Start 180) */}
            <Sequence from={180}>
                <AbsoluteFill style={{ backgroundColor: COLORS.bg }}>
                    <BigType
                        text={comboName}
                        subText="FOREVER TO GO"
                        color={COLORS.accent2}
                        enterDelay={0}
                    />

                    {/* Strobe Effect */}
                    <AbsoluteFill style={{
                        backgroundColor: 'white',
                        opacity: interpolate(frame - 180, [0, 5, 10, 15], [0.8, 0, 0.4, 0], { extrapolateRight: 'clamp' }),
                        mixBlendMode: 'overlay'
                    }} />
                </AbsoluteFill>
            </Sequence>

        </AbsoluteFill>
    );
};
