import React, { useState, useEffect } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip,
  ResponsiveContainer, CartesianGrid, PieChart, Pie, Cell, Legend
} from 'recharts';
import { X, Zap, Clock, MapPin, CloudRain, Zap as ZapIcon, AlertTriangle } from 'lucide-react';

const BASE = import.meta.env.VITE_API_URL || 'http://localhost:8000';

const SEV: Record<string, { bg: string; color: string; border: string; dot: string }> = {
  Critical: { bg: '#ede9fe', color: '#7c3aed', border: '#8b5cf6', dot: '#7c3aed' },
  High:     { bg: '#fee2e2', color: '#dc2626', border: '#ef4444', dot: '#ef4444' },
  Medium:   { bg: '#fef9c3', color: '#ca8a04', border: '#f59e0b', dot: '#f59e0b' },
  Low:      { bg: '#dcfce7', color: '#16a34a', border: '#22c55e', dot: '#22c55e' },
};

const TYPE_ICON: Record<string, React.ReactNode> = {
  Infrastructure: <CloudRain size={16} />,
  Utility: <ZapIcon size={16} />,
  Transport: <AlertTriangle size={16} />,
};

interface Crisis {
  id: string; title: string; district: string;
  severity: string; type: string; reported_at: string;
  status: string; electricity_hours?: number;
  road_incidents?: number; rainfall_mm?: number;
}

function DeployModal({ crisis, onClose }: { crisis: Crisis; onClose: () => void }) {
  const [deployed, setDeployed] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleDeploy = () => {
    setLoading(true);
    setTimeout(() => { setLoading(false); setDeployed(true); }, 1500);
  };

  const s = SEV[crisis.severity] || SEV.Medium;

  return (
    <div style={{
      position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)',
      zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20
    }} onClick={onClose}>
      <div style={{
        background: '#fff', borderRadius: 16, maxWidth: 520, width: '100%',
        padding: 32, boxShadow: '0 25px 60px rgba(0,0,0,0.2)'
      }} onClick={e => e.stopPropagation()}>

        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 20 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ background: s.bg, color: s.color, width: 40, height: 40, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {TYPE_ICON[crisis.type] || <AlertTriangle size={16} />}
            </div>
            <div>
              <div style={{ fontWeight: 700, fontSize: 16, color: '#0f172a' }}>{crisis.title}</div>
              <div style={{ fontSize: 12, color: '#94a3b8' }}>{crisis.district}</div>
            </div>
          </div>
          <button onClick={onClose} style={{ width: 32, height: 32, borderRadius: '50%', border: '1px solid #e2e8f0', background: '#f8fafc', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <X size={14} />
          </button>
        </div>

        {/* Details */}
        <div style={{ background: '#f8fafc', borderRadius: 10, padding: 16, marginBottom: 20 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            {[
              { label: 'Severity', value: crisis.severity, color: s.color },
              { label: 'Type', value: crisis.type, color: '#475569' },
              { label: 'Status', value: crisis.status, color: crisis.status === 'Active' ? '#dc2626' : '#ca8a04' },
              { label: 'Reported', value: crisis.reported_at, color: '#475569' },
              crisis.electricity_hours !== undefined && { label: 'Electricity', value: `${crisis.electricity_hours}h/day`, color: '#475569' },
              crisis.road_incidents !== undefined && { label: 'Road Incidents', value: String(crisis.road_incidents), color: '#475569' },
              crisis.rainfall_mm !== undefined && { label: 'Rainfall', value: `${crisis.rainfall_mm}mm`, color: '#475569' },
            ].filter(Boolean).map((item: any, i) => (
              <div key={i}>
                <div style={{ fontSize: 10, color: '#94a3b8', fontWeight: 700, textTransform: 'uppercase' }}>{item.label}</div>
                <div style={{ fontSize: 13, fontWeight: 700, color: item.color, marginTop: 2 }}>{item.value}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Response Teams */}
        {!deployed && (
          <div style={{ marginBottom: 20 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: '#475569', marginBottom: 10, textTransform: 'uppercase' }}>Deploy Response Teams</div>
            {(['Emergency Medical Team', 'District Response Force', crisis.type === 'Infrastructure' ? 'Water Supply Unit' : crisis.type === 'Utility' ? 'Power Dept Engineers' : 'Highway Patrol']).map((team, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 12px', background: '#f8fafc', borderRadius: 8, marginBottom: 6 }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#22c55e' }} />
                <span style={{ fontSize: 13, color: '#0f172a' }}>{team}</span>
                <span style={{ marginLeft: 'auto', fontSize: 11, color: '#22c55e', fontWeight: 600 }}>AVAILABLE</span>
              </div>
            ))}
          </div>
        )}

        {deployed ? (
          <div style={{ textAlign: 'center', padding: '20px 0' }}>
            <div style={{ fontSize: 48, marginBottom: 12 }}>✅</div>
            <div style={{ fontSize: 16, fontWeight: 700, color: '#22c55e', marginBottom: 4 }}>Response Deployed!</div>
            <div style={{ fontSize: 13, color: '#64748b' }}>Teams dispatched to {crisis.district}</div>
            <button onClick={onClose} style={{
              marginTop: 16, padding: '10px 24px', background: '#0f172a', color: '#fff',
              border: 'none', borderRadius: 8, cursor: 'pointer', fontWeight: 600, fontSize: 13
            }}>Close</button>
          </div>
        ) : (
          <button
            onClick={handleDeploy}
            disabled={loading}
            style={{
              width: '100%', padding: '13px', background: loading ? '#94a3b8' : '#ef4444',
              color: '#fff', border: 'none', borderRadius: 10, cursor: loading ? 'default' : 'pointer',
              fontWeight: 700, fontSize: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
              transition: 'background 0.2s'
            }}
          >
            <Zap size={16} />
            {loading ? 'Deploying Response...' : '🚨 Deploy Emergency Response'}
          </button>
        )}
      </div>
    </div>
  );
}

export default function Crisis() {
  const [crises, setCrises] = useState<Crisis[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Crisis | null>(null);
  const [filterSev, setFilterSev] = useState('All');
  const [filterType, setFilterType] = useState('All');

  useEffect(() => {
    fetch(`${BASE}/crisis`).then(r => r.json()).then(setCrises).finally(() => setLoading(false));
  }, []);

  const filtered = crises.filter(c => {
    const ms = filterSev === 'All' || c.severity === filterSev;
    const mt = filterType === 'All' || c.type === filterType;
    return ms && mt;
  });

  const pieData = ['Critical','High','Medium','Low'].map(s => ({
    name: s, value: crises.filter(c => c.severity === s).length
  })).filter(d => d.value > 0);

  const typeData = ['Infrastructure','Utility','Transport'].map(t => ({
    name: t, value: crises.filter(c => c.type === t).length,
    active: crises.filter(c => c.type === t && c.status === 'Active').length
  }));

  const PIE_COLORS = { Critical: '#7c3aed', High: '#ef4444', Medium: '#f59e0b', Low: '#22c55e' };

  return (
    <div>
      {selected && <DeployModal crisis={selected} onClose={() => setSelected(null)} />}

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 24 }}>
        <div>
          <h1 style={{ fontSize: 28, fontWeight: 800, color: '#0f172a', margin: 0 }}>Crisis Monitor</h1>
          <p style={{ color: '#64748b', fontSize: 14, marginTop: 4 }}>
            {crises.filter(c => c.status === 'Active').length} active · {crises.length} total alerts — Click <b>Deploy Response</b> to act
          </p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#ef4444', animation: 'pulse 1.5s infinite' }} />
          <span style={{ color: '#ef4444', fontSize: 13, fontWeight: 700 }}>LIVE MONITORING</span>
        </div>
      </div>

      {/* Stats Row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 12, marginBottom: 24 }}>
        {[
          { label: 'Total Alerts', value: crises.length, color: '#3b82f6', bg: '#eff6ff' },
          { label: 'Active', value: crises.filter(c => c.status === 'Active').length, color: '#ef4444', bg: '#fee2e2' },
          { label: 'In Progress', value: crises.filter(c => c.status === 'In Progress').length, color: '#f59e0b', bg: '#fef9c3' },
          { label: 'Critical', value: crises.filter(c => c.severity === 'Critical').length, color: '#7c3aed', bg: '#ede9fe' },
        ].map(item => (
          <div key={item.label} style={{ background: item.bg, borderRadius: 12, padding: '16px 20px' }}>
            <div style={{ fontSize: 28, fontWeight: 800, color: item.color }}>{item.value}</div>
            <div style={{ fontSize: 12, color: item.color, fontWeight: 600, marginTop: 2 }}>{item.label}</div>
          </div>
        ))}
      </div>

      {/* Charts Row */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 24 }}>
        <div style={{ background: '#fff', borderRadius: 14, padding: '20px 24px', border: '1px solid #f1f5f9', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
          <h3 style={{ fontSize: 14, fontWeight: 700, color: '#0f172a', marginBottom: 16 }}>Crisis by Severity</h3>
          <ResponsiveContainer width="100%" height={180}>
            <PieChart>
              <Pie data={pieData} cx="50%" cy="50%" outerRadius={70} dataKey="value" label={({ name, value }) => `${name}: ${value}`} labelLine={false}>
                {pieData.map(entry => (
                  <Cell key={entry.name} fill={(PIE_COLORS as any)[entry.name]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div style={{ background: '#fff', borderRadius: 14, padding: '20px 24px', border: '1px solid #f1f5f9', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
          <h3 style={{ fontSize: 14, fontWeight: 700, color: '#0f172a', marginBottom: 16 }}>Crisis by Type</h3>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={typeData} barSize={28}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
              <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <Tooltip />
              <Bar dataKey="value" name="Total" fill="#3b82f6" radius={[6,6,0,0]} />
              <Bar dataKey="active" name="Active" fill="#ef4444" radius={[6,6,0,0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Filters */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap' }}>
        <span style={{ fontSize: 12, color: '#94a3b8', lineHeight: '32px' }}>Severity:</span>
        {['All','Critical','High','Medium','Low'].map(s => (
          <button key={s} onClick={() => setFilterSev(s)} style={{
            padding: '5px 12px', borderRadius: 20, border: '1px solid #e2e8f0', fontSize: 11,
            background: filterSev === s ? '#0f172a' : '#fff',
            color: filterSev === s ? '#fff' : '#475569', cursor: 'pointer', fontWeight: 600
          }}>{s}</button>
        ))}
        <span style={{ fontSize: 12, color: '#94a3b8', lineHeight: '32px', marginLeft: 8 }}>Type:</span>
        {['All','Infrastructure','Utility','Transport'].map(t => (
          <button key={t} onClick={() => setFilterType(t)} style={{
            padding: '5px 12px', borderRadius: 20, border: '1px solid #e2e8f0', fontSize: 11,
            background: filterType === t ? '#0f172a' : '#fff',
            color: filterType === t ? '#fff' : '#475569', cursor: 'pointer', fontWeight: 600
          }}>{t}</button>
        ))}
      </div>

      {/* Crisis Cards Grid */}
      {loading ? (
        <div style={{ textAlign: 'center', padding: 60, color: '#94a3b8' }}>Loading crisis data...</div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 14 }}>
          {filtered.slice(0, 60).map(c => {
            const s = SEV[c.severity] || SEV.Medium;
            return (
              <div key={c.id} style={{
                background: '#fff', borderRadius: 12, padding: '18px 20px',
                border: `1px solid #f1f5f9`, borderTop: `4px solid ${s.dot}`,
                boxShadow: '0 1px 3px rgba(0,0,0,0.05)', transition: 'transform 0.15s, box-shadow 0.15s'
              }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-2px)';
                  (e.currentTarget as HTMLDivElement).style.boxShadow = '0 8px 24px rgba(0,0,0,0.1)';
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)';
                  (e.currentTarget as HTMLDivElement).style.boxShadow = '0 1px 3px rgba(0,0,0,0.05)';
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                  <span style={{ fontWeight: 700, fontSize: 14, color: '#0f172a' }}>{c.title}</span>
                  <span style={{
                    background: s.bg, color: s.color, border: `1px solid ${s.border}`,
                    padding: '2px 8px', borderRadius: 20, fontSize: 10, fontWeight: 700
                  }}>{c.severity}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#64748b', fontSize: 12, marginBottom: 4 }}>
                  <MapPin size={11} /> {c.district}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#94a3b8', fontSize: 11, marginBottom: 14 }}>
                  <Clock size={11} /> {c.reported_at}
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{
                    fontSize: 10, fontWeight: 700, padding: '2px 8px', borderRadius: 20,
                    background: c.status === 'Active' ? '#fee2e2' : '#fef9c3',
                    color: c.status === 'Active' ? '#dc2626' : '#ca8a04'
                  }}>{c.status.toUpperCase()}</span>
                  <button
                    onClick={() => setSelected(c)}
                    style={{
                      background: '#0f172a', color: '#fff', border: 'none',
                      borderRadius: 8, padding: '7px 14px', fontSize: 12,
                      fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 5,
                      transition: 'background 0.15s'
                    }}
                    onMouseEnter={e => (e.currentTarget.style.background = '#ef4444')}
                    onMouseLeave={e => (e.currentTarget.style.background = '#0f172a')}
                  >
                    <Zap size={11} /> Deploy Response
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {filtered.length > 60 && (
        <div style={{ textAlign: 'center', marginTop: 16, color: '#94a3b8', fontSize: 13 }}>
          Showing 60 of {filtered.length} alerts. Use filters to narrow down.
        </div>
      )}
    </div>
  );
}
