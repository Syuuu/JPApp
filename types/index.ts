// 类型定义：方便后续扩展、替换数据源
export type VocabItem = {
  id: string;
  level: 'N2';
  word: string; // 日文单词
  reading: string; // 假名读音
  meaning: string; // 中文含义
  examples: { jp: string; cn: string }[]; // 例句
};

export type GrammarItem = {
  id: string;
  level: 'N2';
  pattern: string; // 语法形式
  meaning: string; // 中文解释
  examples: { jp: string; cn: string }[]; // 例句
};

export type ReviewState = {
  id: string;
  type: 'vocab' | 'grammar';
  ease: number; // 简单实现的熟练度，数值越大间隔越长
  lastReviewedAt: string; // ISO 日期字符串
  nextReviewDate: string; // ISO 日期字符串
};

export type DailyRecord = {
  date: string; // YYYY-MM-DD
  completed: number;
  total: number;
  finishedAll: boolean;
  quiz?: { accuracy: number; total: number };
};
