import React from 'react';
import { ShieldAlert } from 'lucide-react';
import { FRAUD_ALERTS } from '../constants/mockData';
import { Card } from '../components/Shared';

const FraudPage = () => (
  <div className="space-y-6">
    <h2 className="text-xl font-bold text-slate-900">Fraud Detection & Prevention</h2>
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <Card className="lg:col-span-2" title="Recent Fraud Alerts">
        <div className="space-y-4">
          {FRAUD_ALERTS.map((alert) => (
            <div key={alert.id} className="flex items-center justify-between p-4 rounded-xl bg-slate-50 border border-slate-100">
              <div className="flex items-center gap-4">
                <div className="p-2 bg-white rounded-lg shadow-sm">
                  <ShieldAlert className="text-amber-600" size={20} />
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900">{alert.scheme}</h4>
                  <p className="text-xs text-slate-500">{alert.type}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-bold text-slate-900">{alert.amount}</p>
                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">{alert.status}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>
      <Card title="Risk Factors">
        <div className="space-y-6">
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-bold text-slate-500">
              <span>DUPLICATE ENTRIES</span>
              <span>78%</span>
            </div>
            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
              <div className="bg-amber-500 h-full w-[78%]" />
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-bold text-slate-500">
              <span>INCOME MISMATCH</span>
              <span>45%</span>
            </div>
            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
              <div className="bg-red-500 h-full w-[45%]" />
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-bold text-slate-500">
              <span>GHOST BENEFICIARIES</span>
              <span>22%</span>
            </div>
            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
              <div className="bg-blue-500 h-full w-[22%]" />
            </div>
          </div>
        </div>
      </Card>
    </div>
  </div>
);

export default FraudPage;
