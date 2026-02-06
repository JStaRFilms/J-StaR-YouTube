import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate } from 'remotion';
import { Puzzle } from 'lucide-react';
import { ProDashboard } from './components/ProDashboard';

// Ugly Website Component - Raw HTML look
const UglyWebsite: React.FC = () => {
    return (
        <div style={{
            width: '520px',
            height: '400px',
            backgroundColor: 'white',
            fontFamily: '"Times New Roman", Times, serif',
            color: 'black',
            border: '2px solid #ccc',
            boxShadow: '4px 4px 0px rgba(0,0,0,0.1)',
            display: 'flex',
            flexDirection: 'column'
        }}>
            {/* Old School Browser Bar */}
            <div style={{
                backgroundColor: '#e0e0e0',
                borderBottom: '1px solid #999',
                padding: '8px 12px',
                display: 'flex',
                gap: '6px',
                alignItems: 'center'
            }}>
                <div style={{ display: 'flex', gap: '4px' }}>
                    <div style={{ width: '10px', height: '10px', border: '1px solid #999', borderRadius: '2px', backgroundColor: '#fff' }}></div>
                    <div style={{ width: '10px', height: '10px', border: '1px solid #999', borderRadius: '2px', backgroundColor: '#fff' }}></div>
                    <div style={{ width: '10px', height: '10px', border: '1px solid #999', borderRadius: '2px', backgroundColor: '#fff' }}></div>
                </div>
                <div style={{
                    flex: 1, backgroundColor: 'white', border: '1px solid #999', padding: '2px 6px', fontSize: '10px', fontFamily: 'Arial'
                }}>
                    http://my-site.com
                </div>
            </div>

            {/* Content */}
            <div style={{ padding: '28px' }}>
                <h1 style={{ fontSize: '32px', marginBottom: '14px', borderBottom: '1px solid black' }}>Welcome</h1>
                <p style={{ fontSize: '18px', lineHeight: '1.4', marginBottom: '20px' }}>This is a basic page.</p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', alignItems: 'flex-start' }}>
                    <a href="#" style={{ color: '#0000EE', textDecoration: 'underline', fontSize: '18px' }}>
                        Click Here
                    </a>
                    <button style={{
                        backgroundColor: '#E0E0E0',
                        border: '2px outset buttonface',
                        padding: '10px 18px',
                        fontSize: '16px',
                        cursor: 'pointer',
                        color: 'black',
                        fontFamily: 'sans-serif'
                    }}>
                        Submit
                    </button>
                </div>
            </div>
        </div>
    );
};

// Pro Card Component - Modern design
const ProCard: React.FC = () => {
    return (
        <div style={{
            width: '520px',
            backgroundColor: 'white',
            borderRadius: '20px',
            boxShadow: '0 20px 40px -12px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(0,0,0,0.02)',
            padding: '32px',
            fontFamily: '"Inter", sans-serif',
            display: 'flex',
            flexDirection: 'column',
            gap: '20px'
        }}>
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                    <h2 style={{ fontSize: '26px', fontWeight: '700', color: '#1E293B', margin: 0 }}>Dashboard</h2>
                    <p style={{ fontSize: '15px', color: '#64748B', margin: '6px 0 0 0' }}>Overview</p>
                </div>
                <div style={{
                    width: '48px', height: '48px', borderRadius: '10px',
                    backgroundColor: '#EFF6FF', color: '#3B82F6',
                    display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}>
                    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M3 3v18h18" />
                        <path d="M18.7 8l-5.1 5.2-2.8-2.7L7 14.3" />
                    </svg>
                </div>
            </div>

            {/* Stats */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div style={{ padding: '16px', backgroundColor: '#F8FAFC', borderRadius: '14px', border: '1px solid #E2E8F0' }}>
                    <div style={{ fontSize: '14px', fontWeight: '600', color: '#64748B', marginBottom: '6px' }}>Users</div>
                    <div style={{ fontSize: '26px', fontWeight: '700', color: '#1E293B' }}>24.5k</div>
                    <div style={{ fontSize: '14px', color: '#22C55E', marginTop: '4px' }}>+12%</div>
                </div>
                <div style={{ padding: '16px', backgroundColor: '#F8FAFC', borderRadius: '14px', border: '1px solid #E2E8F0' }}>
                    <div style={{ fontSize: '14px', fontWeight: '600', color: '#64748B', marginBottom: '6px' }}>Revenue</div>
                    <div style={{ fontSize: '26px', fontWeight: '700', color: '#1E293B' }}>$12.4k</div>
                    <div style={{ fontSize: '14px', color: '#22C55E', marginTop: '4px' }}>+4.3%</div>
                </div>
            </div>

            {/* Button */}
            <button style={{
                padding: '16px',
                backgroundColor: '#3B82F6',
                color: 'white',
                border: 'none',
                borderRadius: '10px',
                fontSize: '16px',
                fontWeight: '600',
                cursor: 'pointer',
                boxShadow: '0 4px 6px -1px rgba(59, 130, 246, 0.3)'
            }}>
                Download Report
            </button>
        </div>
    );
};

// Dark background color to match main composition
const DARK_BG_COLOR = '#0A0A0F';

export const Scene1_Comparison: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    // Entrance animations - slide in from opposite edges
    const uglySlide = spring({
        frame,
        fps,
        config: { damping: 20, stiffness: 100 },
    });
    const uglyX = interpolate(uglySlide, [0, 1], [-200, 0]);

    const proSlide = spring({
        frame,
        fps,
        config: { damping: 20, stiffness: 100 },
    });
    const proX = interpolate(proSlide, [0, 1], [200, 0]);

    // Puzzle piece pulse animation
    const puzzlePulse = spring({
        frame: frame % 45, // Loop every 1.5 seconds
        fps,
        config: { damping: 10, stiffness: 80 },
    });
    const puzzleScale = interpolate(puzzlePulse, [0, 1], [1, 1.15]);

    // Label stamp animation
    const labelStamp = spring({
        frame: frame - 15,
        fps,
        config: { damping: 12, stiffness: 150 },
    });
    const labelScale = interpolate(labelStamp, [0, 1], [1.5, 1]);
    const labelOpacity = interpolate(labelStamp, [0, 0.3], [0, 1]);

    return (
        <AbsoluteFill style={{ backgroundColor: DARK_BG_COLOR }}>
            {/* Top Side - UGLY */}
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '42%', // Adjusted to stay within top 80% safe area
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#0A0A0F', // Premium dark background
                borderBottom: '2px solid #1a1a2e'
            }}>
                <div style={{ transform: `translateX(${uglyX}px)` }}>
                    <UglyWebsite />
                </div>

                {/* UGLY Label */}
                <div style={{
                    position: 'absolute',
                    top: '12%',
                    right: '10%',
                    transform: `rotate(-15deg) scale(${labelScale})`,
                    opacity: labelOpacity,
                    border: '6px solid #EF4444',
                    color: '#EF4444',
                    fontSize: '48px',
                    fontWeight: '900',
                    padding: '8px 24px',
                    fontFamily: 'Arial, sans-serif',
                    textTransform: 'uppercase',
                    backgroundColor: 'rgba(15, 23, 42, 0.9)',
                    boxShadow: '0 4px 15px rgba(239, 68, 68, 0.3)'
                }}>
                    UGLY
                </div>
            </div>

            {/* Bottom Side - PRO */}
            <div style={{
                position: 'absolute',
                top: '42%', // Position below UGLY section
                left: 0,
                width: '100%',
                height: '38%', // Combined 80% for safe area
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#0A0A0F', // Premium dark background
                backgroundImage: 'radial-gradient(#1a1a2e 1px, transparent 1px)',
                backgroundSize: '20px 20px'
            }}>
                <div style={{ transform: `translateX(${proX}px) scale(0.7)` }}>
                    <ProDashboard />
                </div>

                {/* PRO Label */}
                <div style={{
                    position: 'absolute',
                    bottom: '12%',
                    right: '10%',
                    transform: `rotate(10deg) scale(${labelScale})`,
                    opacity: labelOpacity,
                    backgroundColor: '#22C55E',
                    color: 'white',
                    fontSize: '36px',
                    fontWeight: '900',
                    padding: '8px 24px',
                    borderRadius: '8px',
                    fontFamily: 'Inter, sans-serif',
                    textTransform: 'uppercase',
                    boxShadow: '0 4px 15px rgba(34, 197, 94, 0.4)'
                }}>
                    PRO
                </div>
            </div>

            {/* Center - Missing Puzzle Piece */}
            <div style={{
                position: 'absolute',
                top: '42%', // Position at the divider between sections
                left: '50%',
                transform: `translate(-50%, -50%) scale(${puzzleScale})`,
                zIndex: 20,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
            }}>
                <div style={{
                    backgroundColor: '#0A0A0F',
                    borderRadius: '50%',
                    padding: '20px',
                    boxShadow: '0 10px 40px rgba(0, 0, 0, 0.3), 0 0 0 4px #EF4444',
                    border: '4px solid #FEE2E2'
                }}>
                    <Puzzle size={80} color="#EF4444" strokeWidth={2} />
                </div>
                <div style={{
                    marginTop: '16px',
                    fontSize: '28px',
                    fontWeight: '900',
                    color: 'white',
                    backgroundColor: '#EF4444',
                    padding: '8px 20px',
                    borderRadius: '10px',
                    boxShadow: '0 4px 15px rgba(239, 68, 68, 0.4)',
                    transform: 'rotate(-3deg)',
                    fontFamily: 'Inter, sans-serif'
                }}>
                    MISSING!
                </div>
            </div>
        </AbsoluteFill>
    );
};
