# PitchLab Daily Expression - 3分钟表达练习

这是一个基于 Next.js 的每日即兴演讲练习应用，从 Google AI Studio 生成的 React + Vite 项目迁移而来。

## 技术栈

- **框架**: Next.js 15 (App Router)
- **前端**: React 19
- **样式**: Tailwind CSS 4
- **AI 能力**: Google Gemini AI
- **语言**: TypeScript

## 项目结构

```
pitchlab-daily-expression/
├── app/
│   ├── actions/
│   │   └── gemini.ts          # Server Actions (AI 服务)
│   ├── layout.tsx             # 根布局
│   ├── page.tsx               # 主页面组件
│   └── globals.css            # 全局样式
├── components/
│   ├── Header.tsx             # 头部组件
│   ├── HomeView.tsx           # 首页视图
│   ├── PreparationView.tsx    # 准备页视图
│   ├── SpeechView.tsx         # 演讲录制视图
│   ├── AnalyzingView.tsx      # 分析加载视图
│   ├── ResultView.tsx         # 结果展示视图
│   ├── PosterCard.tsx         # 海报卡片组件
│   └── PosterComponents.tsx   # 海报子组件 (QRCode, UserInfo)
├── lib/
│   ├── types.ts               # TypeScript 类型定义
│   └── constants.ts           # 常量配置
└── .env.local                 # 环境变量 (需要配置)
```

## 文件对应关系

与原 `pitchlab-daily-challenge` 项目的对应关系：

| 原文件 | 新文件 | 说明 |
|--------|--------|------|
| `types.ts` | `lib/types.ts` | 类型定义，完全保留 |
| `constants.tsx` | `lib/constants.ts` | 常量配置，完全保留 |
| `services/geminiService.ts` | `app/actions/gemini.ts` | 转换为 Server Actions |
| `App.tsx` | `app/page.tsx` + `components/*` | 拆分为多个组件 |
| `index.html` | `app/layout.tsx` | HTML 结构迁移到 Layout |

## 安装

1. 安装依赖：

```bash
npm install
```

如果遇到 npm 权限问题，请先运行：
```bash
sudo chown -R $(id -u):$(id -g) ~/.npm
```

或者使用：
```bash
npm install --legacy-peer-deps
```

## 配置

1. 复制环境变量模板：
```bash
cp .env.example .env.local
```

2. 在 `.env.local` 中配置您的 Google Gemini API Key：
```
GEMINI_API_KEY=your_actual_api_key_here
```

获取 API Key: https://aistudio.google.com/app/apikey

## 开发

启动开发服务器：

```bash
npm run dev
```

打开 [http://localhost:3000](http://localhost:3000) 查看应用。

## 构建

构建生产版本：

```bash
npm run build
npm start
```

## 主要功能

1. **首页**: 展示今日话题和精选题库
2. **准备页**: 30秒准备时间，提供思考角度提示
3. **录制页**: 录制音频表达观点
4. **分析页**: AI 分析过程动画
5. **结果页**: 展示金句、评论和海报

## Server Actions 说明

本项目使用 Next.js Server Actions 处理 AI 请求：

- `getSpeechFeedback`: 分析录音并生成反馈
- `generatePosterImage`: 生成海报背景图片

这些函数在 `app/actions/gemini.ts` 中定义，使用 `'use server'` 指令标记。

## 注意事项

1. 录音功能需要 HTTPS 或 localhost 环境
2. 需要配置有效的 Gemini API Key
3. 字体通过 Google Fonts 加载 (Inter + Noto Serif SC)

## 与原项目的主要差异

1. **架构**: Vite → Next.js App Router
2. **服务端**: Server Functions → Server Actions
3. **组件**: 单文件 → 多文件模块化
4. **样式**: Tailwind CDN → Tailwind CSS 4
5. **路由**: 客户端状态 → 保持客户端状态 (SPA 模式)

## 后续更新

如果原 `pitchlab-daily-challenge` 项目有更新：

1. 组件更新：直接替换对应的 `components/*` 文件
2. 类型更新：更新 `lib/types.ts`
3. 常量更新：更新 `lib/constants.ts`
4. AI 服务更新：更新 `app/actions/gemini.ts`

## License

MIT
