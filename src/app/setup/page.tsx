'use client';

import { Box, Button, Card, Input, Label, Stack, Text } from '@hygraph/baukasten';

import { useState } from 'react';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';
import { useUpdateAppConfig } from '@/app/setup/hooks/useUpdateAppConfig/useUpdateAppConfig';
import { useAppConfig } from '@/hooks/useAppConfig/useAppConfig';

const SetupPage = () => {
  const config = useAppConfig();
  const { t } = useTranslation();

  const [apiKey, setApiKey] = useState(config.apiKey);

  const { isUpdatingConfig, updateConfig } = useUpdateAppConfig({
    apiKey
  });

  const isButtonDisabled = !apiKey;

  return (
    <>
      <main className="pb-16">
        <Card className="mx-auto mb-32 w-[31rem] p-48">
          <Stack className="gap-24">
            <Image src="/hygraph-logo.webp" alt="Asset manager logo" width={50} height={50} />

            <Text className="mb-32">{t('setup.description')}</Text>
          </Stack>
          <Box className="mb-24">
            {/*@ts-expect-error due to broken types*/}
            <Label>{t('setup.apiLabel')}</Label>
            <Input value={apiKey} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setApiKey(e.target.value)} />
          </Box>

          <Button
            className="self-start capitalize"
            size="large"
            onClick={() => updateConfig({ apiKey })}
            disabled={isButtonDisabled || isUpdatingConfig}
            loading={isUpdatingConfig}
            loadingText={t('setup.saveButtonLoadingLabel')}
          >
            {t('setup.saveButtonLabel')}
          </Button>
        </Card>
      </main>
    </>
  );
};

export default SetupPage;
