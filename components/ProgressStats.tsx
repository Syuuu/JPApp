'use client';

import { DailyRecord } from '@/types';

export const ProgressStats = ({ history }: { history: DailyRecord[] }) => {
  if (!history.length) {
    return (
      <div className="rounded-3xl bg-white/70 border border-lavender p-6 text-sm text-gray-600">
        还没有记录，完成一天任务后这里会显示趋势哦。
      </div>
    );
  }

  return (
    <div className="rounded-3xl bg-white/70 border border-lavender p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">最近完成情况</h3>
      <div className="space-y-3 text-sm">
        {history.slice(0, 7).map((item) => (
          <div key={item.date} className="flex items-center justify-between rounded-2xl bg-lavender/60 p-3">
            <div>
              <p className="font-semibold text-gray-800">{item.date}</p>
              <p className="text-gray-600">完成 {item.completed}/{item.total}</p>
            </div>
            <div className="text-right">
              <p className="text-blush-600 font-semibold">
                {item.finishedAll ? '全部搞定💕' : '继续加油～'}
              </p>
              {item.quiz && (
                <p className="text-xs text-gray-600">测验正确率 {Math.round(item.quiz.accuracy * 100)}% ({item.quiz.total} 题)</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
