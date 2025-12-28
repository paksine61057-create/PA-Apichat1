
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { SECTIONS, DEFAULT_SHEET_URL } from '../constants';
import { AspectType, PortfolioItem, MediaType } from '../types';
import MediaRenderer from '../components/MediaRenderer';
import { Folder, FileText, Youtube, Image as ImageIcon, Video, Filter, Table, RefreshCw, AlertCircle } from 'lucide-react';

const AspectDetail: React.FC = () => {
  const { aspectId } = useParams<{ aspectId: AspectType }>();
  const [activeSub, setActiveSub] = useState<string>('');
  const [items, setItems] = useState<PortfolioItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const section = aspectId ? SECTIONS[aspectId] : null;

  useEffect(() => {
    if (section && section.subSections.length > 0) {
      setActiveSub(section.subSections[0].id);
    }
  }, [aspectId, section]);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      
      const sheetUrl = localStorage.getItem('google_sheet_db_url') || DEFAULT_SHEET_URL;
      const cached = localStorage.getItem('portfolio_items');
      
      if (cached) {
        setItems(JSON.parse(cached));
      }

      try {
        const fetchUrl = `${sheetUrl}${sheetUrl.includes('?') ? '&' : '?'}t=${Date.now()}`;
        const response = await fetch(fetchUrl);
        
        if (!response.ok) throw new Error('Could not connect to database');
        
        const contentType = response.headers.get('content-type');
        let parsedItems: PortfolioItem[] = [];

        if (contentType && contentType.includes('application/json')) {
          const json = await response.json();
          if (json.error) throw new Error(json.error);
          
          parsedItems = json.map((row: any, idx: number) => ({
            id: String(row.id || `script-${idx}`),
            aspect: (row.aspect || AspectType.ASPECT_1) as AspectType,
            subSection: String(row.subSection || '1.1'),
            title: String(row.title || ''),
            description: String(row.description || ''),
            mediaType: (row.mediaType || MediaType.IMAGE) as MediaType,
            url: String(row.url || ''),
            createdAt: row.createdAt ? new Date(row.createdAt).getTime() : Date.now(),
          }));
        } else {
          // Basic fallback for CSV if JSON fetch fails or content type differs
          const csvText = await response.text();
          const lines = csvText.split(/\r?\n/);
          if (lines.length >= 2) {
             parsedItems = lines.slice(1).filter(l => l.trim() !== '').map((line, idx) => {
                const values = line.match(/(".*?"|[^",\s]+)(?=\s*,|\s*$)/g) || [];
                const cleanValues = values.map(v => v.replace(/^"|"$/g, '').trim());
                return {
                  id: cleanValues[0] || `csv-${idx}`,
                  aspect: (cleanValues[1] || AspectType.ASPECT_1) as AspectType,
                  subSection: cleanValues[2] || '1.1',
                  title: cleanValues[3] || '',
                  description: cleanValues[4] || '',
                  mediaType: (cleanValues[5] || MediaType.IMAGE) as MediaType,
                  url: cleanValues[6] || '',
                  createdAt: cleanValues[7] ? new Date(cleanValues[7]).getTime() : Date.now(),
                };
             });
          }
        }

        if (parsedItems.length > 0) {
          setItems(parsedItems);
          localStorage.setItem('portfolio_items', JSON.stringify(parsedItems));
        }
      } catch (err: any) {
        console.error('Fetch error:', err);
        if (!cached) setError('ไม่สามารถเชื่อมต่อฐานข้อมูลได้ และไม่มีข้อมูลสำรอง');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [aspectId]);

  if (!section) return <div className="p-20 text-center">Section not found</div>;

  const filteredItems = items.filter(item => item.aspect === aspectId && item.subSection === activeSub);
  const currentSub = section.subSections.find(s => s.id === activeSub);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar Nav */}
        <div className="w-full lg:w-72 flex-shrink-0">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden sticky top-24">
            <div className={`p-6 border-b ${section.borderClass} ${section.bgClass}`}>
              <h2 className={`font-bold ${section.colorClass} flex items-center gap-2`}>
                <Folder size={20} /> เมนูหัวข้อย่อย
              </h2>
            </div>
            <div className="p-2">
              {section.subSections.map((sub) => (
                <button
                  key={sub.id}
                  onClick={() => setActiveSub(sub.id)}
                  className={`w-full text-left px-4 py-3 rounded-xl text-sm transition-all mb-1 ${
                    activeSub === sub.id 
                      ? `${section.bgClass} ${section.colorClass} font-semibold shadow-sm` 
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="opacity-50 font-mono">{sub.id}</span>
                    <span className="truncate">{sub.title}</span>
                  </div>
                </button>
              ))}
            </div>
            {isLoading && (
               <div className="p-4 flex items-center justify-center gap-2 text-xs text-gray-400 bg-gray-50">
                 <RefreshCw size={14} className="animate-spin" /> กำลังตรวจสอบข้อมูลล่าสุด...
               </div>
            )}
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 space-y-8">
          {error && (
            <div className="bg-red-50 p-4 rounded-2xl border border-red-100 text-red-700 flex items-center gap-3">
              <AlertCircle size={20} />
              <p className="text-sm font-medium">{error}</p>
            </div>
          )}

          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
              <div>
                <span className={`text-xs font-bold uppercase tracking-wider ${section.colorClass}`}>{section.title}</span>
                <h1 className="text-3xl font-extrabold text-gray-900 mt-1">{currentSub?.title}</h1>
                <p className="text-gray-500 mt-2">{currentSub?.desc}</p>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <Filter size={16} /> {filteredItems.length} รายการ
              </div>
            </div>

            <div className="h-px bg-gray-100 w-full mb-8"></div>

            {filteredItems.length === 0 ? (
              <div className="py-20 text-center">
                <div className="bg-gray-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-300">
                  <FileText size={32} />
                </div>
                <p className="text-gray-500 font-medium">ไม่พบผลงานในหัวข้อนี้</p>
                <p className="text-xs text-gray-400 mt-1">ข้อมูลอาจอยู่ระหว่างการอัปโหลดหรือเปลี่ยนหัวข้อ</p>
              </div>
            ) : (
              <div className="space-y-12">
                {filteredItems.map((item) => (
                  <div key={item.id} className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                    <div className="p-6 border-b border-gray-50">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                            {item.mediaType === MediaType.PDF && <FileText className="text-red-500" size={18} />}
                            {item.mediaType === MediaType.YOUTUBE && <Youtube className="text-red-600" size={18} />}
                            {item.mediaType === MediaType.IMAGE && <ImageIcon className="text-blue-500" size={18} />}
                            {item.mediaType === MediaType.VIDEO && <Video className="text-emerald-500" size={18} />}
                            {item.mediaType === MediaType.GOOGLE_SHEETS && <Table className="text-green-600" size={18} />}
                            <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">{item.mediaType}</span>
                        </div>
                        <span className="text-xs text-gray-300 font-mono">#{item.id.substring(0, 6)}</span>
                      </div>
                      <h3 className="text-xl font-bold text-gray-800">{item.title}</h3>
                      <p className="text-gray-600 text-sm mt-1 leading-relaxed">{item.description}</p>
                    </div>
                    <div className="p-4 bg-gray-50/50">
                      <MediaRenderer type={item.mediaType} url={item.url} title={item.title} />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AspectDetail;
