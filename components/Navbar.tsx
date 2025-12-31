import React from 'react';
import { Link } from 'react-router-dom';
import { Award, User } from 'lucide-react';

const Navbar: React.FC = () => {
  return (
    <nav className="h-16 bg-white border-b border-slate-200 sticky top-0 z-50 flex items-center px-8 justify-between">
      <div className="flex items-center gap-4">
        <Link to="/" className="flex items-center gap-3">
          <div className="text-blue-600 font-bold text-lg tracking-tight heading-formal uppercase">
            Digital Portfolio <span className="text-slate-300 font-light ml-2">|</span>
          </div>
          <span className="text-slate-600 text-sm font-medium">นายสมชาย มุ่งมั่นสอน</span>
        </Link>
      </div>
      
      <div className="flex items-center gap-4">
        <Link to="/login" className="text-slate-400 hover:text-blue-600 transition-colors">
          <User size={20} />
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;