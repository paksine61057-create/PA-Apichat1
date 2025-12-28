
import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import AspectDetail from './pages/AspectDetail';
import AdminDashboard from './pages/AdminDashboard';
import Login from './pages/Login';

// Fix: Make children optional to resolve the error where TypeScript identifies the component's props as empty when used in a JSX expression without explicit attributes.
const PrivateRoute = ({ children }: { children?: React.ReactNode }) => {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  return isLoggedIn ? <>{children}</> : <Navigate to="/login" />;
};

const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-slate-50">
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
        
        <footer className="bg-white border-t border-gray-200 py-10 mt-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="text-center md:text-left">
                <p className="text-gray-900 font-bold text-lg">W9 Teacher Portfolio</p>
                <p className="text-gray-500 text-sm mt-1">ระบบแสดงผลงานและนวัตกรรมเพื่อการประเมินวิทยฐานะ</p>
              </div>
              <div className="flex gap-8 text-sm text-gray-400">
                <a href="#" className="hover:text-blue-600">คู่มือการใช้งาน</a>
                <a href="#" className="hover:text-blue-600">ติดต่อสอบถาม</a>
                <a href="#" className="hover:text-blue-600">นโยบายความเป็นส่วนตัว</a>
              </div>
            </div>
            <div className="mt-8 pt-8 border-t border-gray-100 text-center text-xs text-gray-400">
              © {new Date().getFullYear()} พัฒนาโดยกลุ่มงานวิชาการ. สงวนลิขสิทธิ์.
            </div>
          </div>
        </footer>
      </div>
    </Router>
  );
};

export default App;
