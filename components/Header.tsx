import React from 'react';

interface HeaderProps {
  onShowDemo: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onShowDemo }) => (
  <header className="px-6 pt-10 pb-4 flex justify-between items-end bg-white sticky top-0 z-20">
    <div>
      <h1 className="text-3xl font-bold tracking-tight">3分钟表达练习</h1>
      <p className="text-gray-400 text-xs mt-1">PitchLab Daily</p>
    </div>
    <button
      onClick={onShowDemo}
      className="text-[10px] border border-gray-200 px-3 py-1 rounded-full text-gray-400 font-medium hover:bg-gray-50 transition-colors"
    >
      测试反馈页
    </button>
  </header>
);
