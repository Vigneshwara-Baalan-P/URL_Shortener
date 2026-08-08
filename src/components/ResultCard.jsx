import React, { useState } from 'react';
import { useUrl } from '../context/UrlContext';
import { 
  Copy, 
  Check, 
  QrCode, 
  ExternalLink, 
  Share2, 
  Lock, 
  Clock, 
  Tag, 
  Sparkles,
  Compass
} from 'lucide-react';

export const ResultCard = ({ urlObj }) => {
  const { addToast, setActiveQrModalUrl, setActiveTab, setSelectedUrlForAnalytics } = useUrl();
  const [copied, setCopied] = useState(false);

  if (!urlObj) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(urlObj.shortUrl);
    setCopied(true);
    addToast('Short link copied to clipboard!', 'success');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = (platform) => {
    const text = encodeURIComponent(`Check out this link: ${urlObj.shortUrl}`);
    let shareUrl = '';
    if (platform === 'twitter') {
      shareUrl = `https://twitter.com/intent/tweet?text=${text}`;
    } else if (platform === 'linkedin') {
      shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(urlObj.shortUrl)}`;
    } else if (platform === 'whatsapp') {
      shareUrl = `https://api.whatsapp.com/send?text=${text}`;
    }
    if (shareUrl) window.open(shareUrl, '_blank');
  };

  return (
    <div
      className="glass-panel animate-fade-in"
      style={{
        padding: '1.75rem',
        marginTop: '1.5rem',
        background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(6, 182, 212, 0.08) 100%)',
        border: '1px solid rgba(99, 102, 241, 0.3)',
        borderRadius: '20px',
        boxShadow: '0 12px 35px rgba(99, 102, 241, 0.15)'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Sparkles size={18} color="#818cf8" />
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#fff' }}>
            Shortened Link Created!
          </h3>
        </div>
        <span className="badge badge-emerald">
          <Check size={12} /> Active
        </span>
      </div>

      {/* Main Short URL Banner Box */}
      <div
        style={{
          background: 'rgba(10, 15, 26, 0.85)',
          border: '1px solid rgba(255, 255, 255, 0.12)',
          borderRadius: '14px',
          padding: '1rem 1.25rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1rem',
          marginBottom: '1.25rem'
        }}
      >
        <div style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)', marginBottom: '0.2rem' }}>
            Destination: <span style={{ color: 'var(--text-muted)' }}>{urlObj.longUrl}</span>
          </div>
          <div
            style={{
              fontSize: '1.35rem',
              fontWeight: 700,
              color: '#38bdf8',
              fontFamily: 'var(--font-mono)',
              letterSpacing: '-0.3px'
            }}
          >
            {urlObj.shortUrl}
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <button
            onClick={handleCopy}
            className="btn-primary"
            style={{
              padding: '0.65rem 1.25rem',
              fontSize: '0.9rem',
              background: copied ? '#10b981' : undefined
            }}
          >
            {copied ? <Check size={16} /> : <Copy size={16} />}
            <span>{copied ? 'Copied!' : 'Copy Link'}</span>
          </button>

          <button
            onClick={() => setActiveQrModalUrl(urlObj)}
            className="btn-secondary"
            title="Generate & Customize QR Code"
          >
            <QrCode size={18} color="#06b6d4" />
            <span style={{ fontSize: '0.85rem' }}>QR Code</span>
          </button>
        </div>
      </div>

      {/* Details Meta Row & Quick Actions */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1rem',
          fontSize: '0.85rem',
          color: 'var(--text-muted)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
          {urlObj.password && (
            <span className="badge badge-amber" title="Passcode Protected">
              <Lock size={12} /> Protected
            </span>
          )}
          {urlObj.expiresAt && (
            <span className="badge badge-rose" title={`Expires on ${new Date(urlObj.expiresAt).toLocaleDateString()}`}>
              <Clock size={12} /> Expiring
            </span>
          )}
          {urlObj.tags && urlObj.tags.length > 0 && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Tag size={14} color="#818cf8" />
              {urlObj.tags.map((t, idx) => (
                <span
                  key={idx}
                  style={{
                    background: 'rgba(255,255,255,0.06)',
                    padding: '0.15rem 0.5rem',
                    borderRadius: '6px',
                    fontSize: '0.75rem'
                  }}
                >
                  #{t}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Action Shortcuts */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <button
            onClick={() => {
              setActiveTab('simulator');
            }}
            style={{
              background: 'none',
              border: 'none',
              color: '#06b6d4',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.35rem',
              fontWeight: 500
            }}
          >
            <Compass size={14} /> Test in Simulator
          </button>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>Share:</span>
            <button className="btn-icon" onClick={() => handleShare('twitter')} title="Share on Twitter / X">
              <Share2 size={14} />
            </button>
            <button className="btn-icon" onClick={() => window.open(urlObj.longUrl, '_blank')} title="Open target website directly">
              <ExternalLink size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
