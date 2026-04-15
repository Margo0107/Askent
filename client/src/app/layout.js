import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import NextTopLoader from "nextjs-toploader";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Askent",
  description: "Ask questions, reply to others, and join discussions.",
  keywords: ["questions", "answers", "discussion", "forum"],
  icons: {
    icon: "/icon_askent.png",
  },
  openGraph: {
    title: "Askent — Ask questions & get answers",
    description: "Ask questions and get answers",
    url: "http://localhost:3000",
    siteName: "Askent",
    images: [
      {
        url: "/icon_askent.png",
        width: 1200,
        height: 630,
      },
    ],
    type: "website",
  },
};


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <NextTopLoader
          color="#8b5cf6"
          initialPosition={0.08}
          crawlSpeed={300}
          height={3}
          crawl={true}
          showSpinner={false}
          easing="ease"
          speed={300}
        />
        {children}
      </body>
    </html>
  );
}
