'use client';

import { Config } from '@/hooks/useAppConfig/useAppConfig';
import { useUiExtensionDialog } from '@hygraph/app-sdk-react';
import { Box, DialogContent, Divider, Heading, IconButton, Pill } from '@hygraph/baukasten';
import { FieldRelation } from '@hygraph/icons';
import { useQuery } from '@tanstack/react-query';
import { uniqBy } from 'lodash';
import { useState } from 'react';

export type Asset = {
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

const AssetDialog = () => {
  const { onCloseDialog, isSingleSelect, configuration, context } = useUiExtensionDialog<
    unknown,
    {
      onCloseDialog: (assets: Asset[]) => void;
      isSingleSelect: boolean;
      configuration: Config;
      context: { environment: { authToken: string; endpoint: string } };
    }
  >();

  const [selectedAssets, setSelectedAssets] = useState<Asset[]>([]);

  const API = context.environment.endpoint;

  const onSelect = (asset: Asset) => {
    if (isSingleSelect) return onCloseDialog([asset]);
    setSelectedAssets((assets) => uniqBy([...assets, asset], 'id'));
  };

  const assets = useQuery({
    queryKey: ['assets'],
    queryFn: async () => {
      const resp = await fetch(API, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${context.environment.authToken}` },
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
      return data.data.assets as Asset[];
    }
  });

  return (
    <DialogContent padding="0" height="48rem">
      <Heading as="h1" className="p-24 text-xl font-semibold">
        Select Asset
      </Heading>
      <Divider margin="0" />
      <Box px={'24px'} py={'8px'} className="text-sm">
        {selectedAssets.length} entries selected
      </Box>
      <Divider margin="0" />
      <table>
        <thead>
          <tr className="h-[28px] w-full border-b shadow-sm">
            <td className="w-[60px] border-r"></td>
            <td className=" w-[130px] border-r px-2 text-xs font-medium text-slate-500">Stages</td>
            <td className=" w-[80px] border-r px-2 text-xs font-medium text-slate-500">Preview</td>
            <td className=" w-[120px] border-r px-2 text-xs font-medium text-slate-500">ID</td>
            <td className=" w-[120px] border-r px-2 text-xs font-medium text-slate-500">Created At</td>
          </tr>
        </thead>
        <tbody>
          {assets.data?.map((asset) => {
            return (
              <tr className="h-[60px] border-b" key={asset.id}>
                <td className="w-[60px]">
                  <IconButton
                    variant="ghost"
                    variantColor="primary"
                    icon={FieldRelation}
                    mx={12}
                    onClick={() => onSelect(asset)}
                  />
                </td>
                <td className=" min-w-[130px]  px-2 text-xs font-medium text-slate-500"></td>
                <td className=" min-w-[80px] px-2 text-xs ">
                  <img src={asset.url} className="max-h-[60px] w-[80px] object-cover" />
                </td>
                <td className=" min-w-[120px]  pl-2 text-xs font-medium">
                  <Pill maxWidth={110}>{asset.id}</Pill>
                </td>
                <td className=" min-w-[120px]  whitespace-nowrap px-2 text-xs ">
                  {`${new Date(asset.createdAt).toLocaleDateString()}, ${new Date(asset.createdAt).toLocaleTimeString()}`}
                </td>
                <td className="w-full"></td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </DialogContent>
  );
};

export default AssetDialog;
