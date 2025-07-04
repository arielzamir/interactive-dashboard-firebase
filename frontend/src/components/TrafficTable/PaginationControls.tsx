import { Box, Button, Typography } from "@mui/material";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

interface PaginationControlsProps {
  pageIndex: number;
  canPreviousPage: boolean;
  canNextPage: boolean;
  previousPage: () => void;
  nextPage: () => void;
}

const PaginationControls = ({
  pageIndex,
  canPreviousPage,
  canNextPage,
  previousPage,
  nextPage,
}: PaginationControlsProps) => {
  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      mt={2}
      pt={2}
      borderTop="1px solid #e0e0e0"
    >
      <Button
        variant="outlined"
        onClick={previousPage}
        disabled={!canPreviousPage}
        startIcon={<NavigateBeforeIcon />}
      >
        Previous
      </Button>
      <Typography variant="body2" fontWeight="medium" color="text.secondary">
        Page {pageIndex + 1}
      </Typography>
      <Button
        variant="outlined"
        onClick={nextPage}
        disabled={!canNextPage}
        endIcon={<NavigateNextIcon />}
      >
        Next
      </Button>
    </Box>
  );
};

export default PaginationControls;
