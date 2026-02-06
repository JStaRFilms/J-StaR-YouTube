import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig, spring } from 'remotion';

export const CringeOverlay: React.FC<{
    startFrame: number;
}> = ({ startFrame }) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const activeFrame = frame - startFrame;

    if (activeFrame < 0) return null;

    // Vignette effect
    const vignetteOpacity = interpolate(activeFrame, [0, 10], [0, 1], { extrapolateRight: 'clamp' });

    // Screen Shake (this will need to be applied to a parent or the content, 
    // but here we can just do the overlay elements. 
    // The actual shake might need to be in the main composition or we can shake the overlay itself visually)
    // For this component, let's just do the overlays.

    // Emojis
    // 😬 🤮 💀
    const emoji1Spring = spring({ frame: activeFrame - 5, fps, config: { damping: 12 } }); // 😬
    const emoji2Spring = spring({ frame: activeFrame - 10, fps, config: { damping: 12 } }); // 🤮
    const emoji3Spring = spring({ frame: activeFrame - 15, fps, config: { damping: 12 } }); // 💀

    // Text Overlay
    const textScale = spring({ frame: activeFrame - 20, fps, config: { damping: 15 } });

    return (
        <AbsoluteFill style={{ pointerEvents: 'none' }}>
            {/* Red Vignette */}
            <div
                className="absolute inset-0 z-50 mix-blend-multiply"
                style={{
                    background: 'radial-gradient(circle, transparent 60%, red 100%)',
                    opacity: vignetteOpacity * 0.6
                }}
            />

            {/* Emojis */}
            <div className="absolute top-10 left-10 text-9xl transform -rotate-12 drop-shadow-lg" style={{ transform: `scale(${emoji1Spring}) rotate(-12deg)` }}>
                😬
            </div>
            <div className="absolute bottom-10 right-10 text-9xl transform rotate-12 drop-shadow-lg" style={{ transform: `scale(${emoji2Spring}) rotate(12deg)` }}>
                🤮
            </div>
            <div className="absolute top-1/2 left-1/4 text-9xl drop-shadow-lg" style={{ transform: `scale(${emoji3Spring})` }}>
                💀
            </div>

            {/* Text */}
            <div className="absolute inset-0 flex items-center justify-center z-50">
                <h1
                    className="text-8xl font-black text-white stroke-black tracking-tighter text-center leading-none drop-shadow-2xl"
                    style={{
                        transform: `scale(${textScale})`,
                        textShadow: '0 0 20px rgba(0,0,0,0.8)'
                    }}
                >
                    GENERIC.<br />BORING.<br />UNUSABLE.
                </h1>
            </div>
        </AbsoluteFill>
    );
};
