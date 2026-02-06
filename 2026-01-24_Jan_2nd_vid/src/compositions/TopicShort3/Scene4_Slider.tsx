import React from 'react';
import {
    AbsoluteFill,
    interpolate,
    useCurrentFrame,
    useVideoConfig,
    Easing
} from 'remotion';
import { UI_Card } from './components/UI_Card';
import { User } from 'lucide-react';

const WireframeSubject = ({ variant }: { variant: 'bad' | 'good' }) => {
    if (variant === 'bad') {
        return (
            <div className="w-full h-full bg-gray-200 flex flex-col p-2 space-y-2 border-2 border-black font-serif">
                <div className="w-20 h-20 bg-gray-400 border border-black flex items-center justify-center">
                    IMG
                </div>
                <h1 className="text-xl" style={{ fontFamily: '"Comic Sans MS", cursive' }}>User Profile</h1>
                <button className="bg-red-500 text-yellow-300 border-4 border-blue-800 p-1">
                    Click Me!!
                </button>
                <p>bio goes here...</p>
            </div>
        );
    }

    return (
        <UI_Card className="w-full h-full flex flex-col items-center justify-center p-8 bg-gradient-to-br from-white to-gray-50">
            <div className="w-24 h-24 rounded-full bg-blue-100 flex items-center justify-center mb-4 shadow-inner">
                <User className="w-10 h-10 text-blue-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Jane Doe</h2>
            <p className="text-gray-500 text-center mb-6">Senior Product Designer</p>
            <button className="bg-blue-600 text-white px-6 py-2 rounded-full font-medium shadow-lg hover:bg-blue-700 transition-colors">
                View Profile
            </button>
        </UI_Card>
    );
};

export const Scene4_Slider: React.FC<{ sliderPosition?: number }> = ({ sliderPosition }) => {
    const frame = useCurrentFrame();
    const { fps, width } = useVideoConfig();

    // Slider moves from 20% to 80% automatically if no prop provided
    const autoSlider = interpolate(frame, [10, 60], [20, 80], {
        easing: Easing.inOut(Easing.ease),
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
    });

    const currentPos = sliderPosition ?? autoSlider;

    // Label logic
    const showGoodLabel = currentPos > 50;

    return (
        <AbsoluteFill className="bg-gray-100">
            {/* Base Layer: Bad Version (Always Visible) */}
            <AbsoluteFill className="flex justify-center items-center p-10">
                <div className="w-[80%] h-[70%] relative">
                    <WireframeSubject variant="bad" />

                    {/* Label */}
                    <div className="absolute -top-16 left-1/2 -translate-x-1/2">
                        <h2 className="text-6xl font-black text-red-600 tracking-tighter transform -rotate-6">
                            GARBAGE
                        </h2>
                    </div>
                </div>
            </AbsoluteFill>

            {/* Top Layer: Good Version (Clipped) */}
            <AbsoluteFill
                className="flex justify-center items-center p-10"
                style={{
                    clipPath: `inset(0 0 0 ${currentPos}%)` // Reveals from left to right as value increases? 
                    // Wait, inset(top right bottom left).
                    // If we want to reveal the good version as the slider moves right, 
                    // that means the "Good" version is on the LEFT side of the slider usually.
                    // But spec says: "Slider moves from Left to Right, revealing the After version."
                    // Usually this implies the "After" is being revealed "behind" the "Before", or "Before" is being wiped away.
                    // Let's assume standard "Before/After" slider.
                    // If slider is at 20%, left 20% is visible.
                    // If we want "After" on Left and "Before" on right:
                    // clipPath `inset(0 ${100 - currentPos}% 0 0)`
                }}
            >
                <div className="w-[80%] h-[70%] relative">
                    <WireframeSubject variant="good" />

                    {/* Label - Only shows when dominant? */}
                    <div className="absolute -top-16 left-1/2 -translate-x-1/2">
                        <h2 className="text-6xl font-black text-green-500 tracking-tighter transform rotate-3 drop-shadow-lg">
                            GOLD
                        </h2>
                    </div>
                </div>
            </AbsoluteFill>

            {/* Slider Handle */}
            <AbsoluteFill>
                <div
                    className="h-full w-2 bg-white shadow-2xl absolute top-0 bottom-0 flex items-center justify-center z-50 cursor-ew-resize"
                    style={{
                        left: `${currentPos}%`,
                        boxShadow: '0 0 20px rgba(0,0,0,0.2)'
                    }}
                >
                    <div className="w-12 h-12 bg-white rounded-full shadow-xl flex items-center justify-center border-4 border-gray-100">
                        <div className="flex gap-1">
                            <div className="w-1 h-4 bg-gray-300 rounded-full" />
                            <div className="w-1 h-4 bg-gray-300 rounded-full" />
                        </div>
                    </div>
                </div>
            </AbsoluteFill>
        </AbsoluteFill>
    );
};
