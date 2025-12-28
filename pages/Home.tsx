
import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Users, Award, ChevronRight, CheckCircle2 } from 'lucide-react';
import { SECTIONS } from '../constants';
import { AspectType } from '../types';

const Home: React.FC = () => {
  return (
    <div className="space-y-12 pb-20">
      {/* Hero Section */}
      <section className="relative bg-white pt-16 pb-20 px-4 sm:px-6 lg:pt-24 lg:pb-28 lg:px-8 border-b border-gray-100 overflow-hidden">
        <div className="relative max-w-7xl mx-auto">
          <div className="lg:grid lg:grid-cols-12 lg:gap-8 items-center">
            <div className="sm:text-center md:max-w-2xl md:mx-auto lg:col-span-7 lg:text-left">
              <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                <span className="block xl:inline">แฟ้มสะสมผลงานออนไลน์</span>{' '}
                <span className="block text-blue-600 xl:inline">การประเมินวิทยฐานะ ว9</span>
              </h1>
              <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">
                ยินดีต้อนรับคณะกรรมการประเมินทุกท่าน เข้าสู่ระบบแสดงผลงานและนวัตกรรมการจัดการเรียนรู้
                เพื่อประกอบการขอมีหรือเลื่อนวิทยฐานะตามหลักเกณฑ์ ว9/2564
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-4 sm:justify-center lg:justify-start">
                <div className="flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold border border-blue-100">
                  <CheckCircle2 size={16} /> ข้อมูลครบถ้วน
                </div>
                <div className="flex items-center gap-2 bg-emerald-50 text-emerald-700 px-4 py-2 rounded-full text-sm font-semibold border border-emerald-100">
                  <CheckCircle2 size={16} /> ตรวจสอบได้ทันที
                </div>
              </div>
            </div>
            <div className="mt-12 relative sm:max-w-lg sm:mx-auto lg:mt-0 lg:max-w-none lg:mx-0 lg:col-span-5 lg:flex lg:items-center">
              <div className="relative mx-auto w-full rounded-2xl shadow-xl overflow-hidden aspect-square max-w-[400px]">
                <img
                  className="w-full h-full object-cover"
                  src="https://picsum.photos/seed/teacher/800/800"
                  alt="Teacher Profile"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 text-white">
                  <h3 className="text-xl font-bold">นายสมชาย มุ่งมั่นสอน</h3>
                  <p className="text-sm opacity-90">ตำแหน่ง ครู วิทยฐานะครูชำนาญการพิเศษ</p>
                  <p className="text-sm opacity-90">กลุ่มสาระการเรียนรู้คณิตศาสตร์</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Aspects Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">องค์ประกอบการประเมิน 3 ด้าน</h2>
          <p className="mt-4 text-lg text-gray-500">เลือกหัวข้อที่ต้องการเข้าชมผลงานตามโครงสร้าง ว9</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Aspect 1 */}
          <div className="group bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300">
            <div className="h-2 bg-blue-600" />
            <div className="p-8">
              <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-6">
                <BookOpen size={24} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{SECTIONS[AspectType.ASPECT_1].title}</h3>
              <p className="text-gray-500 text-sm mb-6 leading-relaxed">
                {SECTIONS[AspectType.ASPECT_1].description}
              </p>
              <Link
                to={`/aspect/${AspectType.ASPECT_1}`}
                className="inline-flex items-center text-blue-600 font-semibold text-sm group-hover:gap-2 transition-all"
              >
                เข้าชมผลงาน <ChevronRight size={18} />
              </Link>
            </div>
          </div>

          {/* Aspect 2 */}
          <div className="group bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300">
            <div className="h-2 bg-emerald-600" />
            <div className="p-8">
              <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center mb-6">
                <Users size={24} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{SECTIONS[AspectType.ASPECT_2].title}</h3>
              <p className="text-gray-500 text-sm mb-6 leading-relaxed">
                {SECTIONS[AspectType.ASPECT_2].description}
              </p>
              <Link
                to={`/aspect/${AspectType.ASPECT_2}`}
                className="inline-flex items-center text-emerald-600 font-semibold text-sm group-hover:gap-2 transition-all"
              >
                เข้าชมผลงาน <ChevronRight size={18} />
              </Link>
            </div>
          </div>

          {/* Aspect 3 */}
          <div className="group bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300">
            <div className="h-2 bg-purple-600" />
            <div className="p-8">
              <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center mb-6">
                <Award size={24} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{SECTIONS[AspectType.ASPECT_3].title}</h3>
              <p className="text-gray-500 text-sm mb-6 leading-relaxed">
                {SECTIONS[AspectType.ASPECT_3].description}
              </p>
              <Link
                to={`/aspect/${AspectType.ASPECT_3}`}
                className="inline-flex items-center text-purple-600 font-semibold text-sm group-hover:gap-2 transition-all"
              >
                เข้าชมผลงาน <ChevronRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
