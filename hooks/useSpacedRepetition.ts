'use client';

import { useCallback } from 'react';
import { ReviewState } from '@/types';

const STORAGE_KEY = 'n2-review-states';

// 用于从 localStorage 读取/写入复习状态的工具函数
const loadStates = (): ReviewState[] => {
  if (typeof window === 'undefined') return [];
  const raw = localStorage.getItem(STORAGE_KEY);
  return raw ? (JSON.parse(raw) as ReviewState[]) : [];
};

const saveStates = (states: ReviewState[]) => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(states));
};

const today = () => new Date().toISOString().slice(0, 10);

// 根据自我评价给出下次复习日期的简单逻辑
// 可以自由调整天数，来强化或放松记忆曲线
const getIntervalDays = (rating: 'hard' | 'ok' | 'easy', ease: number) => {
  switch (rating) {
    case 'hard':
      return 1; // 完全不会，明天就复习
    case 'ok':
      return Math.max(2, ease + 1); // 有点印象，2~3 天后复习，可调整公式
    case 'easy':
      return Math.max(4, ease + 2); // 已经掌握，间隔更长
    default:
      return 1;
  }
};

export function useSpacedRepetition() {
  // 更新单条题目复习状态
  const updateReview = useCallback(
    (id: string, type: 'vocab' | 'grammar', rating: 'hard' | 'ok' | 'easy') => {
      const states = loadStates();
      const existing = states.find((s) => s.id === id && s.type === type);
      const ease = rating === 'hard' ? Math.max(1, (existing?.ease ?? 1) - 1) : (existing?.ease ?? 1) + (rating === 'easy' ? 1 : 0);
      const interval = getIntervalDays(rating, ease);
      const nextDate = new Date();
      nextDate.setDate(nextDate.getDate() + interval);

      const nextState: ReviewState = {
        id,
        type,
        ease,
        lastReviewedAt: today(),
        nextReviewDate: nextDate.toISOString().slice(0, 10),
      };

      const newStates = existing
        ? states.map((s) => (s.id === id && s.type === type ? nextState : s))
        : [...states, nextState];

      saveStates(newStates);
      return nextState;
    },
    [],
  );

  // 获取当天需要复习的条目（nextReviewDate 小于等于今天）
  const getDueIds = useCallback(() => {
    const states = loadStates();
    const todayStr = today();
    return states.filter((s) => s.nextReviewDate <= todayStr);
  }, []);

  return { updateReview, getDueIds };
}
