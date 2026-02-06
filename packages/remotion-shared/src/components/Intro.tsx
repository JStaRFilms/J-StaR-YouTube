import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from 'remotion';

export interface IntroProps {
    title: string;
    subtitle?: string;
    backgroundColor?: string;
    textColor?: string;
}

export const Intro: React.FC<IntroProps> = ({
    title,
    subtitle,
    backgroundColor = '#000',
    textColor = '#fff'
}) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const titleProgress = spring({
        frame,
        fps,
        config: {
            damping: 100,
        },
    });

    const opacity = interpolate(titleProgress, [0, 1], [0, 1]);
    const scale = interpolate(titleProgress, [0, 1], [0.8, 1]);

    return (
        <AbsoluteFill
            style={{
                backgroundColor,
                justifyContent: 'center',
                alignItems: 'center',
                padding: '0 10%',
            }}
        >
            <div style={{ transform: `scale(${scale})`, opacity }}>
                <h1
                    style={{
                        color: textColor,
                        fontSize: 80,
                        fontWeight: 'bold',
                        textAlign: 'center',
                        margin: 0,
                    }}
                >
                    {title}
                </h1>
                {subtitle && (
                    <p
                        style={{
                            color: textColor,
                            fontSize: 32,
                            textAlign: 'center',
                            marginTop: 20,
                        }}
                    >
                        {subtitle}
                    </p>
                )}
            </div>
        </AbsoluteFill>
    );
};
