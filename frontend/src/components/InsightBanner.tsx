import React, { useState, useEffect } from 'react';
import type { Insight } from '../utils/intelligenceEngine';

interface Props { insights: Insight[] }

export default function InsightBanner({ insights }: Props) {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    if (insights.length <= 1) return;
    const t = setInterval(() => setIdx((i) => (i + 1) % insights.length), 4500);
    return () => clearInterval(t);
  }, [insights.length]);

  if (!insights.length) return null;

  const current = insights[idx];
  const colors = {
    critical: { bg: '#fef2f2', border: '#fca5a5', text: '#991b1b' },
    warning: { bg: '#fffbeb', border: '#fcd34d', text: '#92400e' },
    info: { bg: '#eff6ff', border: '#93c5fd', text: '#1e40af' },
  };
  const c = colors[current.level];

  return (
    <div style={{
      background: c.bg, border: `1px solid ${c.border}`,
      borderRadius: 10, padding: '11px 16px',
      display: 'flex', alignItems: 'center', gap: 12,
      marginBottom: 24, transition: 'all 0.3s'
    }}>
      <div style={{
        width: 8, height: 8, borderRadius: '50%',
        background: c.border, flexShrink: 0,
        animation: current.level === 'critical' ? 'pulse 1.5s infinite' : 'none'
      }} />
      <span style={{ color: c.text, fontSize: 13, fontWeight: 500, flex: 1 }}>
        {current.message}
      </span>
      {insights.length > 1 && (
        <span style={{ color: c.text, fontSize: 11, opacity: 0.6 }}>
          {idx + 1}/{insights.length}
        </span>
      )}
    </div>
  );
}