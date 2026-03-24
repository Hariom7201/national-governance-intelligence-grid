import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import TopBar from './components/TopBar';
import Dashboard from './pages/Dashboard';
import District from './pages/District';
import Crisis from './pages/Crisis';
import Fraud from './pages/Fraud';
import Action from './pages/Action';

export default function App() {
  return (
    <BrowserRouter>
      <div style={{ display: 'flex', minHeight: '100vh', background: '#f8fafc', fontFamily: "'Inter', system-ui, sans-serif" }}>
        <Sidebar />
        <div style={{ marginLeft: 240, flex: 1, display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          <TopBar alertCount={3} />
          <main style={{ flex: 1, padding: '28px 32px' }}>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/district" element={<District />} />
              <Route path="/crisis" element={<Crisis />} />
              <Route path="/fraud" element={<Fraud />} />
              <Route path="/action" element={<Action />} />
            </Routes>
          </main>
        </div>
      </div>
    </BrowserRouter>
  );
}