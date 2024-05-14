import { useApp } from '@hygraph/app-sdk-react';
import { useMemo } from 'react';
import { z } from 'zod';

const configSchema = z.object({
  imgixBase: z.string()
});

export type AppConfig = z.infer<typeof configSchema>;

export const useAppConfig = () => {
  const { installation } = useApp();

  const config = useMemo(() => {
    const parseResult = configSchema.safeParse(installation.config);

    if (!parseResult.success) {
      return {
        imgixBase: ''
      };
    }
    return parseResult.data;
  }, [installation.config]);

  return config;
};
