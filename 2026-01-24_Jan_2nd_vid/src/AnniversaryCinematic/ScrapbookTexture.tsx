import React from "react";
import { AbsoluteFill } from "remotion";

export const ScrapbookTexture: React.FC = () => {
    return (
        <AbsoluteFill style={{ pointerEvents: 'none', zIndex: 0 }}>
            {/* Film Grain / Noise */}
            <svg width="100%" height="100%" style={{ position: 'absolute', opacity: 0.15 }}>
                <filter id="noiseFilter">
                    <feTurbulence
                        type="fractalNoise"
                        baseFrequency="0.8"
                        numOctaves="3"
                        stitchTiles="stitch" />
                </filter>
                <rect width="100%" height="100%" filter="url(#noiseFilter)" />
            </svg>

            {/* Vignette */}
            <div style={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                background: 'radial-gradient(circle, rgba(0,0,0,0) 50%, rgba(26,26,46,0.8) 100%)',
                pointerEvents: 'none'
            }} />
        </AbsoluteFill>
    );
};
