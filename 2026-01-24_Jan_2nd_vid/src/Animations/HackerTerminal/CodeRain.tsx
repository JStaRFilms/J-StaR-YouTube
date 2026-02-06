import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, random } from 'remotion';
import { loadFont } from "@remotion/google-fonts/JetBrainsMono";

const { fontFamily } = loadFont();

const CHARS = ['{', '}', '[', ']', '(', ')', '=>', 'const', 'async', 'await', 'function', 'void', 'return', '<', '>', '/', '*'];
const COLUMNS = 20;

export const CodeRain: React.FC = () => {
    const frame = useCurrentFrame();
    const { width, height } = useVideoConfig();

    return (
        <AbsoluteFill style={{ overflow: 'hidden', fontFamily, backgroundColor: '#0a0a0f' }}>
            {new Array(COLUMNS).fill(0).map((_, i) => {
                const speed = interpolate(random(i), [0, 1], [15, 35]);
                const x = interpolate(random(i + 100), [0, 1], [0, width]);
                const delay = interpolate(random(i + 200), [0, 1], [0, 30]);
                const fontSize = interpolate(random(i + 300), [0, 1], [14, 24]);
                const opacity = interpolate(random(i + 400), [0, 1], [0.3, 0.8]);

                // Falling animation
                const y = interpolate(frame - delay, [0, 100], [-100, height + 100]);

                // Infinite scroll effect
                const moduloY = (y + 100) % (height + 200) - 100;

                const charIndex = Math.floor((frame / 5) + i) % CHARS.length;
                const char = CHARS[charIndex];

                const isHighlighted = random(frame + i) > 0.9;

                return (
                    <div
                        key={i}
                        style={{
                            position: 'absolute',
                            left: x,
                            top: moduloY,
                            fontSize,
                            color: isHighlighted ? '#ec4899' : '#06b6d4',
                            opacity,
                            textShadow: isHighlighted ? '0 0 10px #ec4899' : 'none',
                            fontWeight: isHighlighted ? 700 : 400
                        }}
                    >
                        {char}
                    </div>
                );
            })}
        </AbsoluteFill>
    );
};
