import { cn } from '@/util';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ReactQueryProvider } from '@/providers/ReactQueryProvider';
import { I18nProvider } from '@/providers/I18nProvider';
import { HygraphProvider } from '@/providers/HygraphProvider';
import { BaukastenProvider } from '@/providers/BaukastenProvider';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter'
});

export const metadata: Metadata = {
  title: 'Asset Manager',
  description: 'Manage and integrate your assets'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={cn(inter.variable, inter.className)}>
        <ReactQueryProvider>
          <I18nProvider>
            <HygraphProvider>
              <BaukastenProvider>{children}</BaukastenProvider>
            </HygraphProvider>
          </I18nProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
