import React from 'react';
import { ArrowRight, BarChart2, Users, DollarSign } from 'lucide-react';

export const ProCard: React.FC = () => {
    return (
        <div style={{
            width: '800px',
            backgroundColor: 'white',
            borderRadius: '24px',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(0,0,0,0.02)',
            padding: '40px',
            fontFamily: '"Inter", sans-serif',
            display: 'flex',
            flexDirection: 'column',
            gap: '30px'
        }}>
            {/* Header with Stats */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                    <h2 style={{ fontSize: '32px', fontWeight: '800', color: '#111827', margin: 0, letterSpacing: '-0.025em' }}>Dashboard</h2>
                    <p style={{ fontSize: '16px', color: '#6B7280', margin: '5px 0 0 0' }}>Overview of your performance</p>
                </div>
                <div style={{
                    width: '48px', height: '48px', borderRadius: '12px',
                    backgroundColor: '#EEF2FF', color: '#4F46E5',
                    display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}>
                    <BarChart2 size={24} />
                </div>
            </div>

            {/* Stats Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                <div style={{ padding: '20px', backgroundColor: '#F9FAFB', borderRadius: '16px', border: '1px solid #F3F4F6' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                        <Users size={20} color="#6B7280" />
                        <span style={{ fontSize: '14px', fontWeight: '600', color: '#6B7280' }}>Users</span>
                    </div>
                    <div style={{ fontSize: '28px', fontWeight: '700', color: '#111827' }}>24.5k</div>
                    <div style={{ fontSize: '14px', color: '#10B981', marginTop: '5px' }}>+12% vs last month</div>
                </div>
                <div style={{ padding: '20px', backgroundColor: '#F9FAFB', borderRadius: '16px', border: '1px solid #F3F4F6' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                        <DollarSign size={20} color="#6B7280" />
                        <span style={{ fontSize: '14px', fontWeight: '600', color: '#6B7280' }}>Revenue</span>
                    </div>
                    <div style={{ fontSize: '28px', fontWeight: '700', color: '#111827' }}>$12.4k</div>
                    <div style={{ fontSize: '14px', color: '#10B981', marginTop: '5px' }}>+4.3% vs last month</div>
                </div>
            </div>

            {/* Action Area */}
            <div style={{ paddingTop: '10px', borderTop: '1px solid #F3F4F6', display: 'flex', gap: '16px' }}>
                <button style={{
                    flex: 1,
                    padding: '16px',
                    backgroundColor: '#4F46E5',
                    color: 'white',
                    border: 'none',
                    borderRadius: '12px',
                    fontSize: '16px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    boxShadow: '0 4px 6px -1px rgba(79, 70, 229, 0.3)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px'
                }}>
                    Download Report <ArrowRight size={20} />
                </button>
            </div>

            {/* "PRO" Label - Integrated */}
            <div style={{
                position: 'absolute',
                top: '-20px',
                right: '-10px',
                transform: 'rotate(10deg)',
                backgroundColor: '#3B82F6',
                color: 'white',
                fontSize: '24px',
                fontWeight: '900',
                padding: '8px 24px',
                borderRadius: '8px',
                boxShadow: '0 10px 15px -3px rgba(59, 130, 246, 0.4)',
                letterSpacing: '0.05em'
            }}>
                PRO SYSTEM
            </div>
        </div>
    );
};
