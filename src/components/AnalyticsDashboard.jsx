import React, { useState } from 'react';
import { useUrl } from '../context/UrlContext';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell, 
  BarChart, 
  Bar 
} from 'recharts';
import { 
  BarChart3, 
  MousePointerClick, 
  Link2, 
  Globe, 
  Smartphone, 
  Share2, 
  TrendingUp, 
  Filter,
  Sparkles
} from 'lucide-react';

export const AnalyticsDashboard = () => {
  const { urls, selectedUrlForAnalytics, setSelectedUrlForAnalytics } = useUrl();

  const [activeLinkId, setActiveLinkId] = useState(selectedUrlForAnalytics || 'ALL');

  // Selected object or global
  const selectedUrlObj = urls.find((u) => u.id === activeLinkId);

  // Compute aggregate stats
  const totalClicks = urls.reduce((sum, u) => sum + (u.clicks || 0), 0);
  const totalLinks = urls.length;
  const avgClicks = totalLinks > 0 ? (totalClicks / totalLinks).toFixed(1) : 0;

  // Find top link
  const topLink = urls.length > 0 ? [...urls].sort((a, b) => b.clicks - a.clicks)[0] : null;

  // Compile timeline data
  let chartTimeline = [];
  if (activeLinkId === 'ALL') {
    // Merge all clicks histories
    const historyMap = {};
    urls.forEach((u) => {
      (u.clicksHistory || []).forEach((h) => {
        historyMap[h.date] = (historyMap[h.date] || 0) + h.count;
      });
    });
    chartTimeline = Object.keys(historyMap)
      .sort()
      .map((date) => ({ date, clicks: historyMap[date] }));
  } else if (selectedUrlObj) {
    chartTimeline = selectedUrlObj.clicksHistory || [];
  }

  // Compile Device distribution data
  let deviceMap = {};
  if (activeLinkId === 'ALL') {
    urls.forEach((u) => {
      Object.entries(u.devices || {}).forEach(([dev, count]) => {
        deviceMap[dev] = (deviceMap[dev] || 0) + count;
      });
    });
  } else if (selectedUrlObj) {
    deviceMap = selectedUrlObj.devices || {};
  }
  const devicePieData = Object.entries(deviceMap).map(([name, value]) => ({ name, value }));

  // Compile Referrer data
  let referrerMap = {};
  if (activeLinkId === 'ALL') {
    urls.forEach((u) => {
      Object.entries(u.referrers || {}).forEach(([ref, count]) => {
        referrerMap[ref] = (referrerMap[ref] || 0) + count;
      });
    });
  } else if (selectedUrlObj) {
    referrerMap = selectedUrlObj.referrers || {};
  }
  const referrerBarData = Object.entries(referrerMap).map(([name, clicks]) => ({ name, clicks }));

  // Compile Country data
  let countryMap = {};
  if (activeLinkId === 'ALL') {
    urls.forEach((u) => {
      Object.entries(u.countries || {}).forEach(([country, count]) => {
        countryMap[country] = (countryMap[country] || 0) + count;
      });
    });
  } else if (selectedUrlObj) {
    countryMap = selectedUrlObj.countries || {};
  }
  const countryBarData = Object.entries(countryMap)
    .sort((a, b) => b[1] - a[1])
    .map(([country, count]) => ({ country, count }));

  const COLORS = ['#6366f1', '#06b6d4', '#10b981', '#f59e0b', '#a855f7'];

  return (
    <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '2rem 1.5rem' }}>
      {/* Header Bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#fff', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <BarChart3 size={28} color="#06b6d4" /> Analytics & Click Intelligence
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginTop: '0.25rem' }}>
            Monitor real-time engagement traffic, device breakdowns, referrers, and geo metrics.
          </p>
        </div>

        {/* Link Inspector Selector */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Filter size={16} color="var(--text-dim)" />
          <select
            value={activeLinkId}
            onChange={(e) => {
              setActiveLinkId(e.target.value);
              setSelectedUrlForAnalytics(e.target.value === 'ALL' ? null : e.target.value);
            }}
            className="glass-input"
            style={{ minWidth: '240px', cursor: 'pointer', fontWeight: 600 }}
          >
            <option value="ALL">🌐 Overview - All Links Combined</option>
            {urls.map((u) => (
              <option key={u.id} value={u.id}>
                🔗 {u.title} ({u.shortCode})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* KPI Cards Row */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '1.25rem',
          marginBottom: '2rem'
        }}
      >
        {/* Card 1 */}
        <div className="glass-panel" style={{ padding: '1.25rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Total Clicks</span>
            <div style={{ background: 'rgba(99, 102, 241, 0.15)', padding: '0.4rem', borderRadius: '10px' }}>
              <MousePointerClick size={18} color="#818cf8" />
            </div>
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#fff' }}>
            {activeLinkId === 'ALL' ? totalClicks : selectedUrlObj?.clicks || 0}
          </div>
          <div style={{ fontSize: '0.75rem', color: '#34d399', display: 'flex', alignItems: 'center', gap: '0.2rem', marginTop: '0.4rem' }}>
            <TrendingUp size={12} /> Live click tracking active
          </div>
        </div>

        {/* Card 2 */}
        <div className="glass-panel" style={{ padding: '1.25rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Active Short Links</span>
            <div style={{ background: 'rgba(6, 182, 212, 0.15)', padding: '0.4rem', borderRadius: '10px' }}>
              <Link2 size={18} color="#22d3ee" />
            </div>
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#fff' }}>
            {activeLinkId === 'ALL' ? totalLinks : 1}
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.4rem' }}>
            Avg {avgClicks} clicks per link
          </div>
        </div>

        {/* Card 3 */}
        <div className="glass-panel" style={{ padding: '1.25rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Top Performing Link</span>
            <div style={{ background: 'rgba(16, 185, 129, 0.15)', padding: '0.4rem', borderRadius: '10px' }}>
              <Sparkles size={18} color="#34d399" />
            </div>
          </div>
          <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#fff', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {topLink ? topLink.title : 'N/A'}
          </div>
          <div style={{ fontSize: '0.75rem', color: '#38bdf8', marginTop: '0.4rem' }}>
            {topLink ? `${topLink.clicks} clicks (${topLink.shortCode})` : 'No data'}
          </div>
        </div>

        {/* Card 4 */}
        <div className="glass-panel" style={{ padding: '1.25rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Top Geo Region</span>
            <div style={{ background: 'rgba(168, 85, 247, 0.15)', padding: '0.4rem', borderRadius: '10px' }}>
              <Globe size={18} color="#c084fc" />
            </div>
          </div>
          <div style={{ fontSize: '1.2rem', fontWeight: 700, color: '#fff' }}>
            {countryBarData.length > 0 ? countryBarData[0].country : 'Global'}
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.4rem' }}>
            {countryBarData.length > 0 ? `${countryBarData[0].count} clicks` : 'No data'}
          </div>
        </div>
      </div>

      {/* Main Charts Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(420px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
        {/* Chart 1: Timeline area chart */}
        <div className="glass-panel" style={{ padding: '1.5rem' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#fff', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <TrendingUp size={18} color="#818cf8" /> Clicks Engagement Timeline
          </h3>

          <div style={{ width: '100%', height: '280px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartTimeline}>
                <defs>
                  <linearGradient id="colorClicks" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.5} />
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="date" stroke="#6b7280" fontSize={12} tickLine={false} />
                <YAxis stroke="#6b7280" fontSize={12} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    background: 'rgba(18, 24, 38, 0.95)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '10px',
                    color: '#fff'
                  }}
                />
                <Area type="monotone" dataKey="clicks" stroke="#6366f1" strokeWidth={3} fillOpacity={1} fill="url(#colorClicks)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 2: Device Pie Chart */}
        <div className="glass-panel" style={{ padding: '1.5rem' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#fff', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Smartphone size={18} color="#06b6d4" /> Device Breakdown
          </h3>

          <div style={{ width: '100%', height: '280px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {devicePieData.length === 0 ? (
              <p style={{ color: 'var(--text-dim)' }}>No device data recorded yet</p>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={devicePieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={95}
                    paddingAngle={5}
                    dataKey="value"
                    label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                  >
                    {devicePieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      background: 'rgba(18, 24, 38, 0.95)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: '10px',
                      color: '#fff'
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>

        {/* Chart 3: Referrers Bar Chart */}
        <div className="glass-panel" style={{ padding: '1.5rem' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#fff', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Share2 size={18} color="#34d399" /> Traffic Sources & Referrers
          </h3>

          <div style={{ width: '100%', height: '280px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={referrerBarData} layout="vertical">
                <XAxis type="number" stroke="#6b7280" fontSize={12} />
                <YAxis dataKey="name" type="category" stroke="#6b7280" fontSize={12} width={110} />
                <Tooltip
                  contentStyle={{
                    background: 'rgba(18, 24, 38, 0.95)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '10px',
                    color: '#fff'
                  }}
                />
                <Bar dataKey="clicks" fill="#10b981" radius={[0, 6, 6, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 4: Geographic Demographics */}
        <div className="glass-panel" style={{ padding: '1.5rem' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#fff', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Globe size={18} color="#c084fc" /> Top Geographic Locations
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            {countryBarData.length === 0 ? (
              <p style={{ color: 'var(--text-dim)' }}>No country data yet</p>
            ) : (
              countryBarData.slice(0, 5).map((item, idx) => {
                const maxCount = countryBarData[0].count || 1;
                const pct = ((item.count / maxCount) * 100).toFixed(0);

                return (
                  <div key={item.country}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.88rem', marginBottom: '0.3rem' }}>
                      <span style={{ color: '#fff', fontWeight: 500 }}>{item.country}</span>
                      <span style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>{item.count} clicks</span>
                    </div>
                    <div style={{ width: '100%', height: '8px', background: 'rgba(255,255,255,0.06)', borderRadius: '4px', overflow: 'hidden' }}>
                      <div
                        style={{
                          width: `${pct}%`,
                          height: '100%',
                          background: 'linear-gradient(90deg, #a855f7 0%, #06b6d4 100%)',
                          borderRadius: '4px',
                          transition: 'width 0.5s ease-out'
                        }}
                      />
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
