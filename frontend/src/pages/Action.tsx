import React from 'react';
import { Clock, Zap, ChevronRight } from 'lucide-react';
import { ACTIONS } from '../constants/mockData';
import { Card, RiskBadge, cn } from '../components/Shared';

const ActionPage = () => (
  <div className="space-y-6">
    <h2 className="text-xl font-bold text-slate-900">Actionable Insights & Tasks</h2>
    <Card className="p-0 overflow-hidden">
      <div className="divide-y divide-slate-100">
        {ACTIONS.map((action) => (
          <div key={action.id} className="p-6 flex items-center justify-between hover:bg-slate-50/50 transition-colors">
            <div className="flex items-center gap-4">
              <div className={cn(
                "w-10 h-10 rounded-full flex items-center justify-center",
                action.status === 'In Progress' ? 'bg-blue-50 text-blue-600' : 'bg-slate-50 text-slate-400'
              )}>
                {action.status === 'In Progress' ? <Zap size={20} /> : <Clock size={20} />}
              </div>
              <div>
                <h4 className="font-semibold text-slate-900">{action.task}</h4>
                <div className="flex items-center gap-3 mt-1">
                  <span className="text-xs text-slate-500 flex items-center gap-1">
                    <Clock size={12} /> Deadline: {action.deadline}
                  </span>
                  <RiskBadge risk={action.priority} />
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span className={cn(
                "text-xs font-bold px-2 py-1 rounded",
                action.status === 'In Progress' ? 'text-blue-600 bg-blue-50' : 'text-slate-500 bg-slate-100'
              )}>
                {action.status.toUpperCase()}
              </span>
              <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors text-slate-400">
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </Card>
  </div>
);

export default ActionPage;
