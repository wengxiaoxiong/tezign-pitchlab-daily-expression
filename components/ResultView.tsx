'use client';

import React, { useState, useRef, useMemo } from 'react';
import { ResultData, AuthorType } from '@/lib/types';
import { PosterCard } from './PosterCard';

interface ResultViewProps {
  data: ResultData;
  onBack: () => void;
  isLoggedIn: boolean;
  setIsLoggedIn: (v: boolean) => void;
}

export const ResultView: React.FC<ResultViewProps> = ({ data, onBack, isLoggedIn, setIsLoggedIn }) => {
  const [filter, setFilter] = useState<AuthorType>(AuthorType.LISTENER);
  const [likedIds, setLikedIds] = useState<Set<string>>(new Set());
  const scrollRef = useRef<HTMLDivElement>(null);

  const selectedStyles = [15, 16, 25];

  const filteredComments = useMemo(() => {
    return data.feedback.comments.filter(c => c.authorType === filter);
  }, [filter, data.feedback.comments]);

  const toggleLike = (id: string) => {
    setLikedIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handleSavePoster = () => {
    alert('海报已尝试保存到相册');
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'PitchLab Daily Challenge',
        text: `我的今日观点金句："${data.feedback.goldenSentences[0]}"`,
        url: window.location.href,
      }).catch(console.error);
    } else {
      alert('链接已复制到剪贴板，快去分享给朋友吧！');
    }
  };

  const isCoachFilter = filter === AuthorType.COACH;
  const showCoachBlur = !isLoggedIn && isCoachFilter;

  return (
    <div className="min-h-screen bg-white animate-in fade-in duration-1000 flex flex-col">
      <div className="px-6 py-6 flex justify-between items-center bg-white sticky top-0 z-30 border-b border-gray-50/50">
        <button
          onClick={() => setIsLoggedIn(!isLoggedIn)}
          className={`text-[10px] font-bold px-2.5 py-1 rounded-full border transition-colors ${isLoggedIn ? 'bg-green-50 text-green-600 border-green-200' : 'bg-gray-50 text-gray-400 border-gray-100'}`}
        >
          {isLoggedIn ? '已登录' : '未登录'}
        </button>

        <div className="flex items-center gap-6">
          <button
            onClick={handleShare}
            className="flex items-center gap-2 px-1 py-1 text-gray-800 active:opacity-40 transition-all"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6a3 3 0 100-2.684m0 2.684l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
            </svg>
            <span className="text-[14px] font-bold">分享</span>
          </button>
          <button
            onClick={handleSavePoster}
            className="flex items-center gap-2 px-1 py-1 text-gray-800 active:opacity-40 transition-all"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            <span className="text-[14px] font-bold">保存</span>
          </button>
        </div>
      </div>

      <div className="pt-4 pb-8 flex flex-col items-center overflow-hidden bg-white">
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto snap-x snap-mandatory hide-scrollbar w-full px-[calc(50%-155px)] pb-4"
        >
          {selectedStyles.map((sid) => (
            <div key={sid} className="snap-center flex-shrink-0">
              <PosterCard data={data} styleId={sid} />
            </div>
          ))}
        </div>
        <div className="flex items-center gap-1 mt-2">
          <span className="text-[10px] text-gray-300">左右滑动切换版式</span>
        </div>
      </div>

      <div className="px-6 py-8 space-y-6 flex-1 bg-white">
        <div className="flex flex-col gap-4">
          <div className="flex items-baseline gap-2">
            <h3 className="text-xl font-bold">表达复盘</h3>
            <span className="text-gray-300 text-sm font-medium">{data.feedback.comments.length} 条见解</span>
          </div>
          <div className="flex gap-2">
            {[
              { id: AuthorType.LISTENER, label: '听众席' },
              { id: AuthorType.COACH, label: '教练团' }
            ].map(f => (
              <button
                key={f.id}
                onClick={() => setFilter(f.id as any)}
                className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all ${filter === f.id ? 'bg-black text-white' : 'bg-gray-50 text-gray-400 hover:bg-gray-100'}`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        <div className="relative min-h-[200px]">
          <div className={`space-y-10 pb-24 transition-all duration-500 ${showCoachBlur ? 'blur-md pointer-events-none select-none opacity-40' : ''}`}>
            {filteredComments.map((comment) => (
              <div key={comment.id} className="group animate-in slide-in-from-bottom-2 duration-500 relative">
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-xl shadow-sm flex-shrink-0 border border-gray-100">{comment.avatar}</div>
                  <div className="flex-1 space-y-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-bold text-gray-800">{comment.authorName}</span>
                          {comment.authorType === AuthorType.COACH && <span className="text-[9px] bg-blue-50 text-blue-500 px-1.5 py-0.5 rounded font-bold uppercase tracking-tighter">Pro</span>}
                        </div>
                        <p className="text-[10px] text-gray-400">{comment.authorTitle}</p>
                      </div>
                      <button
                        onClick={() => toggleLike(comment.id)}
                        className={`flex flex-col items-center gap-0.5 transition-colors ${likedIds.has(comment.id) ? 'text-red-500' : 'text-gray-300'}`}
                      >
                        <svg className={`w-5 h-5 ${likedIds.has(comment.id) ? 'fill-current' : 'fill-none'}`} stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
                      </button>
                    </div>
                    <div className="text-sm text-gray-600 leading-relaxed font-serif whitespace-pre-wrap">{comment.content}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {showCoachBlur && (
            <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
              <div className="bg-white/90 p-6 rounded-3xl shadow-xl border border-gray-100 flex flex-col items-center gap-3 animate-in fade-in zoom-in duration-300">
                <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center text-gray-400 shadow-inner">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <div className="text-center">
                  <p className="text-sm font-bold text-gray-800">解锁教练专业评语</p>
                  <p className="text-[10px] text-gray-400 mt-1 tracking-widest uppercase">登录后查看多维度表达分析</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md p-6 border-t border-gray-100 flex justify-center items-center z-40 max-w-md mx-auto gap-12">
        <button
          onClick={onBack}
          className="text-[13px] font-bold text-gray-400 tracking-widest uppercase hover:text-black transition-colors"
        >
          再次练习
        </button>
        <button
          className="text-[13px] font-bold text-black tracking-widest uppercase active:opacity-60 transition-opacity"
        >
          {isLoggedIn ? '查看练习历史' : '登录记录练习'}
        </button>
      </div>
    </div>
  );
};
