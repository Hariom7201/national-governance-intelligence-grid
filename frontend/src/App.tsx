/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { 
  BrowserRouter as Router, 
  Routes, 
  Route, 
  Link, 
  useLocation 
} from 'react-router-dom';
import { 
  LayoutDashboard, 
  Map, 
  AlertTriangle, 
  ShieldAlert, 
  Zap, 
  Search, 
  Bell, 
  User 
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from './components/Shared';

// Import Pages
import DashboardPage from './pages/Dashboard';
import DistrictPage from './pages/District';
import CrisisPage from './pages/Crisis';
import FraudPage from './pages/Fraud';
import ActionPage from './pages/Action';

const Sidebar = () => {
  const location = useLocation();
  
  const menuItems = [
    { name: 'Dashboard', icon: LayoutDashboard, path: '/' },
    { name: 'District', icon: Map, path: '/district' },
    { name: 'Crisis', icon: AlertTriangle, path: '/crisis' },
    { name: 'Fraud', icon: ShieldAlert, path: '/fraud' },
    { name: 'Action', icon: Zap, path: '/action' },
  ];

  return (
    <aside className="w-64 bg-[#0f172a] text-slate-300 flex flex-col shrink-0">
      <div className="p-6 border-b border-slate-800/50">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <Zap className="text-white" size={18} fill="currentColor" />
          </div>
          <h1 className="text-lg font-bold text-white tracking-tight">Digital Democracy</h1>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        <p className="px-3 text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-4">Main Menu</p>
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.name}
              to={item.path}
              className={cn(
                "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200",
                isActive 
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-900/20" 
                  : "hover:bg-slate-800/50 hover:text-white"
              )}
            >
              <item.icon size={18} />
              {item.name}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-slate-800/50">
        <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-800/30">
          <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center overflow-hidden">
            <User size={24} className="text-slate-400" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-white truncate">Admin User</p>
            <p className="text-xs text-slate-500 truncate">Central Authority</p>
          </div>
        </div>
      </div>
    </aside>
  );
};

const Header = () => (
  <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 shrink-0">
    <div className="flex items-center gap-4 flex-1">
      <div className="relative w-full max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
        <input 
          type="text" 
          placeholder="Search districts, schemes or alerts..." 
          className="w-full bg-slate-50 border-none rounded-lg py-2 pl-10 pr-4 text-sm focus:ring-2 focus:ring-blue-500/20 transition-all"
        />
      </div>
    </div>
    <div className="flex items-center gap-4">
      <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-lg relative">
        <Bell size={20} />
        <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
      </button>
      <div className="h-8 w-[1px] bg-slate-200 mx-2" />
      <div className="text-right hidden sm:block">
        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Current Session</p>
        <p className="text-sm font-semibold text-slate-700">20 Mar 2026</p>
      </div>
    </div>
  </header>
);

const PageWrapper = ({ children, title }: { children: React.ReactNode, title: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -10 }}
    transition={{ duration: 0.2 }}
  >
    <div className="mb-8">
      <h1 className="text-3xl font-bold text-slate-900 tracking-tight">{title}</h1>
      <p className="text-slate-500 mt-1">Real-time intelligence and governance overview.</p>
    </div>
    {children}
  </motion.div>
);

export default function App() {
  return (
    <Router>
      <div className="flex h-screen bg-white font-sans text-slate-900 overflow-hidden">
        <Sidebar />

        <main className="flex-1 flex flex-col min-w-0 bg-[#f8fafc]">
          <Header />

          <div className="flex-1 overflow-y-auto p-8">
            <AnimatePresence mode="wait">
              <Routes>
                <Route path="/" element={<PageWrapper title="Dashboard"><DashboardPage /></PageWrapper>} />
                <Route path="/district" element={<PageWrapper title="District"><DistrictPage /></PageWrapper>} />
                <Route path="/crisis" element={<PageWrapper title="Crisis"><CrisisPage /></PageWrapper>} />
                <Route path="/fraud" element={<PageWrapper title="Fraud"><FraudPage /></PageWrapper>} />
                <Route path="/action" element={<PageWrapper title="Action"><ActionPage /></PageWrapper>} />
              </Routes>
            </AnimatePresence>
          </div>
        </main>
      </div>
    </Router>
  );
}
