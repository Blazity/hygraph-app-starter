import { useQuery } from '@tanstack/react-query';

export type HygraphAsset = {
  createdAt: string;
  fileName: string;
  handle: string;
  height: number;
  id: string;
  size: number;
  stage: string;
  updatedAt: string;
  width: number;
  mimeType: string;
  url: string;
  createdBy: {
    picture: string;
    name: string;
  };
  updatedBy: {
    picture: string;
    name: string;
  };
};

export const useHygraphAssets = ({ apiBase, authToken }: { apiBase: string; authToken: string }) => {
  const assets = useQuery({
    queryKey: ['assets'],
    queryFn: async () => {
      const resp = await fetch(apiBase, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${authToken}` },
        body: JSON.stringify({
          query: `{
                assets {
                  createdAt
                  fileName
                  handle
                  height
                  id
                  size
                  stage
                  updatedAt
                  width
                  mimeType
                  url
                  createdBy {
                    picture
                    name
                  }
                  updatedBy {
                    picture
                    name
                  }
                }
            }`
        })
      });
      const data: any = await resp.json();
      return data.data.assets as HygraphAsset[];
    }
  });

  return assets;
};
