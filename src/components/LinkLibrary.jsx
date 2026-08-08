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
  Tag, 
  FolderKanban,
  Edit2,
  X,
  FileSpreadsheet
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
  const [selectedTag, setSelectedTag] = useState('ALL');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [copiedId, setCopiedId] = useState(null);

  // Extract all unique tags
  const allTags = Array.from(new Set(urls.flatMap((u) => u.tags || [])));

  // Filter links
  const filteredUrls = urls.filter((u) => {
    const matchesSearch =
      u.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.shortCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.longUrl.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesTag = selectedTag === 'ALL' || (u.tags && u.tags.includes(selectedTag));

    let matchesStatus = true;
    const isExpired = u.expiresAt && new Date(u.expiresAt) < new Date();
    if (statusFilter === 'ACTIVE') matchesStatus = !isExpired;
    if (statusFilter === 'EXPIRED') matchesStatus = isExpired;
    if (statusFilter === 'PROTECTED') matchesStatus = !!u.password;

    return matchesSearch && matchesTag && matchesStatus;
  });

  const handleCopy = (id, shortUrl) => {
    navigator.clipboard.writeText(shortUrl);
    setCopiedId(id);
    addToast('Copied short URL to clipboard', 'success');
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleInspectAnalytics = (id) => {
    setSelectedUrlForAnalytics(id);
    setActiveTab('analytics');
  };

  return (
    <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '2rem 1.5rem' }}>
      {/* Header Banner */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#fff', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <FolderKanban size={28} color="#818cf8" /> Link Library & Management
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginTop: '0.25rem' }}>
            Manage, organize, filter and analyze all your created short URLs in one place.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <button className="btn-secondary" onClick={() => exportData('csv')}>
            <FileSpreadsheet size={16} color="#10b981" /> Export CSV
          </button>
          <button className="btn-primary" onClick={() => setActiveTab('shortener')}>
            + Create New Link
          </button>
        </div>
      </div>

      {/* Filter Toolbar Box */}
      <div
        className="glass-panel"
        style={{
          padding: '1.25rem 1.5rem',
          marginBottom: '1.5rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem'
        }}
      >
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
          {/* Search bar */}
          <div style={{ position: 'relative', flex: 1, minWidth: '240px' }}>
            <div style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-dim)' }}>
              <Search size={18} />
            </div>
            <input
              type="text"
              className="glass-input"
              placeholder="Search by title, custom alias, or target URL..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ paddingLeft: '2.5rem' }}
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                style={{
                  position: 'absolute',
                  right: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  color: 'var(--text-muted)',
                  cursor: 'pointer'
                }}
              >
                <X size={14} />
              </button>
            )}
          </div>

          {/* Status Dropdown Filter */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Filter size={16} color="var(--text-dim)" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="glass-input"
              style={{ minWidth: '160px', cursor: 'pointer' }}
            >
              <option value="ALL">All Link Statuses</option>
              <option value="ACTIVE">Active Only</option>
              <option value="PROTECTED">Passcode Protected</option>
              <option value="EXPIRED">Expired Links</option>
            </select>
          </div>
        </div>

        {/* Tags Selector Row */}
        {allTags.length > 0 && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap', paddingTop: '0.5rem', borderTop: '1px solid rgba(255, 255, 255, 0.05)' }}>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-dim)', fontWeight: 600 }}>Filter Tag:</span>
            <button
              onClick={() => setSelectedTag('ALL')}
              style={{
                background: selectedTag === 'ALL' ? 'rgba(99, 102, 241, 0.2)' : 'rgba(255, 255, 255, 0.04)',
                color: selectedTag === 'ALL' ? '#818cf8' : 'var(--text-muted)',
                border: selectedTag === 'ALL' ? '1px solid rgba(99, 102, 241, 0.4)' : '1px solid var(--border-color)',
                padding: '0.2rem 0.65rem',
                borderRadius: '999px',
                fontSize: '0.75rem',
                cursor: 'pointer'
              }}
            >
              All Tags
            </button>

            {allTags.map((t) => (
              <button
                key={t}
                onClick={() => setSelectedTag(t)}
                style={{
                  background: selectedTag === t ? 'rgba(6, 182, 212, 0.2)' : 'rgba(255, 255, 255, 0.04)',
                  color: selectedTag === t ? '#22d3ee' : 'var(--text-muted)',
                  border: selectedTag === t ? '1px solid rgba(6, 182, 212, 0.4)' : '1px solid var(--border-color)',
                  padding: '0.2rem 0.65rem',
                  borderRadius: '999px',
                  fontSize: '0.75rem',
                  cursor: 'pointer'
                }}
              >
                #{t}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Main Table / Grid View */}
      {filteredUrls.length === 0 ? (
        <div className="glass-panel" style={{ padding: '4rem 2rem', textAlign: 'center' }}>
          <FolderKanban size={48} color="var(--text-dim)" style={{ marginBottom: '1rem', opacity: 0.5 }} />
          <h3 style={{ fontSize: '1.2rem', fontWeight: 600, color: 'var(--text-muted)' }}>No short links match your filter criteria</h3>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-dim)', marginTop: '0.25rem' }}>
            Try adjusting your search terms or create a new link.
          </p>
        </div>
      ) : (
        <div style={{ display: 'grid', gap: '1rem' }}>
          {filteredUrls.map((url) => {
            const isExpired = url.expiresAt && new Date(url.expiresAt) < new Date();

            return (
              <div
                key={url.id}
                className="glass-panel"
                style={{
                  padding: '1.25rem 1.5rem',
                  display: 'grid',
                  gridTemplateColumns: '1fr auto',
                  gap: '1.25rem',
                  alignItems: 'center'
                }}
              >
                {/* Info Column */}
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '0.4rem' }}>
                    <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#fff' }}>{url.title}</h3>

                    {url.password && (
                      <span className="badge badge-amber">
                        <Lock size={10} /> Protected
                      </span>
                    )}

                    {isExpired ? (
                      <span className="badge badge-rose">
                        <Clock size={10} /> Expired
                      </span>
                    ) : (
                      <span className="badge badge-emerald">Active</span>
                    )}

                    {url.tags && url.tags.map((t) => (
                      <span
                        key={t}
                        style={{
                          fontSize: '0.72rem',
                          background: 'rgba(255, 255, 255, 0.05)',
                          color: 'var(--text-muted)',
                          padding: '0.15rem 0.5rem',
                          borderRadius: '6px'
                        }}
                      >
                        #{t}
                      </span>
                    ))}
                  </div>

                  {/* Short Link & Target */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap', fontSize: '0.9rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span
                        style={{
                          fontFamily: 'var(--font-mono)',
                          fontWeight: 700,
                          color: '#38bdf8'
                        }}
                      >
                        {url.shortUrl}
                      </span>

                      <button
                        onClick={() => handleCopy(url.id, url.shortUrl)}
                        style={{
                          background: 'none',
                          border: 'none',
                          color: copiedId === url.id ? '#10b981' : 'var(--text-muted)',
                          cursor: 'pointer',
                          display: 'flex'
                        }}
                        title="Copy Short URL"
                      >
                        {copiedId === url.id ? <Check size={16} /> : <Copy size={16} />}
                      </button>
                    </div>

                    <span style={{ color: 'var(--text-dim)', fontSize: '0.8rem', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '380px', whiteSpace: 'nowrap' }}>
                      &rarr; {url.longUrl}
                    </span>
                  </div>

                  {/* Meta Bar */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', marginTop: '0.6rem', fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                    <span>Created: {new Date(url.createdAt).toLocaleDateString()}</span>
                    <span>•</span>
                    <span style={{ color: '#34d399', fontWeight: 600 }}>{url.clicks} Total Clicks</span>
                    {url.notes && (
                      <>
                        <span>•</span>
                        <span style={{ fontStyle: 'italic', color: 'var(--text-dim)' }}>"{url.notes}"</span>
                      </>
                    )}
                  </div>
                </div>

                {/* Actions Button Bar */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                  <button
                    className="btn-icon"
                    onClick={() => setActiveQrModalUrl(url)}
                    title="QR Code Customizer"
                  >
                    <QrCode size={16} color="#06b6d4" />
                  </button>

                  <button
                    className="btn-icon"
                    onClick={() => handleInspectAnalytics(url.id)}
                    title="Inspect Detailed Analytics"
                  >
                    <BarChart3 size={16} color="#818cf8" />
                  </button>

                  <button
                    className="btn-icon"
                    onClick={() => setActiveTab('simulator')}
                    title="Test Redirection in Simulator"
                  >
                    <Compass size={16} color="#34d399" />
                  </button>

                  <button
                    className="btn-icon"
                    onClick={() => window.open(url.longUrl, '_blank')}
                    title="Visit Destination"
                  >
                    <ExternalLink size={16} />
                  </button>

                  <button
                    className="btn-icon"
                    onClick={() => deleteUrl(url.id)}
                    title="Delete Link"
                    style={{ color: '#f43f5e', borderColor: 'rgba(244, 63, 94, 0.2)' }}
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
