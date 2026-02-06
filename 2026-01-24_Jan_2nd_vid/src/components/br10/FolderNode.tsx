import React from 'react';
import { interpolate, useCurrentFrame, useVideoConfig } from 'remotion';
import { FileNode } from './types';
import { FileIcon } from './FileIcon';

interface FolderNodeProps {
    node: FileNode;
    depth: number;
    index: number;
    expanded?: boolean;
}

export const FolderNode: React.FC<FolderNodeProps> = ({ node, depth, index, expanded = true }) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    // 3D Depth Simulation
    const scale = 1 - depth * 0.05;
    const blur = depth * 0.5;
    const zIndex = 10 - depth;
    const xOffset = depth * 40; // Indentation

    // Entrance Animation based on depth and index (staggered)
    // Each item appears slightly after the previous one, but much faster now
    const delay = (depth * 3) + (index * 2); // Very snappy
    const opacity = interpolate(frame - delay, [0, 10], [0, 1], {
        extrapolateRight: 'clamp',
        extrapolateLeft: 'clamp' // Ensure it's 0 before start
    });
    const translateY = interpolate(frame - delay, [0, 20], [20, 0], {
        extrapolateRight: 'clamp',
        extrapolateLeft: 'clamp', // Ensure it sits at 20 before start
        easing: (t) => t * (2 - t) // Ease out quad
    });

    return (
        <div
            style={{
                marginLeft: depth === 0 ? 0 : 40, // Base indentation for children
                opacity,
                transform: `translateY(${translateY}px) scale(${scale})`,
                transformOrigin: 'left center',
                filter: `blur(${blur}px)`,
                zIndex,
                marginBottom: 12,
                position: 'relative',
            }}
        >
            {/* Connector Line (Horizontal) */}
            {depth > 0 && (
                <div
                    style={{
                        position: 'absolute',
                        left: -24,
                        top: 24,
                        width: 20,
                        height: 2,
                        backgroundColor: '#4b5563',
                        opacity: 0.5,
                    }}
                />
            )}

            {/* Connector Line (Vertical - from parent) - simplified approach */}
            {/* We normally would draw a long line from parent, but for now let's stick to simple individual connectors */}

            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 12,
                    padding: '8px 16px',
                    background: node.highlighted
                        ? 'linear-gradient(90deg, rgba(168, 85, 247, 0.2) 0%, transparent 100%)'
                        : 'rgba(255, 255, 255, 0.03)',
                    border: '1px solid',
                    borderColor: node.highlighted ? '#a855f7' : 'rgba(255, 255, 255, 0.1)',
                    borderRadius: 8,
                    width: 'fit-content',
                }}
            >
                <FileIcon type={node.type} highlighted={node.highlighted} />
                <span
                    style={{
                        fontFamily: 'Inter, sans-serif',
                        fontSize: 24,
                        color: '#f8fafc',
                        fontWeight: node.highlighted ? 600 : 400,
                        textShadow: node.highlighted ? '0 0 10px rgba(168, 85, 247, 0.5)' : 'none',
                    }}
                >
                    {node.name}
                </span>
            </div>

            {expanded && node.children && (
                <div style={{ marginTop: 12, position: 'relative' }}>
                    {/* Vertical Line for Children */}
                    <div
                        style={{
                            position: 'absolute',
                            left: 16,
                            top: 0,
                            bottom: 24, // Don't go all the way down
                            width: 2,
                            backgroundColor: '#4b5563',
                            opacity: 0.3
                        }}
                    />
                    {node.children.map((child: FileNode, i: number) => (
                        <FolderNode
                            key={child.name}
                            node={child}
                            depth={depth + 1}
                            index={i}
                            expanded={expanded}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};
