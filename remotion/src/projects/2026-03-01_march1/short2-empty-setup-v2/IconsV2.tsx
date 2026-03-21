import React from 'react';

// Added more dynamic icons for V2
export const RobotHeadV2: React.FC<{ size: number, color: string, glow?: boolean }> = ({ size, color, glow }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ filter: glow ? `drop-shadow(0px 0px 20px ${color})` : 'none' }}>
    <rect x="3" y="11" width="18" height="10" rx="3" fill="#FFF" />
    <circle cx="12" cy="5" r="2" fill={color} />
    <path d="M12 7v4" />
    <line x1="8" y1="16" x2="8" y2="16.01" strokeWidth="4" />
    <line x1="16" y1="16" x2="16" y2="16.01" strokeWidth="4" />
    <path d="M21 16h2" />
    <path d="M1 16h2" />
  </svg>
);

export const FolderWireframeV2: React.FC<{ size: number, color: string, dashOffset: number }> = ({ size, color, dashOffset }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1" strokeDasharray="100" strokeDashoffset={dashOffset} strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
    <path d="M2 10h20" strokeDasharray="2" />
    <path d="M9 10v11" strokeDasharray="2" />
  </svg>
);

export const RedStampV2: React.FC<{ size: number }> = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="#EF4444" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" style={{ filter: 'drop-shadow(0 10px 15px rgba(239, 68, 68, 0.3))' }}>
    <path d="M18 6L6 18" />
    <path d="M6 6l12 12" />
  </svg>
);

export const ConnectorsSvg: React.FC<{ size: number, color: string }> = ({ size, color }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="3" fill="#FFF" />
    <path d="M12 2v7" />
    <path d="M12 15v7" />
    <path d="M2 12h7" />
    <path d="M15 12h7" />
  </svg>
);
