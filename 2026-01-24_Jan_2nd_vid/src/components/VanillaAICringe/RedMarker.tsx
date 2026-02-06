import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';

export const RedMarker: React.FC<{
    type: 'circle' | 'x';
    x: number;
    y: number;
    width: number;
    height: number;
    delay: number;
}> = ({ type, x, y, width, height, delay }) => {
    const frame = useCurrentFrame();
    const progress = interpolate(frame - delay, [0, 15], [0, 1], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
    });

    if (progress <= 0) return null;

    const strokeDashoffset = interpolate(progress, [0, 1], [1000, 0]);

    return (
        <div
            style={{
                position: 'absolute',
                left: x,
                top: y,
                width,
                height,
                pointerEvents: 'none',
                zIndex: 50,
            }}
        >
            <svg
                width="100%"
                height="100%"
                viewBox={`0 0 ${width} ${height}`}
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{ overflow: 'visible' }}
            >
                {type === 'circle' && (
                    <path
                        d={`M 10,${height / 2} Q ${width / 2},0 ${width - 10},${height / 2} Q ${width / 2},${height} 10,${height / 2} z`} // Rough ellipse
                        stroke="red"
                        strokeWidth="5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        fill="none"
                        strokeDasharray="1000"
                        strokeDashoffset={strokeDashoffset}
                        style={{ filter: 'drop-shadow(0px 2px 2px rgba(0,0,0,0.3))' }}
                    />
                )}
                {type === 'x' && (
                    <>
                        <path
                            d={`M 10,10 L ${width - 10},${height - 10}`}
                            stroke="red"
                            strokeWidth="8"
                            strokeLinecap="round"
                            fill="none"
                            strokeDasharray="1000"
                            strokeDashoffset={strokeDashoffset}
                        />
                        <path
                            d={`M ${width - 10},10 L 10,${height - 10}`}
                            stroke="red"
                            strokeWidth="8"
                            strokeLinecap="round"
                            fill="none"
                            strokeDasharray="1000"
                            strokeDashoffset={interpolate(frame - delay - 5, [0, 10], [1000, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })} // Second stroke slightly delayed
                        />
                    </>
                )}
            </svg>
        </div>
    );
};
