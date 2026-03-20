import React from 'react';
import { Filter } from 'lucide-react';
import { DISTRICT_DATA } from '../constants/mockData';
import { Card, RiskBadge, cn } from '../components/Shared';

const DistrictPage = () => (
  <div className="space-y-6">
    <div className="flex justify-between items-center">
      <h2 className="text-xl font-bold text-slate-900">District Performance</h2>
      <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors">
        <Filter size={16} /> Filter Districts
      </button>
    </div>
    <Card className="overflow-hidden p-0">
      <table className="w-full text-left border-collapse">
        <thead className="bg-slate-50 border-b border-slate-100">
          <tr>
            <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">District Name</th>
            <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Risk Level</th>
            <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Health Score</th>
            <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Active Issues</th>
            <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Action</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {DISTRICT_DATA.map((district, i) => (
            <tr key={i} className="hover:bg-slate-50/50 transition-colors">
              <td className="px-6 py-4 font-medium text-slate-900">{district.name}</td>
              <td className="px-6 py-4"><RiskBadge risk={district.risk} /></td>
              <td className="px-6 py-4">
                <div className="flex items-center gap-2">
                  <div className="w-24 bg-slate-100 rounded-full h-1.5 overflow-hidden">
                    <div 
                      className={cn("h-full rounded-full", district.score > 80 ? 'bg-green-500' : district.score > 60 ? 'bg-amber-500' : 'bg-red-500')} 
                      style={{ width: `${district.score}%` }} 
                    />
                  </div>
                  <span className="text-sm font-medium text-slate-600">{district.score}%</span>
                </div>
              </td>
              <td className="px-6 py-4 text-sm text-slate-600">{district.issues}</td>
              <td className="px-6 py-4">
                <button className="text-blue-600 hover:text-blue-700 font-medium text-sm">View Details</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  </div>
);

export default DistrictPage;
