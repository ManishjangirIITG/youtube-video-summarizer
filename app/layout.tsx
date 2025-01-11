import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import  Navbar  from "@/components/navbar";
import { Toaster } from "@/components/ui/toaster";
import { Providers } from './providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'VideoSum AI - YouTube Video Summarizer',
  description: 'Get instant AI-powered summaries of any YouTube video',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>
          <Navbar />
          <main>{children}</main>
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}