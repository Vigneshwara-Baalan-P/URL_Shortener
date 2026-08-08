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
  ArrowRight,
  Target
} from 'lucide-react';

export const URLShortener = () => {
  const { addUrl, addToast } = useUrl();

  const [longUrl, setLongUrl] = useState('');
  const [customSlug, setCustomSlug] = useState('');
  const [title, setTitle] = useState('');
  const [password, setPassword] = useState('');
  const [expiresAt, setExpiresAt] = useState('');
  const [tagsInput, setTagsInput] = useState('');

  // UTM Parameters
  const [showUtmBuilder, setShowUtmBuilder] = useState(false);
  const [utmSource, setUtmSource] = useState('');
  const [utmMedium, setUtmMedium] = useState('');
  const [utmCampaign, setUtmCampaign] = useState('');

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

  const getFinalDestinationUrl = () => {
    let base = longUrl.trim();
    if (!base) return '';
    if (!/^https?:\/\//i.test(base)) {
      base = 'https://' + base;
    }

    if (utmSource || utmMedium || utmCampaign) {
      try {
        const urlObj = new URL(base);
        if (utmSource) urlObj.searchParams.set('utm_source', utmSource.trim());
        if (utmMedium) urlObj.searchParams.set('utm_medium', utmMedium.trim());
        if (utmCampaign) urlObj.searchParams.set('utm_campaign', utmCampaign.trim());
        return urlObj.toString();
      } catch (e) {
        return base;
      }
    }
    return base;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!longUrl.trim()) {
      addToast('Please enter a valid URL', 'error');
      return;
    }

    const finalTargetUrl = getFinalDestinationUrl();
    const tags = tagsInput.split(',').map((t) => t.trim()).filter((t) => t.length > 0);

    const created = addUrl({
      longUrl: finalTargetUrl,
      customSlug,
      title,
      tags,
      password,
      expiresAt
    });

    if (created) {
      setLatestCreatedUrl(created);
      setLongUrl('');
      setCustomSlug('');
      setTitle('');
      setPassword('');
      setExpiresAt('');
      setTagsInput('');
      setUtmSource('');
      setUtmMedium('');
      setUtmCampaign('');
    }
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '2.5rem 1rem' }}>
      {/* Google Hero Banner */}
      <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
        <h1
          style={{
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            fontWeight: 700,
            color: '#1f1f1f',
            letterSpacing: '-0.5px',
            lineHeight: 1.2,
            marginBottom: '0.75rem'
          }}
        >
          Paste the URL to be shortened
        </h1>
        <p style={{ color: '#444746', fontSize: '1rem', maxWidth: '520px', margin: '0 auto' }}>
          Create trackable short links, QR codes, custom aliases and password security in seconds.
        </p>
      </div>

      {/* Google Material Input Card */}
      <div className="google-card" style={{ padding: '2rem' }}>
        <form onSubmit={handleSubmit}>
          {/* Main URL Input Group */}
          <div style={{ marginBottom: '1.25rem' }}>
            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
              <div style={{ position: 'relative', flex: 1, minWidth: '280px' }}>
                <div
                  style={{
                    position: 'absolute',
                    left: '16px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: '#5f6368',
                    display: 'flex'
                  }}
                >
                  <Link2 size={20} />
                </div>

                <input
                  type="text"
                  className="google-input"
                  placeholder="https://example.com/long-url"
                  value={longUrl}
                  onChange={(e) => setLongUrl(e.target.value)}
                  style={{
                    paddingLeft: '3rem',
                    paddingRight: '4.5rem',
                    borderRadius: '28px',
                    height: '54px',
                    fontSize: '1rem'
                  }}
                  required
                />

                <button
                  type="button"
                  onClick={handlePaste}
                  style={{
                    position: 'absolute',
                    right: '12px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: '#f1f3f4',
                    border: 'none',
                    color: '#444746',
                    padding: '0.35rem 0.75rem',
                    borderRadius: '16px',
                    fontSize: '0.78rem',
                    fontWeight: 500,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.3rem'
                  }}
                >
                  <Clipboard size={12} /> Paste
                </button>
              </div>

              <button type="submit" className="btn-google" style={{ height: '54px', padding: '0 2.25rem' }}>
                <span>Shorten</span>
                <ArrowRight size={18} />
              </button>
            </div>
          </div>

          {/* Toggle buttons row */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginTop: '1rem' }}>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <button
                type="button"
                onClick={() => setShowAdvanced(!showAdvanced)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: showAdvanced ? '#0b57d0' : '#444746',
                  fontSize: '0.88rem',
                  fontWeight: 500,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem'
                }}
              >
                <SlidersHorizontal size={16} />
                <span>{showAdvanced ? 'Hide Custom Options' : 'Custom Alias, Passcode & Expiry'}</span>
              </button>

              <button
                type="button"
                onClick={() => setShowUtmBuilder(!showUtmBuilder)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: showUtmBuilder ? '#0b57d0' : '#444746',
                  fontSize: '0.88rem',
                  fontWeight: 500,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem'
                }}
              >
                <Target size={16} />
                <span>{showUtmBuilder ? 'Hide UTM Builder' : 'UTM Campaign Builder'}</span>
              </button>
            </div>

            <span style={{ fontSize: '0.8rem', color: '#747775' }}>Domain: snap.link/</span>
          </div>

          {/* UTM Builder Box */}
          {showUtmBuilder && (
            <div
              className="animate-fade-in"
              style={{
                marginTop: '1.25rem',
                padding: '1.25rem',
                borderRadius: '16px',
                background: '#f8f9fa',
                border: '1px solid #dadce0',
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '1rem'
              }}
            >
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#0b57d0', marginBottom: '0.3rem' }}>
                  UTM Source
                </label>
                <input
                  type="text"
                  className="google-input"
                  placeholder="google, newsletter, twitter"
                  value={utmSource}
                  onChange={(e) => setUtmSource(e.target.value)}
                  style={{ fontSize: '0.85rem' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#0b57d0', marginBottom: '0.3rem' }}>
                  UTM Medium
                </label>
                <input
                  type="text"
                  className="google-input"
                  placeholder="cpc, banner, email"
                  value={utmMedium}
                  onChange={(e) => setUtmMedium(e.target.value)}
                  style={{ fontSize: '0.85rem' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#0b57d0', marginBottom: '0.3rem' }}>
                  UTM Campaign
                </label>
                <input
                  type="text"
                  className="google-input"
                  placeholder="summer_sale, promo"
                  value={utmCampaign}
                  onChange={(e) => setUtmCampaign(e.target.value)}
                  style={{ fontSize: '0.85rem' }}
                />
              </div>
            </div>
          )}

          {/* Advanced Options Grid */}
          {showAdvanced && (
            <div
              className="animate-fade-in"
              style={{
                marginTop: '1.25rem',
                paddingTop: '1.25rem',
                borderTop: '1px solid #dadce0',
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                gap: '1.25rem'
              }}
            >
              {/* Custom Slug */}
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 500, color: '#1f1f1f', marginBottom: '0.4rem' }}>
                  Custom Alias (Slug)
                </label>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <span
                    style={{
                      background: '#f1f3f4',
                      border: '1px solid #dadce0',
                      borderRight: 'none',
                      padding: '0.85rem 0.75rem',
                      borderRadius: '16px 0 0 16px',
                      fontSize: '0.85rem',
                      color: '#5f6368'
                    }}
                  >
                    snap.link/
                  </span>
                  <input
                    type="text"
                    className="google-input"
                    placeholder="custom-slug"
                    value={customSlug}
                    onChange={(e) => setCustomSlug(e.target.value.replace(/[^a-zA-Z0-9_-]/g, ''))}
                    style={{ borderRadius: '0 16px 16px 0' }}
                  />
                </div>
              </div>

              {/* Passcode */}
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 500, color: '#1f1f1f', marginBottom: '0.4rem' }}>
                  Passcode Protection
                </label>
                <div style={{ position: 'relative' }}>
                  <div style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#5f6368' }}>
                    <Lock size={16} />
                  </div>
                  <input
                    type="password"
                    className="google-input"
                    placeholder="Enter passcode..."
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={{ paddingLeft: '2.5rem' }}
                  />
                </div>
              </div>

              {/* Expiration Date */}
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 500, color: '#1f1f1f', marginBottom: '0.4rem' }}>
                  Expiration Date
                </label>
                <div style={{ position: 'relative' }}>
                  <div style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#5f6368' }}>
                    <Calendar size={16} />
                  </div>
                  <input
                    type="datetime-local"
                    className="google-input"
                    value={expiresAt}
                    onChange={(e) => setExpiresAt(e.target.value)}
                    style={{ paddingLeft: '2.5rem' }}
                  />
                </div>
              </div>

              {/* Tags */}
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 500, color: '#1f1f1f', marginBottom: '0.4rem' }}>
                  Tags
                </label>
                <div style={{ position: 'relative' }}>
                  <div style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#5f6368' }}>
                    <Tag size={16} />
                  </div>
                  <input
                    type="text"
                    className="google-input"
                    placeholder="Marketing, Campaign"
                    value={tagsInput}
                    onChange={(e) => setTagsInput(e.target.value)}
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
