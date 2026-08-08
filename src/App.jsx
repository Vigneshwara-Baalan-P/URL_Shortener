import React from 'react';
import { UrlProvider, useUrl } from './context/UrlContext';
import { Navbar } from './components/Navbar';
import { URLShortener } from './components/URLShortener';
import { BulkShortener } from './components/BulkShortener';
import { LinkLibrary } from './components/LinkLibrary';
import { AnalyticsDashboard } from './components/AnalyticsDashboard';
import { RedirectSimulator } from './components/RedirectSimulator';
import { FeaturesSection } from './components/FeaturesSection';
import { FaqSection } from './components/FaqSection';
import { QRModal } from './components/QRModal';
import { ToastContainer } from './components/Toast';
import { Link2 } from 'lucide-react';

const MainContent = () => {
  const { activeTab } = useUrl();

  return (
    <main style={{ minHeight: 'calc(100vh - 160px)', paddingBottom: '3rem' }}>
      {activeTab === 'shortener' && (
        <>
          <URLShortener />
          <FeaturesSection />
          <FaqSection />
        </>
      )}
      {activeTab === 'bulk' && <BulkShortener />}
      {activeTab === 'library' && <LinkLibrary />}
      {activeTab === 'analytics' && <AnalyticsDashboard />}
      {activeTab === 'simulator' && <RedirectSimulator />}
    </main>
  );
};

export default function App() {
  return (
    <UrlProvider>
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Navbar />
        <MainContent />

        {/* Footer matching LinkShort branding */}
        <footer
          style={{
            marginTop: 'auto',
            borderTop: '1px solid rgba(255, 255, 255, 0.08)',
            background: 'rgba(9, 13, 22, 0.95)',
            padding: '2rem 1.5rem',
            textAlign: 'center',
            fontSize: '0.85rem',
            color: 'var(--text-muted)'
          }}
        >
          <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <div
                style={{
                  width: '28px',
                  height: '28px',
                  borderRadius: '8px',
                  background: 'linear-gradient(135deg, #6366f1 0%, #06b6d4 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <Link2 size={16} color="#fff" />
              </div>
              <span style={{ fontWeight: 700, color: '#fff', fontSize: '1rem' }}>LinkShort App</span>
            </div>

            <div>
              Smart Link Shortener, Campaign UTM Tracking & QR Code Analytics
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <span>© {new Date().getFullYear()} LinkShort. All rights reserved.</span>
            </div>
          </div>
        </footer>

        <QRModal />
        <ToastContainer />
      </div>
    </UrlProvider>
  );
}
