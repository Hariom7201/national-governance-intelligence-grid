import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Cell } from 'recharts';
import { DASHBOARD_STATS, TREND_DATA, DISTRICT_DATA } from '../constants/mockData';
import { Card, cn } from '../components/Shared';

const DashboardPage = () => (
  <div className="space-y-6">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {DASHBOARD_STATS.map((stat, i) => (
        <Card key={i} className="flex items-center justify-between">
          <div>
            <p className="text-sm text-slate-500 font-medium">{stat.label}</p>
            <h4 className="text-2xl font-bold text-slate-900 mt-1">{stat.value}</h4>
            <p className={cn("text-xs mt-1 font-medium", stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600')}>
              {stat.change} vs last month
            </p>
          </div>
          <div className={cn("p-3 rounded-lg bg-slate-50", stat.color)}>
            <stat.icon size={24} />
          </div>
        </Card>
      ))}
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card title="Grievance vs Action Trends">
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={TREND_DATA}>
              <defs>
                <linearGradient id="colorG" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
              <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
              <Tooltip 
                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
              />
              <Area type="monotone" dataKey="grievances" stroke="#3b82f6" fillOpacity={1} fill="url(#colorG)" strokeWidth={2} />
              <Area type="monotone" dataKey="actions" stroke="#10b981" fillOpacity={0} strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <Card title="District Risk Distribution">
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={DISTRICT_DATA}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
              <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
              <Tooltip 
                cursor={{fill: '#f8fafc'}}
                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
              />
              <Bar dataKey="issues" radius={[4, 4, 0, 0]}>
                {DISTRICT_DATA.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.risk === 'High' ? '#ef4444' : entry.risk === 'Medium' ? '#f59e0b' : '#22c55e'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  </div>
);

export default DashboardPage;
