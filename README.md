# JLPT N2 温柔学习 Web App

基于 Next.js + TypeScript + Tailwind CSS 的小巧应用，目标是让女朋友每天用约 10 分钟复习/记忆 N2 单词与语法。所有数据保存在前端，直接部署到 Vercel 即可。

## 功能亮点
- 仪表盘：展示今日新学/复习数量、预计用时、进度与温柔鼓励。
- 学习卡片：类似 Anki/Quizlet 的翻面+自评体验，支持简易间隔重复（localStorage 存储）。
- 测验：自动生成选择/判断题，完成后显示正确率与错题回顾并记录到历史。
- 本地题库：`data/vocabN2.ts`、`data/grammarN2.ts` 中维护，直接追加即可扩充。

## 本地运行
1. 安装依赖：`npm install`
2. 开发启动：`npm run dev`，浏览器访问 `http://localhost:3000`
3. 生产构建：`npm run build`，本地预览 `npm start`

## 部署到 Vercel
1. 将代码推到 GitHub/GitLab。
2. 在 Vercel 创建新项目并连接该仓库。
3. 保持默认构建命令 `npm run build`，输出目录 `.next`，一键部署即可。

## 自定义与扩展
- 修改每日新学数量：`hooks/useDailyTasks.ts` 顶部常量 `DAILY_NEW_VOCAB` / `DAILY_NEW_GRAMMAR`。
- 调整记忆间隔：`hooks/useSpacedRepetition.ts` 中 `getIntervalDays` 函数的天数逻辑。
- 增加题库：在 `data/vocabN2.ts` 或 `data/grammarN2.ts` 追加同结构对象。
