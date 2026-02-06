import React from 'react';
import { AbsoluteFill } from 'remotion';

export const BrowserWindow: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <AbsoluteFill className="p-10 flex items-center justify-center">
            <div className="w-full h-full bg-white rounded-lg shadow-2xl overflow-hidden flex flex-col border border-gray-200">
                {/* Browser Toolbar */}
                <div className="h-10 bg-gray-100 border-b border-gray-200 flex items-center px-4 space-x-2">
                    <div className="flex space-x-1.5 accent-slate-500">
                        <div className="w-3 h-3 rounded-full bg-red-400" />
                        <div className="w-3 h-3 rounded-full bg-yellow-400" />
                        <div className="w-3 h-3 rounded-full bg-green-400" />
                    </div>
                    <div className="flex-1 ml-4 bg-white h-6 rounded border border-gray-200 flex items-center px-4 text-xs text-gray-500 font-mono">
                        localhost:3000
                    </div>
                </div>

                {/* Content */}
                <div className="flex-1 relative overflow-hidden bg-white">
                    {children}
                </div>
            </div>
        </AbsoluteFill>
    );
};
