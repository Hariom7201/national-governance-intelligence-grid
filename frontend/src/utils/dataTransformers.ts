import type { District, Crisis, FraudAlert } from '../services/api';

export interface TrendDataPoint {
  month: string;
  grievances: number;
  actions: number;
  fraud: number;
}

export interface DistrictRiskBar {
  name: string;
  shortName: string;
  risk_score: number;
  active_issues: number;
  health_score: number;
  fill: string;
}

const RISK_COLORS: Record<string, string> = {
  Low: '#22c55e',
  Medium: '#f59e0b',
  High: '#ef4444',
  Critical: '#7c3aed',
};

export function toDistrictRiskBars(districts: District[]): DistrictRiskBar[] {
  return districts.map((d) => ({
    name: d.name,
    shortName: d.name.replace(' District', ''),
    risk_score: 100 - d.health_score,
    active_issues: d.active_issues,
    health_score: d.health_score,
    fill: RISK_COLORS[d.risk_level] || '#6b7280',
  }));
}

export function generateTrendData(districts: District[]): TrendDataPoint[] {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'];
  const base = districts.reduce((sum, d) => sum + d.complaints_this_month, 0);

  return months.map((month, i) => {
    const factor = [0.6, 0.75, 1.2, 0.9, 0.8, 1.0, 1.1][i];
    const actionFactor = [0.4, 0.5, 0.7, 0.95, 0.85, 0.9, 1.0][i];
    return {
      month,
      grievances: Math.round(base * factor * 0.3),
      actions: Math.round(base * actionFactor * 0.25),
      fraud: Math.round(15 + i * 3 + Math.random() * 10),
    };
  });
}

export function toKPISummary(districts: District[], crises: Crisis[], fraudAlerts: FraudAlert[]) {
  const totalGrievances = districts.reduce((s, d) => s + d.complaints_this_month, 0);
  const activeCrises = crises.filter((c) => c.status === 'Active').length;
  const fraudCount = fraudAlerts.length;
  const actionsTaken = districts.reduce((s, d) => s + d.actions_taken, 0);

  return { totalGrievances, activeCrises, fraudCount, actionsTaken };
}

export function getCrisisByDistrict(crises: Crisis[]) {
  const map: Record<string, number> = {};
  crises.forEach((c) => {
    map[c.district] = (map[c.district] || 0) + 1;
  });
  return Object.entries(map).map(([district, count]) => ({ district, count }));
}