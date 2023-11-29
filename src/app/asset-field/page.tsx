'use client';

import { useEffect, useState } from 'react';
import { DragEndEvent } from '@dnd-kit/core';
import findIndex from 'lodash/findIndex';

import { arrayMove } from '@dnd-kit/sortable';
import { Button } from '@hygraph/baukasten';
import { ComponentType } from 'react';

import { useFieldExtension } from '@hygraph/app-sdk-react';
import { useTranslation } from 'react-i18next';
import { useAppConfig } from '@/hooks/useAppConfig/useAppConfig';
import { Nullable } from '@/types/common';
import { nanoid } from 'nanoid';
import { isEmpty, omit } from 'lodash';
import { AssetCardList } from '@/app/asset-field/components/AssetCardList/AssetCardList';
import { ContentTableCell } from './components/ContentTableCell/ContentTableCell';
import { FieldRelation } from '@hygraph/icons';
import { Asset } from './components/AssetCard/AssetCard.types';

const ASSET_MANAGER_DIALOG_ROUTE = './asset-dialog';
const ASSETS_PREVIEW_DIALOG_ROUTE = './assets-preview-dialog';
const DIALOG_MAX_WIDTH = '1280px';

const AssetField = () => {
  const { t } = useTranslation();
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
    onChange(isList ? assets.map((asset) => omit(asset, 'id')) : omit(assets[0], 'id'));
  }, [assets, isList]);

  const config = useAppConfig();

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

const getInitialAssetsValue = (value: Nullable<Asset | Asset[]>) => {
  const fieldValue = isEmpty(value) ? null : value;

  if (Array.isArray(fieldValue)) {
    return fieldValue.map((item) => ({ ...item, id: nanoid() }));
  }

  if (!fieldValue) {
    return [];
  }

  return [{ ...fieldValue, id: nanoid() }];
};

export default AssetField;
