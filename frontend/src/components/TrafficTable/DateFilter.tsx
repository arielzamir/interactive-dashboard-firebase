import { Box, Paper, TextField, Typography } from "@mui/material";

interface DateFilterProps {
  startDate: string;
  endDate: string;
  onStartDateChange: (value: string) => void;
  onEndDateChange: (value: string) => void;
}

const DateFilter = ({
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange,
}: DateFilterProps) => (
  <Paper elevation={1} sx={{ p: 2, mb: 3 }}>
    <Typography variant="subtitle1" mb={2}>
      Filter by Date
    </Typography>
    <Box display="flex" gap={2} flexWrap="wrap">
      <TextField
        label="Start Date"
        type="date"
        InputLabelProps={{ shrink: true }}
        value={startDate}
        onChange={(e) => onStartDateChange(e.target.value)}
      />
      <TextField
        label="End Date"
        type="date"
        InputLabelProps={{ shrink: true }}
        value={endDate}
        onChange={(e) => onEndDateChange(e.target.value)}
      />
    </Box>
  </Paper>
);

export default DateFilter;
