import { styled } from "@mui/system";
import { Stack } from "@mui/material";

export const StyledStack = styled(Stack)(({ theme }) => ({
  margin: "10px 0",
  flexDirection: "row",
  gap: theme.spacing(1),
}));
