import React from 'react';

interface BlobProps {
    size: number;
    color: string;
}

export const Blob: React.FC<BlobProps> = ({ size, color }) => {
    return (
        <svg width={size} height={size} viewBox="0 0 100 100">
            <path
                d="M50,10 C70,10 90,30 90,50 C90,75 70,90 50,90 C25,90 10,70 10,50 C10,25 30,10 50,10 Z"
                fill={color}
            />
        </svg>
    );
};
