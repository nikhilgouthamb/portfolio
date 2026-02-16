import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { ThemeProvider } from "@/contexts/ThemeContext";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Nikhil Goutham - Data Scientist",
  description: "Portfolio website of Nikhil Goutham - A passionate Data Scientist specializing in Machine Learning, Deep Learning, and Data Engineering.",
  keywords: ["data scientist", "machine learning", "deep learning", "data engineering", "AI", "portfolio", "Nikhil Goutham"],
  authors: [{ name: "Nikhil Goutham" }],
  creator: "Nikhil Goutham",
  publisher: "Nikhil Goutham",
  metadataBase: new URL("https://nikhilgoutham.space"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Nikhil Goutham - Data Scientist",
    description: "Portfolio website of Nikhil Goutham - A passionate Data Scientist specializing in Machine Learning, Deep Learning, and Data Engineering.",
    url: "https://nikhilgoutham.space",
    siteName: "Nikhil Goutham Portfolio",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/profile.jpg",
        width: 1200,
        height: 630,
        alt: "Nikhil Goutham - Data Scientist",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nikhil Goutham - Data Scientist",
    description: "Portfolio website of Nikhil Goutham - A passionate Data Scientist specializing in Machine Learning, Deep Learning, and Data Engineering.",
    images: ["/profile.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){var t=localStorage.getItem('portfolio-theme');var d=window.matchMedia('(prefers-color-scheme: dark)').matches;if(t==='dark'||(!t&&d))document.documentElement.classList.add('dark');else document.documentElement.classList.remove('dark');})();`,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "name": "Nikhil Goutham",
              "jobTitle": "Data Scientist",
              "url": "https://nikhilgoutham.space",
              "sameAs": [
                "https://www.linkedin.com/in/nikhilgoutham",
                "https://github.com/nikhilgouthamb",
                "https://medium.com/@nikhilgoutham.b",
                "https://www.kaggle.com/nikhilbudarayavalasa"
              ],
              "email": "bnikhilgoutham@gmail.com",
              "alumniOf": {
                "@type": "EducationalOrganization",
                "name": "New Jersey Institute of Technology"
              },
              "knowsAbout": [
                "Machine Learning",
                "Deep Learning",
                "Data Engineering",
                "Data Analysis",
                "Python",
                "SQL",
                "Cloud Computing"
              ]
            })
          }}
        />
      </head>
      <body className={`${inter.className} antialiased`}>
        <ThemeProvider>
          <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-gray-900 focus:text-white focus:rounded focus:outline-none">
            Skip to main content
          </a>
          {children}
          <Analytics />
          <SpeedInsights />
        </ThemeProvider>
      </body>
    </html>
  );
}
