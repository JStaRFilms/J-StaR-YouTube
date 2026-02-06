import { useCurrentFrame, useVideoConfig, interpolate, spring } from 'remotion';

export const TopSecretStamp: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    // Stamp animation: starts at frame 30, completes by frame 60
    const stampProgress = spring({
        frame: frame - 30,
        fps,
        config: { damping: 15, stiffness: 200 }
    });

    // Scale: starts at 2x, bounces to 1x
    const stampScale = interpolate(stampProgress, [0, 1], [2, 1]);
    // Rotation: starts at -15deg, settles at -12deg
    const stampRotation = interpolate(stampProgress, [0, 1], [-15, -12]);
    // Opacity: fades in quickly
    const stampOpacity = interpolate(stampProgress, [0, 0.3, 1], [0, 0, 1]);

    return (
        <div
            style={{
                position: 'absolute',
                top: '30%',
                left: '50%',
                transform: `translate(-50%, -50%) scale(${stampScale}) rotate(${stampRotation}deg)`,
                opacity: stampOpacity,
                border: '6px dashed #F59E0B',
                color: '#F59E0B',
                fontSize: '48px',
                fontWeight: '900',
                padding: '16px 32px',
                fontFamily: 'Arial Black, sans-serif',
                textTransform: 'uppercase',
                letterSpacing: '4px',
                boxShadow: '0 0 30px rgba(245, 158, 11, 0.5)',
                textShadow: '2px 2px 0px rgba(0,0,0,0.3)'
            }}
        >
            TOP SECRET
        </div>
    );
};
