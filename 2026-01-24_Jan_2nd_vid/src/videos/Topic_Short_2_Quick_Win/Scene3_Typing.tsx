import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate } from 'remotion';

// Keywords to highlight in neon green
const KEYWORDS = ['Tailwind UI', 'spacing', 'typography', 'color conventions'];

// Dark background color to match main composition
const DARK_BG_COLOR = '#0A0A0F';

export const Scene3_Typing: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    // Full text to type
    const fullText = "Reference the Tailwind UI design patterns. Use their spacing, their typography scale, their color conventions.";

    // Hacker speed typing - complete in about 3 seconds (90 frames)
    const typingDuration = 3 * fps;
    const charsToShow = Math.floor(interpolate(
        frame,
        [0, typingDuration],
        [0, fullText.length],
        { extrapolateRight: 'clamp' }
    ));

    const currentText = fullText.slice(0, charsToShow);

    // Render text with keyword highlighting
    const renderHighlightedText = (text: string) => {
        // Build a regex that matches any of the keywords
        const keywordRegex = new RegExp(`(${KEYWORDS.join('|')})`, 'g');
        const parts = text.split(keywordRegex);

        return parts.map((part, index) => {
            const isKeyword = KEYWORDS.includes(part);

            if (isKeyword) {
                // Calculate highlight animation for this keyword
                // Find where this keyword starts in the text
                const keywordStartIndex = text.indexOf(part);
                const keywordAppearsAt = interpolate(keywordStartIndex, [0, fullText.length], [0, typingDuration]);

                const highlightProgress = interpolate(
                    frame,
                    [keywordAppearsAt, keywordAppearsAt + 10],
                    [0, 1],
                    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
                );

                return (
                    <span
                        key={index}
                        style={{
                            color: '#22C55E', // Brighter green for dark bg
                            backgroundColor: `rgba(34, 197, 94, ${highlightProgress * 0.2})`,
                            textShadow: `0 0 ${highlightProgress * 20}px rgba(34, 197, 94, ${highlightProgress * 0.8})`,
                            fontWeight: 700,
                            padding: '2px 6px',
                            borderRadius: '4px',
                            transition: 'none'
                        }}
                    >
                        {part}
                    </span>
                );
            }

            return <span key={index}>{part}</span>;
        });
    };

    // Cursor blink
    const cursorOpacity = Math.sin((frame / 3)) > 0 ? 1 : 0;

    return (
        <AbsoluteFill style={{
            backgroundColor: DARK_BG_COLOR,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '60px',
            paddingBottom: '120px' // Extra padding to stay clear of safe zone
        }}>
            {/* Terminal/Code Editor Window */}
            <div style={{
                width: '100%',
                maxWidth: '950px',
                backgroundColor: '#F8FAFC',
                borderRadius: '20px',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(0,0,0,0.05)',
                overflow: 'hidden',
                border: '1px solid #E2E8F0'
            }}>
                {/* Window Header */}
                <div style={{
                    backgroundColor: '#F1F5F9',
                    padding: '16px 24px',
                    borderBottom: '1px solid #E2E8F0',
                    display: 'flex',
                    gap: '8px',
                    alignItems: 'center'
                }}>
                    <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#EF4444' }} />
                    <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#F59E0B' }} />
                    <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#22C55E' }} />
                    <span style={{ marginLeft: '16px', fontSize: '14px', color: '#64748B', fontFamily: 'Inter, sans-serif' }}>
                        design_system_prompt.md
                    </span>
                </div>

                {/* Content Area */}
                <div style={{
                    padding: '48px',
                    fontFamily: '"JetBrains Mono", "Fira Code", monospace',
                    fontSize: '36px',
                    lineHeight: '1.6',
                    color: '#1E293B',
                    minHeight: '280px',
                    display: 'flex',
                    alignItems: 'center'
                }}>
                    <div>
                        {/* Prompt label */}
                        <div style={{
                            fontSize: '14px',
                            color: '#64748B',
                            marginBottom: '16px',
                            textTransform: 'uppercase',
                            letterSpacing: '2px',
                            fontWeight: 600
                        }}>
                            Your New Prompt
                        </div>

                        {/* Typing text */}
                        <div style={{ fontWeight: 500 }}>
                            {renderHighlightedText(currentText)}
                            <span style={{
                                display: 'inline-block',
                                width: '4px',
                                height: '36px',
                                backgroundColor: '#3B82F6',
                                marginLeft: '8px',
                                verticalAlign: 'middle',
                                opacity: cursorOpacity
                            }} />
                        </div>
                    </div>
                </div>

                {/* Bottom hint */}
                <div style={{
                    padding: '16px 24px',
                    backgroundColor: '#F1F5F9',
                    borderTop: '1px solid #E2E8F0',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                }}>
                    <div style={{
                        width: '8px',
                        height: '8px',
                        borderRadius: '50%',
                        backgroundColor: '#22C55E',
                        boxShadow: '0 0 10px #22C55E'
                    }} />
                    <span style={{ fontSize: '14px', color: '#64748B', fontFamily: 'Inter, sans-serif' }}>
                        Keywords detected: Tailwind UI, spacing, typography, color conventions
                    </span>
                </div>
            </div>

            {/* Side labels for keywords */}
            <div style={{
                position: 'absolute',
                right: '40px',
                top: '50%',
                transform: 'translateY(-50%)',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px'
            }}>
                {KEYWORDS.map((keyword, index) => {
                    const keywordIndex = fullText.indexOf(keyword);
                    const appearsAt = interpolate(keywordIndex, [0, fullText.length], [0, typingDuration]);
                    const isVisible = frame >= appearsAt;

                    const labelOpacity = interpolate(
                        frame,
                        [appearsAt, appearsAt + 5],
                        [0, 1],
                        { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
                    );

                    return (
                        <div
                            key={keyword}
                            style={{
                                backgroundColor: '#22C55E',
                                color: 'white',
                                padding: '8px 16px',
                                borderRadius: '8px',
                                fontSize: '14px',
                                fontWeight: 600,
                                fontFamily: 'Inter, sans-serif',
                                opacity: isVisible ? labelOpacity : 0,
                                transform: `translateX(${isVisible ? 0 : 20}px)`,
                                transition: 'none',
                                boxShadow: '0 4px 12px rgba(34, 197, 94, 0.3)'
                            }}
                        >
                            ✓ {keyword}
                        </div>
                    );
                })}
            </div>
        </AbsoluteFill>
    );
};
