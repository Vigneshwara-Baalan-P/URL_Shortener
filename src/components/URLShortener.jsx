import React, { useState } from 'react';
import { useUrl } from '../context/UrlContext';
import { ResultCard } from './ResultCard';
import { 
  Link2, 
  Sparkles, 
  Lock, 
  Calendar, 
  Tag, 
  SlidersHorizontal, 
  Clipboard, 
  FileText, 
  ArrowRight,
  ShieldAlert
} from 'lucide-react';

export const URLShortener = () => {
  const { addUrl, addToast } = useUrl();

  const [longUrl, setLongUrl] = useState('');
  const [customSlug, setCustomSlug] = useState('');
  const [title, setTitle] = useState('');
  const [password, setPassword] = useState('');
  const [expiresAt, setExpiresAt] = useState('');
  const [tagsInput, setTagsInput] = useState('');
  const [notes, setNotes] = useState('');
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [latestCreatedUrl, setLatestCreatedUrl] = useState(null);

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (text) {
        setLongUrl(text);
        addToast('Pasted URL from clipboard', 'info');
      }
    } catch (e) {
      addToast('Could not access clipboard', 'error');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!longUrl.trim()) {
      addToast('Please enter a valid target URL', 'error');
      return;
    }

    const tags = tagsInput
      .split(',')
      .map((t) => t.trim())
      .filter((t) => t.length > 0);

    const created = addUrl({
      longUrl,
      customSlug,
      title,
      tags,
      password,
      expiresAt,
      notes
    });

    if (created) {
      setLatestCreatedUrl(created);
      // Reset form
      setLongUrl('');
      setCustomSlug('');
      setTitle('');
      setPassword('');
      setExpiresAt('');
      setTagsInput('');
      setNotes('');
    }
  };

  return (
    <div style={{ maxWidth: '840px', margin: '0 auto', padding: '2rem 1rem' }}>
      {/* Hero Header */}
      <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.4rem 1rem',
            borderRadius: '999px',
            background: 'rgba(99, 102, 241, 0.12)',
            border: '1px solid rgba(99, 102, 241, 0.25)',
            color: '#a5b4fc',
            fontSize: '0.85rem',
            fontWeight: 600,
            marginBottom: '1rem'
          }}
        >
          <Sparkles size={14} /> Lightning Fast Short Links & Real-Time Analytics
        </div>

        <h1
          style={{
            fontSize: 'clamp(2.2rem, 5vw, 3.2rem)',
            fontWeight: 800,
            letterSpacing: '-1px',
            lineHeight: 1.15,
            marginBottom: '1rem'
          }}
        >
          Shorten, Share & Track <br />
          <span className="gradient-text">Your Web Links Intelligently</span>
        </h1>

        <p
          style={{
            color: 'var(--text-muted)',
            fontSize: '1.05rem',
            maxWidth: '560px',
            margin: '0 auto'
          }}
        >
          Transform long, cluttered web addresses into sleek, brandable short links with password security, QR code styling, and click tracking.
        </p>
      </div>

      {/* Main Shortener Form Glass Panel */}
      <div className="glass-panel" style={{ padding: '2rem', position: 'relative' }}>
        <form onSubmit={handleSubmit}>
          {/* Main URL Input Group */}
          <div style={{ marginBottom: '1.25rem' }}>
            <label
              htmlFor="main-url-input"
              style={{
                display: 'block',
                fontSize: '0.9rem',
                fontWeight: 600,
                color: 'var(--text-main)',
                marginBottom: '0.5rem'
              }}
            >
              Target Destination URL <span style={{ color: 'var(--accent-rose)' }}>*</span>
            </label>

            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
              <div style={{ position: 'relative', flex: 1, minWidth: '280px' }}>
                <div
                  style={{
                    position: 'absolute',
                    left: '14px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: 'var(--text-dim)',
                    display: 'flex'
                  }}
                >
                  <Link2 size={20} />
                </div>

                <input
                  id="main-url-input"
                  type="text"
                  className="glass-input"
                  placeholder="https://example.com/very-long-url-path-query-parameters"
                  value={longUrl}
                  onChange={(e) => setLongUrl(e.target.value)}
                  style={{ paddingLeft: '2.75rem', paddingRight: '4rem', fontSize: '1rem' }}
                  required
                />

                <button
                  type="button"
                  onClick={handlePaste}
                  style={{
                    position: 'absolute',
                    right: '10px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'rgba(255, 255, 255, 0.08)',
                    border: 'none',
                    color: 'var(--text-muted)',
                    padding: '0.35rem 0.65rem',
                    borderRadius: '8px',
                    fontSize: '0.75rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.3rem'
                  }}
                  title="Paste from clipboard"
                >
                  <Clipboard size={12} /> Paste
                </button>
              </div>

              <button type="submit" className="btn-primary" style={{ padding: '0.85rem 2rem' }}>
                <span>Shorten</span>
                <ArrowRight size={18} />
              </button>
            </div>
          </div>

          {/* Advanced Options Toggle */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1rem' }}>
            <button
              type="button"
              onClick={() => setShowAdvanced(!showAdvanced)}
              style={{
                background: 'none',
                border: 'none',
                color: showAdvanced ? '#38bdf8' : 'var(--text-muted)',
                fontSize: '0.88rem',
                fontWeight: 600,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                padding: '0.25rem 0'
              }}
            >
              <SlidersHorizontal size={16} />
              <span>{showAdvanced ? 'Hide Custom Options' : 'Custom Alias, Password & Expiry Options'}</span>
            </button>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>Domain: snap.link/</span>
          </div>

          {/* Expanded Options Form Grid */}
          {showAdvanced && (
            <div
              className="animate-fade-in"
              style={{
                marginTop: '1.25rem',
                paddingTop: '1.25rem',
                borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                gap: '1.25rem'
              }}
            >
              {/* Custom Slug */}
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem' }}>
                  Custom Alias (Slug)
                </label>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <span
                    style={{
                      background: 'rgba(255, 255, 255, 0.04)',
                      border: '1px solid var(--border-color)',
                      borderRight: 'none',
                      padding: '0.75rem 0.75rem',
                      borderRadius: '14px 0 0 14px',
                      fontSize: '0.85rem',
                      color: 'var(--text-dim)'
                    }}
                  >
                    snap.link/
                  </span>
                  <input
                    type="text"
                    className="glass-input"
                    placeholder="my-custom-name"
                    value={customSlug}
                    onChange={(e) => setCustomSlug(e.target.value.replace(/[^a-zA-Z0-9_-]/g, ''))}
                    style={{ borderRadius: '0 14px 14px 0' }}
                  />
                </div>
              </div>

              {/* Title / Name */}
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem' }}>
                  Link Reference Title
                </label>
                <input
                  type="text"
                  className="glass-input"
                  placeholder="e.g. Summer Campaign Portfolio"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>

              {/* Password Protection */}
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem' }}>
                  Passcode Protection (Optional)
                </label>
                <div style={{ position: 'relative' }}>
                  <div
                    style={{
                      position: 'absolute',
                      left: '12px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      color: 'var(--text-dim)'
                    }}
                  >
                    <Lock size={16} />
                  </div>
                  <input
                    type="password"
                    className="glass-input"
                    placeholder="Enter password..."
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={{ paddingLeft: '2.5rem' }}
                  />
                </div>
              </div>

              {/* Expiration Date */}
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem' }}>
                  Expiration Date & Time
                </label>
                <div style={{ position: 'relative' }}>
                  <div
                    style={{
                      position: 'absolute',
                      left: '12px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      color: 'var(--text-dim)'
                    }}
                  >
                    <Calendar size={16} />
                  </div>
                  <input
                    type="datetime-local"
                    className="glass-input"
                    value={expiresAt}
                    onChange={(e) => setExpiresAt(e.target.value)}
                    style={{ paddingLeft: '2.5rem', colorScheme: 'dark' }}
                  />
                </div>
              </div>

              {/* Tags */}
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem' }}>
                  Tags (Comma separated)
                </label>
                <div style={{ position: 'relative' }}>
                  <div
                    style={{
                      position: 'absolute',
                      left: '12px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      color: 'var(--text-dim)'
                    }}
                  >
                    <Tag size={16} />
                  </div>
                  <input
                    type="text"
                    className="glass-input"
                    placeholder="Marketing, Social, Q3"
                    value={tagsInput}
                    onChange={(e) => setTagsInput(e.target.value)}
                    style={{ paddingLeft: '2.5rem' }}
                  />
                </div>
              </div>

              {/* Notes */}
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem' }}>
                  Notes & Internal Memo
                </label>
                <div style={{ position: 'relative' }}>
                  <div
                    style={{
                      position: 'absolute',
                      left: '12px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      color: 'var(--text-dim)'
                    }}
                  >
                    <FileText size={16} />
                  </div>
                  <input
                    type="text"
                    className="glass-input"
                    placeholder="Target audience details..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    style={{ paddingLeft: '2.5rem' }}
                  />
                </div>
              </div>
            </div>
          )}
        </form>
      </div>

      {/* Latest Result Card display */}
      {latestCreatedUrl && <ResultCard urlObj={latestCreatedUrl} />}
    </div>
  );
};
