import { Box } from "@mui/material";
import { styled } from "@mui/system";

export const StyledBox = styled(Box)(({ theme }) => ({
  display: "flex",
  flexWrap: "wrap",
  gap: theme.spacing(0.5),
}));
