'use client';

import { NhostProvider } from '@nhost/nextjs';
import { nhost } from '@/lib/nhost';
import { ThemeProvider } from "@/components/theme-provider";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NhostProvider nhost={nhost}>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        {children}
      </ThemeProvider>
    </NhostProvider>
  );
} 