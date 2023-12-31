import { Box, Flex, Spinner } from '@hygraph/baukasten';
import { Error404, FieldAsset, MoreFill } from '@hygraph/icons';

import { useEffect, useState } from 'react';
import { Nullable } from '@/types/common';
import { t } from 'i18next';
import { ContentTableCell } from './ContentTableCell.types';
import { Asset } from '../AssetCard/AssetCard.types';

const ContentTableCell = ({ handleOpenPreviewDialog, assets }: ContentTableCell) => {
  return (
    <Flex flexDirection="row" maxHeight="60px" gap={8} cursor="pointer" onClick={handleOpenPreviewDialog}>
      {assets.slice(0, 3).map((asset) => (
        <Box
          height={60}
          width={60}
          position="relative"
          display="flex"
          justifyContent="center"
          alignItems="center"
          key={asset.id}
        >
          <ContentTableCellThumbnail {...asset} />
        </Box>
      ))}
      {assets.length > 3 && (
        <Box height={60} width={60} display="flex" justifyContent="center" alignItems="center">
          <Box as={MoreFill} color="neutral.200" width={40} height={40} />
        </Box>
      )}
    </Flex>
  );
};

const ContentTableCellThumbnail = (asset: Asset) => {
  const [isLoading, setIsLoading] = useState<Nullable<boolean>>(true);

  const { imageUrl } = asset;

  useEffect(() => {
    const image = new Image();
    image.src = imageUrl;
    image.onload = () => {
      setIsLoading(false);
    };
    image.onerror = () => {
      setIsLoading(null);
    };
  }, [imageUrl]);

  if (isLoading) {
    return <Spinner size="spinner.xs" />;
  }

  if (isLoading === null) {
    return <Box as={Error404} color="neutral.200" width={40} height={40} />;
  }

  if (imageUrl) {
    return (
      <img
        src={imageUrl}
        alt={t('general.assetThumbnailAlt')}
        className="h-full w-full object-contain py-1 text-transparent"
      />
    );
  }

  return <Box as={FieldAsset} color="neutral.200" width={40} height={40} />;
};

export { ContentTableCell };
