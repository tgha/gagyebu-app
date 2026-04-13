import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "가계부",
  description: "나의 가계부 앱",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
