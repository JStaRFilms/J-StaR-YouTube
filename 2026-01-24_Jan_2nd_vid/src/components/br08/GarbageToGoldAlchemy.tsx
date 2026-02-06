import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate, Img, staticFile, Sequence } from 'remotion';
import React from 'react';
import { z } from 'zod';
import { TransmutationCircle } from './TransmutationCircle';
import { CodeRunes } from './CodeRunes';
import { MagicParticles } from './MagicParticles';
import { FlashEffect } from './FlashEffect';
import { TrashItems } from './TrashItems';
import { loadFont } from "@remotion/google-fonts/Inter";

const { fontFamily } = loadFont();

export const GarbageToGoldAlchemySchema = z.object({
    goldText: z.string().default("Now let's turn it into gold."),
});

export const GarbageToGoldAlchemy: React.FC<z.infer<typeof GarbageToGoldAlchemySchema>> = ({ goldText }) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    // Timeline check
    // FPS: 30
    // 0s-1s (0-30): Garbage Enter
    // 1s-2.5s (30-75): Magic Circle
    // 2.5s-4s (75-120): Transmutation
    // 4s-5s (120-150): Victory

    // Animation Configs
    const smooth = { damping: 200 };
    const bounce = { damping: 10 };

    // --- PHASE 1: GARBAGE ---
    const garbageScale = spring({ frame, fps, config: bounce });
    const trashScale = spring({ frame: frame - 10, fps, config: bounce, delay: 10 });

    const garbageOpacity = interpolate(frame, [75, 95], [1, 0]); // Fade out during transmutation

    // --- PHASE 2: MAGIC CIRCLE ---
    const circleStart = 30;
    const circleScale = spring({ frame: frame - circleStart, fps, config: smooth });
    const circleRotation = interpolate(frame, [circleStart, 150], [0, 180]);
    const circleOpacity = interpolate(frame, [circleStart, circleStart + 10, 110, 120], [0, 1, 1, 0]);

    // --- PHASE 3: TRANSMUTATION ---
    const flashStart = 90;
    const flashOpacity = interpolate(frame, [flashStart, flashStart + 5, flashStart + 15], [0, 1, 0]);

    // --- PHASE 4: GOLD ---
    const goldStart = 95;
    const goldScale = spring({ frame: frame - goldStart, fps, config: { damping: 15 } });
    const goldOpacity = interpolate(frame, [goldStart, goldStart + 10], [0, 1]);

    const textStart = 120;
    const textY = spring({ frame: frame - textStart, fps, config: smooth });
    const textOpacity = interpolate(frame, [textStart, textStart + 10], [0, 1]);

    return (
        <AbsoluteFill style={{ backgroundColor: '#0a0a0f', overflow: 'hidden' }}>

            {/* PHASE 1: GARBAGE */}
            <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center', opacity: garbageOpacity }}>
                <TrashItems opacity={1} scale={trashScale} />
                <Img
                    src={staticFile('assets/br08_garbage_to_gold/garbage_can.png')}
                    style={{
                        width: 400,
                        height: 400,
                        objectFit: 'contain',
                        transform: `scale(${garbageScale})`,
                        zIndex: 10,
                    }}
                />
                <div style={{
                    position: 'absolute',
                    bottom: 150,
                    fontFamily,
                    color: '#6b7280', // Gray-500
                    fontSize: 32,
                    opacity: interpolate(frame, [15, 30], [0, 1]),
                }}>
                    This is the garbage.
                </div>
            </AbsoluteFill>

            {/* PHASE 2: MAGIC CIRCLE */}
            <Sequence from={circleStart} durationInFrames={120}>
                <TransmutationCircle
                    opacity={circleOpacity}
                    scale={circleScale}
                    rotation={circleRotation}
                    color="#a855f7" // Purple
                />
                <CodeRunes
                    opacity={circleOpacity}
                    scale={circleScale}
                    rotation={circleRotation * -1}
                    color="#06b6d4" // Cyan
                />
                <MagicParticles
                    opacity={circleOpacity}
                    gathering={true}
                    color="#f8fafc"
                />
            </Sequence>

            {/* PHASE 3: FLASH */}
            <Sequence from={flashStart} durationInFrames={20}>
                <FlashEffect opacity={flashOpacity} />
            </Sequence>

            {/* PHASE 4: GOLD */}
            <Sequence from={goldStart}>
                <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center', opacity: goldOpacity }}>
                    {/* Gold Glow Base */}
                    <div style={{
                        position: 'absolute',
                        width: 600,
                        height: 600,
                        background: 'radial-gradient(circle, rgba(251,191,36,0.2) 0%, rgba(0,0,0,0) 70%)',
                        transform: `scale(${goldScale})`,
                    }} />

                    <MagicParticles
                        opacity={1}
                        gathering={false}
                        color="#fbbf24"
                    />

                    <Img
                        src={staticFile('assets/br08_garbage_to_gold/gold_bar.png')}
                        style={{
                            width: 400,
                            height: 400,
                            objectFit: 'contain',
                            transform: `scale(${goldScale})`,
                            filter: 'drop-shadow(0 0 30px rgba(251, 191, 36, 0.5))',
                            zIndex: 20,
                        }}
                    />

                    <div style={{
                        position: 'absolute',
                        top: 700,
                        fontFamily,
                        color: '#fbbf24', // Amber-400
                        fontSize: 64,
                        fontWeight: 800,
                        textAlign: 'center',
                        opacity: textOpacity,
                        transform: `translateY(${interpolate(textY, [0, 1], [50, 0])}px)`,
                        textShadow: '0 0 20px rgba(251, 191, 36, 0.5)',
                    }}>
                        {goldText}
                    </div>
                </AbsoluteFill>
            </Sequence>

        </AbsoluteFill>
    );
};
