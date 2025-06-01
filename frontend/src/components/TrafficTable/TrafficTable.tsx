import { useMemo, useState } from "react";
import { useTable, useSortBy, usePagination, Column, Row } from "react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { TrafficStat } from "../../interfaces/TrafficStat.interface";
import { TableInstanceWithPagination } from "../types/react-table-helpers";

interface TrafficTableProps {
  trafficStats: TrafficStat[];
  onUpdate: (id: string, updatedData: Partial<TrafficStat>) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
  canEdit: boolean;
}

const TrafficTable = ({
  trafficStats,
  onUpdate,
  onDelete,
  canEdit,
}: TrafficTableProps) => {
  const [editingRow, setEditingRow] = useState<TrafficStat | null>(null);
  const [editVisits, setEditVisits] = useState<number>(0);
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");

  const filteredData = useMemo(() => {
    return trafficStats.filter((item) => {
      if (!startDate && !endDate) return true;
      if (startDate && item.date < startDate) return false;
      if (endDate && item.date > endDate) return false;
      return true;
    });
  }, [trafficStats, startDate, endDate]);

  const columns: Column<TrafficStat>[] = useMemo(
    () => [
      {
        Header: "Date",
        accessor: "date",
      },
      {
        Header: "Visits",
        accessor: "visits",
      },
      {
        Header: "Actions",
        id: "actions",
        Cell: ({ row }: { row: Row<TrafficStat> }) =>
          canEdit ? (
            <>
              <IconButton
                onClick={() => {
                  setEditingRow(row.original);
                  setEditVisits(row.original.visits);
                }}
                color="primary"
              >
                <EditIcon />
              </IconButton>
              <IconButton
                onClick={() => onDelete(row.original.id)}
                color="error"
              >
                <DeleteIcon />
              </IconButton>
            </>
          ) : null,
      },
    ],
    [onDelete]
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    state: { pageIndex },
  } = useTable(
    {
      columns,
      data: filteredData,
      initialState: {
        pageIndex: 0,
        pageSize: 5,
      } as any,
    },
    useSortBy,
    usePagination
  ) as TableInstanceWithPagination<TrafficStat>;

  const handleSave = async () => {
    if (!editingRow) return;
    await onUpdate(editingRow.id, { visits: editVisits });
    setEditingRow(null);
  };

  return (
    <>
      <Box mb={2} display="flex" gap={2}>
        <TextField
          label="Start Date"
          type="date"
          InputLabelProps={{ shrink: true }}
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
        <TextField
          label="End Date"
          type="date"
          InputLabelProps={{ shrink: true }}
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
      </Box>

      <TableContainer component={Paper}>
        <Table {...getTableProps()}>
          <TableHead>
            {headerGroups.map((group) => (
              <TableRow {...group.getHeaderGroupProps()} key={group.id}>
                {group.headers.map((column) => (
                  <TableCell
                    {...column.getHeaderProps(
                      // @ts-ignore
                      column.getSortByToggleProps()
                    )}
                    key={column.id}
                  >
                    {column.render("Header")}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableHead>

          <TableBody {...getTableBodyProps()}>
            {page.map((row) => {
              prepareRow(row);
              return (
                <TableRow {...row.getRowProps()} key={row.id}>
                  {row.cells.map((cell) => (
                    <TableCell {...cell.getCellProps()} key={cell.column.id}>
                      {cell.render("Cell")}
                    </TableCell>
                  ))}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>

      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mt={2}
      >
        <Button
          variant="outlined"
          onClick={previousPage}
          disabled={!canPreviousPage}
        >
          Previous
        </Button>
        <Typography>Page {pageIndex + 1}</Typography>
        <Button variant="outlined" onClick={nextPage} disabled={!canNextPage}>
          Next
        </Button>
      </Box>

      <Dialog open={!!editingRow} onClose={() => setEditingRow(null)}>
        <DialogTitle>Edit Visits</DialogTitle>
        <DialogContent>
          <TextField
            label="Visits"
            type="number"
            fullWidth
            value={editVisits}
            onChange={(e) => setEditVisits(Number(e.target.value))}
            autoFocus
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditingRow(null)}>Cancel</Button>
          <Button
            onClick={handleSave}
            variant="contained"
            disabled={editingRow?.visits === editVisits}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default TrafficTable;
