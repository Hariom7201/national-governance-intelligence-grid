import React, { useMemo } from 'react';
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis,
  CartesianGrid, Tooltip, ResponsiveContainer, Cell
} from 'recharts';
import { Users, AlertTriangle, ShieldAlert, CheckCircle } from 'lucide-react';
import { useDistricts } from '../hooks/useDistricts';
import { useFraud } from '../hooks/useFraud';
import { useCrisis } from '../hooks/useCrisis';
import KPICard from '../components/KPICard';
import InsightBanner from '../components/InsightBanner';
import { toDistrictRiskBars, generateTrendData, toKPISummary } from '../utils/dataTransformers';
import { generateInsights } from '../utils/intelligenceEngine';

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{
      background: '#fff', border: '1px solid #e2e8f0', borderRadius: 10,
      padding: '10px 14px', boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
    }}>
      <p style={{ color: '#64748b', fontSize: 12, marginBottom: 4 }}>{label}</p>
      {payload.map((p: any) => (
        <p key={p.dataKey} style={{ color: p.color, fontSize: 13, fontWeight: 600, margin: '2px 0' }}>
          {p.dataKey}: {p.value.toLocaleString()}
        </p>
      ))}
    </div>
  );
};

export default function Dashboard() {
  const { districts, loading: dLoad } = useDistricts(true);
  const { fraudAlerts, loading: fLoad } = useFraud();
  const { crises, loading: cLoad } = useCrisis();

  const kpis = useMemo(() => toKPISummary(districts, crises, fraudAlerts), [districts, crises, fraudAlerts]);
  const trendData = useMemo(() => generateTrendData(districts), [districts]);
  const riskBars = useMemo(() => toDistrictRiskBars(districts), [districts]);
  const insights = useMemo(() => generateInsights(districts, crises, fraudAlerts), [districts, crises, fraudAlerts]);

  if (dLoad || fLoad || cLoad) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '60vh' }}>
        <div style={{ color: '#64748b', fontSize: 15 }}>Loading intelligence grid...</div>
      </div>
    );
  }

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: 28, fontWeight: 800, color: '#0f172a', margin: 0 }}>Dashboard</h1>
        <p style={{ color: '#64748b', fontSize: 14, marginTop: 4 }}>Real-time intelligence and governance overview.</p>
      </div>

      <InsightBanner insights={insights} />

      {/* KPI Cards */}
      <div style={{ display: 'flex', gap: 16, marginBottom: 24, flexWrap: 'wrap' }}>
        <KPICard
          title="Total Grievances"
          value={kpis.totalGrievances}
          delta="+12% vs last month"
          deltaPositive={false}
          icon={<Users size={18} />}
          accentColor="#3b82f6"
        />
        <KPICard
          title="Active Crises"
          value={kpis.activeCrises}
          delta="-5% vs last month"
          deltaPositive={true}
          icon={<AlertTriangle size={18} />}
          accentColor="#f59e0b"
        />
        <KPICard
          title="Fraud Alerts"
          value={kpis.fraudCount}
          delta="+8% vs last month"
          deltaPositive={false}
          icon={<ShieldAlert size={18} />}
          accentColor="#ef4444"
        />
        <KPICard
          title="Actions Taken"
          value={kpis.actionsTaken}
          delta="+15% vs last month"
          deltaPositive={true}
          icon={<CheckCircle size={18} />}
          accentColor="#22c55e"
        />
      </div>

      {/* Charts Row */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 24 }}>
        {/* Line Chart */}
        <div style={{
          background: '#fff', borderRadius: 14, padding: '20px 24px',
          border: '1px solid #f1f5f9', boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
        }}>
          <h2 style={{ fontSize: 15, fontWeight: 700, color: '#0f172a', marginBottom: 20 }}>
            Grievance vs Action Trends
          </h2>
          <ResponsiveContainer width="100%" height={240}>
            <LineChart data={trendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Line type="monotone" dataKey="grievances" stroke="#3b82f6" strokeWidth={2.5} dot={{ r: 3, fill: '#3b82f6' }} />
              <Line type="monotone" dataKey="actions" stroke="#22c55e" strokeWidth={2.5} dot={{ r: 3, fill: '#22c55e' }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Bar Chart */}
        <div style={{
          background: '#fff', borderRadius: 14, padding: '20px 24px',
          border: '1px solid #f1f5f9', boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
        }}>
          <h2 style={{ fontSize: 15, fontWeight: 700, color: '#0f172a', marginBottom: 20 }}>
            District Risk Distribution
          </h2>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={riskBars} barSize={32}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
              <XAxis dataKey="shortName" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="active_issues" radius={[6, 6, 0, 0]}>
                {riskBars.map((entry, index) => (
                  <Cell key={index} fill={entry.fill} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}