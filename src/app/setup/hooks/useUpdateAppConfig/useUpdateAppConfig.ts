import { useMutation } from '@tanstack/react-query';
import { useApp } from '@hygraph/app-sdk-react';
import { useToast } from '@hygraph/baukasten';
import { useTranslation } from 'react-i18next';
import { AppConfig } from './useUpdateAppConfig.types';

const useUpdateAppConfig = ({ apiKey }: AppConfig) => {
  const app = useApp();
  const { t } = useTranslation();
  const showToast = useToast();

  const mutationFn = (appConfig: AppConfig) =>
    app.updateInstallation({
      status: 'COMPLETED',
      config: {
        apiKey: appConfig.apiKey
      }
    });

  const { mutate, isPending } = useMutation({
    mutationFn,
    onError: (error: Error) => {
      showToast({
        variantColor: 'error',
        title: t('setup.errorToast.title'),
        description: `${t('setup.errorToast.description')} ${error.message}`,
        actionBtnTitle: t('setup.errorToast.actionBtnTitle'),
        onClick: () => mutate({ apiKey })
      });
    }
  });

  return { isUpdatingConfig: isPending, updateConfig: mutate };
};

export { useUpdateAppConfig };
