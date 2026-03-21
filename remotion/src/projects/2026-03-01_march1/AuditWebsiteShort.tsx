import React from 'react';
import { AbsoluteFill, Sequence, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { tokens } from '../../shared/styles';
import { BottomCaption, FooterCta, PanelCard, ShortBackground, TitleBlock, WindowFrame } from './shared';

const findings = [
  { title: 'missing asset', accent: '#F59E0B' },
  { title: 'layout drift', accent: tokens.colors.accentAlt },
  { title: 'review copy pass', accent: tokens.colors.accent }
];

export const March1AuditWebsiteShort: React.FC = () => {
  return (
    <ShortBackground accent={tokens.colors.accentAlt} accentAlt={tokens.colors.accent}>
      <Sequence from={0} durationInFrames={150}>
        <AuditHookScene />
      </Sequence>
      <Sequence from={150} durationInFrames={240}>
        <BrowserScene />
      </Sequence>
      <Sequence from={390} durationInFrames={240}>
        <FindingsScene />
      </Sequence>
      <Sequence from={630} durationInFrames={210}>
        <ShiftScene />
      </Sequence>
      <Sequence from={840} durationInFrames={240}>
        <SystemProofScene />
      </Sequence>
      <Sequence from={1080} durationInFrames={270}>
        <AuditCtaScene />
      </Sequence>
    </ShortBackground>
  );
};

const AuditHookScene: React.FC = () => {
  return (
    <AbsoluteFill style={{ padding: '160px 72px 0' }}>
      <TitleBlock
        eyebrow="PROOF"
        title="MY AI AUDITED ITS OWN SITE"
        subtitle="It opened the browser, checked the page, found issues, and turned them into action items."
        accent={tokens.colors.accentAlt}
      />
      <BottomCaption text="That is when it stopped feeling like a chatbot and started feeling like infrastructure." />
    </AbsoluteFill>
  );
};

const BrowserScene: React.FC = () => {
  const frame = useCurrentFrame();
  const scanY = interpolate(frame, [0, 120], [0, 780], {
    extrapolateRight: 'clamp'
  });

  return (
    <AbsoluteFill style={{ padding: '130px 56px 0' }}>
      <WindowFrame label="browser audit / localhost:3000" accent={tokens.colors.accentAlt}>
        <div
          style={{
            height: 920,
            borderRadius: 22,
            background:
              'linear-gradient(180deg, rgba(192,132,252,0.14), rgba(56,189,248,0.08)), rgba(255,255,255,0.03)',
            padding: 28,
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          <div style={{ fontSize: 60, fontWeight: 900, marginBottom: 18 }}>Takumi landing page</div>
          <div style={{ fontSize: 28, color: 'rgba(232,232,237,0.72)', marginBottom: 24 }}>
            premium dark mode / workflow system / animated sections
          </div>
          <div style={{ display: 'grid', gap: 18 }}>
            {['hero section', 'metrics bar', 'skills grid', 'deploy section', 'footer'].map((row) => (
              <div
                key={row}
                style={{
                  height: 120,
                  borderRadius: 20,
                  background: 'rgba(255,255,255,0.05)',
                  display: 'flex',
                  alignItems: 'center',
                  padding: '0 26px',
                  fontSize: 32,
                  fontWeight: 800
                }}
              >
                {row}
              </div>
            ))}
          </div>
          <div
            style={{
              position: 'absolute',
              left: 0,
              right: 0,
              top: scanY,
              height: 4,
              background: tokens.colors.accentAlt,
              boxShadow: `0 0 24px ${tokens.colors.accentAlt}`
            }}
          />
        </div>
      </WindowFrame>
    </AbsoluteFill>
  );
};

const FindingsScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill style={{ padding: '160px 56px 0' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
        {findings.map((finding, index) => {
          const enter = spring({
            frame: frame - index * 8,
            fps,
            config: { damping: 15, stiffness: 100 }
          });
          return (
            <PanelCard
              key={finding.title}
              title={finding.title}
              subtitle="turned into a concrete action item"
              accent={finding.accent}
              style={{
                transform: `translateX(${interpolate(enter, [0, 1], [140, 0])}px)`
              }}
            />
          );
        })}
      </div>
      <BottomCaption text="The system did not just generate code. It reviewed work and pushed the project forward." />
    </AbsoluteFill>
  );
};

const ShiftScene: React.FC = () => {
  return (
    <AbsoluteFill style={{ padding: '220px 80px 0' }}>
      <div style={{ display: 'grid', gap: 24 }}>
        <PanelCard title="Most people use AI for answers" accent="#F87171">
          <div style={{ fontSize: 42, fontWeight: 900 }}>one-off replies</div>
        </PanelCard>
        <PanelCard title="I want systems that do jobs" accent={tokens.colors.accentAlt}>
          <div style={{ fontSize: 42, fontWeight: 900 }}>repeatable behavior</div>
        </PanelCard>
      </div>
    </AbsoluteFill>
  );
};

const SystemProofScene: React.FC = () => {
  return (
    <AbsoluteFill style={{ padding: '140px 56px 0' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 22 }}>
        <PanelCard title="Audit" accent={tokens.colors.accentAlt} subtitle="check the real interface" />
        <PanelCard title="Review" accent={tokens.colors.accent} subtitle="flag what needs attention" />
        <PanelCard title="Action Items" accent="#22C55E" subtitle="turn findings into work" />
        <PanelCard title="System" accent="#F59E0B" subtitle="all of this is just one layer" />
      </div>
    </AbsoluteFill>
  );
};

const AuditCtaScene: React.FC = () => {
  return (
    <AbsoluteFill style={{ paddingTop: 180 }}>
      <TitleBlock
        eyebrow="FULL BREAKDOWN"
        title="THE AUDIT IS ONLY ONE PIECE"
        subtitle="The long video shows the bigger AI operating system behind the build, checks, and review loop."
        accent={tokens.colors.accentAlt}
      />
      <FooterCta title="Watch the full video for the full stack" subtitle="skills, workflows, build process, review loop, and why it all works together." />
    </AbsoluteFill>
  );
};
