import React from 'react';

export const ColorPicker = () => {
    return (
        <div style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            gap: 24
        }}>
            {/* Color Spectrum */}
            <div style={{
                width: '100%',
                height: 300,
                background: 'linear-gradient(to right, #ff0000, #ffff00, #00ff00, #00ffff, #0000ff, #ff00ff, #ff0000)',
                borderRadius: 8,
                border: '1px solid #E5E7EB',
                position: 'relative',
                overflow: 'hidden'
            }}>
                {/* Saturation/Lightness overlay */}
                <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(to bottom, transparent, #000000)',
                    opacity: 0.2
                }} />
                <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(to bottom, #FFFFFF, transparent)',
                    opacity: 0.3
                }} />
            </div>

            {/* Sliders */}
            <div style={{ display: 'flex', gap: 16, flexDirection: 'column' }}>
                <div style={{ height: 8, background: '#E5E7EB', borderRadius: 4, width: '100%' }} />
                <div style={{ height: 8, background: '#E5E7EB', borderRadius: 4, width: '80%' }} />
            </div>

            {/* Hex Input */}
            <div style={{
                border: '1px solid #E5E7EB',
                padding: '12px',
                borderRadius: 6,
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: 24,
                color: '#374151'
            }}>
                #EF4444
            </div>
        </div>
    );
};
