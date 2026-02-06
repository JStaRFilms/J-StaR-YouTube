import React from 'react';
import { AbsoluteFill, useVideoConfig, useCurrentFrame, interpolate } from 'remotion';

interface CodeEditorProps {
    typingProgress: number; // 0 to 1
    showStamp?: boolean;
}

export const CodeEditor: React.FC<CodeEditorProps> = ({ typingProgress, showStamp }) => {
    const { fps } = useVideoConfig();
    const frame = useCurrentFrame();

    const codeContent = `
// The prompt you usually write:
"Make it look good" ❌

// The prompt you SHOULD write:
"Reference the Tailwind UI design patterns.
Use their spacing, their typography scale,
and their color conventions." ✅
`;

    const lines = codeContent.trim().split('\n');

    // Calculate how many characters to show based on progress
    const totalChars = codeContent.length;
    const charsToShow = Math.floor(interpolate(typingProgress, [0, 1], [0, totalChars]));
    const currentText = codeContent.slice(0, charsToShow);

    // Syntax highlighting with specific keyword focusing
    const renderHighlightedText = (text: string) => {
        // Split by quotes first to identify strings
        const parts = text.split(/(".+?")/g);
        return parts.map((part, i) => {
            if (part.startsWith('"')) {
                // Inside string: Check for specific keywords to highlight
                // Strip quotes for processing, then add back
                const content = part.slice(1, -1);

                // Regex to split by keywords but keep delimiters
                // Keywords: Tailwind UI, spacing, typography scale, color conventions
                const keywordRegex = /(Tailwind UI|spacing|typography scale|color conventions)/g;
                const subParts = content.split(keywordRegex);

                return (
                    <span key={i} style={{ color: '#10B981' }}> {/* Base String Color (Green) */}
                        "
                        {subParts.map((sub, j) => {
                            if (sub.match(keywordRegex)) {
                                return (
                                    <span key={j} style={{
                                        color: '#4ADE80', // Brighter Neon Green
                                        textShadow: '0 0 10px rgba(74, 222, 128, 0.5)',
                                        fontWeight: 'bold'
                                    }}>
                                        {sub}
                                    </span>
                                );
                            }
                            return <span key={j}>{sub}</span>;
                        })}
                        "
                    </span>
                );
            }
            if (part.includes('//')) {
                return <span key={i} style={{ color: '#6B7280', fontStyle: 'italic' }}>{part}</span>; // Comment
            }
            return <span key={i} style={{ color: '#E5E7EB' }}>{part}</span>; // Default Text (Light Gray for Dark Mode context)
        });
    };

    // Stamp Animation
    const stampScale = interpolate(frame, [0, 10], [2, 1], { extrapolateRight: 'clamp' });
    const stampOpacity = interpolate(frame, [0, 5], [0, 1], { extrapolateRight: 'clamp' });

    return (
        <AbsoluteFill style={{ backgroundColor: '#F9FAFB', padding: '60px', fontFamily: '"JetBrains Mono", monospace' }}>
            <div style={{
                backgroundColor: 'white',
                borderRadius: '16px',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.1)',
                overflow: 'hidden',
                border: '1px solid #E5E7EB',
                height: '100%',
                display: 'flex',
                flexDirection: 'column'
            }}>
                {/* Window Header */}
                <div style={{
                    backgroundColor: '#F3F4F6',
                    padding: '16px 24px',
                    borderBottom: '1px solid #E5E7EB',
                    display: 'flex',
                    gap: '8px',
                    alignItems: 'center'
                }}>
                    <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#EF4444' }} />
                    <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#F59E0B' }} />
                    <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#10B981' }} />
                    <span style={{ marginLeft: '16px', fontSize: '14px', color: '#6B7280' }}>prompt_engineer_pro.txt</span>
                </div>

                {/* Editor Area */}
                <div style={{ padding: '40px', fontSize: '28px', lineHeight: '1.6', flex: 1, whiteSpace: 'pre-wrap' }}>
                    {renderHighlightedText(currentText)}
                    <span style={{
                        display: 'inline-block',
                        width: '12px',
                        height: '24px',
                        backgroundColor: '#3B82F6',
                        marginLeft: '4px',
                        opacity: Math.sin(frame / 5) > 0 ? 1 : 0 // Blinking cursor
                    }} />
                </div>
            </div>

            {/* Stamp */}
            {showStamp && (
                <div style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: `translate(-50%, -50%) scale(${stampScale}) rotate(-10deg)`,
                    opacity: stampOpacity,
                    border: '8px solid #EF4444',
                    borderRadius: '16px',
                    padding: '20px 60px',
                    color: '#EF4444',
                    fontSize: '80px',
                    fontWeight: '900',
                    textTransform: 'uppercase',
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    boxShadow: '0 20px 25px -5px rgba(239, 68, 68, 0.3)',
                    backdropFilter: 'blur(4px)',
                    zIndex: 10
                }}>
                    Quick Fix
                </div>
            )}
        </AbsoluteFill>
    );
};
