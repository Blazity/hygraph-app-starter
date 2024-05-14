'use client';

import { cn } from '@/util';
import { useUiExtensionDialog } from '@hygraph/app-sdk-react';
import { Box, DialogContent, Divider, Heading, IconButton, Pill, Progress } from '@hygraph/baukasten';
import { FieldRelation } from '@hygraph/icons';
import { uniqBy } from 'lodash';
import prettyBytes from 'pretty-bytes';
import { useState, type ReactNode } from 'react';
import { HygraphAsset, useHygraphAssets } from './useHygraphAssets';
import AttachmentIcon from '/public/icons/attachment.svg';

export default function AssetDialog() {
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

      <div className="overflow-auto">
        <table>
          <thead>
            <tr className="h-[28px] w-full border-b shadow-sm">
              <TableHeader className="w-[60px]" />
              <TableHeader className="w-[130px]">Stages</TableHeader>
              <TableHeader className="w-[80px]">Preview</TableHeader>
              <TableHeader>ID</TableHeader>
              <TableHeader>Created At</TableHeader>
              {/* TODO: created by */}
              <TableHeader>Updated At</TableHeader>
              {/* TODO: updated by */}
              <TableHeader>Handle</TableHeader>
              <TableHeader>File Name</TableHeader>
              <TableHeader>Height</TableHeader>
              <TableHeader>Width</TableHeader>
              <TableHeader>Size</TableHeader>
              <TableHeader>Mime Type</TableHeader>
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
                  <TableCell className="min-w-[130px]"></TableCell>
                  <TableCell className="min-w-[80px]">
                    <img
                      src={getResizedHygraphUrl(asset.url, asset.handle)}
                      className="max-h-[60px] w-[80px] object-cover"
                    />
                  </TableCell>
                  <TableCell>
                    <Pill maxWidth={110} size="24">
                      {asset.id}
                    </Pill>
                  </TableCell>
                  <TableCell>{formatDate(new Date(asset.createdAt))}</TableCell>
                  <TableCell>{formatDate(new Date(asset.updatedAt))}</TableCell>
                  <TableCell>{asset.handle}</TableCell>
                  <TableCell>{asset.fileName}</TableCell>
                  <TableCell>
                    <pre>{asset.height}</pre>
                  </TableCell>
                  <TableCell>
                    <pre>{asset.width}</pre>
                  </TableCell>
                  <TableCell>
                    <pre>{prettyBytes(asset.size)}</pre>
                  </TableCell>
                  <TableCell>{asset.mimeType}</TableCell>
                  <TableCell className="w-full"></TableCell>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </DialogContent>
  );
}

const TableHeader = ({ children, className }: { children?: ReactNode; className?: string }) => {
  return (
    <th className={cn('w-[120px] border-r px-2 text-left text-xs font-medium text-slate-500', className)}>
      {children}
    </th>
  );
};

const TableCell = ({ children, className }: { children?: ReactNode; className?: string }) => {
  return (
    <td className={cn('min-w-[120px] max-w-[120px] overflow-hidden whitespace-nowrap px-2 text-m', className)}>
      {children}
    </td>
  );
};

const getResizedHygraphUrl = (url: string, handle: string) => {
  return url.slice(0, -handle.length) + 'output=format:jpg/resize=width:59,height:59,fit:crop/' + handle;
};

const formatDate = (date: Date) => {
  return `${date.toLocaleDateString()}, ${date.toLocaleTimeString()}`;
};
