import { useCurrentFrame, useVideoConfig, AbsoluteFill, Sequence, interpolate, Easing } from 'remotion';
import { WarningTriangle } from './WarningTriangle';
import { GlitchText } from './GlitchText';
import { RedTintOverlay } from './RedTintOverlay';
import { ScanlineEffect } from './ScanlineEffect';
import { GlitchStatic } from './GlitchStatic';
import { UglyOutputGrid } from './UglyOutputGrid';
import { RejectBadge } from './RejectBadge';
import { UglyOutputLabel } from './UglyOutputLabel';
import { GiftBox3D } from './GiftBox3D';
import { FreeTutorialCTA } from './FreeTutorialCTA';
import { BouncingArrow } from './BouncingArrow';
import { SparkleEffects } from './SparkleEffects';
import { GradientBackground } from './GradientBackground';

export const ExtractShort2Pain: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();
    const DURATION = 1800; // 60 seconds @ 30fps

    // Gradient transition opacity
    const gradientOpacity = interpolate(frame, [1500, 1550], [0, 1], {
        easing: Easing.inOut(Easing.quad),
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
    });

    return (
        <AbsoluteFill style={{ backgroundColor: '#111827' }}>
            {/* Gradient overlay for CTA transition */}
            <div
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    background: 'linear-gradient(180deg, #EF4444 0%, #8B5CF6 100%)',
                    opacity: gradientOpacity,
                }}
            />

            {/* === SCENE 1: HOOK (0:00-0:05) === */}
            <Sequence from={0} durationInFrames={150} premountFor={30}>
                {/* Hook effects */}
                <WarningTriangle />
                <GlitchText text="YOUR CODE = TRASH" />
                <RedTintOverlay />
                <ScanlineEffect />
                <GlitchStatic />
            </Sequence>

            {/* === SCENE 2: MEAT (0:05-0:50) === */}
            <Sequence from={150} durationInFrames={1350} premountFor={30}>
                {/* Ugly output grid with glitch effects */}
                <UglyOutputGrid />
                <UglyOutputLabel />

                {/* Reject badges for each grid item */}
                <RejectBadge delay={45} />
                <RejectBadge delay={60} />
                <RejectBadge delay={75} />
                <RejectBadge delay={90} />
            </Sequence>

            {/* === SCENE 3: CTA (0:50-End) === */}
            <Sequence from={1500} durationInFrames={300} premountFor={30}>
                {/* Gift box reveal */}
                <GiftBox3D />

                {/* Celebration sparkles */}
                <SparkleEffects />

                {/* CTA text */}
                <FreeTutorialCTA />

                {/* Bouncing arrow to comments */}
                <BouncingArrow />
            </Sequence>
        </AbsoluteFill>
    );
};
