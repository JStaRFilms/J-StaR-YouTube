import React from 'react';
import { interpolate, useCurrentFrame, useVideoConfig } from 'remotion';

interface TypewriterTextProps {
    text: string;
    startFrame: number;
    framesPerChar?: number;
    color?: string;
    showCursor?: boolean;
}

export const TypewriterText: React.FC<TypewriterTextProps> = ({
    text,
    startFrame,
    framesPerChar = 2,
    color = '#e5e7eb',
    showCursor = true,
}) => {
    const frame = useCurrentFrame();

    const totalTypeFrames = text.length * framesPerChar;
    const localFrame = frame - startFrame;

    const charsTyped = Math.floor(
        interpolate(localFrame, [0, totalTypeFrames], [0, text.length], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
        })
    );

    const typedText = text.slice(0, charsTyped);
    const isTyping = localFrame >= 0 && localFrame < totalTypeFrames;
    const isDone = localFrame >= totalTypeFrames;

    // Cursor blink (16 frame cycle)
    const cursorOpacity = interpolate(
        frame % 16,
        [0, 8, 16],
        [1, 0, 1],
        { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
    );

    if (localFrame < 0) {
        return null;
    }

    return (
        <span style={{ color }}>
            {typedText}
            {showCursor && (isTyping || isDone) && (
                <span style={{ opacity: cursorOpacity, color: '#f8fafc' }}>▌</span>
            )}
        </span>
    );
};
