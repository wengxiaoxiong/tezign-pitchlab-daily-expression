'use client';

import { useState } from 'react';
import { AppState, Topic, ResultData, Feedback, AuthorType } from '@/lib/types';
import { TODAY_TOPIC } from '@/lib/constants';
import { getSpeechFeedback, generatePosterImage } from './actions/gemini';
import { Header } from '@/components/Header';
import { HomeView } from '@/components/HomeView';
import { PreparationView } from '@/components/PreparationView';
import { SpeechView } from '@/components/SpeechView';
import { AnalyzingView } from '@/components/AnalyzingView';
import { ResultView } from '@/components/ResultView';

export default function App() {
  const [state, setState] = useState<AppState>(AppState.HOME);
  const [currentTopic, setCurrentTopic] = useState<Topic>(TODAY_TOPIC);
  const [resultData, setResultData] = useState<ResultData | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  const startPractice = (topic: Topic) => {
    setCurrentTopic(topic);
    setState(AppState.PREPARATION);
  };

  const showDemoResult = async () => {
    setState(AppState.ANALYZING);
    const demoFeedback: Feedback = {
      goldenSentences: [
        "在这个充满算法的时代，我们的独特性恰恰在于那些'无用的自由时刻'。",
        "技术让世界变小了，却让心与心的距离在无限的连接中变得稀薄。",
        "唯有慢下来的自由，才是灵魂在效率至上时代的最后避难所。"
      ],
      comments: [
        { id: 'c1', authorName: "小柔教练", authorTitle: "共情表达力导师", authorType: AuthorType.COACH, avatar: "🌸", likes: 42, content: "你的讲述中关于'老钟表'的比喻非常打动人！这种具体的意象能瞬间拉近听众的距离。" },
        { id: 'c2', authorName: "老钟", authorTitle: "独立书店主理人", authorType: AuthorType.LISTENER, avatar: "☕️", likes: 28, content: "听完你的这段话，我突然想起了书店里那些不为买书只为发呆的人。" },
        { id: 'c3', authorName: "阿北", authorTitle: "逻辑推演官", authorType: AuthorType.COACH, avatar: "🔭", likes: 15, content: "整体逻辑骨架非常清晰，分三个点论述人工智能的影响很到位。" }
      ]
    };

    setTimeout(() => {
      setResultData({
        feedback: demoFeedback,
        posterUrl: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=1000&auto=format&fit=crop",
        userName: "陈先生",
        userAvatar: "👤",
        checkInDays: 15,
        date: "2024.12.26",
        topicTitle: TODAY_TOPIC.title
      });
      setState(AppState.RESULT);
    }, 6000);
  };

  const handleSpeechFinish = async (audioBase64: string) => {
    setState(AppState.ANALYZING);
    try {
      const fb = await getSpeechFeedback(audioBase64, currentTopic.title);
      const poster = await generatePosterImage(fb.goldenSentences[0], currentTopic.title);
      setResultData({
        feedback: fb,
        posterUrl: poster,
        userName: "表达实践者",
        userAvatar: "🎙️",
        checkInDays: Math.floor(Math.random() * 30) + 1,
        date: new Date().toLocaleDateString('zh-CN', { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/\//g, '.'),
        topicTitle: currentTopic.title
      });
      setState(AppState.RESULT);
    } catch (err) {
      console.error(err);
      alert("分析失败，正在返回首页");
      setState(AppState.HOME);
    }
  };

  return (
    <div className="max-w-md mx-auto min-h-screen relative overflow-hidden bg-white text-black font-sans selection:bg-gray-100">
      {state === AppState.HOME && (
        <div className="page-enter-active">
          <Header onShowDemo={showDemoResult} />
          <HomeView onStart={startPractice} />
        </div>
      )}
      {state === AppState.PREPARATION && (
        <PreparationView topic={currentTopic} onFinish={() => setState(AppState.SPEECH)} onBack={() => setState(AppState.HOME)} />
      )}
      {state === AppState.SPEECH && <SpeechView topic={currentTopic} onFinish={handleSpeechFinish} />}
      {state === AppState.ANALYZING && <AnalyzingView />}
      {state === AppState.RESULT && resultData && (
        <ResultView
          data={resultData}
          onBack={() => setState(AppState.HOME)}
          isLoggedIn={isLoggedIn}
          setIsLoggedIn={setIsLoggedIn}
        />
      )}
    </div>
  );
}
