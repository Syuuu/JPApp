'use client';

import { useEffect, useState } from 'react';
import { GrammarItem, VocabItem } from '@/types';
import { useSpacedRepetition } from '@/hooks/useSpacedRepetition';

type VocabCard = VocabItem & { type: 'vocab' };
type GrammarCard = GrammarItem & { type: 'grammar' };
// 通过带有 type 字段的可辨识联合，让 TypeScript 正确区分单词与语法卡片
export type CardItem = VocabCard | GrammarCard;

type Props = {
  items: CardItem[];
  onFinished: () => void;
  onProgress: (done: number, total: number) => void;
};

// 学习卡片组件：模拟 Anki/Quizlet 的体验
export const StudyCard = ({ items, onFinished, onProgress }: Props) => {
  const { updateReview } = useSpacedRepetition();
  const [current, setCurrent] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);

  useEffect(() => {
    onProgress(current, items.length);
  }, [current, items.length, onProgress]);

  const item = items[current];

  if (!item) {
    return (
      <div className="rounded-3xl bg-white p-6 card-shadow text-center text-gray-700">
        今日任务完成啦，去测验看看？
      </div>
    );
  }

  const handleRating = (rating: 'hard' | 'ok' | 'easy') => {
    updateReview(item.id, item.type, rating);
    setShowAnswer(false);
    if (current + 1 >= items.length) {
      onFinished();
    }
    setCurrent((c) => Math.min(items.length, c + 1));
  };

  return (
    <div className="rounded-3xl bg-white/95 card-shadow p-6 sm:p-8 fade-in">
      <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
        <span>
          {item.type === 'vocab' ? '单词卡片' : '语法卡片'} {current + 1}/{items.length}
        </span>
        <span>温柔模式</span>
      </div>
      {item.type === 'vocab' ? (
        <div>
          <p className="text-3xl font-bold text-gray-800 mb-2">{item.word}</p>
          <p className="text-blush-600 text-lg mb-4">{item.reading}</p>
          {!showAnswer ? (
            <button
              className="rounded-full bg-blush-500 text-white px-4 py-2 text-sm font-semibold hover:bg-blush-400"
              onClick={() => setShowAnswer(true)}
            >
              显示答案
            </button>
          ) : (
            <div className="space-y-3">
              <p className="text-lg text-gray-800 font-semibold">{item.meaning}</p>
              <div className="space-y-2 text-sm text-gray-700">
                {item.examples.map((ex) => (
                  <div key={ex.jp}>
                    <p className="font-medium text-gray-800">例：{ex.jp}</p>
                    <p className="text-gray-600">{ex.cn}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      ) : (
        <div>
          <p className="text-2xl font-bold text-gray-800 mb-2">{item.pattern}</p>
          <p className="text-gray-700 mb-4">在例句中尝试填入或理解该语法吧</p>
          {!showAnswer ? (
            <>
              <div className="space-y-2 text-sm text-gray-700 mb-4">
                {item.examples.map((ex) => (
                  <div key={ex.jp}>
                    <p className="font-medium text-gray-800">例：{ex.jp.replace(item.pattern, '＿＿')}</p>
                    <p className="text-gray-600">{ex.cn}</p>
                  </div>
                ))}
              </div>
              <button
                className="rounded-full bg-blush-500 text-white px-4 py-2 text-sm font-semibold hover:bg-blush-400"
                onClick={() => setShowAnswer(true)}
              >
                显示答案
              </button>
            </>
          ) : (
            <div className="space-y-3 text-sm text-gray-700">
              <p className="text-lg font-semibold text-gray-800">语法含义</p>
              <p>{item.meaning}</p>
              <div className="space-y-2">
                {item.examples.map((ex) => (
                  <div key={ex.jp}>
                    <p className="font-medium text-gray-800">完整例句：{ex.jp}</p>
                    <p className="text-gray-600">{ex.cn}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {showAnswer && (
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
          <button
            className="w-full rounded-full bg-white border-2 border-blush-200 text-blush-600 px-3 py-2 font-semibold hover:border-blush-400"
            onClick={() => handleRating('hard')}
          >
            完全不会
          </button>
          <button
            className="w-full rounded-full bg-blush-100 text-blush-700 px-3 py-2 font-semibold hover:bg-blush-200"
            onClick={() => handleRating('ok')}
          >
            有点印象
          </button>
          <button
            className="w-full rounded-full bg-blush-500 text-white px-3 py-2 font-semibold hover:bg-blush-400"
            onClick={() => handleRating('easy')}
          >
            已经掌握
          </button>
        </div>
      )}
    </div>
  );
};
