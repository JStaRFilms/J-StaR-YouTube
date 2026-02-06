import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig, Img, staticFile } from 'remotion';

export const VerdictReveal: React.FC<{
    startFrame: number;
}> = ({ startFrame }) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();
    const activeFrame = frame - startFrame;

    if (activeFrame < 0) return null;

    // Desaturation logic will be in parent

    // Stamp Animation
    const stampScale = spring({ frame: activeFrame - 5, fps, config: { damping: 10, mass: 0.5 } });
    const stampRotation = interpolate(stampScale, [0, 1], [-45, -15]);
    const stampOpacity = interpolate(activeFrame, [0, 5], [0, 1]);

    // Trash Can Animation
    const trashY = spring({ frame: activeFrame - 15, fps, config: { damping: 12 } });
    const trashMove = interpolate(trashY, [0, 1], [1000, 0]);

    return (
        <AbsoluteFill className="flex justify-center items-center z-50 pointer-events-none">
            {/* GARBAGE STAMP */}
            <div
                className="relative font-black text-9xl p-10 tracking-widest uppercase transform"
                style={{
                    transform: `scale(${stampScale}) rotate(${stampRotation}deg)`,
                    opacity: stampOpacity,
                }}
            >
                {/* The Text */}
                <span className="text-red-700 border-8 border-red-700 p-4">GARBAGE</span>

                {/* The Texture Overlay - Multiply blend to make it look stamped */}
                <Img
                    src={staticFile('assets/br07_vanilla_ai_cringe/garbage_stamp_texture.png')}
                    className="absolute inset-0 w-full h-full object-cover mix-blend-screen opacity-70 pointer-events-none"
                    style={{ filter: 'invert(1) contrast(2)' }} // Invert so white becomes black (transparent in screen) and black becomes white (visible texture)? 
                // Actually, if texture is black on white:
                // Multiply: White -> Transparent, Black -> Dark. We want the "Black" parts of texture to "erase" the red stamp?
                // If we want "erased" look (grunge):
                // We want the RED to be missing where the texture is BLACK.
                // Screen: Black -> Transparent, White -> Light.

                // Let's stick to the Mask approach but simplify the syntax and ensure file loads.
                // Or use MixBlendMode 'destination-out' if possible? No.

                // Simpler approach: Use the texture as an overlay that is WHITE where we want holes (if background is white).
                // But background is potentially complex.

                // Let's retry the mask but with the Img tag style to ensure it loads.
                />
            </div>

            {/* Trash Can Icon */}
            <div
                className="absolute bottom-0 mb-[-50px]"
                style={{ transform: `translateY(${trashMove}px)` }}
            >
                <div className="text-[200px]">🗑️</div>
            </div>
        </AbsoluteFill>
    );
};
