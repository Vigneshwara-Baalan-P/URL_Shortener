import React, { createContext, useContext, useState, useEffect } from 'react';
import confetti from 'canvas-confetti';

const UrlContext = createContext();

// Sample seed data so app looks alive immediately
const SEED_URLS = [
  {
    id: 'seed-1',
    title: 'React Documentation & Hooks Guide',
    longUrl: 'https://react.dev/reference/react/hooks',
    shortCode: 'react-docs',
    shortUrl: 'https://snap.link/react-docs',
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    clicks: 142,
    tags: ['Tech', 'React', 'Docs'],
    password: null,
    expiresAt: null,
    notes: 'Official reference for modern React hooks and server components.',
    clicksHistory: [
      { date: '2026-08-01', count: 12 },
      { date: '2026-08-02', count: 18 },
      { date: '2026-08-03', count: 25 },
      { date: '2026-08-04', count: 19 },
      { date: '2026-08-05', count: 28 },
      { date: '2026-08-06', count: 22 },
      { date: '2026-08-07', count: 18 }
    ],
    devices: { Desktop: 88, Mobile: 42, Tablet: 12 },
    referrers: { 'Direct / Bookmark': 50, 'Google Search': 45, 'GitHub': 32, 'Twitter / X': 15 },
    countries: { 'United States': 58, 'India': 34, 'Germany': 20, 'United Kingdom': 18, 'Japan': 12 }
  },
  {
    id: 'seed-2',
    title: 'Vite 5.0 Release Notes & Benchmarks',
    longUrl: 'https://vitejs.dev/blog/announcing-vite5.html',
    shortCode: 'vite-v5',
    shortUrl: 'https://snap.link/vite-v5',
    createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
    clicks: 89,
    tags: ['DevTools', 'Frontend'],
    password: null,
    expiresAt: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
    notes: 'Vite lightning fast dev server release announcement.',
    clicksHistory: [
      { date: '2026-08-04', count: 35 },
      { date: '2026-08-05', count: 24 },
      { date: '2026-08-06', count: 18 },
      { date: '2026-08-07', count: 12 }
    ],
    devices: { Desktop: 65, Mobile: 20, Tablet: 4 },
    referrers: { 'Twitter / X': 40, 'Direct / Bookmark': 25, 'Hacker News': 24 },
    countries: { 'United States': 32, 'Canada': 18, 'France': 15, 'India': 14, 'Brazil': 10 }
  },
  {
    id: 'seed-3',
    title: 'Secret Product Roadmap Q4 2026',
    longUrl: 'https://github.com/features/copilot',
    shortCode: 'q4-secret',
    shortUrl: 'https://snap.link/q4-secret',
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    clicks: 34,
    tags: ['Internal', 'Confidential'],
    password: 'pass123', // Password protected link example
    expiresAt: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
    notes: 'Passcode required: pass123',
    clicksHistory: [
      { date: '2026-08-06', count: 14 },
      { date: '2026-08-07', count: 20 }
    ],
    devices: { Desktop: 30, Mobile: 4, Tablet: 0 },
    referrers: { 'Internal Slack': 24, 'Direct / Bookmark': 10 },
    countries: { 'United States': 22, 'India': 8, 'United Kingdom': 4 }
  }
];

export const UrlProvider = ({ children }) => {
  const [urls, setUrls] = useState(() => {
    const saved = localStorage.getItem('snaplink_urls');
    return saved ? JSON.parse(saved) : SEED_URLS;
  });

  const [activeTab, setActiveTab] = useState('shortener'); // shortener, bulk, library, analytics, simulator
  const [selectedUrlForAnalytics, setSelectedUrlForAnalytics] = useState(null);
  const [activeQrModalUrl, setActiveQrModalUrl] = useState(null);
  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    localStorage.setItem('snaplink_urls', JSON.stringify(urls));
  }, [urls]);

  const addToast = (message, type = 'info') => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3500);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const triggerConfetti = () => {
    try {
      confetti({
        particleCount: 60,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (e) {
      console.log('Confetti effect');
    }
  };

  const generateShortCode = (length = 6) => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  };

  const addUrl = ({ longUrl, customSlug, title, tags, password, expiresAt, notes }) => {
    // Validate protocol
    let formattedLongUrl = longUrl.trim();
    if (!/^https?:\/\//i.test(formattedLongUrl)) {
      formattedLongUrl = 'https://' + formattedLongUrl;
    }

    const shortCode = customSlug?.trim() || generateShortCode();

    // Check slug collision
    if (urls.some((u) => u.shortCode.toLowerCase() === shortCode.toLowerCase())) {
      addToast(`Custom slug "${shortCode}" is already taken!`, 'error');
      return null;
    }

    // Try extracting domain for title if title is empty
    let autoTitle = title?.trim();
    if (!autoTitle) {
      try {
        const urlObj = new URL(formattedLongUrl);
        autoTitle = urlObj.hostname + urlObj.pathname.slice(0, 15);
      } catch (e) {
        autoTitle = formattedLongUrl.slice(0, 30);
      }
    }

    const todayStr = new Date().toISOString().split('T')[0];

    const newUrlObj = {
      id: 'link-' + Date.now(),
      title: autoTitle,
      longUrl: formattedLongUrl,
      shortCode,
      shortUrl: `https://snap.link/${shortCode}`,
      createdAt: new Date().toISOString(),
      clicks: 0,
      tags: tags || [],
      password: password?.trim() || null,
      expiresAt: expiresAt || null,
      notes: notes || '',
      clicksHistory: [{ date: todayStr, count: 0 }],
      devices: { Desktop: 0, Mobile: 0, Tablet: 0 },
      referrers: { 'Direct / Bookmark': 0, 'Google Search': 0, 'Social Media': 0 },
      countries: { 'United States': 0, 'India': 0, 'Germany': 0 }
    };

    setUrls((prev) => [newUrlObj, ...prev]);
    triggerConfetti();
    addToast(`Short URL snap.link/${shortCode} created successfully!`, 'success');
    return newUrlObj;
  };

  const addBulkUrls = (urlList) => {
    let createdCount = 0;
    const newItems = [];
    const todayStr = new Date().toISOString().split('T')[0];

    urlList.forEach((item) => {
      let raw = typeof item === 'string' ? item : item.longUrl;
      if (!raw) return;
      let formatted = raw.trim();
      if (!formatted) return;
      if (!/^https?:\/\//i.test(formatted)) {
        formatted = 'https://' + formatted;
      }

      let shortCode = (typeof item === 'object' && item.slug) ? item.slug.trim() : generateShortCode();

      // Ensure unique
      while (urls.some((u) => u.shortCode === shortCode) || newItems.some((u) => u.shortCode === shortCode)) {
        shortCode = generateShortCode();
      }

      let title = typeof item === 'object' && item.title ? item.title : formatted.slice(0, 30);

      newItems.push({
        id: 'link-' + Date.now() + '-' + Math.random().toString(36).substr(2, 4),
        title,
        longUrl: formatted,
        shortCode,
        shortUrl: `https://snap.link/${shortCode}`,
        createdAt: new Date().toISOString(),
        clicks: 0,
        tags: typeof item === 'object' && item.tags ? item.tags : ['Bulk'],
        password: null,
        expiresAt: null,
        notes: 'Bulk created link',
        clicksHistory: [{ date: todayStr, count: 0 }],
        devices: { Desktop: 0, Mobile: 0, Tablet: 0 },
        referrers: { Direct: 0 },
        countries: { Global: 0 }
      });
      createdCount++;
    });

    if (createdCount > 0) {
      setUrls((prev) => [...newItems, ...prev]);
      triggerConfetti();
      addToast(`Successfully created ${createdCount} short links in batch!`, 'success');
    }
  };

  const deleteUrl = (id) => {
    setUrls((prev) => prev.filter((u) => u.id !== id));
    addToast('Short link removed.', 'info');
  };

  const recordClick = (shortCode, meta = {}) => {
    const deviceTypes = ['Desktop', 'Mobile', 'Tablet'];
    const referrerSources = ['Direct / Bookmark', 'Google Search', 'Twitter / X', 'LinkedIn', 'GitHub'];
    const sampleCountries = ['United States', 'India', 'Germany', 'United Kingdom', 'Japan', 'Canada'];

    const chosenDevice = meta.device || deviceTypes[Math.floor(Math.random() * deviceTypes.length)];
    const chosenReferrer = meta.referrer || referrerSources[Math.floor(Math.random() * referrerSources.length)];
    const chosenCountry = meta.country || sampleCountries[Math.floor(Math.random() * sampleCountries.length)];

    const todayStr = new Date().toISOString().split('T')[0];

    setUrls((prev) =>
      prev.map((u) => {
        if (u.shortCode.toLowerCase() === shortCode.toLowerCase()) {
          const updatedHistory = [...(u.clicksHistory || [])];
          const todayEntry = updatedHistory.find((h) => h.date === todayStr);

          if (todayEntry) {
            todayEntry.count += 1;
          } else {
            updatedHistory.push({ date: todayStr, count: 1 });
          }

          const updatedDevices = { ...u.devices, [chosenDevice]: (u.devices?.[chosenDevice] || 0) + 1 };
          const updatedReferrers = { ...u.referrers, [chosenReferrer]: (u.referrers?.[chosenReferrer] || 0) + 1 };
          const updatedCountries = { ...u.countries, [chosenCountry]: (u.countries?.[chosenCountry] || 0) + 1 };

          return {
            ...u,
            clicks: u.clicks + 1,
            clicksHistory: updatedHistory,
            devices: updatedDevices,
            referrers: updatedReferrers,
            countries: updatedCountries
          };
        }
        return u;
      })
    );
  };

  const simulateRedirect = (shortCode, enteredPassword = '') => {
    const link = urls.find((u) => u.shortCode.toLowerCase() === shortCode.trim().toLowerCase());
    if (!link) {
      return { success: false, error: 'Link not found or code invalid.' };
    }

    if (link.expiresAt && new Date(link.expiresAt) < new Date()) {
      return { success: false, error: 'This short link has expired.', isExpired: true };
    }

    if (link.password && link.password !== enteredPassword) {
      return { success: false, error: 'Incorrect passcode required for this link.', needsPassword: true };
    }

    // Record the simulated click hit!
    recordClick(shortCode);

    return { success: true, targetUrl: link.longUrl, link };
  };

  const exportData = (type = 'json') => {
    if (type === 'json') {
      const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(urls, null, 2));
      const downloadAnchor = document.createElement('a');
      downloadAnchor.setAttribute('href', dataStr);
      downloadAnchor.setAttribute('download', `snaplink_export_${Date.now()}.json`);
      document.body.appendChild(downloadAnchor);
      downloadAnchor.click();
      downloadAnchor.remove();
      addToast('Exported links data as JSON file', 'success');
    } else if (type === 'csv') {
      const headers = ['Title', 'Short Code', 'Short URL', 'Destination URL', 'Clicks', 'Created At', 'Tags', 'Protected'];
      const rows = urls.map((u) => [
        `"${u.title.replace(/"/g, '""')}"`,
        u.shortCode,
        u.shortUrl,
        `"${u.longUrl}"`,
        u.clicks,
        u.createdAt,
        `"${(u.tags || []).join(',')}"`,
        u.password ? 'Yes' : 'No'
      ]);
      const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
      const encodedUri = encodeURI(csvContent);
      const linkAnchor = document.createElement('a');
      linkAnchor.setAttribute('href', encodedUri);
      linkAnchor.setAttribute('download', `snaplink_export_${Date.now()}.csv`);
      document.body.appendChild(linkAnchor);
      linkAnchor.click();
      linkAnchor.remove();
      addToast('Exported links data as CSV file', 'success');
    }
  };

  return (
    <UrlContext.Provider
      value={{
        urls,
        activeTab,
        setActiveTab,
        selectedUrlForAnalytics,
        setSelectedUrlForAnalytics,
        activeQrModalUrl,
        setActiveQrModalUrl,
        toasts,
        addToast,
        removeToast,
        addUrl,
        addBulkUrls,
        deleteUrl,
        recordClick,
        simulateRedirect,
        exportData
      }}
    >
      {children}
    </UrlContext.Provider>
  );
};

export const useUrl = () => useContext(UrlContext);
