'use client';

import { useEffect, useMemo, useState } from 'react';
import { grammarN2 } from '@/data/grammarN2';
import { vocabN2 } from '@/data/vocabN2';
import { DailyRecord, GrammarItem, ReviewState, VocabItem } from '@/types';
import { useSpacedRepetition } from './useSpacedRepetition';

const DAILY_NEW_VOCAB = 10; // 每日新单词数量，可自行修改
const DAILY_NEW_GRAMMAR = 3; // 每日新语法数量，可自行修改
const DAILY_STORAGE_KEY = 'n2-daily-records';

const loadDailyRecords = (): DailyRecord[] => {
  if (typeof window === 'undefined') return [];
  const raw = localStorage.getItem(DAILY_STORAGE_KEY);
  return raw ? (JSON.parse(raw) as DailyRecord[]) : [];
};

const saveDailyRecords = (records: DailyRecord[]) => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(DAILY_STORAGE_KEY, JSON.stringify(records));
};

const today = () => new Date().toISOString().slice(0, 10);

export type DailyTasks = {
  date: string;
  vocabNew: VocabItem[];
  grammarNew: GrammarItem[];
  vocabReview: VocabItem[];
  grammarReview: GrammarItem[];
  total: number;
};

export function useDailyTasks() {
  const [tasks, setTasks] = useState<DailyTasks | null>(null);
  const [records, setRecords] = useState<DailyRecord[]>([]);
  const { getDueIds } = useSpacedRepetition();

  useEffect(() => {
    setRecords(loadDailyRecords());
  }, []);

  useEffect(() => {
    const date = today();
    const dueStates = getDueIds();

    const reviewVocabIds = new Set(
      dueStates.filter((s) => s.type === 'vocab').map((s) => s.id),
    );
    const reviewGrammarIds = new Set(
      dueStates.filter((s) => s.type === 'grammar').map((s) => s.id),
    );

    // 简单抽取新内容：前 DAILY_NEW_* 个尚未复习过的条目
    const takenVocab = vocabN2.filter((item) => !reviewVocabIds.has(item.id)).slice(0, DAILY_NEW_VOCAB);
    const takenGrammar = grammarN2.filter((item) => !reviewGrammarIds.has(item.id)).slice(0, DAILY_NEW_GRAMMAR);

    const reviewVocab = vocabN2.filter((item) => reviewVocabIds.has(item.id));
    const reviewGrammar = grammarN2.filter((item) => reviewGrammarIds.has(item.id));

    setTasks({
      date,
      vocabNew: takenVocab,
      grammarNew: takenGrammar,
      vocabReview: reviewVocab,
      grammarReview: reviewGrammar,
      total: takenVocab.length + takenGrammar.length + reviewVocab.length + reviewGrammar.length,
    });
  }, [getDueIds]);

  const recordToday = (completed: number, total: number, quiz?: DailyRecord['quiz']) => {
    const date = today();
    const existing = records.filter((r) => r.date !== date);
    const next: DailyRecord = {
      date,
      completed,
      total,
      finishedAll: completed >= total && total > 0,
      quiz,
    };
    const merged = [...existing, next];
    setRecords(merged);
    saveDailyRecords(merged);
  };

  const history = useMemo(() => records.sort((a, b) => (a.date > b.date ? -1 : 1)), [records]);

  return { tasks, recordToday, history, reload: () => setRecords(loadDailyRecords()) };
}
