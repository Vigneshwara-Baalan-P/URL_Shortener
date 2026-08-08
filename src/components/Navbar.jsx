import React from 'react';
import { useUrl } from '../context/UrlContext';
import { 
  Link2, 
  Layers, 
  BarChart3, 
  Compass, 
  List, 
  Zap,
  Sparkles
} from 'lucide-react';

export const Navbar = () => {
  const { urls, activeTab, setActiveTab } = useUrl();

  const navItems = [
    { id: 'shortener', label: 'Shortener', icon: Zap },
    { id: 'library', label: 'My Links', icon: List, badge: urls.length },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'simulator', label: 'Redirect Test', icon: Compass }
  ];

  return (
    <header
      style={{
        background: '#ffffff',
        borderBottom: '1px solid #dadce0',
        position: 'sticky',
        top: 0,
        zIndex: 100
      }}
    >
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0.85rem 1.5rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1rem'
        }}
      >
        {/* Google Style Branding */}
        <div
          onClick={() => setActiveTab('shortener')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            cursor: 'pointer'
          }}
        >
          <div
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              background: '#ecf3fe',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Link2 size={22} color="#0b57d0" />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <span style={{ fontSize: '1.25rem', fontWeight: 700, color: '#1f1f1f', letterSpacing: '-0.3px' }}>
                <span style={{ color: '#4285f4' }}>G</span>
                <span style={{ color: '#ea4335' }}>o</span>
                <span style={{ color: '#fbbc05' }}>o</span>
                <span style={{ color: '#4285f4' }}>g</span>
                <span style={{ color: '#34a853' }}>l</span>
                <span style={{ color: '#ea4335' }}>e</span>
                <span style={{ color: '#0b57d0', marginLeft: '4px', fontWeight: 600 }}>URLShort</span>
              </span>
            </div>
            <p style={{ fontSize: '0.72rem', color: '#747775' }}>
              Smart URL Shortener & QR Code Generator
            </p>
          </div>
        </div>

        {/* Google Nav Buttons */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                style={{
                  background: isActive ? '#c2e7ff' : 'transparent',
                  color: isActive ? '#001d35' : '#444746',
                  border: 'none',
                  padding: '0.55rem 1.1rem',
                  borderRadius: '24px',
                  fontWeight: isActive ? 600 : 500,
                  fontSize: '0.88rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  transition: 'all 0.2s ease'
                }}
              >
                <Icon size={16} color={isActive ? '#0b57d0' : '#5f6368'} />
                <span>{item.label}</span>
                {item.badge !== undefined && (
                  <span
                    style={{
                      background: isActive ? '#0b57d0' : '#e0e3e1',
                      color: isActive ? '#ffffff' : '#444746',
                      fontSize: '0.7rem',
                      padding: '0.1rem 0.45rem',
                      borderRadius: '999px',
                      fontWeight: 600
                    }}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
};
