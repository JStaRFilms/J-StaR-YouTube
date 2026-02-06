import React from 'react';

export const GarbageWireframe: React.FC = () => {
    return (
        <div
            style={{
                width: '500px',
                height: '400px',
                backgroundColor: '#F1F5F9',
                borderRadius: '12px',
                padding: '24px',
                border: '2px dashed #CBD5E1',
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
            }}
        >
            {/* Misaligned header */}
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                }}
            >
                <div
                    style={{
                        width: '120px',
                        height: '24px',
                        backgroundColor: '#94A3B8',
                        borderRadius: '4px',
                    }}
                />
                <div
                    style={{
                        width: '80px',
                        height: '32px',
                        backgroundColor: '#CBD5E1',
                        borderRadius: '4px',
                        marginTop: '8px',
                    }}
                />
            </div>

            {/* Lorem ipsum placeholder */}
            <div style={{ marginTop: '8px' }}>
                <div
                    style={{
                        width: '100%',
                        height: '12px',
                        backgroundColor: '#E2E8F0',
                        borderRadius: '4px',
                        marginBottom: '8px',
                    }}
                />
                <div
                    style={{
                        width: '90%',
                        height: '12px',
                        backgroundColor: '#E2E8F0',
                        borderRadius: '4px',
                        marginBottom: '8px',
                    }}
                />
                <div
                    style={{
                        width: '60%',
                        height: '12px',
                        backgroundColor: '#E2E8F0',
                        borderRadius: '4px',
                    }}
                />
            </div>

            {/* Misaligned cards */}
            <div
                style={{
                    display: 'flex',
                    gap: '12px',
                    marginTop: '16px',
                }}
            >
                <div
                    style={{
                        width: '140px',
                        height: '100px',
                        backgroundColor: '#CBD5E1',
                        borderRadius: '8px',
                        marginTop: '12px',
                    }}
                />
                <div
                    style={{
                        width: '140px',
                        height: '100px',
                        backgroundColor: '#CBD5E1',
                        borderRadius: '8px',
                    }}
                />
                <div
                    style={{
                        width: '140px',
                        height: '100px',
                        backgroundColor: '#CBD5E1',
                        borderRadius: '8px',
                        marginTop: '8px',
                    }}
                />
            </div>

            {/* Broken button */}
            <div
                style={{
                    width: '150px',
                    height: '40px',
                    backgroundColor: '#94A3B8',
                    borderRadius: '4px',
                    marginTop: 'auto',
                    marginLeft: 'auto',
                    marginRight: 'auto',
                }}
            />
        </div>
    );
};
