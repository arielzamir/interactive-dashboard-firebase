import {
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableBody as MuiTableBody,
  Paper,
} from "@mui/material";
import { useTable, useSortBy, usePagination, Column } from "react-table";
import { TrafficStat } from "../../interfaces/TrafficStat.interface";
import { TableInstanceWithPagination } from "../types/react-table-helpers";

interface TrafficTableBodyProps {
  columns: Column<TrafficStat>[];
  data: TrafficStat[];
}

const TrafficTableBody = ({ columns, data }: TrafficTableBodyProps) => {
  const { getTableProps, getTableBodyProps, headerGroups, prepareRow, page } =
    useTable(
      {
        columns,
        data,
        initialState: {
          pageIndex: 0,
          pageSize: 5,
        } as any,
      },
      useSortBy,
      usePagination
    ) as TableInstanceWithPagination<TrafficStat>;

  return (
    <TableContainer component={Paper}>
      <Table {...getTableProps()}>
        <TableHead>
          {headerGroups.map((group, groupIndex) => (
            <TableRow
              {...group.getHeaderGroupProps()}
              key={`header-group-${groupIndex}`}
            >
              {group.headers.map((column, colIndex) => (
                <TableCell
                  {...column.getHeaderProps(
                    // @ts-ignore
                    column.getSortByToggleProps()
                  )}
                  key={`header-cell-${column.id}-${colIndex}`}
                >
                  {column.render("Header")}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableHead>

        <MuiTableBody {...getTableBodyProps()}>
          {page.map((row, rowIndex) => {
            prepareRow(row);
            return (
              <TableRow
                {...row.getRowProps()}
                key={`row-${row.id || rowIndex}`}
                sx={{
                  "&:hover": {
                    backgroundColor: "action.hover",
                  },
                }}
              >
                {row.cells.map((cell, cellIndex) => (
                  <TableCell
                    {...cell.getCellProps()}
                    key={`cell-${cell.column.id}-${cellIndex}`}
                  >
                    {cell.render("Cell")}
                  </TableCell>
                ))}
              </TableRow>
            );
          })}
        </MuiTableBody>
      </Table>
    </TableContainer>
  );
};

export default TrafficTableBody;
