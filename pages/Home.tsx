import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Users, Award, ChevronRight, CheckCircle2, Star, Play } from 'lucide-react';
import { SECTIONS } from '../constants';
import { AspectType } from '../types';

const Home: React.FC = () => {
  return (
    <div className="animate-in fade-in duration-700">
      {/* Hero Section */}
      <section className="relative bg-white pt-20 pb-32 overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-slate-50/50 -skew-x-12 translate-x-1/2 -z-10"></div>
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-xs font-bold mb-8">
              <Star size={14} className="fill-blue-600" /> แฟ้มผลงานอิเล็กทรอนิกส์ (D-GPA)
            </div>
            <h1 className="text-5xl lg:text-6xl font-black text-slate-900 leading-[1.15] mb-6 heading-formal">
              ประเมินวิทยฐานะ <br />
              <span className="accent-gradient-text">ตามเกณฑ์ ว9/2564</span>
            </h1>
            <p className="text-lg text-slate-500 leading-relaxed mb-10 max-w-xl">
              รวบรวมหลักฐานและผลการปฏิบัติงานเชิงประจักษ์ 3 ด้าน 15 ตัวชี้วัด 
              อย่างเป็นระบบ สวยงาม และตรวจสอบได้ง่ายสำหรับคณะกรรมการ
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to={`/aspect/${AspectType.ASPECT_1}`} className="btn-primary-gradient px-8 py-4">
                เข้าชมผลงานทั้งหมด <ChevronRight size={18} />
              </Link>
              <button className="btn-outline px-8 py-4">
                <Play size={18} fill="currentColor" /> วีดิทัศน์แนะนำตัว
              </button>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-tr from-blue-100 to-pink-100 blur-3xl opacity-30 -z-10"></div>
            <div className="bg-white p-4 rounded-[2.5rem] shadow-2xl border border-slate-100">
              <div className="relative rounded-[2rem] overflow-hidden aspect-[4/5]">
                <img 
                  src="https://images.unsplash.com/photo-1544717297-fa154da09f5b?auto=format&fit=crop&q=80&w=800" 
                  className="w-full h-full object-cover" 
                  alt="Teacher Portrait" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent"></div>
                <div className="absolute bottom-8 left-8 right-8 text-white">
                  <h2 className="text-3xl font-bold heading-formal">นายสมชาย มุ่งมั่นสอน</h2>
                  <p className="text-white/80 font-medium mt-1">วิทยฐานะครูชำนาญการพิเศษ (คณิตศาสตร์)</p>
                  <div className="mt-4 flex gap-2">
                    <span className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-lg text-xs font-bold border border-white/20">รอบปีงบประมาณ 2567</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Aspects Navigation */}
      <section className="max-w-7xl mx-auto px-4 -mt-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[AspectType.ASPECT_1, AspectType.ASPECT_2, AspectType.ASPECT_3].map((type) => {
            const section = SECTIONS[type];
            const Icon = type === AspectType.ASPECT_1 ? BookOpen : type === AspectType.ASPECT_2 ? Users : Award;
            const accentColor = type === AspectType.ASPECT_1 ? 'text-blue-600' : type === AspectType.ASPECT_2 ? 'text-emerald-600' : 'text-purple-600';
            const bgColor = type === AspectType.ASPECT_1 ? 'bg-blue-50' : type === AspectType.ASPECT_2 ? 'bg-emerald-50' : 'bg-purple-50';

            return (
              <Link to={`/aspect/${type}`} key={type} className="official-card rounded-3xl p-8 group">
                <div className={`w-14 h-14 ${bgColor} ${accentColor} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <Icon size={28} />
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-3 heading-formal">{section.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed mb-6 line-clamp-2">
                  {section.description}
                </p>
                <div className={`flex items-center gap-2 text-sm font-bold ${accentColor}`}>
                  ดูรายละเอียด <ChevronRight size={16} />
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Stats/Features Section */}
      <section className="max-w-7xl mx-auto px-4 py-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-slate-900 heading-formal mb-4">ทำไมต้องแฟ้มผลงานดิจิทัล?</h2>
          <div className="section-divider mx-auto"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {[
            { title: 'ความถูกต้อง', desc: 'ครบถ้วนตามเกณฑ์ตัวชี้วัด ก.ค.ศ.', icon: CheckCircle2 },
            { title: 'ตรวจสอบได้', desc: 'หลักฐานเชิงประจักษ์ชัดเจน ตรวจง่าย', icon: CheckCircle2 },
            { title: 'ความสวยงาม', desc: 'จัดรูปแบบมืออาชีพ อ่านง่าย', icon: CheckCircle2 },
            { title: 'เข้าถึงง่าย', desc: 'เปิดดูได้ทุกที่ ทุกเวลา ทุกอุปกรณ์', icon: CheckCircle2 },
          ].map((feat, idx) => (
            <div key={idx} className="flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center text-blue-600 mb-4 border border-slate-100">
                <feat.icon size={24} />
              </div>
              <h4 className="font-bold text-slate-900 mb-2">{feat.title}</h4>
              <p className="text-sm text-slate-500">{feat.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;