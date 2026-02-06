import React from 'react';

export const UglyWebsite: React.FC = () => {
    return (
        <div style={{
            width: '800px', // Fixed width to ensure scaling works predictably
            height: '600px',
            backgroundColor: 'white',
            fontFamily: '"Times New Roman", Times, serif',
            color: 'black',
            border: '1px solid #ccc',
            boxShadow: '5px 5px 0px rgba(0,0,0,0.1)',
            display: 'flex',
            flexDirection: 'column'
        }}>
            {/* Old School Browser Bar */}
            <div style={{
                backgroundColor: '#e0e0e0',
                borderBottom: '1px solid #999',
                padding: '10px 15px',
                display: 'flex',
                gap: '10px',
                alignItems: 'center'
            }}>
                <div style={{ display: 'flex', gap: '5px' }}>
                    <div style={{ width: '12px', height: '12px', border: '1px solid #999', borderRadius: '2px', backgroundColor: '#fff' }}></div>
                    <div style={{ width: '12px', height: '12px', border: '1px solid #999', borderRadius: '2px', backgroundColor: '#fff' }}></div>
                    <div style={{ width: '12px', height: '12px', border: '1px solid #999', borderRadius: '2px', backgroundColor: '#fff' }}></div>
                </div>
                <div style={{
                    flex: 1, backgroundColor: 'white', border: '1px solid #999', padding: '2px 8px', fontSize: '12px', fontFamily: 'Arial'
                }}>
                    http://www.my-awesome-site.com/index.html
                </div>
            </div>

            {/* Content */}
            <div style={{ padding: '40px' }}>
                <h1 style={{ fontSize: '48px', marginBottom: '20px', borderBottom: '2px solid black' }}>Welcome to My App</h1>
                <p style={{ fontSize: '24px', lineHeight: '1.5' }}>This website was made in 1999.</p>
                <p style={{ fontSize: '24px', lineHeight: '1.5', marginBottom: '40px' }}>It has zero styling and no design system.</p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', alignItems: 'flex-start' }}>
                    <a href="#" style={{ color: '#0000EE', textDecoration: 'underline', fontSize: '28px' }}>
                        Click Here For Fun
                    </a>
                    <a href="#" style={{ color: '#0000EE', textDecoration: 'underline', fontSize: '28px' }}>
                        About Us
                    </a>
                    <br />
                    <button style={{
                        backgroundColor: '#E0E0E0',
                        border: '2px outset buttonface',
                        padding: '10px 20px',
                        fontSize: '24px',
                        cursor: 'pointer',
                        color: 'black',
                        fontFamily: 'sans-serif'
                    }}>
                        Submit Form
                    </button>
                </div>
            </div>
        </div>
    );
};
