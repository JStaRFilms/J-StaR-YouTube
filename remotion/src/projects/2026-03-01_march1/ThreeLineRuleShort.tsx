import React from 'react';
import { AbsoluteFill, Sequence, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { tokens } from '../../shared/styles';
import { BottomCaption, FooterCta, PanelCard, ShortBackground, TitleBlock, WindowFrame } from './shared';

const pillars = [
  { label: 'TRIGGER', accent: tokens.colors.accentAlt, note: 'when should it run?' },
  { label: 'CONTEXT', accent: tokens.colors.accent, note: 'what does it need to know?' },
  { label: 'OUTCOME', accent: '#22C55E', note: 'what must it deliver?' }
];

export const March1ThreeLineRuleShort: React.FC = () => {
  return (
    <ShortBackground accent="#22C55E" accentAlt={tokens.colors.accentAlt}>
      <Sequence from={0} durationInFrames={150}>
        <RuleHookScene />
      </Sequence>
      <Sequence from={150} durationInFrames={240}>
        <PillarScene />
      </Sequence>
      <Sequence from={390} durationInFrames={270}>
        <FailureScene />
      </Sequence>
      <Sequence from={660} durationInFrames={210}>
        <AssemblyScene />
      </Sequence>
      <Sequence from={870} durationInFrames={210}>
        <ComparisonScene />
      </Sequence>
      <Sequence from={1080} durationInFrames={270}>
        <RuleCtaScene />
      </Sequence>
    </ShortBackground>
  );
};

const RuleHookScene: React.FC = () => {
  return (
    <AbsoluteFill style={{ padding: '160px 72px 0' }}>
      <TitleBlock
        eyebrow="QUICK WIN"
        title="3 LINES FIX BAD AI"
        subtitle="Before you add a skill, define trigger, context, and outcome."
        accent="#22C55E"
      />
      <BottomCaption text="Most bad AI setups are not missing tools. They are missing structure." />
    </AbsoluteFill>
  );
};

const PillarScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill style={{ padding: '200px 56px 0' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        {pillars.map((pillar, index) => {
          const enter = spring({
            frame: frame - index * 8,
            fps,
            config: { damping: 15, stiffness: 110 }
          });
          return (
            <div
              key={pillar.label}
              style={{
                transform: `translateX(${interpolate(enter, [0, 1], [-140, 0])}px)`
              }}
            >
              <PanelCard accent={pillar.accent} style={{ padding: '28px 30px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ fontSize: 50, fontWeight: 900 }}>{pillar.label}</div>
                  <div style={{ color: pillar.accent, fontSize: 26, fontWeight: 800 }}>{pillar.note}</div>
                </div>
              </PanelCard>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

const FailureScene: React.FC = () => {
  return (
    <AbsoluteFill style={{ padding: '120px 56px 0' }}>
      <WindowFrame label="failure-modes.md" accent="#F59E0B">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          <PanelCard title="No trigger" accent="#F59E0B" subtitle="The wrong skill runs at the wrong time." />
          <PanelCard title="No context" accent={tokens.colors.accentAlt} subtitle="The AI guesses and produces messy output." />
          <PanelCard title="No outcome" accent="#22C55E" subtitle="The response rambles because the job is undefined." />
        </div>
      </WindowFrame>
      <BottomCaption text="That is why some AI skills look smart for five minutes and fall apart when the workflow gets real." />
    </AbsoluteFill>
  );
};

const AssemblyScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const build = spring({
    frame,
    fps,
    config: { damping: 16, stiffness: 120 }
  });

  return (
    <AbsoluteFill style={{ padding: '200px 90px 0', alignItems: 'center' }}>
      <div
        style={{
          width: 900,
          padding: 40,
          borderRadius: 34,
          background: 'rgba(15,17,23,0.82)',
          border: `1px solid ${tokens.colors.border}`,
          boxShadow: '0 30px 100px rgba(34,197,94,0.16)',
          transform: `scale(${interpolate(build, [0, 1], [0.88, 1])})`
        }}
      >
        <div style={{ fontSize: 28, color: '#22C55E', fontWeight: 800, marginBottom: 16 }}>SKILL CARD</div>
        <div style={{ display: 'grid', gap: 16 }}>
          {pillars.map((pillar) => (
            <div
              key={pillar.label}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                padding: '20px 24px',
                borderRadius: 20,
                background: 'rgba(255,255,255,0.04)'
              }}
            >
              <div style={{ fontSize: 28, fontWeight: 800 }}>{pillar.label}</div>
              <div style={{ fontSize: 24, color: pillar.accent }}>defined</div>
            </div>
          ))}
        </div>
      </div>
    </AbsoluteFill>
  );
};

const ComparisonScene: React.FC = () => {
  return (
    <AbsoluteFill style={{ padding: '150px 56px 0' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
        <PanelCard title="BAD SETUP" accent="#EF4444" subtitle="collects tools without defining the job">
          <div style={{ fontSize: 36, fontWeight: 900, color: '#FCA5A5' }}>bloated / noisy / fragile</div>
        </PanelCard>
        <PanelCard title="CLEAN SETUP" accent="#22C55E" subtitle="every skill has a trigger, context, and outcome">
          <div style={{ fontSize: 36, fontWeight: 900, color: '#86EFAC' }}>sharp / focused / repeatable</div>
        </PanelCard>
      </div>
    </AbsoluteFill>
  );
};

const RuleCtaScene: React.FC = () => {
  return (
    <AbsoluteFill style={{ paddingTop: 180 }}>
      <TitleBlock
        eyebrow="NEXT STEP"
        title="THIS IS JUST THE SURFACE"
        subtitle="The long video shows how that 3-line rule expands into the full custom AI ecosystem."
        accent="#22C55E"
      />
      <FooterCta title="Watch the full system breakdown" subtitle="How the skills connect. Why it works. What changed the output." />
    </AbsoluteFill>
  );
};
