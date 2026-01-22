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
        "In this age of algorithms, our uniqueness lies precisely in those 'useless moments of freedom'.",
        "Technology has made the world smaller, yet it has thinned the distance between hearts in infinite connections.",
        "Only the freedom to slow down is the soul's last refuge in an efficiency-first era."
      ],
      comments: [
        { id: 'c1', authorName: "Coach Rose", authorTitle: "Empathy Coach", authorType: AuthorType.COACH, avatar: "🌸", likes: 42, content: "Your metaphor about the 'old clock' was very moving! Specific imagery instantly bridges the gap with the audience." },
        { id: 'c2', authorName: "Old Ben", authorTitle: "Bookstore Owner", authorType: AuthorType.LISTENER, avatar: "☕️", likes: 28, content: "Listening to your words, I suddenly remembered those people in the bookstore who don't buy books but just daydream." },
        { id: 'c3', authorName: "Alex", authorTitle: "Logic Master", authorType: AuthorType.COACH, avatar: "🔭", likes: 15, content: "The overall logical skeleton is very clear, discussing the impact of AI in three points is very much on point." }
      ],
      diagnosis: [
        { issue: "Logic", score: 85, detail: "Strong logical flow with clear arguments." },
        { issue: "Emotion", score: 92, detail: "Excellent emotional connection with the audience." },
        { issue: "Vocabulary", score: 78, detail: "Good use of words, but could be more varied." }
      ],
      improvements: [
        { id: 'i1', title: "Enhance Vocal Variety", instruction: "Try to vary your pitch and pace to keep the audience engaged." },
        { id: 'i2', title: "Use More Pauses", instruction: "Pausing after key points can help the audience digest the information." }
      ]
    };

    setTimeout(() => {
      setResultData({
        feedback: demoFeedback,
        posterUrl: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=1000&auto=format&fit=crop",
        userName: "Demo User",
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
        userName: "Practitioner",
        userAvatar: "🎙️",
        checkInDays: Math.floor(Math.random() * 30) + 1,
        date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/\//g, '.'),
        topicTitle: currentTopic.title
      });
      setState(AppState.RESULT);
    } catch (err) {
      console.error(err);
      alert("Analysis failed, returning to home page");
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
        />
      )}
    </div>
  );
}
