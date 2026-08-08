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
  Filter
} from 'lucide-react';

export const AnalyticsDashboard = () => {
  const { urls, selectedUrlForAnalytics, setSelectedUrlForAnalytics } = useUrl();
  const [activeLinkId, setActiveLinkId] = useState(selectedUrlForAnalytics || 'ALL');

  const selectedUrlObj = urls.find((u) => u.id === activeLinkId);
  const totalClicks = urls.reduce((sum, u) => sum + (u.clicks || 0), 0);
  const totalLinks = urls.length;
  const avgClicks = totalLinks > 0 ? (totalClicks / totalLinks).toFixed(1) : 0;
  const topLink = urls.length > 0 ? [...urls].sort((a, b) => b.clicks - a.clicks)[0] : null;

  let chartTimeline = [];
  if (activeLinkId === 'ALL') {
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

  const COLORS = ['#0b57d0', '#146c2e', '#0284c7', '#b45309', '#7e22ce'];

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem 1.5rem' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ fontSize: '1.8rem', fontWeight: 700, color: '#1f1f1f', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <BarChart3 size={26} color="#0b57d0" /> Analytics Dashboard
          </h1>
          <p style={{ color: '#444746', fontSize: '0.95rem', marginTop: '0.2rem' }}>
            Real-time engagement stats, referrers, device breakdown, and geo metrics.
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Filter size={16} color="#5f6368" />
          <select
            value={activeLinkId}
            onChange={(e) => {
              setActiveLinkId(e.target.value);
              setSelectedUrlForAnalytics(e.target.value === 'ALL' ? null : e.target.value);
            }}
            className="google-input"
            style={{ minWidth: '240px', cursor: 'pointer', borderRadius: '20px', fontWeight: 600 }}
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

      {/* KPI Row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.25rem', marginBottom: '2rem' }}>
        <div className="google-card" style={{ padding: '1.25rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '0.85rem', color: '#444746' }}>Total Clicks</span>
            <MousePointerClick size={18} color="#0b57d0" />
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: 700, color: '#1f1f1f' }}>
            {activeLinkId === 'ALL' ? totalClicks : selectedUrlObj?.clicks || 0}
          </div>
          <div style={{ fontSize: '0.75rem', color: '#146c2e', marginTop: '0.4rem', fontWeight: 500 }}>
            Live tracking active
          </div>
        </div>

        <div className="google-card" style={{ padding: '1.25rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '0.85rem', color: '#444746' }}>Active Links</span>
            <Link2 size={18} color="#0284c7" />
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: 700, color: '#1f1f1f' }}>
            {activeLinkId === 'ALL' ? totalLinks : 1}
          </div>
          <div style={{ fontSize: '0.75rem', color: '#747775', marginTop: '0.4rem' }}>
            Avg {avgClicks} clicks / link
          </div>
        </div>

        <div className="google-card" style={{ padding: '1.25rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '0.85rem', color: '#444746' }}>Top Performing</span>
            <TrendingUp size={18} color="#146c2e" />
          </div>
          <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#1f1f1f', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {topLink ? topLink.title : 'N/A'}
          </div>
          <div style={{ fontSize: '0.75rem', color: '#0b57d0', marginTop: '0.4rem', fontWeight: 500 }}>
            {topLink ? `${topLink.clicks} clicks` : 'No data'}
          </div>
        </div>

        <div className="google-card" style={{ padding: '1.25rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '0.85rem', color: '#444746' }}>Top Region</span>
            <Globe size={18} color="#7e22ce" />
          </div>
          <div style={{ fontSize: '1.2rem', fontWeight: 700, color: '#1f1f1f' }}>
            {countryBarData.length > 0 ? countryBarData[0].country : 'Global'}
          </div>
          <div style={{ fontSize: '0.75rem', color: '#747775', marginTop: '0.4rem' }}>
            {countryBarData.length > 0 ? `${countryBarData[0].count} clicks` : 'No data'}
          </div>
        </div>
      </div>

      {/* Charts Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(420px, 1fr))', gap: '1.5rem' }}>
        <div className="google-card" style={{ padding: '1.5rem' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#1f1f1f', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <TrendingUp size={18} color="#0b57d0" /> Clicks Timeline
          </h3>

          <div style={{ width: '100%', height: '260px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartTimeline}>
                <defs>
                  <linearGradient id="colorClicks" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0b57d0" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#0b57d0" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="date" stroke="#747775" fontSize={12} tickLine={false} />
                <YAxis stroke="#747775" fontSize={12} tickLine={false} />
                <Tooltip contentStyle={{ background: '#ffffff', border: '1px solid #dadce0', borderRadius: '8px', color: '#1f1f1f' }} />
                <Area type="monotone" dataKey="clicks" stroke="#0b57d0" strokeWidth={3} fillOpacity={1} fill="url(#colorClicks)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="google-card" style={{ padding: '1.5rem' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#1f1f1f', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Smartphone size={18} color="#0284c7" /> Device Distribution
          </h3>

          <div style={{ width: '100%', height: '260px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={devicePieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={90}
                  paddingAngle={4}
                  dataKey="value"
                  label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                >
                  {devicePieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ background: '#ffffff', border: '1px solid #dadce0', borderRadius: '8px', color: '#1f1f1f' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};
