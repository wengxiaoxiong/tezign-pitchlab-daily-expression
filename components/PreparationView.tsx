'use client';

import React, { useState, useEffect } from 'react';
import { Topic } from '@/lib/types';
import { PREP_TIME } from '@/lib/constants';

interface PreparationViewProps {
  topic: Topic;
  onFinish: () => void;
  onBack: () => void;
}

export const PreparationView: React.FC<PreparationViewProps> = ({ topic, onFinish, onBack }) => {
  const [timeLeft, setTimeLeft] = useState(PREP_TIME);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isShuffling, setIsShuffling] = useState(false);

  const hints = topic.subQuestions;

  const handleNextHint = () => {
    if (isShuffling) return;
    setIsShuffling(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % hints.length);
      setIsShuffling(false);
    }, 400);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          onFinish();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [onFinish]);

  return (
    <div className="h-screen bg-white p-8 flex flex-col animate-in fade-in duration-500 overflow-hidden">
      <button onClick={onBack} className="self-start text-gray-400 mb-10 text-sm">取消</button>
      <div className="flex-1 space-y-10">
        <div>
          <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-300 mb-3">当前话题</h4>
          <h2 className="text-2xl font-serif leading-snug">{topic.title}</h2>
        </div>
        <div className="space-y-6">
          <div className="flex justify-between items-end border-b pb-2 border-gray-100">
            <span className="text-xs text-gray-300 uppercase tracking-widest font-bold">思考角度</span>
            <button
              onClick={handleNextHint}
              className={`text-gray-300 hover:text-black transition-all ${isShuffling ? 'rotate-180 opacity-50' : ''}`}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
            </button>
          </div>

          <div className="relative h-40 w-full">
            <div className="absolute inset-0 bg-gray-50 rounded-2xl border border-gray-100 transform translate-y-4 scale-90 opacity-20 transition-all duration-500" />
            <div className="absolute inset-0 bg-gray-50 rounded-2xl border border-gray-100 transform translate-y-2 scale-95 opacity-50 transition-all duration-500" />
            <div
              onClick={handleNextHint}
              className={`absolute inset-0 bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex items-center justify-center cursor-pointer transition-all duration-500 ease-out transform ${isShuffling ? '-translate-y-10 rotate-3 opacity-0 scale-105' : 'translate-y-0 rotate-0 opacity-100 scale-100'
                }`}
            >
              <p className="text-gray-600 text-lg font-serif italic text-center leading-relaxed">
                {hints[currentIndex]}
              </p>
              <div className="absolute bottom-4 right-6 flex gap-1 opacity-20">
                <div className="w-1 h-1 rounded-full bg-black" />
                <div className="w-1 h-1 rounded-full bg-black" />
                <div className="w-1 h-1 rounded-full bg-black" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="space-y-6 pb-4">
        <div className="flex flex-col items-center">
          <span className="text-3xl font-light tracking-tighter mb-1">{timeLeft}s</span>
          <span className="text-[10px] uppercase text-gray-300 tracking-[0.2em]">准备中</span>
        </div>
        <button
          onClick={onFinish}
          className="w-full bg-black text-white py-4 rounded-[1.2rem] font-bold text-sm tracking-wider hover:opacity-90 active:scale-[0.98] transition-all"
        >
          我准备好了
        </button>
      </div>
    </div>
  );
};
