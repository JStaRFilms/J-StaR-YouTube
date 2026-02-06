import React from 'react';
import { AbsoluteFill, interpolate, Sequence, useCurrentFrame, useVideoConfig } from 'remotion';
import { HolographicBackground } from './HolographicBackground';
import { FolderNode } from './FolderNode';
import { CodePreview } from './CodePreview';
import { SimplicityReveal } from './SimplicityReveal';
import { FileNode } from './types';

const defaultTree: FileNode = {
    name: '~/.gemini/antigravity/skills/',
    type: 'folder',
    children: [
        {
            name: 'ui-ux-pro-max',
            type: 'folder',
            children: [
                { name: 'SKILL.md', type: 'markdown', highlighted: true },
                {
                    name: 'scripts',
                    type: 'folder',
                    children: [
                        { name: 'generate-palette.ts', type: 'script' },
                    ],
                },
            ],
        },
        {
            name: 'workflows',
            type: 'folder',
            children: [
                { name: 'init_vibecode_design.md', type: 'markdown' },
            ],
        },
    ],
};

export const FolderStructure3D: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps, width, height } = useVideoConfig();

    // Camera Movement (Zoom into SKILL.md)
    // Starts at 4.5s (135 frames)
    const zoomStart = 135;
    const zoomDuration = 45; // 1.5 second for smoother zoom

    const scale = interpolate(frame, [zoomStart, zoomStart + zoomDuration], [1, 3.5], {
        extrapolateRight: 'clamp',
        extrapolateLeft: 'clamp', // CRITICAL: Prevent negative scale before zoom
        easing: (t) => t * t * (3 - 2 * t), // Cubic ease in-out
    });

    const translateX = interpolate(frame, [zoomStart, zoomStart + zoomDuration], [0, -350], {
        extrapolateRight: 'clamp',
        extrapolateLeft: 'clamp',
    });

    const translateY = interpolate(frame, [zoomStart, zoomStart + zoomDuration], [0, -220], {
        extrapolateRight: 'clamp',
        extrapolateLeft: 'clamp',
    });

    const blur = interpolate(frame, [zoomStart, zoomStart + zoomDuration], [0, 10], {
        extrapolateRight: 'clamp',
        extrapolateLeft: 'clamp',
    });

    // Keep tree visible longer during zoom, then fade
    const treeOpacity = interpolate(frame, [zoomStart + 20, zoomStart + 40], [1, 0], {
        extrapolateRight: 'clamp',
        extrapolateLeft: 'clamp',
    });


    return (
        <AbsoluteFill style={{ backgroundColor: '#000' }}>
            <HolographicBackground />

            <Sequence durationInFrames={210}>
                <AbsoluteFill
                    style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        display: 'flex',
                        transform: `scale(${scale}) translate(${translateX}px, ${translateY}px)`,
                        filter: `blur(${blur}px)`,
                        opacity: treeOpacity,
                    }}
                >
                    <div style={{ transform: 'scale(1.2)' }}> {/* Initial slight scale for visibility */}
                        <FolderNode node={defaultTree} depth={0} index={0} />
                    </div>
                </AbsoluteFill>
            </Sequence>

            <Sequence from={145} durationInFrames={75}>
                <CodePreview />
            </Sequence>

            <Sequence from={185}>
                <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <SimplicityReveal />
                </AbsoluteFill>
            </Sequence>
        </AbsoluteFill>
    );
};
