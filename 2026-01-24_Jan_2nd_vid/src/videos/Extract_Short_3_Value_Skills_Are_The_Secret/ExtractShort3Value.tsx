import { AbsoluteFill, Sequence, Series, Audio, staticFile, useVideoConfig } from 'remotion';
import { z } from 'zod';
import { useCurrentFrame, interpolate, Easing } from 'remotion';

// HOOK Components
import { TopSecretStamp } from './TopSecretStamp';
import { ShhhFingerIcon } from './ShhhFingerIcon';
import { ScanningLine } from './ScanningLine';
import { GridBackground } from './GridBackground';

// MEAT Components
import { HackerTerminalBg } from './HackerTerminalBg';
import { TerminalWindow } from './TerminalWindow';
import { SourceFolderIcon } from './SourceFolderIcon';
import { FileCopyProgress } from './FileCopyProgress';
import { FileTreeVisualizer } from './FileTreeVisualizer';
import { TerminalSuccessMessages } from './TerminalSuccessMessages';
import { TerminalCursor } from './TerminalCursor';

// CTA Components
import { LevelUpProgress } from './LevelUpProgress';
import { LevelUpFlash } from './LevelUpFlash';
import { MasterclassTitle } from './MasterclassTitle';
import { XPFloatAnimation } from './XPFloatAnimation';
import { ThumbnailPreview } from './ThumbnailPreview';
import { LinkInBioCTA } from './LinkInBioCTA';
import { ConfettiParticles } from './ConfettiParticles';

// Schema
export const ExtractShort3ValueSchema = z.object({
    primaryColor: z.string().default('#3B82F6'),
    secondaryColor: z.string().default('#8B5CF6'),
    backgroundColor: z.string().default('#111827'),
    textColor: z.string().default('#FFFFFF'),
});

// HOOK Scene Components
const HookScene: React.FC = () => {
    const frame = useCurrentFrame();

    // Typewriter effect for "THE SECRET 1%"
    const textProgress = interpolate(frame, [45, 90], [0, 1], {
        extrapolateRight: 'clamp',
        easing: Easing.out(Easing.quad)
    });
    const displayText = "THE SECRET 1%".slice(0, Math.floor(textProgress * 16));

    // Glow pulse for the text
    const glowPulse = interpolate(frame, [90, 120, 150], [1, 1.3, 1], {
        easing: Easing.inOut(Easing.quad)
    });

    return (
        <AbsoluteFill style={{ backgroundColor: '#111827' }}>
            <GridBackground />
            <ScanningLine />
            <ShhhFingerIcon />
            <TopSecretStamp />

            {/* THE SECRET 1% Text */}
            {displayText.length > 0 && (
                <div
                    style={{
                        position: 'absolute',
                        top: '55%',
                        left: '50%',
                        transform: `translate(-50%, -50%) scale(${glowPulse})`,
                        fontFamily: 'Inter, sans-serif',
                        fontSize: '56px',
                        fontWeight: '900',
                        color: '#8B5CF6',
                        textShadow: `0 0 ${30 * glowPulse}px rgba(139, 92, 246, 0.8)`,
                        letterSpacing: '4px'
                    }}
                >
                    {displayText}
                </div>
            )}
        </AbsoluteFill>
    );
};

// MEAT Scene Components
const MeatScene: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    // Destination folder fade in at frame 120
    const destFadeProgress = interpolate(frame, [120, 150], [0, 1], {
        extrapolateRight: 'clamp'
    });

    return (
        <AbsoluteFill style={{ backgroundColor: '#0D1117' }}>
            <HackerTerminalBg />

            {/* Source folder animation */}
            <SourceFolderIcon />

            {/* Terminal window with copy progress */}
            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
                <FileCopyProgress />
            </div>

            {/* File tree visualization */}
            <div style={{ opacity: destFadeProgress }}>
                <FileTreeVisualizer />
            </div>

            {/* Success messages */}
            <TerminalSuccessMessages />

            {/* Blinking cursor */}
            <div style={{ position: 'absolute', bottom: '8%', left: 'calc(50% - 180px)' }}>
                <span style={{ fontFamily: 'Roboto Mono, monospace', color: '#22C55E', fontSize: '14px' }}>
                    {'>'} Ready for next command
                    <TerminalCursor />
                </span>
            </div>
        </AbsoluteFill>
    );
};

// CTA Scene Components
const CTAScene: React.FC = () => {
    return (
        <AbsoluteFill style={{ backgroundColor: '#111827' }}>
            <GridBackground />
            <LevelUpProgress />
            <LevelUpFlash />
            <XPFloatAnimation />
            <MasterclassTitle />
            <ConfettiParticles />
            <ThumbnailPreview />
            <LinkInBioCTA />
        </AbsoluteFill>
    );
};

// Main Composition
export const ExtractShort3ValueSkillsAreTheSecret: React.FC<z.infer<typeof ExtractShort3ValueSchema>> = ({
    primaryColor,
    secondaryColor,
    backgroundColor,
    textColor
}) => {
    const { fps } = useVideoConfig();

    // Scene durations in frames (at 30fps)
    const HOOK_DURATION = 5 * fps;      // 0:00 - 0:05 (150 frames)
    const MEAT_DURATION = 45 * fps;     // 0:05 - 0:50 (1350 frames)
    const CTA_DURATION = 10 * fps;      // 0:50 - 1:00 (300 frames)

    return (
        <AbsoluteFill style={{ backgroundColor }}>
            <Series>
                {/* Scene 1: HOOK - Top Secret Reveal (0:00-0:05) */}
                <Series.Sequence durationInFrames={HOOK_DURATION} premountFor={30}>
                    <HookScene />
                </Series.Sequence>

                {/* Scene 2: MEAT - Installation/File Copy Terminal (0:05-0:50) */}
                <Series.Sequence durationInFrames={MEAT_DURATION} premountFor={30}>
                    <MeatScene />
                </Series.Sequence>

                {/* Scene 3: CTA - Level Up to Masterclass (0:50-End) */}
                <Series.Sequence durationInFrames={CTA_DURATION} premountFor={30}>
                    <CTAScene />
                </Series.Sequence>
            </Series>

            {/* Placeholder Audio - Uncomment when files are available */}
            {/* <Audio src={staticFile("voiceover_hook.mp3")} /> */}
            {/* <Audio src={staticFile("voiceover_meat.mp3")} /> */}
            {/* <Audio src={staticFile("voiceover_cta.mp3")} /> */}
        </AbsoluteFill>
    );
};

export default ExtractShort3ValueSkillsAreTheSecret;
