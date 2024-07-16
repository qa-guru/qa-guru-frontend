import { Stack } from "@mui/material";
import { styled } from "@mui/system";

export const StyledStack = styled(Stack)(({ theme }) => ({
  flexDirection: "row",
  margin: "25px 0 20px",
  gap: theme.spacing(1),
}));
