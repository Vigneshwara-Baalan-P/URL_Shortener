import React from 'react';
import { useUrl } from '../context/UrlContext';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export const ToastContainer = () => {
  const { toasts, removeToast } = useUrl();

  if (toasts.length === 0) return null;

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        pointerEvents: 'none'
      }}
    >
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="animate-fade-in"
          style={{
            pointerEvents: 'auto',
            minWidth: '280px',
            maxWidth: '400px',
            background: 'rgba(18, 24, 38, 0.95)',
            backdropFilter: 'blur(16px)',
            border: `1px solid ${
              toast.type === 'success'
                ? 'rgba(16, 185, 129, 0.4)'
                : toast.type === 'error'
                ? 'rgba(244, 63, 94, 0.4)'
                : 'rgba(99, 102, 241, 0.4)'
            }`,
            borderRadius: '12px',
            padding: '12px 16px',
            color: '#fff',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.5)'
          }}
        >
          {toast.type === 'success' && <CheckCircle2 size={20} color="#10b981" />}
          {toast.type === 'error' && <AlertCircle size={20} color="#f43f5e" />}
          {toast.type === 'info' && <Info size={20} color="#6366f1" />}

          <span style={{ fontSize: '0.9rem', flex: 1, fontWeight: 500 }}>{toast.message}</span>

          <button
            onClick={() => removeToast(toast.id)}
            style={{
              background: 'none',
              border: 'none',
              color: 'rgba(255,255,255,0.5)',
              cursor: 'pointer',
              display: 'flex',
              padding: '2px'
            }}
          >
            <X size={16} />
          </button>
        </div>
      ))}
    </div>
  );
};
