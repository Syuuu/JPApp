'use client';

import { useMemo, useState } from 'react';
import { GrammarItem, VocabItem } from '@/types';

export type QuizQuestion = {
  id: string;
  prompt: string;
  options: string[];
  answer: string;
  type: 'choice' | 'judge';
};

type Props = {
  vocab: VocabItem[];
  grammar: GrammarItem[];
  onFinish: (result: { accuracy: number; total: number; wrong: QuizQuestion[] }) => void;
};

// 将词汇/语法转换成简单的选择题
const buildQuestions = (vocab: VocabItem[], grammar: GrammarItem[]): QuizQuestion[] => {
  const vocabChoices = vocab.map((item) => {
    const distractors = vocab
      .filter((v) => v.id !== item.id)
      .slice(0, 3)
      .map((v) => v.meaning);
    const options = [item.meaning, ...distractors].sort(() => Math.random() - 0.5);
    return {
      id: `v-${item.id}`,
      prompt: `${item.word}（${item.reading}）的中文意思是？`,
      options,
      answer: item.meaning,
      type: 'choice' as const,
    };
  });

  const grammarChoices = grammar.map((item) => {
    const distractors = grammar
      .filter((g) => g.id !== item.id)
      .slice(0, 3)
      .map((g) => g.meaning);
    const options = [item.meaning, ...distractors].sort(() => Math.random() - 0.5);
    return {
      id: `g-${item.id}`,
      prompt: `${item.pattern} 的用法是？`,
      options,
      answer: item.meaning,
      type: 'choice' as const,
    };
  });

  const judgeQuestions = grammar.slice(0, 2).map((item) => ({
    id: `jg-${item.id}`,
    prompt: `${item.examples[0]?.jp.replace(item.pattern, '＿＿')} 需要填入的语法是？`,
    options: [item.pattern, '別の表現', '多分これ', 'よく似た形'],
    answer: item.pattern,
    type: 'judge' as const,
  }));

  return [...vocabChoices, ...grammarChoices, ...judgeQuestions].slice(0, 8);
};

export const Quiz = ({ vocab, grammar, onFinish }: Props) => {
  const questions = useMemo(() => buildQuestions(vocab, grammar), [vocab, grammar]);
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const q = questions[current];

  const submit = (choice: string) => {
    const nextAnswers = { ...answers, [q.id]: choice };
    setAnswers(nextAnswers);
    if (current + 1 >= questions.length) {
      const wrong = questions.filter((question) => nextAnswers[question.id] !== question.answer);
      const accuracy = (questions.length - wrong.length) / questions.length;
      onFinish({ accuracy, total: questions.length, wrong });
    } else {
      setCurrent((c) => c + 1);
    }
  };

  if (!q) return null;

  return (
    <div className="rounded-3xl bg-white/95 card-shadow p-6 sm:p-8 space-y-4 fade-in">
      <div className="flex items-center justify-between text-sm text-gray-500">
        <span>测试 {current + 1}/{questions.length}</span>
        <span>做完就休息～</span>
      </div>
      <p className="text-lg font-semibold text-gray-800">{q.prompt}</p>
      <div className="grid gap-3">
        {q.options.map((opt) => {
          const active = answers[q.id] === opt;
          return (
            <button
              key={opt}
              className={`rounded-2xl border px-4 py-3 text-left transition ${active ? 'border-blush-500 bg-blush-50 text-blush-700' : 'border-lavender bg-white hover:border-blush-200'}`}
              onClick={() => submit(opt)}
            >
              {opt}
            </button>
          );
        })}
      </div>
    </div>
  );
};
