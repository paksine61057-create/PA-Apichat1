
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { User, FileText, LayoutDashboard, Settings } from 'lucide-react';

const Navbar: React.FC = () => {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');

  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center gap-2">
            <div className="bg-blue-600 p-2 rounded-lg text-white">
              <FileText size={24} />
            </div>
            <Link to="/" className="text-xl font-bold text-gray-800">
              W9 <span className="text-blue-600">Portfolio</span>
            </Link>
          </div>
          
          <div className="hidden md:flex space-x-8 items-center">
            <Link to="/" className={`text-sm font-medium ${location.pathname === '/' ? 'text-blue-600' : 'text-gray-600 hover:text-blue-600'}`}>
              หน้าแรก
            </Link>
            <Link to="/aspect/ASPECT_1" className={`text-sm font-medium ${location.pathname.includes('ASPECT_1') ? 'text-blue-600' : 'text-gray-600 hover:text-blue-600'}`}>
              ด้านที่ 1
            </Link>
            <Link to="/aspect/ASPECT_2" className={`text-sm font-medium ${location.pathname.includes('ASPECT_2') ? 'text-emerald-600' : 'text-gray-600 hover:text-emerald-600'}`}>
              ด้านที่ 2
            </Link>
            <Link to="/aspect/ASPECT_3" className={`text-sm font-medium ${location.pathname.includes('ASPECT_3') ? 'text-purple-600' : 'text-gray-600 hover:text-purple-600'}`}>
              ด้านที่ 3
            </Link>
            <div className="h-4 w-px bg-gray-200"></div>
            {isAdmin ? (
               <Link to="/" className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-blue-600">
                <LayoutDashboard size={18} /> ออกจากแอดมิน
              </Link>
            ) : (
              <Link to="/login" className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-blue-600">
                <Settings size={18} /> สำหรับแอดมิน
              </Link>
            )}
          </div>

          <div className="md:hidden">
             {/* Simple mobile indicator or menu could go here */}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
