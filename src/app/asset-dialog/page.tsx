'use client';

import { Checkbox } from '@/components/checkbox';
import { cn } from '@/util';
import { useUiExtensionDialog } from '@hygraph/app-sdk-react';
import { Box, Button, Divider, Heading, IconButton, Pill, Progress } from '@hygraph/baukasten';
import { FieldRelation } from '@hygraph/icons';
import prettyBytes from 'pretty-bytes';
import { useState, type ReactNode } from 'react';
import { uniqueBy } from 'remeda';
import { Pagination } from './components/pagination';
import { User } from './components/user';
import { HygraphAsset, useHygraphAssets } from './useHygraphAssets';
import AttachmentIcon from '/public/icons/attachment.svg';

export default function AssetDialog() {
  const {
    onCloseDialog: closeDialogWithResult,
    isSingleSelect,
    context,
    excludedAssets
  } = useUiExtensionDialog<
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

  const addToSelection = (asset: HygraphAsset) => {
    setSelectedAssets((assets) => uniqueBy([...assets, asset], (asset) => asset.id));
  };

  const removeFromSelection = (asset: HygraphAsset) => {
    setSelectedAssets((assets) => assets.filter((selectedAsset) => selectedAsset.id !== asset.id));
  };

  const onSelect = (asset: HygraphAsset) => {
    if (isSingleSelect) {
      return closeDialogWithResult([asset]);
    }

    addToSelection(asset);
  };

  if (assetsQuery.isLoading || !assetsQuery.data) {
    return (
      <div className="h-[48rem]">
        <Progress variant="slim" margin={0} />
      </div>
    );
  }

  const { assets, totalAssetCount } = assetsQuery.data;

  return (
    <div className="h-screen max-h-[48rem]">
      <div className="grid h-full grid-rows-[repeat(4,auto)_1fr_repeat(2,auto)]">
        <DialogHeader />

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
                <TableHeader>Created By</TableHeader>
                <TableHeader>Updated At</TableHeader>
                <TableHeader>Updated By</TableHeader>
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
                      <div className="grid place-items-center">
                        {isSingleSelect ? (
                          <SelectAssetButton onClick={() => onSelect(asset)} />
                        ) : (
                          <Checkbox
                            checked={isSelected}
                            onCheckedChange={() => {
                              if (isSelected) {
                                return removeFromSelection(asset);
                              }

                              onSelect(asset);
                            }}
                          />
                        )}
                      </div>
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
                    <TableCell>
                      <User name={asset.createdBy.name} picture={asset.createdBy.picture} />
                    </TableCell>
                    <TableCell>{formatDate(new Date(asset.updatedAt))}</TableCell>
                    <TableCell>
                      <User name={asset.updatedBy.name} picture={asset.updatedBy.picture} />
                    </TableCell>
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

        {!isSingleSelect ? (
          <DialogFooter
            closeDialog={() => closeDialogWithResult(selectedAssets)}
            selectedAssetCount={selectedAssets.length}
          />
        ) : null}
      </div>
    </div>
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

function SelectAssetButton({ onClick }: { onClick: () => void }) {
  return <IconButton variant="ghost" variantColor="primary" icon={FieldRelation} onClick={onClick} />;
}

function DialogHeader() {
  return (
    <div className="flex items-center space-x-12 p-24">
      <AttachmentIcon className="h-32 w-32 rounded bg-brand-100 p-2 text-brand-500" />
      <Heading as="h4" className="text-lg font-medium">
        Select Asset
      </Heading>
    </div>
  );
}

function DialogFooter({ closeDialog, selectedAssetCount }: { closeDialog: () => void; selectedAssetCount: number }) {
  const showAssetCount = selectedAssetCount > 1;
  const allowSubmit = selectedAssetCount > 0;

  return (
    <div className="flex justify-end rounded-b-lg bg-brand-50 px-24 py-16">
      <Button onClick={closeDialog} size="large" disabled={!allowSubmit}>
        Add selected assets {showAssetCount ? `(${selectedAssetCount})` : ''}
      </Button>
    </div>
  );
}

const getResizedHygraphUrl = (url: string, handle: string) => {
  return url.slice(0, -handle.length) + 'output=format:jpg/resize=width:59,height:59,fit:crop/' + handle;
};

const formatDate = (date: Date) => {
  return `${date.toLocaleDateString()}, ${date.toLocaleTimeString()}`;
};
