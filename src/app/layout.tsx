import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Nikhil Goutham - Software Developer",
  description: "Portfolio website of Nikhil Goutham - A passionate software developer crafting digital experiences that make a difference.",
  keywords: ["software developer", "web development", "portfolio", "Nikhil Goutham"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  );
}
