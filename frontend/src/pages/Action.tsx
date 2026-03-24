import React, { useState, useEffect } from 'react';
import { Clock, Zap, CheckCircle, AlertCircle, X, User, Calendar, MapPin, TrendingUp } from 'lucide-react';

const BASE = import.meta.env.VITE_API_URL || 'http://localhost:8000';

const PRIORITY: Record<string, { bg: string; color: string; border: string }> = {
  Critical: { bg: '#fce7f3', color: '#9d174d', border: '#ec4899' },
  High:     { bg: '#fee2e2', color: '#dc2626', border: '#ef4444' },
  Medium:   { bg: '#fef9c3', color: '#ca8a04', border: '#f59e0b' },
  Low:      { bg: '#dcfce7', color: '#16a34a', border: '#22c55e' },
};

const STATUS_CONFIG: Record<string, { icon: React.ReactNode; color: string; bg: string; next: string }> = {
  'Pending':     { icon: <Clock size={14} />, color: '#94a3b8', bg: '#f8fafc', next: 'In Progress' },
  'In Progress': { icon: <Zap size={14} />, color: '#3b82f6', bg: '#eff6ff', next: 'Completed' },
  'Completed':   { icon: <CheckCircle size={14} />, color: '#22c55e', bg: '#f0fdf4', next: 'Pending' },
};

interface Action {
  id: string; title: string; district: string;
  priority: string; status: string; deadline: string;
  assigned_to: string; description?: string;
  health_score?: number; literacy_rate?: number;
}

function ActionDetailModal({ action, onClose, onStatusChange }: {
  action: Action; onClose: () => void; onStatusChange: (id: string, status: string) => void;
}) {
  const p = PRIORITY[action.priority] || PRIORITY.Medium;
  const s = STATUS_CONFIG[action.status] || STATUS_CONFIG['Pending'];
  const nextStatus = s.next;

  const isOverdue = new Date(action.deadline) < new Date() && action.status !== 'Completed';

  return (
    <div style={{
      position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)',
      zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20
    }} onClick={onClose}>
      <div style={{
        background: '#fff', borderRadius: 16, maxWidth: 560, width: '100%',
        padding: 28, boxShadow: '0 25px 60px rgba(0,0,0,0.2)'
      }} onClick={e => e.stopPropagation()}>

        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 20 }}>
          <div>
            <h2 style={{ fontSize: 18, fontWeight: 800, color: '#0f172a', margin: 0 }}>{action.title}</h2>
            <div style={{ fontSize: 12, color: '#94a3b8', marginTop: 4 }}>Action ID: {action.id}</div>
          </div>
          <button onClick={onClose} style={{ width: 32, height: 32, borderRadius: '50%', border: '1px solid #e2e8f0', background: '#f8fafc', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <X size={14} />
          </button>
        </div>

        {/* Status Banner */}
        <div style={{ background: s.bg, border: `1px solid ${s.color}30`, borderRadius: 10, padding: '12px 16px', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ color: s.color }}>{s.icon}</span>
          <span style={{ color: s.color, fontWeight: 700, fontSize: 13 }}>Status: {action.status}</span>
          {isOverdue && <span style={{ marginLeft: 'auto', background: '#fee2e2', color: '#dc2626', padding: '2px 8px', borderRadius: 20, fontSize: 10, fontWeight: 700 }}>⚠️ OVERDUE</span>}
        </div>

        {/* Details Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 20 }}>
          {[
            { icon: <MapPin size={12} />, label: 'District', value: action.district },
            { icon: <User size={12} />, label: 'Assigned To', value: action.assigned_to },
            { icon: <Calendar size={12} />, label: 'Deadline', value: action.deadline },
            { icon: <AlertCircle size={12} />, label: 'Priority', value: action.priority, color: p.color },
          ].map(item => (
            <div key={item.label} style={{ background: '#f8fafc', borderRadius: 8, padding: '10px 12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 5, color: '#94a3b8', marginBottom: 4 }}>
                {item.icon}
                <span style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{item.label}</span>
              </div>
              <div style={{ fontSize: 13, fontWeight: 700, color: (item as any).color || '#0f172a' }}>{item.value}</div>
            </div>
          ))}
        </div>

        {/* Description */}
        {action.description && (
          <div style={{ background: '#f8fafc', borderRadius: 10, padding: '12px 16px', marginBottom: 20 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', marginBottom: 6 }}>Description</div>
            <div style={{ fontSize: 13, color: '#475569', lineHeight: 1.6 }}>{action.description}</div>
          </div>
        )}

        {/* Health + Literacy if available */}
        {action.health_score && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 20 }}>
            <div style={{ background: '#eff6ff', borderRadius: 8, padding: '10px 14px', textAlign: 'center' }}>
              <div style={{ fontSize: 20, fontWeight: 800, color: '#3b82f6' }}>{action.health_score}%</div>
              <div style={{ fontSize: 11, color: '#3b82f6', marginTop: 2 }}>Health Score</div>
            </div>
            <div style={{ background: '#f0fdf4', borderRadius: 8, padding: '10px 14px', textAlign: 'center' }}>
              <div style={{ fontSize: 20, fontWeight: 800, color: '#22c55e' }}>{action.literacy_rate}%</div>
              <div style={{ fontSize: 11, color: '#22c55e', marginTop: 2 }}>Literacy Rate</div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div style={{ display: 'flex', gap: 10 }}>
          {action.status !== 'Completed' && (
            <button
              onClick={() => { onStatusChange(action.id, nextStatus); onClose(); }}
              style={{
                flex: 1, padding: '12px', background: '#0f172a', color: '#fff',
                border: 'none', borderRadius: 10, cursor: 'pointer', fontWeight: 700, fontSize: 13,
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                transition: 'background 0.2s'
              }}
              onMouseEnter={e => (e.currentTarget.style.background = '#1e40af')}
              onMouseLeave={e => (e.currentTarget.style.background = '#0f172a')}
            >
              <Zap size={14} />
              Mark as "{nextStatus}"
            </button>
          )}
          {action.status === 'Completed' && (
            <button
              onClick={() => { onStatusChange(action.id, 'Pending'); onClose(); }}
              style={{
                flex: 1, padding: '12px', background: '#f8fafc', color: '#475569',
                border: '1px solid #e2e8f0', borderRadius: 10, cursor: 'pointer', fontWeight: 700, fontSize: 13
              }}
            >
              Reopen Task
            </button>
          )}
          <button onClick={onClose} style={{
            padding: '12px 20px', background: '#f8fafc', color: '#475569',
            border: '1px solid #e2e8f0', borderRadius: 10, cursor: 'pointer', fontWeight: 600, fontSize: 13
          }}>Close</button>
        </div>
      </div>
    </div>
  );
}

export default function Action() {
  const [actions, setActions] = useState<Action[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Action | null>(null);
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    fetch(`${BASE}/actions`).then(r => r.json()).then(setActions).finally(() => setLoading(false));
  }, []);

  const handleStatusChange = (id: string, newStatus: string) => {
    setActions(prev => prev.map(a => a.id === id ? { ...a, status: newStatus } : a));
    if (selected?.id === id) setSelected(prev => prev ? { ...prev, status: newStatus } : null);
  };

  const filtered = filter === 'All' ? actions : actions.filter(a => a.status === filter || a.priority === filter);

  const stats = {
    total: actions.length,
    pending: actions.filter(a => a.status === 'Pending').length,
    inProgress: actions.filter(a => a.status === 'In Progress').length,
    completed: actions.filter(a => a.status === 'Completed').length,
    overdue: actions.filter(a => new Date(a.deadline) < new Date() && a.status !== 'Completed').length,
  };

  return (
    <div>
      {selected && (
        <ActionDetailModal
          action={selected}
          onClose={() => setSelected(null)}
          onStatusChange={handleStatusChange}
        />
      )}

      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: 28, fontWeight: 800, color: '#0f172a', margin: 0 }}>Action Dashboard</h1>
        <p style={{ color: '#64748b', fontSize: 14, marginTop: 4 }}>
          Click any row or <b>update status button</b> to manage tasks
        </p>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5,1fr)', gap: 12, marginBottom: 24 }}>
        {[
          { label: 'Total', value: stats.total, color: '#3b82f6', bg: '#eff6ff' },
          { label: 'Pending', value: stats.pending, color: '#94a3b8', bg: '#f8fafc' },
          { label: 'In Progress', value: stats.inProgress, color: '#3b82f6', bg: '#eff6ff' },
          { label: 'Completed', value: stats.completed, color: '#22c55e', bg: '#f0fdf4' },
          { label: 'Overdue', value: stats.overdue, color: '#dc2626', bg: '#fee2e2' },
        ].map(s => (
          <div key={s.label} style={{ background: s.bg, borderRadius: 12, padding: '14px 16px', cursor: 'pointer' }}
            onClick={() => setFilter(s.label === 'Total' ? 'All' : s.label)}>
            <div style={{ fontSize: 24, fontWeight: 800, color: s.color }}>{s.value}</div>
            <div style={{ fontSize: 11, color: s.color, fontWeight: 600, marginTop: 2 }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
        {['All','Pending','In Progress','Completed','Critical','High'].map(f => (
          <button key={f} onClick={() => setFilter(f)} style={{
            padding: '5px 14px', borderRadius: 20, border: '1px solid #e2e8f0', fontSize: 12,
            background: filter === f ? '#0f172a' : '#fff',
            color: filter === f ? '#fff' : '#475569', cursor: 'pointer', fontWeight: 500
          }}>{f}</button>
        ))}
      </div>

      {/* Task List */}
      <div style={{ background: '#fff', borderRadius: 14, border: '1px solid #f1f5f9', overflow: 'hidden', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
        {loading ? (
          <div style={{ padding: 60, textAlign: 'center', color: '#94a3b8' }}>Loading actions...</div>
        ) : filtered.length === 0 ? (
          <div style={{ padding: 40, textAlign: 'center', color: '#94a3b8' }}>No actions match filters.</div>
        ) : filtered.map((a, i) => {
          const p = PRIORITY[a.priority] || PRIORITY.Medium;
          const s = STATUS_CONFIG[a.status] || STATUS_CONFIG['Pending'];
          const isOverdue = new Date(a.deadline) < new Date() && a.status !== 'Completed';

          return (
            <div key={a.id} style={{
              display: 'flex', alignItems: 'center', gap: 16, padding: '18px 24px',
              borderBottom: i < filtered.length - 1 ? '1px solid #f8fafc' : 'none',
              cursor: 'pointer', transition: 'background 0.15s'
            }}
              onMouseEnter={e => (e.currentTarget.style.background = '#f8fafc')}
              onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
              onClick={() => setSelected(a)}
            >
              {/* Status icon */}
              <div style={{ color: s.color, flexShrink: 0 }}>{s.icon}</div>

              {/* Main content */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontWeight: 700, fontSize: 14, color: '#0f172a', marginBottom: 4 }}>{a.title}</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: 12, color: '#94a3b8', flexWrap: 'wrap' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><MapPin size={10} />{a.district}</span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><User size={10} />{a.assigned_to}</span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 4, color: isOverdue ? '#dc2626' : '#94a3b8' }}>
                    <Calendar size={10} />{a.deadline}{isOverdue && ' ⚠️'}
                  </span>
                </div>
              </div>

              {/* Priority badge */}
              <span style={{
                background: p.bg, color: p.color, border: `1px solid ${p.border}`,
                padding: '3px 10px', borderRadius: 20, fontSize: 11, fontWeight: 700, flexShrink: 0
              }}>{a.priority}</span>

              {/* Status + Action button */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}>
                <span style={{
                  background: s.bg, color: s.color,
                  padding: '4px 12px', borderRadius: 20, fontSize: 11, fontWeight: 700
                }}>{a.status.toUpperCase()}</span>

                <button
                  onClick={e => {
                    e.stopPropagation();
                    handleStatusChange(a.id, s.next);
                  }}
                  style={{
                    padding: '6px 12px', borderRadius: 8,
                    border: `1px solid ${s.color}`, background: s.bg,
                    color: s.color, fontSize: 11, fontWeight: 700, cursor: 'pointer',
                    display: 'flex', alignItems: 'center', gap: 5, transition: 'all 0.15s',
                    whiteSpace: 'nowrap'
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLButtonElement).style.background = s.color;
                    (e.currentTarget as HTMLButtonElement).style.color = '#fff';
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLButtonElement).style.background = s.bg;
                    (e.currentTarget as HTMLButtonElement).style.color = s.color;
                  }}
                >
                  {a.status === 'Pending' && <><Clock size={11} /> Start</>}
                  {a.status === 'In Progress' && <><CheckCircle size={11} /> Complete</>}
                  {a.status === 'Completed' && <><Clock size={11} /> Reopen</>}
                </button>

                <button
                  onClick={e => { e.stopPropagation(); setSelected(a); }}
                  style={{
                    padding: '6px 12px', borderRadius: 8, border: '1px solid #e2e8f0',
                    background: '#fff', color: '#475569', fontSize: 11, fontWeight: 600,
                    cursor: 'pointer'
                  }}
                >Details</button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
