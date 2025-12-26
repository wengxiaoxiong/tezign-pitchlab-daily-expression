
export enum AppState {
  HOME = 'HOME',
  PREPARATION = 'PREPARATION',
  SPEECH = 'SPEECH',
  ANALYZING = 'ANALYZING',
  RESULT = 'RESULT'
}

export interface Topic {
  id: string;
  title: string;
  date: string;
  practiceCount: number;
  subQuestions: string[];
  tag: string;
}

export enum AuthorType {
  COACH = 'COACH',
  LISTENER = 'LISTENER'
}

export interface CommentFeedback {
  id: string;
  authorName: string;
  authorTitle: string;
  authorType: AuthorType;
  content: string;
  avatar: string;
  likes: number;
}

export interface Feedback {
  comments: CommentFeedback[];
  goldenSentences: string[];
}

export interface ResultData {
  feedback: Feedback;
  posterUrl: string;
  userName: string;
  userAvatar: string;
  checkInDays: number;
  date: string;
  topicTitle: string;
}
