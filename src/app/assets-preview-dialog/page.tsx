'use client';

import { useEffect, useState } from 'react';

import { useUiExtensionDialog } from '@hygraph/app-sdk-react';

import { SingleAssetPreview } from '@/app/assets-preview-dialog/components/SingleAssetPreview/SingleAssetPreview';
import { MultipleAssetsPreview } from '@/app/assets-preview-dialog/components/MultipleAssetsPreview/MultipleAssetsPreview';
import { Nullable } from '@/types/common';
import { Asset } from '../asset-field/components/AssetCard/AssetCard.types';

const AssetsPreviewDialog = () => {
  const [singleAssetPreview, setSingleAssetPreview] = useState<Nullable<Asset>>(null);
  const { assets, onCloseDialog } = useUiExtensionDialog<
    unknown,
    { assets: Asset[]; onCloseDialog: (assets: Asset[]) => void }
  >();

  const isFromSingleAssetField = assets.length === 1;

  useEffect(() => {
    // If there is only one item, show its preview immediately
    if (isFromSingleAssetField) {
      setSingleAssetPreview(assets[0]);
    }
  }, [assets, isFromSingleAssetField]);

  if (singleAssetPreview) {
    return (
      <SingleAssetPreview
        singleAssetPreview={singleAssetPreview}
        onCloseDialog={onCloseDialog}
        isFromSingleAssetField={isFromSingleAssetField}
        setSingleAssetPreview={setSingleAssetPreview}
      />
    );
  }

  return (
    <MultipleAssetsPreview
      assets={assets}
      onCloseDialog={onCloseDialog}
      handleClick={(asset) => setSingleAssetPreview(asset)}
    />
  );
};

export default AssetsPreviewDialog;
