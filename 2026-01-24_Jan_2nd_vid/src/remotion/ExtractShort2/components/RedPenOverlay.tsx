import { useCurrentFrame, useVideoConfig } from 'remotion';

export const RedPenOverlay = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    // Circle animation logic could go here via SVG
    // For now, let's create a simple SVG circle that "draws" itself

    const drawProgress = Math.min(1, frame / 30); // 1 second to draw

    const dashArray = 1000;
    const dashOffset = dashArray * (1 - drawProgress);

    return (
        <svg
            width="100%"
            height="100%"
            style={{
                position: 'absolute',
                top: 0,
                left: 0,
                pointerEvents: 'none',
                zIndex: 10,
            }}
        >
            {/* Circle around "Welcome to My Website" */}
            <ellipse
                cx="50%"
                cy="150"
                rx="300"
                ry="60"
                fill="none"
                stroke="red"
                strokeWidth="5"
                strokeDasharray={dashArray}
                strokeDashoffset={dashOffset}
                transform="rotate(-2 540 150)" // Slight tilt for hand-drawn feel
                style={{
                    filter: 'url(#roughness)', // Hypothetical filter, or just basic stroke for now
                }}
            />

            {/* Arrow pointing to "No Padding" */}
            {frame > 45 && (
                <path
                    d="M 600 600 L 700 700"
                    stroke="red"
                    strokeWidth="5"
                    markerEnd="url(#arrowhead)"
                />
            )}

            <defs>
                <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="0" refY="3.5" orient="auto">
                    <polygon points="0 0, 10 3.5, 0 7" fill="red" />
                </marker>
            </defs>
        </svg>
    );
};
