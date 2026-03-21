import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { ShieldCheck, Server, Database, Lock, CreditCard, Shield } from 'lucide-react';

export const GlassyUICardV3: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Card slides up smoothly from bottom
  const entrance = spring({
    frame: frame - 60, // Enters at 2 seconds
    fps,
    config: { damping: 200 }, // Smooth, no bounce
  });

  const translateY = interpolate(entrance, [0, 1], [800, 0]);
  const opacity = interpolate(entrance, [0, 1], [0, 1]);

  const services = [
    { name: 'PostgreSQL Database', desc: 'us-east-1 • 1.2ms latency', icon: Database, color: '#3B82F6' },
    { name: 'Auth & Rate Limit', desc: 'Active • 99.99% Uptime', icon: Lock, color: '#8B5CF6' },
    { name: 'Stripe Webhooks', desc: 'Listening • Signature OK', icon: CreditCard, color: '#10B981' },
    { name: 'API Firewall', desc: '0 Intrusions • DDOS OFF', icon: Shield, color: '#F59E0B' },
  ];

  return (
    <div
      style={{
        position: 'absolute',
        bottom: 150,
        left: 60,
        right: 60,
        height: 'auto',
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        borderRadius: 40,
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.1)',
        transform: `translateY(${translateY}px)`,
        opacity,
        display: 'flex',
        flexDirection: 'column',
        padding: 50,
        border: '2px solid rgba(226, 232, 240, 0.8)',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 40 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <div style={{ width: 80, height: 80, backgroundColor: '#0EA5E9', borderRadius: 20, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Server size={40} color="white" />
          </div>
          <div>
            <h2 style={{ margin: 0, fontSize: 32, fontFamily: 'Inter, sans-serif', fontWeight: 800, color: '#0F172A' }}>Prod Cluster</h2>
            <p style={{ margin: 0, fontSize: 20, fontFamily: 'JetBrains Mono, monospace', color: '#64748B' }}>APP_ENV=prod • v2.1.0</p>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, backgroundColor: '#ECFDF5', padding: '12px 24px', borderRadius: 30 }}>
          <ShieldCheck size={32} color="#10B981" />
          <span style={{ color: '#10B981', fontSize: 22, fontWeight: 700, fontFamily: 'Inter, sans-serif' }}>Healthy</span>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
        {services.map((service, i) => {
          const IconStyle = service.icon;
          return (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 24, padding: '24px 0', borderBottom: i !== services.length - 1 ? '1px solid #F1F5F9' : 'none' }}>
              <div style={{ width: 64, height: 64, borderRadius: 16, backgroundColor: `${service.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <IconStyle size={32} color={service.color} />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                  <h3 style={{ margin: 0, fontSize: 24, fontFamily: 'Inter, sans-serif', fontWeight: 700, color: '#1E293B', marginBottom: 6, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{service.name}</h3>
                  <p style={{ margin: 0, fontSize: 18, fontFamily: 'JetBrains Mono, monospace', color: '#64748B', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{service.desc}</p>
              </div>
              <div style={{ padding: '8px 20px', backgroundColor: '#F8FAFC', border: '1px solid #E2E8F0', color: '#475569', borderRadius: 20, fontSize: 16, fontWeight: 700, fontFamily: 'JetBrains Mono, monospace', flexShrink: 0 }}>
                200 OK
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
