import React from 'react';

export const SimpleBeautifulMockup: React.FC = () => {
    return (
        <div
            style={{
                width: 1920,
                height: 1080,
                backgroundColor: '#0a0a0f',
                overflow: 'hidden',
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <div style={{
                width: 960,
                height: 800,
                backgroundColor: '#1E1E24',
                borderRadius: 16,
                boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                border: '1px solid #333',
            }}>
                {/* Clean Header */}
                <div style={{
                    height: 60,
                    borderBottom: '1px solid #333',
                    display: 'flex',
                    alignItems: 'center',
                    padding: '0 24px',
                    justifyContent: 'space-between',
                }}>
                    <div style={{ display: 'flex', gap: 8 }}>
                        <div style={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: '#ff5f56' }} />
                        <div style={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: '#ffbd2e' }} />
                        <div style={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: '#27c93f' }} />
                    </div>
                    <div style={{
                        color: 'rgba(255,255,255,0.5)',
                        fontSize: 12,
                        fontFamily: 'Inter, sans-serif',
                        fontWeight: 500
                    }}>
                        Design System Pro
                    </div>
                </div>

                {/* Dashboard Content */}
                <div style={{ padding: 40, flex: 1, display: 'flex', flexDirection: 'column', gap: 24 }}>
                    {/* Hero Stats */}
                    <div style={{ display: 'flex', gap: 20 }}>
                        {[1, 2, 3].map((i) => (
                            <div key={i} style={{
                                flex: 1,
                                height: 120,
                                backgroundColor: '#25252b',
                                borderRadius: 12,
                                padding: 20,
                                border: '1px solid #333'
                            }}>
                                <div style={{ width: 32, height: 32, borderRadius: 8, backgroundColor: 'rgba(99, 102, 241, 0.2)', marginBottom: 12 }} />
                                <div style={{ width: 60, height: 8, borderRadius: 4, backgroundColor: '#444', marginBottom: 8 }} />
                                <div style={{ width: 40, height: 8, borderRadius: 4, backgroundColor: '#333' }} />
                            </div>
                        ))}
                    </div>

                    {/* Chart Area */}
                    <div style={{
                        flex: 1,
                        backgroundColor: '#25252b',
                        borderRadius: 12,
                        border: '1px solid #333',
                        position: 'relative',
                        overflow: 'hidden',
                    }}>
                        {/* Abstract clean chart lines */}
                        <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
                            <path d="M0,80 C20,70 40,90 60,60 S80,30 100,20" fill="none" stroke="#6366f1" strokeWidth="0.5" />
                            <path d="M0,100 L0,80 C20,70 40,90 60,60 S80,30 100,20 L100,100 Z" fill="url(#gradient)" opacity="0.2" />
                            <defs>
                                <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                                    <stop offset="0%" stopColor="#6366f1" />
                                    <stop offset="100%" stopColor="transparent" />
                                </linearGradient>
                            </defs>
                        </svg>
                    </div>

                    {/* Primary Button */}
                    <div style={{
                        alignSelf: 'flex-end',
                        backgroundColor: '#6366f1',
                        color: 'white',
                        padding: '12px 24px',
                        borderRadius: 8,
                        fontSize: 14,
                        fontFamily: 'Inter, sans-serif',
                        fontWeight: 600,
                        boxShadow: '0 4px 12px rgba(99, 102, 241, 0.3)',
                    }}>
                        Deploy Project
                    </div>
                </div>
            </div>
        </div>
    );
};
