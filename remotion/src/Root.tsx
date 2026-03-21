import React from 'react';
import { Composition } from 'remotion';
import { Short1SystemProblem } from './projects/2026-03-01_march1/Short1SystemProblem';
import { Short1SystemProblemV2 } from './projects/2026-03-01_march1/Short1SystemProblemV2';
import { Short2EmptySetup, Short2EmptySetupSchema } from './projects/2026-03-01_march1/short2-empty-setup/Short2EmptySetup';
import { Short2EmptySetupV2, Short2EmptySetupV2Schema } from './projects/2026-03-01_march1/short2-empty-setup-v2/Short2EmptySetupV2';
import { Short3DemoVsRealV3 } from './projects/2026-03-01_march1/short3-demo-vs-real-v3/Short3DemoVsRealV3';

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="2026-03-01-march1-system-problem"
        component={Short1SystemProblem}
        durationInFrames={1290}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="Short1SystemProblemV2"
        component={Short1SystemProblemV2}
        durationInFrames={1800} /* 30 seconds @ 60fps */
        fps={60}
        width={1080}
        height={1920}
      />
      <Composition
        id="Short2EmptySetup"
        component={Short2EmptySetup}
        durationInFrames={1050}
        fps={30}
        width={1080}
        height={1920}
        schema={Short2EmptySetupSchema}
        defaultProps={{
          titleText: "The Real Problem",
          accentColor: "#06B6D4"
        }}
      />
      <Composition
        id="Short2EmptySetupV2"
        component={Short2EmptySetupV2}
        durationInFrames={1050}
        fps={30}
        width={1080}
        height={1920}
        schema={Short2EmptySetupV2Schema}
        defaultProps={{
          titleText: "The Real Problem V2",
          accentColor: "#06B6D4"
        }}
      />
      <Composition
        id="Short3DemoVsRealV3"
        component={Short3DemoVsRealV3}
        durationInFrames={1350}
        fps={30}
        width={1080}
        height={1920}
      />
    </>
  );
};
