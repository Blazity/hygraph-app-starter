import { useQuery } from '@tanstack/react-query';
import { gql, request } from 'graphql-request';

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

type Data = {
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

const query = gql`
  query Assets($first: Int!, $skip: Int!, $where: AssetWhereInput!) {
    assetsConnection(first: $first, skip: $skip, where: $where) {
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
  }
`;

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
  excludedIds: string[];
}) => {
  const first = resultsPerPage;
  const skip = resultsPerPage * (pageNumber - 1);

  const assets = useQuery({
    queryKey: ['assets', { skip, first, excludedIds, includedIds }],
    queryFn: async () => {
      const data = await request<Data>({
        url: apiBase,
        document: query,
        variables: {
          first,
          skip,
          where: {
            id_not_in: excludedIds,
            id_in: includedIds
          }
        },
        requestHeaders: {
          Authorization: `Bearer ${authToken}`
        }
      });

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
