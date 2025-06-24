export interface Subject {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  topics: Topic[];
}

export interface Topic {
  id: string;
  name: string;
  description: string;
  subTopics?: SubTopic[];
  topics?: Topic[];
}

export interface SubTopic {
  id: string;
  name: string;
  description: string;
  content: ContentBlock[];
  quiz: Quiz;
}

export type ContentBlockType = 'text' | 'image' | 'formula' | 'example' | 'video' | 'practice' | 'tip' | 'exam-tip';



export interface RichContent {
  text: string;
  image?: string;
  alt?: string;
}

export interface PracticeContent {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  image?: string;
  alt?: string;
}

export type ContentBlockContent =
  | string               // for plain text
  | RichContent          // text + optional image
  | PracticeContent;     // question + options + optional image

export interface ContentBlock {
  id: string;
  type: ContentBlockType;
  content: ContentBlockContent;
}


export interface Quiz {
  id: string;
  title: string;
  description: string;
  questions: Question[];
}

export type QuestionType = 'mcq' | 'true-false' | 'short-answer' | 'calculation' | 'diagram' | 'structured';

export interface Question {
  id: string;
  type: QuestionType;
  text: string;
  diagram?: string;
  options?: string[];
  correctAnswer: string | number | boolean;
  explanation: string;
  subQuestions?: SubQuestion[];
}

export interface SubQuestion {
  id: string;
  type: QuestionType;
  text: string;
  diagram?: string;
  options?: string[];
  correctAnswer: string | number | boolean;
  explanation: string;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  condition: string;
}

export interface Avatar {
  id: string;
  name: string;
  image: string;
}
