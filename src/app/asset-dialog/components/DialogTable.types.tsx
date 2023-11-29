import { Asset } from '@/app/asset-field/components/AssetCard/AssetCard.types';

export interface DialogTable {
  onCloseDialog: (selectedItems: Asset[]) => void;
  isSingleSelect: boolean;
}

export interface AssetThumbnail {
  asset: Asset;
  isSelected: boolean;
}

export interface AssetsGrid {
  assets: Asset[];
  handleSelectItem: (asset: Asset) => void;
  selectedAssets: Asset[];
}
