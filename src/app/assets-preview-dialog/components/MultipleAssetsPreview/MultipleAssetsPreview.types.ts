import { Asset } from '@/app/asset-field/components/AssetCard/AssetCard.types';
import { Nullable } from '@/types/common';

export interface MultipleAssetsPreview {
  assets: Asset[];
  onCloseDialog: (assets: Nullable<Asset[]>) => void;
  handleClick: (asset: Asset) => void;
}
