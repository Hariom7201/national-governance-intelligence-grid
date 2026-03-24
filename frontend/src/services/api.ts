const BASE_URL = (import.meta.env?.VITE_API_URL as string) || 'http://localhost:8000';

async function fetchJSON<T>(endpoint: string): Promise<T> {
  const res = await fetch(`${BASE_URL}${endpoint}`);
  if (!res.ok) throw new Error(`API error: ${res.status} ${res.statusText}`);
  return res.json();
}

export interface District {
  name: string;
  risk_level: 'Low' | 'Medium' | 'High' | 'Critical';
  health_score: number;
  active_issues: number;
  population: number;
  complaints_this_month: number;
  actions_taken: number;
}

export interface Crisis {
  id: string;
  title: string;
  district: string;
  severity: 'Low' | 'Medium' | 'High' | 'Critical';
  type: string;
  reported_at: string;
  status: 'Active' | 'Resolved' | 'In Progress';
}

export interface FraudAlert {
  id: string;
  scheme: string;
  district: string;
  amount: number;
  type: string;
  status: 'Under Investigation' | 'Flagged' | 'Verified Fraud' | 'Cleared';
  reported_at: string;
}

export interface ActionItem {
  id: string;
  title: string;
  district: string;
  priority: 'Low' | 'Medium' | 'High' | 'Critical';
  status: 'Pending' | 'In Progress' | 'Completed';
  deadline: string;
  assigned_to: string;
}

export interface Recommendation {
  district: string;
  insights: string[];
  risk_score: number;
  recommended_actions: string[];
}

export const api = {
  getDistricts: () => fetchJSON<District[]>('/districts'),
  getDistrict: (name: string) => fetchJSON<District>(`/district/${name}`),
  getCrisis: (district?: string) =>
    district ? fetchJSON<Crisis[]>(`/crisis/${district}`) : fetchJSON<Crisis[]>('/crisis'),
  getFraud: () => fetchJSON<FraudAlert[]>('/fraud'),
  getRecommendation: (district: string) =>
    fetchJSON<Recommendation>(`/recommendation/${district}`),
  getActions: () => fetchJSON<ActionItem[]>('/actions'),
};