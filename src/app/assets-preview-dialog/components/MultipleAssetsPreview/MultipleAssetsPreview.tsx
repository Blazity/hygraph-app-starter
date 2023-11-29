import { Box, DialogContent, Flex, Grid, IconButton, Pill, Stack } from '@hygraph/baukasten';
import { Close, FieldAsset } from '@hygraph/icons';
import { Icon } from '@/types/common';
import { MultipleAssetsPreview } from './MultipleAssetsPreview.types';
import { useTranslation } from 'react-i18next';
import { Asset } from '@/app/asset-field/components/AssetCard/AssetCard.types';

const MultipleAssetsPreview = ({ assets, onCloseDialog, handleClick }: MultipleAssetsPreview) => {
  return (
    <DialogContent height={900} padding={48}>
      <IconButton
        icon={Close as Icon}
        variant="outline"
        variantColor="primary"
        position="absolute"
        right={0}
        top={0}
        margin={8}
        onClick={() => onCloseDialog(null)}
      />
      <Grid gridTemplateColumns="repeat(4, 1fr)" gap="8">
        {assets.map((asset, index) => (
          <Box
            key={index}
            onClick={() => handleClick(asset)}
            height={200}
            cursor="pointer"
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <MultipleAssetsPreviewThumbnail {...asset} />
          </Box>
        ))}
      </Grid>
    </DialogContent>
  );
};

const MultipleAssetsPreviewThumbnail = (asset: Asset) => {
  const { t } = useTranslation();

  const { imageUrl, name } = asset;

  return (
    <Flex
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      width="100%"
      height="100%"
      border="1px solid #1b1849"
      gap={4}
    >
      {imageUrl ? (
        <img src={imageUrl} alt={t('general.assetThumbnailAlt')} className="object-fit h-full" />
      ) : (
        <Box as={FieldAsset} color="neutral.200" width={60} height={60} />
      )}
      <Flex alignItems="center" paddingBottom="1rem">
        <Pill variantColor="primary" variant="outline" maxWidth="12rem" isTruncated>
          {name}
        </Pill>
      </Flex>
    </Flex>
  );
};

export { MultipleAssetsPreview };
