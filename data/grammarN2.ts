import { GrammarItem } from '@/types';

// 示例 N2 语法题库
// 如果想增加新语法，只需要在这个文件中追加同样结构的对象即可。
export const grammarN2: GrammarItem[] = [
  {
    id: 'g1',
    level: 'N2',
    pattern: '〜に違いない',
    meaning: '一定是，毫无疑问',
    examples: [
      { jp: 'あの人は日本に長く住んでいたから、日本語が上手に違いない。', cn: '那个人长期住在日本，日语一定很好。' },
    ],
  },
  {
    id: 'g2',
    level: 'N2',
    pattern: '〜て以来',
    meaning: '自从……以来',
    examples: [
      { jp: '彼に会って以来、日本語を勉強するようになった。', cn: '自从遇见他以来开始学习日语。' },
    ],
  },
  {
    id: 'g3',
    level: 'N2',
    pattern: '〜かねない',
    meaning: '可能会……（消极结果）',
    examples: [
      { jp: 'その発言は誤解を招きかねない。', cn: '那样的发言可能会引起误解。' },
    ],
  },
  {
    id: 'g4',
    level: 'N2',
    pattern: '〜おそれがある',
    meaning: '恐怕会，有可能',
    examples: [
      { jp: '台風が接近しているため、交通が乱れるおそれがある。', cn: '由于台风逼近，交通可能会混乱。' },
    ],
  },
  {
    id: 'g5',
    level: 'N2',
    pattern: '〜に応えて',
    meaning: '响应，按照（要求/期待）',
    examples: [
      { jp: '皆さんの期待に応えて、もっと頑張ります。', cn: '为了回应大家的期待，会更加努力。' },
    ],
  },
];
