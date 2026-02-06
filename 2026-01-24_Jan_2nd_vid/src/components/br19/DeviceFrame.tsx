import React from 'react';
import { interpolate, useCurrentFrame } from 'remotion';

interface DeviceFrameProps {
    children: React.ReactNode;
    type?: 'desktop' | 'mobile';
    title?: string;
    className?: string;
}

export const DeviceFrame: React.FC<DeviceFrameProps> = ({
    children,
    type = 'desktop',
    title = 'Design Preview',
    className = '',
}) => {
    const isDesktop = type === 'desktop';

    const containerStyle: React.CSSProperties = {
        background: '#0f172a', // Slate 900
        borderRadius: isDesktop ? 12 : 32,
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        overflow: 'hidden',
        position: 'relative',
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
    };

    const headerStyle: React.CSSProperties = {
        height: isDesktop ? 40 : 0,
        background: 'rgba(30, 41, 59, 0.8)', // Slate 800
        borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
        display: isDesktop ? 'flex' : 'none',
        alignItems: 'center',
        padding: '0 16px',
        gap: 8,
    };

    const dotStyle = (color: string): React.CSSProperties => ({
        width: 10,
        height: 10,
        borderRadius: '50%',
        background: color,
    });

    return (
        <div className={className} style={containerStyle}>
            {/* Window Controls (Desktop only) */}
            <div style={headerStyle}>
                <div style={dotStyle('#ef4444')} />
                <div style={dotStyle('#eab308')} />
                <div style={dotStyle('#22c55e')} />
                <div style={{
                    marginLeft: 16,
                    fontSize: 12,
                    fontFamily: 'Inter, sans-serif',
                    color: 'rgba(255,255,255,0.4)',
                    flex: 1,
                    textAlign: 'center'
                }}>
                    {title}
                </div>
            </div>

            {/* Content Area */}
            <div style={{ flex: 1, position: 'relative', overflow: 'hidden', background: '#0f172a' }}>
                {children}
            </div>
        </div>
    );
};
