import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate } from 'remotion';
import { Folder, FileCode, FileJson, ArrowDown, ChevronRight } from 'lucide-react';

export const FileDirectory: React.FC = () => {
    const frame = useCurrentFrame();

    // Scroll animation
    const translateY = interpolate(frame, [0, 60], [0, -150], { extrapolateRight: 'clamp' });

    const items = [
        { name: 'app', type: 'folder' },
        { name: 'components', type: 'folder' },
        { name: 'lib', type: 'folder' },
        { name: 'public', type: 'folder' },
        { name: 'skills', type: 'folder', isOpen: true, highlight: true }, // The target
        { name: 'ui-pro-max', type: 'folder', indent: true, highlight: true, isActive: true },
        { name: 'index.ts', type: 'file', indent: true, icon: <FileCode size={24} color="#3B82F6" /> },
        { name: 'styles.css', type: 'file', indent: true, icon: <FileCode size={24} color="#3B82F6" /> },
        { name: 'package.json', type: 'file', icon: <FileJson size={24} color="#F59E0B" /> },
        { name: 'tsconfig.json', type: 'file', icon: <FileJson size={24} color="#3B82F6" /> },
    ];

    return (
        <AbsoluteFill style={{ backgroundColor: '#111827', color: 'white', fontFamily: '"Inter", sans-serif' }}>
            {/* Sidebar Simulation */}
            <div style={{
                width: '100%',
                height: '100%',
                display: 'flex',
                flexDirection: 'column'
            }}>
                <div style={{
                    padding: '30px',
                    borderBottom: '1px solid #1F2937',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    backgroundColor: '#030712'
                }}>
                    <div style={{ fontSize: '24px', fontWeight: 'bold' }}>PROJECT EXPLORER</div>
                </div>

                <div style={{ flex: 1, padding: '20px', overflow: 'hidden', position: 'relative' }}>
                    <div style={{ transform: `translateY(${translateY}px)` }}>
                        {items.map((item, index) => (
                            <div key={index} style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '12px',
                                padding: '16px 20px',
                                paddingLeft: item.indent ? '60px' : '20px',
                                backgroundColor: item.isActive ? '#1F2937' : 'transparent',
                                borderRadius: '8px',
                                marginBottom: '4px',
                                color: item.isActive ? '#60A5FA' : '#9CA3AF',
                                fontWeight: item.isActive ? 600 : 400,
                                border: item.isActive ? '1px solid #374151' : '1px solid transparent'
                            }}>
                                {item.type === 'folder' && <ChevronRight size={20} style={{ transform: item.isOpen ? 'rotate(90deg)' : 'none' }} />}
                                {item.icon || <Folder size={24} fill={item.isActive ? "#60A5FA" : "#9CA3AF"} strokeWidth={0} />}
                                <span style={{ fontSize: '24px' }}>{item.name}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* CTA Overlay */}
            <div style={{
                position: 'absolute',
                bottom: '25%', // Safe Zone (Top 75%)
                left: '0',
                right: '0',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '20px'
            }}>
                <div style={{
                    backgroundColor: '#10B981',
                    color: 'white',
                    padding: '20px 60px',
                    borderRadius: '100px',
                    fontSize: '48px',
                    fontWeight: '900',
                    boxShadow: '0 20px 50px rgba(16, 185, 129, 0.4)',
                    textTransform: 'uppercase',
                    animation: 'pulse 2s infinite' // Note: This won't work in Remotion without defining keyframes in CSS or using frame interpolation
                }}>
                    Automate It
                </div>
                <div style={{
                    color: 'white',
                    fontSize: '24px',
                    opacity: 0.8,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px'
                }}>
                    Link in Bio <ArrowDown />
                </div>
            </div>
        </AbsoluteFill>
    );
};
