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
  Sparkles,
  Compass
} from 'lucide-react';

export const ResultCard = ({ urlObj }) => {
  const { addToast, setActiveQrModalUrl, setActiveTab } = useUrl();
  const [copied, setCopied] = useState(false);

  if (!urlObj) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(urlObj.shortUrl);
    setCopied(true);
    addToast('Link copied to clipboard!', 'success');
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
      className="google-card animate-fade-in"
      style={{
        padding: '1.75rem',
        marginTop: '1.5rem',
        background: '#ffffff',
        border: '1px solid #c2e7ff'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Sparkles size={18} color="#0b57d0" />
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#1f1f1f' }}>
            Your Shortened URL is Ready!
          </h3>
        </div>
        <span className="google-badge badge-green">Active</span>
      </div>

      {/* Main Short URL Box */}
      <div
        style={{
          background: '#f8f9fa',
          border: '1px solid #dadce0',
          borderRadius: '16px',
          padding: '1.25rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1rem',
          marginBottom: '1.25rem'
        }}
      >
        <div style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>
          <div style={{ fontSize: '0.78rem', color: '#747775', marginBottom: '0.2rem' }}>
            Original Destination: <span style={{ color: '#444746' }}>{urlObj.longUrl}</span>
          </div>
          <div
            style={{
              fontSize: '1.4rem',
              fontWeight: 700,
              color: '#0b57d0',
              fontFamily: 'var(--font-mono)'
            }}
          >
            {urlObj.shortUrl}
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <button
            onClick={handleCopy}
            className="btn-google"
            style={{
              padding: '0.65rem 1.35rem',
              fontSize: '0.9rem',
              background: copied ? '#146c2e' : undefined
            }}
          >
            {copied ? <Check size={16} /> : <Copy size={16} />}
            <span>{copied ? 'Copied' : 'Copy Link'}</span>
          </button>

          <button
            onClick={() => setActiveQrModalUrl(urlObj)}
            className="btn-google-outlined"
            title="QR Code Studio"
          >
            <QrCode size={18} />
            <span>QR Code</span>
          </button>
        </div>
      </div>

      {/* Details Row */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1rem',
          fontSize: '0.85rem',
          color: '#444746'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
          {urlObj.password && (
            <span className="google-badge badge-blue">
              <Lock size={12} /> Passcode Protected
            </span>
          )}
          {urlObj.expiresAt && (
            <span className="google-badge badge-red">
              <Clock size={12} /> Expiring
            </span>
          )}
        </div>

        {/* Action Shortcuts */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <button
            onClick={() => setActiveTab('simulator')}
            style={{
              background: 'none',
              border: 'none',
              color: '#0b57d0',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.35rem',
              fontWeight: 500,
              fontSize: '0.85rem'
            }}
          >
            <Compass size={14} /> Test in Simulator
          </button>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
            <button
              onClick={() => handleShare('twitter')}
              style={{
                background: '#f1f3f4',
                border: 'none',
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#444746',
                cursor: 'pointer'
              }}
              title="Share on Twitter"
            >
              <Share2 size={14} />
            </button>
            <button
              onClick={() => window.open(urlObj.longUrl, '_blank')}
              style={{
                background: '#f1f3f4',
                border: 'none',
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#444746',
                cursor: 'pointer'
              }}
              title="Visit Destination URL"
            >
              <ExternalLink size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
