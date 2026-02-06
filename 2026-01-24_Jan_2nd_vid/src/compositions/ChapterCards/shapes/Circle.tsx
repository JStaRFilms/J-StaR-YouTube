import React from 'react';

interface CircleProps {
    size: number;
    color: string;
}

export const Circle: React.FC<CircleProps> = ({ size, color }) => {
    return (
        <svg width={size} height={size} viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="45" fill={color} />
        </svg>
    );
};
