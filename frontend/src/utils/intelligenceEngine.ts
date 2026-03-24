import type { District, Crisis, FraudAlert } from '../services/api';

export interface Insight {
  id: string;
  level: 'info' | 'warning' | 'critical';
  message: string;
  district?: string;
  timestamp: Date;
}

export function generateInsights(
  districts: District[],
  crises: Crisis[],
  fraudAlerts: FraudAlert[]
): Insight[] {
  const insights: Insight[] = [];
  let id = 0;

  // District risk analysis
  districts.forEach((d) => {
    if (d.risk_level === 'Critical') {
      insights.push({
        id: String(id++),
        level: 'critical',
        message: `🚨 ${d.name} is in CRITICAL status with ${d.active_issues} active issues. Immediate intervention required.`,
        district: d.name,
        timestamp: new Date(),
      });
    } else if (d.risk_level === 'High') {
      insights.push({
        id: String(id++),
        level: 'warning',
        message: `⚠️ ${d.name} shows HIGH risk. Health score dropped to ${d.health_score}%. Monitor closely.`,
        district: d.name,
        timestamp: new Date(),
      });
    }

    if (d.complaints_this_month > 400) {
      insights.push({
        id: String(id++),
        level: 'warning',
        message: `📈 Grievance surge detected in ${d.name}: ${d.complaints_this_month} complaints this month.`,
        district: d.name,
        timestamp: new Date(),
      });
    }

    const resolution = d.actions_taken / (d.complaints_this_month || 1);
    if (resolution < 0.5) {
      insights.push({
        id: String(id++),
        level: 'warning',
        message: `📉 Low resolution rate in ${d.name} (${Math.round(resolution * 100)}%). Action pipeline may be blocked.`,
        district: d.name,
        timestamp: new Date(),
      });
    }
  });

  // Crisis analysis
  const activeCrises = crises.filter((c) => c.status === 'Active');
  if (activeCrises.length > 3) {
    insights.push({
      id: String(id++),
      level: 'critical',
      message: `🔴 Multi-district crisis event: ${activeCrises.length} active crises simultaneously. National coordination needed.`,
      timestamp: new Date(),
    });
  }

  activeCrises.forEach((c) => {
    if (c.severity === 'High' || c.severity === 'Critical') {
      insights.push({
        id: String(id++),
        level: 'critical',
        message: `🆘 ${c.title} in ${c.district} — Severity: ${c.severity}. Deploy emergency response.`,
        district: c.district,
        timestamp: new Date(),
      });
    }
  });

  // Fraud analysis
  const verifiedFraud = fraudAlerts.filter((f) => f.status === 'Verified Fraud');
  const totalAmount = verifiedFraud.reduce((s, f) => s + f.amount, 0);

  if (verifiedFraud.length > 0) {
    insights.push({
      id: String(id++),
      level: 'critical',
      message: `💰 ₹${(totalAmount / 100000).toFixed(1)}L in verified fraud across ${verifiedFraud.length} scheme(s). Escalate to vigilance.`,
      timestamp: new Date(),
    });
  }

  const fraudByDistrict: Record<string, number> = {};
  fraudAlerts.forEach((f) => {
    fraudByDistrict[f.district] = (fraudByDistrict[f.district] || 0) + 1;
  });
  Object.entries(fraudByDistrict).forEach(([district, count]) => {
    if (count >= 2) {
      insights.push({
        id: String(id++),
        level: 'warning',
        message: `🔍 Fraud pattern detected in ${district}: ${count} alerts in the same region. Systemic risk possible.`,
        district,
        timestamp: new Date(),
      });
    }
  });

  if (insights.length === 0) {
    insights.push({
      id: String(id++),
      level: 'info',
      message: '✅ All districts operating within normal parameters. No critical alerts at this time.',
      timestamp: new Date(),
    });
  }

  return insights.sort((a, b) => {
    const order = { critical: 0, warning: 1, info: 2 };
    return order[a.level] - order[b.level];
  });
}

export function getRiskScore(district: District): number {
  let score = 100 - district.health_score;
  if (district.risk_level === 'Critical') score = Math.max(score, 85);
  else if (district.risk_level === 'High') score = Math.max(score, 65);
  else if (district.risk_level === 'Medium') score = Math.max(score, 40);
  return Math.min(score, 100);
}