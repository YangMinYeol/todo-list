import GNB from "@/component/GNB";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Todo List",
  description: "할 일 목록을 관리하는 To Do 서비스",
};

/**
 * 전체 서비스의 공통 레이아웃
 * GNB(상단바) 고정 표시
 * 중앙 정렬 및 반응형 좌우 여백 설정
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html>
      <body className="min-h-screen flex flex-col bg-white">
        <GNB />
        <main className="w-full max-w-7xl mx-auto px-4 md:px-6 flex-1 text-slate-900">
          {children}
        </main>
      </body>
    </html>
  );
}
