'use client';

import { Checkbox } from '@/components/checkbox';
import { cn } from '@/util';
import { useUiExtensionDialog } from '@hygraph/app-sdk-react';
import { Box, Button, DialogContent, Divider, Heading, IconButton, Pill, Progress } from '@hygraph/baukasten';
import { FieldRelation } from '@hygraph/icons';
import { uniqBy } from 'lodash';
import prettyBytes from 'pretty-bytes';
import { useState, type ReactNode } from 'react';
import { Pagination } from './components/pagination';
import { HygraphAsset, useHygraphAssets } from './useHygraphAssets';
import AttachmentIcon from '/public/icons/attachment.svg';

export default function AssetDialog() {
  const { onCloseDialog, isSingleSelect, context, excludedAssets } = useUiExtensionDialog<
    HygraphAsset[],
    {
      isSingleSelect: boolean;
      excludedAssets: string[];
      context: { environment: { authToken: string; endpoint: string } };
    }
  >();

  const [selectedAssets, setSelectedAssets] = useState<HygraphAsset[]>([]);
  const [showOnlySelectedAssets, setShowOnlySelectedAssets] = useState(false);
  const [selectedAssetsSnapshot, setSelectedAssetsSnapshot] = useState<HygraphAsset[]>([]);

  const [resultsPerPage, setResultsPerPage] = useState(25);
  const [page, setPage] = useState(1);

  const assetsQuery = useHygraphAssets({
    apiBase: context.environment.endpoint,
    authToken: context.environment.authToken,
    resultsPerPage: resultsPerPage,
    pageNumber: page,
    includedIds: showOnlySelectedAssets ? selectedAssetsSnapshot.map((asset) => asset.id) : undefined,
    excludedIds: excludedAssets
  });

  // const pagination = usePagination({ totalItems: assetsQuery.data?.totalAssetCount ?? 0 });

  const onSelect = (asset: HygraphAsset) => {
    if (isSingleSelect) {
      return onCloseDialog([asset]);
    }

    setSelectedAssets((assets) => uniqBy([...assets, asset], 'id'));
  };

  const onDeselect = (asset: HygraphAsset) => {
    setSelectedAssets((assets) => assets.filter((selectedAsset) => selectedAsset.id !== asset.id));
  };

  if (assetsQuery.isLoading || !assetsQuery.data) {
    return (
      <DialogContent padding="0" height="48rem">
        <Progress variant="slim" margin={0} />
      </DialogContent>
    );
  }

  const { assets, totalAssetCount } = assetsQuery.data;

  return (
    <DialogContent padding="0" height="48rem">
      <div className="grid h-full grid-rows-[repeat(4,auto)_1fr_repeat(2,auto)]">
        <div className="flex items-center space-x-12 p-24">
          <AttachmentIcon className="h-32 w-32 rounded bg-brand-100 p-2 text-brand-500" />
          <Heading as="h4" className="text-lg font-medium">
            Select Asset
          </Heading>
        </div>

        <Divider margin="0" />

        <Box px="24px" py="8px" className="flex space-x-2 text-m">
          <p className="flex h-24 items-center">{selectedAssets.length} entries selected</p>

          {selectedAssets.length > 0 ? (
            <Button variant="ghost" variantColor="secondary" size="small" onClick={() => setSelectedAssets([])}>
              Clear selection
            </Button>
          ) : null}

          {selectedAssets.length > 0 || showOnlySelectedAssets ? (
            <Button
              variant="ghost"
              variantColor="secondary"
              size="small"
              onClick={() => {
                setSelectedAssetsSnapshot(selectedAssets);
                setPage(1);
                setShowOnlySelectedAssets(!showOnlySelectedAssets);
              }}
            >
              {showOnlySelectedAssets ? 'Show all entries' : 'Show selected entries'}
            </Button>
          ) : null}
        </Box>

        <Divider margin="0" />

        <div className="overflow-auto">
          <table>
            <thead>
              <tr className="h-[28px] w-full border-b shadow-sm">
                <TableHeader className="w-[60px]">
                  {!isSingleSelect ? (
                    <div className="grid place-items-center">
                      <Checkbox
                        checked={selectedAssets.length === assets.length}
                        onCheckedChange={() => {
                          if (selectedAssets.length === assets.length) {
                            return setSelectedAssets([]);
                          }

                          setSelectedAssets(assets);
                        }}
                      />
                    </div>
                  ) : null}
                </TableHeader>
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
              {assets.map((asset) => {
                const isSelected = selectedAssets.some((selectedAsset) => selectedAsset.id === asset.id);

                return (
                  <tr className="h-[60px] overflow-x-auto border-b" key={asset.id}>
                    <TableCell className="min-w-[60px]">
                      {isSingleSelect ? (
                        <IconButton
                          variant="ghost"
                          variantColor="primary"
                          icon={FieldRelation}
                          mx={12}
                          onClick={() => onSelect(asset)}
                        />
                      ) : (
                        <div className="grid place-items-center">
                          <Checkbox
                            checked={isSelected}
                            onCheckedChange={() => {
                              if (isSelected) {
                                return onDeselect(asset);
                              }

                              onSelect(asset);
                            }}
                          />
                        </div>
                      )}
                    </TableCell>
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
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <Pagination
          page={page}
          setPage={setPage}
          resultsPerPage={resultsPerPage}
          setResultsPerPage={setResultsPerPage}
          totalItems={totalAssetCount}
        />

        <div className="flex justify-end bg-brand-50 px-24 py-16">
          {!isSingleSelect ? (
            <Button onClick={() => onCloseDialog(selectedAssets)} size="large" disabled={selectedAssets.length === 0}>
              Add selected assets {selectedAssets.length > 1 ? `(${selectedAssets.length})` : ''}
            </Button>
          ) : null}
        </div>
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
