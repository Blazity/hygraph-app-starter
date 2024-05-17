import { Select } from '@headlessui/react';
import { Button, CheckBox } from '@hygraph/baukasten';

// TODO: improve ui
export const Pagination = ({
  page,
  totalItems,
  resultsPerPage,
  setPage,
  setResultsPerPage
}: {
  page: number;
  setPage: (page: number) => void;
  resultsPerPage: number;
  setResultsPerPage: (resultsPerPage: number) => void;
  totalItems: number;
}) => {
  const hasNextPage = page * resultsPerPage < totalItems;
  const hasPreviousPage = page > 1;

  const pageCount = Math.ceil(totalItems / resultsPerPage);

  const previousPage = () => {
    if (hasPreviousPage) {
      setPage(page - 1);
    }
  };

  const nextPage = () => {
    if (hasNextPage) {
      setPage(page + 1);
    }
  };

  return (
    <div className="flex items-center justify-between p-4 text-m text-slate-500">
      <p>{totalItems} entries</p>

      <div className="flex space-x-32">
        <Button onClick={previousPage} disabled={!hasPreviousPage} size="medium" variant="ghost" variantColor="primary">
          Previous
        </Button>

        <span className="space-x-2">
          <span>Page</span>
          <input
            className="w-[50px] rounded-sm border border-slate-300 py-1 text-center text-black"
            value={page}
            type="number"
            min={1}
            max={pageCount}
            onChange={(e) => setPage(Number(e.target.value))}
          />
          <span>of {pageCount}</span>
        </span>

        <Button onClick={nextPage} disabled={!hasNextPage} size="medium" variant="ghost" variantColor="primary">
          Next
        </Button>
      </div>

      <div className="flex items-center space-x-2">
        <span>Show</span>
        <Select
          value={String(resultsPerPage)}
          onChange={(e) => setResultsPerPage(Number(e.target.value))}
          className="rounded border border-slate-300 px-2 py-1.5 text-black"
        >
          {[5, 10, 15, 20, 25, 50, 75, 100].map((resultsPerPage) => (
            <option key={resultsPerPage} value={String(resultsPerPage)}>
              {resultsPerPage}
            </option>
          ))}
        </Select>
      </div>
    </div>
  );
};
