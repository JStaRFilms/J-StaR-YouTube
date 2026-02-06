import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate } from 'remotion';
import { loadFont } from "@remotion/google-fonts/JetBrainsMono";

const { fontFamily } = loadFont();

export const BootSequence: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const opacity = interpolate(frame, [0, 10], [0, 1]);

    // Blinking cursor
    const cursorOpacity = frame % 30 < 15 ? 1 : 0;

    // Typewriter text
    const fullText = "INITIALIZING NEURAL CODER v2.4...";
    const progressStart = 10;
    const typingDuration = 50;
    const charsToShow = Math.floor(interpolate(frame, [progressStart, progressStart + typingDuration], [0, fullText.length], {
        extrapolateRight: "clamp",
        extrapolateLeft: "clamp"
    }));
    const textToShow = fullText.slice(0, charsToShow);

    // Progress bar
    const barStart = 30;
    const barDuration = 50;
    const progress = interpolate(frame, [barStart, barStart + barDuration], [0, 100], {
        extrapolateRight: "clamp",
        extrapolateLeft: "clamp"
    });

    // CRT Glow
    const glow = interpolate(Math.sin(frame * 0.5), [-1, 1], [0.8, 1]);

    return (
        <AbsoluteFill style={{
            backgroundColor: '#0a0a0f',
            fontFamily,
            color: '#22c55e',
            justifyContent: 'center',
            alignItems: 'center',
            fontSize: 32
        }}>
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                width: 600,
                opacity,
                filter: `drop-shadow(0 0 5px #22c55e) brightness(${glow})`
            }}>
                <div style={{ marginBottom: 20 }}>
                    {textToShow}
                    <span style={{ opacity: cursorOpacity }}>█</span>
                </div>

                <div style={{
                    width: '100%',
                    height: 4,
                    backgroundColor: '#0a0a0f',
                    border: '1px solid #06b6d4',
                    position: 'relative',
                    overflow: 'hidden'
                }}>
                    <div style={{
                        position: 'absolute',
                        left: 0,
                        top: 0,
                        bottom: 0,
                        width: `${progress}%`,
                        backgroundColor: '#06b6d4',
                        boxShadow: '0 0 10px #06b6d4'
                    }} />
                </div>
                <div style={{
                    alignSelf: 'flex-end',
                    fontSize: 14,
                    marginTop: 5,
                    color: '#06b6d4'
                }}>
                    {Math.round(progress)}%
                </div>
            </div>
        </AbsoluteFill>
    );
};
