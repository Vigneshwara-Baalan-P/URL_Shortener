import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

export const FaqSection = () => {
  const faqs = [
    {
      q: 'How does link shortening work?',
      a: 'Paste your long URL into the search box. Google URLShort creates a compact short code (or custom slug) that redirects visitors to the original webpage while tracking clicks and referrers.'
    },
    {
      q: 'Can I customize the short URL alias?',
      a: 'Yes, expand the options to enter a custom slug like snap.link/my-product or snap.link/summer-sale.'
    },
    {
      q: 'How does passcode protection work?',
      a: 'When passcode protection is set, visitors attempting to open the short link must enter the passcode to be redirected.'
    },
    {
      q: 'Can I generate and download QR Codes?',
      a: 'Yes! Every link includes a built-in QR Code generator with color controls and PNG image downloads.'
    },
    {
      q: 'What analytics metrics are tracked?',
      a: 'Track total clicks, engagement timeline, referrers (Google, Twitter, Direct), device distribution, and location demographics.'
    }
  ];

  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section style={{ maxWidth: '800px', margin: '4rem auto 2rem auto', padding: '0 1.5rem' }}>
      <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
        <h2 style={{ fontSize: '1.8rem', fontWeight: 700, color: '#1f1f1f', marginBottom: '0.5rem' }}>
          Frequently Asked Questions
        </h2>
        <p style={{ color: '#444746', fontSize: '0.95rem' }}>
          Quick answers about short links, QR codes, and analytics.
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
        {faqs.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div
              key={idx}
              className="google-card"
              style={{
                borderRadius: '16px',
                overflow: 'hidden'
              }}
            >
              <button
                onClick={() => setOpenIndex(isOpen ? null : idx)}
                style={{
                  width: '100%',
                  padding: '1.15rem 1.5rem',
                  background: 'none',
                  border: 'none',
                  color: '#1f1f1f',
                  fontSize: '1rem',
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
                  color="#5f6368"
                  style={{
                    transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                    transition: 'transform 0.25s ease'
                  }}
                />
              </button>

              {isOpen && (
                <div
                  className="animate-fade-in"
                  style={{
                    padding: '0 1.5rem 1.15rem 1.5rem',
                    color: '#444746',
                    fontSize: '0.92rem',
                    lineHeight: 1.6,
                    borderTop: '1px solid #f1f3f4',
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
