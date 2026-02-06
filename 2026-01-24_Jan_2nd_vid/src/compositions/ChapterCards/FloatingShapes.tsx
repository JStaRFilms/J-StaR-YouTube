import React, { useMemo } from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate } from 'remotion';
import { Circle } from './shapes/Circle';
import { Square } from './shapes/Square';
import { Triangle } from './shapes/Triangle';
import { Hexagon } from './shapes/Hexagon';
import { Star } from './shapes/Star';
import { Blob } from './shapes/Blob';

interface FloatingShapesProps {
    shapeColors: string[];
    seed: number;
}

// Simple seeded random for deterministic positions
const seededRandom = (seed: number): number => {
    const x = Math.sin(seed * 9999) * 10000;
    return x - Math.floor(x);
};

type ShapeType = 'circle' | 'square' | 'triangle' | 'hexagon' | 'star' | 'blob';

interface ShapeData {
    id: number;
    x: number;
    y: number;
    size: number;
    color: string;
    type: ShapeType;
    delay: number;
    rotationSpeed: number;
    floatSpeed: number;
}

const ShapeComponent: React.FC<{ type: ShapeType; size: number; color: string }> = ({
    type,
    size,
    color,
}) => {
    switch (type) {
        case 'circle':
            return <Circle size={size} color={color} />;
        case 'square':
            return <Square size={size} color={color} />;
        case 'triangle':
            return <Triangle size={size} color={color} />;
        case 'hexagon':
            return <Hexagon size={size} color={color} />;
        case 'star':
            return <Star size={size} color={color} />;
        case 'blob':
            return <Blob size={size} color={color} />;
        default:
            return <Circle size={size} color={color} />;
    }
};

export const FloatingShapes: React.FC<FloatingShapesProps> = ({ shapeColors, seed }) => {
    const frame = useCurrentFrame();

    const shapes: ShapeData[] = useMemo(() => {
        const shapeTypes: ShapeType[] = ['circle', 'square', 'triangle', 'hexagon', 'star', 'blob'];

        return Array.from({ length: 12 }, (_, i) => ({
            id: i,
            x: seededRandom(seed + i * 7) * 1920 - 50,
            y: seededRandom(seed + i * 13) * 1080,
            size: 30 + seededRandom(seed + i * 17) * 60,
            color: shapeColors[i % shapeColors.length],
            type: shapeTypes[i % shapeTypes.length],
            delay: i * 5,
            rotationSpeed: 0.5 + seededRandom(seed + i * 23) * 1.5,
            floatSpeed: 0.3 + seededRandom(seed + i * 29) * 0.7,
        }));
    }, [seed, shapeColors]);

    return (
        <AbsoluteFill style={{ overflow: 'hidden' }}>
            {shapes.map((shape) => {
                // Float upward with looping
                const floatY = interpolate(
                    ((frame + shape.delay) * shape.floatSpeed) % 120,
                    [0, 60, 120],
                    [shape.y + 50, shape.y - 80, shape.y + 50],
                    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
                );

                // Gentle horizontal drift
                const driftX = interpolate(
                    Math.sin((frame + shape.delay) * 0.02),
                    [-1, 1],
                    [-20, 20]
                );

                // Slow rotation
                const rotate = (frame + shape.delay) * shape.rotationSpeed;

                // Opacity varies slightly for depth
                const opacity = interpolate(
                    Math.sin((frame + shape.delay * 2) * 0.03),
                    [-1, 1],
                    [0.4, 0.9]
                );

                return (
                    <div
                        key={shape.id}
                        style={{
                            position: 'absolute',
                            left: shape.x + driftX,
                            top: floatY,
                            transform: `rotate(${rotate}deg)`,
                            opacity,
                        }}
                    >
                        <ShapeComponent type={shape.type} size={shape.size} color={shape.color} />
                    </div>
                );
            })}
        </AbsoluteFill>
    );
};
