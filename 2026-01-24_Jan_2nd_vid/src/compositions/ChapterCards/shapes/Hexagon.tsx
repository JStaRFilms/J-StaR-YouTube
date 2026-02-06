import React from 'react';

interface HexagonProps {
    size: number;
    color: string;
}

export const Hexagon: React.FC<HexagonProps> = ({ size, color }) => {
    return (
        <svg width={size} height={size} viewBox="0 0 100 100">
            <polygon points="50,5 93,25 93,75 50,95 7,75 7,25" fill={color} />
        </svg>
    );
};
