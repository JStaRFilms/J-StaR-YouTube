import { AbsoluteFill, interpolate, Sequence, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { ChatInterface } from './ChatInterface';
import { BrowserWindow } from './BrowserWindow';
import { UglyPage } from './UglyPage';
import { RedMarker } from './RedMarker';
import { CringeOverlay } from './CringeOverlay';
import { VerdictReveal } from './VerdictReveal';

export const VanillaAICringe: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    // --- Scene 1: Chat Interface (0-45f) ---
    // Stays visible but gets covered or fades out? Spec says Browser pops in.
    // Let's fade it out slightly or keep it in background.
    const chatOpacity = interpolate(frame, [30, 45], [1, 0]);

    // --- Scene 2: Browser Window (30-120f) ---
    const browserScale = spring({
        frame: frame - 30,
        fps,
        config: { damping: 15 }
    });

    // Grayscale effect for the verdict scene
    const saturation = interpolate(frame, [150, 160], [1, 0], { extrapolateRight: 'clamp' });
    const grayscale = 1 - saturation;

    return (
        <AbsoluteFill className="bg-white">
            {/* Scene 1: Chat Interface */}
            <Sequence durationInFrames={45}>
                <ChatInterface opacity={1} />
            </Sequence>

            {/* Main Container for Browser and Contents */}
            <Sequence from={30}>
                <AbsoluteFill style={{
                    transform: `scale(${browserScale})`,
                    filter: `grayscale(${grayscale})`
                }}>
                    <BrowserWindow>
                        <UglyPage />

                        {/* Red Markers overlaying the page */}
                        <RedMarker type="circle" x={100} y={150} width={300} height={100} delay={30} />
                        <RedMarker type="circle" x={500} y={400} width={200} height={150} delay={45} />
                        <RedMarker type="x" x={800} y={200} width={100} height={100} delay={60} />
                    </BrowserWindow>
                </AbsoluteFill>
            </Sequence>

            {/* Scene 3: Cringe Overlay */}
            <Sequence from={120}>
                <CringeOverlay startFrame={0} />
            </Sequence>

            {/* Scene 4: Verdict */}
            <Sequence from={150}>
                <VerdictReveal startFrame={0} />
            </Sequence>

        </AbsoluteFill>
    );
};
