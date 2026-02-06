import React from 'react';

interface SquareProps {
    size: number;
    color: string;
}

export const Square: React.FC<SquareProps> = ({ size, color }) => {
    return (
        <svg width={size} height={size} viewBox="0 0 100 100">
            <rect x="10" y="10" width="80" height="80" rx="8" fill={color} />
        </svg>
    );
};
