import React from 'react';
import { Composition, Sequence, useVideoConfig } from 'remotion';
import { z } from 'zod';
import { GridBackground } from './GridBackground';
import {
  Scene1AiScapegoat,
  Scene2EmptyVoid,
  Scene3MissingPieces,
  Scene4TheGuesswork,
  Scene5TheCollapse,
  Scene6TheSetup,
  Scene7OutroCTA,
} from './Scenes';

export const Short2EmptySetupSchema = z.object({
  titleText: z.string().default('The Real Problem'),
  accentColor: z.string().default('#06B6D4'),
});

export const Short2EmptySetup: React.FC<z.infer<typeof Short2EmptySetupSchema>> = ({
  titleText,
  accentColor,
}) => {
  const { fps } = useVideoConfig();

  // Durations based on spec:
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
      <GridBackground />

      <Sequence from={0} durationInFrames={90} premountFor={1 * fps}>
        <Scene1AiScapegoat />
      </Sequence>

      <Sequence from={90} durationInFrames={120} premountFor={1 * fps}>
        <Scene2EmptyVoid />
      </Sequence>

      <Sequence from={210} durationInFrames={120} premountFor={1 * fps}>
        <Scene3MissingPieces />
      </Sequence>

      <Sequence from={330} durationInFrames={150} premountFor={1 * fps}>
        <Scene4TheGuesswork />
      </Sequence>

      <Sequence from={480} durationInFrames={150} premountFor={1 * fps}>
        <Scene5TheCollapse />
      </Sequence>

      <Sequence from={630} durationInFrames={210} premountFor={1 * fps}>
        <Scene6TheSetup />
      </Sequence>

      <Sequence from={840} durationInFrames={210} premountFor={1 * fps}>
        <Scene7OutroCTA />
      </Sequence>
    </>
  );
};
