import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring } from 'remotion';
import { Folder, FileCode, FileJson, ArrowDown, ChevronRight } from 'lucide-react';

interface FileItem {
    name: string;
    type: 'folder' | 'file';
    isOpen?: boolean;
    indent?: boolean;
    isActive?: boolean;
    icon?: React.ReactNode;
}

// Dark background color to match main composition
const DARK_BG_COLOR = '#0A0A0F';

export const Scene5_Directory: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    // Scroll animation - scroll down to reveal skills folder
    const scrollProgress = interpolate(frame, [0, 45], [0, -120], { extrapolateRight: 'clamp' });

    // Highlight pulse animation for ui-pro-max folder
    const highlightPulse = spring({
        frame: frame - 30,
        fps,
        config: { damping: 10, stiffness: 80 },
    });
    const highlightScale = interpolate(highlightPulse, [0, 1], [1, 1.02]);

    // AUTOMATE IT text animation
    const textSpring = spring({
        frame: frame - 20,
        fps,
        config: { damping: 12, stiffness: 100 },
    });
    const textScale = interpolate(textSpring, [0, 1], [0.8, 1]);
    const textOpacity = interpolate(frame, [20, 30], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

    // Arrow bounce animation
    const arrowBounce = spring({
        frame: frame % 30,
        fps,
        config: { damping: 5, stiffness: 100 },
    });
    const arrowY = interpolate(arrowBounce, [0, 1], [0, 15]);

    const items: FileItem[] = [
        { name: 'app', type: 'folder' },
        { name: 'components', type: 'folder' },
        { name: 'lib', type: 'folder' },
        { name: 'public', type: 'folder' },
        { name: 'skills', type: 'folder', isOpen: true },
        { name: 'ui-pro-max', type: 'folder', indent: true, isActive: true },
        { name: 'index.ts', type: 'file', indent: true, icon: <FileCode size={20} color="#3B82F6" /> },
        { name: 'styles.css', type: 'file', indent: true, icon: <FileCode size={20} color="#3B82F6" /> },
        { name: 'package.json', type: 'file', icon: <FileJson size={20} color="#F59E0B" /> },
        { name: 'tsconfig.json', type: 'file', icon: <FileJson size={20} color="#3B82F6" /> },
    ];

    return (
        <AbsoluteFill style={{
            backgroundColor: DARK_BG_COLOR,
            fontFamily: '"Inter", sans-serif',
            display: 'flex',
            flexDirection: 'column'
        }}>
            {/* Header */}
            <div style={{
                padding: '24px 32px',
                borderBottom: '1px solid #334155',
                backgroundColor: '#1E293B',
                display: 'flex',
                alignItems: 'center',
                gap: '12px'
            }}>
                <div style={{
                    width: '32px',
                    height: '32px',
                    backgroundColor: '#3B82F6',
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                        <path d="M3 3h18v18H3z" />
                        <path d="M3 9h18" />
                        <path d="M9 21V9" />
                    </svg>
                </div>
                <div style={{ fontSize: '20px', fontWeight: '700', color: '#F1F5F9' }}>
                    PROJECT EXPLORER
                </div>
            </div>

            {/* File Directory */}
            <div style={{
                flex: 1,
                padding: '20px 32px',
                overflow: 'hidden',
                position: 'relative'
            }}>
                <div style={{
                    transform: `translateY(${scrollProgress}px)`,
                    transition: 'none'
                }}>
                    {items.map((item, index) => {
                        const isHighlighted = item.name === 'ui-pro-max';

                        return (
                            <div
                                key={index}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '12px',
                                    padding: '14px 20px',
                                    paddingLeft: item.indent ? '56px' : '20px',
                                    backgroundColor: isHighlighted ? '#EFF6FF' : 'transparent',
                                    borderRadius: '10px',
                                    marginBottom: '6px',
                                    color: isHighlighted ? '#3B82F6' : '#94A3B8',
                                    fontWeight: isHighlighted ? 600 : 400,
                                    border: isHighlighted ? '2px solid #3B82F6' : '2px solid transparent',
                                    transform: isHighlighted ? `scale(${highlightScale})` : 'scale(1)',
                                    transition: 'none',
                                    boxShadow: isHighlighted ? '0 4px 20px rgba(59, 130, 246, 0.2)' : 'none'
                                }}
                            >
                                {item.type === 'folder' && (
                                    <ChevronRight
                                        size={18}
                                        style={{
                                            transform: item.isOpen ? 'rotate(90deg)' : 'none',
                                            transition: 'none'
                                        }}
                                    />
                                )}
                                {item.icon || (
                                    <Folder
                                        size={22}
                                        fill={isHighlighted ? "#3B82F6" : "#94A3B8"}
                                        color={isHighlighted ? "#3B82F6" : "#94A3B8"}
                                        strokeWidth={0}
                                    />
                                )}
                                <span style={{ fontSize: '18px' }}>{item.name}</span>

                                {/* Highlight badge for ui-pro-max */}
                                {isHighlighted && (
                                    <div style={{
                                        marginLeft: 'auto',
                                        backgroundColor: '#3B82F6',
                                        color: 'white',
                                        padding: '4px 12px',
                                        borderRadius: '100px',
                                        fontSize: '12px',
                                        fontWeight: 700
                                    }}>
                                        SKILL FILE
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* CTA Overlay - moved up to stay in safe zone */}
            <div style={{
                position: 'absolute',
                bottom: '25%', // Moved up from 80px to stay within top 80% safe area
                left: '0',
                right: '0',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '16px',
                pointerEvents: 'none'
            }}>
                {/* AUTOMATE IT */}
                <div style={{
                    backgroundColor: '#8B5CF6',
                    color: 'white',
                    padding: '16px 48px',
                    borderRadius: '100px',
                    fontSize: '40px',
                    fontWeight: '900',
                    boxShadow: '0 20px 40px rgba(139, 92, 246, 0.4)',
                    textTransform: 'uppercase',
                    fontFamily: 'Arial, sans-serif',
                    letterSpacing: '2px',
                    transform: `scale(${textScale})`,
                    opacity: textOpacity,
                    transition: 'none'
                }}>
                    Automate It
                </div>

                {/* Link in Bio with Arrow */}
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '8px',
                    opacity: interpolate(frame, [40, 50], [0, 1], { extrapolateRight: 'clamp' })
                }}>
                    <div style={{
                        color: '#94A3B8',
                        fontSize: '24px',
                        fontWeight: 600,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px'
                    }}>
                        Link in Bio
                    </div>
                    <div style={{
                        transform: `translateY(${arrowY}px)`,
                        transition: 'none',
                        color: '#8B5CF6'
                    }}>
                        <ArrowDown size={40} strokeWidth={3} />
                    </div>
                </div>
            </div>

            {/* Gradient fade at bottom - adjusted for dark theme */}
            <div style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                height: '200px',
                background: 'linear-gradient(to top, rgba(15,23,42,1) 0%, rgba(15,23,42,0.8) 50%, rgba(15,23,42,0) 100%)',
                pointerEvents: 'none'
            }} />
        </AbsoluteFill>
    );
};
