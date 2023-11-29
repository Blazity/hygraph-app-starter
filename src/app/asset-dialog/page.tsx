'use client';

import React from 'react';
import { DialogContent, Divider, Heading } from '@hygraph/baukasten';
import { Config } from '@/hooks/useAppConfig/useAppConfig';
import { useUiExtensionDialog } from '@hygraph/app-sdk-react';
import { DialogTable } from './components/DialogTable';
import { Asset } from '../asset-field/components/AssetCard/AssetCard.types';

const AssetDialog = () => {
  const { onCloseDialog, isSingleSelect, configuration } = useUiExtensionDialog<
    unknown,
    { onCloseDialog: (assets: Asset[]) => void; isSingleSelect: boolean; configuration: Config }
  >();

  return (
    <DialogContent padding="0" height="60rem">
      <Heading as="h1" className="p-24 text-2xl">
        Select asset
      </Heading>
      <Divider margin="0" />
      <DialogTable onCloseDialog={onCloseDialog} isSingleSelect={isSingleSelect} />
    </DialogContent>
  );
};

export default AssetDialog;
