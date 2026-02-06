import React from 'react';

export const UI_Card: React.FC<{
    children: React.ReactNode;
    className?: string;
    style?: React.CSSProperties;
}> = ({ children, className = '', style = {} }) => {
    return (
        <div
            className={`bg-white/90 backdrop-blur-md border border-gray-100 shadow-xl rounded-xl ${className}`}
            style={{
                // Fallback shadow if Tailwind isn't fully picking up shadow-xl or for extra depth
                boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
                ...style
            }}
        >
            {children}
        </div>
    );
};
