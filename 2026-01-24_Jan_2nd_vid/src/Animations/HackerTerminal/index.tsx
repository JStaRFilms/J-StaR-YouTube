import { AbsoluteFill, Sequence, useVideoConfig } from 'remotion';
import { z } from 'zod';
import { BootSequence } from './BootSequence';
import { CodeRain } from './CodeRain';
import { NeuralGrid } from './NeuralGrid';
import { OutputTerminal } from './OutputTerminal';

export const HackerTerminalSchema = z.object({
    primaryColor: z.string().default('#06b6d4'),
    accentColor: z.string().default('#ec4899'),
    textColor: z.string().default('#22c55e'),
});

export const HackerTerminal: React.FC<z.infer<typeof HackerTerminalSchema>> = ({
    primaryColor,
    accentColor,
    textColor
}) => {
    const { fps } = useVideoConfig();

    return (
        <AbsoluteFill style={{ backgroundColor: '#0a0a0f' }}>
            {/* Scene 1: Boot (0-3s) */}
            <Sequence from={0} durationInFrames={3 * fps}>
                <BootSequence />
            </Sequence>

            {/* Scene 2: Code Rain (3-7s) */}
            <Sequence from={3 * fps} durationInFrames={4 * fps}>
                <CodeRain />
            </Sequence>

            {/* Scene 3: Neural Grid (7-12s) */}
            <Sequence from={7 * fps} durationInFrames={5 * fps}>
                <NeuralGrid />
            </Sequence>

            {/* Scene 4: Output (12-15s) */}
            <Sequence from={12 * fps} durationInFrames={3 * fps}>
                <OutputTerminal />
            </Sequence>

            {/* Global Scanlines Overlay */}
            <AbsoluteFill style={{
                background: 'linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06))',
                backgroundSize: '100% 2px, 3px 100%',
                pointerEvents: 'none',
                opacity: 0.2
            }} />
        </AbsoluteFill>
    );
};
