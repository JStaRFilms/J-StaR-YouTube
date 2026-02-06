import React from 'react';

interface CursorProps {
    x?: number;
    y?: number;
    scale?: number;
    color?: string;
    opacity?: number;
}

export const Cursor: React.FC<CursorProps> = ({
    x = 0,
    y = 0,
    scale = 1,
    color = '#000000',
    opacity = 1,
}) => {
    return (
        <div
            style={{
                position: 'absolute',
                left: x,
                top: y,
                transform: `scale(${scale})`,
                pointerEvents: 'none',
                zIndex: 9999,
                opacity,
            }}
        >
            <svg
                width="24"
                height="32"
                viewBox="0 0 24 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{
                    filter: 'drop-shadow(0px 2px 4px rgba(0,0,0,0.15))',
                }}
            >
                <path
                    d="M5.65376 12.3673H5.46026L5.31717 12.4976L0.500002 16.8829L0.500002 1.19841L11.7841 12.3673H5.65376Z"
                    fill={color}
                    transform="translate(8, 8)"
                />
                {/* Standard Mac Arrow Cursor Path */}
                <path
                    d="M1 1L1 21L6.75 16.5H14.5L21 28L25 25.5L18.5 14L25 14L1 1Z"
                    fill={color}
                    stroke="white"
                    strokeWidth="2"
                    transform="scale(0.8)"
                />
            </svg>
        </div>
    );
};
