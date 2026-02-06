import React from 'react';
import { useCurrentFrame, useVideoConfig, spring, interpolate } from 'remotion';
import { GarbageWireframe } from './GarbageWireframe';
import { ProMockup } from './ProMockup';

interface SliderWipeProps {
    direction?: 'left' | 'right';
}

export const SliderWipe: React.FC<SliderWipeProps> = ({ direction = 'right' }) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    // Container fade in
    const containerOpacity = interpolate(frame, [0, 15], [0, 1], {
        extrapolateRight: 'clamp',
    });

    // Left and right sides slide in
    const sideSpring = spring({
        frame,
        fps,
        config: { damping: 20, stiffness: 100 },
    });
    const leftX = interpolate(sideSpring, [0, 1], [-100, 0]);
    const rightX = interpolate(sideSpring, [0, 1], [100, 0]);

    // Slider handle movement
    const sliderProgress = interpolate(frame, [20, 80], [0, 100], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
    });

    // Label fade in
    const beforeLabelOpacity = interpolate(frame, [20, 30], [0, 1], {
        extrapolateRight: 'clamp',
    });
    const afterLabelOpacity = interpolate(frame, [60, 70], [0, 1], {
        extrapolateRight: 'clamp',
    });

    return (
        <div
            style={{
                width: '600px',
                height: '500px',
                position: 'relative',
                opacity: containerOpacity,
                overflow: 'hidden',
                borderRadius: '20px',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.15)',
            }}
        >
            {/* Left Side - Garbage (Before) */}
            <div
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    backgroundColor: '#F1F5F9',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transform: `translateX(${leftX}px)`,
                    clipPath: `inset(0 ${100 - sliderProgress}% 0 0)`,
                }}
            >
                <GarbageWireframe />

                {/* BEFORE Label */}
                <div
                    style={{
                        position: 'absolute',
                        top: '20px',
                        left: '20px',
                        backgroundColor: '#EF4444',
                        color: 'white',
                        padding: '8px 16px',
                        borderRadius: '8px',
                        fontSize: '14px',
                        fontWeight: '700',
                        fontFamily: 'Inter, sans-serif',
                        opacity: beforeLabelOpacity,
                    }}
                >
                    BEFORE
                </div>
            </div>

            {/* Right Side - Pro (After) */}
            <div
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    backgroundColor: '#F8FAFC',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transform: `translateX(${rightX}px)`,
                    clipPath: `inset(0 0 0 ${sliderProgress}%)`,
                }}
            >
                <ProMockup />

                {/* AFTER Label */}
                <div
                    style={{
                        position: 'absolute',
                        top: '20px',
                        right: '20px',
                        backgroundColor: '#22C55E',
                        color: 'white',
                        padding: '8px 16px',
                        borderRadius: '8px',
                        fontSize: '14px',
                        fontWeight: '700',
                        fontFamily: 'Inter, sans-serif',
                        opacity: afterLabelOpacity,
                    }}
                >
                    AFTER
                </div>
            </div>

            {/* Slider Handle */}
            <div
                style={{
                    position: 'absolute',
                    top: 0,
                    bottom: 0,
                    left: `${sliderProgress}%`,
                    width: '4px',
                    backgroundColor: 'white',
                    boxShadow: '0 0 10px rgba(0,0,0,0.2)',
                    transform: 'translateX(-50%)',
                    zIndex: 10,
                }}
            >
                {/* Handle circle */}
                <div
                    style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: '48px',
                        height: '48px',
                        backgroundColor: 'white',
                        borderRadius: '50%',
                        boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path
                            d="M9 18L3 12L9 6"
                            stroke="#64748B"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M15 18L21 12L15 6"
                            stroke="#64748B"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </div>
            </div>
        </div>
    );
};
