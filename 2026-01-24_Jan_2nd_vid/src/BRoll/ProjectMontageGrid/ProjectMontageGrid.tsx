import { AbsoluteFill, Sequence, useCurrentFrame, useVideoConfig, spring, interpolate, Img, staticFile } from 'remotion';
import { z } from 'zod';
import { GridBackground } from './GridBackground';
import { ProjectCard } from './ProjectCard';
import { CounterOverlay } from './CounterOverlay';

export const ProjectMontageGridSchema = z.object({
    // Optional override for images, otherwise we use the defaults
    imagePaths: z.array(z.string()).optional(),
});

// We have 8 unique assets, we need 20 slots. We'll repeat them.
const DEFAULT_ASSETS = [
    '/projects/project_01.png', '/projects/project_02.png', '/projects/project_03.png', '/projects/project_04.png',
    '/projects/project_05.png', '/projects/project_06.png', '/projects/project_07.png', '/projects/project_08.png',
];

const GRID_COLS = 5;
const GRID_ROWS = 4;
const GAP = 20;

export const ProjectMontageGrid: React.FC<z.infer<typeof ProjectMontageGridSchema>> = ({ imagePaths }) => {
    const frame = useCurrentFrame();
    const { fps, width, height } = useVideoConfig();

    // 1. Grid Logic
    const cardWidth = (width - (GRID_COLS + 1) * GAP) / GRID_COLS;
    const cardHeight = (height - (GRID_ROWS + 1) * GAP) / GRID_ROWS;

    // Fill 20 slots
    const slots = Array.from({ length: 20 }, (_, i) => {
        const assetIndex = i % DEFAULT_ASSETS.length;
        const assetPath = (imagePaths && imagePaths[i]) || DEFAULT_ASSETS[assetIndex];
        const src = staticFile(assetPath);

        const col = i % GRID_COLS;
        const row = Math.floor(i / GRID_COLS);

        // Random slight rotation
        const rotation = Math.sin(i * 132.1) * 3; // Deterministic pseudo-random

        return { id: i, src, col, row, rotation };
    });

    // 2. Scene 3: Zoom Logic
    const zoomStart = 105;
    const zoomScale = interpolate(frame, [zoomStart, zoomStart + 30], [1, 1.4], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
        easing: x => x * x // easeIn
    });

    // Scene 3: Blur/Fade non-center cards
    const blurAmount = interpolate(frame, [zoomStart, zoomStart + 20], [0, 8], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
    const fadeOpacity = interpolate(frame, [zoomStart, zoomStart + 20], [1, 0.3], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });


    return (
        <AbsoluteFill>
            <GridBackground />

            <AbsoluteFill style={{
                transform: `scale(${zoomScale})`,
                transformOrigin: 'center center'
            }}>
                {slots.map((item) => {
                    const { id, src, col, row, rotation } = item;

                    // --- Scene 1: Explosion Entry ---
                    // Calculate final position
                    const finalX = GAP + col * (cardWidth + GAP);
                    const finalY = GAP + row * (cardHeight + GAP);

                    // Determine start position based on group
                    // Group 0 (Top): 0-4
                    // Group 1 (Left): 5-9
                    // Group 2 (Right): 10-14
                    // Group 3 (Bottom): 15-19
                    let startX = finalX;
                    let startY = finalY;
                    let delay = 0;

                    if (id < 5) { // Top
                        startY = -300;
                        delay = id * 3;
                    } else if (id < 10) { // Left
                        startX = -400;
                        delay = 5 + (id - 5) * 3;
                    } else if (id < 15) { // Right
                        startX = width + 400;
                        delay = 10 + (id - 10) * 3;
                    } else { // Bottom
                        startY = height + 300;
                        delay = 15 + (id - 15) * 3;
                    }

                    const progress = spring({
                        frame: frame - delay,
                        fps,
                        config: { damping: 15, stiffness: 120 }
                    });

                    const currentX = interpolate(progress, [0, 1], [startX, finalX]);
                    const currentY = interpolate(progress, [0, 1], [startY, finalY]);
                    const currentScale = interpolate(progress, [0, 1], [0.5, 1]);

                    // Scene 3: Focus on center cards (indices 6,7,8, 11,12,13)
                    const isCenter = [6, 7, 8, 11, 12, 13].includes(id);
                    const isFocus = frame > zoomStart && !isCenter;

                    return (
                        <div
                            key={id}
                            style={{
                                position: 'absolute',
                                left: 0,
                                top: 0,
                                transform: `translate(${currentX}px, ${currentY}px) rotate(${rotation}deg) scale(${currentScale})`,
                                opacity: isFocus ? fadeOpacity : 1,
                                filter: isFocus ? `blur(${blurAmount}px)` : 'none',
                                zIndex: isCenter ? 10 : 1,
                            }}
                        >
                            <ProjectCard
                                src={src}
                                width={cardWidth}
                                height={cardHeight}
                            />
                        </div>
                    );
                })}
            </AbsoluteFill>

            {/* Scene 2: Grid Pulse Overlay */}
            <Sequence from={60}>
                <CounterOverlay />
            </Sequence>
        </AbsoluteFill>
    );
};
