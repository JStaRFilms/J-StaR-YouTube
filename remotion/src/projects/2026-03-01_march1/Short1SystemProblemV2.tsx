import React from 'react';
import { AbsoluteFill, Sequence, useCurrentFrame, useVideoConfig, Audio, staticFile } from 'remotion';
import { Scene1Hook } from './short1-system-problem-v2/Scene1Hook';
import { Scene2DuctTape } from './short1-system-problem-v2/Scene2DuctTape';
import { Scene3Collapse } from './short1-system-problem-v2/Scene3Collapse';
import { Scene4Reset } from './short1-system-problem-v2/Scene4Reset';
import { Scene5Ignition } from './short1-system-problem-v2/Scene5Ignition';
import { Scene6Terminal } from './short1-system-problem-v2/Scene6Terminal';
import { Scene7Perfection } from './short1-system-problem-v2/Scene7Perfection';
import { Scene8Bridge } from './short1-system-problem-v2/Scene8Bridge';

export const Short1SystemProblemV2: React.FC = () => {
  const fps = 60;
  
  // Total Frames = 1800 (30 seconds)
  // Scene 1: 0 - 3s (180f)
  // Scene 2: 3 - 6s (180f)
  // Scene 3: 6 - 9s (180f)
  // Scene 4: 9 - 12s (180f)
  // Scene 5: 12 - 16s (240f)
  // Scene 6: 16 - 21s (300f)
  // Scene 7: 21 - 25s (240f)
  // Scene 8: 25 - 30s (300f)

  return (
    <AbsoluteFill style={{ backgroundColor: '#FFFFFF', flex: 1 }}>
      {/* Light mode base */}

      {/* Placeholders for voiceover/audio logic. The user adds actual MP3s to public/assets later */}
      {/* <Audio src={staticFile('voiceover_v2.mp3')} /> */}

      <Sequence from={0} durationInFrames={180} premountFor={1 * fps}>
        <Scene1Hook />
      </Sequence>

      <Sequence from={180} durationInFrames={180} premountFor={1 * fps}>
        <Scene2DuctTape />
      </Sequence>

      <Sequence from={360} durationInFrames={180} premountFor={1 * fps}>
        <Scene3Collapse />
      </Sequence>

      <Sequence from={540} durationInFrames={180} premountFor={1 * fps}>
        <Scene4Reset />
      </Sequence>

      <Sequence from={720} durationInFrames={240} premountFor={1 * fps}>
        <Scene5Ignition />
      </Sequence>

      <Sequence from={960} durationInFrames={300} premountFor={1 * fps}>
        <Scene6Terminal />
      </Sequence>

      <Sequence from={1200} durationInFrames={240} premountFor={1 * fps}>
        <Scene7Perfection />
      </Sequence>

      <Sequence from={1440} durationInFrames={360} premountFor={1 * fps}>
        <Scene8Bridge />
      </Sequence>

    </AbsoluteFill>
  );
};
