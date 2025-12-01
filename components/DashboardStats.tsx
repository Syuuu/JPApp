'use client';

import { DailyTasks } from '@/hooks/useDailyTasks';
import { Encouragement } from './Encouragement';
import { useEffect, useState } from 'react';

export const DashboardStats = ({ tasks }: { tasks: DailyTasks | null }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // 进度可以接入真实完成度，这里先模拟 0
    setProgress(0);
  }, [tasks]);

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <div className="rounded-3xl bg-white/90 card-shadow p-6 flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-800">今日学习概览</h2>
          <span className="text-sm text-gray-500">预计 10 分钟</span>
        </div>
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="rounded-2xl bg-blush-50 p-4">
            <p className="text-gray-500">新单词</p>
            <p className="text-2xl font-bold text-blush-600">{tasks?.vocabNew.length ?? 0}</p>
          </div>
          <div className="rounded-2xl bg-sky p-4">
            <p className="text-gray-500">新语法</p>
            <p className="text-2xl font-bold text-blush-600">{tasks?.grammarNew.length ?? 0}</p>
          </div>
          <div className="rounded-2xl bg-white p-4 border border-lavender">
            <p className="text-gray-500">复习单词</p>
            <p className="text-2xl font-bold text-blush-600">{tasks?.vocabReview.length ?? 0}</p>
          </div>
          <div className="rounded-2xl bg-white p-4 border border-lavender">
            <p className="text-gray-500">复习语法</p>
            <p className="text-2xl font-bold text-blush-600">{tasks?.grammarReview.length ?? 0}</p>
          </div>
        </div>
        <div>
          <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
            <span>今日完成度</span>
            <span>{progress}%</span>
          </div>
          <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-blush-400 to-blush-600 transition-all" style={{ width: `${progress}%` }} />
          </div>
        </div>
        <Encouragement />
      </div>
      <div className="rounded-3xl bg-white/90 card-shadow p-6 flex flex-col justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-3">今日任务</h3>
          <ul className="space-y-2 text-sm text-gray-700">
            <li>📘 新单词 {tasks?.vocabNew.length ?? 0} 个</li>
            <li>📗 新语法 {tasks?.grammarNew.length ?? 0} 个</li>
            <li>💡 待复习单词 {tasks?.vocabReview.length ?? 0} 个</li>
            <li>✨ 待复习语法 {tasks?.grammarReview.length ?? 0} 个</li>
          </ul>
        </div>
        <a
          href="/study"
          className="inline-flex items-center justify-center rounded-full bg-blush-500 text-white px-4 py-3 font-semibold hover:bg-blush-400 transition"
        >
          开始学习
        </a>
      </div>
    </div>
  );
};
