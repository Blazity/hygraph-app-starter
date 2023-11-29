import { Asset } from "../AssetCard/AssetCard.types";

export interface ContentTableCell {
  handleOpenPreviewDialog: () => void;
  assets: Asset[];
}
