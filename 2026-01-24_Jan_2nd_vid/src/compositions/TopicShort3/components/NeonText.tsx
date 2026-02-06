import React from 'react';

export const NeonText: React.FC<{
    text: string;
    color?: string;
    glowColor?: string;
    className?: string;
}> = ({ text, color = '#3B82F6', glowColor, className = '' }) => {
    const shadowColor = glowColor || color;
    return (
        <span
            className={`font-bold ${className}`}
            style={{
                color: color,
                // Simple neon glow effect using text-shadow
                textShadow: `0 0 15px ${shadowColor}, 0 0 30px ${shadowColor}`,
            }}
        >
            {text}
        </span>
    );
};

