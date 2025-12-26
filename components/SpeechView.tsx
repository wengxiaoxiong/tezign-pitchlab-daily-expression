/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Topic } from '@/lib/types';

interface SpeechViewProps {
  topic: Topic;
  onFinish: (audioBase64: string) => void;
}

export const SpeechView: React.FC<SpeechViewProps> = ({ topic, onFinish }) => {
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const [timerElapsed, setTimerElapsed] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [hintIndex, setHintIndex] = useState(0);
  const [isHintShuffling, setIsHintShuffling] = useState(false);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      chunksRef.current = [];
      mediaRecorder.ondataavailable = (e) => chunksRef.current.push(e.data);
      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(chunksRef.current, { type: 'audio/webm' });
        const reader = new FileReader();
        reader.readAsDataURL(audioBlob);
        reader.onloadend = () => {
          const base64data = (reader.result as string).split(',')[1];
          onFinish(base64data);
        };
      };
      mediaRecorder.start();
    } catch (err) {
      alert("请允许麦克风权限以开始录音");
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
    }
  };

  const handleNextHint = () => {
    if (isHintShuffling) return;
    setIsHintShuffling(true);
    setTimeout(() => {
      setHintIndex((prev) => (prev + 1) % topic.subQuestions.length);
      setIsHintShuffling(false);
    }, 400);
  };

  useEffect(() => {
    startRecording();
    const timer = setInterval(() => setTimerElapsed(prev => prev + 1), 1000);
    return () => clearInterval(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="h-screen bg-black text-white flex flex-col p-8 overflow-hidden relative font-sans">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,#2C2C2E,#000000)]" />

      <div className="absolute top-10 right-8 z-30">
        <button
          onClick={() => setShowHint(!showHint)}
          className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${showHint ? 'bg-yellow-400 text-black shadow-[0_0_15px_rgba(250,204,21,0.5)]' : 'bg-white/10 text-gray-400 hover:text-white'}`}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
        </button>
      </div>

      <div className="relative z-10 flex flex-col h-full">
        <div className="flex justify-between items-center text-gray-500">
          <span className="text-[10px] tracking-widest font-mono uppercase">Recording...</span>
        </div>

        <div className="flex-1 flex flex-col justify-center items-center text-center space-y-12 relative">
          <div className={`transition-all duration-500 flex flex-col items-center space-y-12 ${showHint ? 'opacity-20 blur-sm scale-95' : 'opacity-100'}`}>
            <div className="w-24 h-24 rounded-full flex items-center justify-center bg-white/5">
              <div className="w-3 h-3 rounded-full bg-white animate-pulse" />
            </div>
            <h2 className="text-xl font-serif max-w-xs leading-relaxed opacity-80">{topic.title}</h2>
          </div>

          {showHint && (
            <div
              className="absolute inset-0 flex items-center justify-center p-6 animate-in fade-in zoom-in-95 duration-300"
              style={{ pointerEvents: 'none' }}
            >
              <div
                onClick={handleNextHint}
                className={`w-full max-w-[280px] bg-white/10 backdrop-blur-xl border border-white/10 p-8 rounded-3xl shadow-2xl cursor-pointer transition-all duration-500 transform pointer-events-auto ${isHintShuffling ? '-translate-y-4 opacity-0 scale-95' : 'translate-y-0 opacity-100 scale-100'
                  }`}
              >
                <div className="flex justify-between items-start mb-4">
                  <span className="text-[8px] font-bold uppercase tracking-[0.3em] text-white/40">思考角度</span>
                  <div className="flex gap-1">
                    <div className="w-1 h-1 rounded-full bg-white/40" />
                    <div className="w-1 h-1 rounded-full bg-white/20" />
                  </div>
                </div>
                <p className="text-white text-lg font-serif italic leading-relaxed text-center">
                  {topic.subQuestions[hintIndex]}
                </p>
                <div className="mt-8 flex justify-center text-[10px] text-white/20 font-mono tracking-widest uppercase">
                  more...
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="space-y-8 pb-8">
          <div className="flex flex-col items-center">
            <span className="text-sm font-light tracking-widest opacity-40">
              0{Math.floor(timerElapsed / 60)}:{(timerElapsed % 60).toString().padStart(2, '0')}
            </span>
          </div>
          <button
            onClick={stopRecording}
            className="w-full bg-white text-black py-4 rounded-[1.2rem] font-bold text-sm tracking-widest active:scale-[0.98] transition-all"
          >
            完成表达
          </button>
        </div>
      </div>
    </div>
  );
};
