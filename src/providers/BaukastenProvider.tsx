'use client';

import { BaukastenProvider as BaukastenThemeProvider } from '@hygraph/baukasten';

interface BaukastenProvider {
  children: React.ReactNode;
}

const font =
  'var(--font-inter), -apple-system, BlinkMacSystemFont, Segoe UI, Helvetica, Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji';

const BaukastenProvider = ({ children }: BaukastenProvider) => {
  return (
    <BaukastenThemeProvider
      themeOverride={{
        fonts: {
          body: font,
          heading: font
        }
      }}
    >
      {children}
    </BaukastenThemeProvider>
  );
};

export { BaukastenProvider };
