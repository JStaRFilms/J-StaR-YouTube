import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate } from 'remotion';
import { SimpleUglyMockup } from './SimpleUglyMockup';
import { SimpleBeautifulMockup } from './SimpleBeautifulMockup';

export const RapidToggle: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    // Toggle logic with decreasing intervals
    // Intervals logic: [15, 12, 9, 6, 4, 3, 2, 2, 2]
    // We need to map the current frame to which "state" we are in.

    const intervals = [15, 12, 9, 6, 4, 3, 2, 2, 2, 2, 2, 2, 2, 2, 2];
    let cumFrames = 0;
    let currentIntervalIndex = 0;
    let isBeautiful = false;
    let lastToggleFrame = 0;

    // Calculate state for current frame
    for (let i = 0; i < intervals.length; i++) {
        if (frame < cumFrames + intervals[i]) {
            currentIntervalIndex = i;
            // Within this interval
            // Determine if we toggled at the start of this interval
            // If i is even (0, 2..), let's say it's Ugly. If odd, Beautiful.
            // Actually, let's just flip every interval
            isBeautiful = i % 2 !== 0;
            lastToggleFrame = cumFrames;
            break;
        }
        cumFrames += intervals[i];
        isBeautiful = i % 2 !== 0; // Fallback for end of list
    }

    // Safety for frames beyond defined intervals
    if (frame >= cumFrames) {
        isBeautiful = intervals.length % 2 !== 0;
        lastToggleFrame = cumFrames; // Just to hold value
    }

    const Mockup = isBeautiful ? SimpleBeautifulMockup : SimpleUglyMockup;
    const overlayColor = isBeautiful ? '#22c55e' : '#ff4444';

    // Flash white burst on toggle
    const framesSinceToggle = frame - lastToggleFrame;
    const flashOpacity = interpolate(framesSinceToggle, [0, 2], [0.5, 0], {
        extrapolateRight: 'clamp',
    });

    // Chromatic Aberration offset (glitch)
    // Stronger at toggle moments
    const glitchIntensity = interpolate(framesSinceToggle, [0, 2], [20, 0], {
        extrapolateRight: 'clamp',
    });

    return (
        <AbsoluteFill style={{ backgroundColor: '#0a0a0f' }}>
            {/* Main Content with Glitch Effect (simulated by rendering 3 times with offset) */}

            {/* Blue Channel */}
            <AbsoluteFill style={{
                transform: `translateX(${-glitchIntensity}px)`,
                opacity: 0.8,
                mixBlendMode: 'screen',
            }}>
                <Mockup />
                <div style={{ position: 'absolute', inset: 0, backgroundColor: 'blue', mixBlendMode: 'multiply' }} />
            </AbsoluteFill>

            {/* Red Channel */}
            <AbsoluteFill style={{
                transform: `translateX(${glitchIntensity}px)`,
                opacity: 0.8,
                mixBlendMode: 'screen',
            }}>
                <Mockup />
                <div style={{ position: 'absolute', inset: 0, backgroundColor: 'red', mixBlendMode: 'multiply' }} />
            </AbsoluteFill>

            {/* Green/Normal Channel */}
            <AbsoluteFill style={{ mixBlendMode: 'screen' }}>
                <Mockup />
                <div style={{ position: 'absolute', inset: 0, backgroundColor: 'lime', mixBlendMode: 'multiply' }} />
            </AbsoluteFill>

            {/* Overlay for Color Flash */}
            <AbsoluteFill style={{
                backgroundColor: overlayColor,
                opacity: flashOpacity * 0.3, // Tint flash
                mixBlendMode: 'overlay',
            }} />

            {/* White Burst Flash */}
            <AbsoluteFill style={{
                backgroundColor: 'white',
                opacity: flashOpacity,
                mixBlendMode: 'soft-light',
            }} />

        </AbsoluteFill>
    );
};
