import React, { useState, useEffect } from 'react';
import {
  RadarChart, Radar, PolarGrid, PolarAngleAxis,
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis,
  Tooltip, CartesianGrid, Cell
} from 'recharts';
import { X, TrendingUp, TrendingDown, Users, BookOpen, Briefcase, AlertTriangle } from 'lucide-react';

const BASE = import.meta.env.VITE_API_URL || 'http://localhost:8000';

const RISK_STYLE: Record<string, { bg: string; color: string; border: string }> = {
  Low:      { bg: '#dcfce7', color: '#16a34a', border: '#22c55e' },
  Medium:   { bg: '#fef9c3', color: '#ca8a04', border: '#f59e0b' },
  High:     { bg: '#fee2e2', color: '#dc2626', border: '#ef4444' },
  Critical: { bg: '#ede9fe', color: '#7c3aed', border: '#8b5cf6' },
};

interface District {
  name: string; risk_level: string; health_score: number;
  active_issues: number; population: number; literacy_rate: number;
  work_participation: number; sc_pct: number; st_pct: number;
  illiteracy_rate: number; households: number;
  male_population: number; female_population: number; children_0_6: number;
  complaints_this_month: number; actions_taken: number;
}

interface Recommendation {
  insights: string[]; recommended_actions: string[];
  risk_score: number; literacy_rate: number; work_participation: number;
}

function StatBox({ label, value, icon, color }: { label: string; value: string; icon: React.ReactNode; color: string }) {
  return (
    <div style={{ background: '#f8fafc', borderRadius: 10, padding: '14px 16px', border: '1px solid #e2e8f0' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
        <span style={{ fontSize: 11, color: '#94a3b8', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{label}</span>
        <span style={{ color }}>{icon}</span>
      </div>
      <div style={{ fontSize: 20, fontWeight: 800, color: '#0f172a' }}>{value}</div>
    </div>
  );
}

function DetailModal({ district, onClose }: { district: District; onClose: () => void }) {
  const [rec, setRec] = useState<Recommendation | null>(null);
  const rs = RISK_STYLE[district.risk_level] || RISK_STYLE.Medium;

  useEffect(() => {
    fetch(`${BASE}/recommendation/${encodeURIComponent(district.name)}`)
      .then(r => r.json()).then(setRec).catch(() => {});
  }, [district.name]);

  const radarData = [
    { subject: 'Health Score', value: district.health_score },
    { subject: 'Literacy', value: district.literacy_rate },
    { subject: 'Work Part.', value: district.work_participation },
    { subject: 'SC Coverage', value: Math.min(100, district.sc_pct * 3) },
    { subject: 'ST Coverage', value: Math.min(100, district.st_pct * 3) },
  ];

  const demoBars = [
    { name: 'Male', value: district.male_population, fill: '#3b82f6' },
    { name: 'Female', value: district.female_population, fill: '#ec4899' },
    { name: 'Children (0-6)', value: district.children_0_6, fill: '#f59e0b' },
    { name: 'SC Pop.', value: district.sc_pct, fill: '#8b5cf6' },
    { name: 'ST Pop.', value: district.st_pct, fill: '#22c55e' },
  ];

  return (
    <div style={{
      position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)',
      zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: 20
    }} onClick={onClose}>
      <div style={{
        background: '#fff', borderRadius: 16, maxWidth: 860, width: '100%',
        maxHeight: '90vh', overflow: 'auto', padding: 32,
        boxShadow: '0 25px 60px rgba(0,0,0,0.2)'
      }} onClick={e => e.stopPropagation()}>

        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24 }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 6 }}>
              <h2 style={{ fontSize: 24, fontWeight: 800, color: '#0f172a', margin: 0 }}>{district.name}</h2>
              <span style={{
                background: rs.bg, color: rs.color, border: `1px solid ${rs.border}`,
                padding: '3px 12px', borderRadius: 20, fontSize: 12, fontWeight: 700
              }}>{district.risk_level} Risk</span>
            </div>
            <p style={{ color: '#64748b', fontSize: 13, margin: 0 }}>
              Population: {district.population.toLocaleString('en-IN')} · Households: {district.households.toLocaleString('en-IN')}
            </p>
          </div>
          <button onClick={onClose} style={{
            width: 36, height: 36, borderRadius: '50%', border: '1px solid #e2e8f0',
            background: '#f8fafc', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center'
          }}><X size={16} /></button>
        </div>

        {/* KPI Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginBottom: 24 }}>
          <StatBox label="Health Score" value={`${district.health_score}%`} icon={<TrendingUp size={14} />} color="#22c55e" />
          <StatBox label="Literacy Rate" value={`${district.literacy_rate}%`} icon={<BookOpen size={14} />} color="#3b82f6" />
          <StatBox label="Work Part." value={`${district.work_participation}%`} icon={<Briefcase size={14} />} color="#8b5cf6" />
          <StatBox label="Active Issues" value={district.active_issues.toLocaleString()} icon={<AlertTriangle size={14} />} color="#f59e0b" />
        </div>

        {/* Charts Row */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 24 }}>
          {/* Radar */}
          <div style={{ background: '#f8fafc', borderRadius: 12, padding: '16px' }}>
            <h3 style={{ fontSize: 13, fontWeight: 700, color: '#475569', marginBottom: 12 }}>Performance Radar</h3>
            <ResponsiveContainer width="100%" height={200}>
              <RadarChart data={radarData}>
                <PolarGrid stroke="#e2e8f0" />
                <PolarAngleAxis dataKey="subject" tick={{ fontSize: 10, fill: '#94a3b8' }} />
                <Radar name="Score" dataKey="value" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.2} />
              </RadarChart>
            </ResponsiveContainer>
          </div>

          {/* Demographics Bar */}
          <div style={{ background: '#f8fafc', borderRadius: 12, padding: '16px' }}>
            <h3 style={{ fontSize: 13, fontWeight: 700, color: '#475569', marginBottom: 12 }}>Demographics</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {[
                { label: 'Male Pop.', pct: Math.round(district.male_population / district.population * 100), color: '#3b82f6' },
                { label: 'Female Pop.', pct: Math.round(district.female_population / district.population * 100), color: '#ec4899' },
                { label: 'SC Population', pct: district.sc_pct, color: '#8b5cf6' },
                { label: 'ST Population', pct: district.st_pct, color: '#22c55e' },
                { label: 'Illiteracy Rate', pct: district.illiteracy_rate, color: '#ef4444' },
              ].map(item => (
                <div key={item.label}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 3 }}>
                    <span style={{ fontSize: 11, color: '#64748b' }}>{item.label}</span>
                    <span style={{ fontSize: 11, fontWeight: 700, color: '#0f172a' }}>{item.pct}%</span>
                  </div>
                  <div style={{ height: 5, background: '#e2e8f0', borderRadius: 4 }}>
                    <div style={{ width: `${Math.min(100, item.pct)}%`, height: '100%', background: item.color, borderRadius: 4, transition: 'width 0.6s' }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* AI Insights */}
        {rec && (
          <div style={{ marginBottom: 20 }}>
            <h3 style={{ fontSize: 14, fontWeight: 700, color: '#0f172a', marginBottom: 12 }}>🧠 Intelligence Insights</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <div>
                <div style={{ fontSize: 12, fontWeight: 700, color: '#64748b', marginBottom: 8, textTransform: 'uppercase' }}>Findings</div>
                {rec.insights.map((insight, i) => (
                  <div key={i} style={{
                    background: '#eff6ff', borderLeft: '3px solid #3b82f6',
                    padding: '8px 12px', borderRadius: '0 6px 6px 0', marginBottom: 6, fontSize: 12, color: '#1e40af'
                  }}>{insight}</div>
                ))}
              </div>
              <div>
                <div style={{ fontSize: 12, fontWeight: 700, color: '#64748b', marginBottom: 8, textTransform: 'uppercase' }}>Recommended Actions</div>
                {rec.recommended_actions.map((action, i) => (
                  <div key={i} style={{
                    background: '#f0fdf4', borderLeft: '3px solid #22c55e',
                    padding: '8px 12px', borderRadius: '0 6px 6px 0', marginBottom: 6, fontSize: 12, color: '#166534'
                  }}>→ {action}</div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Bottom stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
          <div style={{ textAlign: 'center', padding: 12, background: '#f8fafc', borderRadius: 10 }}>
            <div style={{ fontSize: 18, fontWeight: 800, color: '#0f172a' }}>{district.complaints_this_month.toLocaleString()}</div>
            <div style={{ fontSize: 11, color: '#94a3b8', marginTop: 4 }}>Grievances This Month</div>
          </div>
          <div style={{ textAlign: 'center', padding: 12, background: '#f8fafc', borderRadius: 10 }}>
            <div style={{ fontSize: 18, fontWeight: 800, color: '#22c55e' }}>{district.actions_taken.toLocaleString()}</div>
            <div style={{ fontSize: 11, color: '#94a3b8', marginTop: 4 }}>Actions Taken</div>
          </div>
          <div style={{ textAlign: 'center', padding: 12, background: '#f8fafc', borderRadius: 10 }}>
            <div style={{ fontSize: 18, fontWeight: 800, color: '#3b82f6' }}>
              {Math.round(district.actions_taken / (district.complaints_this_month || 1) * 100)}%
            </div>
            <div style={{ fontSize: 11, color: '#94a3b8', marginTop: 4 }}>Resolution Rate</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function District() {
  const [districts, setDistricts] = useState<District[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('All');
  const [selected, setSelected] = useState<District | null>(null);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetch(`${BASE}/districts`)
      .then(r => r.json()).then(setDistricts)
      .finally(() => setLoading(false));
  }, []);

  const filtered = districts.filter(d => {
    const matchRisk = filter === 'All' || d.risk_level === filter;
    const matchSearch = d.name.toLowerCase().includes(search.toLowerCase());
    return matchRisk && matchSearch;
  });

  return (
    <div>
      {selected && <DetailModal district={selected} onClose={() => setSelected(null)} />}

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 24 }}>
        <div>
          <h1 style={{ fontSize: 28, fontWeight: 800, color: '#0f172a', margin: 0 }}>District Intelligence</h1>
          <p style={{ color: '#64748b', fontSize: 14, marginTop: 4 }}>
            {filtered.length} of {districts.length} states/UTs — Click <b>View Details</b> for deep analytics
          </p>
        </div>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <input
            placeholder="Search state..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{
              padding: '7px 12px', borderRadius: 8, border: '1px solid #e2e8f0',
              fontSize: 13, outline: 'none', width: 160
            }}
          />
          {['All','Low','Medium','High','Critical'].map(f => (
            <button key={f} onClick={() => setFilter(f)} style={{
              padding: '6px 14px', borderRadius: 8, border: '1px solid #e2e8f0',
              background: filter === f ? '#0f172a' : '#fff',
              color: filter === f ? '#fff' : '#475569', fontSize: 12, cursor: 'pointer', fontWeight: 500
            }}>{f}</button>
          ))}
        </div>
      </div>

      <div style={{ background: '#fff', borderRadius: 14, border: '1px solid #f1f5f9', overflow: 'hidden', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
        <div style={{
          display: 'grid', gridTemplateColumns: '2fr 1fr 2fr 1fr 1fr 1fr',
          padding: '12px 24px', borderBottom: '1px solid #f1f5f9',
          fontSize: 11, fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.06em',
          background: '#fafafa'
        }}>
          <span>STATE / UT</span><span>RISK LEVEL</span>
          <span>HEALTH SCORE</span><span>POPULATION</span>
          <span>LITERACY</span><span>ACTION</span>
        </div>

        {loading ? (
          <div style={{ padding: 60, textAlign: 'center', color: '#94a3b8' }}>
            <div style={{ fontSize: 32, marginBottom: 8 }}>⚙️</div>
            Loading intelligence data...
          </div>
        ) : filtered.length === 0 ? (
          <div style={{ padding: 40, textAlign: 'center', color: '#94a3b8' }}>No states match your filters.</div>
        ) : filtered.map((d, i) => {
          const rs = RISK_STYLE[d.risk_level] || RISK_STYLE.Medium;
          const barColor = d.health_score >= 75 ? '#22c55e' : d.health_score >= 55 ? '#f59e0b' : '#ef4444';
          return (
            <div key={d.name} style={{
              display: 'grid', gridTemplateColumns: '2fr 1fr 2fr 1fr 1fr 1fr',
              padding: '16px 24px',
              borderBottom: i < filtered.length - 1 ? '1px solid #f8fafc' : 'none',
              alignItems: 'center', cursor: 'pointer', transition: 'background 0.15s'
            }}
              onMouseEnter={e => (e.currentTarget.style.background = '#f8fafc')}
              onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
            >
              <span style={{ fontWeight: 700, color: '#0f172a', fontSize: 14 }}>{d.name}</span>

              <span>
                <span style={{
                  background: rs.bg, color: rs.color, border: `1px solid ${rs.border}`,
                  padding: '3px 10px', borderRadius: 20, fontSize: 11, fontWeight: 700
                }}>{d.risk_level}</span>
              </span>

              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ flex: 1, height: 7, background: '#f1f5f9', borderRadius: 4, overflow: 'hidden' }}>
                  <div style={{
                    width: `${d.health_score}%`, height: '100%',
                    background: barColor, borderRadius: 4, transition: 'width 0.6s'
                  }} />
                </div>
                <span style={{ fontSize: 13, fontWeight: 700, color: '#0f172a', minWidth: 38 }}>{d.health_score}%</span>
              </div>

              <span style={{ fontSize: 12, color: '#475569' }}>{(d.population / 1000000).toFixed(1)}M</span>

              <span style={{ fontSize: 13, fontWeight: 600, color: '#475569' }}>{d.literacy_rate}%</span>

              <button
                onClick={() => setSelected(d)}
                style={{
                  padding: '6px 14px', borderRadius: 8, border: '1px solid #3b82f6',
                  background: '#eff6ff', color: '#3b82f6', fontSize: 12,
                  fontWeight: 700, cursor: 'pointer', transition: 'all 0.15s'
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLButtonElement).style.background = '#3b82f6';
                  (e.currentTarget as HTMLButtonElement).style.color = '#fff';
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLButtonElement).style.background = '#eff6ff';
                  (e.currentTarget as HTMLButtonElement).style.color = '#3b82f6';
                }}
              >
                View Details
              </button>
            </div>
          );
        })}
      </div>

      {/* Summary bar */}
      <div style={{ display: 'flex', gap: 12, marginTop: 16 }}>
        {['Low','Medium','High','Critical'].map(level => {
          const count = districts.filter(d => d.risk_level === level).length;
          const rs = RISK_STYLE[level];
          return (
            <div key={level} style={{
              flex: 1, background: rs.bg, border: `1px solid ${rs.border}`,
              borderRadius: 10, padding: '12px 16px', textAlign: 'center',
              cursor: 'pointer', transition: 'transform 0.15s'
            }}
              onClick={() => setFilter(level)}
              onMouseEnter={e => (e.currentTarget.style.transform = 'translateY(-2px)')}
              onMouseLeave={e => (e.currentTarget.style.transform = 'translateY(0)')}
            >
              <div style={{ fontSize: 24, fontWeight: 800, color: rs.color }}>{count}</div>
              <div style={{ fontSize: 11, color: rs.color, fontWeight: 600, marginTop: 2 }}>{level} Risk States</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
