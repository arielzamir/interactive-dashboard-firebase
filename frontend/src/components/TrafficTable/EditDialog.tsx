import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { TrafficStat } from "../../interfaces/TrafficStat.interface";

interface EditDialogProps {
  editingRow: TrafficStat | null;
  setEditingRow: React.Dispatch<React.SetStateAction<TrafficStat | null>>;
  editVisits: number;
  setEditVisits: React.Dispatch<React.SetStateAction<number>>;
  onUpdate: (id: string, updatedData: Partial<TrafficStat>) => Promise<void>;
}

const EditDialog = ({
  editingRow,
  setEditingRow,
  editVisits,
  setEditVisits,
  onUpdate,
}: EditDialogProps) => {
  const handleSave = async () => {
    if (!editingRow) return;
    await onUpdate(editingRow.id, { visits: editVisits });
    setEditingRow(null);
  };

  return (
    <Dialog open={!!editingRow} onClose={() => setEditingRow(null)}>
      <DialogTitle>Edit Visits</DialogTitle>
      <DialogContent sx={{ pt: 1, pb: 2 }}>
        <TextField
          label="Visits"
          type="number"
          fullWidth
          value={editVisits}
          onChange={(e) => setEditVisits(Number(e.target.value))}
          autoFocus
          sx={{ mt: 1 }}
        />
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button onClick={() => setEditingRow(null)} color="inherit">
          Cancel
        </Button>
        <Button
          onClick={handleSave}
          variant="contained"
          disabled={editingRow?.visits === editVisits}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditDialog;
