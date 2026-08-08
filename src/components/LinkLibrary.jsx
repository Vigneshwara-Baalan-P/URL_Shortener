import React, { useState } from 'react';
import { useUrl } from '../context/UrlContext';
import { 
  Search, 
  Filter, 
  Copy, 
  Check, 
  QrCode, 
  BarChart3, 
  Trash2, 
  ExternalLink, 
  Lock, 
  Clock, 
  Compass, 
  FolderKanban,
  FileSpreadsheet,
  X
} from 'lucide-react';

export const LinkLibrary = () => {
  const { 
    urls, 
    deleteUrl, 
    addToast, 
    setActiveQrModalUrl, 
    setActiveTab, 
    setSelectedUrlForAnalytics,
    exportData 
  } = useUrl();

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [copiedId, setCopiedId] = useState(null);

  const filteredUrls = urls.filter((u) => {
    const matchesSearch =
      u.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.shortCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.longUrl.toLowerCase().includes(searchTerm.toLowerCase());

    let matchesStatus = true;
    const isExpired = u.expiresAt && new Date(u.expiresAt) < new Date();
    if (statusFilter === 'ACTIVE') matchesStatus = !isExpired;
    if (statusFilter === 'EXPIRED') matchesStatus = isExpired;
    if (statusFilter === 'PROTECTED') matchesStatus = !!u.password;

    return matchesSearch && matchesStatus;
  });

  const handleCopy = (id, shortUrl) => {
    navigator.clipboard.writeText(shortUrl);
    setCopiedId(id);
    addToast('Copied short URL to clipboard', 'success');
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem 1.5rem' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ fontSize: '1.8rem', fontWeight: 700, color: '#1f1f1f', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <FolderKanban size={26} color="#0b57d0" /> My Links & Short URLs
          </h1>
          <p style={{ color: '#444746', fontSize: '0.95rem', marginTop: '0.2rem' }}>
            Search, manage and analyze your generated short links.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <button className="btn-google-outlined" onClick={() => exportData('csv')}>
            <FileSpreadsheet size={16} /> Export CSV
          </button>
          <button className="btn-google" onClick={() => setActiveTab('shortener')}>
            + New Link
          </button>
        </div>
      </div>

      {/* Filter Box */}
      <div className="google-card" style={{ padding: '1.25rem 1.5rem', marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
          <div style={{ position: 'relative', flex: 1, minWidth: '240px' }}>
            <div style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#5f6368' }}>
              <Search size={18} />
            </div>
            <input
              type="text"
              className="google-input"
              placeholder="Search links by title, slug, or destination URL..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ paddingLeft: '2.75rem', borderRadius: '20px' }}
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                style={{
                  position: 'absolute',
                  right: '14px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  color: '#5f6368',
                  cursor: 'pointer'
                }}
              >
                <X size={14} />
              </button>
            )}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Filter size={16} color="#5f6368" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="google-input"
              style={{ minWidth: '160px', cursor: 'pointer', borderRadius: '20px' }}
            >
              <option value="ALL">All Statuses</option>
              <option value="ACTIVE">Active Only</option>
              <option value="PROTECTED">Passcode Protected</option>
              <option value="EXPIRED">Expired Links</option>
            </select>
          </div>
        </div>
      </div>

      {/* Links List */}
      {filteredUrls.length === 0 ? (
        <div className="google-card" style={{ padding: '4rem 2rem', textAlign: 'center' }}>
          <FolderKanban size={44} color="#747775" style={{ marginBottom: '1rem', opacity: 0.5 }} />
          <h3 style={{ fontSize: '1.1rem', fontWeight: 600, color: '#1f1f1f' }}>No short links found</h3>
          <p style={{ fontSize: '0.85rem', color: '#747775', marginTop: '0.25rem' }}>
            Create a new link to get started.
          </p>
        </div>
      ) : (
        <div style={{ display: 'grid', gap: '1rem' }}>
          {filteredUrls.map((url) => {
            const isExpired = url.expiresAt && new Date(url.expiresAt) < new Date();

            return (
              <div
                key={url.id}
                className="google-card"
                style={{
                  padding: '1.25rem 1.5rem',
                  display: 'grid',
                  gridTemplateColumns: '1fr auto',
                  gap: '1.25rem',
                  alignItems: 'center'
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '0.35rem' }}>
                    <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#1f1f1f' }}>{url.title}</h3>

                    {url.password && (
                      <span className="google-badge badge-blue">
                        <Lock size={10} /> Protected
                      </span>
                    )}

                    {isExpired ? (
                      <span className="google-badge badge-red">
                        <Clock size={10} /> Expired
                      </span>
                    ) : (
                      <span className="google-badge badge-green">Active</span>
                    )}
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap', fontSize: '0.9rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, color: '#0b57d0' }}>
                        {url.shortUrl}
                      </span>
                      <button
                        onClick={() => handleCopy(url.id, url.shortUrl)}
                        style={{ background: 'none', border: 'none', color: copiedId === url.id ? '#146c2e' : '#5f6368', cursor: 'pointer', display: 'flex' }}
                      >
                        {copiedId === url.id ? <Check size={16} /> : <Copy size={16} />}
                      </button>
                    </div>

                    <span style={{ color: '#5f6368', fontSize: '0.82rem', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '380px', whiteSpace: 'nowrap' }}>
                      &rarr; {url.longUrl}
                    </span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', marginTop: '0.5rem', fontSize: '0.78rem', color: '#747775' }}>
                    <span>Created: {new Date(url.createdAt).toLocaleDateString()}</span>
                    <span>•</span>
                    <span style={{ color: '#146c2e', fontWeight: 600 }}>{url.clicks} Clicks</span>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <button
                    onClick={() => setActiveQrModalUrl(url)}
                    style={{ background: '#f1f3f4', border: 'none', width: '36px', height: '36px', borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0b57d0' }}
                    title="QR Code Studio"
                  >
                    <QrCode size={16} />
                  </button>

                  <button
                    onClick={() => {
                      setSelectedUrlForAnalytics(url.id);
                      setActiveTab('analytics');
                    }}
                    style={{ background: '#f1f3f4', border: 'none', width: '36px', height: '36px', borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0b57d0' }}
                    title="Inspect Analytics"
                  >
                    <BarChart3 size={16} />
                  </button>

                  <button
                    onClick={() => setActiveTab('simulator')}
                    style={{ background: '#f1f3f4', border: 'none', width: '36px', height: '36px', borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#146c2e' }}
                    title="Test Redirection"
                  >
                    <Compass size={16} />
                  </button>

                  <button
                    onClick={() => window.open(url.longUrl, '_blank')}
                    style={{ background: '#f1f3f4', border: 'none', width: '36px', height: '36px', borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#444746' }}
                    title="Visit Destination"
                  >
                    <ExternalLink size={16} />
                  </button>

                  <button
                    onClick={() => deleteUrl(url.id)}
                    style={{ background: '#fce8e6', border: 'none', width: '36px', height: '36px', borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#b3261e' }}
                    title="Delete Link"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
