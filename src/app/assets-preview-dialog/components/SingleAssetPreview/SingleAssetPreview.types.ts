import { Asset } from '@/app/asset-field/components/AssetCard/AssetCard.types';
import { Nullable } from '@/types/common';

export interface SingleAssetPreview {
  singleAssetPreview: Asset;
  onCloseDialog: (assets: Nullable<Asset[]>) => void;
  isFromSingleAssetField: boolean;
  setSingleAssetPreview: (asset: Nullable<Asset>) => void;
}
