import React from 'react';
import { Activity, Map, Clock } from 'lucide-react';
import { CRISIS_ALERTS } from '../constants/mockData';
import { Card, RiskBadge, cn } from '../components/Shared';

const CrisisPage = () => (
  <div className="space-y-6">
    <div className="flex justify-between items-center">
      <h2 className="text-xl font-bold text-slate-900">Active Crisis Alerts</h2>
      <div className="flex gap-2">
        <span className="flex items-center gap-1.5 px-3 py-1 bg-red-50 text-red-700 rounded-full text-xs font-bold animate-pulse">
          <Activity size={12} /> LIVE MONITORING
        </span>
      </div>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {CRISIS_ALERTS.map((alert) => (
        <Card key={alert.id} className="relative overflow-hidden">
          <div className={cn("absolute top-0 left-0 w-1 h-full", alert.severity === 'High' ? 'bg-red-500' : alert.severity === 'Medium' ? 'bg-amber-500' : 'bg-green-500')} />
          <div className="flex justify-between items-start mb-4">
            <h3 className="font-bold text-slate-900">{alert.type}</h3>
            <RiskBadge risk={alert.severity} />
          </div>
          <p className="text-sm text-slate-500 mb-4 flex items-center gap-1.5">
            <Map size={14} /> {alert.district}
          </p>
          <div className="flex justify-between items-center pt-4 border-t border-slate-50">
            <span className="text-xs text-slate-400 flex items-center gap-1">
              <Clock size={12} /> {alert.time}
            </span>
            <button className="px-3 py-1.5 bg-slate-900 text-white rounded-lg text-xs font-medium hover:bg-slate-800 transition-colors">
              Deploy Response
            </button>
          </div>
        </Card>
      ))}
    </div>
    <Card title="Crisis Heatmap (Simulated)">
      <div className="aspect-video bg-slate-50 rounded-lg flex items-center justify-center border-2 border-dashed border-slate-200">
        <div className="text-center">
          <Map className="mx-auto text-slate-300 mb-2" size={48} />
          <p className="text-slate-400 text-sm">Interactive GIS Map Integration Placeholder</p>
        </div>
      </div>
    </Card>
  </div>
);

export default CrisisPage;
