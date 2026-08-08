import React, { useState } from 'react';
import { useUrl } from '../context/UrlContext';
import { QRCodeCanvas } from 'qrcode.react';
import { X, Download, QrCode, Copy, Check } from 'lucide-react';

export const QRModal = () => {
  const { activeQrModalUrl, setActiveQrModalUrl, addToast } = useUrl();

  const [fgColor, setFgColor] = useState('#0b57d0');
  const [bgColor, setBgColor] = useState('#ffffff');
  const [copied, setCopied] = useState(false);

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
    addToast('Downloaded QR Code PNG image', 'success');
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(activeQrModalUrl.shortUrl);
    setCopied(true);
    addToast('Copied short URL', 'success');
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
        background: 'rgba(0, 0, 0, 0.4)',
        backdropFilter: 'blur(4px)',
        zIndex: 9990,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem'
      }}
      onClick={() => setActiveQrModalUrl(null)}
    >
      <div
        className="google-card animate-fade-in"
        style={{
          maxWidth: '460px',
          width: '100%',
          padding: '2rem',
          position: 'relative',
          background: '#ffffff'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={() => setActiveQrModalUrl(null)}
          style={{
            position: 'absolute',
            right: '1.25rem',
            top: '1.25rem',
            background: '#f1f3f4',
            border: 'none',
            color: '#444746',
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

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.5rem' }}>
          <QrCode size={24} color="#0b57d0" />
          <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#1f1f1f' }}>
            QR Code Generator
          </h2>
        </div>

        <p style={{ fontSize: '0.85rem', color: '#444746', marginBottom: '1.5rem' }}>
          Download QR code for <strong>{activeQrModalUrl.shortUrl}</strong>.
        </p>

        <div
          style={{
            background: bgColor,
            padding: '1.25rem',
            borderRadius: '16px',
            border: '1px solid #dadce0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1.5rem auto',
            width: 'fit-content'
          }}
        >
          <QRCodeCanvas
            id="qr-modal-canvas"
            value={activeQrModalUrl.shortUrl}
            size={220}
            fgColor={fgColor}
            bgColor={bgColor}
            includeMargin={true}
            level="H"
          />
        </div>

        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <button className="btn-google" onClick={handleDownloadPNG} style={{ flex: 1 }}>
            <Download size={18} /> Download PNG
          </button>
          <button className="btn-google-outlined" onClick={handleCopyLink} style={{ flex: 1 }}>
            {copied ? <Check size={16} color="#146c2e" /> : <Copy size={16} />}
            <span>{copied ? 'Copied' : 'Copy URL'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
