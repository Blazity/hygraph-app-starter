'use client';

import { Box, Button, Card, Input, Label, Stack } from '@hygraph/baukasten';

import { useUpdateAppConfig } from '@/app/setup/useUpdateAppConfig';
import { useAppConfig } from '@/hooks/useAppConfig';
import Image from 'next/image';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

const SetupPage = () => {
  const config = useAppConfig();
  const { t } = useTranslation();

  const [imgixBase, setImgixBase] = useState(config.imgixBase);

  const { isUpdatingConfig, updateConfig } = useUpdateAppConfig({ imgixBase });

  const isButtonDisabled = !imgixBase;

  return (
    <>
      <main className="pb-16">
        <Card className="mx-auto mb-32 w-[31rem] p-48">
          <Stack className="gap-24">
            <Image src="/hygraph-logo.webp" alt="Asset manager logo" width={50} height={50} />
          </Stack>
          <Box className="mb-24">
            {/*@ts-expect-error due to broken types*/}
            <Label>{t('setup.apiLabel')}</Label>
            <Input
              value={imgixBase}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setImgixBase(e.target.value)}
            />
          </Box>

          <Button
            className="self-start capitalize"
            size="large"
            onClick={() => updateConfig({ imgixBase })}
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
