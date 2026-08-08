import React from 'react';
import { 
  Zap, 
  BarChart3, 
  QrCode, 
  Target, 
  Lock, 
  Globe, 
  Layers, 
  ShieldCheck 
} from 'lucide-react';

export const FeaturesSection = () => {
  const features = [
    {
      icon: Zap,
      color: '#3b82f6',
      title: 'Smart Link Shortener',
      description: 'Transform long cluttered URLs into memorable short links with custom slug aliases, password protection, and auto-expiration.'
    },
    {
      icon: BarChart3,
      color: '#10b981',
      title: 'Real-Time Analytics',
      description: 'Track clicks live with comprehensive breakdown charts by device type, referrer source, hourly timeline, and geographic location.'
    },
    {
      icon: QrCode,
      color: '#06b6d4',
      title: 'Custom QR Code Studio',
      description: 'Generate high-resolution SVG and PNG QR codes with customizable color schemes and foreground styling.'
    },
    {
      icon: Target,
      color: '#a855f7',
      title: 'UTM Campaign Builder',
      description: 'Attach Google Analytics UTM parameters (source, medium, campaign) automatically to track marketing performance.'
    },
    {
      icon: Lock,
      color: '#f59e0b',
      title: 'Passcode Security',
      description: 'Encrypt sensitive link destinations with passcode protection so only authorized users can access the redirect.'
    },
    {
      icon: Layers,
      color: '#f43f5e',
      title: 'Bulk Processing Engine',
      description: 'Shorten up to 20 web links simultaneously via copy-paste or by uploading TXT/CSV campaign spreadsheets.'
    }
  ];

  return (
    <section style={{ maxWidth: '1280px', margin: '4rem auto 2rem auto', padding: '0 1.5rem' }}>
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h2 style={{ fontSize: '2rem', fontWeight: 800, color: '#fff', marginBottom: '0.75rem' }}>
          Everything You Need to <span className="gradient-text">Manage & Scale Links</span>
        </h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '1rem', maxWidth: '600px', margin: '0 auto' }}>
          Designed for creators, digital marketers, and tech teams who need complete control over link tracking and digital assets.
        </p>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '1.5rem'
        }}
      >
        {features.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              className="glass-panel"
              style={{
                padding: '1.75rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
                background: 'rgba(18, 24, 40, 0.65)',
                border: '1px solid rgba(255, 255, 255, 0.08)'
              }}
            >
              <div
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '12px',
                  background: `${item.color}15`,
                  border: `1px solid ${item.color}35`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <Icon size={24} color={item.color} />
              </div>

              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#fff' }}>
                {item.title}
              </h3>

              <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
                {item.description}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
};
