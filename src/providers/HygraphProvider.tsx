'use client';

import { Wrapper } from '@hygraph/app-sdk-react';

interface HygraphProvider {
  children: React.ReactNode;
}

const HygraphProvider = ({ children }: HygraphProvider) => {
  return <Wrapper>{children}</Wrapper>;
};

export { HygraphProvider };
