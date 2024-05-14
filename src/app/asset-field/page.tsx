'use client';

import { DragEndEvent } from '@dnd-kit/core';
import findIndex from 'lodash/findIndex';
import { useEffect, useState } from 'react';

import { arrayMove } from '@dnd-kit/sortable';
import { Button } from '@hygraph/baukasten';
import { ComponentType } from 'react';

import { AssetCardList } from '@/app/asset-field/components/AssetCardList/AssetCardList';
import { useAppConfig } from '@/hooks/useAppConfig';
import { Nullable } from '@/types/common';
import { useFieldExtension } from '@hygraph/app-sdk-react';
import { FieldRelation } from '@hygraph/icons';
import { isEmpty } from 'lodash';
import { useTranslation } from 'react-i18next';
import { ContentTableCell } from './components/ContentTableCell/ContentTableCell';

const ASSET_MANAGER_DIALOG_ROUTE = './asset-dialog';
const ASSETS_PREVIEW_DIALOG_ROUTE = './assets-preview-dialog';
const DIALOG_MAX_WIDTH = '1280px';

export type ImgixAsset = {
  url: string;
  handle: string;
  id: string;
};

const AssetField = () => {
  const { t } = useTranslation();
  const config = useAppConfig();
  const {
    openDialog,
    onChange,
    value,
    field: { isList },
    isTableCell
  } = useFieldExtension();
  const [assets, setAssets] = useState(() => getInitialAssetsValue(value));

  useEffect(() => {
    if (value === null) setAssets([]);
  }, [value]);

  useEffect(() => {
    if (!assets[0]) {
      onChange(null);
      return;
    }
    if (isList) {
      onChange(
        assets.map((asset) => ({ url: `${config.imgixBase}/${asset.handle}`, id: asset.id, handle: asset.handle }))
      );
      return;
    }
    const asset = assets[0];
    onChange({ url: `${config.imgixBase}/${asset.handle}`, id: asset.id, handle: asset.handle });
  }, [assets, isList]);

  const handleOpenPreviewDialog = () => {
    openDialog(ASSETS_PREVIEW_DIALOG_ROUTE, {
      disableOverlayClick: false,
      maxWidth: DIALOG_MAX_WIDTH,
      assets: assets
    });
  };

  const handleOpenAssetManagerDialog = () => {
    openDialog(ASSET_MANAGER_DIALOG_ROUTE, {
      isSingleSelect: !isList,
      disableOverlayClick: false,
      maxWidth: DIALOG_MAX_WIDTH,
      configuration: config
    }).then((newItems) => {
      if (!newItems) return;

      if (!isList) {
        setAssets(newItems);
        return;
      }

      const newAssets = Array.isArray(newItems) ? newItems : [newItems];

      setAssets((prevAssets) => [...prevAssets, ...newAssets]);
    });
  };

  const handleOnRemoveItem = (id: string) => setAssets((assets) => assets.filter((asset) => asset.id !== id));

  const handleOnDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id || !isList) return;

    setAssets((assets) => {
      const oldIndex = findIndex(assets, (asset) => asset.id === active.id);
      const newIndex = findIndex(assets, (asset) => asset.id === over.id);
      return arrayMove(assets, oldIndex, newIndex);
    });
  };

  if (isTableCell) {
    return <ContentTableCell assets={assets} handleOpenPreviewDialog={handleOpenPreviewDialog} />;
  }

  return (
    <>
      <AssetCardList
        assets={assets}
        handleOnRemoveItem={handleOnRemoveItem}
        handleOnDragEnd={handleOnDragEnd}
        isDraggingDisabled={!isList}
      />
      <Button
        className="mt-2 w-full"
        variant="dashed"
        variantColor="primary"
        size="large"
        iconBefore={FieldRelation as ComponentType}
        onClick={handleOpenAssetManagerDialog}
      >
        {isList || assets.length === 0 ? t('assetPicker.addAssetButtonLabel') : t('assetPicker.updateAssetButtonLabel')}
      </Button>
    </>
  );
};

const getInitialAssetsValue = (value: Nullable<ImgixAsset | ImgixAsset[]>) => {
  const fieldValue = isEmpty(value) ? null : value;

  if (Array.isArray(fieldValue)) {
    return fieldValue;
  }

  if (!fieldValue) {
    return [];
  }

  return [fieldValue];
};

export default AssetField;
