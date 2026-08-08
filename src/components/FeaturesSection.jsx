import React from 'react';
import { 
  Zap, 
  BarChart3, 
  QrCode, 
  Target, 
  Lock, 
  ShieldCheck 
} from 'lucide-react';

export const FeaturesSection = () => {
  const features = [
    {
      icon: Zap,
      color: '#0b57d0',
      title: 'Smart Link Shortener',
      description: 'Create memorable short URLs with custom aliases, password protection, and auto-expiration.'
    },
    {
      icon: BarChart3,
      color: '#146c2e',
      title: 'Real-Time Analytics',
      description: 'Track clicks live with detailed charts by device, referrer source, timeline, and geographic location.'
    },
    {
      icon: QrCode,
      color: '#0284c7',
      title: 'Custom QR Code Studio',
      description: 'Generate high-resolution PNG & SVG QR codes with custom color styling.'
    },
    {
      icon: Target,
      color: '#7e22ce',
      title: 'UTM Campaign Builder',
      description: 'Automatically attach Google Analytics UTM parameters (source, medium, campaign) to track campaigns.'
    },
    {
      icon: Lock,
      color: '#b45309',
      title: 'Passcode Protection',
      description: 'Encrypt link destinations with passcode security so only authorized users can access the redirect.'
    },
    {
      icon: ShieldCheck,
      color: '#b3261e',
      title: 'Redirect Simulator',
      description: 'Test routing, expiration checks, and passcode entry directly inside the browser.'
    }
  ];

  return (
    <section style={{ maxWidth: '1200px', margin: '4rem auto 2rem auto', padding: '0 1.5rem' }}>
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h2 style={{ fontSize: '2rem', fontWeight: 700, color: '#1f1f1f', marginBottom: '0.5rem' }}>
          Key Features & Platform Capabilities
        </h2>
        <p style={{ color: '#444746', fontSize: '1rem', maxWidth: '580px', margin: '0 auto' }}>
          Everything you need to create, manage, and analyze trackable short links.
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
              className="google-card"
              style={{
                padding: '1.75rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.85rem'
              }}
            >
              <div
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '50%',
                  background: '#f1f3f4',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <Icon size={22} color={item.color} />
              </div>

              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#1f1f1f' }}>
                {item.title}
              </h3>

              <p style={{ fontSize: '0.9rem', color: '#444746', lineHeight: 1.6 }}>
                {item.description}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
};
