import { useCurrentFrame, useVideoConfig, interpolate, Easing } from 'remotion';

interface TreeItem {
    name: string;
    type: 'folder' | 'file';
    indent: number;
}

const defaultTreeItems: TreeItem[] = [
    { name: 'design-system', type: 'folder', indent: 0 },
    { name: '├── src', type: 'folder', indent: 1 },
    { name: '│   ├── components', type: 'folder', indent: 2 },
    { name: '│   │   ├── Button.tsx', type: 'file', indent: 3 },
    { name: '│   │   ├── Input.tsx', type: 'file', indent: 3 },
    { name: '│   │   └── Card.tsx', type: 'file', indent: 3 },
    { name: '│   ├── tokens', type: 'folder', indent: 2 },
    { name: '│   │   ├── colors.json', type: 'file', indent: 3 },
    { name: '│   │   └── typography.json', type: 'file', indent: 3 },
    { name: '│   └── index.ts', type: 'file', indent: 2 },
    { name: '├── package.json', type: 'file', indent: 1 },
    { name: '└── README.md', type: 'file', indent: 1 }
];

export const FileTreeVisualizer: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    // Tree line drawing animation over frames 180-480
    const treeProgress = interpolate(frame, [180, 480], [0, 1], {
        extrapolateRight: 'clamp',
        easing: Easing.inOut(Easing.quad)
    });

    return (
        <div
            style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                backgroundColor: '#0D1117',
                padding: '24px',
                borderRadius: '8px',
                border: '1px solid #1F2937',
                fontFamily: 'Roboto Mono, monospace',
                fontSize: '14px',
                lineHeight: '1.8',
                minWidth: '400px'
            }}
        >
            {defaultTreeItems.map((item, index) => {
                // Staggered fade in for each line
                const itemProgress = interpolate(treeProgress, [index / defaultTreeItems.length, 1], [0, 1], {
                    extrapolateRight: 'clamp'
                });

                const opacity = itemProgress;
                const color = item.type === 'folder' ? '#3B82F6' : '#22C55E';

                return (
                    <div
                        key={index}
                        style={{
                            opacity: opacity,
                            paddingLeft: `${item.indent * 20}px`,
                            color: color,
                            whiteSpace: 'nowrap'
                        }}
                    >
                        {item.name}
                    </div>
                );
            })}
        </div>
    );
};
