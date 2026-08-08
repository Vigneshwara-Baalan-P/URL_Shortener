import React from 'react';
import { useUrl } from '../context/UrlContext';
import { 
  Link2, 
  Zap, 
  Layers, 
  BarChart3, 
  Compass, 
  Download, 
  List, 
  Sparkles,
  MousePointerClick
} from 'lucide-react';

export const Navbar = () => {
  const { urls, activeTab, setActiveTab, exportData } = useUrl();

  const totalClicks = urls.reduce((acc, curr) => acc + (curr.clicks || 0), 0);
  const totalActive = urls.filter((u) => !u.expiresAt || new Date(u.expiresAt) > new Date()).length;

  const navItems = [
    { id: 'shortener', label: 'Shorten URL', icon: Zap },
    { id: 'bulk', label: 'Bulk Shorten', icon: Layers },
    { id: 'library', label: 'Link Library', icon: List, badge: urls.length },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'simulator', label: 'Redirect Simulator', icon: Compass, isHot: true }
  ];

  return (
    <header
      style={{
        borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
        background: 'rgba(9, 13, 22, 0.85)',
        backdropFilter: 'blur(20px)',
        position: 'sticky',
        top: 0,
        zIndex: 100
      }}
    >
      <div
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '1rem 1.5rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1rem'
        }}
      >
        {/* Brand */}
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
              width: '42px',
              height: '42px',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, #6366f1 0%, #06b6d4 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 20px rgba(99, 102, 241, 0.5)'
            }}
          >
            <Link2 size={24} color="#ffffff" />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ fontSize: '1.4rem', fontWeight: 800, letterSpacing: '-0.5px' }}>
                Snap<span className="gradient-text">Link</span>
              </span>
              <span className="badge badge-emerald" style={{ fontSize: '0.65rem' }}>
                <Sparkles size={10} /> Pro
              </span>
            </div>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              Next-Gen URL Shortener & Analytics
            </p>
          </div>
        </div>

        {/* Global Stats Ticker Pill */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1.25rem',
            background: 'rgba(255, 255, 255, 0.03)',
            padding: '0.4rem 1rem',
            borderRadius: '9999px',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            fontSize: '0.85rem'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <Link2 size={14} color="#818cf8" />
            <span style={{ color: 'var(--text-muted)' }}>Links:</span>
            <strong style={{ color: '#fff' }}>{urls.length}</strong>
          </div>
          <div style={{ width: '1px', height: '14px', background: 'rgba(255,255,255,0.1)' }} />
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <MousePointerClick size={14} color="#34d399" />
            <span style={{ color: 'var(--text-muted)' }}>Clicks:</span>
            <strong style={{ color: '#fff' }}>{totalClicks}</strong>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                style={{
                  background: isActive
                    ? item.isHot
                      ? 'linear-gradient(135deg, rgba(6, 182, 212, 0.25) 0%, rgba(99, 102, 241, 0.25) 100%)'
                      : 'rgba(99, 102, 241, 0.15)'
                    : 'transparent',
                  color: isActive ? '#ffffff' : 'var(--text-muted)',
                  border: isActive
                    ? item.isHot
                      ? '1px solid rgba(6, 182, 212, 0.5)'
                      : '1px solid rgba(99, 102, 241, 0.4)'
                    : '1px solid transparent',
                  padding: '0.6rem 1rem',
                  borderRadius: '12px',
                  fontWeight: isActive ? 600 : 500,
                  fontSize: '0.88rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  transition: 'var(--transition-fast)'
                }}
              >
                <Icon size={16} color={isActive ? (item.isHot ? '#22d3ee' : '#818cf8') : 'inherit'} />
                <span>{item.label}</span>
                {item.badge !== undefined && (
                  <span
                    style={{
                      background: 'rgba(255, 255, 255, 0.15)',
                      color: '#fff',
                      fontSize: '0.7rem',
                      padding: '0.1rem 0.45rem',
                      borderRadius: '999px'
                    }}
                  >
                    {item.badge}
                  </span>
                )}
                {item.isHot && !isActive && (
                  <span
                    style={{
                      width: '6px',
                      height: '6px',
                      borderRadius: '50%',
                      background: '#06b6d4',
                      boxShadow: '0 0 8px #06b6d4'
                    }}
                  />
                )}
              </button>
            );
          })}

          {/* Export Dropdown */}
          <div style={{ position: 'relative', marginLeft: '0.25rem' }}>
            <button
              className="btn-secondary"
              onClick={() => exportData('csv')}
              title="Export all links to CSV"
              style={{ padding: '0.6rem 0.85rem' }}
            >
              <Download size={16} />
              <span style={{ fontSize: '0.8rem' }}>Export</span>
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
};
