import React from 'react';
import { Sequence } from 'remotion';
import { Scene1Trap } from './short1-system-problem/Scene1Trap';
import { Scene2Mess } from './short1-system-problem/Scene2Mess';
import { Scene3Collapse } from './short1-system-problem/Scene3Collapse';
import { Scene4Identify } from './short1-system-problem/Scene4Identify';
import { Scene5Build } from './short1-system-problem/Scene5Build';
import { Scene6Command } from './short1-system-problem/Scene6Command';
import { Scene7Results } from './short1-system-problem/Scene7Results';
import { Scene8Cta } from './short1-system-problem/Scene8Cta';
import { LightBackground } from './short1-system-problem/shared';

export const Short1SystemProblem: React.FC = () => {
  return (
    <LightBackground>
      <Sequence from={0} durationInFrames={120} premountFor={30}>
        <Scene1Trap />
      </Sequence>
      <Sequence from={120} durationInFrames={150} premountFor={30}>
        <Scene2Mess />
      </Sequence>
      <Sequence from={270} durationInFrames={180} premountFor={30}>
        <Scene3Collapse />
      </Sequence>
      <Sequence from={450} durationInFrames={120} premountFor={30}>
        <Scene4Identify />
      </Sequence>
      <Sequence from={570} durationInFrames={210} premountFor={30}>
        <Scene5Build />
      </Sequence>
      <Sequence from={780} durationInFrames={210} premountFor={30}>
        <Scene6Command />
      </Sequence>
      <Sequence from={990} durationInFrames={150} premountFor={30}>
        <Scene7Results />
      </Sequence>
      <Sequence from={1140} durationInFrames={150} premountFor={30}>
        <Scene8Cta />
      </Sequence>
    </LightBackground>
  );
};
