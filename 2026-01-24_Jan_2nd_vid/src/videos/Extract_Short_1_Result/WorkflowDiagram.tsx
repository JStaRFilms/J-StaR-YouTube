import { useCurrentFrame, useVideoConfig, interpolate, spring, Easing } from 'remotion';

const COLORS = {
    background: '#111827',
    primaryNeon: '#3B82F6',
    secondaryNeon: '#8B5CF6',
    textPrimary: '#FFFFFF',
    textSecondary: '#94A3B8',
    gridLines: '#1F2937',
    successGreen: '#22C55E',
};

interface WorkflowStep {
    label: string;
    icon: 'terminal' | 'brain' | 'palette';
}

interface WorkflowDiagramProps {
    steps?: WorkflowStep[];
}

export const WorkflowDiagram: React.FC<WorkflowDiagramProps> = ({
    steps = [
        { label: 'Input', icon: 'terminal' },
        { label: 'Process', icon: 'brain' },
        { label: 'Output', icon: 'palette' },
    ],
}) => {
    const frame = useCurrentFrame();
    const { fps, width, height } = useVideoConfig();

    // Diagram fade in: frames 0-30
    const opacity = interpolate(frame, [0, 30], [0, 1], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
    });

    // Step animations with delays
    const stepDelays = [30, 90, 150];
    const stepsProgress = steps.map((_, index) =>
        spring({
            frame: frame - stepDelays[index],
            fps,
            config: { damping: 15, stiffness: 100 },
        })
    );

    // Arrow animations
    const arrowDelays = [60, 120];
    const arrowProgress = arrowDelays.map((delay, index) =>
        interpolate(frame, [delay, delay + 30], [0, 1], {
            easing: Easing.inOut(Easing.quad),
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
        })
    );

    const renderIcon = (icon: string, index: number) => {
        const scale = stepsProgress[index] || 0;
        const iconSize = 80 * scale;

        switch (icon) {
            case 'terminal':
                return (
                    <svg width={iconSize} height={iconSize} viewBox="0 0 80 80" style={{ overflow: 'visible' }}>
                        <rect
                            x="5"
                            y="10"
                            width="70"
                            height="55"
                            rx="5"
                            fill="none"
                            stroke={COLORS.primaryNeon}
                            strokeWidth="3"
                        />
                        <polyline
                            points="15,50 30,60 15,70"
                            fill="none"
                            stroke={COLORS.textPrimary}
                            strokeWidth="3"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                );
            case 'brain':
                return (
                    <svg width={iconSize} height={iconSize} viewBox="0 0 80 80" style={{ overflow: 'visible' }}>
                        <path
                            d="M40 15 C25 15 15 25 15 35 C15 45 25 55 40 55 C55 55 65 45 65 35 C65 25 55 15 40 15"
                            fill="none"
                            stroke={COLORS.secondaryNeon}
                            strokeWidth="3"
                        />
                        <circle cx="40" cy="35" r="10" fill={COLORS.secondaryNeon} opacity="0.5" />
                        <path
                            d="M40 25 L40 45 M30 35 L50 35"
                            fill="none"
                            stroke={COLORS.textPrimary}
                            strokeWidth="2"
                        />
                    </svg>
                );
            case 'palette':
                return (
                    <svg width={iconSize} height={iconSize} viewBox="0 0 80 80" style={{ overflow: 'visible' }}>
                        <circle
                            cx="40"
                            cy="40"
                            r="25"
                            fill="none"
                            stroke={COLORS.primaryNeon}
                            strokeWidth="3"
                        />
                        <circle cx="30" cy="35" r="8" fill={COLORS.primaryNeon} />
                        <circle cx="50" cy="35" r="6" fill={COLORS.secondaryNeon} />
                        <circle cx="40" cy="52" r="6" fill={COLORS.successGreen || '#22C55E'} />
                    </svg>
                );
            default:
                return null;
        }
    };

    const stepWidth = width / steps.length;
    const arrowWidth = 60;

    return (
        <div
            style={{
                width: '100%',
                height: '100%',
                background: COLORS.background,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                opacity,
            }}
        >
            {/* Workflow title */}
            <div
                style={{
                    position: 'absolute',
                    top: '100px',
                    color: COLORS.textSecondary,
                    fontFamily: 'Roboto Mono, monospace',
                    fontSize: '14px',
                    letterSpacing: '2px',
                    textTransform: 'uppercase',
                }}
            >
                WORKFLOW
            </div>

            {/* Workflow diagram */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0' }}>
                {steps.map((step, index) => (
                    <div key={step.label} style={{ display: 'flex', alignItems: 'center' }}>
                        {/* Step node */}
                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                gap: '16px',
                                transform: `scale(${stepsProgress[index] || 0})`,
                                opacity: stepsProgress[index] || 0,
                            }}
                        >
                            {renderIcon(step.icon, index)}
                            <div
                                style={{
                                    padding: '8px 16px',
                                    background: 'rgba(59, 130, 246, 0.1)',
                                    border: `1px solid ${COLORS.primaryNeon}44`,
                                    borderRadius: '8px',
                                    color: COLORS.textPrimary,
                                    fontFamily: 'Inter, sans-serif',
                                    fontSize: '16px',
                                    fontWeight: 600,
                                }}
                            >
                                {step.label}
                            </div>
                        </div>

                        {/* Arrow between steps */}
                        {index < steps.length - 1 && (
                            <div
                                style={{
                                    width: `${arrowWidth}px`,
                                    height: '4px',
                                    position: 'relative',
                                    overflow: 'hidden',
                                }}
                            >
                                <div
                                    style={{
                                        position: 'absolute',
                                        top: 0,
                                        left: 0,
                                        width: '100%',
                                        height: '100%',
                                        background: COLORS.gridLines,
                                        borderRadius: '2px',
                                    }}
                                />
                                <div
                                    style={{
                                        position: 'absolute',
                                        top: 0,
                                        left: 0,
                                        width: `${(arrowProgress[index] || 0) * 100}%`,
                                        height: '100%',
                                        background: `linear-gradient(90deg, ${COLORS.primaryNeon}, ${COLORS.secondaryNeon})`,
                                        borderRadius: '2px',
                                    }}
                                />
                                {/* Arrow head */}
                                <div
                                    style={{
                                        position: 'absolute',
                                        right: '-8px',
                                        top: '-6px',
                                        width: 0,
                                        height: 0,
                                        borderTop: '8px solid transparent',
                                        borderBottom: '8px solid transparent',
                                        borderLeft: `12px solid ${COLORS.secondaryNeon}`,
                                        opacity: arrowProgress[index] || 0,
                                    }}
                                />
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};
