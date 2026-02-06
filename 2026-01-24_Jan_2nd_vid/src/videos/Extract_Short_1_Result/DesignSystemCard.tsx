import { useCurrentFrame, useVideoConfig, interpolate, spring } from 'remotion';

const COLORS = {
    background: '#111827',
    primaryNeon: '#3B82F6',
    secondaryNeon: '#8B5CF6',
    textPrimary: '#FFFFFF',
    textSecondary: '#94A3B8',
    gridLines: '#1F2937',
    successGreen: '#22C55E',
};

type CardType = 'colors' | 'typography' | 'spacing' | 'shadows' | 'components' | 'buttons';

interface DesignSystemCardProps {
    type: CardType;
    delay?: number;
}

export const DesignSystemCard: React.FC<DesignSystemCardProps> = ({ type, delay = 0 }) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    // Spring animation for card entrance
    const cardSpring = spring({
        frame: frame - delay,
        fps,
        config: { damping: 15, stiffness: 100 },
    });

    const opacity = interpolate(frame, [delay, delay + 30], [0, 1], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
    });

    const translateY = interpolate(cardSpring, [0, 1], [100, 0], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
    });

    const scale = interpolate(cardSpring, [0, 1], [0.9, 1], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
    });

    const renderContent = () => {
        switch (type) {
            case 'colors':
                return (
                    <>
                        <div style={{ marginBottom: '16px', color: COLORS.textSecondary, fontSize: '14px', fontFamily: 'Roboto Mono, monospace' }}>
                            COLOR PALETTE
                        </div>
                        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                            {['#3B82F6', '#8B5CF6', '#22C55E', '#F59E0B', '#EF4444'].map((color, i) => (
                                <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
                                    <div
                                        style={{
                                            width: '48px',
                                            height: '48px',
                                            borderRadius: '8px',
                                            background: color,
                                            boxShadow: `0 4px 12px ${color}40`,
                                        }}
                                    />
                                    <span style={{ fontSize: '10px', color: COLORS.textSecondary, fontFamily: 'monospace' }}>
                                        {color}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </>
                );

            case 'typography':
                return (
                    <>
                        <div style={{ marginBottom: '16px', color: COLORS.textSecondary, fontSize: '14px', fontFamily: 'Roboto Mono, monospace' }}>
                            TYPOGRAPHY
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                            <div>
                                <div style={{ fontSize: '32px', fontWeight: 700, color: COLORS.textPrimary, lineHeight: 1 }}>
                                    Heading Large
                                </div>
                                <div style={{ fontSize: '12px', color: COLORS.textSecondary }}>Inter / 700 / 32px</div>
                            </div>
                            <div>
                                <div style={{ fontSize: '18px', fontWeight: 600, color: COLORS.textPrimary, lineHeight: 1.4 }}>
                                    Heading Medium
                                </div>
                                <div style={{ fontSize: '12px', color: COLORS.textSecondary }}>Inter / 600 / 18px</div>
                            </div>
                            <div>
                                <div style={{ fontSize: '14px', fontWeight: 400, color: COLORS.textSecondary, lineHeight: 1.5 }}>
                                    Body text with comfortable reading line height and secondary color.
                                </div>
                                <div style={{ fontSize: '12px', color: COLORS.textSecondary }}>Inter / 400 / 14px</div>
                            </div>
                        </div>
                    </>
                );

            case 'spacing':
                return (
                    <>
                        <div style={{ marginBottom: '16px', color: COLORS.textSecondary, fontSize: '14px', fontFamily: 'Roboto Mono, monospace' }}>
                            SPACING SCALE
                        </div>
                        <div style={{ display: 'flex', alignItems: 'flex-end', gap: '8px', height: '80px' }}>
                            {[4, 8, 16, 24, 32, 48, 64].map((space, i) => (
                                <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
                                    <div
                                        style={{
                                            width: '24px',
                                            height: `${space}px`,
                                            background: `linear-gradient(180deg, ${COLORS.primaryNeon}88, ${COLORS.primaryNeon}44)`,
                                            borderRadius: '4px',
                                        }}
                                    />
                                    <span style={{ fontSize: '10px', color: COLORS.textSecondary, fontFamily: 'monospace' }}>
                                        {space}px
                                    </span>
                                </div>
                            ))}
                        </div>
                    </>
                );

            case 'shadows':
                return (
                    <>
                        <div style={{ marginBottom: '16px', color: COLORS.textSecondary, fontSize: '14px', fontFamily: 'Roboto Mono, monospace' }}>
                            SHADOWS
                        </div>
                        <div style={{ display: 'flex', gap: '24px', justifyContent: 'center', paddingTop: '8px' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                                <div
                                    style={{
                                        width: '64px',
                                        height: '64px',
                                        background: '#1e293b',
                                        borderRadius: '12px',
                                        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                                    }}
                                />
                                <span style={{ fontSize: '10px', color: COLORS.textSecondary, fontFamily: 'monospace' }}>sm</span>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                                <div
                                    style={{
                                        width: '64px',
                                        height: '64px',
                                        background: '#1e293b',
                                        borderRadius: '12px',
                                        boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                                    }}
                                />
                                <span style={{ fontSize: '10px', color: COLORS.textSecondary, fontFamily: 'monospace' }}>md</span>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                                <div
                                    style={{
                                        width: '64px',
                                        height: '64px',
                                        background: '#1e293b',
                                        borderRadius: '12px',
                                        boxShadow: `0 10px 15px -3px ${COLORS.primaryNeon}40, 0 4px 6px -2px ${COLORS.primaryNeon}20`,
                                    }}
                                />
                                <span style={{ fontSize: '10px', color: COLORS.textSecondary, fontFamily: 'monospace' }}>glow</span>
                            </div>
                        </div>
                    </>
                );

            case 'components':
                return (
                    <>
                        <div style={{ marginBottom: '16px', color: COLORS.textSecondary, fontSize: '14px', fontFamily: 'Roboto Mono, monospace' }}>
                            COMPONENTS
                        </div>
                        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
                            <div
                                style={{
                                    padding: '12px 24px',
                                    background: COLORS.primaryNeon,
                                    borderRadius: '8px',
                                    color: '#fff',
                                    fontSize: '14px',
                                    fontWeight: 600,
                                }}
                            >
                                Button
                            </div>
                            <div
                                style={{
                                    padding: '12px 24px',
                                    background: 'transparent',
                                    border: `1px solid ${COLORS.gridLines}`,
                                    borderRadius: '8px',
                                    color: COLORS.textPrimary,
                                    fontSize: '14px',
                                    fontWeight: 500,
                                }}
                            >
                                Outline
                            </div>
                        </div>
                    </>
                );

            case 'buttons':
                return (
                    <>
                        <div style={{ marginBottom: '16px', color: COLORS.textSecondary, fontSize: '14px', fontFamily: 'Roboto Mono, monospace' }}>
                            BUTTON VARIANTS
                        </div>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', justifyContent: 'center' }}>
                            <div
                                style={{
                                    padding: '10px 20px',
                                    background: COLORS.primaryNeon,
                                    borderRadius: '8px',
                                    color: '#fff',
                                    fontSize: '13px',
                                    fontWeight: 600,
                                }}
                            >
                                Primary
                            </div>
                            <div
                                style={{
                                    padding: '10px 20px',
                                    background: COLORS.secondaryNeon,
                                    borderRadius: '8px',
                                    color: '#fff',
                                    fontSize: '13px',
                                    fontWeight: 600,
                                }}
                            >
                                Secondary
                            </div>
                            <div
                                style={{
                                    padding: '10px 20px',
                                    background: 'transparent',
                                    border: `2px solid ${COLORS.successGreen}`,
                                    borderRadius: '8px',
                                    color: COLORS.successGreen,
                                    fontSize: '13px',
                                    fontWeight: 600,
                                }}
                            >
                                Success
                            </div>
                        </div>
                    </>
                );

            default:
                return null;
        }
    };

    return (
        <div
            style={{
                width: '100%',
                maxWidth: '400px',
                background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
                borderRadius: '16px',
                border: `1px solid ${COLORS.gridLines}`,
                padding: '24px',
                opacity,
                transform: `translateY(${translateY}px) scale(${scale})`,
                boxShadow: `0 4px 30px ${COLORS.primaryNeon}10`,
            }}
        >
            {renderContent()}
        </div>
    );
};
