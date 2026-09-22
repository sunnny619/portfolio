import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import SmoothAnchors from "@/app/_components/smooth-anchors";

export const metadata: Metadata = {
  title: "SEONEUI Portfolio",
  description: "Software Engineer portfolio for Sunny SeonEui Jee.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ko">
      <body>
        <SmoothAnchors />
        {children}
      </body>
    </html>
  );
}
