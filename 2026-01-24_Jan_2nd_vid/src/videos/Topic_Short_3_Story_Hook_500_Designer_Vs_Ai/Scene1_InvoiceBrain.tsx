import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate } from 'remotion';
import { InvoiceCard } from './components/InvoiceCard';
import { RedXMark } from './components/RedXMark';
import { BrainWithPenTool } from './components/BrainWithPenTool';

const LIGHT_BG_COLOR = '#F8FAFC';

export const Scene1_InvoiceBrain: React.FC = () => {
    const frame = useCurrentFrame();

    // Invoice shake + fade out
    const invoiceShake = interpolate(frame, [90, 120], [0, 5], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
    });
    const invoiceOpacity = interpolate(frame, [90, 120], [1, 0], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
    });
    const invoiceShakeX = frame > 90 ? Math.sin(frame * 0.5) * invoiceShake : 0;

    // RedXMark opacity (starts at frame 60)
    const xMarkOpacity = interpolate(frame, [60, 65], [0, 1], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
    });

    // Brain fade in
    const brainOpacity = interpolate(frame, [100, 130], [0, 1], {
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
            {/* Invoice Card with X overlay */}
            <div
                style={{
                    position: 'relative',
                    transform: `translateX(${invoiceShakeX}px)`,
                    opacity: invoiceOpacity,
                }}
            >
                <InvoiceCard />

                {/* Red X Mark */}
                <div
                    style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        opacity: xMarkOpacity,
                    }}
                >
                    <RedXMark />
                </div>
            </div>

            {/* Brain with Pen Tool */}
            <div
                style={{
                    position: 'absolute',
                    opacity: brainOpacity,
                }}
            >
                <BrainWithPenTool />
            </div>
        </AbsoluteFill>
    );
};
