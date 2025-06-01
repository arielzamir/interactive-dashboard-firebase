import { Row, TableInstance, TableState } from "react-table";

export type TableInstanceWithPagination<T extends object> = TableInstance<T> & {
  page: Row<T>[];
  gotoPage: (updater: number | ((pageIndex: number) => number)) => void;
  nextPage: () => void;
  previousPage: () => void;
  canNextPage: boolean;
  canPreviousPage: boolean;
  pageCount: number;
  setPageSize: (pageSize: number) => void;
  state: TableState<T> & {
    pageIndex: number;
    pageSize: number;
  };
};
