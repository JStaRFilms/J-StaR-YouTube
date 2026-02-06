import { useCurrentFrame, useVideoConfig, interpolate, spring, Easing } from 'remotion';

interface Particle {
    id: number;
    x: number;
    y: number;
    color: string;
    rotation: number;
    size: number;
    delay: number;
}

const particles: Particle[] = [
    { id: 1, x: 20, y: 30, color: '#3B82F6', rotation: 45, size: 10, delay: 0 },
    { id: 2, x: 30, y: 40, color: '#8B5CF6', rotation: 90, size: 8, delay: 10 },
    { id: 3, x: 40, y: 25, color: '#22C55E', rotation: 135, size: 12, delay: 5 },
    { id: 4, x: 50, y: 35, color: '#F59E0B', rotation: 180, size: 9, delay: 15 },
    { id: 5, x: 60, y: 45, color: '#EF4444', rotation: 225, size: 11, delay: 8 },
    { id: 6, x: 70, y: 28, color: '#3B82F6', rotation: 270, size: 7, delay: 12 },
    { id: 7, x: 80, y: 38, color: '#8B5CF6', rotation: 315, size: 10, delay: 3 },
    { id: 8, x: 25, y: 50, color: '#22C55E', rotation: 0, size: 8, delay: 18 },
    { id: 9, x: 75, y: 55, color: '#F59E0B', rotation: 60, size: 9, delay: 7 },
    { id: 10, x: 45, y: 60, color: '#EF4444', rotation: 120, size: 11, delay: 20 }
];

export const ConfettiParticles: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    return (
        <div
            style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                pointerEvents: 'none',
                overflow: 'hidden'
            }}
        >
            {particles.map((particle) => {
                // Pop animation: frames 150-250
                const delayFrames = particle.delay;
                const adjustedFrame = Math.max(0, frame - delayFrames);

                const popSpring = spring({
                    frame: adjustedFrame,
                    fps,
                    config: { damping: 12, stiffness: 100 }
                });

                // Fall animation
                const fallProgress = interpolate(adjustedFrame, [0, 100], [0, 1], {
                    extrapolateRight: 'clamp'
                });

                const yOffset = fallProgress * 200;
                const xOffset = Math.sin(fallProgress * 3) * 30;
                const rotation = particle.rotation + fallProgress * 360;
                const opacity = Math.max(0, 1 - fallProgress);

                return (
                    <div
                        key={particle.id}
                        style={{
                            position: 'absolute',
                            left: `${particle.x}%`,
                            top: `${particle.y}%`,
                            transform: `translate(${xOffset}px, ${yOffset}px) rotate(${rotation}deg)`,
                            opacity: popSpring * opacity,
                            width: particle.size,
                            height: particle.size,
                            backgroundColor: particle.color,
                            borderRadius: particle.size > 8 ? '2px' : '50%'
                        }}
                    />
                );
            })}
        </div>
    );
};
