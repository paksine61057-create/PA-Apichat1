import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import AspectDetail from './pages/AspectDetail';
import AdminDashboard from './pages/AdminDashboard';
import Login from './pages/Login';
// Fix: Added missing 'Star' icon to the imports from 'lucide-react'
import { Award, Mail, Phone, ExternalLink, Star } from 'lucide-react';

const PrivateRoute = ({ children }: { children?: React.ReactNode }) => {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  return isLoggedIn ? <>{children}</> : <Navigate to="/login" />;
};

const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/aspect/:aspectId" element={<AspectDetail />} />
            <Route path="/login" element={<Login />} />
            <Route 
              path="/admin/dashboard" 
              element={
                <PrivateRoute>
                  <AdminDashboard />
                </PrivateRoute>
              } 
            />
          </Routes>
        </main>
        
        <footer className="mt-24 pb-12 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="glass-panel rounded-[3rem] p-12 md:p-20 overflow-hidden relative">
              <div className="absolute top-0 right-0 w-80 h-80 gradient-sky-pink opacity-[0.03] blur-[100px] rounded-full"></div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                <div>
                  <div className="flex items-center gap-4 mb-8">
                    <div className="gradient-purple-blue p-3 rounded-2xl text-white">
                      <Award size={32} />
                    </div>
                    <div className="flex flex-col">
                      <h3 className="text-2xl font-black heading-sarabun text-[#1E3A8A]">W9 DIGITAL PORTFOLIO</h3>
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Digital Evidence & Artifact Management</p>
                    </div>
                  </div>
                  <p className="text-slate-500 max-w-md leading-relaxed">
                    ระบบรวบรวมและแสดงผลงานเพื่อประกอบการประเมินวิทยฐานะตามเกณฑ์ ว9/2564 
                    มุ่งเน้นความโปร่งใส ตรวจสอบได้ และทันสมัยที่สุดสำหรับบุคลากรทางการศึกษา
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div className="space-y-6">
                    <h4 className="text-sm font-black uppercase tracking-widest text-[#1E3A8A]">ช่องทางติดต่อ</h4>
                    <div className="space-y-4">
                      <a href="mailto:teacher@school.ac.th" className="flex items-center gap-3 text-slate-500 hover:text-[#EC4899] transition-colors">
                        <Mail size={18} /> teacher@school.ac.th
                      </a>
                      <a href="tel:021234567" className="flex items-center gap-3 text-slate-500 hover:text-[#3B82F6] transition-colors">
                        <Phone size={18} /> 02-123-4567
                      </a>
                    </div>
                  </div>
                  <div className="space-y-6">
                    <h4 className="text-sm font-black uppercase tracking-widest text-[#1E3A8A]">แหล่งข้อมูล ว9</h4>
                    <div className="space-y-4">
                      <a href="https://otpc.go.th" target="_blank" className="flex items-center gap-2 text-slate-500 hover:text-[#6A1B9A] transition-colors group">
                        สำนักงาน ก.ค.ศ. <ExternalLink size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                      </a>
                      <a href="#" className="flex items-center gap-2 text-slate-500 hover:text-[#6A1B9A] transition-colors">
                        คู่มือการประเมิน
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-20 pt-10 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-6">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em]">© {new Date().getFullYear()} THAI TEACHER PORTFOLIO - ALL RIGHTS RESERVED</p>
                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-400 hover:text-[#1E3A8A] transition-colors cursor-pointer">
                    <Star size={14} fill="currentColor" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </Router>
  );
};

export default App;