
import { Topic } from './types';

export const CATEGORIES = ['全部', 'AI', '社会观察', '职场', '成长', '哲学'];

export const TODAY_TOPIC: Topic = {
  id: 't-today',
  title: '"如果人工智能完全取代了你的工作，你会做什么？"',
  date: 'Today',
  practiceCount: 1205,
  tag: 'AI',
  subQuestions: [
    "AI会如何改变你对'价值'的定义？",
    "如果你有无限的自由时间，哪个梦想会被重启？",
    "'人的独特性'在效率至上的时代如何幸存？",
    "如果不为生计，你会选择创造什么？"
  ]
};

export const ALL_TOPICS: Topic[] = [
  {
    id: 'f1',
    title: '你如何向一个从未见过互联网的孩子描述它？',
    date: '10-25',
    practiceCount: 342,
    tag: '社会观察',
    subQuestions: ["它像什么？", "它带来了什么？", "它让世界变小了吗？"]
  },
  {
    id: 'f2',
    title: '如果人生可以存档并重读，你会回到哪一章？',
    date: '10-24',
    practiceCount: 891,
    tag: '哲学',
    subQuestions: ["后悔还是怀念？", "重新选择会有不同吗？", "你会带上记忆吗？"]
  },
  {
    id: 'f3',
    title: '城市里的孤独感是由于建筑还是人心？',
    date: '10-23',
    practiceCount: 567,
    tag: '社会观察',
    subQuestions: ["空间的物理距离", "心理的防御机制", "数字连接的虚无"]
  },
  {
    id: 'f4',
    title: '你是如何定义"真正的成功"的？',
    date: '10-22',
    practiceCount: 120,
    tag: '成长',
    subQuestions: ["金钱的权重", "内心的平静", "对他人的影响"]
  },
  {
    id: 'f5',
    title: '工作中，"靠谱"和"聪明"哪个更重要？',
    date: '10-21',
    practiceCount: 450,
    tag: '职场',
    subQuestions: ["长期信任的建立", "解决突发问题的能力", "团队协作的基础"]
  }
];

export const PREP_TIME = 30;
export const SPEECH_TIME = 180;
