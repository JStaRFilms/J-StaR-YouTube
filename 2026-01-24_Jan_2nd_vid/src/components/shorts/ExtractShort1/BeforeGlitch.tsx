import React, { useMemo } from 'react';
import { useCurrentFrame, useVideoConfig, interpolate } from 'remotion';
import { random } from 'remotion';

export const BeforeGlitch: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps, width, height } = useVideoConfig();

    // Deterministic random values based on frame
    const noiseX = useMemo(() => {
        return new Array(20).fill(0).map((_, i) => random(i * 100));
    }, []);

    const jitter = (seed: number, amplitude: number) => {
        const r = random(seed + frame);
        return (r - 0.5) * 2 * amplitude;
    };

    const glitchOpacity = interpolate(
        random(frame),
        [0, 0.9, 1],
        [1, 1, 0], // Occasional flicker to 0
    );

    const scanlineY = (frame * 10) % height;

    return (
        <div
            style={{
                width: '100%',
                height: '100%',
                backgroundColor: '#0a0a0a',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                position: 'relative',
                overflow: 'hidden',
                fontFamily: '"JetBrains Mono", monospace',
                color: '#33ff00',
            }}
        >
            {/* Scanlines */}
            <div
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    background: 'linear-gradient(to bottom, transparent 50%, rgba(0, 255, 0, 0.05) 50%)',
                    backgroundSize: '100% 4px',
                    pointerEvents: 'none',
                }}
            />

            {/* Moving bright scanline */}
            <div
                style={{
                    position: 'absolute',
                    top: scanlineY,
                    left: 0,
                    width: '100%',
                    height: '2px',
                    backgroundColor: 'rgba(50, 255, 50, 0.3)',
                    boxShadow: '0 0 10px rgba(50, 255, 50, 0.5)',
                }}
            />

            {/* Main Text with Glitch Layers */}
            <div style={{ position: 'relative' }}>
                {/* Layer 1: Red Shift */}
                <h1
                    style={{
                        fontSize: '120px',
                        fontWeight: 'bold',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        color: 'red',
                        opacity: 0.7,
                        transform: `translate(${jitter(10, 10)}px, ${jitter(20, 5)}px)`,
                        clipPath: `inset(${random(frame) * 100}% 0 ${random(frame + 1) * 50}% 0)`,
                    }}
                >
                    BEFORE
                </h1>

                {/* Layer 2: Blue Shift */}
                <h1
                    style={{
                        fontSize: '120px',
                        fontWeight: 'bold',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        color: 'blue',
                        opacity: 0.7,
                        transform: `translate(${jitter(30, 10)}px, ${jitter(40, 5)}px)`,
                        clipPath: `inset(${random(frame + 2) * 50}% 0 ${random(frame + 3) * 100}% 0)`,
                    }}
                >
                    BEFORE
                </h1>

                {/* Main Layer */}
                <h1
                    style={{
                        fontSize: '120px',
                        fontWeight: 'bold',
                        position: 'relative',
                        color: '#ffffff',
                        textShadow: '0 0 10px rgba(255, 255, 255, 0.8)',
                        transform: `translate(${jitter(50, 2)}px, 0)`,
                        opacity: glitchOpacity,
                    }}
                >
                    BEFORE
                </h1>
            </div>

            <div style={{ marginTop: 40, opacity: 0.7 }}>
                <code style={{ fontSize: '24px' }}>
                    &gt; SYSTEM_FAILURE<br />
                    &gt; STYLES_NOT_FOUND<br />
                    &gt; RETRYING...
                </code>
            </div>
        </div>
    );
};
