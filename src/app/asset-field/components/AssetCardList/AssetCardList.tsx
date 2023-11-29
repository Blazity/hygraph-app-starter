import { closestCenter, DndContext } from '@dnd-kit/core';
import { restrictToParentElement, restrictToVerticalAxis } from '@dnd-kit/modifiers';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { DraggableAssetCardContainer } from '@/app/asset-field/components/DraggableAssetCardContainer/DraggableAssetCardContainer';
import { AssetCard } from '@/app/asset-field/components/AssetCard/AssetCard';
import { AssetCardList, AssetCardWrapper } from './AssetCardList.types';

const AssetCardList = ({ assets, handleOnRemoveItem, handleOnDragEnd, isDraggingDisabled }: AssetCardList) => {
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

const DraggableAssetCardWrapper = ({ assets, handleOnRemoveItem, handleOnDragEnd }: AssetCardWrapper) => {
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

const NonDraggableAssetCardWrapper = ({ assets, handleOnRemoveItem }: AssetCardWrapper) => {
  if (assets.length < 1) return null;

  return <AssetCard isSingleAsset onRemoveItem={handleOnRemoveItem} {...assets[0]} />;
};

export { AssetCardList };
