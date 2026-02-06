import React from 'react';
import {
    LayoutDashboard,
    Users,
    DollarSign,
    TrendingUp,
    Bell,
    Search,
    Menu,
    ChevronDown,
    ArrowUpRight,
    Calendar,
    Activity
} from 'lucide-react';

// A full-featured, visually stunning dashboard to replace the simple card
export const ProDashboard: React.FC = () => {
    return (
        <div style={{
            width: '900px',
            height: '600px',
            backgroundColor: '#F8FAFC',
            fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, sans-serif',
            borderRadius: '16px',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(0,0,0,0.02)',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column'
        }}>
            {/* Top Navigation Bar */}
            <div style={{
                height: '64px',
                backgroundColor: 'white',
                borderBottom: '1px solid #E2E8F0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0 24px'
            }}>
                {/* Left: Logo & Menu */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <div style={{
                        width: '40px',
                        height: '40px',
                        background: 'linear-gradient(135deg, #3B82F6 0%, #8B5CF6 100%)',
                        borderRadius: '10px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <LayoutDashboard size={22} color="white" />
                    </div>
                    <span style={{ fontSize: '20px', fontWeight: '700', color: '#1E293B' }}>Nexus</span>

                    {/* Search Bar */}
                    <div style={{
                        marginLeft: '32px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        backgroundColor: '#F1F5F9',
                        padding: '8px 16px',
                        borderRadius: '8px',
                        width: '280px'
                    }}>
                        <Search size={16} color="#64748B" />
                        <span style={{ fontSize: '14px', color: '#94A3B8' }}>Search anything...</span>
                        <span style={{
                            marginLeft: 'auto',
                            fontSize: '12px',
                            color: '#94A3B8',
                            backgroundColor: '#E2E8F0',
                            padding: '2px 6px',
                            borderRadius: '4px'
                        }}>⌘K</span>
                    </div>
                </div>

                {/* Right: Actions & Profile */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <div style={{ position: 'relative' }}>
                        <Bell size={20} color="#64748B" />
                        <div style={{
                            position: 'absolute',
                            top: '-2px',
                            right: '-2px',
                            width: '8px',
                            height: '8px',
                            backgroundColor: '#EF4444',
                            borderRadius: '50%',
                            border: '2px solid white'
                        }} />
                    </div>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        padding: '6px 12px 6px 6px',
                        backgroundColor: '#F8FAFC',
                        borderRadius: '100px',
                        border: '1px solid #E2E8F0'
                    }}>
                        <div style={{
                            width: '32px',
                            height: '32px',
                            background: 'linear-gradient(135deg, #22C55E 0%, #10B981 100%)',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'white',
                            fontSize: '14px',
                            fontWeight: '600'
                        }}>
                            JD
                        </div>
                        <ChevronDown size={16} color="#64748B" />
                    </div>
                </div>
            </div>

            {/* Main Content Area */}
            <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
                {/* Sidebar */}
                <div style={{
                    width: '220px',
                    backgroundColor: 'white',
                    borderRight: '1px solid #E2E8F0',
                    padding: '20px 12px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '4px'
                }}>
                    {[
                        { icon: LayoutDashboard, label: 'Dashboard', active: true },
                        { icon: Activity, label: 'Analytics' },
                        { icon: Users, label: 'Customers' },
                        { icon: DollarSign, label: 'Revenue' },
                        { icon: Calendar, label: 'Calendar' },
                    ].map((item, idx) => (
                        <div
                            key={idx}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '12px',
                                padding: '10px 16px',
                                borderRadius: '8px',
                                backgroundColor: item.active ? '#EFF6FF' : 'transparent',
                                color: item.active ? '#3B82F6' : '#64748B',
                                fontSize: '14px',
                                fontWeight: item.active ? '600' : '500',
                                cursor: 'pointer'
                            }}
                        >
                            <item.icon size={18} />
                            <span>{item.label}</span>
                        </div>
                    ))}
                </div>

                {/* Dashboard Content */}
                <div style={{
                    flex: 1,
                    padding: '24px',
                    overflow: 'auto',
                    backgroundColor: '#F8FAFC'
                }}>
                    {/* Header */}
                    <div style={{ marginBottom: '24px' }}>
                        <h1 style={{ fontSize: '24px', fontWeight: '700', color: '#1E293B', margin: '0 0 4px 0' }}>
                            Dashboard Overview
                        </h1>
                        <p style={{ fontSize: '14px', color: '#64748B', margin: 0 }}>
                            Welcome back! Here's what's happening today.
                        </p>
                    </div>

                    {/* Stats Grid */}
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(3, 1fr)',
                        gap: '16px',
                        marginBottom: '24px'
                    }}>
                        {/* Revenue Card */}
                        <div style={{
                            backgroundColor: 'white',
                            borderRadius: '12px',
                            padding: '20px',
                            border: '1px solid #E2E8F0',
                            boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
                        }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                                <div style={{
                                    width: '40px',
                                    height: '40px',
                                    backgroundColor: '#EFF6FF',
                                    borderRadius: '10px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}>
                                    <DollarSign size={20} color="#3B82F6" />
                                </div>
                                <div style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '4px',
                                    backgroundColor: '#DCFCE7',
                                    color: '#16A34A',
                                    padding: '4px 8px',
                                    borderRadius: '100px',
                                    fontSize: '12px',
                                    fontWeight: '600'
                                }}>
                                    <ArrowUpRight size={12} />
                                    +12.5%
                                </div>
                            </div>
                            <div style={{ fontSize: '28px', fontWeight: '700', color: '#1E293B', marginBottom: '4px' }}>
                                $48,250
                            </div>
                            <div style={{ fontSize: '13px', color: '#64748B' }}>Total Revenue</div>
                        </div>

                        {/* Users Card */}
                        <div style={{
                            backgroundColor: 'white',
                            borderRadius: '12px',
                            padding: '20px',
                            border: '1px solid #E2E8F0',
                            boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
                        }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                                <div style={{
                                    width: '40px',
                                    height: '40px',
                                    backgroundColor: '#F0FDF4',
                                    borderRadius: '10px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}>
                                    <Users size={20} color="#22C55E" />
                                </div>
                                <div style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '4px',
                                    backgroundColor: '#DCFCE7',
                                    color: '#16A34A',
                                    padding: '4px 8px',
                                    borderRadius: '100px',
                                    fontSize: '12px',
                                    fontWeight: '600'
                                }}>
                                    <ArrowUpRight size={12} />
                                    +8.2%
                                </div>
                            </div>
                            <div style={{ fontSize: '28px', fontWeight: '700', color: '#1E293B', marginBottom: '4px' }}>
                                2,450
                            </div>
                            <div style={{ fontSize: '13px', color: '#64748B' }}>Active Users</div>
                        </div>

                        {/* Growth Card */}
                        <div style={{
                            backgroundColor: 'white',
                            borderRadius: '12px',
                            padding: '20px',
                            border: '1px solid #E2E8F0',
                            boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
                        }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                                <div style={{
                                    width: '40px',
                                    height: '40px',
                                    backgroundColor: '#F5F3FF',
                                    borderRadius: '10px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}>
                                    <TrendingUp size={20} color="#8B5CF6" />
                                </div>
                                <div style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '4px',
                                    backgroundColor: '#DCFCE7',
                                    color: '#16A34A',
                                    padding: '4px 8px',
                                    borderRadius: '100px',
                                    fontSize: '12px',
                                    fontWeight: '600'
                                }}>
                                    <ArrowUpRight size={12} />
                                    +24.3%
                                </div>
                            </div>
                            <div style={{ fontSize: '28px', fontWeight: '700', color: '#1E293B', marginBottom: '4px' }}>
                                89.2%
                            </div>
                            <div style={{ fontSize: '13px', color: '#64748B' }}>Growth Rate</div>
                        </div>
                    </div>

                    {/* Chart Section */}
                    <div style={{
                        backgroundColor: 'white',
                        borderRadius: '12px',
                        padding: '24px',
                        border: '1px solid #E2E8F0',
                        boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
                    }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                            <div>
                                <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#1E293B', margin: '0 0 4px 0' }}>
                                    Revenue Overview
                                </h3>
                                <p style={{ fontSize: '13px', color: '#64748B', margin: 0 }}>Monthly revenue performance</p>
                            </div>
                            <div style={{ display: 'flex', gap: '8px' }}>
                                {['Week', 'Month', 'Year'].map((period, idx) => (
                                    <button
                                        key={period}
                                        style={{
                                            padding: '6px 12px',
                                            borderRadius: '6px',
                                            border: 'none',
                                            backgroundColor: idx === 1 ? '#3B82F6' : '#F1F5F9',
                                            color: idx === 1 ? 'white' : '#64748B',
                                            fontSize: '13px',
                                            fontWeight: '500',
                                            cursor: 'pointer'
                                        }}
                                    >
                                        {period}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Chart Visualization */}
                        <div style={{ height: '160px', position: 'relative' }}>
                            {/* Y-axis labels */}
                            <div style={{
                                position: 'absolute',
                                left: 0,
                                top: 0,
                                bottom: '30px',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'space-between',
                                fontSize: '11px',
                                color: '#94A3B8'
                            }}>
                                <span>$50k</span>
                                <span>$40k</span>
                                <span>$30k</span>
                                <span>$20k</span>
                                <span>$10k</span>
                            </div>

                            {/* Chart bars */}
                            <div style={{
                                marginLeft: '40px',
                                height: '100%',
                                display: 'flex',
                                alignItems: 'flex-end',
                                justifyContent: 'space-between',
                                gap: '12px',
                                paddingBottom: '30px'
                            }}>
                                {[
                                    { height: '45%', label: 'Jan' },
                                    { height: '62%', label: 'Feb' },
                                    { height: '55%', label: 'Mar' },
                                    { height: '78%', label: 'Apr' },
                                    { height: '85%', label: 'May', active: true },
                                    { height: '70%', label: 'Jun' },
                                ].map((bar, idx) => (
                                    <div key={idx} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                                        <div style={{
                                            width: '100%',
                                            height: bar.height,
                                            background: bar.active
                                                ? 'linear-gradient(180deg, #3B82F6 0%, #8B5CF6 100%)'
                                                : '#E2E8F0',
                                            borderRadius: '6px 6px 0 0',
                                            transition: 'all 0.3s ease'
                                        }} />
                                        <span style={{ fontSize: '11px', color: '#64748B', fontWeight: bar.active ? '600' : '400' }}>
                                            {bar.label}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
