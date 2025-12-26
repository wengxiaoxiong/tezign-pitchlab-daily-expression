'use client';

import React, { useState } from 'react';
import { Topic } from '@/lib/types';
import { ALL_TOPICS, CATEGORIES, TODAY_TOPIC } from '@/lib/constants';

interface HomeViewProps {
  onStart: (topic: Topic) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({ onStart }) => {
  const [activeTab, setActiveTab] = useState('全部');

  const filteredTopics = activeTab === '全部'
    ? ALL_TOPICS
    : ALL_TOPICS.filter(t => t.tag === activeTab);

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <section className="px-6">
        <div
          onClick={() => onStart(TODAY_TOPIC)}
          className="bg-[#1C1C1E] text-white p-6 rounded-[1.5rem] shadow-xl relative overflow-hidden group cursor-pointer active:scale-[0.98] transition-all"
        >
          <div className="relative z-10">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-40">今日话题</span>
            <h2 className="text-xl font-serif mt-3 mb-8 leading-snug">{TODAY_TOPIC.title}</h2>
            <div className="flex justify-between items-center">
              <span className="text-[10px] opacity-40">{TODAY_TOPIC.practiceCount.toLocaleString()} 位表达者</span>
              <span className="font-bold text-xs bg-white text-black px-4 py-2 rounded-full">表达我的观点</span>
            </div>
          </div>
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 blur-3xl rounded-full translate-x-10 -translate-y-10" />
        </div>
      </section>

      <section className="space-y-4">
        <div className="px-6 flex justify-between items-end">
          <h3 className="text-sm font-bold uppercase tracking-widest text-gray-400">精选题库</h3>
        </div>
        <div className="flex px-6 gap-2 overflow-x-auto hide-scrollbar">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all whitespace-nowrap border ${activeTab === cat ? 'bg-black text-white border-black' : 'bg-transparent text-gray-400 border-gray-100 hover:border-gray-200'}`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      <section className="pb-10">
        <div className="flex gap-4 px-6 overflow-x-auto hide-scrollbar">
          {filteredTopics.map(topic => (
            <div
              key={topic.id}
              onClick={() => onStart(topic)}
              className="min-w-[180px] bg-gray-50 rounded-[1.5rem] p-5 flex flex-col justify-between cursor-pointer active:bg-gray-100 transition-colors border border-transparent hover:border-gray-200"
            >
              <div>
                <span className="text-[9px] text-gray-400 font-bold uppercase tracking-wider">{topic.tag}</span>
                <h4 className="text-sm font-serif leading-relaxed line-clamp-4 mt-2">{topic.title}</h4>
              </div>
              <div className="flex justify-between items-end pt-4">
                <span className="text-[9px] text-gray-300">{topic.date}</span>
                <div className="w-5 h-5 rounded-full border border-gray-200 flex items-center justify-center">
                  <span className="text-[10px] text-gray-300">→</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
