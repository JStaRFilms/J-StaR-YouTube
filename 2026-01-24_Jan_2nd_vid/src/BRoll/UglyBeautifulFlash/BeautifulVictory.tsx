import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig, random } from 'remotion';
import { SimpleBeautifulMockup } from './SimpleBeautifulMockup';

export const BeautifulVictory: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    // 1. Mockup Slam In
    const scale = spring({
        frame,
        fps,
        config: { stiffness: 400, damping: 15 },
    });

    // 2. Checkmark Bounce (delayed)
    const checkDelay = 10;
    const checkScale = spring({
        frame: frame - checkDelay,
        fps,
        config: { damping: 12 },
    });

    // 3. Text Typewriter (delayed)
    const textDelay = 15;
    const text = "First Try.";
    const textProgress = interpolate(frame - textDelay, [0, 15], [0, text.length], {
        extrapolateRight: 'clamp',
        extrapolateLeft: 'clamp',
    });
    const visibleText = text.slice(0, Math.round(textProgress));

    // 4. Confetti Explosion
    // Generate static confetti data seeded by "confetti"
    const confettiCount = 50;
    const confettiParticles = new Array(confettiCount).fill(0).map((_, i) => {
        const seed = i;
        const x = random(seed) * 1920;
        const y = random(seed + 100) * 1080;
        const color = ['#ff5f56', '#ffbd2e', '#27c93f', '#6366f1'][Math.floor(random(seed + 200) * 4)];
        const delay = random(seed + 300) * 10;
        return { x, y, color, delay, seed };
    });

    return (
        <AbsoluteFill style={{ backgroundColor: '#0a0a0f' }}>
            {/* Beautiful Mockup */}
            <AbsoluteFill style={{
                transform: `scale(${scale})`,
                zIndex: 1
            }}>
                <SimpleBeautifulMockup />
            </AbsoluteFill>

            {/* Checkmark Stamp */}
            <AbsoluteFill style={{
                justifyContent: 'center',
                alignItems: 'center',
                pointerEvents: 'none',
                zIndex: 2,
            }}>
                <div style={{
                    transform: `scale(${checkScale})`,
                    border: '8px solid #22c55e',
                    backgroundColor: 'rgba(34, 197, 94, 0.2)',
                    borderRadius: '50%',
                    width: 200,
                    height: 200,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 0 50px rgba(34, 197, 94, 0.6)',
                }}>
                    <svg viewBox="0 0 24 24" width="120" height="120" fill="none" stroke="#22c55e" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                    </svg>
                </div>
            </AbsoluteFill>

            {/* Victory Text */}
            <div style={{
                position: 'absolute',
                bottom: 100,
                width: '100%',
                textAlign: 'center',
                fontFamily: 'Inter, sans-serif',
                fontSize: 80,
                fontWeight: 800,
                color: 'white',
                zIndex: 3,
                textShadow: '0 4px 20px rgba(0,0,0,0.5)',
            }}>
                {visibleText}
                <span style={{ opacity: frame % 20 < 10 ? 1 : 0 }}>|</span>
            </div>

            {/* Confetti System */}
            <AbsoluteFill style={{ pointerEvents: 'none', zIndex: 4 }}>
                {confettiParticles.map((p, i) => {
                    const particleFrame = frame - checkDelay; // Start explosion with checkmark
                    if (particleFrame < 0) return null;

                    // Explosion physics
                    // Start from center
                    const centerX = 1920 / 2;
                    const centerY = 1080 / 2;

                    // Direction vector based on random position relative to center
                    // We want them to explode OUTWARDS
                    const angle = random(p.seed + 400) * Math.PI * 2;
                    const velocity = 20 + random(p.seed + 500) * 30; // Speed

                    const t = particleFrame;
                    const gravity = 0.5;

                    const dx = Math.cos(angle) * velocity * t; // Linear motion + drag could be added
                    const dy = Math.sin(angle) * velocity * t + 0.5 * gravity * t * t; // Projectile motion

                    const opacity = interpolate(t, [0, 40, 60], [0, 1, 0]);

                    return (
                        <div
                            key={i}
                            style={{
                                position: 'absolute',
                                left: centerX + dx,
                                top: centerY + dy,
                                width: 12,
                                height: 12,
                                backgroundColor: p.color,
                                borderRadius: '50%',
                                opacity,
                                transform: `rotate(${t * 10}deg)`,
                            }}
                        />
                    );
                })}
            </AbsoluteFill>
        </AbsoluteFill>
    );
};
