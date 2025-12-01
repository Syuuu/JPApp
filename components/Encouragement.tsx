'use client';

import { useMemo } from 'react';

const messages = [
  '今天也一起加油一点点～',
  '就算只有十分钟，也是温柔的积累。',
  '喝口水深呼吸，慢慢来就好。',
  '失败也是进步的一部分，别怕犯错。',
  '和我一起把 N2 变得可爱起来！',
];

export const Encouragement = () => {
  const pick = useMemo(() => messages[Math.floor(Math.random() * messages.length)], []);
  return (
    <div className="rounded-2xl bg-white/80 card-shadow p-4 text-blush-700 text-sm">
      {pick}
    </div>
  );
};
