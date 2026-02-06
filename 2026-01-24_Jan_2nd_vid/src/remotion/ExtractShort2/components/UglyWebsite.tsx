import React from 'react';
import { AbsoluteFill } from 'remotion';

export const UglyWebsite = () => {
    return (
        <AbsoluteFill
            style={{
                backgroundColor: '#FFFFFF',
                fontFamily: '"Times New Roman", Times, serif',
                color: '#000000',
                padding: 20,
                overflow: 'hidden',
            }}
        >
            {/* Terrible Header */}
            <div style={{ borderBottom: '1px solid blue', paddingBottom: 10, marginBottom: 20 }}>
                <h1 style={{ margin: 0, fontSize: 40, color: 'blue' }}>Welcome to My Website</h1>
                <p style={{ margin: 0, fontSize: 16 }}>The best place for stuff.</p>
            </div>

            {/* Terrible Navigation */}
            <div style={{ marginBottom: 20 }}>
                <span style={{ color: 'blue', textDecoration: 'underline', marginRight: 10 }}>Home</span>
                <span style={{ color: 'blue', textDecoration: 'underline', marginRight: 10 }}>About</span>
                <span style={{ color: 'blue', textDecoration: 'underline', marginRight: 10 }}>Contact</span>
                <span style={{ color: 'blue', textDecoration: 'underline' }}>Login</span>
            </div>

            {/* Terrible Layout: Table */}
            <table style={{ width: '100%', border: '1px solid black' }}>
                <tbody>
                    <tr>
                        <td style={{ border: '1px solid black', padding: 5, verticalAlign: 'top', width: '20%' }}>
                            <h3>Sidebar</h3>
                            <ul>
                                <li>Link 1</li>
                                <li>Link 2</li>
                                <li>Link 3</li>
                            </ul>
                        </td>
                        <td style={{ border: '1px solid black', padding: 5, verticalAlign: 'top' }}>
                            <h2>Main Content</h2>
                            <p>
                                This is the main content area. Ideally, there would be padding here, but this is an ugly
                                website so everything is cramped.
                            </p>
                            <p>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut
                                labore et dolore magna aliqua.
                            </p>
                            <div style={{ backgroundColor: 'yellow', padding: 0 }}>
                                Important Alert: No Padding!
                            </div>
                            <br />
                            <button style={{ backgroundColor: '#CCCCCC', border: '2px outset #ZZZZZZ' }}>
                                Click Me
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>

            {/* Terrible Footer */}
            <div style={{ marginTop: 50, textAlign: 'center', borderTop: '1px dashed black' }}>
                <p>Copyright 2004</p>
            </div>
        </AbsoluteFill>
    );
};
