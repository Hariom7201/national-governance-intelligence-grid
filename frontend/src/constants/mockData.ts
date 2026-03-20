import { Users, AlertTriangle, ShieldAlert, CheckCircle2 } from 'lucide-react';

export const DASHBOARD_STATS = [
  { label: 'Total Grievances', value: '12,456', change: '+12%', icon: Users, color: 'text-blue-600' },
  { label: 'Active Crises', value: '24', change: '-5%', icon: AlertTriangle, color: 'text-red-600' },
  { label: 'Fraud Alerts', value: '156', change: '+8%', icon: ShieldAlert, color: 'text-amber-600' },
  { label: 'Actions Taken', value: '8,920', change: '+15%', icon: CheckCircle2, color: 'text-green-600' },
];

export const TREND_DATA = [
  { name: 'Jan', grievances: 400, actions: 240 },
  { name: 'Feb', grievances: 300, actions: 139 },
  { name: 'Mar', grievances: 200, actions: 980 },
  { name: 'Apr', grievances: 278, actions: 390 },
  { name: 'May', grievances: 189, actions: 480 },
  { name: 'Jun', grievances: 239, actions: 380 },
  { name: 'Jul', grievances: 349, actions: 430 },
];

export const DISTRICT_DATA = [
  { name: 'North District', risk: 'Low', score: 85, issues: 120 },
  { name: 'South District', risk: 'High', score: 42, issues: 450 },
  { name: 'East District', risk: 'Medium', score: 65, issues: 280 },
  { name: 'West District', risk: 'Low', score: 92, issues: 85 },
  { name: 'Central District', risk: 'Medium', score: 58, issues: 310 },
];

export const CRISIS_ALERTS = [
  { id: 1, type: 'Water Shortage', district: 'South District', severity: 'High', time: '2h ago' },
  { id: 2, type: 'Power Outage', district: 'East District', severity: 'Medium', time: '5h ago' },
  { id: 3, type: 'Road Blockage', district: 'Central District', severity: 'Low', time: '1d ago' },
];

export const FRAUD_ALERTS = [
  { id: 1, scheme: 'Pension Fund', type: 'Duplicate Identity', amount: '₹4.5L', status: 'Under Investigation' },
  { id: 2, scheme: 'Housing Subsidy', type: 'Income Misreporting', amount: '₹12L', status: 'Flagged' },
  { id: 3, scheme: 'Ration Card', type: 'Ghost Beneficiary', amount: '₹1.2L', status: 'Verified Fraud' },
];

export const ACTIONS = [
  { id: 1, task: 'Verify Pension Records', priority: 'High', deadline: '2026-03-22', status: 'Pending' },
  { id: 2, task: 'Dispatch Water Tankers', priority: 'Critical', deadline: '2026-03-20', status: 'In Progress' },
  { id: 3, task: 'Audit Housing Applications', priority: 'Medium', deadline: '2026-03-25', status: 'Pending' },
];
