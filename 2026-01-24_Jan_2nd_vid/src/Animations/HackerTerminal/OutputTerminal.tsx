import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate } from 'remotion';
import { loadFont } from "@remotion/google-fonts/JetBrainsMono";

const { fontFamily } = loadFont();

export const OutputTerminal: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const scale = spring({
        frame,
        fps,
        config: { damping: 15 }
    });

    // Checkmark animation
    const checkScale = spring({
        frame: frame - 40,
        fps,
        config: { damping: 12 }
    });

    // Typewriter
    const text = "> Task completed. 847 lines generated.";
    const chars = Math.floor(interpolate(frame - 20, [0, 40], [0, text.length], { extrapolateRight: 'clamp' }));

    return (
        <AbsoluteFill style={{
            justifyContent: 'center',
            alignItems: 'center',
            fontFamily,
            backgroundColor: 'rgba(0,0,0,0.5)' // Dim background
        }}>
            <div style={{
                width: 600,
                height: 300,
                backgroundColor: 'rgba(10, 10, 15, 0.9)',
                border: '1px solid #4b5563',
                borderRadius: 12,
                transform: `scale(${scale})`,
                boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden',
                backdropFilter: 'blur(10px)'
            }}>
                {/* Header */}
                <div style={{
                    height: 40,
                    borderBottom: '1px solid #4b5563',
                    display: 'flex',
                    alignItems: 'center',
                    padding: '0 16px',
                    gap: 8
                }}>
                    <div style={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: '#ef4444' }} />
                    <div style={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: '#f59e0b' }} />
                    <div style={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: '#22c55e' }} />
                </div>

                {/* Body */}
                <div style={{
                    flex: 1,
                    padding: 32,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#22c55e',
                    fontSize: 24,
                    textAlign: 'center'
                }}>
                    <div style={{ marginBottom: 24 }}>
                        {text.slice(0, chars)}
                    </div>

                    <div style={{
                        transform: `scale(${checkScale})`,
                        width: 64,
                        height: 64,
                        borderRadius: '50%',
                        backgroundColor: '#22c55e',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'black'
                    }}>
                        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                    </div>
                </div>
            </div>
        </AbsoluteFill>
    );
};
