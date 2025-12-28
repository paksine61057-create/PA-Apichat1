import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { SECTIONS, DEFAULT_SHEET_URL } from '../constants';
import { AspectType, PortfolioItem, MediaType } from '../types';
import MediaRenderer from '../components/MediaRenderer';
import { Folder, FileText, Youtube, Image as ImageIcon, Video, Table, RefreshCw, LayoutGrid, ChevronLeft } from 'lucide-react';

const AspectDetail: React.FC = () => {
  const { aspectId } = useParams<{ aspectId: AspectType }>();
  const [activeSub, setActiveSub] = useState<string>('');
  const [items, setItems] = useState<PortfolioItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

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
        if (!response.ok) throw new Error();
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
        localStorage.setItem('portfolio_items', JSON.stringify(parsedItems));
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
    <div className="max-w-7xl mx-auto px-4 py-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Breadcrumb / Top Bar */}
      <div className="flex items-center justify-between mb-10">
        <Link to="/" className="inline-flex items-center gap-2 text-slate-500 font-medium hover:text-blue-600 transition-colors">
          <ChevronLeft size={18} /> กลับหน้าแรก
        </Link>
        <div className="text-xs font-bold text-slate-400 uppercase tracking-widest bg-slate-100 px-4 py-1.5 rounded-full">
          Teacher Portfolio Management
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-10">
        {/* Sidebar Nav */}
        <aside className="w-full lg:w-[340px] flex-shrink-0">
          <div className="official-card rounded-2xl p-4 sticky top-28">
            <div className={`p-6 rounded-xl mb-4 ${section.bgClass} flex items-center gap-3`}>
              <Folder size={20} className={section.colorClass} />
              <h2 className={`text-lg font-bold heading-formal ${section.colorClass}`}>สารบัญผลงาน</h2>
            </div>
            <nav className="space-y-1">
              {section.subSections.map((sub) => (
                <button
                  key={sub.id}
                  onClick={() => setActiveSub(sub.id)}
                  className={`w-full text-left px-5 py-3.5 rounded-xl text-sm transition-all flex items-center gap-3 ${
                    activeSub === sub.id 
                      ? `${section.bgClass} ${section.colorClass} font-bold ring-1 ring-blue-100` 
                      : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
                  }`}
                >
                  <span className="opacity-40 font-mono text-xs">{sub.id}</span>
                  <span className="truncate">{sub.title}</span>
                </button>
              ))}
            </nav>
            {isLoading && (
              <div className="mt-4 p-4 flex items-center justify-center gap-2 text-xs text-slate-400 font-bold">
                <RefreshCw size={14} className="animate-spin" /> กำลังซิงค์ข้อมูล...
              </div>
            )}
          </div>
        </aside>

        {/* Content View */}
        <main className="flex-1">
          <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden min-h-[600px] shadow-sm">
            {/* Header Content */}
            <div className="p-8 lg:p-12 border-b border-slate-100 bg-slate-50/50">
              <span className={`inline-block px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest mb-4 ${section.bgClass} ${section.colorClass}`}>
                {section.title}
              </span>
              <h1 className="text-3xl lg:text-4xl font-bold text-slate-900 heading-formal leading-tight mb-4">
                {currentSub?.title}
              </h1>
              <p className="text-slate-500 text-base leading-relaxed max-w-2xl">
                {currentSub?.desc}
              </p>
            </div>

            {/* List of Items */}
            <div className="p-8 lg:p-12 space-y-16">
              {filteredItems.length === 0 ? (
                <div className="py-24 text-center">
                  <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto text-slate-200 mb-6 border border-slate-100">
                    <FileText size={40} />
                  </div>
                  <h3 className="text-xl font-bold text-slate-400 heading-formal">ยังไม่มีข้อมูลในส่วนนี้</h3>
                  <p className="text-slate-300 mt-2">โปรดอัปโหลดหลักฐานผ่านระบบหลังบ้าน</p>
                </div>
              ) : (
                filteredItems.map((item) => (
                  <div key={item.id} className="group animate-in fade-in slide-in-from-bottom-2 duration-300">
                    <div className="flex flex-col gap-6">
                      <div className="flex flex-col">
                        <div className="flex items-center gap-2 mb-3">
                          <div className={`p-1.5 rounded-lg bg-slate-100 text-slate-500`}>
                            {item.mediaType === MediaType.PDF && <FileText size={16} />}
                            {item.mediaType === MediaType.YOUTUBE && <Youtube size={16} />}
                            {item.mediaType === MediaType.IMAGE && <ImageIcon size={16} />}
                            {item.mediaType === MediaType.VIDEO && <Video size={16} />}
                            {item.mediaType === MediaType.GOOGLE_SHEETS && <Table size={16} />}
                          </div>
                          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                            {item.mediaType} Artifact
                          </span>
                        </div>
                        <h3 className="text-2xl font-bold text-slate-800 heading-formal group-hover:text-blue-600 transition-colors">
                          {item.title}
                        </h3>
                        <p className="text-slate-500 mt-2 leading-relaxed text-sm">
                          {item.description}
                        </p>
                      </div>

                      <div className="document-frame">
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
    </div>
  );
};

export default AspectDetail;