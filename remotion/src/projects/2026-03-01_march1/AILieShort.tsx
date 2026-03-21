import React from 'react';
import { AbsoluteFill, Sequence, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { tokens } from '../../shared/styles';
import { BottomCaption, FooterCta, MetricBadge, PanelCard, ShortBackground, TitleBlock, WindowFrame } from './shared';

const randomCards = [
  'prompt-v7-final.md',
  'seo-skill-copy.md',
  'magic-agent-rule.txt',
  'best-ui-prompt.md',
  'random-autofix.md',
  'ultimate-build-skill.md'
];

const systemCards = [
  { title: 'Design', detail: 'clear standards + visual rules', accent: tokens.colors.accent },
  { title: 'Review', detail: 'checks code before it ships', accent: tokens.colors.accentAlt },
  { title: 'SEO', detail: 'metadata + structure locked in', accent: '#22C55E' },
  { title: 'Deploy', detail: 'repeatable release path', accent: '#F59E0B' }
];

export const March1AILieShort: React.FC = () => {
  return (
    <ShortBackground>
      <Sequence from={0} durationInFrames={150}>
        <HookScene />
      </Sequence>
      <Sequence from={150} durationInFrames={270}>
        <ChaosScene />
      </Sequence>
      <Sequence from={420} durationInFrames={240}>
        <RandomOutputScene />
      </Sequence>
      <Sequence from={660} durationInFrames={270}>
        <SystemScene />
      </Sequence>
      <Sequence from={930} durationInFrames={180}>
        <MetricsScene />
      </Sequence>
      <Sequence from={1110} durationInFrames={240}>
        <CtaScene />
      </Sequence>
    </ShortBackground>
  );
};

const HookScene: React.FC = () => {
  return (
    <AbsoluteFill style={{ padding: '160px 72px 0', justifyContent: 'flex-start' }}>
      <TitleBlock
        eyebrow="HOT TAKE"
        title="THE BIGGEST AI LIE"
        subtitle="More downloaded skills does not equal better output."
      />
      <BottomCaption text="Most people are not building AI systems. They are stacking random behaviors." />
    </AbsoluteFill>
  );
};

const ChaosScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill style={{ padding: '140px 56px 0' }}>
      <div style={{ fontSize: 36, fontWeight: 900, color: '#F87171', marginBottom: 22 }}>CHAOS STACK</div>
      <div style={{ position: 'relative', height: 1040 }}>
        {randomCards.map((card, index) => {
          const delay = index * 5;
          const enter = spring({
            frame: frame - delay,
            fps,
            config: { damping: 14, stiffness: 110 }
          });
          const x = [0, 100, -120, 140, -70, 80][index];
          const y = [0, 130, 260, 430, 620, 790][index];
          const rotation = [-8, 5, -4, 7, -6, 4][index];

          return (
            <div
              key={card}
              style={{
                position: 'absolute',
                left: 160 + x,
                top: 40 + y,
                width: 640,
                padding: '24px 26px',
                borderRadius: 24,
                background: 'rgba(25, 28, 37, 0.9)',
                border: '1px solid rgba(239,68,68,0.4)',
                boxShadow: '0 20px 90px rgba(239,68,68,0.12)',
                transform: `translateY(${interpolate(enter, [0, 1], [80, 0])}px) rotate(${rotation}deg) scale(${interpolate(enter, [0, 1], [0.92, 1])})`
              }}
            >
              <div style={{ fontSize: 24, fontWeight: 800, color: '#FCA5A5' }}>random skill</div>
              <div style={{ fontSize: 34, fontWeight: 900, marginTop: 8 }}>{card}</div>
            </div>
          );
        })}
      </div>
      <BottomCaption text="Random prompts. Random rules. Random behaviors." />
    </AbsoluteFill>
  );
};

const RandomOutputScene: React.FC = () => {
  return (
    <AbsoluteFill style={{ padding: '130px 56px 0' }}>
      <WindowFrame label="inconsistent-output.log" accent="#F87171" style={{ width: '100%' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          {[
            'works for one task, breaks on the next',
            'guesses context because nothing is defined',
            'produces bloated output under pressure'
          ].map((line) => (
            <PanelCard key={line} accent="#F87171" style={{ padding: '22px 24px' }}>
              <div style={{ fontSize: 30, fontWeight: 800 }}>{line}</div>
            </PanelCard>
          ))}
        </div>
      </WindowFrame>
      <BottomCaption text="That is not a system. That is a pile of disconnected tricks." />
    </AbsoluteFill>
  );
};

const SystemScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill style={{ padding: '120px 56px 0' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 22 }}>
        {systemCards.map((card, index) => {
          const enter = spring({
            frame: frame - index * 6,
            fps,
            config: { damping: 16, stiffness: 120 }
          });
          return (
            <PanelCard
              key={card.title}
              title={card.title}
              subtitle={card.detail}
              accent={card.accent}
              style={{
                transform: `scale(${interpolate(enter, [0, 1], [0.86, 1])}) translateY(${interpolate(enter, [0, 1], [90, 0])}px)`
              }}
            >
              <div style={{ fontSize: 24, color: 'rgba(232,232,237,0.66)' }}>Every skill has a clear job.</div>
            </PanelCard>
          );
        })}
      </div>
      <div
        style={{
          marginTop: 30,
          padding: '24px 28px',
          borderRadius: 24,
          background: 'rgba(255,255,255,0.04)',
          border: `1px solid ${tokens.colors.border}`,
          fontSize: 34,
          fontWeight: 900
        }}
      >
        Structure turns AI from a chatbot into a real operating system.
      </div>
    </AbsoluteFill>
  );
};

const MetricsScene: React.FC = () => {
  return (
    <AbsoluteFill style={{ padding: '220px 70px 0' }}>
      <div style={{ display: 'flex', gap: 26, justifyContent: 'center' }}>
        <MetricBadge label="Custom Skills" value="64" />
        <MetricBadge label="Workflows" value="26" accent={tokens.colors.accent} />
        <MetricBadge label="Outcome" value="Clean" accent="#22C55E" />
      </div>
      <BottomCaption text="That is when the setup got faster, cleaner, and actually reliable." />
    </AbsoluteFill>
  );
};

const CtaScene: React.FC = () => {
  return (
    <AbsoluteFill style={{ paddingTop: 180 }}>
      <TitleBlock
        eyebrow="FULL VIDEO"
        title="BUILD THE SYSTEM"
        subtitle="The long video breaks down how the full custom AI operating system works."
      />
      <FooterCta title="Watch the full breakdown next" subtitle="50+ custom system. Build process. How the pieces connect." />
    </AbsoluteFill>
  );
};
