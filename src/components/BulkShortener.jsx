import React, { useState } from 'react';
import { useUrl } from '../context/UrlContext';
import { Layers, Upload, ArrowRight, Sparkles, FileText, CheckCircle2 } from 'lucide-react';

export const BulkShortener = () => {
  const { addBulkUrls, addToast, setActiveTab } = useUrl();

  const [textInput, setTextInput] = useState('');
  const [createdCount, setCreatedCount] = useState(null);

  const handleSampleFill = () => {
    const samples = [
      'https://github.com/facebook/react',
      'https://developer.mozilla.org/en-US/docs/Web/JavaScript',
      'https://tailwindcss.com/docs/installation',
      'https://vitejs.dev/guide/',
      'https://news.ycombinator.com/'
    ].join('\n');
    setTextInput(samples);
  };

  const handleShortenBatch = (e) => {
    e.preventDefault();
    if (!textInput.trim()) {
      addToast('Please enter at least one URL', 'error');
      return;
    }

    const lines = textInput
      .split('\n')
      .map((l) => l.trim())
      .filter((l) => l.length > 0);

    if (lines.length === 0) return;

    addBulkUrls(lines);
    setCreatedCount(lines.length);
    setTextInput('');
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target.result;
      const lines = content
        .split(/\r?\n/)
        .map((l) => l.trim())
        .filter((l) => l.length > 0);
      setTextInput(lines.join('\n'));
      addToast(`Loaded ${lines.length} lines from CSV/Text file`, 'info');
    };
    reader.readAsText(file);
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
            background: 'rgba(168, 85, 247, 0.12)',
            border: '1px solid rgba(168, 85, 247, 0.25)',
            color: '#c084fc',
            fontSize: '0.85rem',
            fontWeight: 600,
            marginBottom: '1rem'
          }}
        >
          <Layers size={14} /> Batch Processing Studio
        </div>

        <h1 style={{ fontSize: '2.2rem', fontWeight: 800, color: '#fff', marginBottom: '0.5rem' }}>
          Bulk <span className="gradient-text">URL Shortener</span>
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', maxWidth: '520px', margin: '0 auto' }}>
          Shorten up to 20 web addresses at once. Paste multiple URLs or upload a text/CSV document.
        </p>
      </div>

      {/* Form Card */}
      <div className="glass-panel" style={{ padding: '2rem' }}>
        <form onSubmit={handleShortenBatch}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
            <label style={{ fontSize: '0.9rem', fontWeight: 600, color: '#fff' }}>
              Paste Destination URLs (One per line)
            </label>
            <button
              type="button"
              onClick={handleSampleFill}
              style={{
                background: 'none',
                border: 'none',
                color: '#38bdf8',
                fontSize: '0.8rem',
                cursor: 'pointer',
                fontWeight: 500
              }}
            >
              + Fill Demo Links
            </button>
          </div>

          <textarea
            className="glass-input"
            rows={8}
            placeholder="https://example.com/page1&#10;https://example.com/page2&#10;https://example.com/page3"
            value={textInput}
            onChange={(e) => setTextInput(e.target.value)}
            style={{
              width: '100%',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.9rem',
              lineHeight: 1.6,
              marginBottom: '1.25rem',
              resize: 'vertical'
            }}
          />

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
            {/* File Upload Button */}
            <label
              className="btn-secondary"
              style={{ cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}
            >
              <Upload size={16} color="#c084fc" />
              <span>Import CSV / TXT File</span>
              <input type="file" accept=".txt,.csv" onChange={handleFileUpload} style={{ display: 'none' }} />
            </label>

            <button type="submit" className="btn-primary" style={{ padding: '0.75rem 2rem' }}>
              <span>Shorten Batch</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </form>
      </div>

      {/* Success Notification */}
      {createdCount !== null && (
        <div
          className="glass-panel animate-fade-in"
          style={{
            padding: '1.5rem',
            marginTop: '1.5rem',
            background: 'rgba(16, 185, 129, 0.1)',
            border: '1px solid rgba(16, 185, 129, 0.3)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <CheckCircle2 size={24} color="#34d399" />
            <div>
              <h4 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#fff' }}>
                Successfully Shortened {createdCount} Links!
              </h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                View and manage your newly generated links in the Link Library.
              </p>
            </div>
          </div>

          <button className="btn-primary" onClick={() => setActiveTab('library')}>
            Open Link Library
          </button>
        </div>
      )}
    </div>
  );
};
