import React from 'react';
import {
    AbsoluteFill,
    interpolate,
    spring,
    useCurrentFrame,
    useVideoConfig,
    random,
} from 'remotion';
import { UI_Card } from './components/UI_Card';
import { FileText, DollarSign, Calendar, Hash } from 'lucide-react';
import { NoiseOverlay } from './components/NoiseOverlay';

export const Scene1_Invoice: React.FC<{ showX?: boolean }> = ({ showX = true }) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    // Background: High-tech Light Mode (Subtle Grid)
    const gridStyle: React.CSSProperties = {
        backgroundImage: `
            linear-gradient(to right, rgba(0,0,0,0.05) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0,0,0,0.05) 1px, transparent 1px)
        `,
        backgroundSize: '40px 40px',
        backgroundColor: '#fafafa', // Slightly off-white for depth
    };

    // 1. Enter Animation (Slide Up + Tilt Fix)
    const enterSpring = spring({
        frame,
        fps,
        config: { damping: 20 },
    });
    const translateY = interpolate(enterSpring, [0, 1], [400, 0]);
    const opacity = interpolate(enterSpring, [0, 1], [0, 1]);
    const rotateX = interpolate(enterSpring, [0, 1], [15, 5]); // Starts tilted, settles slightly tilted

    // 2. Red X Animation + Camera Shake
    const xStartFrame = 45;
    const xLine1Progress = spring({
        frame: frame - xStartFrame,
        fps,
        config: { damping: 12, stiffness: 150 },
    });
    const xLine2Progress = spring({
        frame: frame - (xStartFrame + 5),
        fps,
        config: { damping: 12, stiffness: 150 },
    });

    // Camera Shake Calculation
    // Only shake when X is drawing (from frame 45 to ~60)
    const isShaking = frame >= xStartFrame && frame < xStartFrame + 15;
    const shakeIntensity = isShaking ? 15 : 0;
    const shakeX = isShaking ? (random(frame) - 0.5) * shakeIntensity : 0;
    const shakeY = isShaking ? (random(frame + 100) - 0.5) * shakeIntensity : 0;

    // 3. Zoom Out / Transition (Zoom INTO invoice)
    const zoomStartFrame = 120;
    const zoomProgress = interpolate(frame, [zoomStartFrame, zoomStartFrame + 20], [1, 15], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
        easing: (t) => t * t, // Ease in quadratic
    });

    // Fade out as we zoom in excessively
    const contentOpacity = interpolate(frame, [zoomStartFrame + 10, zoomStartFrame + 20], [1, 0], {
        extrapolateRight: 'clamp',
    });

    return (
        <AbsoluteFill style={gridStyle} className="perspective-[1200px] overflow-hidden">
            <NoiseOverlay opacity={0.03} />

            {/* Camera Shake Wrapper */}
            <AbsoluteFill style={{
                transform: `translate(${shakeX}px, ${shakeY}px)`
            }}>
                {/* Main Stage Container */}
                <div
                    style={{
                        flex: 1,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        transform: `scale(${zoomProgress})`,
                        transformOrigin: 'center 40%', // Zoom towards the top/center where "Invoice" is
                        width: '100%',
                        height: '100%',
                    }}
                >
                    <div style={{
                        transform: `translateY(${translateY}px) rotateX(${rotateX}deg)`,
                        transformStyle: 'preserve-3d',
                        opacity,
                    }}>
                        <UI_Card
                            className="w-[800px] h-[1000px] flex flex-col relative bg-white overflow-hidden"
                            style={{
                                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(0,0,0,0.05)',
                                borderRadius: '24px',
                            }}
                        >
                            {/* Decorative Top Bar */}
                            <div className="h-4 w-full bg-gradient-to-r from-blue-500 to-indigo-600" />

                            <div className="p-16 flex flex-col h-full bg-white relative">
                                {/* Watermark Background */}
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.03] pointer-events-none scale-[2]">
                                    <FileText size={400} />
                                </div>

                                {/* Header */}
                                <div className="flex justify-between items-start mb-16 relative z-10">
                                    <div className="flex items-center gap-6">
                                        <div className="w-20 h-20 bg-blue-50 rounded-2xl flex items-center justify-center border border-blue-100 shadow-sm">
                                            <FileText className="w-10 h-10 text-blue-600" />
                                        </div>
                                        <div>
                                            <h1 className="text-5xl font-bold text-slate-900 tracking-tight font-sans mb-2">INVOICE</h1>
                                            <div className="flex items-center gap-3 text-slate-500">
                                                <Hash className="w-4 h-4" />
                                                <span className="font-mono text-lg font-medium">INV-2026-001</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="flex items-center gap-3 justify-end text-slate-400 mb-1">
                                            <Calendar className="w-5 h-5" />
                                            <span className="text-sm font-semibold uppercase tracking-wider">Due Date</span>
                                        </div>
                                        <p className="text-2xl font-semibold text-slate-900">Jan 31, 2026</p>
                                    </div>
                                </div>

                                {/* Bill To / From Grid */}
                                <div className="grid grid-cols-2 gap-12 mb-16 relative z-10">
                                    <div className="p-8 bg-slate-50 rounded-2xl border border-slate-100">
                                        <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">From</h3>
                                        <p className="text-2xl font-bold text-slate-900 mb-2">CreativeOS Studio</p>
                                        <p className="text-slate-500 text-lg leading-relaxed">
                                            123 Design District<br />
                                            San Francisco, CA 94103
                                        </p>
                                    </div>
                                    <div className="p-8 bg-slate-50 rounded-2xl border border-slate-100">
                                        <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">Bill To</h3>
                                        <p className="text-2xl font-bold text-slate-900 mb-2">Top Tier Client</p>
                                        <p className="text-slate-500 text-lg leading-relaxed">
                                            456 Enterprise Way<br />
                                            New York, NY 10001
                                        </p>
                                    </div>
                                </div>

                                {/* Line Items */}
                                <div className="flex-1 relative z-10">
                                    <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-6 pb-2 border-b border-slate-200">
                                        Description
                                    </h3>
                                    <div className="space-y-6">
                                        <div className="flex justify-between items-start group">
                                            <div>
                                                <p className="text-2xl font-semibold text-slate-900 mb-1">Landing Page Design</p>
                                                <p className="text-slate-500 text-lg">UI/UX Design, 3 Revisions, Asset Handoff</p>
                                            </div>
                                            <p className="text-3xl font-mono font-medium text-slate-900">$500.00</p>
                                        </div>
                                        {/* Fake extra items for "fullness" */}
                                        <div className="flex justify-between items-start opacity-40">
                                            <div>
                                                <p className="text-xl font-medium text-slate-900 mb-1">Hosting Setup</p>
                                                <p className="text-slate-500">Domain configuration (Waived)</p>
                                            </div>
                                            <p className="text-2xl font-mono font-medium text-slate-900">$0.00</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Total */}
                                <div className="mt-auto pt-10 border-t-2 border-slate-100 relative z-10">
                                    <div className="flex justify-between items-end">
                                        <p className="text-3xl font-medium text-slate-400">Total Amount</p>
                                        <div className="flex items-center text-slate-900">
                                            <DollarSign className="w-12 h-12 stroke-[3] mr-1" />
                                            <span className="text-7xl font-bold tracking-tight">500.00</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Red X Overlay */}
                            {showX && (
                                <div className="absolute inset-0 z-50 pointer-events-none" style={{ opacity: contentOpacity }}>
                                    <svg className="w-full h-full drop-shadow-2xl">
                                        <line
                                            x1="15%" y1="15%" x2="85%" y2="85%"
                                            stroke="#DC2626" strokeWidth="32" strokeLinecap="round"
                                            strokeDasharray="1800"
                                            strokeDashoffset={interpolate(xLine1Progress, [0, 1], [1800, 0])}
                                            style={{ filter: 'drop-shadow(0 10px 20px rgba(220, 38, 38, 0.4))' }}
                                        />
                                        <line
                                            x1="85%" y1="15%" x2="15%" y2="85%"
                                            stroke="#DC2626" strokeWidth="32" strokeLinecap="round"
                                            strokeDasharray="1800"
                                            strokeDashoffset={interpolate(xLine2Progress, [0, 1], [1800, 0])}
                                            style={{ filter: 'drop-shadow(0 10px 20px rgba(220, 38, 38, 0.4))' }}
                                        />
                                    </svg>
                                </div>
                            )}
                        </UI_Card>
                    </div>
                </div>
            </AbsoluteFill>
        </AbsoluteFill>
    );
};

