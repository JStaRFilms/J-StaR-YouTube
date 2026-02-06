import { useCurrentFrame, useVideoConfig, interpolate, spring } from 'remotion';
import { useMemo } from 'react';

// Color palette
const COLORS = {
    background: '#111827',
    primaryNeon: '#3B82F6',
    secondaryNeon: '#8B5CF6',
    textPrimary: '#FFFFFF',
    textSecondary: '#94A3B8',
    successGreen: '#22C55E',
    errorRed: '#EF4444',
    gridLines: '#1F2937',
};

interface SplitScreenBeforeAfterProps {
    beforeLabel?: string;
    afterLabel?: string;
}

export const SplitScreenBeforeAfter: React.FC<SplitScreenBeforeAfterProps> = ({
    beforeLabel = 'BEFORE',
    afterLabel = 'AFTER',
}) => {
    const frame = useCurrentFrame();
    const { fps, width, height } = useVideoConfig();

    // Split container fade in: frames 0-15
    const containerOpacity = interpolate(frame, [0, 15], [0, 1], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
    });

    // Divider line width animation: frames 15-45
    const dividerWidth = interpolate(frame, [15, 45], [0, width], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
    });

    // Bottom half slide up + fade: frames 0-30
    const afterSlideUp = spring({
        frame,
        fps,
        config: { damping: 15, stiffness: 100 },
    });
    const afterOpacity = interpolate(frame, [0, 30], [0, 1], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
    });

    // Top half (Before) - glitch offset using random frames
    const glitchOffset = useMemo(() => {
        return Array.from({ length: 150 }).map(() =>
            Math.random() > 0.9 ? (Math.random() - 0.5) * 10 : 0
        );
    }, []);
    const currentGlitchOffset = glitchOffset[frame % glitchOffset.length];

    // Before label typewriter + glitch: frames 30-60
    const beforeLabelProgress = interpolate(frame, [30, 60], [0, 1], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
    });
    const beforeLabelOpacity = interpolate(frame, [30, 45], [0, 1], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
    });

    // After label slide from bottom: frames 45-75
    const afterLabelProgress = spring({
        frame: frame - 45,
        fps,
        config: { damping: 15, stiffness: 100 },
    });
    const afterLabelOpacity = interpolate(frame, [45, 75], [0, 1], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
    });

    // Grayscale to B&W for top half
    const topHalfFilter = interpolate(frame, [0, 30], [0, 1], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
    });

    return (
        <div
            style={{
                width: '100%',
                height: '100%',
                backgroundColor: COLORS.background,
                position: 'relative',
                overflow: 'hidden',
                opacity: containerOpacity,
            }}
        >
            {/* Top Half - BEFORE (Grayscale, glitchy) */}
            <div
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '50%',
                    backgroundColor: '#0a0a0a',
                    transform: `translateX(${currentGlitchOffset}px)`,
                    filter: `grayscale(${topHalfFilter * 100}%) contrast(${1 + topHalfFilter * 0.5})`,
                }}
            >
                {/* Static noise effect */}
                <div
                    style={{
                        position: 'absolute',
                        inset: 0,
                        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.15'/%3E%3C/svg%3E")`,
                        opacity: 0.3,
                    }}
                />

                {/* Wireframe placeholder elements */}
                <div style={{ padding: '40px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    {/* Wireframe box */}
                    <div
                        style={{
                            width: '80%',
                            height: '120px',
                            border: '2px dashed #EF4444',
                            borderRadius: '8px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: COLORS.errorRed,
                            fontFamily: 'Roboto Mono, monospace',
                            fontSize: '14px',
                        }}
                    >
                        WIREFRAME PLACEHOLDER
                    </div>
                    {/* More wireframe lines */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', opacity: 0.5 }}>
                        <div style={{ width: '100%', height: '8px', background: '#333', borderRadius: '4px' }} />
                        <div style={{ width: '70%', height: '8px', background: '#333', borderRadius: '4px' }} />
                        <div style={{ width: '85%', height: '8px', background: '#333', borderRadius: '4px' }} />
                    </div>
                </div>

                {/* BEFORE Label */}
                <div
                    style={{
                        position: 'absolute',
                        top: '20px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        color: COLORS.errorRed,
                        fontFamily: 'Roboto Mono, monospace',
                        fontSize: '24px',
                        fontWeight: 'bold',
                        textTransform: 'uppercase',
                        letterSpacing: '4px',
                        opacity: beforeLabelOpacity,
                        textShadow: `0 0 10px ${COLORS.errorRed}`,
                    }}
                >
                    {beforeLabel.slice(0, Math.floor(beforeLabel.length * beforeLabelProgress))}
                </div>
            </div>

            {/* Bottom Half - AFTER (Full color, vibrant) */}
            <div
                style={{
                    position: 'absolute',
                    top: '50%',
                    left: 0,
                    width: '100%',
                    height: '50%',
                    background: 'linear-gradient(180deg, #1a1a2e 0%, #111827 100%)',
                    transform: `translateY(${(1 - afterSlideUp) * 100}px)`,
                    opacity: afterOpacity,
                }}
            >
                {/* Smooth gradient background */}
                <div
                    style={{
                        position: 'absolute',
                        inset: 0,
                        background: `radial-gradient(circle at 50% 0%, ${COLORS.secondaryNeon}22 0%, transparent 50%)`,
                    }}
                />

                {/* Polished UI elements */}
                <div style={{ padding: '40px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    {/* Polished card */}
                    <div
                        style={{
                            width: '80%',
                            height: '120px',
                            background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
                            borderRadius: '12px',
                            border: `1px solid ${COLORS.primaryNeon}44`,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            boxShadow: `0 4px 30px ${COLORS.primaryNeon}20`,
                        }}
                    >
                        <div style={{ color: COLORS.textPrimary, fontSize: '18px', fontWeight: '600' }}>
                            4K Ready Design
                        </div>
                    </div>
                    {/* Colorful elements */}
                    <div style={{ display: 'flex', gap: '10px' }}>
                        <div style={{ width: '40px', height: '40px', borderRadius: '8px', background: COLORS.primaryNeon }} />
                        <div style={{ width: '40px', height: '40px', borderRadius: '8px', background: COLORS.secondaryNeon }} />
                        <div style={{ width: '40px', height: '40px', borderRadius: '8px', background: COLORS.successGreen }} />
                    </div>
                </div>

                {/* AFTER Label */}
                <div
                    style={{
                        position: 'absolute',
                        bottom: '20px',
                        left: '50%',
                        transform: `translateX(-50%) translateY(${(1 - afterLabelProgress) * 50}px)`,
                        color: COLORS.successGreen,
                        fontFamily: 'Roboto Mono, monospace',
                        fontSize: '24px',
                        fontWeight: 'bold',
                        textTransform: 'uppercase',
                        letterSpacing: '4px',
                        opacity: afterLabelOpacity,
                        textShadow: `0 0 10px ${COLORS.successGreen}`,
                    }}
                >
                    {afterLabel}
                </div>
            </div>

            {/* Center Divider Line */}
            <div
                style={{
                    position: 'absolute',
                    top: '50%',
                    left: 0,
                    width: dividerWidth,
                    height: '3px',
                    background: `linear-gradient(90deg, transparent, ${COLORS.primaryNeon}, transparent)`,
                    boxShadow: `0 0 20px ${COLORS.primaryNeon}, 0 0 40px ${COLORS.primaryNeon}66`,
                    transform: 'translateY(-50%)',
                }}
            />
        </div>
    );
};
