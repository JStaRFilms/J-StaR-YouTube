import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { DeviceFrame } from './DeviceFrame';
import { MockVsCode } from './MockVsCode';
import { AnimatedArrow } from './AnimatedArrow';
import { CodeParticles } from './CodeParticles';

export const TransformationScene: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    // 1. Arrow Drawing (Frame 10-25)
    // 2. Code Flowing (Frame 5-35)
    // 3. App Appearing (Frame 15-35)

    const arrowProgress = interpolate(frame, [10, 25], [0, 1], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
    });

    const appScale = spring({
        frame: frame - 15, // Starts earlier to overlap with arrow finishing
        fps,
        config: { damping: 15 },
    });

    const appOpacity = interpolate(frame, [15, 25], [0, 1], { extrapolateRight: 'clamp' });

    return (
        <div style={{ position: 'absolute', inset: 0 }}>
            <CodeParticles />

            {/* Layout Container */}
            <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%',
                height: '100%',
                gap: 50
            }}>
                {/* Space for the mockup (which is handled by parent composition layering or duplicated here if needed. 
                    Actually, we'll assume the MockupScene is still visible in the background or passed as a prop, 
                    but simpler to just have the arrow and app here visually.) 
                */}

                {/* Arrow in the middle */}
                <div style={{ width: 300, display: 'flex', justifyContent: 'center', transform: 'translateY(50px)' }}>
                    <AnimatedArrow progress={arrowProgress} />
                </div>

                {/* The Code App */}
                <div style={{
                    width: 700,
                    height: 500,
                    transform: `scale(${appScale})`,
                    opacity: appOpacity,
                }}>
                    <DeviceFrame title="VS Code - Project v1" type="desktop">
                        <MockVsCode />
                    </DeviceFrame>
                </div>
            </div>
        </div>
    );
};
