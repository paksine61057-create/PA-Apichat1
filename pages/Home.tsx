import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BookOpen, Users, Award, Home as HomeIcon, ChevronRight, FileText, Globe } from 'lucide-react';
import { SECTIONS } from '../constants';
import { AspectType } from '../types';

const Home: React.FC = () => {
  const location = useLocation();

  return (
    <div className="layout-container">
      {/* Sidebar - Fixed on left */}
      <aside className="sidebar-fixed">
        <div className="py-8 px-6 border-b border-slate-200 mb-4">
          <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Main Menu</h2>
        </div>
        <nav className="flex-1">
          <Link to="/" className={`nav-item-google ${location.pathname === '/' ? 'active' : ''}`}>
            <HomeIcon size={18} />
            <span>หน้าแรก</span>
          </Link>
          
          <div className="mt-6 px-6 mb-2">
            <h2 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">การประเมิน ว9</h2>
          </div>
          
          {Object.values(SECTIONS).map((section) => (
            <Link 
              key={section.id} 
              to={`/aspect/${section.id}`} 
              className={`nav-item-google ${location.pathname.includes(section.id) ? 'active' : ''}`}
            >
              {section.id === AspectType.ASPECT_1 && <BookOpen size={18} />}
              {section.id === AspectType.ASPECT_2 && <Users size={18} />}
              {section.id === AspectType.ASPECT_3 && <Award size={18} />}
              <span>ด้านที่ {section.id.split('_')[1]}</span>
            </Link>
          ))}
        </nav>
        
        <div className="p-6 border-t border-slate-200">
          <p className="text-[10px] text-slate-400 font-medium">© 2024 Digital Portfolio System</p>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="main-content-scroll fade-in-up">
        <div className="max-w-5xl mx-auto px-8 py-12">
          {/* Profile Section */}
          <section className="profile-card mb-16">
            <div className="w-48 h-48 md:w-56 md:h-56 rounded-2xl overflow-hidden bg-slate-100 flex-shrink-0 border-4 border-white shadow-lg">
              <img 
                src="https://images.unsplash.com/photo-1544717297-fa154da09f5b?auto=format&fit=crop&q=80&w=400" 
                alt="Teacher Profile"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-4xl font-bold text-slate-900 heading-formal mb-2">นายสมชาย มุ่งมั่นสอน</h1>
              <p className="text-xl text-blue-600 font-medium mb-4">วิทยฐานะครูชำนาญการพิเศษ (คณิตศาสตร์)</p>
              <div className="h-1 w-20 bg-blue-600 mx-auto md:mx-0 mb-6"></div>
              <p className="text-slate-500 leading-relaxed max-w-2xl">
                ยินดีต้อนรับสู่ระบบจัดเก็บผลงานดิจิทัล รวบรวมหลักฐานและผลการปฏิบัติงาน 
                เพื่อประกอบการพิจารณาประเมินวิทยฐานะตามเกณฑ์ ว9/2564 
                เน้นการจัดการเรียนรู้เชิงรุก (Active Learning) และผลลัพธ์ของผู้เรียนเป็นสำคัญ
              </p>
            </div>
          </section>

          {/* Quick Access Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {Object.values(SECTIONS).map((section) => (
              <Link 
                key={section.id} 
                to={`/aspect/${section.id}`} 
                className="aspect-grid-card group hover:bg-white hover:border-blue-200 hover:shadow-lg transition-all"
              >
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${section.bgClass} ${section.colorClass}`}>
                  {section.id === AspectType.ASPECT_1 ? <BookOpen size={24} /> : section.id === AspectType.ASPECT_2 ? <Users size={24} /> : <Award size={24} />}
                </div>
                <h3 className="font-bold text-slate-900 mb-2 heading-formal">{section.title}</h3>
                <p className="text-xs text-slate-500 mb-6 leading-relaxed">
                  {section.description}
                </p>
                <div className="flex items-center gap-1 text-xs font-bold text-blue-600 uppercase tracking-wider">
                  คลิกเพื่อดูข้อมูล <ChevronRight size={14} />
                </div>
              </Link>
            ))}
          </div>

          {/* Institutional Info */}
          <div className="bg-slate-900 text-white rounded-2xl p-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <h2 className="text-2xl font-bold heading-formal mb-2">โรงเรียนสาธิตแห่งอนาคต</h2>
              <p className="text-slate-400 text-sm">สังกัดสำนักงานเขตพื้นที่การศึกษามัธยมศึกษา เขต 1</p>
            </div>
            <div className="flex gap-4">
              <div className="text-center px-6 py-2 border-r border-slate-700">
                <p className="text-2xl font-bold">15</p>
                <p className="text-[10px] uppercase tracking-widest text-slate-500">ตัวชี้วัด</p>
              </div>
              <div className="text-center px-6 py-2">
                <p className="text-2xl font-bold">3</p>
                <p className="text-[10px] uppercase tracking-widest text-slate-500">ด้านหลัก</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;