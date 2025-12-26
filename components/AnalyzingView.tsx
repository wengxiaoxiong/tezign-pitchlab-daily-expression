'use client';

import React, { useState, useEffect } from 'react';

const LOADING_STEPS = [
  { icon: '🎙️', title: '正在转译', detail: '将您的观点转化为文字档案...' },
  { icon: '🧠', title: '逻辑评审', detail: '教练 [阿北] 正在拆解您的表达结构...' },
  { icon: '❤️', title: '情感感悟', detail: '教练 [小柔] 正在分析内容的情感张力...' },
  { icon: '👥', title: '听众席', detail: '听众已入场，正在撰写听后感...' },
  { icon: '✨', title: '灵魂提炼', detail: '正在为您甄选 3 条具有差异化的"金句"...' },
  { icon: '🎨', title: '意境创作', detail: '艺术家正在根据您的观点绘制背景...' },
  { icon: '💌', title: '最后装订', detail: '正在装订您的每日表达复盘报告...' },
];

export const AnalyzingView: React.FC = () => {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setStep(prev => (prev < LOADING_STEPS.length - 1 ? prev + 1 : prev));
    }, 2800);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="h-screen flex flex-col items-center justify-between p-10 bg-white animate-in fade-in duration-700">
      <div className="w-full space-y-4">
        <div className="flex justify-between items-end">
          <span className="text-[10px] font-bold tracking-widest text-gray-300 uppercase">Reviewing Insight</span>
          <span className="text-[10px] font-mono text-gray-300">{Math.round((step + 1) / LOADING_STEPS.length * 100)}%</span>
        </div>
        <div className="h-[2px] w-full bg-gray-50 overflow-hidden">
          <div
            className="h-full bg-black transition-all duration-1000 ease-out"
            style={{ width: `${(step + 1) / LOADING_STEPS.length * 100}%` }}
          />
        </div>
      </div>

      <div className="flex flex-col items-center text-center space-y-10">
        <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center text-3xl shadow-sm border border-gray-100 animate-pulse">
          {LOADING_STEPS[step].icon}
        </div>
        <div className="space-y-3">
          <h2 className="text-2xl font-serif font-bold tracking-tight">
            {LOADING_STEPS[step].title}
          </h2>
          <p className="text-gray-400 text-xs tracking-wider leading-relaxed px-4 animate-in slide-in-from-bottom-2 duration-700">
            {LOADING_STEPS[step].detail}
          </p>
        </div>
      </div>

      <div className="w-full space-y-6 max-h-40 overflow-hidden relative">
        <div className="absolute inset-x-0 top-0 h-10 bg-gradient-to-b from-white to-transparent z-10" />
        <div className="space-y-5">
          {LOADING_STEPS.map((s, idx) => (
            <div
              key={idx}
              className={`flex items-center gap-4 transition-all duration-700 ${idx === step ? 'opacity-100 translate-y-0 scale-100' : idx < step ? 'opacity-20 -translate-y-2 scale-95' : 'opacity-0 translate-y-4 scale-90'}`}
            >
              <span className="text-sm grayscale">{s.icon}</span>
              <span className="text-[10px] font-bold text-gray-800 tracking-widest">{s.title} 完成</span>
            </div>
          ))}
        </div>
        <div className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-white to-transparent z-10" />
      </div>

      <div className="text-[9px] text-gray-300 font-mono tracking-widest uppercase">
        PitchLab Intelligence Studio
      </div>
    </div>
  );
};
