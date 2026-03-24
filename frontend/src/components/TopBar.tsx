import React from 'react';
import { Bell } from 'lucide-react';

interface Props { alertCount?: number }

export default function TopBar({ alertCount = 0 }: Props) {
  const now = new Date().toLocaleDateString('en-IN', {
    day: '2-digit', month: 'short', year: 'numeric'
  });
  return (
    <div style={{
      height: 60, background: '#fff', borderBottom: '1px solid #f1f5f9',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '0 28px', position: 'sticky', top: 0, zIndex: 50
    }}>
      <input
        placeholder="Search districts, schemes or alerts..."
        style={{
          width: 320, padding: '8px 14px', borderRadius: 8,
          border: '1px solid #e2e8f0', background: '#f8fafc',
          fontSize: 13, color: '#475569', outline: 'none'
        }}
      />
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        <div style={{ position: 'relative', cursor: 'pointer' }}>
          <Bell size={18} color="#64748b" />
          {alertCount > 0 && (
            <span style={{
              position: 'absolute', top: -6, right: -6,
              background: '#ef4444', color: '#fff', borderRadius: '50%',
              width: 16, height: 16, fontSize: 9, display: 'flex',
              alignItems: 'center', justifyContent: 'center', fontWeight: 700
            }}>{alertCount}</span>
          )}
        </div>
        <div style={{ width: 1, height: 24, background: '#e2e8f0' }} />
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: 10, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.06em' }}>CURRENT SESSION</div>
          <div style={{ fontSize: 13, color: '#0f172a', fontWeight: 600 }}>{now}</div>
        </div>
      </div>
    </div>
  );
}