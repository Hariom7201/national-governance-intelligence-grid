import React from 'react';

interface Props {
  title: string;
  value: string | number;
  delta: string;
  deltaPositive: boolean;
  icon: React.ReactNode;
  accentColor: string;
}

export default function KPICard({ title, value, delta, deltaPositive, icon, accentColor }: Props) {
  return (
    <div style={{
      background: '#fff', borderRadius: 14, padding: '22px 24px',
      boxShadow: '0 1px 3px rgba(0,0,0,0.06), 0 4px 16px rgba(0,0,0,0.04)',
      border: '1px solid #f1f5f9', flex: 1, minWidth: 0,
      transition: 'transform 0.2s, box-shadow 0.2s',
    }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-2px)';
        (e.currentTarget as HTMLDivElement).style.boxShadow = '0 8px 30px rgba(0,0,0,0.1)';
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)';
        (e.currentTarget as HTMLDivElement).style.boxShadow = '0 1px 3px rgba(0,0,0,0.06), 0 4px 16px rgba(0,0,0,0.04)';
      }}
    >
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 12 }}>
        <span style={{ color: '#64748b', fontSize: 13, fontWeight: 500 }}>{title}</span>
        <div style={{
          width: 38, height: 38, borderRadius: 10,
          background: `${accentColor}15`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: accentColor
        }}>
          {icon}
        </div>
      </div>
      <div style={{ fontSize: 30, fontWeight: 800, color: '#0f172a', marginBottom: 8, letterSpacing: '-0.03em' }}>
        {typeof value === 'number' ? value.toLocaleString('en-IN') : value}
      </div>
      <div style={{
        fontSize: 12, fontWeight: 600,
        color: deltaPositive ? '#16a34a' : '#dc2626'
      }}>
        {delta}
      </div>
    </div>
  );
}