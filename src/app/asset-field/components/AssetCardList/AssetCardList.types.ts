import { Asset } from '@/app/asset-dialog/page';
import { DragEndEvent } from '@dnd-kit/core/dist/types/events';

export interface AssetCardList {
  assets: Asset[];
  handleOnRemoveItem: (id: string) => void;
  handleOnDragEnd: (event: DragEndEvent) => void;
  isDraggingDisabled: boolean;
}

export interface AssetCardWrapper {
  assets: Asset[];
  handleOnRemoveItem: (id: string) => void;
  handleOnDragEnd?: (event: DragEndEvent) => void;
}
