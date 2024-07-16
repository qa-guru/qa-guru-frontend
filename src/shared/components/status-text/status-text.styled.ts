import { styled } from "@mui/system";
import { Stack } from "@mui/material";

export const StyledStack = styled(Stack)(({ theme }) => ({
  flexDirection: "row",
  gap: theme.spacing(1),
  alignItems: "center",
}));
