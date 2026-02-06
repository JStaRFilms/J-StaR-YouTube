import React, { useMemo } from 'react';
import { useCurrentFrame, useVideoConfig, interpolate, interpolateColors, spring } from 'remotion';

interface Particle {
    id: number;
    startX: number;
    startY: number;
    endX: number;
    endY: number;
    delay: number; // Stagger delay in frames
    controlX: number; // Bezier control point
    controlY: number;
}

interface ParticleSystemProps {
    /** Frame when decomposition starts */
    decomposeStart: number;
    /** Frame when decomposition ends */
    decomposeEnd: number;
    /** Frame when reconstruction starts */
    reconstructStart: number;
    /** Frame when reconstruction ends */
    reconstructEnd: number;
    /** Grid dimensions for particles */
    gridSize?: number;
    /** Size of source mockup area */
    sourceBounds: { x: number; y: number; width: number; height: number };
    /** Size of destination mockup area */
    destBounds: { x: number; y: number; width: number; height: number };
}

/**
 * Quadratic bezier interpolation
 */
function bezierPoint(t: number, p0: number, p1: number, p2: number): number {
    return (1 - t) * (1 - t) * p0 + 2 * (1 - t) * t * p1 + t * t * p2;
}

/**
 * Deterministic pseudo-random based on seed
 */
function seededRandom(seed: number): number {
    const x = Math.sin(seed * 12.9898 + 78.233) * 43758.5453;
    return x - Math.floor(x);
}

export const ParticleSystem: React.FC<ParticleSystemProps> = ({
    decomposeStart,
    decomposeEnd,
    reconstructStart,
    reconstructEnd,
    gridSize = 40,
    sourceBounds,
    destBounds,
}) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    // Pre-calculate all particle paths (memoized for performance)
    const particles = useMemo<Particle[]>(() => {
        const result: Particle[] = [];
        const cellWidth = sourceBounds.width / gridSize;
        const cellHeight = sourceBounds.height / gridSize;
        const destCellWidth = destBounds.width / gridSize;
        const destCellHeight = destBounds.height / gridSize;

        for (let row = 0; row < gridSize; row++) {
            for (let col = 0; col < gridSize; col++) {
                const id = row * gridSize + col;
                const startX = sourceBounds.x + col * cellWidth + cellWidth / 2;
                const startY = sourceBounds.y + row * cellHeight + cellHeight / 2;
                const endX = destBounds.x + col * destCellWidth + destCellWidth / 2;
                const endY = destBounds.y + row * destCellHeight + destCellHeight / 2;

                // Random offset for organic movement
                const rand1 = seededRandom(id * 7);
                const rand2 = seededRandom(id * 13);

                // Bezier control point (creates curved path)
                const midX = (startX + endX) / 2;
                const midY = (startY + endY) / 2;
                const controlX = midX + (rand1 - 0.5) * 300;
                const controlY = midY + (rand2 - 0.5) * 200 - 100; // Arc upward

                // Stagger delay based on position (wave effect from left to right)
                const delay = (col / gridSize) * 15 + (rand1 * 5);

                result.push({
                    id,
                    startX,
                    startY,
                    endX,
                    endY,
                    delay,
                    controlX,
                    controlY,
                });
            }
        }
        return result;
    }, [gridSize, sourceBounds, destBounds]);

    // Calculate visibility and position for each particle
    const particleElements = particles.map((particle) => {
        // Phase 1: Stationary (before decompose)
        // Phase 2: Decompose and travel (decomposeStart -> reconstructEnd)
        // Phase 3: Stationary at destination (after reconstruct)

        const totalTravelFrames = reconstructEnd - decomposeStart;
        const particleStartFrame = decomposeStart + particle.delay;
        const particleTravelDuration = totalTravelFrames - particle.delay * 2; // Subtract stagger from both ends

        // Calculate progress along path
        let progress = 0;
        if (frame < particleStartFrame) {
            progress = 0;
        } else if (frame > particleStartFrame + particleTravelDuration) {
            progress = 1;
        } else {
            // Use spring for organic movement
            progress = spring({
                frame: frame - particleStartFrame,
                fps,
                durationInFrames: particleTravelDuration,
                config: { damping: 200 },
            });
        }

        // Bezier interpolation for curved path
        const x = bezierPoint(progress, particle.startX, particle.controlX, particle.endX);
        const y = bezierPoint(progress, particle.startY, particle.controlY, particle.endY);

        // Color transition: red -> yellow -> green
        const color = interpolateColors(
            progress,
            [0, 0.5, 1],
            ['#ff6b6b', '#fbbf24', '#22c55e']
        );

        // Opacity: fade in at start, solid in middle, fade out at end (land smoothly)
        const opacity = interpolate(
            progress,
            [0, 0.1, 0.9, 1],
            [0.3, 1, 1, 0],
            { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
        );

        // Size: slightly larger during travel for visibility
        const size = interpolate(
            progress,
            [0, 0.2, 0.8, 1],
            [3, 5, 5, 3],
            { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
        );

        // Only render if in motion phase
        const visible = frame >= decomposeStart && frame <= reconstructEnd;
        if (!visible) return null;

        return (
            <div
                key={particle.id}
                style={{
                    position: 'absolute',
                    left: x - size / 2,
                    top: y - size / 2,
                    width: size,
                    height: size,
                    borderRadius: '50%',
                    backgroundColor: color,
                    opacity,
                    boxShadow: `0 0 ${size * 2}px ${color}`,
                    willChange: 'transform',
                }}
            />
        );
    });

    return (
        <div
            style={{
                position: 'absolute',
                inset: 0,
                pointerEvents: 'none',
            }}
        >
            {particleElements}
        </div>
    );
};
