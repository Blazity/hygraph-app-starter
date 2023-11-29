import { Box, Card, Heading, IconButton, Flex } from '@hygraph/baukasten';
import { Close, DragHandle, FieldAsset } from '@hygraph/icons';
import { Icon } from '@/types/common';
import { useTranslation } from 'react-i18next';
import { AssetCard } from './AssetCard.types';

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
    <Card className="flex max-h-[70px]">
      <Box className="m-8 flex flex-col justify-center text-neutral-400" {...dragHandleProps}>
        {(DragHandle as Icon)({
          style: { fontSize: '0.8rem', cursor: setCursor(isSingleAsset, isDragging) }
        })}
      </Box>
      <Flex justifyContent="center" alignItems="center" width={70} minWidth={70} height={70}>
        {imageUrl ? (
          <img src={imageUrl} className="h-[60px] w-[60px] object-cover" />
        ) : (
          <Box as={FieldAsset} color="neutral.200" width={50} height={50} />
        )}
      </Flex>
      <Flex className="px-8 py-16" alignItems="center">
        <Heading className="text-[13px]/[16px] text-neutral-900">{name || ''}</Heading>
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

export { AssetCard };
