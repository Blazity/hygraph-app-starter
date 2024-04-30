import { Icon } from '@/types/common';
import { Box, Card, Flex, IconButton } from '@hygraph/baukasten';
import { Close, DragHandle, FieldAsset } from '@hygraph/icons';
import type { AssetCard } from './AssetCard.types';

const AssetCard = ({ dragHandleProps, onRemoveItem, name, id, isSingleAsset, imageUrl, isDragging }: AssetCard) => {
  const setCursor = (isSingleAsset: boolean, isDragging: boolean | undefined) => {
    if (isSingleAsset) {
      return 'default';
    }

    if (isDragging) {
      return 'grabbing';
    }

    return 'grab';
  };

  return (
    <Card className="flex h-[70px] max-h-[70px]">
      {!isSingleAsset && (
        <Box className="m-8 flex flex-col justify-center text-neutral-400" {...dragHandleProps}>
          {(DragHandle as Icon)({
            style: { fontSize: '0.8rem', cursor: setCursor(isSingleAsset, isDragging) }
          })}
        </Box>
      )}
      <Flex justifyContent="center" alignItems="center" width={70} minWidth={70} height={70} ml={16}>
        {imageUrl ? (
          <img src={getResizedImgixUrl(imageUrl)} className="h-[70px] w-[70px] object-cover" />
        ) : (
          <Box as={FieldAsset} color="neutral.200" width={50} height={50} />
        )}
      </Flex>
      <Flex className="overflow-hidden" alignItems="center" ml={16}>
        <p className="block overflow-hidden  text-ellipsis whitespace-nowrap text-sm font-medium text-neutral-500">
          {name || ''}
        </p>
      </Flex>
      <IconButton
        icon={Close as Icon}
        variantColor="secondary"
        variant="ghost"
        className="ml-auto mr-8"
        onClick={() => onRemoveItem(id)}
      />
    </Card>
  );
};

export const getResizedImgixUrl = (url: string) => {
  const params = new URLSearchParams({
    w: '120',
    h: '120'
  });
  return url + '?' + params.toString();
};

export { AssetCard };
