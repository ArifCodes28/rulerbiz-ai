import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "RuralBiz AI — Smart Business Advisory for Rural Entrepreneurs",
  description:
    "AI-powered hyper-local business advisory and financial planning assistant for rural micro-entrepreneurs. SIH Prototype.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
