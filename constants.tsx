
import { AspectType, SectionInfo } from './types';

export const DEFAULT_SHEET_URL = 'https://script.google.com/macros/s/AKfycbzaJsRn-4hOliEegQ09IOKX69hDZ_vUsLLmd7W9XpI6GIChXeyscC0rJz5ak8WtHwCrTQ/exec';

export const SECTIONS: Record<AspectType, SectionInfo> = {
  [AspectType.ASPECT_1]: {
    id: AspectType.ASPECT_1,
    title: 'ด้านที่ 1: การจัดการเรียนการสอน',
    description: 'เน้นการพัฒนาหลักสูตร การจัดการเรียนรู้ เชิงรุก และการวิจัยเพื่อพัฒนาผู้เรียน',
    colorClass: 'text-blue-600',
    bgClass: 'bg-blue-50',
    borderClass: 'border-blue-200',
    subSections: [
      { id: '1.1', title: 'การสร้างและพัฒนาหลักสูตร', desc: 'การวิเคราะห์และพัฒนาหลักสูตรรายวิชาให้สอดคล้องกับมาตรฐาน' },
      { id: '1.2', title: 'การจัดการเรียนรู้', desc: 'การจัดกิจกรรมแบบ Active Learning และการวัดผลสัมฤทธิ์' },
      { id: '1.3', title: 'การสร้างและพัฒนาสื่อ นวัตกรรม', desc: 'สื่อเทคโนโลยี แอปพลิเคชัน และแหล่งเรียนรู้' },
      { id: '1.4', title: 'การวัดและประเมินผล', desc: 'เครื่องมือวัดผล Rubric และการสรุปผลคะแนน' },
      { id: '1.5', title: 'การวิจัยเพื่อพัฒนาการเรียนรู้', desc: 'งานวิจัยในชั้นเรียนเพื่อแก้ปัญหาหรือพัฒนาผู้เรียน' },
    ]
  },
  [AspectType.ASPECT_2]: {
    id: AspectType.ASPECT_2,
    title: 'ด้านที่ 2: การบริหารจัดการชั้นเรียน',
    description: 'การสร้างบรรยากาศที่ส่งเสริมการเรียนรู้ และระบบดูแลช่วยเหลือผู้เรียน',
    colorClass: 'text-emerald-600',
    bgClass: 'bg-emerald-50',
    borderClass: 'border-emerald-200',
    subSections: [
      { id: '2.1', title: 'การบริหารจัดการชั้นเรียน', desc: 'การจัดสภาพแวดล้อมและบรรยากาศในห้องเรียน' },
      { id: '2.2', title: 'การจัดระบบดูแลช่วยเหลือผู้เรียน', desc: 'กระบวนการคัดกรอง เยี่ยมบ้าน และการดูแลรายบุคคล' },
      { id: '2.3', title: 'การจัดทำข้อมูลสารสนเทศ', desc: 'เอกสารธุรการชั้นเรียนและฐานข้อมูลนักเรียน' },
    ]
  },
  [AspectType.ASPECT_3]: {
    id: AspectType.ASPECT_3,
    title: 'ด้านที่ 3: การพัฒนาตนเองและวิชาชีพ',
    description: 'การพัฒนาทักษะความรู้ใหม่ๆ และการมีส่วนร่วมในชุมชนแห่งการเรียนรู้ (PLC)',
    colorClass: 'text-purple-600',
    bgClass: 'bg-purple-50',
    borderClass: 'border-purple-200',
    subSections: [
      { id: '3.1', title: 'การพัฒนาตนเอง', desc: 'การอบรมสัมมนา การได้รับเกียรติบัตร และทักษะวิชาชีพ' },
      { id: '3.2', title: 'การพัฒนาวิชาชีพ', desc: 'กิจกรรม PLC การเป็นวิทยากร และการเผยแพร่ผลงาน' },
    ]
  },
};
