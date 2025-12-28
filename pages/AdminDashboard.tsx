
import React, { useState, useEffect } from 'react';
import { AspectType, MediaType, PortfolioItem } from '../types';
import { SECTIONS, DEFAULT_SHEET_URL } from '../constants';
import { Plus, Trash2, LayoutDashboard, ChevronRight, Save, X, Table, RefreshCw, Link as LinkIcon, AlertCircle, Database, Info, Code } from 'lucide-react';

const AdminDashboard: React.FC = () => {
  const [items, setItems] = useState<PortfolioItem[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [sheetUrl, setSheetUrl] = useState(DEFAULT_SHEET_URL);
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncStatus, setSyncStatus] = useState<{ type: 'success' | 'error', message: string } | null>(null);
  
  // Form state
  const [newTitle, setNewTitle] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newUrl, setNewUrl] = useState('');
  const [newAspect, setNewAspect] = useState<AspectType>(AspectType.ASPECT_1);
  const [newSub, setNewSub] = useState('1.1');
  const [newType, setNewType] = useState<MediaType>(MediaType.IMAGE);

  useEffect(() => {
    const stored = localStorage.getItem('portfolio_items');
    if (stored) {
      setItems(JSON.parse(stored));
    }
    const savedUrl = localStorage.getItem('google_sheet_db_url');
    if (savedUrl) {
      setSheetUrl(savedUrl);
    }
  }, []);

  const saveItems = (updated: PortfolioItem[]) => {
    setItems(updated);
    localStorage.setItem('portfolio_items', JSON.stringify(updated));
  };

  const syncFromSheet = async () => {
    if (!sheetUrl) {
      setSyncStatus({ type: 'error', message: 'กรุณาระบุ URL ของ Google Apps Script หรือ CSV ก่อน' });
      return;
    }

    setIsSyncing(true);
    setSyncStatus(null);

    try {
      const fetchUrl = `${sheetUrl}${sheetUrl.includes('?') ? '&' : '?'}t=${Date.now()}`;
      const response = await fetch(fetchUrl);
      
      if (!response.ok) throw new Error('ไม่สามารถเข้าถึงข้อมูลได้');
      
      const contentType = response.headers.get('content-type');
      let parsedItems: PortfolioItem[] = [];

      if (contentType && contentType.includes('application/json')) {
        const json = await response.json();
        if (json.error) throw new Error(json.error);
        
        parsedItems = json.map((row: any, idx: number) => ({
          id: String(row.id || `script-${idx}-${Date.now()}`),
          aspect: (row.aspect || AspectType.ASPECT_1) as AspectType,
          subSection: String(row.subSection || '1.1'),
          title: String(row.title || 'ไม่มีชื่อหัวข้อ'),
          description: String(row.description || ''),
          mediaType: (row.mediaType || MediaType.IMAGE) as MediaType,
          url: String(row.url || ''),
          createdAt: row.createdAt ? new Date(row.createdAt).getTime() : Date.now(),
        }));
      } else {
        const csvText = await response.text();
        const lines = csvText.split(/\r?\n/);
        if (lines.length < 2) throw new Error('ไม่พบข้อมูลในไฟล์ CSV');

        parsedItems = lines.slice(1)
          .filter(line => line.trim() !== '')
          .map((line, idx) => {
            const values = line.match(/(".*?"|[^",\s]+)(?=\s*,|\s*$)/g) || [];
            const cleanValues = values.map(v => v.replace(/^"|"$/g, '').trim());
            
            return {
              id: cleanValues[0] || `csv-${idx}-${Date.now()}`,
              aspect: (cleanValues[1] || AspectType.ASPECT_1) as AspectType,
              subSection: cleanValues[2] || '1.1',
              title: cleanValues[3] || 'ไม่มีชื่อหัวข้อ',
              description: cleanValues[4] || '',
              mediaType: (cleanValues[5] || MediaType.IMAGE) as MediaType,
              url: cleanValues[6] || '',
              createdAt: cleanValues[7] ? new Date(cleanValues[7]).getTime() : Date.now(),
            };
          });
      }

      saveItems(parsedItems);
      localStorage.setItem('google_sheet_db_url', sheetUrl);
      setSyncStatus({ type: 'success', message: `Sync สำเร็จ! พบข้อมูลทั้งหมด ${parsedItems.length} รายการ` });
    } catch (error: any) {
      console.error(error);
      setSyncStatus({ type: 'error', message: `เชื่อมต่อล้มเหลว: ${error.message}` });
    } finally {
      setIsSyncing(false);
    }
  };

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    const newItem: PortfolioItem = {
      id: Math.random().toString(36).substr(2, 9),
      title: newTitle,
      description: newDesc,
      url: newUrl,
      aspect: newAspect,
      subSection: newSub,
      mediaType: newType,
      createdAt: Date.now()
    };
    saveItems([newItem, ...items]);
    setShowAddModal(false);
    resetForm();
  };

  const handleDelete = (id: string) => {
    if (window.confirm('คุณแน่ใจหรือไม่ว่าต้องการลบรายการนี้?')) {
      saveItems(items.filter(i => i.id !== id));
    }
  };

  const resetForm = () => {
    setNewTitle('');
    setNewDesc('');
    setNewUrl('');
    setNewType(MediaType.IMAGE);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="bg-blue-600 text-white p-3 rounded-2xl shadow-lg shadow-blue-100">
            <LayoutDashboard size={28} />
          </div>
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">จัดการฐานข้อมูล ว9</h1>
            <p className="text-gray-500 text-sm">อัปเดตผลงานผ่าน Google Sheets แบบเรียลไทม์</p>
          </div>
        </div>
        <div className="flex gap-3">
            <button
              onClick={() => setShowAddModal(true)}
              className="bg-white text-gray-700 border border-gray-200 px-6 py-3 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-gray-50 transition-all shadow-sm"
            >
              <Plus size={20} /> เพิ่มชั่วคราว
            </button>
        </div>
      </div>

      {/* Database Connection Card */}
      <div className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 p-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-green-50 text-green-600 rounded-[1.25rem] flex items-center justify-center">
              <Database size={28} />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-800">เชื่อมต่อ Google Sheets API</h2>
              <p className="text-sm text-gray-500 font-medium">ใช้ Apps Script เพื่อความเสถียรสูงสุด</p>
            </div>
          </div>
          <div className="bg-gray-50 px-5 py-2 rounded-2xl border border-gray-100">
             <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest block">Required Sheet Tab Name</span>
             <span className="text-sm font-bold text-blue-600">W9_Database</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3 space-y-6">
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none text-gray-400 group-focus-within:text-blue-500 transition-colors">
                <Code size={20} />
              </div>
              <input
                type="text"
                value={sheetUrl}
                onChange={(e) => setSheetUrl(e.target.value)}
                placeholder="วาง URL ของเว็บแอป (Apps Script) หรือ ลิงก์ CSV..."
                className="block w-full pl-16 pr-6 py-5 bg-gray-50 border-2 border-transparent rounded-[1.5rem] focus:bg-white focus:border-blue-500/20 focus:ring-4 focus:ring-blue-500/5 text-gray-900 placeholder-gray-400 transition-all font-medium"
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-start gap-4 p-5 bg-blue-50 rounded-2xl border border-blue-100/50">
                   <Info className="text-blue-600 flex-shrink-0 mt-0.5" size={20} />
                   <div className="text-xs text-blue-800 leading-relaxed">
                     <b>วิธีที่ 1 (แนะนำ):</b> ใช้โค้ด Apps Script และ Deploy เป็น Web App (Anyone access)
                   </div>
                </div>
                <div className="flex items-start gap-4 p-5 bg-emerald-50 rounded-2xl border border-emerald-100/50">
                   <Table className="text-emerald-600 flex-shrink-0 mt-0.5" size={20} />
                   <div className="text-xs text-emerald-800 leading-relaxed">
                     <b>วิธีที่ 2:</b> เผยแพร่ไปยังเว็บเป็นไฟล์ CSV (.csv) ง่ายและเร็ว
                   </div>
                </div>
            </div>

            {syncStatus && (
              <div className={`flex items-center gap-3 p-5 rounded-2xl text-sm animate-in fade-in slide-in-from-top-4 duration-500 shadow-sm ${
                syncStatus.type === 'success' ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'
              }`}>
                {syncStatus.type === 'success' ? <RefreshCw size={20} className="text-green-500 animate-pulse" /> : <AlertCircle size={20} className="text-red-500" />}
                <span className="font-bold">{syncStatus.message}</span>
              </div>
            )}
          </div>
          
          <div className="flex flex-col">
            <button
              onClick={syncFromSheet}
              disabled={isSyncing}
              className={`w-full h-full min-h-[80px] rounded-[1.5rem] font-black text-lg flex flex-col items-center justify-center gap-2 transition-all shadow-2xl ${
                isSyncing 
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                : 'bg-blue-600 text-white hover:bg-blue-700 shadow-blue-200 hover:-translate-y-1'
              }`}
            >
              <RefreshCw className={isSyncing ? 'animate-spin' : ''} size={24} />
              {isSyncing ? 'กำลังซิงค์...' : 'Sync Database'}
            </button>
          </div>
        </div>
      </div>

      {/* Data Table View */}
      <div className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-10 border-b border-gray-50 flex items-center justify-between bg-white">
            <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600">
                    <Table size={20} />
                </div>
                <div>
                    <h3 className="font-bold text-gray-900 text-lg">รายการในพอร์ตโฟลิโอ</h3>
                    <p className="text-xs text-gray-400">ข้อมูลทั้งหมดในฐานข้อมูลปัจจุบัน</p>
                </div>
            </div>
            <div className="flex items-center gap-2 bg-blue-50 px-4 py-2 rounded-xl">
               <span className="text-xs font-black text-blue-600 uppercase tracking-widest">{items.length} Records</span>
            </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50">
                <th className="px-10 py-6 text-[11px] font-black text-gray-400 uppercase tracking-[0.2em]">ID/Sec</th>
                <th className="px-10 py-6 text-[11px] font-black text-gray-400 uppercase tracking-[0.2em]">Item Details</th>
                <th className="px-10 py-6 text-[11px] font-black text-gray-400 uppercase tracking-[0.2em]">Aspect</th>
                <th className="px-10 py-6 text-[11px] font-black text-gray-400 uppercase tracking-[0.2em] text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {items.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-10 py-32 text-center text-gray-400">ฐานข้อมูลว่างเปล่า</td>
                </tr>
              ) : (
                items.map((item) => (
                  <tr key={item.id} className="group hover:bg-blue-50/20 transition-all duration-300">
                    <td className="px-10 py-7">
                      <div className="flex flex-col">
                        <span className="font-mono text-xs text-gray-400 font-bold mb-1 opacity-50">#{item.id.substring(0, 6)}</span>
                        <span className="font-black text-blue-600 text-sm">{item.subSection}</span>
                      </div>
                    </td>
                    <td className="px-10 py-7">
                      <div className="flex flex-col">
                        <div className="flex items-center gap-3 mb-2">
                             <div className={`w-2.5 h-2.5 rounded-full shadow-sm ${
                               item.mediaType === MediaType.PDF ? 'bg-red-500' :
                               item.mediaType === MediaType.YOUTUBE ? 'bg-red-600' :
                               item.mediaType === MediaType.IMAGE ? 'bg-sky-500' :
                               item.mediaType === MediaType.GOOGLE_SHEETS ? 'bg-green-500' :
                               'bg-emerald-500'
                             }`} />
                             <span className="text-base font-bold text-gray-800 group-hover:text-blue-600 transition-colors">{item.title}</span>
                        </div>
                        <span className="text-sm text-gray-500 line-clamp-1">{item.description}</span>
                      </div>
                    </td>
                    <td className="px-10 py-7">
                       <span className={`text-[10px] px-4 py-1.5 rounded-full font-black uppercase tracking-widest border ${
                         item.aspect === AspectType.ASPECT_1 ? 'bg-blue-50 text-blue-700 border-blue-100' :
                         item.aspect === AspectType.ASPECT_2 ? 'bg-emerald-50 text-emerald-700 border-emerald-100' :
                         'bg-purple-50 text-purple-700 border-purple-100'
                       }`}>
                         ด้านที่ {item.aspect === AspectType.ASPECT_1 ? '1' : item.aspect === AspectType.ASPECT_2 ? '2' : '3'}
                       </span>
                    </td>
                    <td className="px-10 py-7 text-right">
                      <button onClick={() => handleDelete(item.id)} className="opacity-0 group-hover:opacity-100 text-red-300 hover:text-red-600 p-3 rounded-2xl hover:bg-red-50 transition-all">
                        <Trash2 size={20} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Manual Add Modal Code omitted for brevity but should be kept from original */}
      {showAddModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
          <div className="absolute inset-0 bg-gray-900/70 backdrop-blur-xl animate-in fade-in duration-300" onClick={() => setShowAddModal(false)}></div>
          <div className="relative bg-white w-full max-w-2xl rounded-[3rem] shadow-2xl border border-white/20 overflow-hidden flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-300">
            <div className="px-12 py-10 border-b border-gray-50 flex items-center justify-between bg-white">
              <div>
                <h2 className="text-3xl font-black text-gray-900 tracking-tight">เพิ่มผลงานใหม่</h2>
                <p className="text-sm text-gray-400 mt-2 font-medium">บันทึกข้อมูลแบบด่วนลงในเครื่อง (Local Storage)</p>
              </div>
              <button onClick={() => setShowAddModal(false)} className="bg-gray-50 p-4 rounded-3xl text-gray-400 hover:text-gray-900 transition-all">
                <X size={28} />
              </button>
            </div>
            
            <form onSubmit={handleAddItem} className="p-12 space-y-8 overflow-y-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="text-xs font-black text-gray-400 uppercase tracking-[0.2em] ml-2">ด้านที่ประเมิน</label>
                  <select 
                    value={newAspect}
                    onChange={(e) => {
                      const val = e.target.value as AspectType;
                      setNewAspect(val);
                      setNewSub(SECTIONS[val].subSections[0].id);
                    }}
                    className="w-full px-6 py-5 bg-gray-50 border-none rounded-[1.5rem] focus:ring-4 focus:ring-blue-500/10 text-sm font-bold"
                  >
                    <option value={AspectType.ASPECT_1}>ด้านที่ 1: การสอน</option>
                    <option value={AspectType.ASPECT_2}>ด้านที่ 2: ห้องเรียน</option>
                    <option value={AspectType.ASPECT_3}>ด้านที่ 3: พัฒนาตนเอง</option>
                  </select>
                </div>
                <div className="space-y-3">
                  <label className="text-xs font-black text-gray-400 uppercase tracking-[0.2em] ml-2">หัวข้อย่อย</label>
                  <select 
                    value={newSub}
                    onChange={(e) => setNewSub(e.target.value)}
                    className="w-full px-6 py-5 bg-gray-50 border-none rounded-[1.5rem] focus:ring-4 focus:ring-blue-500/10 text-sm font-bold"
                  >
                    {SECTIONS[newAspect].subSections.map(sub => (
                      <option key={sub.id} value={sub.id}>{sub.id} {sub.title}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-xs font-black text-gray-400 uppercase tracking-[0.2em] ml-2">ชื่อผลงาน</label>
                <input type="text" required value={newTitle} onChange={(e) => setNewTitle(e.target.value)} className="w-full px-6 py-5 bg-gray-50 border-none rounded-[1.5rem] focus:ring-4 focus:ring-blue-500/10 text-sm font-bold" />
              </div>

              <div className="space-y-3">
                <label className="text-xs font-black text-gray-400 uppercase tracking-[0.2em] ml-2">คำอธิบาย</label>
                <textarea rows={2} value={newDesc} onChange={(e) => setNewDesc(e.target.value)} className="w-full px-6 py-5 bg-gray-50 border-none rounded-[1.5rem] focus:ring-4 focus:ring-blue-500/10 text-sm font-medium" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="text-xs font-black text-gray-400 uppercase tracking-[0.2em] ml-2">ประเภทสื่อ</label>
                  <select value={newType} onChange={(e) => setNewType(e.target.value as MediaType)} className="w-full px-6 py-5 bg-gray-50 border-none rounded-[1.5rem] focus:ring-4 focus:ring-blue-500/10 text-sm font-bold">
                    <option value={MediaType.IMAGE}>รูปภาพ (Image)</option>
                    <option value={MediaType.PDF}>PDF Document</option>
                    <option value={MediaType.YOUTUBE}>YouTube Video</option>
                    <option value={MediaType.GOOGLE_SHEETS}>Google Sheets / Dashboard</option>
                    <option value={MediaType.VIDEO}>วิดีโอ (MP4)</option>
                  </select>
                </div>
                <div className="space-y-3">
                  <label className="text-xs font-black text-gray-400 uppercase tracking-[0.2em] ml-2">ลิงก์ URL ผลงาน</label>
                  <input type="url" required value={newUrl} onChange={(e) => setNewUrl(e.target.value)} className="w-full px-6 py-5 bg-gray-50 border-none rounded-[1.5rem] focus:ring-4 focus:ring-blue-500/10 text-sm font-medium" />
                </div>
              </div>

              <div className="flex gap-6 pt-4">
                <button type="button" onClick={() => setShowAddModal(false)} className="flex-1 px-8 py-6 border-2 border-gray-100 text-gray-400 font-black rounded-[1.5rem] hover:bg-gray-50 transition-colors">ยกเลิก</button>
                <button type="submit" className="flex-1 px-8 py-6 bg-blue-600 text-white font-black rounded-[1.5rem] hover:bg-blue-700 transition-all shadow-2xl flex items-center justify-center gap-3"><Save size={24} /> บันทึกรายการ</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
