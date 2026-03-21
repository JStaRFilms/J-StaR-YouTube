import React from 'react';
import { Composition, Sequence, useVideoConfig } from 'remotion';
import { z } from 'zod';
import { GridBackgroundV2 } from './GridBackgroundV2';
import {
  Scene1V2,
  Scene2V2,
  Scene3V2,
  Scene4V2,
  Scene5V2,
  Scene6V2,
  Scene7V2,
} from './ScenesV2';

export const Short2EmptySetupV2Schema = z.object({
  titleText: z.string().default('The Real Problem V2'),
  accentColor: z.string().default('#06B6D4'),
});

export const Short2EmptySetupV2: React.FC<z.infer<typeof Short2EmptySetupV2Schema>> = ({
  titleText,
  accentColor,
}) => {
  const { fps } = useVideoConfig();

  // Durations based on high retention spec:
  // Scene 1: 3s (90 frames)
  // Scene 2: 4s (120 frames)
  // Scene 3: 4s (120 frames)
  // Scene 4: 5s (150 frames)
  // Scene 5: 5s (150 frames)
  // Scene 6: 7s (210 frames)
  // Scene 7: 7s (210 frames)
  // Total: 1050 frames

  return (
    <>
      <GridBackgroundV2 />

      <Sequence from={0} durationInFrames={90} premountFor={1 * fps}>
        <Scene1V2 />
      </Sequence>

      <Sequence from={90} durationInFrames={120} premountFor={1 * fps}>
        <Scene2V2 />
      </Sequence>

      <Sequence from={210} durationInFrames={120} premountFor={1 * fps}>
        <Scene3V2 />
      </Sequence>

      <Sequence from={330} durationInFrames={150} premountFor={1 * fps}>
        <Scene4V2 />
      </Sequence>

      <Sequence from={480} durationInFrames={150} premountFor={1 * fps}>
        <Scene5V2 />
      </Sequence>

      <Sequence from={630} durationInFrames={210} premountFor={1 * fps}>
        <Scene6V2 />
      </Sequence>

      <Sequence from={840} durationInFrames={210} premountFor={1 * fps}>
        <Scene7V2 />
      </Sequence>
    </>
  );
};
