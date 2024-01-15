import { styled } from "@mui/system";
import { Chip, Paper } from "@mui/material";

interface IStyledRatingChip {
  ratingColor: string;
}

export const StyledRatingChip = styled(Chip, {
  shouldForwardProp: (prop) => prop !== "ratingColor",
})<IStyledRatingChip>(({ theme, ratingColor }) => ({
  color: ratingColor || theme.palette.app.primary,
  border: `1px solid ${ratingColor || theme.palette.app.primary}`,
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
