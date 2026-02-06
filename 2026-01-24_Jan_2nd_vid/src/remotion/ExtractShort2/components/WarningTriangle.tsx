import { spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { LucideTriangleAlert } from 'lucide-react';

export const WarningTriangle = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const scale = spring({
        frame,
        fps,
        config: {
            damping: 10,
            stiffness: 200,
            mass: 0.5,
        },
    });

    // Adding a secondary pulse effect
    const pulse = Math.sin(frame / 5) * 0.1 + 1;

    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                transform: `scale(${scale * pulse})`,
            }}
        >
            <LucideTriangleAlert
                size={400}
                color="#FFD700"
                fill="#FFD700"
                fillOpacity={0.2}
                strokeWidth={2}
            />
        </div>
    );
};
