
import { Topic } from './types';

export const CATEGORIES = ['All', 'AI', 'Society', 'Career', 'Growth', 'Philosophy', 'Software Sales'];

export const TODAY_TOPIC: Topic = {
  id: 't-today',
  title: '"If AI completely replaced your job, what would you do?"',
  date: 'Today',
  practiceCount: 1205,
  tag: 'AI',
  subQuestions: [
    "How would AI change your definition of 'value'?",
    "If you had unlimited free time, which dream would be restarted?",
    "How does 'human uniqueness' survive in an efficiency-first era?",
    "If not for a living, what would you choose to create?"
  ]
};

export const ALL_TOPICS: Topic[] = [
  {
    id: 'f1',
    title: 'How would you describe the Internet to a child who has never seen it?',
    date: '10-25',
    practiceCount: 342,
    tag: 'Society',
    subQuestions: ["What is it like?", "What has it brought?", "Has it made the world smaller?"]
  },
  {
    id: 'f2',
    title: 'If life could be saved and reloaded, which chapter would you return to?',
    date: '10-24',
    practiceCount: 891,
    tag: 'Philosophy',
    subQuestions: ["Regret or nostalgia?", "Would re-choosing make a difference?", "Would you bring your memories?"]
  },
  {
    id: 'f3',
    title: 'Is loneliness in the city due to architecture or people\'s hearts?',
    date: '10-23',
    practiceCount: 567,
    tag: 'Society',
    subQuestions: ["Physical distance of space", "Psychological defense mechanisms", "The emptiness of digital connection"]
  },
  {
    id: 'f4',
    title: 'How do you define "true success"?',
    date: '10-22',
    practiceCount: 120,
    tag: 'Growth',
    subQuestions: ["Weight of money", "Inner peace", "Impact on others"]
  },
  {
    id: 'f5',
    title: 'In work, which is more important, "reliability" or "intelligence"?',
    date: '10-21',
    practiceCount: 450,
    tag: 'Career',
    subQuestions: ["Building long-term trust", "Ability to solve sudden problems", "Foundation of teamwork"]
  },
  {
    id: 's1',
    title: 'How to handle a customer saying "Your price is too high"?',
    date: '10-20',
    practiceCount: 302,
    tag: 'Software Sales',
    subQuestions: ["Value based selling", "ROI calculation", "Competitive landscape"]
  },
  {
    id: 's2',
    title: 'Explain a complex technical concept to a non-technical stakeholder.',
    date: '10-19',
    practiceCount: 215,
    tag: 'Software Sales',
    subQuestions: ["Use analogies", "Focus on business outcomes", "Avoid jargon"]
  },
  {
    id: 's3',
    title: 'How to recover from a bad demo?',
    date: '10-18',
    practiceCount: 189,
    tag: 'Software Sales',
    subQuestions: ["Acknowledge and pivot", "Focus on what works", "Follow up with a recording"]
  }
];

export const PREP_TIME = 30;
export const SPEECH_TIME = 180;
