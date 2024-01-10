import { styled } from "@mui/system";
import { Chip } from "@mui/material";

export const StyledRatingChip = styled(Chip)(({ theme }) => ({
  color: theme.palette.app.indigo,
  border: `1px solid ${theme.palette.app.indigo}`,
  minWidth: "24px",
  padding: "3px 4px",
  "& .MuiChip-label": {
    height: "18px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "0 6px",
  },
}));
