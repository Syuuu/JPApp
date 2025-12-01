import { DashboardStats } from '@/components/DashboardStats';
import { ProgressStats } from '@/components/ProgressStats';
import { useDailyTasks } from '@/hooks/useDailyTasks';

export default function HomePage() {
  const { tasks, history } = useDailyTasks();

  return (
    <div className="space-y-6">
      <header className="text-center space-y-2">
        <p className="text-sm text-blush-600 font-semibold">N2 每日 10 分钟 温柔学习</p>
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">欢迎回来，一起把日语变得可爱吧 💖</h1>
        <p className="text-gray-600">新词 + 复习 + 小测验，轻松完成今天的任务。</p>
      </header>

      <DashboardStats tasks={tasks} />

      <ProgressStats history={history} />
    </div>
  );
}
