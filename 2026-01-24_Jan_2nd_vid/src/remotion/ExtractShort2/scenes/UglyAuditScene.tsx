import { AbsoluteFill, Sequence, interpolate, useCurrentFrame, Audio, staticFile } from 'remotion';
import { UglyWebsite } from '../components/UglyWebsite';
import { RedPenOverlay } from '../components/RedPenOverlay';

export const UglyAuditScene = () => {
    const frame = useCurrentFrame();

    // Animating the camera scrolling down the ugly website
    const scrollY = interpolate(frame, [0, 400], [0, -300], {
        extrapolateRight: 'clamp',
    });

    return (
        <AbsoluteFill style={{ backgroundColor: '#111827' }}>
            {/* Audio Placeholder */}
            {/* <Audio src={staticFile('audio/meat_ugly.mp3')} /> */}

            {/* The Website Scrolling */}
            <AbsoluteFill
                style={{
                    transform: `translateY(${scrollY}px)`,
                    // Scale it down slightly so it fits in the vertical frame better or appears floating
                    width: '90%',
                    left: '5%',
                    top: '10%',
                    height: '80%', // Making it look like a window
                    boxShadow: '0 0 20px rgba(0,0,0,0.5)',
                    overflow: 'hidden',
                }}
            >
                <UglyWebsite />
            </AbsoluteFill>

            {/* Red Pen Overlay appearing later */}
            <Sequence from={30}>
                <RedPenOverlay />
            </Sequence>

            {/* Text Overlays */}
            <Sequence from={60}>
                <AbsoluteFill
                    style={{
                        top: 800,
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <div
                        style={{
                            fontFamily: 'Impact, sans-serif',
                            fontSize: 100,
                            color: 'red',
                            textShadow: '2px 2px 0px black',
                            transform: 'rotate(-5deg)',
                        }}
                    >
                        BAD SPACING
                    </div>
                </AbsoluteFill>
            </Sequence>
        </AbsoluteFill>
    );
};
