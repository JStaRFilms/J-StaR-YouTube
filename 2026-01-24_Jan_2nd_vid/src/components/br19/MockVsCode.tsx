import React from 'react';

const CODE_LINES = [
    { text: `import { useState } from 'react';`, color: '#c586c0' },
    { text: `import { motion } from 'framer-motion';`, color: '#c586c0' },
    { text: '', color: 'transparent' },
    { text: `export const Dashboard = () => {`, color: '#569cd6' },
    { text: `  const [data, setData] = useState([]);`, color: '#dcdcaa', indent: 1 },
    { text: `  `, color: 'transparent' },
    { text: `  // Fetch user data`, color: '#6a9955', indent: 1 },
    { text: `  useEffect(() => {`, color: '#c586c0', indent: 1 },
    { text: `    const load = async () => {`, color: '#569cd6', indent: 2 },
    { text: `      const res = await api.get('/stats');`, color: '#9cdcfe', indent: 3 },
    { text: `      setData(res.json());`, color: '#dcdcaa', indent: 3 },
    { text: `    };`, color: '#569cd6', indent: 2 },
    { text: `    load();`, color: '#dcdcaa', indent: 2 },
    { text: `  }, []);`, color: '#c586c0', indent: 1 },
    { text: '', color: 'transparent' },
    { text: `  return (`, color: '#569cd6', indent: 1 },
    { text: `    <div className="p-6 grid gap-4">`, color: '#ce9178', indent: 2 },
    { text: `      <Header title="Overview" />`, color: '#4ec9b0', indent: 3 },
    { text: `      <Charts data={data} />`, color: '#4ec9b0', indent: 3 },
    { text: `    </div>`, color: '#ce9178', indent: 2 },
    { text: `  );`, color: '#569cd6', indent: 1 },
    { text: `};`, color: '#569cd6' },
];

export const MockVsCode: React.FC = () => {
    return (
        <div style={{ display: 'flex', height: '100%', fontFamily: 'Consolas, monospace', fontSize: 13, color: '#d4d4d4', background: '#1e1e1e' }}>
            {/* Sidebar */}
            <div style={{ width: 48, background: '#333333', display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 12, gap: 16 }}>
                {[1, 2, 3, 4].map(i => (
                    <div key={i} style={{ width: 24, height: 24, opacity: 0.6, border: '2px solid white', borderRadius: 4 }} />
                ))}
            </div>

            {/* Explorer */}
            <div style={{ width: 160, background: '#252526', padding: 10, display: 'flex', flexDirection: 'column', gap: 4 }}>
                <div style={{ fontSize: 11, fontWeight: 'bold', marginBottom: 8 }}>EXPLORER</div>
                {['src', 'components', 'Dashboard.tsx', 'api.ts', 'styles.css'].map((name, i) => (
                    <div key={i} style={{ paddingLeft: i > 1 ? 12 : 0, color: i === 2 ? '#fff' : '#888', background: i === 2 ? '#37373d' : 'transparent' }}>
                        {i > 1 ? '📄 ' : '📂 '} {name}
                    </div>
                ))}
            </div>

            {/* Code Area */}
            <div style={{ flex: 1, padding: 20, overflow: 'hidden' }}>
                {CODE_LINES.map((line, i) => (
                    <div key={i} style={{ display: 'flex', height: 20 }}>
                        <div style={{ width: 30, color: '#858585', textAlign: 'right', paddingRight: 10, userSelect: 'none' }}>{i + 1}</div>
                        <div style={{ paddingLeft: (line.indent || 0) * 16, color: line.color }}>{line.text}</div>
                    </div>
                ))}
            </div>
        </div>
    );
};
