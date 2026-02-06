import React from 'react';

interface RobotHeadProps {
    scale?: number;
    expression?: 'neutral' | 'confused' | 'happy' | 'glowing' | 'happy-sigh';
}

export const RobotHead: React.FC<RobotHeadProps> = ({ scale = 1, expression = 'neutral' }) => {
    return (
        <svg width={200 * scale} height={200 * scale} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="2" y="3" width="20" height="18" rx="4" fill="#F3F4F6" stroke="#111827" strokeWidth="2" />

            {/* Eyes */}
            {expression === 'confused' ? (
                <>
                    <circle cx="7" cy="7" r="1.5" fill="#111827" />
                    <circle cx="17" cy="6" r="2" fill="#111827" /> {/* One eye bigger/higher */}
                    <path d="M5 4L9 5" stroke="#111827" strokeWidth="1" /> {/* eyebrow skewed */}
                    <path d="M15 4L19 3" stroke="#111827" strokeWidth="1" />
                </>
            ) : expression === 'glowing' ? (
                <>
                    <circle cx="7" cy="7" r="1.5" fill="#3B82F6" />
                    <circle cx="17" cy="7" r="1.5" fill="#3B82F6" />
                    {/* Glow effect handled by parent usually, but we can add stroke */}
                </>
            ) : (
                <>
                    <circle cx="7" cy="7" r="1.5" fill="#111827" />
                    <circle cx="17" cy="7" r="1.5" fill="#111827" />
                </>
            )}

            {/* Mouth */}
            {expression === 'confused' ? (
                <path d="M6 16C8 15 16 15 18 16" stroke="#111827" strokeWidth="2" strokeLinecap="round" /> // Wavy mouth
            ) : (
                <rect x="6" y="15" width="12" height="3" rx="1.5" fill="#111827" /> // Neutral/Happy mouth
            )}

            {/* Antenna */}
            <path d="M12 3V1" stroke="#111827" strokeWidth="2" />
            <circle cx="12" cy="1" r="1" fill={expression === 'glowing' ? '#3B82F6' : '#111827'} />
        </svg>
    );
};
