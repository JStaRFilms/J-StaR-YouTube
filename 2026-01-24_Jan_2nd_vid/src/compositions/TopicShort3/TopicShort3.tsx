import React from 'react';
import { Series, AbsoluteFill, Audio, staticFile } from 'remotion';
import { loadFont } from "@remotion/google-fonts/Inter";
import { loadFont as loadOutfit } from "@remotion/google-fonts/Outfit";
import { loadFont as loadJetBrains } from "@remotion/google-fonts/JetBrainsMono";

import { Scene1_Invoice } from './Scene1_Invoice';
import { Scene2_System } from './Scene2_System';
import { Scene3_Montage } from './Scene3_Montage';
import { Scene4_Slider } from './Scene4_Slider';
import { Scene5_CTA } from './Scene5_CTA';

const { fontFamily: fontInter } = loadFont();
const { fontFamily: fontOutfit } = loadOutfit();
const { fontFamily: fontJetBrains } = loadJetBrains();

// Apply global font styles to AbsoluteFill or a wrapper
const containerStyle = {
    fontFamily: fontInter,
};

// Add global CSS variables or styles for the fonts to apply correctly if needed, 
// usually simpler to just use classes or specific font families on elements.

export const TopicShort3 = () => {
    return (
        <AbsoluteFill style={{ ...containerStyle }} className="bg-white text-slate-900">
            {/* Audio Track */}
            {/* Using try/catch or conditional in case files don't exist yet to prevent crash */}
            <Audio src={staticFile('remotion/Topic_Short_3/Topic_Short_3_VO.mp3')} />
            <Audio src={staticFile('remotion/Topic_Short_3/Tech_House_Light.mp3')} volume={0.1} loop />

            <Series>
                <Series.Sequence durationInFrames={150}>
                    <Scene1_Invoice />
                </Series.Sequence>
                <Series.Sequence durationInFrames={120}>
                    <Scene2_System />
                </Series.Sequence>
                <Series.Sequence durationInFrames={150}>
                    <Scene3_Montage />
                </Series.Sequence>
                <Series.Sequence durationInFrames={90}>
                    <Scene4_Slider />
                </Series.Sequence>
                <Series.Sequence durationInFrames={240}>
                    <Scene5_CTA />
                </Series.Sequence>
            </Series>
        </AbsoluteFill>
    );
};
