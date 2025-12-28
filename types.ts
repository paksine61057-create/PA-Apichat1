
export enum AspectType {
  ASPECT_1 = 'ASPECT_1', // ด้านการจัดการเรียนการสอน
  ASPECT_2 = 'ASPECT_2', // ด้านการบริหารจัดการชั้นเรียน
  ASPECT_3 = 'ASPECT_3', // ด้านการพัฒนาตนเองและพัฒนาวิชาชีพ
}

export enum MediaType {
  PDF = 'PDF',
  YOUTUBE = 'YOUTUBE',
  IMAGE = 'IMAGE',
  VIDEO = 'VIDEO',
  GOOGLE_SHEETS = 'GOOGLE_SHEETS'
}

export interface PortfolioItem {
  id: string;
  aspect: AspectType;
  subSection: string; // e.g., "1.1", "2.2"
  title: string;
  description: string;
  mediaType: MediaType;
  url: string; // URL for the resource
  createdAt: number;
}

export interface SectionInfo {
  id: string;
  title: string;
  description: string;
  colorClass: string;
  bgClass: string;
  borderClass: string;
  subSections: { id: string; title: string; desc: string }[];
}
