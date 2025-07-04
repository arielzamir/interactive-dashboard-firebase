import { useState } from "react";
import { Box, TextField, Button } from "@mui/material";

interface AddEntryFormProps {
  onAdd: (entry: { date: string; visits: number }) => Promise<void>;
  canEdit: boolean;
}

const AddEntryForm = ({ onAdd, canEdit }: AddEntryFormProps) => {
  if (!canEdit) return null;

  const [date, setDate] = useState("");
  const [visits, setVisits] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!date || !visits) return;
    await onAdd({ date, visits: Number(visits) });
    setDate("");
    setVisits("");
  };

  return (
    <Box component="form" onSubmit={handleSubmit} display="flex" gap={2} mb={2}>
      <TextField
        label="Date"
        type="date"
        slotProps={{
          inputLabel: {
            shrink: true,
          },
        }}
        value={date}
        onChange={(e) => setDate(e.target.value)}
        required
      />
      <TextField
        label="Visits"
        type="number"
        value={visits}
        onChange={(e) => setVisits(e.target.value)}
        required
      />
      <Button type="submit" variant="contained">
        Add
      </Button>
    </Box>
  );
};

export default AddEntryForm;
