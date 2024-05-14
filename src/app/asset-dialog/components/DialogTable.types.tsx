import { HygraphAsset } from '../useHygraphAssets';

export interface DialogTableProps {
  onCloseDialog: (selectedItems: HygraphAsset[]) => void;
  isSingleSelect: boolean;
}

export interface AssetThumbnailProps {
  asset: HygraphAsset;
  isSelected: boolean;
}

export interface AssetsGridProps {
  assets: HygraphAsset[];
  handleSelectItem: (asset: HygraphAsset) => void;
  selectedAssets: HygraphAsset[];
}
