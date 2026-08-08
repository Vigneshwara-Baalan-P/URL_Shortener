import React, { useState } from 'react';
import { useUrl } from '../context/UrlContext';
import { 
  Compass, 
  ArrowRight, 
  Lock, 
  AlertTriangle, 
  CheckCircle2, 
  ExternalLink, 
  Globe, 
  ShieldCheck, 
  Clock, 
  Sparkles,
  Search
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

    // Clean prefix if user typed snap.link/code
    const cleanCode = codeToTest.replace(/^https?:\/\/(snap\.link\/)?/i, '').trim();
    setTestedCode(cleanCode);

    const result = simulateRedirect(cleanCode, passToTest);
    setSimulationResult(result);

    if (result.success) {
      addToast(`Redirection simulated! Logged click hit for "${cleanCode}".`, 'success');
    }
  };

  return (
    <div style={{ maxWidth: '840px', margin: '0 auto', padding: '2rem 1rem' }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.4rem 1rem',
            borderRadius: '999px',
            background: 'rgba(6, 182, 212, 0.12)',
            border: '1px solid rgba(6, 182, 212, 0.25)',
            color: '#22d3ee',
            fontSize: '0.85rem',
            fontWeight: 600,
            marginBottom: '1rem'
          }}
        >
          <Compass size={14} /> Interactive Link Redirection Tester
        </div>

        <h1 style={{ fontSize: '2.2rem', fontWeight: 800, color: '#fff', marginBottom: '0.5rem' }}>
          Short Link <span className="gradient-text">Redirect Simulator</span>
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', maxWidth: '520px', margin: '0 auto' }}>
          Test short link routing directly in your browser. Verify passcode authentication, expiration checks, and see analytics update live!
        </p>
      </div>

      {/* Simulator Control Box */}
      <div className="glass-panel" style={{ padding: '2rem', marginBottom: '1.5rem' }}>
        {/* Address Bar UI */}
        <div
          style={{
            background: 'rgba(10, 15, 26, 0.85)',
            border: '1px solid var(--border-glow)',
            borderRadius: '14px',
            padding: '0.75rem 1rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            marginBottom: '1.25rem'
          }}
        >
          <Globe size={18} color="#06b6d4" />
          <span style={{ color: 'var(--text-dim)', fontSize: '0.9rem', fontWeight: 600 }}>
            https://snap.link/
          </span>
          <input
            type="text"
            className="glass-input"
            value={inputCode}
            onChange={(e) => setInputCode(e.target.value)}
            placeholder="enter-code"
            style={{
              padding: '0.35rem 0.65rem',
              fontFamily: 'var(--font-mono)',
              fontWeight: 700,
              color: '#38bdf8',
              border: 'none',
              background: 'transparent'
            }}
          />
          <button
            onClick={() => handleRunSimulation()}
            className="btn-primary"
            style={{ padding: '0.5rem 1.25rem', fontSize: '0.85rem' }}
          >
            <span>Simulate Visit</span>
            <ArrowRight size={14} />
          </button>
        </div>

        {/* Quick Test Shortcuts */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-dim)', fontWeight: 600 }}>Try Preset Links:</span>
          {urls.map((u) => (
            <button
              key={u.id}
              onClick={() => {
                setInputCode(u.shortCode);
                setPasswordInput('');
                handleRunSimulation(u.shortCode, '');
              }}
              style={{
                background: 'rgba(255, 255, 255, 0.04)',
                border: '1px solid var(--border-color)',
                color: 'var(--text-muted)',
                padding: '0.25rem 0.65rem',
                borderRadius: '8px',
                fontSize: '0.75rem',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.3rem'
              }}
            >
              {u.password && <Lock size={10} color="#fbbf24" />}
              {u.shortCode}
            </button>
          ))}
        </div>
      </div>

      {/* Simulation Result Output Display */}
      {simulationResult && (
        <div className="animate-fade-in">
          {/* Case 1: Passcode Required Error */}
          {simulationResult.needsPassword && (
            <div
              className="glass-panel"
              style={{
                padding: '2rem',
                background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.1) 0%, rgba(18, 24, 38, 0.9) 100%)',
                border: '1px solid rgba(245, 158, 11, 0.4)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                <div style={{ background: 'rgba(245, 158, 11, 0.2)', padding: '0.5rem', borderRadius: '12px' }}>
                  <Lock size={24} color="#fbbf24" />
                </div>
                <div>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#fff' }}>Passcode Protection Required</h3>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                    Link <code style={{ color: '#fbbf24' }}>snap.link/{testedCode}</code> is encrypted. Enter passcode to proceed.
                  </p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '0.75rem', maxWidth: '420px', marginTop: '1rem' }}>
                <input
                  type="password"
                  className="glass-input"
                  placeholder="Enter passcode (e.g. pass123)"
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                />
                <button
                  className="btn-primary"
                  onClick={() => handleRunSimulation(testedCode, passwordInput)}
                  style={{ background: '#f59e0b' }}
                >
                  Unlock
                </button>
              </div>
            </div>
          )}

          {/* Case 2: Link Expired */}
          {simulationResult.isExpired && (
            <div
              className="glass-panel"
              style={{
                padding: '2rem',
                background: 'linear-gradient(135deg, rgba(244, 63, 94, 0.1) 0%, rgba(18, 24, 38, 0.9) 100%)',
                border: '1px solid rgba(244, 63, 94, 0.4)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div style={{ background: 'rgba(244, 63, 94, 0.2)', padding: '0.5rem', borderRadius: '12px' }}>
                  <Clock size={24} color="#fb7185" />
                </div>
                <div>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#fff' }}>Link Has Expired</h3>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                    This short URL reached its configured expiration date and is no longer serving redirects.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Case 3: Invalid code */}
          {!simulationResult.success && !simulationResult.needsPassword && !simulationResult.isExpired && (
            <div
              className="glass-panel"
              style={{
                padding: '2rem',
                background: 'rgba(244, 63, 94, 0.08)',
                border: '1px solid rgba(244, 63, 94, 0.3)'
              }}
            >
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#fb7185' }}>404 Not Found</h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
                No active short link matches code <strong>"{testedCode}"</strong>.
              </p>
            </div>
          )}

          {/* Case 4: Success Redirection */}
          {simulationResult.success && (
            <div
              className="glass-panel"
              style={{
                padding: '2rem',
                background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(6, 182, 212, 0.08) 100%)',
                border: '1px solid rgba(16, 185, 129, 0.4)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <CheckCircle2 size={24} color="#34d399" />
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#fff' }}>
                    Redirect Successful!
                  </h3>
                </div>
                <span className="badge badge-emerald">Hit Logged to Analytics</span>
              </div>

              <div
                style={{
                  background: 'rgba(10, 15, 26, 0.8)',
                  padding: '1rem 1.25rem',
                  borderRadius: '12px',
                  marginBottom: '1.25rem',
                  border: '1px solid rgba(255, 255, 255, 0.08)'
                }}
              >
                <div style={{ fontSize: '0.78rem', color: 'var(--text-dim)', marginBottom: '0.2rem' }}>
                  Destination URL:
                </div>
                <div style={{ fontSize: '1.05rem', fontWeight: 600, color: '#38bdf8', wordBreak: 'break-all' }}>
                  {simulationResult.targetUrl}
                </div>
              </div>

              <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                <button
                  className="btn-primary"
                  onClick={() => window.open(simulationResult.targetUrl, '_blank')}
                  style={{ background: '#10b981' }}
                >
                  <ExternalLink size={16} /> Open Destination Website
                </button>
                <button
                  className="btn-secondary"
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
