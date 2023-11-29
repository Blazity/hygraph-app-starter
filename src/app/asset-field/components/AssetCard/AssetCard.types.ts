export interface Asset {
  id: string;
  name: string;
  imageUrl: string;
}

export interface AssetCard {
  dragHandleProps?: { [x: string]: Function };
  id: string;
  onRemoveItem: (id: string) => void;
  isSingleAsset: boolean;
  imageUrl: string;
  name: string;
  isDragging?: boolean;
}
