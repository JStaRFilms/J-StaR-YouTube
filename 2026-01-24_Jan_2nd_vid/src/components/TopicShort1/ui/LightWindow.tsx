import React from 'react';
import { AbsoluteFill } from 'remotion';

interface LightWindowProps {
    children: React.ReactNode;
    title?: string;
    width?: number | string;
    height?: number | string;
    className?: string;
}

export const LightWindow: React.FC<LightWindowProps> = ({
    children,
    title = 'Utlity',
    width = '100%',
    height = '100%',
    className = '',
}) => {
    return (
        <div
            style={{
                width: width,
                height: height,
                backgroundColor: '#FFFFFF',
                borderRadius: '12px',
                overflow: 'hidden',
                boxShadow: '0 20px 50px -12px rgba(0, 0, 0, 0.1)',
                border: '1px solid #E5E7EB', // Gray-200
                display: 'flex',
                flexDirection: 'column',
            }}
            className={className}
        >
            {/* Title Bar */}
            <div
                style={{
                    height: '40px',
                    width: '100%',
                    borderBottom: '1px solid #F3F4F6', // Gray-100
                    display: 'flex',
                    alignItems: 'center',
                    padding: '0 16px',
                    gap: '8px',
                    backgroundColor: '#FFFFFF',
                }}
            >
                {/* Window Controls */}
                <div style={{ display: 'flex', gap: '6px' }}>
                    <div
                        style={{
                            width: '10px',
                            height: '10px',
                            borderRadius: '50%',
                            backgroundColor: '#EF4444', // Red
                        }}
                    />
                    <div
                        style={{
                            width: '10px',
                            height: '10px',
                            borderRadius: '50%',
                            backgroundColor: '#F59E0B', // Yellow
                        }}
                    />
                    <div
                        style={{
                            width: '10px',
                            height: '10px',
                            borderRadius: '50%',
                            backgroundColor: '#10B981', // Green
                        }}
                    />
                </div>

                {/* Title */}
                {title && (
                    <div
                        style={{
                            flex: 1,
                            textAlign: 'center',
                            fontFamily: 'Inter, sans-serif',
                            fontSize: '12px',
                            fontWeight: 500,
                            color: '#9CA3AF', // Gray-400
                        }}
                    >
                        {title}
                    </div>
                )}

                {/* Spacer for balance */}
                <div style={{ width: '40px' }} />
            </div>

            {/* Content */}
            <div style={{ flex: 1, position: 'relative' }}>{children}</div>
        </div>
    );
};
