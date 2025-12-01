'use client';

import { StudyCard, CardItem } from '@/components/StudyCard';
import { useDailyTasks } from '@/hooks/useDailyTasks';
import Link from 'next/link';
import { useMemo, useState } from 'react';

export default function StudyPage() {
  const { tasks, recordToday } = useDailyTasks();
  const [done, setDone] = useState(false);
  const [progress, setProgress] = useState({ done: 0, total: 0 });

  const items: CardItem[] = useMemo(() => {
    if (!tasks) return [];
    return [
      ...tasks.vocabNew.map((v) => ({ ...v, type: 'vocab' as const })),
      ...tasks.vocabReview.map((v) => ({ ...v, type: 'vocab' as const })),
      ...tasks.grammarNew.map((g) => ({ ...g, type: 'grammar' as const })),
      ...tasks.grammarReview.map((g) => ({ ...g, type: 'grammar' as const })),
    ];
  }, [tasks]);

  const handleFinish = () => {
    setDone(true);
    recordToday(items.length, items.length);
  };

  if (!tasks) return <p>加载今日任务中...</p>;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-blush-600 font-semibold">每日温柔学习</p>
          <h1 className="text-2xl font-bold text-gray-900">先学习再测验，稳稳拿下 N2</h1>
          <p className="text-gray-600 text-sm">今日 {items.length} 个卡片，完成后自动记录</p>
        </div>
        <Link href="/quiz" className="text-sm text-blush-600 hover:text-blush-500">
          去小测验 →
        </Link>
      </div>

      <StudyCard
        items={items}
        onFinished={handleFinish}
        onProgress={(doneNum, total) => setProgress({ done: doneNum, total })}
      />

      <div className="flex items-center justify-between text-sm text-gray-600">
        <span>
          完成 {progress.done}/{progress.total}
        </span>
        {done && <span className="text-blush-600 font-semibold">学习完成，去测验看看自己的掌握度吧！</span>}
      </div>
    </div>
  );
}
