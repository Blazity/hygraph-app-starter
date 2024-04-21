import { useApp } from '@hygraph/app-sdk-react';
import { useMemo } from 'react';
import { z } from 'zod';

type Config = z.infer<typeof configSchema>;

const configSchema = z.object({
  imgixBase: z.string()
});

const useAppConfig = () => {
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

export { useAppConfig };
export type { Config };
