import { styled } from "@mui/system";
import { Stack } from "@mui/material";

export const StyledAlignStack = styled(Stack)(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  gap: theme.spacing(2),
}));
