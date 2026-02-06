import { AbsoluteFill, useVideoConfig, useCurrentFrame, interpolate } from 'remotion';
import React from 'react';

export const TransmutationCircle: React.FC<{
    opacity: number;
    scale: number;
    rotation: number;
    color: string;
}> = ({ opacity, scale, rotation, color }) => {
    const { width, height } = useVideoConfig();

    const outerRadius = 350;
    const midRadius = 280;
    const innerRadius = 200;

    // Calculate circumferences for dasharray
    const outerCircumference = 2 * Math.PI * outerRadius;
    const midCircumference = 2 * Math.PI * midRadius;
    const innerCircumference = 2 * Math.PI * innerRadius;

    return (
        <AbsoluteFill
            style={{
                justifyContent: 'center',
                alignItems: 'center',
                opacity,
                transform: `scale(${scale}) rotate(${rotation}deg)`,
            }}
        >
            <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
                {/* Outer Ring */}
                <circle
                    cx={width / 2}
                    cy={height / 2}
                    r={outerRadius}
                    fill="none"
                    stroke={color}
                    strokeWidth={4}
                    strokeDasharray={outerCircumference}
                // We can animate this dash offset if we want a draw effect passed in
                // checking spec: "Outer Circle | Draw + Rotate"
                />

                {/* Middle Ring - dashed */}
                <circle
                    cx={width / 2}
                    cy={height / 2}
                    r={midRadius}
                    fill="none"
                    stroke={color}
                    strokeWidth={2}
                    strokeDasharray="20 10"
                    opacity={0.7}
                />

                {/* Inner Ring - solid */}
                <circle
                    cx={width / 2}
                    cy={height / 2}
                    r={innerRadius}
                    fill="none"
                    stroke={color}
                    strokeWidth={6}
                />

                {/* Decor elements - Triangle */}
                <polygon
                    points={`
						${width / 2},${height / 2 - innerRadius} 
						${width / 2 - innerRadius * 0.866},${height / 2 + innerRadius * 0.5}
						${width / 2 + innerRadius * 0.866},${height / 2 + innerRadius * 0.5}
					`}
                    fill="none"
                    stroke={color}
                    strokeWidth={2}
                    opacity={0.5}
                />

                {/* Inverted Triangle */}
                <polygon
                    points={`
						${width / 2},${height / 2 + innerRadius} 
						${width / 2 - innerRadius * 0.866},${height / 2 - innerRadius * 0.5}
						${width / 2 + innerRadius * 0.866},${height / 2 - innerRadius * 0.5}
					`}
                    fill="none"
                    stroke={color}
                    strokeWidth={2}
                    opacity={0.5}
                />
            </svg>
        </AbsoluteFill>
    );
};
