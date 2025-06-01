import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Nikhil Goutham - Data Scientist",
  description: "Portfolio website of Nikhil Goutham - A passionate Data Scientist specializing in Machine Learning, Deep Learning, and Data Engineering.",
  keywords: ["data scientist", "machine learning", "deep learning", "data engineering", "AI", "portfolio", "Nikhil Goutham"],
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
