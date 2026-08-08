import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

export const FaqSection = () => {
  const faqs = [
    {
      q: 'How does link shortening work on LinkShort?',
      a: 'Simply paste your long destination URL into the input field. LinkShort generates a clean, compact short code (or custom slug) that redirects visitors to the original webpage while tracking clicks, referrers, and device analytics.'
    },
    {
      q: 'Can I customize the short URL alias?',
      a: 'Yes! Expand the custom options to specify a vanity alias like snap.link/my-product or snap.link/summer-sale.'
    },
    {
      q: 'How does passcode protection work?',
      a: 'When passcode protection is enabled, anyone clicking the short link will be prompted for the passcode before being redirected to the target destination.'
    },
    {
      q: 'Can I generate and download QR Codes for my links?',
      a: 'Absolutely. Every short link includes a built-in QR Code generator. You can customize the colors, view SVG preview, and download high-resolution PNG images.'
    },
    {
      q: 'What analytics metrics are tracked?',
      a: 'You can monitor total clicks, clicks timeline over time, referrer traffic sources (Google, Social, Direct), device distribution (Desktop, Mobile, Tablet), and visitor country demographics.'
    },
    {
      q: 'Are my links permanent?',
      a: 'Yes, created links remain active permanently unless you explicitly configure an expiration date or delete the link from your Link Library.'
    }
  ];

  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section style={{ maxWidth: '840px', margin: '4rem auto 2rem auto', padding: '0 1.5rem' }}>
      <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.35rem 0.85rem',
            borderRadius: '999px',
            background: 'rgba(99, 102, 241, 0.12)',
            border: '1px solid rgba(99, 102, 241, 0.25)',
            color: '#a5b4fc',
            fontSize: '0.82rem',
            fontWeight: 600,
            marginBottom: '0.75rem'
          }}
        >
          <HelpCircle size={14} /> Got Questions?
        </div>

        <h2 style={{ fontSize: '2rem', fontWeight: 800, color: '#fff', marginBottom: '0.5rem' }}>
          Frequently Asked Questions
        </h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
          Find quick answers to common questions about short links, tracking, and QR code tools.
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {faqs.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div
              key={idx}
              className="glass-panel"
              style={{
                borderRadius: '14px',
                overflow: 'hidden',
                border: isOpen ? '1px solid rgba(99, 102, 241, 0.4)' : '1px solid rgba(255, 255, 255, 0.08)'
              }}
            >
              <button
                onClick={() => setOpenIndex(isOpen ? null : idx)}
                style={{
                  width: '100%',
                  padding: '1.25rem 1.5rem',
                  background: 'none',
                  border: 'none',
                  color: '#fff',
                  fontSize: '1.02rem',
                  fontWeight: 600,
                  textAlign: 'left',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '1rem'
                }}
              >
                <span>{faq.q}</span>
                <ChevronDown
                  size={18}
                  color="var(--text-muted)"
                  style={{
                    transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                    transition: 'transform 0.3s ease'
                  }}
                />
              </button>

              {isOpen && (
                <div
                  className="animate-fade-in"
                  style={{
                    padding: '0 1.5rem 1.25rem 1.5rem',
                    color: 'var(--text-muted)',
                    fontSize: '0.92rem',
                    lineHeight: 1.6,
                    borderTop: '1px solid rgba(255,255,255,0.05)',
                    paddingTop: '0.85rem'
                  }}
                >
                  {faq.a}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};
