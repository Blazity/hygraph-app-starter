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

type ResponseType = {
  data: {
    assetsConnection: {
      edges: {
        node: HygraphAsset;
      }[];
      pageInfo: {
        hasNextPage: boolean;
        hasPreviousPage: boolean;
      };
      aggregate: {
        count: number;
      };
    };
  };
};

export const useHygraphAssets = ({
  apiBase,
  authToken,
  resultsPerPage,
  pageNumber,
  includedIds,
  excludedIds
}: {
  apiBase: string;
  authToken: string;
  resultsPerPage: number;
  pageNumber: number;
  includedIds?: string[];
  excludedIds?: string[];
}) => {
  const first = resultsPerPage;
  const skip = resultsPerPage * (pageNumber - 1);

  const whereIdInFilter = includedIds ? `, where: { id_in: [${includedIds.map((id) => `"${id}"`).join(',')}]}` : '';
  const whereIdNotInFilter = excludedIds
    ? `, where: { id_not_in: [${excludedIds.map((id) => `"${id}"`).join(',')}]}`
    : '';

  const assets = useQuery({
    queryKey: ['assets', { skip, first }],
    queryFn: async () => {
      const resp = await fetch(apiBase, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${authToken}` },
        body: JSON.stringify({
          query: `{
              assetsConnection(first: ${first}, skip: ${skip} ${whereIdInFilter} ${whereIdNotInFilter}) {
                edges {
                  node {
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
                }
                aggregate {
                  count
                }
                pageInfo {
                  hasNextPage
                  hasPreviousPage
                }
              }
            }`
        })
      });
      const { data } = (await resp.json()) as ResponseType;
      const assets = data.assetsConnection.edges.map((edge) => edge.node);
      return {
        assets: assets,
        hasNextPage: data.assetsConnection.pageInfo.hasNextPage,
        hasPreviousPage: data.assetsConnection.pageInfo.hasPreviousPage,
        totalAssetCount: data.assetsConnection.aggregate.count
      };
    }
  });

  return assets;
};
