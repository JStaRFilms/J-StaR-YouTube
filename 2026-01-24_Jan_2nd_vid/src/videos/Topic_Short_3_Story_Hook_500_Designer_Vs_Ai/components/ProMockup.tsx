import React from 'react';
import { LayoutDashboard, TrendingUp, DollarSign, Users } from 'lucide-react';

export const ProMockup: React.FC = () => {
    return (
        <div
            style={{
                width: '500px',
                height: '400px',
                backgroundColor: '#FFFFFF',
                borderRadius: '16px',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(0,0,0,0.02)',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
            }}
        >
            {/* Header */}
            <div
                style={{
                    height: '60px',
                    backgroundColor: '#F8FAFC',
                    borderBottom: '1px solid #E2E8F0',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0 24px',
                }}
            >
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                    }}
                >
                    <div
                        style={{
                            width: '36px',
                            height: '36px',
                            background: 'linear-gradient(135deg, #3B82F6 0%, #8B5CF6 100%)',
                            borderRadius: '10px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <LayoutDashboard size={20} color="white" />
                    </div>
                    <span
                        style={{
                            fontSize: '18px',
                            fontWeight: '700',
                            color: '#1E293B',
                            fontFamily: 'Inter, sans-serif',
                        }}
                    >
                        Dashboard
                    </span>
                </div>

                <button
                    style={{
                        padding: '8px 16px',
                        backgroundColor: '#3B82F6',
                        color: 'white',
                        border: 'none',
                        borderRadius: '8px',
                        fontSize: '14px',
                        fontWeight: '600',
                        fontFamily: 'Inter, sans-serif',
                        cursor: 'pointer',
                    }}
                >
                    Export
                </button>
            </div>

            {/* Stats Grid */}
            <div
                style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, 1fr)',
                    gap: '16px',
                    padding: '24px',
                }}
            >
                {/* Revenue Card */}
                <div
                    style={{
                        backgroundColor: '#F8FAFC',
                        borderRadius: '12px',
                        padding: '16px',
                        border: '1px solid #E2E8F0',
                    }}
                >
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            marginBottom: '8px',
                        }}
                    >
                        <div
                            style={{
                                width: '32px',
                                height: '32px',
                                backgroundColor: '#EFF6FF',
                                borderRadius: '8px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            <DollarSign size={16} color="#3B82F6" />
                        </div>
                        <span
                            style={{
                                fontSize: '12px',
                                color: '#64748B',
                                fontFamily: 'Inter, sans-serif',
                            }}
                        >
                            Revenue
                        </span>
                    </div>
                    <div
                        style={{
                            fontSize: '24px',
                            fontWeight: '700',
                            color: '#1E293B',
                            fontFamily: 'Inter, sans-serif',
                        }}
                    >
                        $48.2k
                    </div>
                    <div
                        style={{
                            fontSize: '12px',
                            color: '#22C55E',
                            fontFamily: 'Inter, sans-serif',
                            marginTop: '4px',
                        }}
                    >
                        +12.5%
                    </div>
                </div>

                {/* Users Card */}
                <div
                    style={{
                        backgroundColor: '#F8FAFC',
                        borderRadius: '12px',
                        padding: '16px',
                        border: '1px solid #E2E8F0',
                    }}
                >
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            marginBottom: '8px',
                        }}
                    >
                        <div
                            style={{
                                width: '32px',
                                height: '32px',
                                backgroundColor: '#F0FDF4',
                                borderRadius: '8px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            <Users size={16} color="#22C55E" />
                        </div>
                        <span
                            style={{
                                fontSize: '12px',
                                color: '#64748B',
                                fontFamily: 'Inter, sans-serif',
                            }}
                        >
                            Users
                        </span>
                    </div>
                    <div
                        style={{
                            fontSize: '24px',
                            fontWeight: '700',
                            color: '#1E293B',
                            fontFamily: 'Inter, sans-serif',
                        }}
                    >
                        2,450
                    </div>
                    <div
                        style={{
                            fontSize: '12px',
                            color: '#22C55E',
                            fontFamily: 'Inter, sans-serif',
                            marginTop: '4px',
                        }}
                    >
                        +8.2%
                    </div>
                </div>

                {/* Growth Card */}
                <div
                    style={{
                        backgroundColor: '#F8FAFC',
                        borderRadius: '12px',
                        padding: '16px',
                        border: '1px solid #E2E8F0',
                    }}
                >
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            marginBottom: '8px',
                        }}
                    >
                        <div
                            style={{
                                width: '32px',
                                height: '32px',
                                backgroundColor: '#F5F3FF',
                                borderRadius: '8px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            <TrendingUp size={16} color="#8B5CF6" />
                        </div>
                        <span
                            style={{
                                fontSize: '12px',
                                color: '#64748B',
                                fontFamily: 'Inter, sans-serif',
                            }}
                        >
                            Growth
                        </span>
                    </div>
                    <div
                        style={{
                            fontSize: '24px',
                            fontWeight: '700',
                            color: '#1E293B',
                            fontFamily: 'Inter, sans-serif',
                        }}
                    >
                        89.2%
                    </div>
                    <div
                        style={{
                            fontSize: '12px',
                            color: '#22C55E',
                            fontFamily: 'Inter, sans-serif',
                            marginTop: '4px',
                        }}
                    >
                        +24.3%
                    </div>
                </div>
            </div>

            {/* Chart Area */}
            <div
                style={{
                    flex: 1,
                    margin: '0 24px 24px',
                    backgroundColor: '#F8FAFC',
                    borderRadius: '12px',
                    border: '1px solid #E2E8F0',
                    padding: '16px',
                    display: 'flex',
                    alignItems: 'flex-end',
                    gap: '12px',
                }}
            >
                {['45%', '62%', '55%', '78%', '85%', '70%'].map((height, idx) => (
                    <div
                        key={idx}
                        style={{
                            flex: 1,
                            height,
                            background: idx === 4
                                ? 'linear-gradient(180deg, #3B82F6 0%, #8B5CF6 100%)'
                                : '#E2E8F0',
                            borderRadius: '4px 4px 0 0',
                        }}
                    />
                ))}
            </div>
        </div>
    );
};
