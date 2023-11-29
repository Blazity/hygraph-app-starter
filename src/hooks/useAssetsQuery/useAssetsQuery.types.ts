export interface ApiAsset {
  id: string;
  name: string;
  image?: {
    url: string;
  };
}

export interface ApiResponse {
  data: ApiAsset[];
}
