import { useMemo, useState } from "react";
import DateFilter from "./DateFilter";
import TrafficTableBody from "./TrafficTableBody";
import { TrafficStat } from "../../interfaces/TrafficStat.interface";
import { Column, Row, useTable } from "react-table";
import { IconButton, Tooltip } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import PaginationControls from "./PaginationControls";
import { TableInstanceWithPagination } from "../types/react-table-helpers";
import EditDialog from "./EditDialog";

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
              <Tooltip title="Edit">
                <IconButton
                  size="small"
                  onClick={() => {
                    setEditingRow(row.original);
                    setEditVisits(row.original.visits);
                  }}
                  color="primary"
                >
                  <EditIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Delete">
                <IconButton
                  size="small"
                  onClick={() => onDelete(row.original.id)}
                  color="error"
                >
                  <DeleteIcon />
                </IconButton>
              </Tooltip>
            </>
          ) : null,
      },
    ],
    [onDelete, canEdit, setEditingRow, setEditVisits]
  );

  const {
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    state: { pageIndex },
  } = useTable({
    columns,
    data: filteredData,
    initialState: {
      pageIndex: 0,
      pageSize: 5,
    } as any,
  }) as TableInstanceWithPagination<TrafficStat>;

  return (
    <>
      <DateFilter
        startDate={startDate}
        endDate={endDate}
        onStartDateChange={setStartDate}
        onEndDateChange={setEndDate}
      />
      <TrafficTableBody columns={columns} data={filteredData} />
      <PaginationControls
        pageIndex={pageIndex}
        canPreviousPage={canPreviousPage}
        canNextPage={canNextPage}
        previousPage={previousPage}
        nextPage={nextPage}
      />
      <EditDialog
        editingRow={editingRow}
        setEditingRow={setEditingRow}
        editVisits={editVisits}
        setEditVisits={setEditVisits}
        onUpdate={onUpdate}
      />
    </>
  );
};

export default TrafficTable;
