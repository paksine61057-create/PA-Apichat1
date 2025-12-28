import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Settings, Award, Home, LayoutGrid } from 'lucide-react';

const Navbar: React.FC = () => {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path || location.pathname.startsWith(`${path}/`);

  return (
    <nav className="glass-header h-20">
      <div className="max-w-7xl mx-auto px-4 h-full flex items-center justify-between">
        <Link to="/" className="flex items-center gap-4">
          <div className="w-12 h-12 premium-gradient-bg rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-100">
            <Award size={24} />
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-bold text-slate-900 leading-none heading-formal">
              PORTFOLIO <span className="text-blue-600">ครูสมชาย</span>
            </span>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">
              Teacher Evaluation System (W9)
            </span>
          </div>
        </Link>

        <div className="hidden md:flex items-center gap-2 bg-slate-50 p-1 rounded-xl border border-slate-100">
          <Link to="/" className={`nav-item ${location.pathname === '/' ? 'nav-item-active' : 'text-slate-500 hover:text-slate-800'}`}>
            <div className="flex items-center gap-2"><Home size={16} /> หน้าแรก</div>
          </Link>
          <Link to="/aspect/ASPECT_1" className={`nav-item ${isActive('/aspect/ASPECT_1') ? 'nav-item-active' : 'text-slate-500 hover:text-slate-800'}`}>
            ด้านที่ 1
          </Link>
          <Link to="/aspect/ASPECT_2" className={`nav-item ${isActive('/aspect/ASPECT_2') ? 'nav-item-active' : 'text-slate-500 hover:text-slate-800'}`}>
            ด้านที่ 2
          </Link>
          <Link to="/aspect/ASPECT_3" className={`nav-item ${isActive('/aspect/ASPECT_3') ? 'nav-item-active' : 'text-slate-500 hover:text-slate-800'}`}>
            ด้านที่ 3
          </Link>
        </div>

        <div className="flex items-center gap-3">
          <Link to="/login" className="p-2.5 rounded-xl text-slate-400 hover:bg-slate-100 transition-colors">
            <Settings size={20} />
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;