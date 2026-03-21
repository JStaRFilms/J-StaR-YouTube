import React, { CSSProperties } from 'react';
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { tokens } from '../../shared/styles';

type ShortBackgroundProps = {
  children: React.ReactNode;
  accent?: string;
  accentAlt?: string;
};

export const ShortBackground: React.FC<ShortBackgroundProps> = ({
  children,
  accent = tokens.colors.accent,
  accentAlt = tokens.colors.accentAlt
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const pulse = spring({
    frame,
    fps,
    config: { damping: 18, stiffness: 70 }
  });
  const glowScale = interpolate(pulse, [0, 1], [0.88, 1.06]);
  const glowOpacity = interpolate(pulse, [0, 1], [0.2, 0.38]);

  return (
    <AbsoluteFill
      style={{
        background:
          'radial-gradient(circle at top, rgba(192,132,252,0.18), transparent 34%), radial-gradient(circle at bottom right, rgba(56,189,248,0.12), transparent 28%), #07080C',
        fontFamily: tokens.typography.heading,
        color: tokens.colors.text.primary,
        overflow: 'hidden'
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)',
          backgroundSize: '72px 72px',
          opacity: 0.28
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: -180,
          right: -200,
          width: 620,
          height: 620,
          borderRadius: '50%',
          background: accent,
          filter: 'blur(160px)',
          opacity: glowOpacity,
          transform: `scale(${glowScale})`
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: -200,
          left: -180,
          width: 580,
          height: 580,
          borderRadius: '50%',
          background: accentAlt,
          filter: 'blur(180px)',
          opacity: glowOpacity * 0.82,
          transform: `scale(${glowScale})`
        }}
      />
      {children}
    </AbsoluteFill>
  );
};

type TitleBlockProps = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
  accent?: string;
};

export const TitleBlock: React.FC<TitleBlockProps> = ({
  eyebrow,
  title,
  subtitle,
  align = 'center',
  accent = tokens.colors.accentAlt
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const lift = spring({
    frame,
    fps,
    config: { damping: 14, stiffness: 120 }
  });
  const opacity = interpolate(frame, [0, 12], [0, 1], {
    extrapolateRight: 'clamp'
  });
  const textAlign = align;

  return (
    <div
      style={{
        opacity,
        transform: `translateY(${interpolate(lift, [0, 1], [50, 0])}px)`,
        display: 'flex',
        flexDirection: 'column',
        alignItems: align === 'center' ? 'center' : 'flex-start',
        textAlign,
        gap: 18,
        maxWidth: 900,
        margin: align === 'center' ? '0 auto' : undefined
      }}
    >
      {eyebrow ? (
        <div
          style={{
            padding: '10px 22px',
            borderRadius: 999,
            background: 'rgba(255,255,255,0.06)',
            border: `1px solid ${tokens.colors.border}`,
            color: accent,
            fontSize: 28,
            fontWeight: 800,
            letterSpacing: 1.5
          }}
        >
          {eyebrow}
        </div>
      ) : null}
      <div
        style={{
          fontSize: 110,
          lineHeight: 0.9,
          fontWeight: 900,
          letterSpacing: -3
        }}
      >
        {title}
      </div>
      {subtitle ? (
        <div
          style={{
            fontFamily: tokens.typography.body,
            fontSize: 42,
            lineHeight: 1.2,
            color: 'rgba(232,232,237,0.82)',
            maxWidth: 820
          }}
        >
          {subtitle}
        </div>
      ) : null}
    </div>
  );
};

type PanelCardProps = {
  title?: string;
  subtitle?: string;
  accent?: string;
  style?: CSSProperties;
  children?: React.ReactNode;
};

export const PanelCard: React.FC<PanelCardProps> = ({
  title,
  subtitle,
  accent = tokens.colors.accent,
  style,
  children
}) => {
  return (
    <div
      style={{
        background: 'rgba(15,17,23,0.8)',
        border: `1px solid ${tokens.colors.border}`,
        borderTop: `3px solid ${accent}`,
        borderRadius: 28,
        padding: '28px 30px',
        boxShadow: `0 20px 80px ${accent}18`,
        backdropFilter: 'blur(12px)',
        ...style
      }}
    >
      {title ? (
        <div style={{ fontSize: 30, fontWeight: 800, marginBottom: subtitle ? 8 : 18 }}>{title}</div>
      ) : null}
      {subtitle ? (
        <div
          style={{
            fontFamily: tokens.typography.body,
            fontSize: 22,
            lineHeight: 1.35,
            color: 'rgba(232,232,237,0.72)',
            marginBottom: 18
          }}
        >
          {subtitle}
        </div>
      ) : null}
      {children}
    </div>
  );
};

type MetricBadgeProps = {
  label: string;
  value: string;
  accent?: string;
};

export const MetricBadge: React.FC<MetricBadgeProps> = ({
  label,
  value,
  accent = tokens.colors.accentAlt
}) => {
  return (
    <div
      style={{
        minWidth: 260,
        padding: '24px 28px',
        borderRadius: 24,
        background: 'rgba(255,255,255,0.05)',
        border: `1px solid ${tokens.colors.border}`,
        boxShadow: `0 18px 60px ${accent}14`
      }}
    >
      <div style={{ color: accent, fontSize: 24, fontWeight: 800, marginBottom: 8 }}>{label}</div>
      <div style={{ fontSize: 56, fontWeight: 900, letterSpacing: -2 }}>{value}</div>
    </div>
  );
};

type FooterCtaProps = {
  title: string;
  subtitle: string;
};

export const FooterCta: React.FC<FooterCtaProps> = ({ title, subtitle }) => {
  return (
    <div
      style={{
        position: 'absolute',
        left: 64,
        right: 64,
        bottom: 72,
        padding: '26px 34px',
        borderRadius: 28,
        background: 'linear-gradient(135deg, rgba(192,132,252,0.16), rgba(56,189,248,0.12))',
        border: `1px solid ${tokens.colors.border}`,
        display: 'flex',
        flexDirection: 'column',
        gap: 10
      }}
    >
      <div style={{ fontSize: 40, fontWeight: 900 }}>{title}</div>
      <div
        style={{
          fontFamily: tokens.typography.body,
          fontSize: 28,
          lineHeight: 1.3,
          color: 'rgba(232,232,237,0.82)'
        }}
      >
        {subtitle}
      </div>
    </div>
  );
};

type WindowFrameProps = {
  label: string;
  accent?: string;
  children: React.ReactNode;
  style?: CSSProperties;
};

export const WindowFrame: React.FC<WindowFrameProps> = ({
  label,
  accent = tokens.colors.accentAlt,
  children,
  style
}) => {
  return (
    <div
      style={{
        background: 'rgba(15,17,23,0.84)',
        borderRadius: 30,
        border: `1px solid ${tokens.colors.border}`,
        boxShadow: `0 26px 100px ${accent}18`,
        overflow: 'hidden',
        ...style
      }}
    >
      <div
        style={{
          height: 68,
          padding: '0 24px',
          display: 'flex',
          alignItems: 'center',
          gap: 14,
          borderBottom: `1px solid ${tokens.colors.border}`,
          background: 'rgba(255,255,255,0.03)'
        }}
      >
        {['#EF4444', '#F59E0B', '#10B981'].map((dot) => (
          <div
            key={dot}
            style={{
              width: 14,
              height: 14,
              borderRadius: '50%',
              background: dot
            }}
          />
        ))}
        <div style={{ marginLeft: 12, color: accent, fontSize: 24, fontWeight: 800 }}>{label}</div>
      </div>
      <div style={{ padding: 26 }}>{children}</div>
    </div>
  );
};

type BottomCaptionProps = {
  text: string;
};

export const BottomCaption: React.FC<BottomCaptionProps> = ({ text }) => {
  return (
    <div
      style={{
        position: 'absolute',
        left: 48,
        right: 48,
        bottom: 260,
        padding: '20px 24px',
        borderRadius: 24,
        background: 'rgba(0,0,0,0.44)',
        border: '1px solid rgba(255,255,255,0.08)',
        fontFamily: tokens.typography.body,
        fontSize: 28,
        lineHeight: 1.3,
        textAlign: 'center',
        color: tokens.colors.text.primary
      }}
    >
      {text}
    </div>
  );
};
