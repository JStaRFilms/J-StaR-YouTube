import { AbsoluteFill, Sequence, useCurrentFrame, interpolate, spring, useVideoConfig } from 'remotion';
import { BeforeGlitch } from '../components/shorts/ExtractShort1/BeforeGlitch';
import { AfterDesignSystem } from '../components/shorts/ExtractShort1/AfterDesignSystem';
import { WorkflowDiagram } from '../components/shorts/ExtractShort1/WorkflowDiagram';

export const ExtractShort1Result: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    // Scene 1: Hook (0-5s)
    // Scene 2: Meat (5-50s)
    // Scene 3: CTA (50-60s)

    // Pulse animation for "SAME AI???"
    const pulse = spring({
        frame: frame % 30, // Loop every second roughly
        fps,
        config: { damping: 10, stiffness: 100 }
    });
    const scale = interpolate(pulse, [0, 1], [1, 1.1]);

    return (
        <AbsoluteFill style={{ backgroundColor: '#000' }}>

            {/* SCENE 1: HOOK (0 - 150 frames) */}
            <Sequence from={0} durationInFrames={150} name="Hook">
                <AbsoluteFill>
                    {/* Top Pane: Before */}
                    <div style={{ height: '50%', width: '100%', position: 'absolute', top: 0, overflow: 'hidden' }}>
                        <BeforeGlitch />
                    </div>

                    {/* Bottom Pane: After */}
                    <div style={{ height: '50%', width: '100%', position: 'absolute', top: '50%', overflow: 'hidden' }}>
                        <AfterDesignSystem />
                    </div>

                    {/* Overlay Text */}
                    <div style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: `translate(-50%, -50%) scale(${scale})`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        zIndex: 20
                    }}>
                        <h1 style={{
                            fontFamily: 'Inter, sans-serif',
                            fontSize: 80,
                            fontWeight: 900,
                            color: '#ffffff',
                            textShadow: '0 0 20px rgba(0,0,0,1)',
                            backgroundColor: 'rgba(0,0,0,0.7)',
                            padding: '10px 30px',
                            borderRadius: 16,
                            border: '2px solid #3B82F6'
                        }}>
                            SAME AI???
                        </h1>
                    </div>
                </AbsoluteFill>
            </Sequence>

            {/* SCENE 2: MEAT (150 - 1500 frames) */}
            <Sequence from={150} durationInFrames={1350} name="Meat">
                <AfterDesignSystem />
            </Sequence>

            {/* SCENE 3: CTA (1500 - 1800 frames) */}
            <Sequence from={1500} durationInFrames={300} name="CTA">
                <WorkflowDiagram />
            </Sequence>

        </AbsoluteFill>
    );
};
