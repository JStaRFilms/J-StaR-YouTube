import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';
import { z } from 'zod';

export const ChatInterfaceSchema = z.object({
    opacity: z.number(),
});

export const ChatInterface: React.FC<z.infer<typeof ChatInterfaceSchema>> = ({ opacity }) => {
    const frame = useCurrentFrame();

    // Thinking dots animation
    const dot1Y = interpolate(frame % 30, [0, 15, 30], [0, -5, 0], { extrapolateRight: 'clamp' });
    const dot2Y = interpolate((frame + 5) % 30, [0, 15, 30], [0, -5, 0], { extrapolateRight: 'clamp' });
    const dot3Y = interpolate((frame + 10) % 30, [0, 15, 30], [0, -5, 0], { extrapolateRight: 'clamp' });

    return (
        <AbsoluteFill style={{ backgroundColor: '#ffffff', opacity }}>
            <div className="flex flex-col items-center justify-center w-full h-full p-20 font-sans">
                <div className="w-full max-w-2xl space-y-4">
                    {/* User Message */}
                    <div className="flex justify-end">
                        <div className="bg-blue-500 text-white px-6 py-3 rounded-2xl rounded-tr-sm text-xl font-medium shadow-sm">
                            Build me a landing page
                        </div>
                    </div>

                    {/* AI Response (Thinking) */}
                    <div className="flex justify-start">
                        <div className="bg-gray-100 px-6 py-4 rounded-2xl rounded-tl-sm shadow-sm flex items-center space-x-2">
                            <div className="w-3 h-3 bg-gray-400 rounded-full" style={{ transform: `translateY(${dot1Y}px)` }} />
                            <div className="w-3 h-3 bg-gray-400 rounded-full" style={{ transform: `translateY(${dot2Y}px)` }} />
                            <div className="w-3 h-3 bg-gray-400 rounded-full" style={{ transform: `translateY(${dot3Y}px)` }} />
                        </div>
                    </div>
                </div>
            </div>
        </AbsoluteFill>
    );
};
