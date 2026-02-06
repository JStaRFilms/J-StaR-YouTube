import React from 'react';

interface TriangleProps {
    size: number;
    color: string;
}

export const Triangle: React.FC<TriangleProps> = ({ size, color }) => {
    return (
        <svg width={size} height={size} viewBox="0 0 100 100">
            <polygon points="50,10 90,90 10,90" fill={color} />
        </svg>
    );
};
