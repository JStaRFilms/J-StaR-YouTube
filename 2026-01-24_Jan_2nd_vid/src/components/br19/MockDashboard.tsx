import React from 'react';

export const MockDashboard: React.FC = () => {
    return (
        <div style={{ padding: 20, display: 'flex', flexDirection: 'column', gap: 20, height: '100%' }}>
            {/* Header Stat Cards */}
            <div style={{ display: 'flex', gap: 16 }}>
                {[1, 2, 3].map((i) => (
                    <div
                        key={i}
                        style={{
                            flex: 1,
                            height: 100,
                            background: 'rgba(255,255,255,0.03)',
                            borderRadius: 12,
                            border: '1px solid rgba(255,255,255,0.05)',
                            padding: 16,
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between',
                        }}
                    >
                        <div
                            style={{
                                width: 32,
                                height: 32,
                                borderRadius: 8,
                                background: i === 1 ? '#3b82f6' : i === 2 ? '#a855f7' : '#22c55e',
                                opacity: 0.2,
                            }}
                        />
                        <div style={{ width: '40%', height: 8, borderRadius: 4, background: 'rgba(255,255,255,0.2)' }} />
                    </div>
                ))}
            </div>

            <div style={{ display: 'flex', gap: 16, flex: 1 }}>
                {/* Main Chart Area */}
                <div
                    style={{
                        flex: 2,
                        background: 'rgba(255,255,255,0.03)',
                        borderRadius: 12,
                        border: '1px solid rgba(255,255,255,0.05)',
                        padding: 20,
                        display: 'flex',
                        alignItems: 'flex-end',
                        gap: 12,
                        position: 'relative',
                        overflow: 'hidden'
                    }}
                >
                    {/* Fake Bars */}
                    {[40, 65, 30, 80, 55, 90, 45, 70, 60].map((h, i) => (
                        <div
                            key={i}
                            style={{
                                flex: 1,
                                height: `${h}%`,
                                background: 'linear-gradient(to top, rgba(59, 130, 246, 0.5), rgba(168, 85, 247, 0.5))',
                                borderRadius: '4px 4px 0 0',
                            }}
                        />
                    ))}
                </div>

                {/* Side Panel */}
                <div
                    style={{
                        flex: 1,
                        background: 'rgba(255,255,255,0.03)',
                        borderRadius: 12,
                        border: '1px solid rgba(255,255,255,0.05)',
                        padding: 16,
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 12,
                    }}
                >
                    {[1, 2, 3, 4].map(i => (
                        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                            <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'rgba(255,255,255,0.1)' }} />
                            <div style={{ flex: 1, height: 8, borderRadius: 4, background: 'rgba(255,255,255,0.1)' }} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
