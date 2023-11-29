import { Box, Button, Flex, Grid, Pill } from '@hygraph/baukasten';
import { FieldAsset } from '@hygraph/icons';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAssetsQuery } from '@/hooks/useAssetsQuery/useAssetsQuery';
import { DialogTable, AssetThumbnail as AssetThumbnail, AssetsGrid } from './DialogTable.types';
import { Asset } from '@/app/asset-field/components/AssetCard/AssetCard.types';

const DialogTable: React.FC<DialogTable> = ({ onCloseDialog, isSingleSelect }) => {
  const [selectedAssets, setSelectedAssets] = useState<Asset[]>([]);
  const { t } = useTranslation();
  const assets = useAssetsQuery();

  const handleSelectItem = (item: Asset) => {
    if (isSingleSelect) {
      setSelectedAssets([item]);
    } else {
      if (selectedAssets.find((i) => i.id === item.id)) {
        setSelectedAssets(selectedAssets.filter((i) => i.id !== item.id));
      } else {
        setSelectedAssets([...selectedAssets, item]);
      }
    }
  };

  return (
    <Box padding="1.5rem">
      <AssetsGrid assets={assets} handleSelectItem={handleSelectItem} selectedAssets={selectedAssets} />

      <Button
        className="mx-auto mt-10 block"
        variantColor="primary"
        size="large"
        onClick={() => onCloseDialog(selectedAssets)}
      >
        {t('assetPicker.passSelectionButtonLabel')}
      </Button>
    </Box>
  );
};

const AssetThumbnail = ({ asset, isSelected }: AssetThumbnail) => {
  const { t } = useTranslation();
  const { imageUrl, name } = asset;

  return (
    <Flex
      justifyContent="center"
      alignassets="center"
      flexDirection="column"
      padding="1rem"
      width="100%"
      height="100%"
      border={isSelected ? '2px solid blue' : '1px solid gray'}
      gap="0.5rem"
    >
      {imageUrl ? (
        <img src={imageUrl} alt={t('general.assetThumbnailAlt')} className="object-fit h-full" />
      ) : (
        <Box as={FieldAsset} color="neutral.200" width={60} height={60} />
      )}
      <Flex alignassets="center">
        <Pill variantColor="primary" variant="outline" maxWidth="12rem" isTruncated>
          {name}
        </Pill>
      </Flex>
    </Flex>
  );
};

const AssetsGrid = ({ assets, handleSelectItem, selectedAssets }: AssetsGrid) => {
  return (
    <Grid gridTemplateColumns="repeat(4, 1fr)" gap="8">
      {assets.map((asset, index) => (
        <Box
          key={index}
          onClick={() => handleSelectItem(asset)}
          height={200}
          cursor="pointer"
          display="flex"
          justifyContent="center"
          alignassets="center"
        >
          <AssetThumbnail asset={asset} isSelected={selectedAssets.includes(asset)} />
        </Box>
      ))}
    </Grid>
  );
};

export { DialogTable };
