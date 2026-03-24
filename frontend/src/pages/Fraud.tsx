import React from 'react';
import { useFraud } from '../hooks/useFraud';
import { ShieldAlert } from 'lucide-react';

const STATUS_STYLE: Record<string, { bg: string; color: string }> = {
  'Under Investigation': { bg: '#fef9c3', color: '#ca8a04' },
  'Flagged': { bg: '#fee2e2', color: '#dc2626' },
  'Verified Fraud': { bg: '#fce7f3', color: '#9d174d' },
  'Cleared': { bg: '#dcfce7', color: '#16a34a' },
};

const RISK_FACTORS = [
  { label: 'DUPLICATE ENTRIES', pct: 78, color: '#f59e0b' },
  { label: 'INCOME MISMATCH', pct: 45, color: '#ef4444' },
  { label: 'GHOST BENEFICIARIES', pct: 22, color: '#3b82f6' },
];

export default function Fraud() {
  const { fraudAlerts, loading } = useFraud();

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: 28, fontWeight: 800, color: '#0f172a', margin: 0 }}>Fraud</h1>
        <p style={{ color: '#64748b', fontSize: 14, marginTop: 4 }}>Real-time intelligence and governance overview.</p>
      </div>
      <div style={{ marginBottom: 8, color: '#0f172a', fontWeight: 700, fontSize: 16, }}>Fraud Detection &amp; Prevention</div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 20 }}>
        {/* Alerts List */}
        <div style={{
          background: '#fff', borderRadius: 14, padding: '20px 24px',
          border: '1px solid #f1f5f9', boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
        }}>
          <h3 style={{ fontSize: 14, fontWeight: 700, color: '#0f172a', marginBottom: 16 }}>Recent Fraud Alerts</h3>
          {loading ? <div style={{ color: '#94a3b8' }}>Loading...</div> : fraudAlerts.map(f => {
            const s = STATUS_STYLE[f.status] || STATUS_STYLE['Flagged'];
            return (
              <div key={f.id} style={{
                display: 'flex', alignItems: 'center', gap: 14,
                padding: '14px 0', borderBottom: '1px solid #f8fafc'
              }}>
                <div style={{
                  width: 36, height: 36, borderRadius: 10,
                  background: '#fef9c3', display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}>
                  <ShieldAlert size={16} color="#f59e0b" />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600, fontSize: 14, color: '#0f172a' }}>{f.scheme}</div>
                  <div style={{ fontSize: 12, color: '#94a3b8', marginTop: 2 }}>{f.type}</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontWeight: 800, fontSize: 15, color: '#0f172a' }}>
                    ₹{(f.amount / 100000).toFixed(1)}L
                  </div>
                  <div style={{
                    ...s, fontSize: 10, fontWeight: 700,
                    padding: '2px 8px', borderRadius: 20, marginTop: 3,
                    display: 'inline-block', textTransform: 'uppercase', letterSpacing: '0.05em'
                  }}>
                    {f.status}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Risk Factors */}
        <div style={{
          background: '#fff', borderRadius: 14, padding: '20px 24px',
          border: '1px solid #f1f5f9', boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
        }}>
          <h3 style={{ fontSize: 14, fontWeight: 700, color: '#0f172a', marginBottom: 20 }}>Risk Factors</h3>
          {RISK_FACTORS.map(rf => (
            <div key={rf.label} style={{ marginBottom: 20 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                <span style={{ fontSize: 11, fontWeight: 700, color: '#94a3b8', letterSpacing: '0.05em' }}>{rf.label}</span>
                <span style={{ fontSize: 13, fontWeight: 800, color: '#0f172a' }}>{rf.pct}%</span>
              </div>
              <div style={{ height: 8, background: '#f1f5f9', borderRadius: 4, overflow: 'hidden' }}>
                <div style={{
                  width: `${rf.pct}%`, height: '100%',
                  background: rf.color, borderRadius: 4, transition: 'width 0.8s'
                }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}