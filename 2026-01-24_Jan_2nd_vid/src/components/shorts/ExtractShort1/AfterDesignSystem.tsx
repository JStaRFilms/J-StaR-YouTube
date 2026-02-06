import React from 'react';
import { useCurrentFrame, useVideoConfig, interpolate, Easing } from 'remotion';
import { loadFont as loadInter } from '@remotion/google-fonts/Inter';
import { loadFont as loadMerriweather } from '@remotion/google-fonts/Merriweather';
import { Palette, Type, Layout, MousePointer2 } from 'lucide-react';

const { fontFamily: sansFont } = loadInter();
const { fontFamily: serifFont } = loadMerriweather();

const tokens = {
    colors: {
        sand: { 50: '#FDFCFB', 100: '#FAF9F6', 200: '#E7E5E4', 900: '#78716C' },
        stone: { 800: '#292524', 900: '#1C1917' },
        terra: { 500: '#F97316', 600: '#EA580C' },
        sage: { 600: '#65A30D' }
    }
};

const SectionTitle = ({ icon: Icon, title }: { icon: any, title: string }) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
        <Icon size={24} color={tokens.colors.terra[600]} />
        <h2 style={{ fontSize: 24, fontWeight: 700, margin: 0, color: tokens.colors.stone[900], fontFamily: serifFont }}>{title}</h2>
    </div>
);

const ColorSwatch = ({ color, name, hex, darkText = false }: { color: string, name: string, hex: string, darkText?: boolean }) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <div style={{
            width: '100%',
            height: 80,
            backgroundColor: color,
            borderRadius: 12,
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
            border: '1px solid rgba(0,0,0,0.05)'
        }} />
        <div>
            <div style={{ fontSize: 14, fontWeight: 600, color: tokens.colors.stone[900], fontFamily: sansFont }}>{name}</div>
            <div style={{ fontSize: 12, color: tokens.colors.sand[900], fontFamily: sansFont }}>{hex}</div>
        </div>
    </div>
);

const Button = ({ variant = 'primary', children }: { variant?: 'primary' | 'secondary' | 'ghost', children: React.ReactNode }) => {
    const styles = {
        primary: { bg: tokens.colors.stone[900], text: 'white', border: 'none' },
        secondary: { bg: tokens.colors.terra[600], text: 'white', border: 'none' },
        ghost: { bg: 'transparent', text: tokens.colors.stone[900], border: `1px solid ${tokens.colors.stone[900]}` },
    }[variant];

    return (
        <div style={{
            padding: '12px 24px',
            backgroundColor: styles.bg,
            color: styles.text,
            border: styles.border,
            borderRadius: 8,
            fontSize: 14,
            fontWeight: 600,
            fontFamily: sansFont,
            cursor: 'pointer',
            display: 'inline-block',
            boxShadow: variant !== 'ghost' ? '0 4px 6px -1px rgba(0, 0, 0, 0.1)' : 'none',
        }}>
            {children}
        </div>
    );
};

export const AfterDesignSystem: React.FC = () => {
    const frame = useCurrentFrame();

    // Scroll animation
    const scrollY = interpolate(
        frame,
        [30, 300],
        [0, -1200],
        { extrapolateRight: 'clamp', easing: Easing.inOut(Easing.ease) }
    );

    return (
        <div style={{
            width: '100%',
            height: '100%',
            backgroundColor: tokens.colors.sand[100],
            fontFamily: sansFont,
            color: tokens.colors.stone[900],
            position: 'relative',
            overflow: 'hidden',
        }}>

            {/* Header */}
            <div style={{
                height: 80,
                borderBottom: `1px solid ${tokens.colors.sand[200]}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0 40px',
                position: 'fixed',
                top: 0,
                width: '100%',
                backgroundColor: 'rgba(250, 249, 246, 0.9)',
                backdropFilter: 'blur(8px)',
                zIndex: 10
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <span style={{ fontWeight: 900, fontSize: 24, fontFamily: serifFont, letterSpacing: '-0.05em' }}>DESERT.TECH</span>
                </div>
                <div style={{ display: 'flex', gap: 24, fontSize: 14, fontWeight: 500, color: tokens.colors.sand[900] }}>
                    <span>Home</span>
                    <span style={{ color: tokens.colors.terra[600] }}>System</span>
                    <span>Work</span>
                </div>
            </div>

            {/* Scrollable Content */}
            <div style={{
                padding: '120px 40px 40px 40px',
                transform: `translateY(${scrollY}px)`
            }}>

                {/* Hero Section */}
                <div style={{ marginBottom: 60 }}>
                    <div style={{
                        fontSize: 12,
                        fontWeight: 700,
                        color: tokens.colors.terra[600],
                        textTransform: 'uppercase',
                        letterSpacing: 2,
                        marginBottom: 16
                    }}>Design System</div>
                    <h1 style={{ fontSize: 56, fontWeight: 900, lineHeight: 1.1, marginBottom: 24, fontFamily: serifFont }}>
                        Forged in<br />the Heat.
                    </h1>
                    <p style={{ fontSize: 18, color: tokens.colors.sand[900], lineHeight: 1.6, maxWidth: 600 }}>
                        Like the desert, our process is ruthless but beautiful. A collection of essential components for the Desert Tech brand.
                    </p>
                </div>

                <div style={{ height: 1, backgroundColor: tokens.colors.sand[200], marginBottom: 60 }} />

                {/* Colors Section */}
                <div style={{ marginBottom: 60 }}>
                    <SectionTitle icon={Palette} title="Colors" />
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16 }}>
                        <ColorSwatch color={tokens.colors.stone[900]} name="Stone 900" hex={tokens.colors.stone[900]} />
                        <ColorSwatch color={tokens.colors.terra[600]} name="Terra 600" hex={tokens.colors.terra[600]} />
                        <ColorSwatch color={tokens.colors.sage[600]} name="Sage 600" hex={tokens.colors.sage[600]} />
                        <ColorSwatch color={tokens.colors.sand[200]} name="Sand 200" hex={tokens.colors.sand[200]} />
                        <ColorSwatch color={tokens.colors.sand[100]} name="Sand 100" hex={tokens.colors.sand[100]} />
                        <ColorSwatch color="#ffffff" name="White" hex="#FFFFFF" />
                    </div>
                </div>

                {/* Typography Section */}
                <div style={{ marginBottom: 60 }}>
                    <SectionTitle icon={Type} title="Typography" />
                    <div style={{ border: `1px solid ${tokens.colors.sand[200]}`, borderRadius: 16, padding: 32, backgroundColor: '#ffffff' }}>
                        <h1 style={{ fontSize: 48, fontWeight: 900, marginBottom: 16, fontFamily: serifFont }}>Merriweather Bold</h1>
                        <h2 style={{ fontSize: 36, fontWeight: 700, marginBottom: 16, fontFamily: serifFont }}>Serif Headings</h2>
                        <h3 style={{ fontSize: 24, fontWeight: 600, marginBottom: 16, fontFamily: sansFont }}>Inter Semibold for UI</h3>
                        <p style={{ fontSize: 16, color: tokens.colors.sand[900], lineHeight: 1.5 }}>
                            We use Merriweather for headlines to evoke a classic, grounded feel, while Inter serves the interface with clean, modern utility.
                        </p>
                    </div>
                </div>

                {/* Buttons Section */}
                <div style={{ marginBottom: 60 }}>
                    <SectionTitle icon={MousePointer2} title="Components" />
                    <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', padding: 24, backgroundColor: tokens.colors.sand[50], borderRadius: 16, border: `1px solid ${tokens.colors.sand[200]}` }}>
                        <Button variant="primary">Let's Talk</Button>
                        <Button variant="secondary">View Work</Button>
                        <Button variant="ghost">Learn More</Button>
                    </div>
                </div>

                {/* Cards Section */}
                <div style={{ marginBottom: 60 }}>
                    <SectionTitle icon={Layout} title="Cards" />
                    <div style={{
                        backgroundColor: 'white',
                        borderRadius: 16,
                        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
                        overflow: 'hidden',
                        border: `1px solid ${tokens.colors.sand[200]}`
                    }}>
                        <div style={{ height: 160, backgroundColor: tokens.colors.sand[200], display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <div style={{ width: 64, height: 64, borderRadius: 32, backgroundColor: tokens.colors.sand[900], opacity: 0.2 }} />
                        </div>
                        <div style={{ padding: 24 }}>
                            <h3 style={{ fontSize: 20, fontWeight: 900, marginBottom: 8, fontFamily: serifFont }}>Desert Project</h3>
                            <p style={{ fontSize: 14, color: tokens.colors.sand[900], marginBottom: 16 }}>
                                A minimal approach to complex problems.
                            </p>
                            <Button variant="ghost">Details &rarr;</Button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};
