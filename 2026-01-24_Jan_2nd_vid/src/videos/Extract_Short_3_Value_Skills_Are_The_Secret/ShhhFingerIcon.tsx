import { useCurrentFrame, useVideoConfig, interpolate, spring } from 'remotion';

export const ShhhFingerIcon: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    // Entrance animation: scale 0 → 1 with spring
    const scaleProgress = spring({
        frame: frame - 15,
        fps,
        config: { damping: 15, stiffness: 200 }
    });
    const scale = interpolate(scaleProgress, [0, 1], [0, 1]);

    // Opacity fade in
    const opacity = interpolate(frame, [0, 15, 30], [0, 0, 1], {
        extrapolateRight: 'clamp'
    });

    // Subtle floating animation after entrance
    const floatY = interpolate(frame, [45, 97.5, 150], [0, -8, 0], {
        extrapolateRight: 'clamp'
    });

    // Subtle glow pulse
    const glowPulse = interpolate(frame, [90, 120, 150], [1, 1.3, 1], {
        easing: (t: number) => t * (2 - t)
    });

    return (
        <div
            style={{
                position: 'absolute',
                top: '25%',
                left: '50%',
                transform: `translate(-50%, -50%) scale(${scale}) translateY(${floatY}px)`,
                opacity: opacity,
                filter: `drop-shadow(0 0 ${20 * glowPulse}px rgba(255, 255, 255, 0.6))`
            }}
        >
            <svg width="100" height="100" viewBox="0 0 100 100" fill="none">
                {/* Face circle */}
                <circle cx="50" cy="50" r="45" fill="#FDE68A" />
                {/* Left eye */}
                <circle cx="35" cy="40" r="5" fill="#1F2937" />
                {/* Right eye */}
                <circle cx="65" cy="40" r="5" fill="#1F2937" />
                {/* Nose */}
                <ellipse cx="50" cy="55" rx="4" ry="6" fill="#FCD34D" />
                {/* Mouth - shhh expression */}
                <ellipse cx="50" cy="72" rx="12" ry="8" fill="#1F2937" />
                {/* Finger over mouth */}
                <rect x="42" y="60" width="16" height="25" rx="8" fill="#FDE68A" stroke="#F59E0B" strokeWidth="2" />
                {/* Finger line details */}
                <line x1="50" y1="65" x2="50" y2="80" stroke="#F59E0B" strokeWidth="1" />
            </svg>
        </div>
    );
};
