import { useState, useEffect } from 'react';
import { CATS_API_BASE_ROUTE } from '@/app/api/consts';
import { useUiExtensionDialog } from '@hygraph/app-sdk-react';
import { Config } from '../useAppConfig/useAppConfig';
import { ApiAsset, ApiResponse } from './useAssetsQuery.types';
import { Asset } from '@/app/asset-field/components/AssetCard/AssetCard.types';

const useAssetsQuery = () => {
  const [assets, setAssets] = useState<Asset[]>([]);
  const { configuration } = useUiExtensionDialog() as { configuration: Config };

  useEffect(() => {
    const fetchCats = async () => {
      try {
        const configPayload = { configuration };
        const response = await fetch(CATS_API_BASE_ROUTE, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(configPayload)
        });

        const apiResponse = (await response.json()) as ApiResponse;

        setAssets(
          apiResponse.data.map((cat) => ({
            id: `cat-${cat.id}`,
            name: cat.name || '',
            imageUrl: cat.image?.url || ''
          }))
        );
      } catch (error) {
        console.error('Error fetching cats:', error);
      }
    };

    fetchCats();
  }, [configuration]);

  return assets;
};

export { useAssetsQuery };
