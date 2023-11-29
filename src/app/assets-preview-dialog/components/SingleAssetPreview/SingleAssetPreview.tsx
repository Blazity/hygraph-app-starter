import { Box, DialogContent, IconButton, Stack } from '@hygraph/baukasten';
import { ArrowBack, Close, Copy } from '@hygraph/icons';
import { Icon } from '@/types/common';
import { useTranslation } from 'react-i18next';
import { SingleAssetPreview } from './SingleAssetPreview.types';

const SingleAssetPreview = ({
  singleAssetPreview,
  onCloseDialog,
  isFromSingleAssetField,
  setSingleAssetPreview
}: SingleAssetPreview) => {
  const { t } = useTranslation();

  const { imageUrl } = singleAssetPreview;

  return (
    <DialogContent padding={48} height={900} display="flex" justifyContent="center">
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
      {!isFromSingleAssetField && (
        <IconButton
          icon={ArrowBack as Icon}
          variant="outline"
          variantColor="primary"
          position="absolute"
          left={0}
          top={0}
          margin={8}
          onClick={() => setSingleAssetPreview(null)}
        />
      )}
      <Box>
        <img
          alt={t('general.assetThumbnailAlt')}
          src={imageUrl}
          className="h-full w-full object-scale-down text-transparent"
        />
      </Box>
    </DialogContent>
  );
};

export { SingleAssetPreview };
