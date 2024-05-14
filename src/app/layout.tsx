import { BaukastenProvider, HygraphProvider, I18nProvider, ReactQueryProvider } from '@/providers';
import { cn } from '@/util';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

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
    <html lang="en" className="light">
      <body className={cn(inter.variable, inter.className)}>
        <ReactQueryProvider>
          <I18nProvider>
            <HygraphProvider>
              <BaukastenProvider global>{children}</BaukastenProvider>
            </HygraphProvider>
          </I18nProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
