import React from 'react';
import {
    AbsoluteFill,
    Sequence,
    useVideoConfig,
    interpolate,
    spring,
    useCurrentFrame,
} from 'remotion';
import { loadFont } from '@remotion/google-fonts/Inter';
import { loadFont as loadMono } from '@remotion/google-fonts/JetBrainsMono';

import { Terminal } from './components/Terminal';
import { TypewriterText } from './components/TypewriterText';
import { CommandRow } from './components/CommandRow';
import { ProgressBar } from './components/ProgressBar';
import { Checkmark } from './components/Checkmark';
import { MoreIndicator } from './components/MoreIndicator';
import { InstallationSetupProps } from './schema';

// Load fonts
loadFont();
loadMono();

// Timing constants (in frames at 30fps)
const SCENE_1_DURATION = 90;
const SCENE_2_DURATION = 45;
const SCENE_3_DURATION = 135;
const SCENE_4_DURATION = 30;

export const InstallationSetup: React.FC<InstallationSetupProps> = ({
    highlightedAssistants = [
        { flag: 'claude', name: 'Claude Code' },
        { flag: 'cursor', name: 'Cursor' },
        { flag: 'antigravity', name: 'Antigravity' },
        { flag: 'opencode', name: 'OpenCode' },
    ],
    moreCount = 10,
    successText = 'Design Brain Installed',
}) => {
    const { fps } = useVideoConfig();

    return (
        <AbsoluteFill
            style={{
                backgroundColor: '#0a0a0f',
                fontFamily: 'Inter, sans-serif',
            }}
        >
            {/* Background gradient */}
            <div
                style={{
                    position: 'absolute',
                    inset: 0,
                    background: `
                        radial-gradient(ellipse at 30% 20%, rgba(34, 211, 238, 0.12) 0%, transparent 50%),
                        radial-gradient(ellipse at 70% 80%, rgba(168, 85, 247, 0.12) 0%, transparent 50%),
                        radial-gradient(ellipse at 50% 50%, rgba(99, 102, 241, 0.06) 0%, transparent 70%)
                    `,
                }}
            />

            {/* ===== SCENE 1: Global Install ===== */}
            <Sequence from={0} durationInFrames={SCENE_1_DURATION} layout="none">
                <Scene1GlobalInstall />
            </Sequence>

            {/* ===== SCENE 2: Navigate ===== */}
            <Sequence from={SCENE_1_DURATION} durationInFrames={SCENE_2_DURATION} layout="none">
                <Scene2Navigate />
            </Sequence>

            {/* ===== SCENE 3: AI Assistants Grid ===== */}
            <Sequence from={SCENE_1_DURATION + SCENE_2_DURATION} durationInFrames={SCENE_3_DURATION} layout="none">
                <Scene3AIAssistants
                    assistants={highlightedAssistants}
                    moreCount={moreCount}
                />
            </Sequence>

            {/* ===== SCENE 4: Success ===== */}
            <Sequence from={SCENE_1_DURATION + SCENE_2_DURATION + SCENE_3_DURATION} durationInFrames={SCENE_4_DURATION} layout="none">
                <Scene4Success successText={successText} />
            </Sequence>
        </AbsoluteFill>
    );
};

// ============ SCENE 1: Global Install ============
const Scene1GlobalInstall: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    // Terminal entry animation
    const terminalOpacity = interpolate(frame, [0, 20], [0, 1], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
    });
    const terminalY = interpolate(frame, [0, 20], [30, 0], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
    });

    return (
        <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center' }}>
            <div
                style={{
                    opacity: terminalOpacity,
                    transform: `translateY(${terminalY}px)`,
                }}
            >
                <Terminal>
                    {/* Comment */}
                    <div style={{ color: '#6b7280', marginBottom: 12 }}>
                        <TypewriterText
                            text="# Install CLI globally"
                            startFrame={15}
                            framesPerChar={1}
                            color="#6b7280"
                            showCursor={false}
                        />
                    </div>

                    {/* Command */}
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <span style={{ color: '#22c55e', marginRight: 12, fontWeight: 600 }}>$</span>
                        <TypewriterText
                            text="npm install -g uipro-cli"
                            startFrame={30}
                            framesPerChar={1}
                            color="#e5e7eb"
                            showCursor={true}
                        />
                        {frame >= 70 && <Checkmark startFrame={70} size={28} />}
                    </div>

                    {/* Progress bar */}
                    <ProgressBar startFrame={55} durationFrames={15} width={400} />
                </Terminal>
            </div>
        </AbsoluteFill>
    );
};

// ============ SCENE 2: Navigate ============
const Scene2Navigate: React.FC = () => {
    const frame = useCurrentFrame();

    return (
        <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center' }}>
            <Terminal>
                {/* Comment */}
                <div style={{ color: '#6b7280', marginBottom: 12 }}>
                    <TypewriterText
                        text="# Go to your project"
                        startFrame={5}
                        framesPerChar={1}
                        color="#6b7280"
                        showCursor={false}
                    />
                </div>

                {/* Command */}
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <span style={{ color: '#22c55e', marginRight: 12, fontWeight: 600 }}>$</span>
                    <TypewriterText
                        text="cd /path/to/your/project"
                        startFrame={15}
                        framesPerChar={1}
                        color="#e5e7eb"
                        showCursor={true}
                    />
                    {frame >= 38 && <Checkmark startFrame={38} size={28} />}
                </div>
            </Terminal>
        </AbsoluteFill>
    );
};

// ============ SCENE 3: AI Assistants Grid ============
interface Scene3Props {
    assistants: Array<{ flag: string; name: string }>;
    moreCount: number;
}

const Scene3AIAssistants: React.FC<Scene3Props> = ({ assistants, moreCount }) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    // Title fade in
    const titleOpacity = interpolate(frame, [0, 15], [0, 1], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
    });

    return (
        <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center' }}>
            <Terminal>
                {/* Section title */}
                <div
                    style={{
                        color: '#f8fafc',
                        fontSize: 28,
                        fontWeight: 700,
                        marginBottom: 24,
                        opacity: titleOpacity,
                        textShadow: '0 0 20px rgba(34, 211, 238, 0.3)',
                    }}
                >
                    Install for your AI assistant
                </div>

                {/* Command rows - staggered entry */}
                {assistants.map((assistant, index) => (
                    <CommandRow
                        key={assistant.flag}
                        command={assistant.flag}
                        comment={assistant.name}
                        startFrame={20 + index * 15}
                        highlighted={true}
                        index={index}
                    />
                ))}

                {/* More indicator */}
                <MoreIndicator
                    count={moreCount}
                    startFrame={20 + assistants.length * 15 + 10}
                />
            </Terminal>
        </AbsoluteFill>
    );
};

// ============ SCENE 4: Success ============
interface Scene4Props {
    successText: string;
}

const Scene4Success: React.FC<Scene4Props> = ({ successText }) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    // Success pop animation
    const scale = spring({
        frame,
        fps,
        config: { damping: 12, stiffness: 200 },
    });

    const opacity = interpolate(frame, [0, 10], [0, 1], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
    });

    // Glow pulse
    const glowIntensity = interpolate(
        Math.sin(frame * 0.15),
        [-1, 1],
        [0.3, 0.8],
    );

    return (
        <AbsoluteFill
            style={{
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
                gap: 24,
            }}
        >
            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 20,
                    opacity,
                    transform: `scale(${scale})`,
                }}
            >
                <span
                    style={{
                        color: '#f8fafc',
                        fontSize: 56,
                        fontWeight: 800,
                        textShadow: `0 0 ${40 * glowIntensity}px rgba(34, 211, 238, ${glowIntensity})`,
                        letterSpacing: '-1px',
                    }}
                >
                    {successText}
                </span>
                <Checkmark startFrame={5} size={52} />
            </div>

            {/* Subtle tagline */}
            <div
                style={{
                    color: '#94a3b8',
                    fontSize: 22,
                    fontWeight: 500,
                    opacity: interpolate(frame, [10, 20], [0, 0.8], {
                        extrapolateLeft: 'clamp',
                        extrapolateRight: 'clamp',
                    }),
                }}
            >
                Your AI now thinks like a designer
            </div>
        </AbsoluteFill>
    );
};
