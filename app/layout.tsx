import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "크레탑 기업정보 상담 가이드 | CRETOP",
  description: "기업정보 서비스 크레탑의 활용 방법을 알아보고 맞춤 상담을 신청하세요.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
