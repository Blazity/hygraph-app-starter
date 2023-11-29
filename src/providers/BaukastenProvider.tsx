'use client';

import { BaukastenProvider as BaukastenThemeProvider } from '@hygraph/baukasten';

interface BaukastenProvider {
  children: React.ReactNode;
  global?: boolean;
}

const BaukastenProvider = ({ children }: BaukastenProvider) => {
  return <BaukastenThemeProvider>{children}</BaukastenThemeProvider>;
};

export { BaukastenProvider };
