import { BaukastenProvider, HygraphProvider, ReactQueryProvider, I18nProvider } from '@/providers';
import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Asset Manager',
  description: 'Manage and integrate your assets'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="light">
      <body className={inter.className}>
        <ReactQueryProvider>
          <I18nProvider>
            <HygraphProvider>
              <BaukastenProvider global>
                {children}
              </BaukastenProvider>
            </HygraphProvider>
          </I18nProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
