'use client';

import { useUiExtensionDialog } from '@hygraph/app-sdk-react';
import { Box, DialogContent, Divider, Heading, IconButton, Pill, Progress } from '@hygraph/baukasten';
import { FieldRelation } from '@hygraph/icons';
import { uniqBy } from 'lodash';
import prettyBytes from 'pretty-bytes';
import { useState } from 'react';
import { HygraphAsset, useHygraphAssets } from './useHygraphAssets';
import AttachmentIcon from '/public/icons/attachment.svg';

const AssetDialog = () => {
  const { onCloseDialog, isSingleSelect, context } = useUiExtensionDialog<
    HygraphAsset[],
    {
      isSingleSelect: boolean;
      context: { environment: { authToken: string; endpoint: string } };
    }
  >();

  const [selectedAssets, setSelectedAssets] = useState<HygraphAsset[]>([]);

  const assets = useHygraphAssets({
    apiBase: context.environment.endpoint,
    authToken: context.environment.authToken
  });

  const onSelect = (asset: HygraphAsset) => {
    if (isSingleSelect) return onCloseDialog([asset]);
    setSelectedAssets((assets) => uniqBy([...assets, asset], 'id'));
  };

  return (
    <DialogContent padding="0" height="48rem">
      {assets.isLoading && <Progress variant="slim" margin={0} />}

      <div className="flex items-center space-x-12 p-24">
        <AttachmentIcon className="h-32 w-32 rounded bg-brand-100 p-2 text-brand-500" />
        <Heading as="h4" className="text-lg font-medium">
          Select Asset
        </Heading>
      </div>

      <Divider margin="0" />

      <Box px="24px" py="8px" className="text-m">
        {selectedAssets.length} entries selected
      </Box>

      <Divider margin="0" />

      <table>
        <thead>
          <tr className="h-[28px] w-full border-b shadow-sm">
            <td className="w-[60px] border-r"></td>
            <td className="w-[130px] border-r px-2 text-xs font-medium text-slate-500">Stages</td>
            <td className="w-[80px] border-r px-2 text-xs font-medium text-slate-500">Preview</td>
            <td className="w-[120px] border-r px-2 text-xs font-medium text-slate-500">ID</td>
            <td className="w-[120px] border-r px-2 text-xs font-medium text-slate-500">Created At</td>
            <td className="w-[120px] border-r px-2 text-xs font-medium text-slate-500">Updated At</td>
            <td className="w-[120px] border-r px-2 text-xs font-medium text-slate-500">Handle</td>
            <td className="w-[120px] border-r px-2 text-xs font-medium text-slate-500">File Name</td>
            <td className="w-[120px] border-r px-2 text-xs font-medium text-slate-500">Height</td>
            <td className="w-[120px] border-r px-2 text-xs font-medium text-slate-500">Width</td>
            <td className="w-[120px] border-r px-2 text-xs font-medium text-slate-500">Size</td>
            <td className="w-[120px] border-r px-2 text-xs font-medium text-slate-500">Mime Type</td>
          </tr>
        </thead>

        <tbody>
          {assets.data?.map((asset) => {
            return (
              <tr className="h-[60px] overflow-x-auto border-b" key={asset.id}>
                <td className="w-[60px]">
                  <IconButton
                    variant="ghost"
                    variantColor="primary"
                    icon={FieldRelation}
                    mx={12}
                    onClick={() => onSelect(asset)}
                  />
                </td>
                <td className="min-w-[130px] px-2 text-m font-medium text-slate-500"></td>
                <td className="min-w-[80px] px-2 text-m">
                  <img
                    src={getResizedHygraphUrl(asset.url, asset.handle)}
                    className="max-h-[60px] w-[80px] object-cover"
                  />
                </td>
                <td className="min-w-[120px] pl-2 text-m font-medium">
                  <Pill maxWidth={110}>{asset.id}</Pill>
                </td>
                <td className="min-w-[120px] whitespace-nowrap px-2 text-m">{formatDate(new Date(asset.createdAt))}</td>
                <td className="min-w-[120px] whitespace-nowrap px-2 text-m">{formatDate(new Date(asset.updatedAt))}</td>
                <td className="min-w-[120px] whitespace-nowrap px-2 text-m">{asset.handle}</td>
                <td className="min-w-[120px] whitespace-nowrap px-2 text-m">{asset.fileName}</td>
                <td className="min-w-[120px] whitespace-nowrap px-2 text-m">
                  <pre>{asset.height}</pre>
                </td>
                <td className="min-w-[120px] whitespace-nowrap px-2 text-m">
                  <pre>{asset.width}</pre>
                </td>
                <td className="min-w-[120px] whitespace-nowrap px-2 text-m">
                  <pre>{prettyBytes(asset.size)}</pre>
                </td>
                <td className="min-w-[120px] whitespace-nowrap px-2 text-m">{asset.mimeType}</td>
                <td className="w-full"></td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </DialogContent>
  );
};

const getResizedHygraphUrl = (url: string, handle: string) => {
  return url.slice(0, -handle.length) + 'output=format:jpg/resize=width:59,height:59,fit:crop/' + handle;
};

const formatDate = (date: Date) => {
  return `${date.toLocaleDateString()}, ${date.toLocaleTimeString()}`;
};

export default AssetDialog;
