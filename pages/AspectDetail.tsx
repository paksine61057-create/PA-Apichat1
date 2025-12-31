import React, { useState, useEffect } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import { SECTIONS, DEFAULT_SHEET_URL } from '../constants';
import { AspectType, PortfolioItem, MediaType } from '../types';
import MediaRenderer from '../components/MediaRenderer';
import { BookOpen, Users, Award, Home as HomeIcon, ChevronLeft, RefreshCw, Folder } from 'lucide-react';

const AspectDetail: React.FC = () => {
  const { aspectId } = useParams<{ aspectId: AspectType }>();
  const [activeSub, setActiveSub] = useState<string>('');
  const [items, setItems] = useState<PortfolioItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();

  const section = aspectId ? SECTIONS[aspectId] : null;

  useEffect(() => {
    if (section && section.subSections.length > 0) {
      setActiveSub(section.subSections[0].id);
    }
  }, [aspectId, section]);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const sheetUrl = localStorage.getItem('google_sheet_db_url') || DEFAULT_SHEET_URL;
      try {
        const response = await fetch(`${sheetUrl}?t=${Date.now()}`);
        const json = await response.json();
        const parsedItems = json.map((row: any, idx: number) => ({
          id: String(row.id || idx),
          aspect: row.aspect as AspectType,
          subSection: String(row.subSection),
          title: String(row.title),
          description: String(row.description),
          mediaType: row.mediaType as MediaType,
          url: String(row.url),
          createdAt: Date.now(),
        }));
        setItems(parsedItems);
      } catch (err) {
        const cached = localStorage.getItem('portfolio_items');
        if (cached) setItems(JSON.parse(cached));
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [aspectId]);

  if (!section) return null;

  const filteredItems = items.filter(item => item.aspect === aspectId && item.subSection === activeSub);
  const currentSub = section.subSections.find(s => s.id === activeSub);

  return (
    <div className="layout-container">
      {/* Sidebar - Same as Home */}
      <aside className="sidebar-fixed">
        <div className="py-8 px-6 border-b border-slate-200 mb-4 flex items-center gap-2">
          <button onClick={() => window.history.back()} className="text-slate-400 hover:text-slate-900">
            <ChevronLeft size={20} />
          </button>
          <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Navigation</h2>
        </div>
        <nav className="flex-1 overflow-y-auto">
          <Link to="/" className="nav-item-google">
            <HomeIcon size={18} />
            <span>หน้าแรก</span>
          </Link>
          
          <div className="mt-6 px-6 mb-2">
            <h2 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">หมวดหมู่ผลงาน</h2>
          </div>
          
          {Object.values(SECTIONS).map((sec) => (
            <Link 
              key={sec.id} 
              to={`/aspect/${sec.id}`} 
              className={`nav-item-google ${aspectId === sec.id ? 'active' : ''}`}
            >
              {sec.id === AspectType.ASPECT_1 && <BookOpen size={18} />}
              {sec.id === AspectType.ASPECT_2 && <Users size={18} />}
              {sec.id === AspectType.ASPECT_3 && <Award size={18} />}
              <span>ด้านที่ {sec.id.split('_')[1]}</span>
            </Link>
          ))}

          <div className="mt-8 px-6 mb-4">
             <h2 className="text-[10px] font-bold text-blue-500 uppercase tracking-widest">หัวข้อย่อยปัจจุบัน</h2>
          </div>
          
          {section.subSections.map((sub) => (
            <button
              key={sub.id}
              onClick={() => setActiveSub(sub.id)}
              className={`w-full text-left px-6 py-2.5 text-[13px] border-l-4 transition-all flex gap-3 ${
                activeSub === sub.id 
                  ? 'border-blue-600 bg-blue-50 text-blue-700 font-bold' 
                  : 'border-transparent text-slate-500 hover:bg-slate-100'
              }`}
            >
              <span className="font-mono opacity-40">{sub.id}</span>
              <span className="truncate">{sub.title}</span>
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className="main-content-scroll fade-in-up">
        <div className="max-w-5xl mx-auto px-8 py-12">
          <header className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${section.bgClass} ${section.colorClass}`}>
                {section.title}
              </span>
              {isLoading && <RefreshCw size={14} className="text-slate-300 animate-spin" />}
            </div>
            <h1 className="text-4xl font-bold text-slate-900 heading-formal leading-tight mb-4">
              {currentSub?.title}
            </h1>
            <p className="text-slate-500 text-lg leading-relaxed max-w-3xl">
              {currentSub?.desc}
            </p>
          </header>

          <div className="space-y-16">
            {filteredItems.length === 0 ? (
              <div className="py-32 flex flex-col items-center justify-center border-2 border-dashed border-slate-100 rounded-3xl">
                <Folder size={64} strokeWidth={1} className="text-slate-200 mb-4" />
                <h3 className="text-lg font-bold text-slate-300 heading-formal">ยังไม่มีรายการข้อมูลในส่วนนี้</h3>
                <p className="text-slate-300 text-sm">ข้อมูลจะแสดงที่นี่เมื่อมีการอัปเดตฐานข้อมูล</p>
              </div>
            ) : (
              filteredItems.map((item) => (
                <div key={item.id} className="group">
                  <div className="mb-8">
                    <div className="inline-block px-2 py-0.5 rounded bg-blue-50 text-blue-600 text-[10px] font-black uppercase tracking-wider mb-3">
                      Artifact: {item.mediaType}
                    </div>
                    <h3 className="text-2xl font-bold text-slate-800 heading-formal mb-3">
                      {item.title}
                    </h3>
                    <p className="text-slate-500 text-sm leading-relaxed max-w-4xl mb-6">
                      {item.description}
                    </p>
                    
                    <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200 shadow-inner">
                      <MediaRenderer type={item.mediaType} url={item.url} title={item.title} />
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default AspectDetail;