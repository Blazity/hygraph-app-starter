import { Select, SelectTrigger, SelectValue } from '@/components/select';
import { Button } from '@hygraph/baukasten';
import { SelectContent, SelectItem } from '@radix-ui/react-select';

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
    <div className="flex justify-between text-m text-slate-500">
      <p>{totalItems} entries</p>

      <div>
        <Button onClick={previousPage} disabled={!hasPreviousPage} size="medium" variant="ghost" variantColor="primary">
          Previous
        </Button>

        <span>
          Page{' '}
          <input className="w-[50px]" value={page} type="number" onChange={(e) => setPage(Number(e.target.value))} /> of{' '}
          {pageCount}
        </span>

        <Button onClick={nextPage} disabled={!hasNextPage} size="medium" variant="ghost" variantColor="primary">
          Next
        </Button>
      </div>

      <div className="flex">
        Show
        <Select value={String(resultsPerPage)} onValueChange={(e) => setResultsPerPage(Number(e))}>
          <SelectTrigger className="w-[150px]">
            <SelectValue />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="5">5</SelectItem>
            <SelectItem value="10">10</SelectItem>
            <SelectItem value="15">15</SelectItem>
            <SelectItem value="25">25</SelectItem>
            <SelectItem value="50">50</SelectItem>
            <SelectItem value="75">75</SelectItem>
            <SelectItem value="100">100</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};
