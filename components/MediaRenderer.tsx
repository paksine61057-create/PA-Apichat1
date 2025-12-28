
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
      // Convert standard edit link to pubhtml for clean embedding
      // From: https://docs.google.com/spreadsheets/d/ID/edit...
      // To: https://docs.google.com/spreadsheets/d/ID/pubhtml?widget=true&headers=false
      if (url.includes('/spreadsheets/d/')) {
        const parts = url.split('/spreadsheets/d/');
        const id = parts[1].split('/')[0];
        return `https://docs.google.com/spreadsheets/d/${id}/pubhtml?widget=true&headers=false`;
      }
      return url;
    }
    
    return url;
  };

  switch (type) {
    case MediaType.IMAGE:
      return (
        <img 
          src={url} 
          alt={title} 
          className="w-full h-auto rounded-lg shadow-sm border border-gray-100 object-cover max-h-[600px]" 
        />
      );
    case MediaType.YOUTUBE:
      return (
        <div className="relative pb-[56.25%] h-0 overflow-hidden rounded-lg shadow-lg border border-gray-200">
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
      return (
        <div className="w-full h-[600px] rounded-lg overflow-hidden border border-gray-200 shadow-md">
          <iframe
            src={getEmbedUrl(url)}
            className="w-full h-full"
            title={title}
            loading="lazy"
          ></iframe>
        </div>
      );
    case MediaType.PDF:
      return (
        <div className="w-full h-[600px] rounded-lg overflow-hidden border border-gray-200 shadow-md">
          <iframe
            src={`${url}#toolbar=0`}
            className="w-full h-full"
            title={title}
          ></iframe>
        </div>
      );
    case MediaType.VIDEO:
      return (
        <video 
          controls 
          className="w-full h-auto rounded-lg shadow-lg border border-gray-200 max-h-[600px]"
        >
          <source src={url} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      );
    default:
      return <div className="p-4 bg-gray-100 rounded text-gray-500">รูปแบบไฟล์ไม่รองรับ</div>;
  }
};

export default MediaRenderer;
