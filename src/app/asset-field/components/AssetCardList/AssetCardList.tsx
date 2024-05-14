import { closestCenter, DndContext } from '@dnd-kit/core';
import { restrictToParentElement, restrictToVerticalAxis } from '@dnd-kit/modifiers';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { DraggableAssetCardContainer } from '@/app/asset-field/components/DraggableAssetCardContainer/DraggableAssetCardContainer';
import { AssetCard } from '@/app/asset-field/components/AssetCard/AssetCard';
import { DragEndEvent } from '@dnd-kit/core/dist/types/events';
import { ImgixAsset } from '../../page';

interface AssetCardListProps {
  assets: ImgixAsset[];
  handleOnRemoveItem: (id: string) => void;
  handleOnDragEnd: (event: DragEndEvent) => void;
  isDraggingDisabled: boolean;
}

interface AssetCardWrapperProps {
  assets: ImgixAsset[];
  handleOnRemoveItem: (id: string) => void;
  handleOnDragEnd?: (event: DragEndEvent) => void;
}

export const AssetCardList = ({
  assets,
  handleOnRemoveItem,
  handleOnDragEnd,
  isDraggingDisabled
}: AssetCardListProps) => {
  return (
    <section className="flex flex-col gap-2">
      {isDraggingDisabled ? (
        <NonDraggableAssetCardWrapper assets={assets} handleOnRemoveItem={handleOnRemoveItem} />
      ) : (
        <DraggableAssetCardWrapper
          assets={assets}
          handleOnRemoveItem={handleOnRemoveItem}
          handleOnDragEnd={handleOnDragEnd}
        />
      )}
    </section>
  );
};

const DraggableAssetCardWrapper = ({ assets, handleOnRemoveItem, handleOnDragEnd }: AssetCardWrapperProps) => {
  const isSingleAsset = assets.length === 1;

  return (
    <DndContext
      onDragEnd={handleOnDragEnd}
      collisionDetection={closestCenter}
      modifiers={[restrictToVerticalAxis, restrictToParentElement]}
    >
      <SortableContext items={assets} strategy={verticalListSortingStrategy}>
        {assets.map((asset) => (
          <DraggableAssetCardContainer id={asset.id} key={asset.id}>
            {({ dragHandleProps, isDragging }) => (
              <AssetCard
                imageUrl={asset.url}
                name={asset.id}
                onRemoveItem={handleOnRemoveItem}
                dragHandleProps={dragHandleProps}
                isDragging={isDragging}
                isSingleAsset={isSingleAsset}
                {...asset}
              />
            )}
          </DraggableAssetCardContainer>
        ))}
      </SortableContext>
    </DndContext>
  );
};

const NonDraggableAssetCardWrapper = ({ assets, handleOnRemoveItem }: AssetCardWrapperProps) => {
  if (assets.length < 1) return null;

  return (
    <AssetCard
      imageUrl={assets[0].url}
      name={assets[0].id}
      isSingleAsset
      onRemoveItem={handleOnRemoveItem}
      {...assets[0]}
    />
  );
};
