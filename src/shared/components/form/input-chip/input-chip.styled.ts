import { Box, Chip } from "@mui/material";
import { styled } from "@mui/system";

export const StyledBox = styled(Box)(({ theme }) => ({
  display: "flex",
  flexWrap: "wrap",
  gap: theme.spacing(0.5),
}));

export const StyledChip = styled(Chip)(({ theme }) => ({
  borderColor: theme.palette.app.primary,
}));
