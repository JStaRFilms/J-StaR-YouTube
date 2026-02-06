import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { SimpleUglyMockup } from './SimpleUglyMockup';

export const SlowFlashIntro: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    // Flash In Opacity
    const opacity = interpolate(frame, [0, 15], [0, 1], {
        extrapolateRight: 'clamp',
    });

    // Screen Shake
    // Shake decreases over time
    const shakeIntensity = interpolate(frame, [0, 30], [20, 0], {
        extrapolateRight: 'clamp',
    });

    // High frequency shake using sin
    const shakeX = Math.sin(frame * 0.8) * shakeIntensity;
    const shakeY = Math.cos(frame * 1.1) * shakeIntensity;

    // X Stamp Animation
    const stampScale = spring({
        frame: frame - 10,
        fps,
        config: { damping: 8, mass: 0.5 },
    });

    const stampOpacity = interpolate(frame, [10, 12], [0, 1], {
        extrapolateRight: 'clamp',
        extrapolateLeft: 'clamp',
    });

    return (
        <AbsoluteFill style={{ backgroundColor: '#0a0a0f' }}>
            <AbsoluteFill style={{
                opacity,
                transform: `translate(${shakeX}px, ${shakeY}px)`
            }}>
                <SimpleUglyMockup />
            </AbsoluteFill>

            {/* X Stamp Overlay */}
            <AbsoluteFill style={{
                justifyContent: 'center',
                alignItems: 'center',
                pointerEvents: 'none'
            }}>
                <div style={{
                    opacity: stampOpacity,
                    transform: `scale(${stampScale}) rotate(-15deg)`,
                    border: '10px solid #ff4444',
                    color: '#ff4444',
                    fontSize: 200,
                    fontWeight: 900,
                    fontFamily: 'Arial, sans-serif',
                    width: 300,
                    height: 300,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 20,
                    backgroundColor: 'rgba(0,0,0,0.5)',
                    boxShadow: '0 0 50px rgba(255, 68, 68, 0.5)',
                    textShadow: '0 0 20px rgba(255, 68, 68, 0.8)',
                }}>
                    X
                </div>
            </AbsoluteFill>
        </AbsoluteFill>
    );
};
