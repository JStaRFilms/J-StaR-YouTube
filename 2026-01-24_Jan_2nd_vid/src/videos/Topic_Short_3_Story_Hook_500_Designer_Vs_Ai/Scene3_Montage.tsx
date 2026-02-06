import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate } from 'remotion';
import { ColorSwatchesGrid } from './components/ColorSwatchesGrid';
import { FontPairingDemo } from './components/FontPairingDemo';
import { SpacingGuides } from './components/SpacingGuides';

const LIGHT_BG_COLOR = '#F8FAFC';

export const Scene3_Montage: React.FC = () => {
    const frame = useCurrentFrame();

    // Clip transitions
    // Clip 1: Colors - extended to 65 frames so all 9 swatches can appear
    // Last swatch (index 8) starts at: 8 * 3 + 5 = frame 29, ends ~frame 40
    // Clip 2: Fonts (65-115 frames)
    // Clip 3: Spacing (115-165 frames)

    const colorsOpacity = interpolate(frame, [0, 10, 55, 65], [0, 1, 1, 0], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
    });

    const fontsOpacity = interpolate(frame, [60, 70, 110, 120], [0, 1, 1, 0], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
    });

    const spacingOpacity = interpolate(frame, [115, 125, 160, 170], [0, 1, 1, 0], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
    });

    return (
        <AbsoluteFill
            style={{
                backgroundColor: LIGHT_BG_COLOR,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            {/* Color Swatches - First clip */}
            <div
                style={{
                    position: 'absolute',
                    opacity: colorsOpacity,
                }}
            >
                <ColorSwatchesGrid />
            </div>

            {/* Font Pairing - Second clip */}
            <div
                style={{
                    position: 'absolute',
                    opacity: fontsOpacity,
                }}
            >
                <FontPairingDemo />
            </div>

            {/* Spacing Guides - Third clip */}
            <div
                style={{
                    position: 'absolute',
                    opacity: spacingOpacity,
                }}
            >
                <SpacingGuides />
            </div>
        </AbsoluteFill>
    );
};
