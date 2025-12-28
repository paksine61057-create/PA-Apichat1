import React from 'react';
import { MediaType } from '../types';

interface MediaRendererProps {
  type: MediaType;
  url: string;
  title: string;
}

const MediaRenderer: React.FC<MediaRendererProps> = ({ type, url, title }) => {
  const getEmbedUrl = (url: string) => {
    if (type === MediaType.YOUTUBE) {
      const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
      const match = url.match(regExp);
      return match && match[2].length === 11 ? `https://www.youtube.com/embed/${match[2]}` : url;
    }
    
    if (type === MediaType.GOOGLE_SHEETS) {
      if (url.includes('/spreadsheets/d/')) {
        const parts = url.split('/spreadsheets/d/');
        const id = parts[1].split('/')[0];
        return `https://docs.google.com/spreadsheets/d/${id}/pubhtml?widget=true&headers=false`;
      }
      return url;
    }
    
    return url;
  };

  const containerClass = "w-full overflow-hidden rounded-xl bg-white shadow-sm border border-slate-200/50";

  switch (type) {
    case MediaType.IMAGE:
      return (
        <div className={containerClass}>
          <img 
            src={url} 
            alt={title} 
            className="w-full h-auto object-cover max-h-[700px] hover:scale-[1.01] transition-transform duration-500" 
          />
        </div>
      );
    case MediaType.YOUTUBE:
      return (
        <div className={`${containerClass} relative pb-[56.25%] h-0`}>
          <iframe
            className="absolute top-0 left-0 w-full h-full"
            src={getEmbedUrl(url)}
            title={title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      );
    case MediaType.GOOGLE_SHEETS:
    case MediaType.PDF:
      return (
        <div className={`${containerClass} h-[650px]`}>
          <iframe
            src={type === MediaType.PDF ? `${url}#toolbar=0` : getEmbedUrl(url)}
            className="w-full h-full bg-slate-50"
            title={title}
            loading="lazy"
          ></iframe>
        </div>
      );
    case MediaType.VIDEO:
      return (
        <div className={containerClass}>
          <video 
            controls 
            className="w-full h-auto max-h-[700px] bg-black"
          >
            <source src={url} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      );
    default:
      return (
        <div className="p-12 bg-slate-50 rounded-xl text-center border-2 border-dashed border-slate-200">
          <p className="text-slate-400 font-medium">ไม่รองรับรูปแบบไฟล์ {type}</p>
        </div>
      );
  }
};

export default MediaRenderer;