import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { ArrowDown } from "lucide-react";
import React from 'react';

const COLORS = {
    bg: '#FDFCFB',
    text: '#1C1917',
    accent: '#EA580C'
};

export const Scene6Outro: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    // Arrow Animation
    const arrowY = spring({
        frame: frame - 10,
        fps,
        config: { damping: 10, mass: 2 }
    }); // Bouncy enter

    const arrowBob = Math.sin(frame / 5) * 20; // Up down continuous bob

    // Text Animation
    const textScale = spring({ frame: frame - 20, fps, config: { stiffness: 200 } });

    // Background Blur Effect (Simulated with opacity layers)
    const blurOpacity = interpolate(frame, [0, 10], [0, 0.8]);

    return (
        <AbsoluteFill style={{ backgroundColor: COLORS.bg, justifyContent: 'center', alignItems: 'center', overflow: 'hidden' }}>

            {/* Background - Blurred Shapes */}
            <AbsoluteFill style={{ filter: 'blur(40px)', opacity: 0.5 }}>
                <div style={{ position: 'absolute', top: '20%', left: '10%', width: 400, height: 400, backgroundColor: COLORS.accent, borderRadius: '50%' }} />
                <div style={{ position: 'absolute', bottom: '10%', right: '20%', width: 500, height: 500, backgroundColor: '#65A30D', borderRadius: '50%' }} />
            </AbsoluteFill>

            {/* Content Container */}
            <div style={{ zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 40 }}>

                <div style={{
                    transform: `scale(${textScale})`,
                    fontFamily: 'Merriweather, serif',
                    fontSize: 80,
                    fontWeight: 900,
                    color: COLORS.text,
                    textAlign: 'center',
                    lineHeight: 1.1,
                    textShadow: '0 4px 0 rgba(0,0,0,0.1)'
                }}>
                    LINK IN<br />
                    DESCRIPTION
                </div>

                <div style={{
                    transform: `translateY(${100 * (1 - arrowY) + arrowBob}px)`,
                    backgroundColor: COLORS.text,
                    borderRadius: '50%',
                    width: 120,
                    height: 120,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    boxShadow: '0 20px 40px rgba(0,0,0,0.3)'
                }}>
                    <ArrowDown size={60} color="#FFF" strokeWidth={4} />
                </div>

            </div>

        </AbsoluteFill>
    );
};
