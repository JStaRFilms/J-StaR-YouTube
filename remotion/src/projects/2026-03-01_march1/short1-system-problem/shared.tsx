import React from 'react';
import { AbsoluteFill } from 'remotion';

export const colors = {
  bg: '#F8FAFC',
  text: '#0F172A',
  textMuted: '#64748B',
  accentBlue: '#3B82F6',
  accentRed: '#EF4444',
  accentGreen: '#10B981',
  border: '#E2E8F0',
  surface: '#FFFFFF',
};

export const LightBackground: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <AbsoluteFill
      style={{
        backgroundColor: colors.bg,
        fontFamily: 'Inter, sans-serif',
        color: colors.text,
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage:
            'linear-gradient(rgba(15, 23, 42, 0.04) 2px, transparent 2px), linear-gradient(90deg, rgba(15, 23, 42, 0.04) 2px, transparent 2px)',
          backgroundSize: '100px 100px',
        }}
      />
      {children}
    </AbsoluteFill>
  );
};

export const MainText: React.FC<{
  children: React.ReactNode;
  style?: React.CSSProperties;
}> = ({ children, style }) => {
  return (
    <div
      style={{
        fontSize: 90,
        fontWeight: 900,
        lineHeight: 1.1,
        textAlign: 'center',
        letterSpacing: '-2px',
        ...style,
      }}
    >
      {children}
    </div>
  );
};
