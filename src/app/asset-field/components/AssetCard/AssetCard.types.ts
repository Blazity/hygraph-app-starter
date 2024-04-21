export interface AssetCard {
  dragHandleProps?: { [x: string]: Function };
  id: string;
  onRemoveItem: (id: string) => void;
  isSingleAsset: boolean;
  imageUrl: string;
  name: string;
  isDragging?: boolean;
}
