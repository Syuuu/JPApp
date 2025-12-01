import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'N2 温柔学习 - Daily 10 min',
  description: '为准备 JLPT N2 的女生设计的每日 10 分钟可爱学习小站',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN">
      <body className="min-h-screen">
        <main className="max-w-5xl mx-auto px-4 py-8 sm:py-12">{children}</main>
      </body>
    </html>
  );
}
