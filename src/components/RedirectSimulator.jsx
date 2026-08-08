import React, { useState } from 'react';
import { useUrl } from '../context/UrlContext';
import { 
  Compass, 
  ArrowRight, 
  Lock, 
  CheckCircle2, 
  ExternalLink, 
  Globe, 
  Clock 
} from 'lucide-react';

export const RedirectSimulator = () => {
  const { urls, simulateRedirect, addToast, setActiveTab, setSelectedUrlForAnalytics } = useUrl();

  const [inputCode, setInputCode] = useState('react-docs');
  const [passwordInput, setPasswordInput] = useState('');
  const [simulationResult, setSimulationResult] = useState(null);
  const [testedCode, setTestedCode] = useState('');

  const handleRunSimulation = (codeToTest = inputCode, passToTest = passwordInput) => {
    if (!codeToTest.trim()) {
      addToast('Please enter a short code or slug', 'error');
      return;
    }

    const cleanCode = codeToTest.replace(/^https?:\/\/(snap\.link\/)?/i, '').trim();
    setTestedCode(cleanCode);

    const result = simulateRedirect(cleanCode, passToTest);
    setSimulationResult(result);

    if (result.success) {
      addToast(`Redirection simulated! Click hit recorded.`, 'success');
    }
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem 1rem' }}>
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2.2rem', fontWeight: 700, color: '#1f1f1f', marginBottom: '0.5rem' }}>
          Short Link Redirect Simulator
        </h1>
        <p style={{ color: '#444746', fontSize: '0.95rem', maxWidth: '520px', margin: '0 auto' }}>
          Test routing, password prompts, and expiration checks directly inside your browser.
        </p>
      </div>

      <div className="google-card" style={{ padding: '2rem', marginBottom: '1.5rem' }}>
        <div
          style={{
            background: '#f8f9fa',
            border: '1px solid #dadce0',
            borderRadius: '24px',
            padding: '0.65rem 1rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            marginBottom: '1.25rem'
          }}
        >
          <Globe size={18} color="#0b57d0" />
          <span style={{ color: '#5f6368', fontSize: '0.9rem', fontWeight: 500 }}>
            https://snap.link/
          </span>
          <input
            type="text"
            className="google-input"
            value={inputCode}
            onChange={(e) => setInputCode(e.target.value)}
            placeholder="enter-code"
            style={{
              padding: '0.35rem 0.65rem',
              fontFamily: 'var(--font-mono)',
              fontWeight: 700,
              color: '#0b57d0',
              border: 'none',
              background: 'transparent'
            }}
          />
          <button
            onClick={() => handleRunSimulation()}
            className="btn-google"
            style={{ padding: '0.5rem 1.25rem', fontSize: '0.85rem' }}
          >
            <span>Test Visit</span>
            <ArrowRight size={14} />
          </button>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
          <span style={{ fontSize: '0.78rem', color: '#747775', fontWeight: 600 }}>Try Presets:</span>
          {urls.map((u) => (
            <button
              key={u.id}
              onClick={() => {
                setInputCode(u.shortCode);
                setPasswordInput('');
                handleRunSimulation(u.shortCode, '');
              }}
              style={{
                background: '#f1f3f4',
                border: '1px solid #dadce0',
                color: '#444746',
                padding: '0.25rem 0.65rem',
                borderRadius: '12px',
                fontSize: '0.75rem',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.3rem'
              }}
            >
              {u.password && <Lock size={10} color="#b45309" />}
              {u.shortCode}
            </button>
          ))}
        </div>
      </div>

      {simulationResult && (
        <div className="animate-fade-in">
          {simulationResult.needsPassword && (
            <div className="google-card" style={{ padding: '2rem', border: '1px solid #b45309' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                <Lock size={24} color="#b45309" />
                <div>
                  <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#1f1f1f' }}>Passcode Protection Required</h3>
                  <p style={{ fontSize: '0.85rem', color: '#444746' }}>
                    Link <strong>snap.link/{testedCode}</strong> requires a passcode.
                  </p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '0.75rem', maxWidth: '400px' }}>
                <input
                  type="password"
                  className="google-input"
                  placeholder="Enter passcode..."
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                />
                <button
                  className="btn-google"
                  onClick={() => handleRunSimulation(testedCode, passwordInput)}
                >
                  Unlock
                </button>
              </div>
            </div>
          )}

          {simulationResult.isExpired && (
            <div className="google-card" style={{ padding: '2rem', border: '1px solid #b3261e' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <Clock size={24} color="#b3261e" />
                <div>
                  <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#b3261e' }}>Link Expired</h3>
                  <p style={{ fontSize: '0.85rem', color: '#444746' }}>
                    This short URL reached its configured expiration date.
                  </p>
                </div>
              </div>
            </div>
          )}

          {simulationResult.success && (
            <div className="google-card" style={{ padding: '2rem', border: '1px solid #146c2e' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <CheckCircle2 size={24} color="#146c2e" />
                  <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#1f1f1f' }}>
                    Redirection Successful!
                  </h3>
                </div>
                <span className="google-badge badge-green">Click Hit Recorded</span>
              </div>

              <div style={{ background: '#f8f9fa', padding: '1rem', borderRadius: '12px', marginBottom: '1.25rem', border: '1px solid #dadce0' }}>
                <div style={{ fontSize: '0.78rem', color: '#747775', marginBottom: '0.2rem' }}>Destination URL:</div>
                <div style={{ fontSize: '1.02rem', fontWeight: 600, color: '#0b57d0', wordBreak: 'break-all' }}>
                  {simulationResult.targetUrl}
                </div>
              </div>

              <div style={{ display: 'flex', gap: '0.75rem' }}>
                <button className="btn-google" onClick={() => window.open(simulationResult.targetUrl, '_blank')}>
                  <ExternalLink size={16} /> Open Destination Webpage
                </button>
                <button
                  className="btn-google-outlined"
                  onClick={() => {
                    setSelectedUrlForAnalytics(simulationResult.link.id);
                    setActiveTab('analytics');
                  }}
                >
                  View Analytics Update
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
