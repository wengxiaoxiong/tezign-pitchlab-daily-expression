import React from 'react';
import Image from 'next/image';
import { ResultData } from '@/lib/types';
import { QRCode, UserInfo } from './PosterComponents';

interface PosterCardProps {
  data: ResultData;
  styleId: number;
}

export const PosterCard: React.FC<PosterCardProps> = ({ data, styleId }) => {
  const baseClass = "w-[310px] h-[480px] flex-shrink-0 rounded-[2rem] overflow-hidden shadow-2xl relative transition-all bg-white";

  const QuoteBlock = ({ text, dark = false, thick = false, vertical = false, fontSize = 'text-xl' }: {
    text: string;
    dark?: boolean;
    thick?: boolean;
    vertical?: boolean;
    fontSize?: string;
  }) => (
    <div className={`flex gap-4 ${vertical ? 'flex-row-reverse' : ''}`}>
      <div className={`${vertical ? 'w-1.5 h-16 mt-2' : thick ? 'w-1.5' : 'w-[1px]'} ${dark ? 'bg-white' : 'bg-black'} flex-shrink-0 rounded-full`} />
      <p className={`${fontSize} font-serif leading-relaxed ${dark ? 'text-white' : 'text-gray-900'} font-normal ${vertical ? '[writing-mode:vertical-rl] tracking-[0.1em]' : ''}`}>
        {text}
      </p>
    </div>
  );

  // Dynamic Date for Style 25
  const now = new Date();
  const monthNames = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
  const formattedDate = `${monthNames[now.getMonth()]}.${now.getDate().toString().padStart(2, '0')}`;

  switch (styleId) {
    case 15:
      return (
        <div className={`${baseClass} bg-white flex flex-col`}>
          <div className="h-1/3 overflow-hidden relative">
            <Image src={data.posterUrl} fill className="object-cover" alt="Poster" unoptimized />
          </div>
          <div className="flex-1 p-8 flex flex-col">
            <div className="flex-1 flex flex-col justify-center">
              <QuoteBlock text={data.feedback.goldenSentences[0]} thick={false} fontSize="text-2xl" />
            </div>
            <div className="mt-auto flex justify-between items-center border-t border-gray-50 pt-6">
              <div className="flex flex-col gap-1">
                <p className="text-[9px] font-bold text-gray-800">3分钟观点表达</p>
                <p className="text-[8px] text-gray-400 font-mono">PitchLab.pro</p>
              </div>
              <QRCode size={34} />
            </div>
          </div>
        </div>
      );
    case 16:
      return (
        <div className={baseClass}>
          <Image src={data.posterUrl} fill className="object-cover" alt="Background" unoptimized />
          <div className="absolute inset-0 bg-black/70" />
          <div className="relative h-full p-10 flex flex-col">
            <p className="text-[8px] text-white/40 mb-10 tracking-widest">#{data.topicTitle}</p>
            <div className="flex-1 flex flex-col justify-center">
              <QuoteBlock text={data.feedback.goldenSentences[1]} dark thick={false} fontSize="text-2xl" />
            </div>
            <div className="mt-auto flex justify-between items-end pt-10 border-t border-white/5">
              <UserInfo data={data} dark compact />
              <div className="text-right">
                <p className="text-[7px] text-white/40 mb-1 uppercase tracking-tighter font-serif">3分钟观点表达</p>
                <span className="text-[8px] text-white/20 font-mono">PitchLab.pro</span>
              </div>
            </div>
          </div>
        </div>
      );
    case 25:
      return (
        <div className={`${baseClass} p-10 flex flex-col relative`} style={{ backgroundColor: '#EEF0FF' }}>
          <div className="flex justify-between items-center w-full mb-12">
            <div className="flex gap-1.5">
              <div className="w-2 h-2 rounded-full bg-purple-300/60" />
              <div className="w-2 h-2 rounded-full bg-purple-300/40" />
              <div className="w-2 h-2 rounded-full bg-purple-300/30" />
            </div>
            <span className="text-[11px] font-bold text-purple-400/60 tracking-[0.1em] uppercase font-sans">
              {formattedDate}
            </span>
          </div>

          <div className="flex-1 flex flex-col justify-center items-start pt-10">
            <div className="relative w-full">
              <p className="text-[26px] font-sans text-gray-800 font-bold leading-relaxed whitespace-pre-wrap">
                {data.feedback.goldenSentences[2]}
              </p>
            </div>
          </div>

          <div className="mt-auto w-full flex justify-between items-end">
            <div className="text-[10px] text-gray-400 font-mono tracking-widest uppercase">
              PitchLab.pro
            </div>
            <UserInfo data={data} compact />
          </div>
          <div className="absolute inset-0 pointer-events-none opacity-[0.03]" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/stardust.png")' }} />
        </div>
      );
    default:
      return null;
  }
};
