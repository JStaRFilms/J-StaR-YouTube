import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig, spring } from 'remotion';

interface TerminalProps {
    children: React.ReactNode;
    opacity?: number;
    scale?: number;
}

export const Terminal: React.FC<TerminalProps> = ({ children, opacity = 1, scale = 1 }) => {
    return (
        <div
            style={{
                backgroundColor: '#0d1117',
                borderRadius: 16,
                padding: 32,
                fontFamily: 'JetBrains Mono, Consolas, monospace',
                fontSize: 20,
                border: '1px solid rgba(99, 102, 241, 0.3)',
                boxShadow: `
                    0 0 80px rgba(34, 211, 238, 0.2),
                    0 25px 80px rgba(0, 0, 0, 0.7),
                    inset 0 1px 0 rgba(255, 255, 255, 0.05)
                `,
                opacity,
                transform: `scale(${scale})`,
                width: 900,
                minHeight: 280,
            }}
        >
            {/* Terminal Header */}
            <div
                style={{
                    display: 'flex',
                    gap: 8,
                    marginBottom: 24,
                    paddingBottom: 16,
                    borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                }}
            >
                <div style={{ width: 14, height: 14, borderRadius: '50%', backgroundColor: '#ff5f56' }} />
                <div style={{ width: 14, height: 14, borderRadius: '50%', backgroundColor: '#ffbd2e' }} />
                <div style={{ width: 14, height: 14, borderRadius: '50%', backgroundColor: '#27c93f' }} />
                <span style={{
                    marginLeft: 16,
                    color: '#6b7280',
                    fontSize: 14,
                    fontFamily: 'Inter, sans-serif',
                }}>
                    terminal
                </span>
            </div>
            {/* Terminal Content */}
            <div style={{ lineHeight: 1.8 }}>
                {children}
            </div>
        </div>
    );
};
