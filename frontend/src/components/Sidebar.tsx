import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard, MapPin, AlertTriangle,
  ShieldAlert, Zap, Activity
} from 'lucide-react';

const NAV = [
  { to: '/', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/district', icon: MapPin, label: 'District' },
  { to: '/crisis', icon: AlertTriangle, label: 'Crisis' },
  { to: '/fraud', icon: ShieldAlert, label: 'Fraud' },
  { to: '/action', icon: Zap, label: 'Action' },
];

export default function Sidebar() {
  return (
    <aside style={{
      width: 240, minHeight: '100vh', background: '#0f1117',
      borderRight: '1px solid #1e2230', display: 'flex',
      flexDirection: 'column', padding: '0', position: 'fixed', zIndex: 100
    }}>
      {/* Logo */}
      <div style={{
        padding: '20px 20px 16px', borderBottom: '1px solid #1e2230',
        display: 'flex', alignItems: 'center', gap: 12
      }}>
        <div style={{
          width: 36, height: 36, borderRadius: 10, background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
          display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}>
          <Activity size={18} color="#fff" />
        </div>
        <div>
          <div style={{ color: '#fff', fontWeight: 700, fontSize: 14, letterSpacing: '0.02em' }}>Digital Democracy</div>
          <div style={{ color: '#4b5563', fontSize: 11 }}>Intelligence Grid</div>
        </div>
      </div>

      {/* Nav Label */}
      <div style={{ padding: '20px 20px 8px', color: '#374151', fontSize: 11, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
        MAIN MENU
      </div>

      {/* Nav Items */}
      <nav style={{ flex: 1, padding: '0 12px' }}>
        {NAV.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            style={({ isActive }) => ({
              display: 'flex', alignItems: 'center', gap: 12,
              padding: '10px 12px', borderRadius: 8, marginBottom: 2,
              textDecoration: 'none', transition: 'all 0.15s',
              background: isActive ? 'linear-gradient(90deg, #1d4ed8, #2563eb)' : 'transparent',
              color: isActive ? '#fff' : '#6b7280',
            })}
          >
            <Icon size={16} />
            <span style={{ fontSize: 14, fontWeight: 500 }}>{label}</span>
          </NavLink>
        ))}
      </nav>

      {/* User */}
      <div style={{
        padding: '16px 20px', borderTop: '1px solid #1e2230',
        display: 'flex', alignItems: 'center', gap: 10
      }}>
        <div style={{
          width: 34, height: 34, borderRadius: '50%', background: '#1e2230',
          display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}>
          <span style={{ color: '#6b7280', fontSize: 14 }}>A</span>
        </div>
        <div>
          <div style={{ color: '#d1d5db', fontSize: 13, fontWeight: 600 }}>Admin User</div>
          <div style={{ color: '#4b5563', fontSize: 11 }}>Central Authority</div>
        </div>
      </div>
    </aside>
  );
}