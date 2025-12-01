'use client';

import { Quiz } from '@/components/Quiz';
import { useDailyTasks } from '@/hooks/useDailyTasks';
import { useMemo, useState } from 'react';

export default function QuizPage() {
  const { tasks, recordToday } = useDailyTasks();
  const [result, setResult] = useState<{ accuracy: number; total: number; wrong: any[] } | null>(null);

  const vocab = useMemo(() => tasks ? [...tasks.vocabNew, ...tasks.vocabReview] : [], [tasks]);
  const grammar = useMemo(() => tasks ? [...tasks.grammarNew, ...tasks.grammarReview] : [], [tasks]);

  if (!tasks) return <p>加载测验题目中...</p>;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-blush-600 font-semibold">温柔小测验</p>
          <h1 className="text-2xl font-bold text-gray-900">看看今天掌握得怎么样</h1>
          <p className="text-gray-600 text-sm">选择或填空，做完会显示正确率并自动记录</p>
        </div>
      </div>

      {result ? (
        <div className="rounded-3xl bg-white/90 card-shadow p-6 space-y-3">
          <p className="text-lg font-semibold text-gray-800">正确率 {Math.round(result.accuracy * 100)}%</p>
          <p className="text-gray-600 text-sm">做了 {result.total} 题，错了 {result.wrong.length} 题</p>
          <p className="text-blush-600 font-semibold">{result.accuracy >= 0.8 ? '太棒了，保持手感！' : '没关系，明天再试试，一点点进步就好。'}</p>
          {result.wrong.length > 0 && (
            <div className="space-y-2 text-sm text-gray-700">
              <p className="font-semibold">错题回顾</p>
              {result.wrong.map((w) => (
                <div key={w.id} className="rounded-2xl bg-lavender/60 p-3">
                  <p className="font-medium text-gray-800">{w.prompt}</p>
                  <p className="text-xs text-gray-600">正确答案：{w.answer}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      ) : (
        <Quiz
          vocab={vocab}
          grammar={grammar}
          onFinish={(r) => {
            setResult(r);
            recordToday(tasks.total, tasks.total, { accuracy: r.accuracy, total: r.total });
          }}
        />
      )}
    </div>
  );
}
