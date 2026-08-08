import React, { useState, useRef } from 'react';
import { useUrl } from '../context/UrlContext';
import { QRCodeCanvas, QRCodeSVG } from 'qrcode.react';
import { X, Download, QrCode, Palette, Sparkles, Copy, Check } from 'lucide-react';

export const QRModal = () => {
  const { activeQrModalUrl, setActiveQrModalUrl, addToast } = useUrl();

  const [fgColor, setFgColor] = useState('#6366f1');
  const [bgColor, setBgColor] = useState('#ffffff');
  const [size, setSize] = useState(240);
  const [includeMargin, setIncludeMargin] = useState(true);
  const [copied, setCopied] = useState(false);

  const canvasRef = useRef(null);

  if (!activeQrModalUrl) return null;

  const handleDownloadPNG = () => {
    const canvas = document.getElementById('qr-modal-canvas');
    if (!canvas) return;
    const pngUrl = canvas.toDataURL('image/png').replace('image/png', 'image/octet-stream');
    const downloadLink = document.createElement('a');
    downloadLink.href = pngUrl;
    downloadLink.download = `qrcode_${activeQrModalUrl.shortCode}.png`;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
    addToast('Downloaded QR Code as PNG image', 'success');
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(activeQrModalUrl.shortUrl);
    setCopied(true);
    addToast('Copied short URL to clipboard', 'success');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        background: 'rgba(0, 0, 0, 0.75)',
        backdropFilter: 'blur(10px)',
        zIndex: 9990,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem'
      }}
      onClick={() => setActiveQrModalUrl(null)}
    >
      <div
        className="glass-panel animate-fade-in"
        style={{
          maxWidth: '520px',
          width: '100%',
          padding: '2rem',
          position: 'relative',
          background: 'rgba(18, 24, 38, 0.95)',
          border: '1px solid rgba(99, 102, 241, 0.4)'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={() => setActiveQrModalUrl(null)}
          style={{
            position: 'absolute',
            right: '1.25rem',
            top: '1.25rem',
            background: 'rgba(255, 255, 255, 0.06)',
            border: '1px solid var(--border-color)',
            color: 'var(--text-muted)',
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <X size={16} />
        </button>

        {/* Title */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1rem' }}>
          <QrCode size={24} color="#06b6d4" />
          <h2 style={{ fontSize: '1.3rem', fontWeight: 700, color: '#fff' }}>
            Custom QR Code Studio
          </h2>
        </div>

        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
          Customize styles, colors, and download print-ready QR codes for <strong>{activeQrModalUrl.shortUrl}</strong>.
        </p>

        {/* QR Code Render Box */}
        <div
          style={{
            background: bgColor,
            padding: '1.5rem',
            borderRadius: '16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1.5rem auto',
            boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
            width: 'fit-content'
          }}
        >
          <QRCodeCanvas
            id="qr-modal-canvas"
            value={activeQrModalUrl.shortUrl}
            size={size}
            fgColor={fgColor}
            bgColor={bgColor}
            includeMargin={includeMargin}
            level="H"
          />
        </div>

        {/* Style Controls */}
        <div
          style={{
            background: 'rgba(10, 15, 26, 0.6)',
            padding: '1rem 1.25rem',
            borderRadius: '12px',
            border: '1px solid rgba(255, 255, 255, 0.06)',
            marginBottom: '1.5rem',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '1rem'
          }}
        >
          {/* Fg Color */}
          <div>
            <label style={{ display: 'block', fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '0.3rem', fontWeight: 600 }}>
              QR Code Color
            </label>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <input
                type="color"
                value={fgColor}
                onChange={(e) => setFgColor(e.target.value)}
                style={{ width: '36px', height: '36px', border: 'none', borderRadius: '8px', cursor: 'pointer', background: 'transparent' }}
              />
              <span style={{ fontSize: '0.82rem', color: '#fff', fontFamily: 'var(--font-mono)' }}>{fgColor}</span>
            </div>
          </div>

          {/* Bg Color */}
          <div>
            <label style={{ display: 'block', fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '0.3rem', fontWeight: 600 }}>
              Background Color
            </label>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <input
                type="color"
                value={bgColor}
                onChange={(e) => setBgColor(e.target.value)}
                style={{ width: '36px', height: '36px', border: 'none', borderRadius: '8px', cursor: 'pointer', background: 'transparent' }}
              />
              <span style={{ fontSize: '0.82rem', color: '#fff', fontFamily: 'var(--font-mono)' }}>{bgColor}</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <button className="btn-primary" onClick={handleDownloadPNG} style={{ flex: 1 }}>
            <Download size={18} /> Download PNG
          </button>
          <button className="btn-secondary" onClick={handleCopyLink} style={{ flex: 1 }}>
            {copied ? <Check size={16} color="#10b981" /> : <Copy size={16} />}
            <span>{copied ? 'Copied' : 'Copy Link'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
