export type AppLanguage = "en" | "tr" | "ka";

export interface LanguageConfig {
  code: AppLanguage;
  name: string;
  nativeName: string;
  flag: string;
  description: string;
}

export interface VocabularyWord {
  id: string;
  word: string; // word in target language
  translation: string; // word in Turkish
  phonetic: string; // how to pronounce it
  exampleTarget: string; // example sentence in target language
  exampleTranslation: string; // example sentence translated
  category: "Greetings" | "Food" | "Travel" | "Daily";
}

export interface GrammarTopic {
  id: string;
  title: string;
  level: "Beginner" | "Intermediate";
  description: string;
  rules: string[];
  examples: {
    target: string;
    translation: string;
    explanation: string;
  }[];
}

export interface Scenario {
  id: string;
  title: string;
  emoji: string;
  description: string;
  role: string;
  expressions: {
    target: string;
    translation: string;
    phonetic: string;
  }[];
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
}

export interface CoachAnalysis {
  score: number;
  isCorrect: boolean;
  translation: string;
  analysis: string;
  correctedText: string;
  pronunciationGuide: string;
  alternatives: string[];
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  translation?: string;
  feedback?: string;
  score?: number;
  suggestions?: string[];
  timestamp: Date;
}
